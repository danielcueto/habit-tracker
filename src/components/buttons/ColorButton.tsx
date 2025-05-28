type ColorButtonProps = {
  color: string;
  isSelected?: boolean;
  onClick?: () => void;
};

export function ColorButton({ color, isSelected = true, onClick }: ColorButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-full shadow-xl/30 transition-all duration-50 ease-in-out cursor-pointer hover:scale-110 ${isSelected ? 'outline-2 outline-offset-2' : ''}`}
      style={{
        backgroundColor: color,
        outlineColor: color
      } as React.CSSProperties}
      type="button"
    ></button>
  );
}