export function InputBox({
  onChange,
  value = "",
  placeholder = "Type here...",
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
}) {
  return (
    <input
      type="text"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className="w-full border border-gray-400 rounded py-4 px-4 focus:outline-neutral-900 focus:outline shadow-2xl"
    />
  );
}