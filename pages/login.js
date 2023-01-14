import Link from "next/link";
import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import { useForm } from "react-hook-form";
import ApiCall from "./api/helper";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { getError } from "../reducers/error";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styles from "../styles/form.module.css";
import * as Action from "../reducers/loginReducer";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const submitHandler = async ({ username, password }) => {
    console.log(username);
    if(username){
      dispatch(Action.setUsername({ username }));
    }
    try {
      const response = await ApiCall.postMethod(
        "http://localhost:4000/user/login",
        {
          username,
          password,
        }
      );

      if (response) {
        toast("You are logged in");
        const data = response.data;
        const { token } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", true);
        console.log("success");
      } else {
        toast.error("Something went wrong");
        console.log("error1");
      }
      router.push("/");
    } catch (err) {
      toast.error(getError(err));
      console.log(err.message);
    }
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
              type="password"
              {...register("password", {
                required: "Please enter a strong password",
                minLength: {
                  value: 6,
                  message: "Password should have minimum of 6 characters",
                },
              })}
              className={styles.input}
              id="password"
              autoFocus
            />
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
            <button type="submit" className={styles.button}>
              Log In
            </button>
          <div className="mb-2 mt-3">
            <p className="sm: text-sm">Don&apos;t have an account? &nbsp;
            <Link href="signup">Create an account</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
