"use client";

import { login } from "@/apis";
import { COOKIE_NAME_JWT_TOKEN } from "@/constants/auth";
import router from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { token } = await login({ email, password });
      toast.success("Successfully signed in");
      const cookies = new Cookies();
      cookies.set(COOKIE_NAME_JWT_TOKEN, token);
      // router.refresh();
      router.push("/");
    } catch (error) {
      toast.error(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text text-stone-600">Email</span>
        </label>
        <input
          type="email"
          id="email"
          className="input input-bordered w-full max-w-xs"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text  text-stone-600">Password</span>
        </label>
        <input
          type="password"
          id="password"
          className="input input-bordered w-full max-w-xs"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  );
};

function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

export default LoginForm;
