import { useState } from "react";
import { InputBox } from "./inputs/InputBox";
import { ColorButton } from "./buttons/ColorButton";
import { Button } from "./buttons/Button";

const colors = {
  pink: "#E89696",
  purple: "#D1A1FF",
  blue: "#98C4F2",
  green: "#83FFA6",
  yellow: "#F7C79F",
};

export function AddHabitForm({ onSubmit }: { onSubmit: (title: string, color: string) => void }) {
  const [newHabitTitle, setNewHabitTitle] = useState("");
  const [newHabitColor, setNewHabitColor] = useState(colors.yellow);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newHabitTitle, newHabitColor);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <InputBox
        value={newHabitTitle}
        onChange={(e) => setNewHabitTitle(e.target.value)}
        placeholder="Add a new habit..."
      />
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2">
          {Object.entries(colors).map(([colorName, colorValue]) => (
            <ColorButton
              key={colorName}
              color={colorValue}
              isSelected={newHabitColor === colorValue}
              onClick={() => setNewHabitColor(colorValue)}
            />
          ))}
        </div>
        <Button type="submit" text="Add ✜" />
      </div>
    </form>
  );
}
