import React from "react";
import { useEffect } from "react";

const Login = ({ setUser }) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "3873674139622442",
        cookie: true,
        xfbml: true,
        version: "v20.0",
      });

      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const checkLoginState = () => {
    window.FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  };

  const statusChangeCallback = (response) => {
    if (response.status === "connected") {
      window.FB.api("/me", { fields: "name, picture" }, function (res) {
        setUser({
          name: res.name,
          picture: res.picture.data.url,
          accessToken: response.authResponse.accessToken,
        });
      });
    }
  };
  const handleLogin = () => {
    window.FB.login(checkLoginState, {
      scope:
        "public_profile, pages_show_list, pages_read_engagement, pages_read_user_content",
    });
  };
  return (
    <div className=" w-[50vw] border-solid-black mx-auto mt-20 flex justify-center items-center">
      <button
        onClick={handleLogin}
        className="bg-blue-600 p-5 text-white rounded-md"
      >
        Login with Facebook
      </button>
    </div>
  );
};

export default Login;
