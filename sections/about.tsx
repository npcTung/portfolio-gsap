"use client";

import { skills } from "@/data";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollToPlugin);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    // Animation title to scroll
    gsap.fromTo(
      [titleRef.current, textRef.current],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
    // Animation skill
    gsap.fromTo(
      skillsRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-16" id="about">
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl font-bold text-center text-gray-100 mb-8"
        >
          Về Tôi
        </h2>
        <p
          ref={textRef}
          className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12"
        >
          Tôi là một nhà phát triển phần mềm với nhiều năm kinh nghiệm trong
          việc xây dựng các ứng dụng web hiệu suất cao. Tôi đam mê học hỏi công
          nghệ mới và giải quyết các vấn đề phức tạp.
        </p>
        <div>
          {/* Kỹ năng */}
          <div className="p-6 bg-[#171717]/45 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              Kỹ Năng
            </h3>
            <ul
              className="text-gray-200 space-y-2 grid grid-cols-1
            md:grid-cols-2"
            >
              {skills.map((skill, idx) => (
                <li
                  key={idx}
                  ref={(el) => {
                    skillsRef.current[idx] = el;
                  }}
                  className="flex items-center gap-3"
                >
                  <Image
                    src={skill.img}
                    alt={skill.title}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                  {skill.title}
                </li>
              ))}
            </ul>
          </div>
          {/* Kinh nghiệm */}
          {/* <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Kinh nghiệm
            </h3>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;
