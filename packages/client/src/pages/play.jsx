import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import { getApiEndpoint } from '../utils/api'

export function PlayPage() {
  const [quiz, setQuiz] = useState([])
  const { id } = useParams()

  // methods
  const fetchDataQuiz = async () => {
    const { data } = await axios({
      method: 'GET',
      url: getApiEndpoint(`/quiz/${id}`),
    })
    setQuiz(data?.data)
    console.log(data)
  }

  // lifecycles
  // on mounted
  useEffect(() => {
    fetchDataQuiz()
  }, [])

  return (
    <div className="max-w-screen-lg flex-1 w-full h-full mx-auto py-14">
      <div className="text-4xl font-bold text-center mb-8">{quiz.name}</div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>waeokawoeawkeo</div>
      </div>
    </div>
  )
}
