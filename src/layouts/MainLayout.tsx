import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { authenticate } from "../ceramic";
import Logo from "../components/Logo";
import { useHistory } from "react-router-dom";

function MainLayout() {
  const [loading, setLoading] = useState(false);
  const [ceramicId, setCeramicId] = useState("");
  const history = useHistory();

  const redirect = () => {
    history.push("/history");
  };

  const connectToCeramic = () => {
    setLoading(true);

    // STATE (1) => first call
    authenticate()
      .then(async (idx) => {
        console.log("Connected to Ceramic:", idx.id);
        setCeramicId(idx.id);
        setLoading(false);

        // Unsure if this is supposed to be the way for the basicProfile
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts[0]);
        console.log(await idx.get("basicProfile", `${accounts[0]}@eip155:1`));
        console.log(await idx.get("FilesList", idx.id));
      })
      .catch((err) => {
        console.log(err);
        setCeramicId("");
        setLoading(false);
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
