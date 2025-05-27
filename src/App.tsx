import { useState, useRef } from "react";
import { Button } from "./components/Button";
import { HabitCard } from "./components/HabitCard";
import { AddHabitForm } from "./components/AddHabitForm";

interface Habit {
  id: string;
  title: string;
  color: string;
}

type HabitCardRef = {
  resetCheckboxes: () => void;
};

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const habitCardRefs = useRef<{ [key: string]: HabitCardRef | null }>({});

  console.log(habitCardRefs)

  const addHabit = (title: string, color: string) => {
    if (title.trim() === "") {
      alert("Please enter a habit title");
      return;
    }
    const newHabit: Habit = {
      id: Date.now().toString(),
      title,
      color,
    };
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id: string) => {
    delete habitCardRefs.current[id];
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const resetAllHabits = () => {
    // Call the reset method on each habit card reference
    Object.values(habitCardRefs.current).forEach((ref) => {
      if (ref && ref.resetCheckboxes) {
        ref.resetCheckboxes();
      }
    });
  };

  // Function to register habit card refs
  const registerHabitRef = (id: string, ref: HabitCardRef | null) => {
    habitCardRefs.current[id] = ref;
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
              onDelete={() => deleteHabit(habit.id)}
              ref={(ref) => registerHabitRef(habit.id, ref)}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default App;
