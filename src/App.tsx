import { useState, useRef, useEffect } from "react";
import { Button } from "./components/buttons/Button";
import { HabitCard } from "./components/HabitCard/HabitCard";
import { AddHabitForm } from "./components/App/AddHabitForm";
import type { Habit } from "./types/habit";
import { SearchHabitForm } from "./components/App/SearchHabitForm";

type HabitCardRef = {
  resetCheckboxes: () => void;
};

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortedByStreak, setIsSortedByStreak] = useState(false);
  const habitCardRefs = useRef<{ [key: string]: HabitCardRef | null }>({});
  const isMounted = useRef(false);

  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("habits", JSON.stringify(habits));
    } else {
      isMounted.current = true;
    }
  }, [habits]);

  const addHabit = (title: string, color: string) => {
    if (title.trim() === "") {
      alert("Please enter a habit title");
      return;
    }
    const newHabit: Habit = {
      id: Date.now().toString(),
      title,
      color,
      days: Array(7).fill(false),
    };
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id: string) => {
    delete habitCardRefs.current[id];
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const resetAllHabits = () => {
    Object.values(habitCardRefs.current).forEach((ref) => {
      if (ref && ref.resetCheckboxes) {
        ref.resetCheckboxes();
      }
    });
  };

  const registerHabitRef = (id: string, ref: HabitCardRef | null) => {
    habitCardRefs.current[id] = ref;
  };

  const updateHabitData = (id: string, data: Partial<Habit>) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, ...data } : habit
      )
    );
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const toggleSortByStreak = () => {
    setIsSortedByStreak(!isSortedByStreak);
  };

  const filteredHabits = habits
    .filter(habit => 
      habit.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (isSortedByStreak) {
        const streakA = a.days.filter(Boolean).length;
        const streakB = b.days.filter(Boolean).length;
        return streakB - streakA; 
      }
      return 0;
    });

  return (
    <main className="flex min-h-screen gap-10 flex-col items-start justify-start p-6">
      <header className="flex flex-col justify-start w-full gap-6 max-w-7xl mx-auto">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold">Habit tracker</h1>
          <Button onClick={resetAllHabits} text="Reset" />
        </div>
        <AddHabitForm onSubmit={addHabit} />
        <SearchHabitForm 
          onSearch={handleSearch} 
          onSortByStreak={toggleSortByStreak} 
          isSortedByStreak={isSortedByStreak} 
        />
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-7xl mx-auto border-t pt-6">
        {filteredHabits.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            {habits.length === 0 
              ? "No habits added yet. Add a new habit to get started." 
              : "No habits match your search criteria."}
          </p>
        ) : (
          filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              title={habit.title}
              color={habit.color}
              checkedDays={habit.days}
              onDelete={() => deleteHabit(habit.id)}
              onUpdate={(data: Partial<Habit>) => updateHabitData(habit.id, data)}
              ref={(ref) => registerHabitRef(habit.id, ref)}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default App;
