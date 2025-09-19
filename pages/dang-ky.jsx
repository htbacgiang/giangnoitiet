import Link from "next/link";
import Head from "next/head";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { getCsrfToken, getSession } from "next-auth/react";
import Router from "next/router";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pageMetas } from "../utils/metaUtils";
import axios from "axios";

// Schema validation với Yup
const signupValidation = Yup.object({
  username: Yup.string()
    .required("Vui lòng nhập tên người dùng.")
    .min(3, "Tên người dùng phải có ít nhất 3 ký tự."),
  email: Yup.string()
    .required("Vui lòng nhập địa chỉ email.")
    .email("Vui lòng nhập địa chỉ email chính xác."),
  phone: Yup.string()
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})\b$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
  confirm_password: Yup.string()
    .required("Vui lòng xác nhận mật khẩu.")
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp."),
  agree: Yup.boolean()
    .required("Bạn phải đồng ý với Điều khoản & Chính sách bảo mật.")
    .oneOf([true], "Bạn phải đồng ý với Điều khoản & Chính sách bảo mật."),
});

export default function Signup({ csrfToken, meta }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const signUpHandler = async (values, setSubmitting) => {
    try {
      setStatus("Đang đăng ký...");
      console.log("Submitting signup:", values); // Debug
      const { data } = await axios.post(`${baseUrl}/api/auth/signup`, {
        name: values.username,
        email: values.email,
        phone: values.phone,
        password: values.password,
        conf_password: values.confirm_password,
        agree: values.agree,
      });
      console.log("Signup response:", data); // Debug
      setSuccess(data.message);
      setError("");
      setStatus("Đăng ký thành công!");
      toast.success("Đăng ký thành công!");
      setSubmitting(false);
      setTimeout(() => {
        Router.push("/dang-nhap");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setStatus("");
      setSuccess("");
      setError(error.response?.data?.message || "Đã xảy ra lỗi.");
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi.");
      setSubmitting(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <Head>
        <title>Đăng ký tài khoản - Giang Nội Tiết | Chăm sóc sức khỏe nội tiết chuyên nghiệp</title>
        <meta name="description" content="Đăng ký tài khoản miễn phí tại Giang Nội Tiết để được tư vấn và chăm sóc sức khỏe nội tiết chuyên nghiệp. Dịch vụ khám bệnh, điều trị tiểu đường, tuyến giáp, hormone với đội ngũ bác sĩ giàu kinh nghiệm." />
        <meta name="keywords" content="đăng ký giang nội tiết, tài khoản nội tiết, khám nội tiết, điều trị tiểu đường, tuyến giáp, hormone, bác sĩ nội tiết, tư vấn sức khỏe" />
        <meta name="author" content="Giang Nội Tiết" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://giangnoitiet.vn/dang-ky" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://giangnoitiet.vn/dang-ky" />
        <meta property="og:title" content="Đăng ký tài khoản - Giang Nội Tiết | Chăm sóc sức khỏe nội tiết chuyên nghiệp" />
        <meta property="og:description" content="Đăng ký tài khoản miễn phí tại Giang Nội Tiết để được tư vấn và chăm sóc sức khỏe nội tiết chuyên nghiệp. Dịch vụ khám bệnh, điều trị tiểu đường, tuyến giáp, hormone." />
        <meta property="og:image" content="https://giangnoitiet.vn/images/og-dang-ky.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Giang Nội Tiết" />
        <meta property="og:locale" content="vi_VN" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://giangnoitiet.vn/dang-ky" />
        <meta property="twitter:title" content="Đăng ký tài khoản - Giang Nội Tiết | Chăm sóc sức khỏe nội tiết chuyên nghiệp" />
        <meta property="twitter:description" content="Đăng ký tài khoản miễn phí tại Giang Nội Tiết để được tư vấn và chăm sóc sức khỏe nội tiết chuyên nghiệp." />
        <meta property="twitter:image" content="https://giangnoitiet.vn/images/og-dang-ky.jpg" />
        
        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="vi" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="theme-color" content="#10b981" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Đăng ký tài khoản - Giang Nội Tiết",
              "description": "Đăng ký tài khoản miễn phí tại Giang Nội Tiết để được tư vấn và chăm sóc sức khỏe nội tiết chuyên nghiệp",
              "url": "https://giangnoitiet.vn/dang-ky",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Giang Nội Tiết",
                "url": "https://giangnoitiet.vn"
              },
              "about": {
                "@type": "MedicalOrganization",
                "name": "Giang Nội Tiết",
                "description": "Chuyên khám và điều trị các bệnh về nội tiết",
                "url": "https://giangnoitiet.vn",
                "telephone": "0335328668",
                "email": "lienhe@giangnoitiet.vn",
                "medicalSpecialty": "Endocrinology"
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Trang chủ",
                    "item": "https://giangnoitiet.vn"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Đăng ký",
                    "item": "https://giangnoitiet.vn/dang-ky"
                  }
                ]
              }
            })
          }}
        />
      </Head>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

      <section
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

        

        <div className="bg-white/95 backdrop-blur-lg border border-white/40 rounded-2xl p-8 w-full max-w-md relative z-10 shadow-2xl bt-shimmer">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Đăng ký</h2>
          <Formik
            initialValues={{
              username: "",
              email: "",
              phone: "",
              password: "",
              confirm_password: "",
              agree: false,
            }}
            validationSchema={signupValidation}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Form values:", values); // Debug
              if (!values.agree) {
                toast.error("Bạn phải đồng ý với Điều khoản & Chính sách bảo mật.");
                setSubmitting(false);
                return;
              }
              signUpHandler(values, setSubmitting);
            }}
          >
            {({ values, setFieldValue, handleChange, errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

                {/* Username */}
                <div className="relative">
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Họ và tên <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm gap-4 bt-form-input shadow-sm">
                    <span className="pl-3 text-green-600">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      className="w-full p-3 bg-transparent text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Tên người dùng"
                      required
                    />
                  </div>
                  {errors.username && touched.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Địa chỉ Email <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm gap-4 bt-form-input shadow-sm">
                    <span className="pl-3 text-green-600">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-transparent text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Địa chỉ email"
                      required
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Số điện thoại <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm gap-4 bt-form-input shadow-sm">
                    <span className="pl-3 text-green-600">
                      <FaPhoneAlt />
                    </span>
                    <input
                      type="text"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      className="w-full p-3 bg-transparent text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Số điện thoại"
                      required
                    />
                  </div>
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Mật khẩu <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm gap-4 bt-form-input shadow-sm">
                    <span className="pl-3 text-green-600">
                      <FaLock />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      className="w-full p-3 bg-transparent text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Mật khẩu"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="pr-3 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Xác nhận mật khẩu <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm gap-4 bt-form-input shadow-sm">
                    <span className="pl-3 text-green-600">
                      <FaLock />
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      className="w-full p-3 bg-transparent text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Xác nhận mật khẩu"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="pr-3 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirm_password && touched.confirm_password && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
                  )}
                </div>

                {/* Agree to Terms */}
                <div className="relative">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={values.agree}
                      onChange={(e) => setFieldValue("agree", e.target.checked)}
                      className="h-4 w-4 text-green-600 bg-white border-gray-300 rounded focus:ring-green-500"
                    />
                    <label className="ml-2 text-gray-700 text-sm">
                      Tôi đồng ý với{" "}
                      <Link href="/chinh-sach-bao-mat" className="text-green-600 hover:text-green-700 hover:underline">
                        Điều khoản & Chính sách bảo mật
                      </Link>
                    </label>
                  </div>
                </div>

                {/* Status Message */}
                {status && (
                  <p
                    className={`text-center ${
                      status.includes("thành công") ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {status}
                  </p>
                )}
                {success && <p className="text-center text-green-500">{success}</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bt-button-enhanced bt-ripple"
                >
                  Đăng ký
                </button>

                {/* Link to Login */}
                <div className="text-center">
                  <span className="pr-2 text-gray-700">Đã có tài khoản?</span>
                  <Link
                    href="/dang-nhap"
                    className="text-green-600 text-base hover:text-green-700 transition-colors"
                  >
                    Đăng nhập
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  console.log("Signup session:", session); // Debug

  if (session) {
    console.log("Redirecting to dashboard");
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      csrfToken: csrfToken || null,
      meta: pageMetas.register,
    },
  };
}