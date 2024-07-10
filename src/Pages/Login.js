import React, { useEffect } from "react";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Welcome</h1>
        <p className="text-gray-700 mb-6">
          Log in with your Facebook account to access and manage your pages.
        </p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 p-3 text-white rounded-md w-full text-lg font-semibold hover:bg-blue-700"
        >
          Login with Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
