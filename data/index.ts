export const projects: {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
}[] = [
  {
    title: "Dự án Social Network",
    description:
      "Một ứng dụng mạng xã hội đầy đủ tính năng xây dựng bằng next.js, nest.js và mongodb.",
    imageUrl: "/images/pinterest.png", // Đổi thành ảnh của bạn
    githubUrl: "https://github.com/npcTung/pinterest-app-next_nestjs",
  },
  {
    title: "Dự án cho thuê phòng trọ",
    description:
      "Dự án được xây dựng bằng MERN(Reactjs, Express.js, Node.js, Mongodb).",
    imageUrl: "/images/thue-tro.jpg", // Đổi thành ảnh của bạn
    githubUrl: "https://github.com/npcTung/web_phongtro123_clone",
  },
  {
    title: "Ứng dụng E-commerce",
    description: "Một úng dụng đăng bán hàng online với đầy đủ tính năng.",
    imageUrl: "/images/e-commerce.jpg", // Đổi thành ảnh của bạn
    githubUrl: "https://github.com/npcTung/local_web_ruou",
  },
];

export const navlinks: { title: string; href: string }[] = [
  { title: "Trang Chủ", href: "hero" },
  { title: "Giới Thiệu", href: "about" },
  { title: "Dự Án", href: "projects" },
  { title: "Liên Hệ", href: "contact" },
];

export const skills: { title: string; img: string }[] = [
  { title: "JavaScript (ES6+)", img: "/images/javascript.png" },
  { title: "TypeScript", img: "/images/typescript.png" },
  { title: "React.js / Next.js", img: "/images/react.png" },
  { title: "Node.js / Express.js / Nest.js", img: "/images/node-js.png" },
  { title: "HTML5 / CSS3 (Tailwind CSS)", img: "/images/tailwindcss.png" },
  { title: "GSAP / Framer Motion", img: "/images/gsap.jpg" },
  { title: "SQL / NoSQL (MongoDB)", img: "/images/database.png" },
  { title: "Git / GitHub", img: "/images/git.png" },
];

export const socialNetworks: { img: string; href: string; title: string }[] = [
  {
    img: "/images/github.png",
    href: "https://github.com/npcTung",
    title: "GitHub",
  },
  {
    img: "/images/facebook.png",
    href: "https://www.facebook.com/tung.khanh.0318/",
    title: "Facebook",
  },
  {
    img: "/images/instagram.png",
    href: "https://www.instagram.com/_n.p.c_tung.18_/",
    title: "Instagram",
  },
  {
    img: "/images/youtube.png",
    href: "https://www.youtube.com/@N.P.C__Tung.20",
    title: "Youtube",
  },
  {
    img: "/images/zalo.png",
    href: "https://zalo.me/0388736087",
    title: "Zalo",
  },
];

export const logoIconsList: { imgPath: string }[] = [
  { imgPath: "/images/logos/company-logo-1.png" },
  { imgPath: "/images/logos/company-logo-2.png" },
  { imgPath: "/images/logos/company-logo-3.png" },
  { imgPath: "/images/logos/company-logo-4.png" },
  { imgPath: "/images/logos/company-logo-5.png" },
  { imgPath: "/images/logos/company-logo-6.png" },
  { imgPath: "/images/logos/company-logo-7.png" },
  { imgPath: "/images/logos/company-logo-8.png" },
  { imgPath: "/images/logos/company-logo-9.png" },
  { imgPath: "/images/logos/company-logo-10.png" },
  { imgPath: "/images/logos/company-logo-11.png" },
];
