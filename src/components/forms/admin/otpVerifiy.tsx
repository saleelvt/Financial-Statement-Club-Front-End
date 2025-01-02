import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const EmailVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [finalOtp, setFinalOtp] = useState("");
  const [timer, setTimer] = useState<number>(60);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  // Handle OTP input change
  const handleInputChange = (value: string, index: number): void => {
    if (isNaN(Number(value))) return; // Ignore non-numeric input
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    setFinalOtp(newOtp.join("")); // Update finalOtp instantly

    // Automatically focus on the next input field
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  // Handle paste event to autofill OTP
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData("Text");

    // Only allow numeric values and ensure length matches OTP input count
    if (!/^\d+$/.test(clipboardData) || clipboardData.length !== otp.length) return;

    const newOtp = clipboardData.split("").slice(0, otp.length); // Ensure correct length
    setOtp(newOtp);
    setFinalOtp(newOtp.join("")); // Update finalOtp instantly
  };

  // Handle timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [timer]);

  // Resend OTP
  const handleResend = (): void => {
    setTimer(60); // Reset timer
    setOtp(["", "", "", "", "", ""]); // Clear OTP inputs
    Swal.fire("OTP Resent!", "Please check your email for the new OTP.", "success");
  };

   const handleCancel=()=>{
    navigate("/login")
    Swal.fire("Cancelled", "You have cancelled the OTP verification.", "info")

  }

  
  const handleOtpSubmit = async () => {
    Swal.fire("Submitted OTP", finalOtp, "success");
    console.log("This is the OTP verify section for verify:", finalOtp);
  };

  return (
    <div
      className="flex items-center p-2 justify-center min-h-screen relative overflow-hidden"
      style={{
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 animate-pulse"></div>
      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 adminlogin-background">
        <div className="background-one relative inset-0 flex justify-center items-start pt-[60px]"></div>
        <div className="background-two"></div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 flex flex-col bg-white border rounded-md items-center px-[28px] py-[45px] w-full max-w-md admin-login-box">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-sm p-8 bg-white rounded-lg">
            <h2 className="text-3xl font-serif mb-6 text-center text-gray-800 animate-pulse">
              Verify Email OTP
            </h2>
            <p className="mb-6 text-center text-gray-600">
              OTP code sent to <span className="font-medium text-green-600">example@example.com</span>
            </p>
            <div className="flex justify-center space-x-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  onPaste={index === 0 ? handlePaste : undefined} // Only handle paste on the first input
                  className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              ))}
            </div>
            <p className="mb-6 text-center text-sm text-gray-500">
              Request in {timer > 0 ? `${timer} sec` : <button onClick={handleResend} className=" text-blue-700 hover:underline">Resend</button>}
            </p>
            <div className="flex justify-between">
              <button
                className="px-4 border  font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                disabled={otp.some((digit) => digit === "")}
                className={`px-4 py-2 font-semibold  rounded bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-gray-300 hover:text-white font-semibold focus:ring-2 focus:ring-gray-400 transition duration-300 transform hover:scale-105 ${
                  otp.some((digit) => digit === "")
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-300 hover:bg-gray-300"
                }`}
                onClick={handleOtpSubmit}
              >
                <span className="relative">{loading ? "Verifying..." : "Continue"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
