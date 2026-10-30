import { useState } from "react";
import { useNavigate } from "react-router";
import { isAxiosError } from "axios";
import InputField from "../components/InputField";
import api from "../../api/axios";
import { setToken } from "../../api/token";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setSubmitting(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      setToken(response.data.access_token);
      navigate("/admin", { replace: true });
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 401) {
        setError("Wrong email or password.");
      } else if (isAxiosError(err) && !err.response) {
        setError("Cannot reach the server. Is the backend running?");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="border flex flex-col items-center p-8 gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="text-xl pb-2">CMS Login</div>

        {error && (
          <div className="border border-red-400 bg-red-50 text-red-700 p-2 w-full text-sm">
            {error}
          </div>
        )}

        <InputField
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <InputField
          label="Password"
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={setPassword}
        />
        <button
          type="submit"
          disabled={submitting}
          className="border px-4 py-2 mt-4 w-full disabled:opacity-50"
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
