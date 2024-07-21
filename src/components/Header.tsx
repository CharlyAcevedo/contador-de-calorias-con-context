import { useMemo } from "react"
import { TActivityActions, TActivityState } from "../reducers/activity-reducer"

type HeaderProps = {
    state: TActivityState,
    dispatch: React.Dispatch<TActivityActions>
}

export default function Header({state, dispatch}: HeaderProps){

    const canRestartApp = useMemo(() => state.activities.length > 0,[state.activities])

    return(
        <>
            <div className="max-w-4xl mx-auto px-5 flex justify-between items-center">
                <h1 className=" text-center text-lg font-bold text-white uppercase">Contador de Calorias</h1>
                <button
                    className="bg-gray-700 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
                    disabled={!canRestartApp}
                    onClick={() => dispatch({type: 'restart-app'})}
                >
                    Reiniciar App
                </button>
            </div>
        </>
    )
}