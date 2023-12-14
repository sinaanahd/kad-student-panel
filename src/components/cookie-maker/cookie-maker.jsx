import React, { useEffect } from "react";
import Cookies from "js-cookie";

const MyComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      const X = Cookies.get("X");
      if (X && Date.now() < parseInt(X.substr(24, 12), 16)) {
        // Continue with your logic
        return;
      } else {
        // console.log("here");
        // document.cookie = `X=${Date.now()}`;
        // console.log(document.cookie);
      }
      try {
        // Perform your HTTP request without manually setting the Cookie header
        const response = await fetch("https://app.spotplayer.ir/", {
          method: "HEAD",
          credentials: "include", // Important for including cookies in the request
        });
        // Process the response and update cookies as needed
        const headers = response.headers;
        const setCookieHeader = headers.get("set-cookie");
        const newX = setCookieHeader?.match(/X=([a-f0-9]+);/)[1];

        // Update the cookie with the new value
        if (newX) {
          Cookies.set("X", newX, {
            expires: 365, // Set the expiration in days
            domain: "localhost",
            secure: true,
            httpOnly: false,
          });
        }

        // Continue with the rest of your logic
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Run only once on mount

  return <div>Your React Component</div>;
};

export default MyComponent;
