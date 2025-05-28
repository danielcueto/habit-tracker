import { Modal } from "./Modal";
import colors from "../../data/colors";
import { ColorSelector } from "../inputs/ColorSelector";
import { useState } from "react";
import { Button } from "../buttons/Button";
import { InputBox } from "../inputs/InputBox";
import type { Habit } from "../../types/habit";
import { useEffect } from "react";

type ModalEditHabitProps = {
    isOpen: boolean;
    onConfirm: (data: Partial<Habit>) => void;
    onClose: () => void;
    colorSelected: string;
    title: string;
};

export function ModalEditHabit({ isOpen, onConfirm, onClose, colorSelected, title }: ModalEditHabitProps) {

    const [selectedColor, setSelectedColor] = useState(colorSelected);
    const [habitTitle, setHabitTitle] = useState(title);
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSelectedColor(colorSelected);
            setHabitTitle(title);
        }
    }, [isOpen, colorSelected, title]);

    useEffect(() => {
        setCanSubmit(habitTitle.trim().length > 0);
    }, [habitTitle]);

    const handleSubmit = () => {
        if (canSubmit) {
            onConfirm({ title: habitTitle, color: selectedColor });
            setHabitTitle("");
            setSelectedColor(colors.yellow);
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h1 className="text-3xl font-normal">Edit habit</h1>
            <div className="mt-4 flex justify-end flex-col gap-8 w-full">
                <InputBox value={habitTitle} onChange={(e) => setHabitTitle(e.target.value)} />
                <ColorSelector colorSelected={selectedColor} onSelect={setSelectedColor} />
                <Button onClick={handleSubmit} text="Save" disabled={!canSubmit} />
            </div>
        </Modal>
    );
}
