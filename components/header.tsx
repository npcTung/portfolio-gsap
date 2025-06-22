"use client";

import { navlinks } from "@/data";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // Animation header
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    // Animation logo
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
    );
    // Animation nav link
    gsap.fromTo(
      navLinksRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out",
      }
    );
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

    const headerHeight = headerRef.current?.offsetHeight || 0;

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
    <header
      ref={headerRef}
      className="sticky top-0 bg-black z-50 shadow-md py-4"
    >
      <nav className="container mx-auto flex justify-between items-center px-4">
        <a
          ref={logoRef}
          href="#hero"
          onClick={(e) => handleSmoothScroll(e, "hero")}
          className="text-2xl font-bold text-white"
        >
          NPC__Tùng Admin
        </a>
        <ul className="md:flex space-x-6 hidden">
          {navlinks.map((link, idx) => (
            <li
              key={idx}
              ref={(el) => {
                navLinksRef.current[idx] = el;
              }}
            >
              <a
                href={`#${link.href}`}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-gray-300 hover:text-blue-600 transition-colors"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
