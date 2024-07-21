import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data/categories";
import type { TActivity } from "../types";
import { TActivityActions, TActivityState } from "../reducers/activity-reducer";

type FormProps = {
    state: TActivityState,
    dispatch: React.Dispatch<TActivityActions>
}

const initialState: TActivity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({state, dispatch}: FormProps){

    const [activities, setActivities] = useState<TActivity>(initialState)

    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.filter(
                stateActivity => stateActivity.id === state.activeId
                )[0]
                setActivities(selectedActivity)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.activeId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivities({
            ...activities,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const {name, calories} = activities
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({
            type: 'save-activity',
            payload: { newActivity: activities }
        })
        setActivities({
            ...initialState,
            id:  uuidv4(),
        })
    }

    return(
        <>
            <form 
                className=" space-y-5 bg-white shadow p-10 rounded-lg"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="category" className="font-bold">Categorias:</label>
                    <select
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                        name="category" 
                        id="category"
                        value={activities.category}
                        onChange={handleChange}
                    >
                        {categories.map((cat) => (
                            <option 
                                key={cat.id}
                                value={cat.id}
                            >
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="name" className="font-bold">Actividad:</label>
                    <input 
                        id="name"
                        type="text" 
                        className="border border-slate-300 p-2 rounded-lg"
                        placeholder="Ej. Comida, Ejercicio, Jugo de Naranja, Caminata, etc..."
                        value={activities.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="calories" className="font-bold">Calorias:</label>
                    <input 
                        id="calories"
                        type="number" 
                        className="border border-slate-300 p-2 rounded-lg"
                        placeholder="Calorias Ej. 200, 500, etc..."
                        value={activities.calories}
                        onChange={handleChange}
                    />
                </div>
                <input 
                    type="submit" 
                    className="bg-gray-700 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                    value={activities.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                    disabled={!isValidActivity()}
                />
            </form>
        </>
    )
}