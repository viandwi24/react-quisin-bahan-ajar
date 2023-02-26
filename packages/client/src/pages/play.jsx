import { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import { getApiEndpoint } from '../utils/api'

export function Question({ question, onAnswer }) {
  // method::countdown
  const [countdown, setCountdown] = useState(0)
  const startCountdown = () => {
    setCountdown(10)
  }
  const stopCountdown = () => {
    setCountdown(0)
  }
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {

        if (countdown === 1) {
          onAnswer(null)
          setCountdown(0)
        } else {
          setCountdown((prev) => prev - 1)
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])


  // lifecycles
  // on mounted
  useEffect(() => {
    startCountdown()
    return () => {
      stopCountdown()
    }
  }, [])

  // handler
  const answer = async (answer) => {
    onAnswer(answer)
    console.log('answer with', answer)
  }

  return (
    <div className="flex-1 flex flex-col px-20 py-20 relative">
      {/* progress bar countdown */}
      <div className="w-full top-0 left-0 h-4 absolute bg-slate-700 rounded-t-xl">
        <div className="w-full h-full bg-blue-500 rounded-xl" style={{ width: `${countdown * 10}%` }}></div>
      </div>


      <div className="text-right mb-8">Time: {countdown}</div>
      <div className="text-xl font-bold">{question.questionName}</div>
      <div className="flex-1 mt-6 flex flex-col justify-end">
        <div className="grid grid-cols-2 gap-4">
          {question?.answer?.map((item) => (
            <button key={Math.random()} className="bg-slate-700 p-4 rounded-md" onClick={() => answer(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PlayPage() {
  const { id } = useParams()
  const [quiz, setQuiz] = useState([])
  const [answers, setAnswers] = useState([])
  const [quizState, setQuizState] = useState('idle') // idle, quiz, result

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const currentQuestion = useMemo(() => {
    return quiz.question?.[currentQuestionIndex] || null
  })

  const reports = useMemo(() => {
    return answers.map((answer, index) => {
      const question = quiz.question?.[index]
      const isCorrect = question?.correctAnswer === answer
      return {
        question: question,
        answer: answer,
        isCorrect: isCorrect,
      }
    })
  }, [answers, quiz])

  const score = useMemo(() => {
    const total_question = reports.length
    const total_correct = reports.filter((report) => report.isCorrect).length
    return Math.round((total_correct / total_question) * 100)
  }, [reports])

  // methods
  const fetchDataQuiz = async () => {
    const { data } = await axios({
      method: 'GET',
      url: getApiEndpoint(`/quiz/${id}`),
    })
    setQuiz(data?.data)
    setAnswers(data?.data?.question?.map(() => null))
    console.log(data)
  }
  const prepare = async () => {
    await fetchDataQuiz()
    setQuizState('quiz')
  }
  const startQuiz = async () => {
    setQuizState('quiz')
  }
  const onAnswer = async (answer) => {
    // set jawaban
    setAnswers((prev) => {
      const newAnswers = [...prev]
      newAnswers[currentQuestionIndex] = answer
      return newAnswers
    })
    // jika soal sekarang adalah soal terakhir
    if (currentQuestionIndex === quiz.question?.length - 1) {
      // tampilkan result quiz
      setQuizState('result')
    }
    // kalo masih ada soal, next soal selanjutnya
    setCurrentQuestionIndex((prev) => prev + 1)
  }

  // lifecycles
  // on mounted
  useEffect(() => {
    prepare()
  }, [])

  return (
    <div className="max-w-screen-lg flex-1 flex flex-col w-full h-full mx-auto py-14">
      <div className="text-4xl font-bold text-center mb-8">{quiz.name}</div>
      <div className="flex-1 flex flex-col border rounded-xl border-slate-500/80 bg-slate-800 shadow">

        {/* jika status idle */}
        {quizState === 'idle' && (
          <div className="flex-1 flex justify-center items-center px-20 py-20">
            <button className="w-full px-4 py-3 rounded bg-blue-500" onClick={startQuiz}>Start Quiz</button>
          </div>
        )}

        {/* jika status start */}
        {(quizState === 'quiz' && currentQuestion) && (
          <Question question={currentQuestion} onAnswer={onAnswer} key={Math.random()} />
        )}

        {/* jika status result */}
        {(quizState === 'result') && (
          <div className="flex-1 flex flex-col justify-center items-center px-20 py-20">
            <div className="text-3xl font-bold mb-6">Hasil Quiz</div>
            <div className="text-xl font-bold mb-6">Score : {score}%</div>
            <div>
              {reports.map((report, index) => (
                <div key={index}>
                  Question {index+1} - {report.isCorrect ? 'benar' : 'salah'}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
