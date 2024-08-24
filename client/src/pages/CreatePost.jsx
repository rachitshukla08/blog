import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(null);
  const [imgUploadError, setImgUploadErr] = useState(null);
  const [formData, setFormData] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishError(null);
    try {
      const res = await fetch("api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
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
      <h1 className="text-center text-3xl my-7 font-semibold">CreatePost</h1>
      <form className="flex  flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
          <Select
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
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
          <img src={formData.image} className="w-full h-72 object-cover" />
        )}
        <ReactQuill
          className="h-72 mb-12"
          theme="snow"
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          required
        />
        <Button type="submit" gradientDuoTone="purpleToBlue">
          Publish
        </Button>
        {publishError && <Alert color="red">{publishError} </Alert>}
      </form>
    </div>
  );
};

export default CreatePost;
