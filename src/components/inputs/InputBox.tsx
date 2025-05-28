import { useState, useEffect } from "react";

type InputBoxProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
};

export function InputBox({ onChange, value = "", placeholder = "Type here..." }: InputBoxProps) {
  const [inputValue, setInputValue] = useState(value);
  const [touched, setTouched] = useState(false);
  const isEmpty = inputValue.trim().length === 0;

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setTouched(true);
    onChange(e);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={inputValue}
        placeholder={placeholder}
        className={`w-full border ${touched && isEmpty ? 'border-red-500 focus:outline-none' : 'border-gray-400'} rounded py-4 px-4 focus:outline-neutral-900 focus:outline shadow-2xl`}
      />
      {touched && isEmpty && <p className="text-red-500 text-sm mt-1">This field cannot be empty.</p>}
    </div>
  );
}