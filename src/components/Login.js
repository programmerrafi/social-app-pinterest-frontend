import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import socilVideo from "../assets/mobile.mp4";
import logo from "../assets/logo3.png";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    // console.log(response.profileObj);
    if (response.profileObj === undefined) return;
    localStorage.setItem("user", JSON.stringify(response?.profileObj));
    // console.log(response.profileObj);

    // const { googleId, imageUrl } = response?.profileObj;
    const doc = {
      _id: response?.profileObj?.googleId,
      _type: "user",
      username: response?.profileObj?.name,
      image: response?.profileObj?.imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={socilVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                >
                  <FcGoogle className="mr-4" />
                  Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
