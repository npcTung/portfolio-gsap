"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

interface ValueProps {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<ValueProps>({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnclick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 1. check form
    if (!formRef.current) {
      toast.error("Lỗi: Không tìm thấy form.");
      return;
    }
    // 2. check value
    if (!value.name.trim() || !value.email.trim() || !value.message.trim()) {
      toast.error("Vui lòng điền đầy đủ tất cả các trường.");
      return;
    }
    // 3. check email
    if (!/\S+@\S+\.\S+/.test(value.email)) {
      toast.error("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromName: value.name,
            fromEmail: value.email,
            message: value.message,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success(result.message);
          setValue({ name: "", email: "", message: "" });
          formRef.current?.reset();
        } else
          throw new Error(result.message || "Đã xảy ra lỗi khi gửi tin nhắn.");
      } catch (error) {
        const err = error as Error;
        toast.error(err.message);
      }
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl font-bold text-center text-gray-100 mb-12"
        >
          Liên Hệ Với Tôi
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={"/images/contact.jpg"}
            alt="contact"
            className="size-full hidden lg:block"
          />
          <form
            ref={formRef}
            onSubmit={handleOnclick}
            className="bg-[#1d1d1d]/45 p-8 border rounded-tr-2xl rounded-br-2xl border-gray-700"
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-200 text-sm font-bold mb-2"
              >
                Tên của bạn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                required
                value={value.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-200 text-sm font-bold mb-2"
              >
                Email của bạn
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                required
                value={value.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-200 text-sm font-bold mb-2"
              >
                Lời nhắn
              </label>
              <textarea
                id="message"
                name="message"
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline max-h-[150px] min-h-[100px]"
                required
                value={value.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-colors w-full cursor-pointer flex items-center justify-center gap-3"
              >
                {isPending && <Loading />}
                {isPending ? "Đang gửi..." : "Gửi tin nhắn"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

const Loading = () => {
  return (
    <svg
      fill="#ffffff"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      className="animate-spin"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z"></path>{" "}
      </g>
    </svg>
  );
};
