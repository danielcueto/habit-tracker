import { useState, useEffect } from "react";

type SearchInputProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  value?: string;
};

export function SearchInput({ onChange, value = "", placeholder = "Search..." }: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full flex items-center">
      <input
        type="text"
        onChange={handleChange}
        value={inputValue}
        placeholder={placeholder}
        className="w-full border rounded-2xl py-2.5 px-4 
                text-sm h-10
                focus:outline-neutral-900 focus:outline shadow-2xl"
      />
    </div>
  );
}
