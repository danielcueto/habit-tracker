type ButtonProps = {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  text,
  type = "button",
  onClick = () => { },
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-5 rounded border transition-all duration-100 ease-in-out ${disabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-70"
          : "bg-white drop-shadow-xl/25 text-black hover:bg-gray-300 cursor-pointer hover:scale-105 active:scale-95"
        }`}
    >
      {text}
    </button>
  );
}
