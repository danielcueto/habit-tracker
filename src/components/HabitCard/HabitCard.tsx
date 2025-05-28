import { useState, useImperativeHandle } from "react";
import { ProgressBar } from "./ProgessBar";
import type { ChangeEvent } from "react";
import { MdStars } from "react-icons/md";
import { ModalConfirmDelete } from "../modals/ModalConfirmDelete";
import type { Habit } from "../../types/habit";
import { ModalEditHabit } from "../modals/ModalEditHabit";
import { MdModeEditOutline } from "react-icons/md";

interface HabitCardProps {
  title: string;
  color: string;
  checkedDays?: boolean[];
  onDelete: () => void;
  onUpdate: (data: Partial<Habit>) => void;
  ref: React.Ref<{ resetCheckboxes: () => void }>;
}


export function HabitCard({ title, color, onDelete, checkedDays = Array(7).fill(false), onUpdate, ref }: HabitCardProps) {

  const [countDays, setCountDays] = useState(checkedDays.filter(Boolean).length);
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(checkedDays);
  const [modalDeleteOpen, setmodalDeleteOpen] = useState(false);
  const [modalEditOpen, setmodalEditOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const days = ["M", "T", "W", "T", "F", "S", "S"];

  useImperativeHandle(ref, () => ({
    resetCheckboxes: () => {
      setCheckboxStates(Array(7).fill(false));
      setCountDays(0);
      onUpdate({ days: Array(7).fill(false) });
    },
  }));

  const handleCheckboxChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCheckboxStates((prev) => {
      const newStates = [...prev];
      newStates[index] = isChecked;
      onUpdate({ days: newStates });
      setCountDays(newStates.filter(Boolean).length);
      return newStates;
    });
  };

  return (
    <div
      className="relative flex flex-col h-70 rounded-lg shadow-xl transition-all duration-100 ease-in-out hover:scale-105"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ModalConfirmDelete
        onClose={() => setmodalDeleteOpen(false)}
        isOpen={modalDeleteOpen}
        onConfirm={onDelete}
        itemName={title}
      />
      <ModalEditHabit

        colorSelected={color}
        title={title}
        isOpen={modalEditOpen}
        onConfirm={onUpdate}
        onClose={() => setmodalEditOpen(false)}
      />
      <div
        className="flex justify-between rounded-lg items-center w-full p-2 text-xl font-semibold border-2 z-40"
        style={{
          backgroundColor: color,
        }}
      >
        <h2 className="flex gap-4 items-center"

          onClick={() => setmodalEditOpen(true)}
        >
          {title}
                    <MdModeEditOutline />
          {countDays === 7 ? <MdStars /> : null}
        </h2>
        <span
          className={`cursor-pointer hover:text-red-700 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100 ${isHovering ? "md:opacity-100" : ""
            }`}
          onClick={() => setmodalDeleteOpen(true)}
        >
          ✗
        </span>
      </div>
      <div
        className="flex flex-col w-full p-4 border-l-2 border-r-2 border-b-2 h-full"
        style={{ borderColor: color }}
      >
        <div className="py-4 w-full grid grid-cols-7 grid-rows-2 justify-center align-center gap-2">
          {days.map((day, index) => (
            <span className="place-self-center" key={day + index}>
              {day}
            </span>
          ))}

          {days.map((_, index) => (
            <input
              key={`checkbox-${index}`}
              type="checkbox"
              checked={checkboxStates[index]}
              onChange={(e) => handleCheckboxChange(index, e)}
              className="place-self-center appearance-none w-6 h-6 border-2 border-gray-400 rounded-sm relative checked:after:content-['✓'] checked:after:text- checked:after:text-xl checked:after:font-bold checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 focus:outline-none"
            />
          ))}
        </div>
        <ProgressBar value={countDays} min={0} max={7} />
        <p> {countDays} / 7 Days completed</p>
      </div>
    </div>
  );
}
