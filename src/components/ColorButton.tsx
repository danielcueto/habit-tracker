export function ColorButton({ color }: { color: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full shadow-xl/30 transition-all duration-50 ease-in-out cursor-pointer hover:scale-110 hover:outline-2 hover:outline-offset-2"
      style={{ 
        backgroundColor: color,
        "--hover-color": color,
        outlineColor: color
      } as React.CSSProperties}
    ></div>
  );
}