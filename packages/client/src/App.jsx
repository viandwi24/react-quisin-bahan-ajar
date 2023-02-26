import { useState } from 'react'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col text-gray-100 bg-slate-800">
      <RouterProvider router={router} />
    </div>
  )
}
