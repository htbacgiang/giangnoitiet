import { useState, useEffect } from "react";
import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getCsrfToken, getProviders, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaCoffee } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";

// Schema xác thực với Yup
const loginValidation = Yup.object({
  login_email: Yup.string()
    .required("Vui lòng nhập email hoặc số điện thoại.")
    .test("is-email-or-phone", "Vui lòng nhập email hoặc số điện thoại hợp lệ.", (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10,11}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  login_password: Yup.string().required("Vui lòng nhập mật khẩu."),
});

export default function Signin({ providers, callbackUrl, csrfToken }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  // Kiểm tra error từ URL parameters
  useEffect(() => {
    if (router.query.error) {
      let errorMessage;
      switch (router.query.error) {
        case "CredentialsSignin":
          errorMessage = "Email/số điện thoại hoặc mật khẩu không đúng. Vui lòng kiểm tra lại thông tin đăng nhập.";
          break;
        case "EmailNotVerified":
          errorMessage = "Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản trước khi đăng nhập.";
          setShowResendButton(true);
          break;
        case "OAuthAccountNotLinked":
          errorMessage = "Email này đã được sử dụng để đăng ký tài khoản khác.";
          break;
        case "AccessDenied":
          errorMessage = "Bạn không có quyền truy cập vào tài khoản này.";
          break;
        default:
          errorMessage = "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.";
      }
      setStatus(`Lỗi: ${errorMessage}`);
      toast.error(errorMessage);
      
      // Xóa error parameter khỏi URL
      router.replace('/dang-nhap', undefined, { shallow: true });
    }
  }, [router.query.error]);

  // Tải email/số điện thoại từ localStorage
  const initialValues = {
    login_email: typeof window !== "undefined" ? localStorage.getItem("savedEmail") || "" : "",
    login_password: "",
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleResendVerification = async () => {
    if (!resendEmail || !resendEmail.includes("@")) {
      toast.error("Vui lòng nhập email hợp lệ để gửi lại xác minh.");
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch("/api/auth/resendVerification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resendEmail }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success("Email xác minh đã được gửi lại thành công!");
        setShowResendButton(false);
        setResendEmail("");
      } else {
        toast.error(data.message || "Có lỗi xảy ra khi gửi email.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi email.");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setStatus("Đang đăng nhập...");
    setSubmitting(true);

    try {
      const isPhone = /^[0-9]{10,11}$/.test(values.login_email);
      
      // Gọi API login để kiểm tra thông tin trước
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: isPhone ? null : values.login_email,
          phone: isPhone ? values.login_email : null,
          password: values.login_password,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginData.success) {
        // Hiển thị thông báo lỗi chính xác từ API
        setStatus(`Lỗi: ${loginData.message}`);
        toast.error(loginData.message);
        
        // Nếu là lỗi email chưa xác minh, hiển thị nút gửi lại
        if (loginData.error === "EMAIL_NOT_VERIFIED") {
          setShowResendButton(true);
          setResendEmail(values.login_email);
        }
        
        return;
      }

      // Nếu API login thành công, tiếp tục với NextAuth
      const res = await signIn("credentials", {
        redirect: false,
        email: isPhone ? null : values.login_email,
        phone: isPhone ? values.login_email : null,
        password: values.login_password,
        callbackUrl,
      });

      if (res?.error) {
        setStatus(`Lỗi: ${loginData.message}`);
        toast.error(loginData.message);
      } else {
        setStatus("Đăng nhập thành công!");
        toast.success("Đăng nhập thành công!");
        if (rememberMe) {
          localStorage.setItem("savedEmail", values.login_email);
        } else {
          localStorage.removeItem("savedEmail");
        }

        // Lấy thông tin session để kiểm tra role
        const session = await getSession();
        const redirectUrl = session?.user?.role === "admin" ? "/dashboard" : (callbackUrl || "/");

        setTimeout(() => router.push(redirectUrl), 1000);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi đăng nhập"}`);
      toast.error(error.message || "Đã xảy ra lỗi");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialSignIn = async (providerId) => {
    setStatus(`Đang đăng nhập bằng ${providerId}...`);
    try {
      const res = await signIn(providerId, { redirect: false, callbackUrl });
      if (res?.error) {
        setStatus(`Lỗi: ${res.error}`);
        toast.error(`Lỗi khi đăng nhập bằng ${providerId}: ${res.error}`);
      } else {
        setStatus("Đăng nhập thành công!");
        toast.success(`Đăng nhập bằng ${providerId} thành công!`);

        // Lấy thông tin session để kiểm tra role
        const session = await getSession();
        const redirectUrl = session?.user?.role === "admin" ? "/dashboard" : (callbackUrl || "/");

        setTimeout(() => router.push(redirectUrl), 1000);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi đăng nhập"}`);
      toast.error(`Lỗi khi đăng nhập bằng ${providerId}`);
    }
  };

  return (
    <>
      <Head>
        <title>Đăng nhập - Giang Nội tiết | Chăm sóc sức khỏe nội tiết</title>
        <meta
          name="description"
          content="Đăng nhập vào Giang Nội tiết để truy cập các dịch vụ chăm sóc sức khỏe nội tiết chuyên nghiệp. Đăng nhập bằng email, số điện thoại hoặc Google."
        />
        <meta
          name="keywords"
          content="Giang Nội tiết, đăng nhập, chăm sóc sức khỏe, nội tiết, tiểu đường thai kỳ, tư vấn y tế"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Đăng nhập - Giang Nội tiết | Chăm sóc sức khỏe nội tiết" />
        <meta
          property="og:description"
          content="Đăng nhập để truy cập các dịch vụ chăm sóc sức khỏe nội tiết chuyên nghiệp của Giang Nội tiết. Tư vấn tiểu đường thai kỳ và các vấn đề nội tiết."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://giangnoitiet.vn/dang-nhap" />
        <meta property="og:image" content="/images/giang-noi-tiet-banner.jpg" />
        <meta property="og:site_name" content="Giang Nội tiết" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Đăng nhập - Giang Nội tiết | Chăm sóc sức khỏe nội tiết" />
        <meta
          name="twitter:description"
          content="Đăng nhập để truy cập các dịch vụ chăm sóc sức khỏe nội tiết chuyên nghiệp."
        />
        <meta name="twitter:image" content="/images/giang-noi-tiet-banner.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://giangnoitiet.vn/dang-nhap" />
        <meta httpEquiv="content-language" content="vi" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Đăng nhập - Giang Nội tiết",
            description:
              "Đăng nhập vào Giang Nội tiết để truy cập các dịch vụ chăm sóc sức khỏe nội tiết chuyên nghiệp.",
            url: "https://giangnoitiet.vn/dang-nhap",
            publisher: {
              "@type": "Organization",
              name: "Giang Nội tiết",
              logo: {
                "@type": "ImageObject",
                url: "/images/giang-noi-tiet-logo.png",
              },
            },
          })}
        </script>
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
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl bt-pulse-enhanced" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full blur-3xl bt-pulse-enhanced" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-300/15 to-green-300/15 rounded-full blur-3xl bt-pulse-enhanced" style={{ animationDelay: '1s' }}></div>

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


          {/* Login Card */}
          <div className="bg-white/95 backdrop-blur-lg border border-white/40 rounded-2xl p-8 w-full max-w-md relative z-10 shadow-2xl bt-shimmer">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Đăng Nhập</h2>

            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={loginValidation}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

                  {/* Email hoặc Số điện thoại */}
                  <div className="relative">
                    <label htmlFor="login_email" className="block text-gray-700 text-sm mb-2 font-medium">
                      Email hoặc Số điện thoại <span className="text-orange-500">*</span>
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm gap-4 bt-form-input shadow-sm">
                      <span className="pl-3 text-green-600">
                        <FaEnvelope />
                      </span>
                      <Field
                        id="login_email"
                        name="login_email"
                        type="text"
                        className="w-full p-3 bg-transparent text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Email hoặc Số điện thoại"
                        required
                      />
                    </div>
                    <ErrorMessage
                      name="login_email"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Mật khẩu */}
                  <div className="relative">
                    <label htmlFor="login_password" className="block text-gray-700 text-sm mb-2 font-medium">
                      Mật khẩu <span className="text-orange-500">*</span>
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm gap-4 bt-form-input shadow-sm">
                      <span className="pl-3 text-green-600">
                        <FaLock />
                      </span>
                      <Field
                        id="login_password"
                        name="login_password"
                        type={showPassword ? "text" : "password"}
                        className="w-full p-3 bg-transparent text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Mật khẩu"
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
                      name="login_password"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Lưu thông tin */}
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      type="checkbox"
                      name="remember_me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-green-600 bg-white border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="remember_me" className="ml-2 text-gray-700 text-sm">
                      Lưu thông tin đăng nhập
                    </label>
                  </div>

                  {/* Thông báo trạng thái */}
                  {status && (
                    <p
                      className={`text-center ${status.includes("thành công") ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {status}
                    </p>
                  )}

                  {/* Nút đăng nhập */}
                  <button
                    type="submit"
                    disabled={isSubmitting || status === "Đang đăng nhập..."}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bt-button-enhanced bt-ripple"
                  >
                    {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                  </button>

                  {/* Quên mật khẩu và Đăng ký */}
                  <div className="text-center mt-4">
                    <Link
                      href="/auth/quen-mat-khau"
                      className="text-green-600 hover:text-green-700 transition-colors"
                    >
                      Quên mật khẩu?
                    </Link>
                    <span className="px-2 text-gray-500">|</span>
                    <Link
                      href="/dang-ky"
                      className="text-green-600 hover:text-green-700 transition-colors"
                    >
                      Đăng ký
                    </Link>
                  </div>

                  {/* Resend Verification Email */}
                  {showResendButton && (
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="text-center mb-3">
                        <p className="text-amber-800 font-medium mb-2">
                          Tài khoản chưa được kích hoạt?
                        </p>
                        <p className="text-amber-700 text-sm mb-3">
                          Nhập email để gửi lại liên kết kích hoạt tài khoản
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={resendEmail}
                          onChange={(e) => setResendEmail(e.target.value)}
                          placeholder="Nhập email của bạn"
                          className="flex-1 px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={handleResendVerification}
                          disabled={isResending}
                          className="px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isResending ? "Đang gửi..." : "Gửi lại"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Social Login Buttons */}
                  <div className="space-y-4">
                    <div className="text-center text-gray-700 mb-4 font-medium">Hoặc đăng nhập bằng</div>
                    <button
                      type="button"
                      onClick={() => handleSocialSignIn("google")}
                      className="w-full py-3 bg-white/90 backdrop-blur-sm border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 bt-button-enhanced shadow-sm"
                    >
                      <FaGoogle className="text-red-500" /> Đăng nhập bằng Google
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

export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });
  const callbackUrl = query.callbackUrl || process.env.NEXT_PUBLIC_DEFAULT_REDIRECT || "/";

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  return {
    props: {
      providers: providers || { google: {}, facebook: {} },
      csrfToken: csrfToken || null,
      callbackUrl,
    },
  };
}