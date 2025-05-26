import { useState } from "react";
import { ProgressBar } from "./ProgessBar";
import type { ChangeEvent } from "react";

export function HabitCard({ title, color }: { title: string; color: string }) {

  const [countDays, setCountDays] = useState(0);

  const days = ["M", "T", "W", "T", "F", "S", "S"];


  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountDays((prevCount) => {
      const newCount = prevCount + (e.target.checked ? 1 : -1);
      return Math.max(0, Math.min(newCount, 7));
    });
  };

  return (
    <div
      className="relative flex flex-col h-70 rounded-lg shadow-xl transition-all duration-100 ease-in-out hover:scale-105"
    >
      <div
        className="flex justify-between rounded-lg items-center w-full p-2 text-xl font-semibold border-2 z-40"
        style={{
          backgroundColor: color,
        }}
      >
        <h2>{title}</h2>
        <span>✗</span>
      </div>
      <div className="flex flex-col w-full p-4 border-l-2 border-r-2 border-b-2  h-full" style={{ borderColor: color }}>
        <div className="p-4 w-full grid grid-cols-7 grid-rows-2 justify-center align-center gap-2">
          {days.map((day, index) => (
            <span className="place-self-center" key={day + index}>
              {day}
            </span>
          ))}

          {days.map(() => (
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              className="place-self-center appearance-none w-6 h-6 border-2 border-gray-400 rounded-sm relative checked:after:content-['✓'] checked:after:text- checked:after:text-xl checked:after:font-bold checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 focus:outline-none"
            />
          ))}
        </div>
        <ProgressBar value={countDays} min={0} max={7} />
        <p>{countDays}/7 Days completed</p>
      </div>
    </div>
  );
}
