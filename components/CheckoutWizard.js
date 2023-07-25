import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mt-20 mb-5 flex flex-wrap">
      {["1.User Login", "2.Shipping Adress", "3.Review & Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2 text-center
        ${
          index <= activeStep
            ? "border-[#946F3A] text-[#946F3A]"
            : "border-gray-400 text-gray-400"
        }
        `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
