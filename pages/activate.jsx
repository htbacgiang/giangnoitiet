// pages/activate.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaSpinner } from 'react-icons/fa';

export default function ActivateAccount() {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      fetch('/api/auth/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessage(data.message);
          setIsSuccess(data.success || data.message.includes('thành công'));
          setIsLoading(false);
        })
        .catch(() => {
          setMessage('Có lỗi xảy ra, vui lòng thử lại.');
          setIsSuccess(false);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>Kích hoạt tài khoản | Giang Nội Tiết</title>
        <meta
          name="description"
          content="Tài khoản Giang Nội Tiết của bạn đã được kích hoạt thành công. Khám phá dịch vụ chăm sóc sức khỏe nội tiết chuyên nghiệp, bảo vệ sức khỏe gia đình bạn."
        />
        <meta
          name="keywords"
          content="Giang Nội Tiết, nội tiết, tài khoản kích hoạt, chăm sóc sức khỏe, bệnh nội tiết, tiểu đường, tuyến giáp"
        />
        <link rel="canonical" href="https://giangnoitiet.vn/activate" />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="Kích hoạt tài khoản | Giang Nội Tiết"
        />
        <meta
          property="og:description"
          content="Tài khoản Giang Nội Tiết của bạn đã được kích hoạt thành công. Khám phá dịch vụ chăm sóc sức khỏe nội tiết chuyên nghiệp, bảo vệ sức khỏe gia đình bạn."
        />
        <meta property="og:url" content="https://giangnoitiet.vn/activate" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://giangnoitiet.vn/logo-giang-noi-tiet.png"
        />
        <meta
          property="og:image:alt"
          content="Kích hoạt tài khoản Giang Nội Tiết"
        />
      </Head>
      
      {/* Simple Clean Background */}
      <div className="min-h-screen bg-gray-50">
        {/* Main Content Container */}
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl mx-auto w-full">
            
            {/* Loading State */}
            {isLoading && (
              <div className="text-center">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="animate-spin text-4xl text-green-500 mb-4 flex justify-center">
                    <FaSpinner />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Đang kích hoạt tài khoản...
                  </h2>
                  <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
                </div>
              </div>
            )}

            {/* Success/Error State */}
            {!isLoading && (
              <div className="text-center">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  
                  {/* Status Icon */}
                  <div className="mb-6">
                    {isSuccess ? (
                      <div className="text-5xl text-green-500 mb-4 flex justify-center">
                        <FaCheckCircle />
                      </div>
                    ) : (
                      <div className="text-5xl text-red-500 mb-4 flex justify-center">
                        ❌
                      </div>
                    )}
                  </div>

                  {/* Main Heading */}
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    {isSuccess ? 
                      'Chào mừng bạn đến với Giang Nội Tiết!' : 
                      'Kích hoạt không thành công'
                    }
                  </h1>

                  {/* Message */}
                  {message && (
                    <div className={`p-4 rounded-lg mb-6 ${
                      isSuccess ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <p className={`${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
                        {message}
                      </p>
                    </div>
                  )}

                  {/* Success Description */}
                  {isSuccess && (
                    <div className="mb-6">
                      <p className="text-gray-700 leading-relaxed mb-6">
                        Tài khoản của bạn đã được kích hoạt thành công! Chúng tôi rất vui khi bạn đã chọn 
                        gia nhập cộng đồng Giang Nội Tiết - nơi cung cấp dịch vụ chăm sóc sức khỏe nội tiết 
                        chuyên nghiệp, an toàn cho sức khỏe của bạn và gia đình.
                      </p>
                  
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      <FaArrowLeft className="mr-2" />
                      Về Trang Chủ
                    </Link>
                    
                    {isSuccess && (
                      <Link
                        href="/dang-nhap"
                        className="inline-flex items-center justify-center bg-white text-green-600 px-6 py-3 rounded-lg font-semibold border-2 border-green-600 hover:bg-green-600 hover:text-white transition-colors"
                      >
                        Đăng Nhập
                        <span className="ml-2">🚀</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
