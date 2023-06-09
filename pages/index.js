import React, { useContext } from "react";

import { Context } from "../context";
import Config from "@/config";
import { useRouter } from "next/router";

import axios from "axios";

export default function Auth() {
  const { username, setUsername, secret, setSecret } = useContext(Context);

  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();

    if (username.length === 1 || secret.length === 1) return;

    await axios
      .put(
        "https://api.chatengine.io/users",
        { username, secret },
        { headers: { "Private-Key": Config.NEXT_APP_PVT_KEY } }
      )

      .then((r) => {
        router.push("/chats");
      });
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">ChatMe</div>

          <div className="input-container">
            <input
              placeholder="Email"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Login / Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
