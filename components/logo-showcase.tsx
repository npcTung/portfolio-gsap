import { logoIconsList } from "@/data";

const LogoShowcase = () => {
  return (
    <div className="relative hidden md:block">
      <div className="gradient-edge" />
      <div className="gradient-edge" />
      <div className="marquee h-52">
        <div className="marquee-box md:gap-12 gap-5">
          {logoIconsList.map((icon, idx) => (
            <LogoIcon key={idx} icon={icon} />
          ))}

          {logoIconsList.map((icon, idx) => (
            <LogoIcon key={idx} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;

type LogoIconProps = {
  icon: { imgPath: string };
};

const LogoIcon = ({ icon }: LogoIconProps) => {
  return (
    <div className="flex flex-center marquee-item">
      <img src={icon.imgPath} alt={icon.imgPath} />
    </div>
  );
};
