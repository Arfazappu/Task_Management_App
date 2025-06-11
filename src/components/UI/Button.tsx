type ButtonProps = {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
  showTextOn?: "all" | "md" | "lg";
  extraStyles?:string;
};

const Button = ({
  text,
  icon,
  onClick,
  variant = "primary",
  showTextOn = "all",
  extraStyles = "",
}: ButtonProps) => {
  const isOutline = variant === "outline";

  const variantClass = isOutline
    ? "bg-transparent border-2 border-[#941B0F] text-[#941B0F]"
    : "bg-[#941B0F] text-white border border-transparent";

  const baseClass =
    "h-10 px-4 inline-flex items-center justify-center gap-2 cursor-pointer font-semibold text-sm md:text-base rounded-xs transition duration-200";

  const textClass =
    showTextOn === "md"
      ? "hidden md:inline"
      : showTextOn === "lg"
      ? "hidden lg:inline"
      : "";

  return (
    <button onClick={onClick} className={`${baseClass} ${variantClass} ${extraStyles}`}>
      {icon && <span>{icon}</span>}
      {text && <span className={textClass}>{text}</span>}
    </button>
  );
};

export default Button;

