import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineInformationCircle } from "react-icons/hi";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    setErrorMessage(null);
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      setErrorMessage("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setErrorMessage(data.errorMessage);
      }
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-700  text-white">
              Rachit's
            </span>{" "}
            Blog
          </Link>
          <p className="text-sm mt-5">
            You can sign up with your Email and Password or with Google
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="user"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="text"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Enter a password" />
              <TextInput
                type="password"
                placeholder="************"
                id="password"
                onChange={handleChange}
                autoComplete="false"
              />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading === true}
            >
              {loading ? <Spinner></Spinner> : "Sign Up"}
            </Button>
          </form>
          <div className="flex gap-2 mt-4 text-sm">
            <span>Have an account already? </span>
            <Link to="/sign-in" className="text-blue-600">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert
              className="mt-2"
              color="failure"
              icon={HiOutlineInformationCircle}
            >
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
