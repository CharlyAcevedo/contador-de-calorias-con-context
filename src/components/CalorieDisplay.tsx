
type CalorieDisplayProps = {
    calories: number,
    text: string
}

export default function CalorieDisplay({ calories, text }: CalorieDisplayProps) {

    const colorToUse = calories < 0 ? 'text-red-600' : calories === 0 ? 'text-green-600' : 'text-orange-600'

    return (
        <p
            className="text-orange-800 font-bold rounded-full grid grid-cols-1 gap-3 text-center"
        >
            <span className={`font-black text-6xl ${colorToUse} bg-slate-700 p-2`}>{calories}</span>
            {text}
        </p>
    )
}