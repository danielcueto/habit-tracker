import { useEffect, useState } from "react";
import { InputBox } from "../inputs/InputBox";
import { Button } from "../buttons/Button";
import colors from "../../data/colors";
import { ColorSelector } from "../inputs/ColorSelector";

export function AddHabitForm({ onSubmit }: { onSubmit: (title: string, color: string) => void }) {
  const [newHabitTitle, setNewHabitTitle] = useState("");
  const [newHabitColor, setNewHabitColor] = useState(colors.yellow);
  const [canSubmit, setCanSubmit] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newHabitTitle, newHabitColor);
    setNewHabitTitle("");
    setCanSubmit(false);
  };

  useEffect(() => {
    setCanSubmit(newHabitTitle.trim().length > 0);
  }, [newHabitTitle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewHabitTitle(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <InputBox
        value={newHabitTitle}
        onChange={handleInputChange}
        placeholder="Add a new habit..."
      />
      <div className="flex w-full items-center justify-between">
        <ColorSelector onSelect={setNewHabitColor} />
        <Button type="submit" text="Add ✜" disabled={!canSubmit} />
      </div>
    </form>
  );
}
