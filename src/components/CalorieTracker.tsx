import { useMemo } from "react"
import type { TActivity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: TActivity[]
}

export default function CalorieTracker({activities}: CalorieTrackerProps) {

    const consumedCalories = useMemo(() => activities.reduce(
        (total, activity) => activity.category === 1 ?
        total + activity.calories :
        total, 0
    ) ,[activities])
    const burnedCalories = useMemo(() => activities.reduce(
        (total, activity) => activity.category === 2 ?
        total + activity.calories :
        total, 0
    ) ,[activities])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const netCalories = useMemo(() => consumedCalories - burnedCalories, [activities])

    return (
        <>
            <h2
                className="text-4xl font-black text-orange-700 text-center"
            >
                Resumen de Calorias
            </h2>
            <div className="flex flex-col px-10 items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay 
                    calories={consumedCalories}
                    text="Consumidas"
                />
                <CalorieDisplay 
                    calories={burnedCalories}
                    text="Quemadas"
                />
                <CalorieDisplay 
                    calories={netCalories}
                    text="Diferencia"
                />
            </div>
        </>
    )
}