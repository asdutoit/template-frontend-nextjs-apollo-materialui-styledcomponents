import React from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

export default function Logout() {
  const handleLogOut = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.STRAPI_BACKEND}/logout`,
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button color="secondary" onClick={handleLogOut} variant="contained">
        Logout
      </Button>
    </div>
  );
}
