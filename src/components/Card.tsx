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
			className='border rounded-lg text-center
			max-w-56 cursor-pointer mt-8'
			onClick={toggleAnswer}
		>
			<span className='text-center'>Question:</span>
			<p> { question }</p>
			<hr />
			<span>Answer: </span>
			<p>{ visibleAnswer && answer }</p>
		</div>
	)
}

export default Card
