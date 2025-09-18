import { useState, useEffect } from "react";
import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaKey } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";

// Schema xác thực với Yup
const resetPasswordValidation = Yup.object({
  newPassword: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

export default function ResetPassword() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState(["", "", "", "", "", ""]);
  const [activeInput, setActiveInput] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email);
    }
  }, [router.query.email]);

  // Bộ đếm ngược cho nút gửi lại mã
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Xử lý input mã xác nhận
  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Chỉ cho phép 1 ký tự
    
    const newCode = [...resetCode];
    newCode[index] = value;
    setResetCode(newCode);
    
    // Tự động chuyển sang ô tiếp theo
    if (value && index < 5) {
      setActiveInput(index + 1);
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !resetCode[index] && index > 0) {
      setActiveInput(index - 1);
    }
  };

  const handleCodePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newCode = [...resetCode];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCode[i] = pastedData[i];
    }
    
    setResetCode(newCode);
    setActiveInput(Math.min(pastedData.length, 5));
  };

  // Xử lý gửi lại mã xác nhận
  const handleResendCode = async () => {
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    setStatus("Đang gửi lại mã xác nhận...");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Mã xác nhận mới đã được gửi đến email của bạn!");
        toast.success("Mã xác nhận mới đã được gửi đến email của bạn!");
        setResendCooldown(30); // Bắt đầu bộ đếm ngược 30 giây
      } else {
        setStatus(`Lỗi: ${data.message}`);
        toast.error(data.message);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi gửi lại mã"}`);
      toast.error(error.message || "Đã xảy ra lỗi");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // Kiểm tra mã xác nhận trước khi submit
    if (resetCode.join("").length !== 6) {
      setStatus("Vui lòng nhập đầy đủ 6 chữ số mã xác nhận");
      toast.error("Vui lòng nhập đầy đủ 6 chữ số mã xác nhận");
      return;
    }

    setStatus("Đang đặt lại mật khẩu...");
    setIsLoading(true);
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          resetCode: resetCode.join(""),
          newPassword: values.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Mật khẩu đã được đặt lại thành công!");
        toast.success("Mật khẩu đã được đặt lại thành công!");
        
        // Chuyển hướng đến trang đăng nhập
        setTimeout(() => {
          router.push("/dang-nhap");
        }, 2000);
      } else {
        setStatus(`Lỗi: ${data.message}`);
        toast.error(data.message);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi đặt lại mật khẩu"}`);
      toast.error(error.message || "Đã xảy ra lỗi");
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  if (!email) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: 'url(/dang-ky.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="bg-white/95 backdrop-blur-lg border border-white/40 rounded-2xl p-8 w-full max-w-md relative z-10 shadow-2xl bt-shimmer">
          <div className="text-center text-gray-800">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy email</h2>
            <p className="mb-4 text-gray-700">Vui lòng quay lại trang quên mật khẩu</p>
          <Link
            href="/auth/quen-mat-khau"
              className="text-green-600 hover:text-green-700 transition-colors"
          >
            Quay lại
          </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Đặt lại mật khẩu - Giang Nội </title>
        <meta
          name="description"
          content="Nhập mã xác nhận và mật khẩu mới để đặt lại mật khẩu tài khoản BT Academy."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

      <div 
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: 'url(/dang-ky.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-green-400/25 to-emerald-400/25 rounded-full blur-3xl bt-pulse-enhanced"></div>
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl bt-pulse-enhanced" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full blur-3xl bt-pulse-enhanced" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-300/15 to-green-300/15 rounded-full blur-3xl bt-pulse-enhanced" style={{animationDelay: '1s'}}></div>
          
          {/* Additional floating elements */}
          <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-green-300/30 to-emerald-300/30 rounded-full blur-2xl bt-floating-1"></div>
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-br from-teal-300/25 to-green-300/25 rounded-full blur-2xl bt-floating-2"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-br from-emerald-300/35 to-cyan-300/35 rounded-full blur-xl bt-floating-3"></div>
        </div>
        
        {/* Floating Particles */}
        <div className="bt-particles">
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
          <div className="bt-particle"></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 w-full max-w-md mx-4">
          {/* Reset Password Card */}
          <div className="bg-white/95 backdrop-blur-lg border border-white/40 rounded-2xl p-8 w-full max-w-md relative z-10 shadow-2xl bt-shimmer">
            <div className="flex items-center mb-6">
              <Link
                href="/auth/quen-mat-khau"
                className="text-gray-600 hover:text-gray-800 transition-colors mr-3"
              >
                <FaArrowLeft className="w-5 h-5" />
              </Link>
              <h2 className="text-3xl font-bold text-gray-800">Đặt lại mật khẩu</h2>
            </div>
            
            <p className="text-gray-700 text-sm mb-6">
              Mã xác nhận đã được gửi đến: <span className="text-green-600 font-semibold">{email}</span>
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={resetPasswordValidation}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {/* Mã xác nhận - 6 ô vuông */}
                  <div className="relative">
                    <label className="block text-gray-700 text-sm mb-4 text-center font-medium">
                      Mã xác nhận <span className="text-orange-500">*</span>
                    </label>
                    <div className="flex justify-center gap-3 mb-2">
                      {resetCode.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleCodeChange(index, e.target.value)}
                          onKeyDown={(e) => handleCodeKeyDown(index, e)}
                          onPaste={handleCodePaste}
                          onFocus={() => setActiveInput(index)}
                          className={`
                            w-12 h-12 text-center text-2xl font-bold rounded-lg border-2 transition-all duration-200
                            ${activeInput === index 
                              ? 'border-green-500 bg-green-500/20 shadow-lg shadow-green-500/25' 
                              : digit 
                                ? 'border-green-600 bg-green-600/10' 
                                : 'border-gray-300 bg-white/90'
                            }
                            text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500
                            backdrop-blur-sm shadow-sm
                          `}
                          placeholder="0"
                          required
                        />
                      ))}
                    </div>
                    {resetCode.join("").length !== 6 && (
                      <p className="text-red-500 text-sm text-center mt-2">
                        Vui lòng nhập đầy đủ 6 chữ số
                      </p>
                    )}
                  </div>

                  {/* Mật khẩu mới */}
                  <div className="relative">
                    <label htmlFor="newPassword" className="block text-gray-700 text-sm mb-2 font-medium">
                      Mật khẩu mới <span className="text-orange-500">*</span>
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm gap-4 shadow-sm">
                      <span className="pl-3 text-green-600">
                        <FaLock />
                      </span>
                      <Field
                        id="newPassword"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        className="w-full p-3 bg-transparent text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Mật khẩu mới"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="pr-3 text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <ErrorMessage
                      name="newPassword"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Xác nhận mật khẩu */}
                  <div className="relative">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm mb-2 font-medium">
                      Xác nhận mật khẩu <span className="text-orange-500">*</span>
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm gap-4 shadow-sm">
                      <span className="pl-3 text-green-600">
                        <FaLock />
                      </span>
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full p-3 bg-transparent text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Xác nhận mật khẩu"
                        required
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="pr-3 text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Thông báo trạng thái */}
                  {status && (
                    <p
                      className={`text-center ${
                        status.includes("thành công") 
                          ? "text-green-500" 
                          : "text-red-500"
                      }`}
                    >
                      {status}
                    </p>
                  )}

                  {/* Nút đặt lại mật khẩu */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading || resetCode.join("").length !== 6}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting || isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                  </button>

                  {/* Gửi lại mã */}
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={resendCooldown > 0 || isResending}
                      className={`text-sm transition-colors ${
                        resendCooldown > 0 || isResending
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-green-600 hover:text-green-700"
                      }`}
                    >
                      {isResending
                        ? "Đang gửi..."
                        : resendCooldown > 0
                        ? `Gửi lại mã xác nhận (${resendCooldown}s)`
                        : "Gửi lại mã xác nhận"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
