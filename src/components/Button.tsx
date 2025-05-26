export function Button({text}: {text: string}) {
  return (
    <button className="bg-white drop-shadow-xl/25 text-black py-2 px-6 rounded border hover:bg-gray-300 cursor-pointer transition-all duration-100 ease-in-out hover:scale-105 active:scale-95">
      {text}
    </button>
  );
}

