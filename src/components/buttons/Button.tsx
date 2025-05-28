export function Button({
  text,
  type = "button",
  onClick = () => {},
}: {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-white drop-shadow-xl/25 text-black py-2 px-5 rounded border hover:bg-gray-300 cursor-pointer transition-all duration-100 ease-in-out hover:scale-105 active:scale-95"
    >
      {text}
    </button>
  );
}
