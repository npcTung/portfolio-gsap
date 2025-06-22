"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef } from "react";

type Props = {
  numStars?: number; // Số lượng ngôi sao, mặc định 100
};

const GalaxyBackground = ({ numStars = 100 }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement[]>([]);

  const createStar = useCallback(() => {
    if (!containerRef.current) return null;

    const star = document.createElement("div");
    const size = Math.floor(Math.random() * 3) + 1; // Kích thước 1, 2 hoặc 3 px
    star.className = `star size-${size}`;

    // Vị trí ngẫu nhiên trong viewport
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;

    containerRef.current.appendChild(star);
    starsRef.current.push(star);

    return star;
  }, []);

  useEffect(() => {
    // Tạo và animate các ngôi sao ban đầu
    for (let i = 0; i < numStars; i++) {
      const star = createStar();
      if (star) {
        // Animation nhấp nháy (flicker)
        gsap.to(star, {
          opacity: 0.5 + Math.random() * 0.5, // Độ mờ ngẫu nhiên từ 0.5 đến 1
          duration: 1 + Math.random() * 2, // Thời gian nhấp nháy ngẫu nhiên
          repeat: -1, // Lặp vô hạn
          yoyo: true, // Nhấp nháy lên xuống
          ease: "sine.inOut",
          delay: Math.random() * 2, // Delay ngẫu nhiên để tạo sự không đồng bộ
        });

        // Animation di chuyển nhẹ nhàng (drift)
        gsap.to(star, {
          x: (Math.random() - 0.5) * 20, // Di chuyển ngang ngẫu nhiên
          y: (Math.random() - 0.5) * 20, // Di chuyển dọc ngẫu nhiên
          duration: 10 + Math.random() * 20, // Thời gian di chuyển dài
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 5,
        });
      }
    }

    // Cleanup: Xóa tất cả các ngôi sao khi component unmount
    return () => {
      starsRef.current.forEach((star) => star.remove());
      starsRef.current = []; // Xóa khỏi mảng refs
    };
  }, [numStars, createStar]);

  return <div ref={containerRef} className="galaxy-background" />;
};

export default GalaxyBackground;
