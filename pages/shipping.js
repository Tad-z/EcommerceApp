import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";
import Header from "../components/Header";
import Main from "../components/Main";
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { getError } from "../reducers/error";
import { getServerData, postServerData } from "./api/helper";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";


export default function ShippingScreen() {

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const data = useSelector((state) => state.cart.cart);
  const submitHandler = async ({ fullname, city, adress }) => {
    try {
      const response = await postServerData(
        "http://localhost:4000/orders",
        {
          fullname,
          city,
          adress,
          data
        }
      );
      if (response) {
        toast("Order Saved");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error(getError(err));
      console.log(err.message);
    }
  };
  return (
    <>
      <Header title="Shipping Address" />
      <Main>
        <div className="mt-10">
          <CheckoutWizard activeStep={1} />
        </div>
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">Shipping Adress</h1>
          <div className="mb-4">
            <label className="font-bold mb-2 text-sm" htmlFor="fullname">
              Full Name &nbsp;<span className="text-red-600">*</span>
            </label>
            <input
              className="w-full rounded mb-4 shadow-sm bg-[#F2F2F2] py-2 px-4  outline-[#5e4c34]"
              id="fullname"
              autoFocus
              {...register("fullname", {
                required: "Please enter your full name",
              })}
            />
            {errors.fullname && (
              <div className="text-red-500">{errors.fullname.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2 text-sm" htmlFor="city">
              City &nbsp;<span className="text-red-600">*</span>
            </label>
            <input
              className="w-full rounded mb-4 shadow-sm bg-[#F2F2F2] py-2 px-4  outline-[#5e4c34]"
              id="city"
              autoFocus
              {...register("city", {
                required: "Please enter your city",
              })}
            />
            {errors.city && (
              <div className="text-red-500">{errors.city.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2 text-sm" htmlFor="adress">
              Street Adress &nbsp;<span className="text-red-600">*</span>
            </label>
            <input
              className="w-full rounded mb-4 shadow-sm bg-[#F2F2F2] py-2 px-4  outline-[#5e4c34]"
              id="adress"
              autoFocus
              {...register("adress", {
                required: "Please enter your adress",
                minLength: {
                  value: 9,
                  message: "Write a detailed House Adress",
                },
              })}
            />
            {errors.adress && (
              <div className="text-red-500">{errors.adress.message}</div>
            )}
            <p className="text-gray-500 text-sm">*Detailed street adress will help us locate you easily</p>
          </div>

          <div className="mb-4">
            <Link href="order">
              <button type="submit" className="next-button">
                Next
              </button>
            </Link>
          </div>
        </form>
      </Main>
    </>
  );
}
