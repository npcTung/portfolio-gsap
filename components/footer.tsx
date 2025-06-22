import { socialNetworks } from "@/data";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="pt-8 pb-4 border-t border-gray-700">
      <div className="md:flex items-center md:justify-between">
        <div className="flex flex-col items-center md:items-start">
          <label className="text-sm font-semibold text-white">
            Email:{" "}
            <a
              href="mailto:tungtrinhthanh0311@gmail.com"
              className="font-medium text-gray-500 hover:text-blue-500 hover:underline transition-colors"
            >
              tungtrinhthanh0311@gmail.com
            </a>
          </label>
          <label className="text-sm font-semibold text-white">
            Phone:{" "}
            <a
              href="tel:+84388736087"
              className="font-medium text-gray-500 hover:text-blue-500 hover:underline transition-colors"
            >
              +84.388.736.087
            </a>
          </label>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm font-bold text-gray-500">Mạng xã hội</p>
          <div className="mt-4 flex justify-center space-x-6">
            {socialNetworks.map((socialNetwork, idx) => (
              <a
                key={idx}
                href={socialNetwork.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 border rounded-2xl border-gray-700 bg-gray-700"
                title={socialNetwork.title}
              >
                <Image
                  src={socialNetwork.img}
                  alt={socialNetwork.title}
                  width={30}
                  height={50}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-20">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} NPC__Tùng. Mọi quyền được bảo lưu.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
