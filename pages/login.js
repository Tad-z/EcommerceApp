import React, { useState } from "react";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import ApiCall from "./api/helper";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { getError } from "../reducers/error";
import { useRouter } from "next/router";
import styles from "../styles/form.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const submitHandler = async ({ username, password }) => {
    try {
      setIsLoading(true);
      const response = await ApiCall.postMethod(
        "https://emaxapi.onrender.com/user/login",
        {
          username,
          password,
        }
      );

      if (response) {
        console.log("response", response);
        toast("You are logged in");
        const data = response.data;
        const { token } = data;
        const { username } = data;
        const tokenExpireTime = new Date().getTime() + 3600000;

        // Store user data and token information
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("tokenExpireTime", tokenExpireTime); // Store the token expiration time

        console.log("success");
      } else {
        toast.error("Something went wrong");
        console.log("error1");
      }
      router.push("/");
    } catch (err) {
      toast.error(getError(err));
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };




  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.body}>
      <Header title="login" />
      <div className={styles.container}>
        <h1 className={styles.h1}>Login</h1>
        <p className={styles.p}>Sign-In Information</p>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <div className={styles.column}>
            <label htmlFor="username" className={styles.label}>
              Username&nbsp;<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("username", {
                required: "Please enter a valid username",
                minLength: {
                  value: 4,
                  message: "Username should have minimum of 4 characters",
                },
              })}
              className={styles.input}
              name="username"
              id="username"
              autoFocus
            />
            {errors.username && (
              <div className="text-red-500">{errors.username.message}</div>
            )}
          </div>
          <div className={styles.column}>
            <label htmlFor="password" className={styles.label}>
              Password &nbsp;<span className="text-red-600">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Please enter a strong password",
                minLength: {
                  value: 6,
                  message: "Password should have minimum of 6 characters",
                },
              })}
              className={styles.pswInput}
              id="password"
              autoFocus
            />
            <div className={styles.LogInputIcon} onClick={handleTogglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className={`${isLoading ? styles.blurButton : styles.button}`}>
            {isLoading ? "Loading..." : "Login"}
          </button>
          <div className="mb-2 mt-3">
            <p className="sm: text-sm">Don&apos;t have an account? &nbsp;
              <a className={styles.link} href="signup">Create an account</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
