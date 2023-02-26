import { useState, useEffect } from "react"
import axios from 'axios'
import { getApiEndpoint } from '../utils/api'
import { NavLink } from "react-router-dom"

export function IndexPage() {
  const [quizs, setQuizs] = useState([])

  // methods
  const fetchDataQuiz = async () => {
    const { data } = await axios({
      method: 'GET',
      url: getApiEndpoint('/quiz'),
    })
    setQuizs(data?.data)
    console.log(data)
  }

  // lifecycles
  // on mounted
  useEffect(() => {
    fetchDataQuiz()
  }, [])

  return (
    <div className="max-w-screen-lg flex-1 w-full h-full mx-auto py-14">
      <div className="text-4xl font-bold text-center mb-8">Quiz</div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {quizs.map((item) => (
          <NavLink
            key={item.id}
            className="bg-slate-700 p-4 rounded-md"
            to={`/play/${item.id}`}
          >
            <div className="text-xl font-bold">{item.name}</div>
            <div className="text-sm">{item.category}</div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
