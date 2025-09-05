import { useState } from 'react'
import defaultDeck from "../src/decks/default.json"
import Card from './components/Card'
import DeckNav from './components/DeckNav'

function App() {
  const [selectedDeck] = useState(defaultDeck)
	const [currentCardIdx, setCurrentCardIdx] = useState(0)
	let currentCard = selectedDeck.cards[currentCardIdx]
	const previousCard = () => {
		setCurrentCardIdx(currentIdx => {
			let prevIdx = currentIdx - 1
			return prevIdx <= 0 ? 0 : prevIdx
		})
	}
	const nextCard = () => {
		setCurrentCardIdx(currentIdx => {
			let nextIdx = currentIdx + 1
			return nextIdx >= selectedDeck.cards.length ? currentIdx : nextIdx
		})
	}

  return (
    <div className='flex flex-col items-center text-center'>
			<h1 className='mt-4 text-[#38BDF8]'>FlashDeck</h1>
			<h3><a href="https://github.com/ericmadureira/flashdeck" target='_blank' className='underline'>by ➡ Eric Madureira</a></h3>
			<p className='mt-8 text-xl'>Deck title:</p>
			<p className='text-xl'>{ selectedDeck.title }</p>
			<DeckNav previousCard={previousCard} nextCard={nextCard} />
			<Card key={currentCard.question} question={currentCard.question} answer={currentCard.answer} />
    </div>
  )
}

export default App
