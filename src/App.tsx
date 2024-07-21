import { useEffect, useReducer } from "react"
import Form from "./components/Form"
import Header from "./components/Header"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"


function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])

  return (
    <>
      <header className=" bg-emerald-600 py-3 w-full fixed">
        <Header 
          state={state}
          dispatch={dispatch}
        />
      </header>
      <section className="bg-emerald-400 pt-32 py-20 px-5">
        <div className=" max-w-4xl mx-auto">
          <Form
            state={state}
            dispatch={dispatch}
          />
        </div>
      </section>
      <section
        className="bg-gray-800 py-10"
      >
        <div
          className="max-w-4xl mx-auto"
        >
          <CalorieTracker activities={state.activities} />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList state={state} dispatch={dispatch} />
      </section>
    </>
  )
}

export default App
