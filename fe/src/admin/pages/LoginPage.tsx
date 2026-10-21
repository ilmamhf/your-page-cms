import { useState } from "react";
import InputField from "../components/InputField";
import api from "../../api/axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);

      window.location.href = "/admin";
    } catch (err) {
      console.log("Login Failed: ", err);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border flex flex-col items-center p-4">
        <div>Login</div>
        <InputField
          label="Email"
          id="email"
          value={email}
          onChange={setEmail}
        />
        <InputField
          label="Password"
          id="password"
          value={password}
          onChange={setPassword}
        />
        <button
          className="border px-4 py-2 mt-4"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
