import { Button } from "@material-ui/core";
import React from "react";
import { authenticate } from "../ceramic";
import Logo from "../components/Logo";

function MainLayout() {
  const connectToCeramic = () => {
    const sessionStorage = window.sessionStorage;

    authenticate()
      .then((id) => {
        console.log("Connected to Ceramic:", id);
        sessionStorage.setItem("ceramicId", id);
      })
      .catch((err) => {
        console.log(err);
        sessionStorage.setItem("ceramicId", "");
      });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <a
        style={{ position: "absolute", left: 40, top: 20, cursor: "pointer" }}
        href="/"
      >
        <Logo />
      </a>
      <Button
        variant="contained"
        color="primary"
        style={{ position: "absolute", right: 40, top: 20 }}
        onClick={connectToCeramic}
      >
        Connect Wallet
      </Button>
    </div>
  );
}

export default MainLayout;
