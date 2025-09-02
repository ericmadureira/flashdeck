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
			className='border rounded-lg text-center w-60 cursor-pointer mt-4 p-4 text-pretty'
			onClick={toggleAnswer}
		>
			<div className='max-w-60'>
				<span className='text-center'>Question:</span>
				<p className='wrap-anywhere font-bold mt-4'>{ question }</p>
			</div>
			<hr className='mt-4 mb-4' />
			<div className='max-w-60'>
				<span>Answer: </span>
				<p className='wrap-anywhere font-bold mt-4'>{ visibleAnswer && answer }</p>
			</div>
		</div>
	)
}

export default Card
