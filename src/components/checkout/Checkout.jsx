import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import AddressInfo from "./AddressInfo";
import { getUserAddresses } from "../../store/actions";
import ErrorPage from "../shared/ErrorPage";
import Skeleton from "../shared/Skeleton";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import PaypalPayment from "./PaypalPayment";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { cart, totalPrice } = useSelector((state) => state.carts);
  const { address, selectedUserCheckoutAddress } = useSelector((state) => state.auth);
  const { paymentMethod } = useSelector((state) => state.payment);

  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error("Please select a checkout address before proceeding.");
      return;
    }

    if (activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
      toast.error("Please select a payment method before proceeding.");
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    dispatch(getUserAddresses());
    }, [dispatch]);


  return (
    <div className="py-14 min-h-[calc(100vh-100px)] bg-gray-50">
      {/* Stepper Header */}
      <div className="w-full lg:w-10/12 mx-auto mb-6">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
     
      {/* Content Section */}
      {isLoading ? (
        <div className="lg:w-[80%] mx-auto py-5">
          <Skeleton />
        </div>
      ) : errorMessage ? (
        <ErrorPage message={errorMessage} />
      ) : (
        <div className="mt-5 lg:w-10/12 mx-auto">
          {activeStep === 0 && <AddressInfo address={address} />}
          {activeStep === 1 && <PaymentMethod />}
          {activeStep === 2 && (
            <OrderSummary
              totalPrice={totalPrice}
              cart={cart}
              address={selectedUserCheckoutAddress}
              paymentMethod={paymentMethod}
            />
          )}
          {activeStep === 3 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-2xl font-semibold text-gray-800 mb-3">
                {paymentMethod === "Stripe"
                  ? "Stripe Payment Gateway"
                  : <PaypalPayment />}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Bottom Navigation */}
      <div
        className="flex justify-between items-center px-6 fixed z-50 h-20 bottom-0 bg-white left-0 w-full py-4 border-t border-gray-200"
        style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.08)" }}
      >
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            textTransform: "none",
            fontWeight: "600",
            borderRadius: "8px",
            borderColor: "#6366F1",
            color: "#6366F1",
            "&:hover": { borderColor: "#4F46E5", color: "#4F46E5" },
          }}
        >
          Back
        </Button>

        {activeStep !== steps.length - 1 && (
          <button
            disabled={
              errorMessage ||
              (activeStep === 0 && !selectedUserCheckoutAddress) ||
              (activeStep === 1 && !paymentMethod)
            }
            className={`bg-indigo-600 hover:bg-indigo-700 font-semibold px-6 h-10 rounded-md text-white transition-all 
              ${
                errorMessage ||
                (activeStep === 0 && !selectedUserCheckoutAddress) ||
                (activeStep === 1 && !paymentMethod)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            onClick={handleNext}
          >
            Proceed
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
