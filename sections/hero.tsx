"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const cloud1Ref = useRef<HTMLDivElement>(null);
  const cloud2Ref = useRef<HTMLDivElement>(null);
  const cloud3Ref = useRef<HTMLDivElement>(null);

  const raindropsRef = useRef<HTMLDivElement[]>([]);
  const nextDropId = useRef(0);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: -0.6 }
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: -0.6 }
      );

    gsap.fromTo(
      avatarRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.7)",
        delay: 0.8,
      }
    );

    // Animation cho mây
    gsap.to(cloud1Ref.current, {
      x: "+=20", // Di chuyển qua lại
      y: "+=10",
      rotation: "+=5",
      repeat: -1, // Lặp vô hạn
      yoyo: true, // Di chuyển ngược lại
      duration: 8,
      ease: "sine.inOut",
    });
    gsap.to(cloud2Ref.current, {
      x: "-=15",
      y: "+=8",
      rotation: "-=3",
      repeat: -1,
      yoyo: true,
      duration: 10,
      ease: "sine.inOut",
      delay: 0.5,
    });
    gsap.to(cloud3Ref.current, {
      x: "+=25",
      y: "-=12",
      rotation: "+=7",
      repeat: -1,
      yoyo: true,
      duration: 12,
      ease: "sine.inOut",
      delay: 1,
    });

    // Tạo hiệu ứng mưa rơi
    const createRaindrop = () => {
      if (!sectionRef.current) return; // Đảm bảo section đã mount

      const drop = document.createElement("div");
      drop.className = "raindrop";
      drop.id = `raindrop-${nextDropId.current++}`; // ID duy nhất
      // Tạo vị trí ngẫu nhiên trong khoảng chiều rộng của section
      const sectionWidth = sectionRef.current.offsetWidth;
      const startX = Math.random() * sectionWidth;
      const startY = -20; // Bắt đầu từ trên cao

      drop.style.left = `${startX}px`;
      drop.style.top = `${startY}px`;

      // Thêm giọt mưa vào DOM
      sectionRef.current.querySelector(".cloud-container")?.appendChild(drop);
      raindropsRef.current.push(drop);

      gsap.to(drop, {
        y: "100vh", // Rơi xuống qua toàn bộ viewport
        opacity: 1,
        duration: 1 + Math.random() * 0.5, // Thời gian rơi ngẫu nhiên
        ease: "power1.in", // Tăng tốc khi rơi
        onComplete: () => {
          // Xóa giọt mưa khỏi DOM và array sau khi rơi xong
          drop.remove();
          raindropsRef.current = raindropsRef.current.filter(
            (d) => d.id !== drop.id
          );
        },
      });
    };

    // Bắt đầu tạo mưa sau một khoảng thời gian ngắn
    const rainInterval = setInterval(createRaindrop, 50); // Tạo giọt mưa mỗi 50ms

    // Dọn dẹp interval khi component unmount
    return () => {
      clearInterval(rainInterval);
      // Đảm bảo xóa tất cả giọt mưa còn lại khi component unmount
      raindropsRef.current.forEach((drop) => drop.remove());
    };
    // // Animation title
    // gsap.fromTo(
    //   titleRef.current,
    //   { opacity: 0, y: 50 },
    //   { opacity: 1, y: 1, duration: 1, ease: "power3.out", delay: 0.8 }
    // );
    // // Animation subtitle
    // gsap.fromTo(
    //   subtitleRef.current,
    //   { opacity: 0, y: 50 },
    //   { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1.2 }
    // );
    // // Animation button
    // gsap.fromTo(
    //   buttonRef.current,
    //   { opacity: 0, y: 50 },
    //   { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1.6 }
    // );
    // // Animation image
    // gsap.fromTo(
    //   imageRef.current,
    //   { opacity: 0, scale: 0.8 },
    //   { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 1.0 }
    // );
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

    const headerHeight = buttonRef.current?.offsetHeight || 0;

    gsap.to(window, {
      duration: 1.2,
      ease: "power3.out",
      scrollTo: {
        y: `#${targetId}`,
        offsetY: headerHeight,
      },
    });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-[calc(100vh-80px)] bg-[#171717]/45 overflow-hidden rounded-2xl shadow-md"
    >
      <div className="cloud-container">
        {/* Các phần tử mây */}
        <div
          ref={cloud1Ref}
          className="cloud cloud-part-2 absolute top-1/4 left-[10%]"
        />
        <div
          ref={cloud2Ref}
          className="cloud cloud-part-3 absolute top-1/3 right-[15%]"
        />
        <div
          ref={cloud3Ref}
          className="cloud cloud-part-1 absolute top-[20%] left-[45%]"
        />
      </div>

      <div className="absolute top-0 left-0 z-10">
        <img src="./images/bg.png" alt="background" />
      </div>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left px-4 py-16">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl font-extrabold text-gray-100 leading-tight mb-4"
          >
            Chào, tôi là <span className="text-blue-600">NPC__Tùng Admin</span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-lg mx-auto md:mx-0"
          >
            Một nhà phát triển web đam mê tạo ra các trải nghiệm kỹ thuật số
            tuyệt vời.
          </p>
          <a
            ref={buttonRef}
            href="#projects"
            onClick={(e) => handleSmoothScroll(e, "projects")}
            className="inline-block bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Xem Dự Án Của Tôi
          </a>
        </div>
        <div ref={avatarRef} className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-blue-300">
            <Image
              src="/images/avatar-img.jpg"
              alt="avatar-image NPC__Tùng Admin"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
