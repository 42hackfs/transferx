import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { authenticate } from "../ceramic";
import Logo from "../components/Logo";
import { useHistory } from "react-router-dom";

function MainLayout() {
  const sessionStorage = window.sessionStorage;
  console.log("sessionStorage", sessionStorage);
  const [loading, setLoading] = useState(false);
  const [ceramicId, setCeramicId] = useState("");
  const history = useHistory();

  const redirect = () => {
    history.push("/history");
  };

  const connectToCeramic = () => {
    setLoading(true);

    authenticate()
      .then((id) => {
        console.log("Connected to Ceramic:", id);
        sessionStorage.setItem("ceramicId", id);
        setCeramicId(id);
        setLoading(false);
        // await idx.get("basicProfile", "<DID-or-caip10-id>");
        // await IDX.get("FilesList", id);
      })
      .catch((err) => {
        console.log(err);
        sessionStorage.setItem("ceramicId", "");
        setCeramicId("");
        setLoading(false);
      });
  };

  useEffect(() => {
    setCeramicId(sessionStorage.getItem("ceramicId") || "");
  }, []);

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

      {ceramicId && (
        <Button
          variant="contained"
          color="primary"
          style={{ position: "absolute", right: 172, top: 20 }}
          onClick={redirect}
        >
          HISTORY
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        style={{ position: "absolute", right: 40, top: 20 }}
        onClick={connectToCeramic}
        disabled={ceramicId != ""}
      >
        {loading
          ? "Connecting..."
          : ceramicId == ""
          ? "Connect Wallet"
          : "Connected"}
      </Button>
    </div>
  );
}

export default MainLayout;
