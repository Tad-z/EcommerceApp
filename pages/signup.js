import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import { useForm } from "react-hook-form";
import ApiCall from "./api/helper";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { getError } from "../reducers/error";
import styles from "../styles/form.module.css";

export default function SignupScreen() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, username, password }) => {
    try {
      const result = await ApiCall.postMethod(
        "http://localhost:4000/user/signup",
        {
          username,
          email,
          password,
        }
      );
      if (result) {
        console.log("success");
      } else {
        console.log("error1");
      }
    } catch (err) {
      toast.error(getError(err));
      console.log("error2");
    }
  };
  return (
    <>
      <Header title="signup" />
      <Main className={styles.body}>
        <div className={styles.container}>
          <h1 className={styles.h1}>
            Create an Account
          </h1>
          <p className={styles.p}>Personal Information</p>
          <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
              <div className={styles.row}>
                <p htmlFor="username" className="font-bold mb-2 text-sm">
                  Username&nbsp;<span className="text-red-600">*</span>
                </p>
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
              <div className={styles.row}>
                <p htmlFor="email" className="font-bold mb-2 text-sm">
                  Email&nbsp;<span className="text-red-600">*</span>
                </p>
                <input
                  type="email"
                  className={styles.input}
                  {...register("email", {
                    required: "Please enter your email address",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  id="email"
                  autoFocus
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>
              <div className={styles.row}>
                <p htmlFor="password" className="font-bold mb-4 text-sm">
                  Password &nbsp;<span className="text-red-600">*</span>
                </p>
                <input
                  type="password"
                  className={styles.input}
                  {...register("password", {
                    required: "Please enter a strong password",
                    minLength: {
                      value: 6,
                      message: "Password should have minimum of 6 characters",
                    },
                  })}
                  id="password"
                  autoFocus
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </div>
              <div className="mb-4">
                <button className="sign-up-button">Sign Up</button>
              </div>
          </form>
        </div>
      </Main>
    </>
  );
}
