import { useState } from 'react'

interface CardProps {
  question: string
  answer: string
}

function Card({ question, answer }: CardProps) {
  const [visibleAnswer, setVisibleAnswer] = useState(false)

  const toggleAnswer = () => setVisibleAnswer(!visibleAnswer)

  return (
    <div
      className='flashdeck-card mt-5 w-full max-w-md cursor-pointer rounded-[1.75rem] p-5 text-left text-pretty sm:p-7'
      onClick={toggleAnswer}
    >
      <div>
        <span className='flashdeck-section-label'>Question</span>
        <p className='mt-4 wrap-anywhere text-2xl font-semibold leading-9 tracking-[-0.02em] text-slate-50'>
          {question}
        </p>
      </div>

      <hr className='my-6 border-white/10' />

      <div>
        <span className='flashdeck-section-label'>
          {visibleAnswer ? 'Answer' : 'Tap to reveal'}
        </span>
        <p className='mt-4 min-h-24 wrap-anywhere text-lg leading-8 text-slate-200'>
          {visibleAnswer ? answer : ''}
        </p>
      </div>
    </div>
  )
}

export default Card
