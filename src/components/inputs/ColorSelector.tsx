import { useState, useEffect } from "react";
import colors from "../../data/colors";
import { ColorButton } from "../buttons/ColorButton";

type ColorSelectorProps = {
    colorSelected?: string;
    onSelect: (color: string) => void;
};

export function ColorSelector({ onSelect, colorSelected }: ColorSelectorProps) {
    const [selected, setSelected] = useState(colorSelected || colors.yellow);

    useEffect(() => {
        if (colorSelected) {
            setSelected(colorSelected);
        }
    }, [colorSelected]);

    return (
        <div className="flex justify-center gap-2">
            {Object.entries(colors).map(([colorName, colorValue]) => (
                <ColorButton
                    key={colorName}
                    color={colorValue}
                    isSelected={selected === colorValue}
                    onClick={() => {
                        setSelected(colorValue);
                        onSelect(colorValue);
                    }}
                />
            ))}
        </div>
    );
}