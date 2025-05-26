export function ProgressBar({ value, min, max }: { value: number; min: number; max: number }) {
    return (
        <div className="w-full border bg-gray-200 rounded-lg h-5 mb-4">
            <div
                className="bg-lime-300 h-full rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${((value - min) / (max - min)) * 100}%` }}
            ></div>
        </div>
    );
}
