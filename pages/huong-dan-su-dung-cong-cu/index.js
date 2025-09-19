import Head from 'next/head';
import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { pageMetas } from '../../utils/metaUtils';

export default function HuongDanSuDungCongCu({ meta = {} }) {
  // JSON-LD Schema.org cho trang hướng dẫn sử dụng
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": meta?.title || "Hướng dẫn sử dụng công cụ kiểm tra tiểu đường thai kỳ",
    "description": meta?.description || "Hướng dẫn từng bước cách sử dụng công cụ kiểm tra đường huyết của Giang Nội Tiết",
    "url": meta?.canonical || "https://giangnoitiet.vn/huong-dan-su-dung-cong-cu",
    "provider": {
      "@type": "MedicalOrganization",
      "name": "Giang Nội Tiết",
      "url": "https://giangnoitiet.vn"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "Nhập thông tin cơ bản",
        "text": "Nhập tuần thai hiện tại và chọn đơn vị đo lường (mmol/L hoặc mg/dL)."
      },
      {
        "@type": "HowToStep",
        "name": "Nhập chỉ số đường huyết",
        "text": "Điền các chỉ số đường huyết đói, sau ăn 1 giờ và sau ăn 2 giờ. Bạn có thể nhập một hoặc nhiều chỉ số."
      },
      {
        "@type": "HowToStep",
        "name": "Xem kết quả đánh giá",
        "text": "Công cụ sẽ hiển thị mức độ nguy cơ (Thấp, Trung bình, Cao) kèm theo khuyến nghị cụ thể dựa trên chỉ số của bạn."
      },
      {
        "@type": "HowToStep",
        "name": "Lưu trữ và theo dõi",
        "text": "Sử dụng tính năng lưu kết quả để theo dõi lịch sử đường huyết, giúp bác sĩ đánh giá tình trạng sức khỏe của bạn dễ dàng hơn."
      }
    ]
  };

  return (
    <DefaultLayout 
      title={meta?.title}
      desc={meta?.description}
      thumbnail={meta?.og?.image}
      meta={meta}
    >
      <Head>
        {/* JSON-LD HowTo Schema cho trang hướng dẫn */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="h-[80px]"></div>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent mb-3">
              📖 Hướng dẫn sử dụng công cụ
            </h1>
            <p className="text-emerald-600 text-lg mb-2">
              Cách sử dụng công cụ kiểm tra tiểu đường thai kỳ hiệu quả
            </p>
            <p className="text-gray-500 text-sm">
              Hướng dẫn từng bước để theo dõi sức khỏe thai kỳ tốt nhất
            </p>
          </div>

          {/* Quick Access */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-emerald-100 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-emerald-900 mb-4">
                🚀 Truy cập công cụ ngay
              </h2>
              <Link href="/cong-cu-kiem-tra-tieu-duong-thai-ky">
                <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                  🔬 Sử dụng công cụ kiểm tra
                </button>
              </Link>
            </div>
          </div>

          {/* Step by Step Guide */}
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-emerald-900 mb-3">
                    📊 Nhập thông tin cơ bản
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Tuần thai:</strong> Nhập chính xác tuần thai hiện tại của bạn</p>
                    <p><strong>Đơn vị đo:</strong> Chọn mmol/L (Việt Nam) hoặc mg/dL (quốc tế)</p>
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                      <p className="text-sm text-emerald-800">
                        💡 <strong>Lưu ý:</strong> Đảm bảo thông tin tuần thai chính xác để có kết quả đánh giá phù hợp
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900 mb-3">
                    🩸 Nhập chỉ số đường huyết
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Đường huyết đói:</strong> Đo sau khi nhịn ăn 8-12 tiếng</p>
                    <p><strong>Đường huyết 1 giờ:</strong> Đo 1 giờ sau khi uống 75g glucose</p>
                    <p><strong>Đường huyết 2 giờ:</strong> Đo 2 giờ sau khi uống 75g glucose</p>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">
                        ⚠️ <strong>Quan trọng:</strong> Chỉ cần nhập ít nhất 1 trong 3 chỉ số để có kết quả đánh giá
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-emerald-900 mb-3">
                    📈 Xem kết quả đánh giá
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Mức độ nguy cơ:</strong> Thấp, Trung bình, hoặc Cao</p>
                    <p><strong>Khuyến nghị:</strong> Lời khuyên cụ thể dựa trên kết quả</p>
                    <p><strong>Tiêu chuẩn:</strong> Dựa trên tiêu chuẩn Bộ Y tế Việt Nam</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <p className="text-sm font-semibold text-green-800">✅ Nguy cơ thấp</p>
                        <p className="text-xs text-green-600">Tiếp tục theo dõi định kỳ</p>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        <p className="text-sm font-semibold text-yellow-800">⚠️ Nguy cơ trung bình</p>
                        <p className="text-xs text-yellow-600">Cần theo dõi chặt chẽ hơn</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                        <p className="text-sm font-semibold text-red-800">🚨 Nguy cơ cao</p>
                        <p className="text-xs text-red-600">Cần tư vấn bác sĩ ngay</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900 mb-3">
                    📝 Lưu trữ và theo dõi
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Lưu kết quả:</strong> Nhấn &quot;Lưu kết quả&quot; để theo dõi lịch sử</p>
                    <p><strong>Xem thống kê:</strong> Theo dõi xu hướng đường huyết theo thời gian</p>
                    <p><strong>Xuất báo cáo:</strong> Tạo báo cáo để chia sẻ với bác sĩ</p>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">
                        📊 <strong>Lợi ích:</strong> Theo dõi lịch sử giúp bác sĩ đánh giá hiệu quả điều trị
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips and Best Practices */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-emerald-100 mt-8">
            <h3 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
              💡 Mẹo sử dụng hiệu quả
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-emerald-800 mb-3">📋 Trước khi đo</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Nhịn ăn 8-12 tiếng trước khi đo đường huyết đói</li>
                  <li>• Uống đủ nước, tránh căng thẳng</li>
                  <li>• Kiểm tra máy đo và que thử còn hạn sử dụng</li>
                  <li>• Rửa tay sạch trước khi đo</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-emerald-800 mb-3">📊 Khi nhập dữ liệu</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Nhập chính xác đơn vị đo (mmol/L hoặc mg/dL)</li>
                  <li>• Ghi chú thời gian đo và tình trạng sức khỏe</li>
                  <li>• Nhập đầy đủ thông tin để có đánh giá chính xác</li>
                  <li>• Lưu kết quả thường xuyên để theo dõi xu hướng</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-emerald-100 mt-8">
            <h3 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
              ❓ Câu hỏi thường gặp
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-emerald-800 mb-2">Q: Tôi có thể sử dụng công cụ này thay thế cho việc khám bác sĩ không?</h4>
                <p className="text-sm text-gray-700">A: Không, công cụ này chỉ mang tính chất tham khảo. Bạn vẫn cần tham khảo ý kiến bác sĩ chuyên khoa để có chẩn đoán và điều trị chính xác.</p>
              </div>

              <div>
                <h4 className="font-semibold text-emerald-800 mb-2">Q: Dữ liệu của tôi có được bảo mật không?</h4>
                <p className="text-sm text-gray-700">A: Có, tất cả dữ liệu được mã hóa và bảo mật tuyệt đối. Chúng tôi tuân thủ nghiêm ngặt các quy định về bảo vệ dữ liệu cá nhân.</p>
              </div>

              <div>
                <h4 className="font-semibold text-emerald-800 mb-2">Q: Tôi có thể sử dụng công cụ này miễn phí không?</h4>
                <p className="text-sm text-gray-700">A: Có, công cụ hoàn toàn miễn phí và không cần đăng ký tài khoản.</p>
              </div>

              <div>
                <h4 className="font-semibold text-emerald-800 mb-2">Q: Khi nào tôi nên đo đường huyết?</h4>
                <p className="text-sm text-gray-700">A: Nên đo theo lịch trình của bác sĩ, thường là đường huyết đói (sáng sớm) và sau ăn 1-2 giờ. Tần suất có thể thay đổi tùy theo tình trạng sức khỏe.</p>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-emerald-100">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                🆘 Cần hỗ trợ thêm?
              </h3>
              <p className="text-gray-600 mb-6">
                Nếu bạn có thắc mắc về cách sử dụng công cụ hoặc cần tư vấn chuyên môn
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tu-van">
                  <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                    👩‍⚕️ Tư vấn chuyên gia
                  </button>
                </Link>
                
                <a href="tel:+84948907686">
                  <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                    📞 Gọi hotline
                  </button>
                </a>
              </div>

              <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-emerald-800">
                  💡 <strong>Lưu ý:</strong> Công cụ này được phát triển dựa trên tiêu chuẩn Bộ Y tế Việt Nam và các hướng dẫn quốc tế về tiểu đường thai kỳ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  try {
    return {
      props: { 
        meta: pageMetas.toolGuide 
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    
    return {
      props: { 
        meta: pageMetas.toolGuide 
      },
    };
  }
}