import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(null);
  const [imgUploadError, setImgUploadErr] = useState(null);
  const [formData, setFormData] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  console.log(formData);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        } else {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
      };
      fetchPost();
    } catch (e) {
      console.log(e);
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishError(null);
    console.log(formData);
    try {
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      } else {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (e) {
      setPublishError("Something went wrong");
      console.log(e);
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImgUploadErr("Please select an image");
        return;
      }
      setImgUploadErr(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgUploadProgress(progress.toFixed(0));
        },
        (err) => {
          setImgUploadErr("Image upload failed");
          console.error(err);
          setImgUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUploadProgress(null);
            setImgUploadErr(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (err) {
      setImgUploadErr("Image upload failed");
      setImgUploadProgress(null);
      console.error(err);
    }
  };
  return (
    <div className="p-3 pb-12 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
      <form className="flex  flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, title: e.target.value }));
            }}
            value={formData?.title}
          />
          <Select
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, category: e.target.value }));
            }}
            value={formData?.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imgUploadProgress}
          >
            {imgUploadProgress ? (
              <div className="w-10 h-10">
                <CircularProgressbar
                  value={imgUploadProgress}
                  text={`${imgUploadProgress || 0}`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imgUploadError && <Alert color="failure">{imgUploadError}</Alert>}
        {formData?.image && (
          <img src={formData?.image} className="w-full h-72 object-cover" />
        )}
        <ReactQuill
          className="h-72 mb-12"
          theme="snow"
          value={formData?.content}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, content: value }));
          }}
          required
        />
        <Button type="submit" gradientDuoTone="purpleToBlue">
          Update Post
        </Button>
        {publishError && <Alert color="red">{publishError} </Alert>}
      </form>
    </div>
  );
};

export default UpdatePost;
