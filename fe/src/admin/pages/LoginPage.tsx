import { useState } from "react";
import { useNavigate } from "react-router";
import { isAxiosError } from "axios";
import InputField from "../components/InputField";
import Logo from "../../components/Logo";
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
    <div className="flex min-h-screen items-center justify-center bg-navy px-4 py-12">
      <form
        className="panel w-full max-w-sm p-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="mb-6 flex items-center gap-2.5">
          <Logo name="MyBussAdmin" />
          <div>
            <p className="text-lg font-bold leading-none tracking-[-0.01em]">
              MyBussAdmin
            </p>
            <p className="mt-1 text-xs text-mute">Sign in to manage your site</p>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <InputField
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
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
          className="btn-primary mt-5 w-full"
        >
          {submitting ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
