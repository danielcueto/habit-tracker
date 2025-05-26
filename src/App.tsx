import { Button } from "./components/Button";
import { ColorButton } from "./components/ColorButton";
import { HabitCard } from "./components/HabitCard";

function App() {
  return (
    <main className="flex min-h-screen gap-10 flex-col items-start justify-start p-6">
      <section className="flex flex-col justify-start w-full gap-6 max-w-7xl mx-auto">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold">Habit tracker</h1>
          <Button text="Reset" />
        </div>
        <input
          type="text"
          className="w-full border border-gray-400 rounded py-4 px-4 focus:outline-neutral-900 focus:outline shadow-2xl"
        />
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-2">
            <ColorButton color="#E89696" />
            <ColorButton color="#D1A1FF" />
            <ColorButton color="#98C4F2" />
            <ColorButton color="#83FFA6" />
            <ColorButton color="#F7C79F" />
          </div>
          <Button text="Add ✜" />
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
        <HabitCard title="Exercise" color="#D1A1FF" />
        <HabitCard title="Exercise" color="#D1A1FF" />
        <HabitCard title="Exercise" color="#D1A1FF" />
        <HabitCard title="Exercise" color="#D1A1FF" />
      </section>
    </main>
  );
}

export default App;
