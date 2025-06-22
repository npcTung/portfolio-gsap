"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
};

const ProjectCard = (props: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation card
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-[#272727] rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
    >
      <div className="relative w-full h-48">
        <Image
          src={props.imageUrl}
          alt={props.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-100 mb-2">{props.title}</h3>
        <p className="text-gray-300 mb-4">{props.description}</p>
        <div className="flex space-x-4">
          <a
            href={props.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
