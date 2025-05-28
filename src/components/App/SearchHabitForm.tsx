import { useState } from "react";
import { SearchButton } from "../buttons/SearchButton";
import { SearchInput } from "../inputs/SearchInput";

type SearchHabitFormProps = {
  onSearch: (searchTerm: string) => void;
  onSortByStreak: () => void;
  isSortedByStreak: boolean;
};

export function SearchHabitForm({ onSearch, onSortByStreak, isSortedByStreak }: SearchHabitFormProps) {    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="flex justify-center items-stretch gap-4 w-full">
            <SearchInput 
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Filter habits by name..."
            />
            <SearchButton 
                text={isSortedByStreak ? "Default sort" : "Streak sort"} 
                onClick={onSortByStreak}
            />
        </div>
    );
}