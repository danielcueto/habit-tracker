import { useState, useRef, useEffect } from "react";
import { Button } from "./components/buttons/Button";
import { HabitCard } from "./components/HabitCard/HabitCard";
import { AddHabitForm } from "./components/AddHabitForm";

interface Habit {
  id: string;
  title: string;
  color: string;
  days: boolean[]; // Nuevo campo para persistir el estado de los días
}

type HabitCardRef = {
  resetCheckboxes: () => void;
};

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
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

  const updateHabitDays = (id: string, days: boolean[]) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, days } : habit
      )
    );
  };

  return (
    <main className="flex min-h-screen gap-10 flex-col items-start justify-start p-6">
      <section className="flex flex-col justify-start w-full gap-6 max-w-7xl mx-auto">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold">Habit tracker</h1>
          <Button onClick={resetAllHabits} text="Reset" />
        </div>
        <AddHabitForm onSubmit={addHabit}/>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
        {habits.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No habits added yet. Add a new habit to get started.
          </p>
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              title={habit.title}
              color={habit.color}
              checkedDays={habit.days}
              onDelete={() => deleteHabit(habit.id)}
              onDaysChange={(days) => updateHabitDays(habit.id, days)}
              ref={(ref) => registerHabitRef(habit.id, ref)}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default App;
