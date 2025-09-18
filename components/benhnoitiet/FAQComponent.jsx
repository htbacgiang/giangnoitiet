"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ExternalLink } from "lucide-react";

const FAQComponent = () => {
  const [expanded, setExpanded] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasVideoStarted, setHasVideoStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Bắt đầu với muted để autoplay được phép
  const [audioEnabled, setAudioEnabled] = useState(false); // Track if audio context is enabled

  // Force autoplay with user interaction
  const handleVideoInteraction = () => {
    try {
      // Tạo một user interaction để enable autoplay với audio
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Resume audio context nếu bị suspend
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Tạo âm thanh rất nhỏ để kích hoạt audio context
      gainNode.gain.setValueAtTime(0.001, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.05);
      
      // Set flag để cho biết user đã tương tác
      window.userHasInteracted = true;
    } catch (error) {
      console.log('Audio context error:', error);
      window.userHasInteracted = true;
    }
  };

  // Load Facebook SDK
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.FB) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
      
      script.onload = () => {
        if (window.FB) {
          window.FB.init({
            appId: 'your-app-id', // Có thể để trống nếu không cần
            version: 'v18.0'
          });
        }
      };
    }
  }, []);

  // Setup user interaction handlers for audio autoplay
  useEffect(() => {
    const enableAudioAutoplay = () => {
      handleVideoInteraction();
      setAudioEnabled(true);
      
      // Tự động unmute video sau khi có user interaction
      setTimeout(() => {
        if (hasVideoStarted) {
          setIsMuted(false);
        }
      }, 1000); // Delay 1 giây để đảm bảo video đã load
    };

    // Các sự kiện user interaction để enable audio autoplay
    const events = ['click', 'touchstart', 'keydown', 'mousedown'];
    
    events.forEach(event => {
      document.addEventListener(event, enableAudioAutoplay, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, enableAudioAutoplay);
      });
    };
  }, [hasVideoStarted]);

  // Auto unmute first video when audio is enabled
  useEffect(() => {
    if (audioEnabled && hasVideoStarted && isMuted) {
      const timer = setTimeout(() => {
        setIsMuted(false);
      }, 2000); // Delay 2 giây để đảm bảo video đã load hoàn toàn
      
      return () => clearTimeout(timer);
    }
  }, [audioEnabled, hasVideoStarted, isMuted]);

  const faqs = useMemo(
    () => [
        {
          question: "Bữa phụ đúng cho mẹ bầu tiểu đường thai kỳ?",
          answer:
            "• Chọn thực phẩm chỉ số đường huyết thấp (GI thấp)\n• Ưu tiên giàu chất xơ, đạm và chất béo tốt\n• Ví dụ: sữa chua không đường + hạt, phô mai + rau củ, táo nhỏ ăn kèm hạnh nhân\n• Ăn đúng giờ, cách bữa chính ít nhất 2 giờ\n• Không ăn quá trễ hay quá nhiều",
        image: "/images/tu-van-giang-noi-tiet.webp",
        video: "https://www.facebook.com/reel/920127953588405",
        icon: "🍎"

      },
        {
          question: "Khi nào cần test tiểu đường thai kỳ?",
          answer:
            "• Tiểu đường thai kỳ thường không có triệu chứng rõ ràng\n• Không khát nước, không tiểu nhiều, không mệt, không sốt\n• Đường huyết vẫn có thể tăng âm thầm, khiến mẹ bầu chủ quan\n• Khi phát hiện muộn: thai to, nước ối nhiều, tiềm ẩn rủi ro\n• Nên làm xét nghiệm sàng lọc từ tuần 24–28 để kịp thời phát hiện",
        image: "/images/tu-van-giang-noi-tiet.webp",
        video: "https://www.facebook.com/reel/1100106005486708",
        icon: "🩺"
      },
        {
          question: "Cách ăn đúng cho mẹ bầu tiểu đường thai kỳ?",
          answer:
            "❓ Bị tiểu đường thai kỳ thì ăn uống thế nào?\n👉 Nguyên tắc \"3 thấp – 1 đủ\":\n\n• Tinh bột thấp: không cắt hẳn mà chọn loại GI thấp (gạo lứt, yến mạch, khoai lang…)\n• Đường thấp: bỏ nước ngọt, sữa có đường, trái cây ngọt nhiều (xoài chín, chuối chín…)\n• Chất béo xấu thấp: hạn chế đồ chiên rán, mỡ động vật\n• Đủ dinh dưỡng: vẫn cần đủ đạm, rau xanh, vitamin, khoáng chất để nuôi mẹ và bé",
          image: "/images/tu-van-giang-noi-tiet.webp",
          video: "https://www.facebook.com/reel/1252179956611150",
        icon: "📋"
      },
        {
          question: "Thứ tự ăn đúng cho mẹ bầu tiểu đường thai kỳ?",
          answer:
            "👉 Không nên ăn hết rau → hết thịt → cuối cùng mới ăn tinh bột, vì sẽ làm đường huyết sau 2 giờ tăng cao hơn sau 1 giờ.\n\n👉 Thứ tự đúng: xem video",
          image: "/images/tu-van-giang-noi-tiet.webp",
          video: "https://www.facebook.com/reel/715262457921116",
        icon: "🍽️"
      },
      {
        question: "Tiểu đường thai kì ăn bao nhiêu cơm mỗi bữa là đủ?",
        answer:
          "👉 Mỗi bữa chính, mẹ bầu nên ăn khoảng ⅔ bát cơm trắng hoặc 1 bát cơm gạo lứt.\n\n👉 Ăn kèm đạm, rau xanh, chất xơ, không nên cắt bỏ hoàn toàn tinh bột để tránh thiếu năng lượng và nguy cơ sinh xê-tôn.",
          image: "/images/tu-van-giang-noi-tiet.webp",
          video: "https://www.facebook.com/reel/715262457921116",
        icon: "🍚"
      },
    
    ],
    []
  );

  const toggleFAQ = (index) => {
    setExpanded(expanded === index ? null : index);
    setSelectedMedia(index);
    
    // Reset video state khi chuyển câu hỏi
    if (selectedMedia !== index) {
      setIsVideoPlaying(false);
      setHasVideoStarted(false);
      setIsMuted(true); // Reset về muted khi chuyển video
      
      // Enable autoplay với user interaction
      handleVideoInteraction();
      
      // Auto start video khi chuyển câu hỏi mới
      setTimeout(() => {
        setHasVideoStarted(true);
        
        // Nếu audio đã được enable, tự động unmute sau khi video load
        if (audioEnabled) {
          setTimeout(() => {
            setIsMuted(false);
          }, 1500); // Delay thêm để đảm bảo iframe đã load xong
        }
      }, 300);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      // Khi unmute, đảm bảo audio context được kích hoạt
      handleVideoInteraction();
    }
  };

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const currentFaq = faqs[selectedMedia];

  return (
    <section className="py-16  relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-100/20 to-emerald-100/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full ring-1 ring-teal-200/50 shadow-sm">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span className="text-teal-700 font-medium">Giải Đáp Thắc Mắc</span>
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
          <p className="text-[1.8rem] md:text-4xl font-bold md:mb-4 mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-600">
              Hỏi Đáp Tiểu Đường Thai Kỳ
            </span>
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto md:mb-4 mb-2 rounded-full"></div>
          <p className="text-lg text-slate-600/90 max-w-4xl mx-auto">
            Tìm hiểu các thông tin cần thiết để kiểm soát tiểu đường thai kỳ, đảm bảo sức khỏe cho mẹ và bé
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* FAQ Section */}
          <div className="space-y-3 lg:col-span-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group rounded-2xl overflow-hidden transition-all duration-300 ${
                  selectedMedia === index
                    ? "bg-gradient-to-br from-teal-50 to-emerald-50 ring-2 ring-teal-200 shadow-lg"
                    : "bg-white/80 backdrop-blur-sm ring-1 ring-white/40 shadow-md hover:shadow-lg"
                }`}
              >
                <button
                  className="w-full p-4 lg:p-5 text-left transition-all duration-300 hover:bg-white/50"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={expanded === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl lg:text-2xl">{faq.icon}</span>
                      <h3 className={`font-semibold text-sm lg:text-base transition-colors duration-300 ${
                        selectedMedia === index ? "text-teal-700" : "text-slate-700"
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown className={`w-4 h-4 lg:w-5 lg:h-5 transition-all duration-300 ${
                      expanded === index ? "rotate-180" : ""
                    } ${selectedMedia === index ? "text-teal-600" : "text-slate-400"}`} />
                  </div>
                </button>
                
                 {/* Mobile Video Overlay - không làm thay đổi layout */}
                 {expanded === index && (
                   <div 
                     className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeInDown"
                     onClick={(e) => {
                       // Đóng video khi click vào backdrop (không phải video container)
                       if (e.target === e.currentTarget) {
                         setExpanded(null);
                       }
                     }}
                   >
                     {/* Video container */}
                     <div className="relative max-w-xs mx-auto w-full">
                       <div className="relative rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-2xl">
                         <div className="relative aspect-[9/16]">
                           <iframe
                             src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(faq.video)}&show_text=false&autoplay=true&muted=${isMuted}&playsinline=true&controls=true&width=280&height=498`}
                             width="100%"
                             height="100%"
                             style={{ border: 'none', overflow: 'hidden' }}
                             scrolling="no"
                             frameBorder="0"
                             allowFullScreen={true}
                             allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; microphone; camera; fullscreen"
                             className="rounded-2xl"
                             key={`mobile-${index}-${isMuted}`}
                           />
                           
                           {/* Close Button Overlay - thay thế nút mute */}
                           <button
                             onClick={() => setExpanded(null)}
                             className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-all duration-300 shadow-lg z-10 hover:scale-110"
                             title="Đóng video"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                             </svg>
                           </button>
                         </div>
                       </div>
                      
                       {/* Facebook Button - Mobile */}
                       <div className="mt-4 flex justify-center">
                         <a
                           href={faq.video}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm hover:scale-105"
                         >
                           <div className="relative">
                             <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                               <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                               </svg>
                             </div>
                             <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                           </div>
                           <span>Xem trên Facebook</span>
                           <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                         </a>
                       </div>
                     </div>
                   </div>
                 )}
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  expanded === index ? "max-h-64 lg:max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="px-4 lg:px-5 pb-4 lg:pb-5">
                    <div className="border-t border-slate-200/50 pt-3 lg:pt-4">
                      <div className="text-slate-600 text-sm lg:text-base leading-relaxed">
                        {faq.answer.split('\n').map((line, lineIndex) => (
                          <p key={lineIndex} className="mb-1 last:mb-0">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

           {/* Media Section - Desktop Only */}
           <div className="relative w-fit mx-auto lg:mx-0 hidden lg:block lg:col-span-1">
             <div className="relative rounded-xl overflow-hidden shadow-xl">
               {hasVideoStarted ? (
                 <div className="relative aspect-[9/16] w-64">
                   <iframe
                     src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(currentFaq.video)}&show_text=false&autoplay=true&muted=${isMuted}&playsinline=true&controls=true&width=256&height=455`}
                     width="100%"
                     height="100%"
                     style={{ border: 'none', overflow: 'hidden' }}
                     scrolling="no"
                     frameBorder="0"
                     allowFullScreen={true}
                     allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; microphone; camera; fullscreen"
                     className="rounded-xl"
                     key={`desktop-${selectedMedia}-${isMuted}`} // Force reload khi muted state thay đổi
                   />
                 </div>
               ) : (
                 <div className="relative aspect-[9/16] w-64 cursor-pointer" onClick={() => {
                   handleVideoInteraction();
                   setHasVideoStarted(true);
                 }}>
                   <Image
                     src={currentFaq.image}
                     alt={currentFaq.question}
                     fill
                     className="object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                   
                   {/* Play button overlay */}
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-16 h-16 bg-blue-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700/90 transition-colors duration-200">
                       <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M8 5v14l11-7z"/>
                       </svg>
                     </div>
                   </div>
                   
                   {/* Topic indicator */}
                   <div className="absolute bottom-3 left-3 right-3">
                     <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
                       <div className="flex items-center gap-2">
                         <span className="text-lg">{currentFaq.icon}</span>
                         <p className="text-xs text-slate-700 font-medium line-clamp-2">{currentFaq.question}</p>
                       </div>
                     </div>
                   </div>
                 </div>
               )}
             </div>


            {/* Facebook Button */}
            <div className="mt-2">
              <a
                href={currentFaq.video}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 w-64 justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 font-medium text-base"
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <span>Video Facebook </span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;