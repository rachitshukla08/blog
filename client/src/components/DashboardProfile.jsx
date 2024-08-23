import { Alert, Button, Modal, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const DashboardProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState();
  const [imageFileUrl, setImageFileUrl] = useState();
  const filePickerRef = useRef();
  const [imgFileUploadProgress, setImageFileUploadProgress] = useState();
  const [imgFileUploadError, setImageFileUploadError] = useState();
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState();
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("Submit");
    e.preventDefault();
    setUpdateSuccessMsg(null);
    if (Object.keys(formData).length === 0) return;
    try {
      dispatch(updateStart());
      console.log("Start");
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(res);
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        console.log("Success");
        setUpdateSuccessMsg("User profile updated successfully");
      }
    } catch (e) {
      dispatch(updateFailure(e.message));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadProgress(null);
        setImageFileUploadError(
          "Couldnt upload, only images are allowed (Max file size is 2MB) "
        );
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleDeleteUser = async () => {
    dispatch(deleteUserStart());
    try {
      setShowModal(false);
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) dispatch(deleteUserFailure(data.message));
      else dispatch(deleteUserSuccess());
    } catch (e) {
      console.log(e);
      dispatch(deleteUserFailure(e.message));
    }
  };

  const handleSignOut = async () => {
    const res = await fetch("api/user/signout", {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) console.log(data.message);
    else dispatch(signOutSuccess());
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div className="w-32 relative h-32 self-center">
          {imgFileUploadProgress && parseInt(imgFileUploadProgress) !== 100 && (
            <CircularProgressbar
              value={imgFileUploadProgress || 0}
              text={`${imgFileUploadProgress}%`}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  userSelect: "none",
                  pointerEvents: "none",
                },
                path: {
                  stroke: `rgba(62,152,199,${imgFileUploadProgress / 100}`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            onClick={() => {
              filePickerRef.current.click();
            }}
            className={`w-full h-full cursor-pointer rounded-full border-4 object-cover border-gray-200 dark:border-white ${
              imgFileUploadProgress && imgFileUploadProgress < 100
                ? "opacity-50"
                : "opacity-100"
            } `}
          />
        </div>
        {imgFileUploadError && (
          <Alert color="failure">{imgFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="password"
          id="password"
          placeholder="*********************"
          onChange={handleChange}
        ></TextInput>
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          outline
          disabled={
            loading ||
            Object.keys(formData).length === 0 ||
            (imgFileUploadProgress > 0 && imgFileUploadProgress < 100)
          }
        >
          {loading ? <Spinner /> : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              className="w-full"
            >
              Create a post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-900 dark:text-red-700  flex justify-between mt-5">
        <span
          className="cursor-pointer hover:text-red-500"
          onClick={() => setShowModal(true)}
        >
          Delete
        </span>
        <span
          className="cursor-pointer hover:text-red-500"
          onClick={handleSignOut}
        >
          {" "}
          Sign Out{" "}
        </span>
      </div>
      {updateSuccessMsg && (
        <Alert color="success" className="mt-5">
          {updateSuccessMsg}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashboardProfile;
