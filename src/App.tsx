import { useState, useEffect } from 'react'

import Card from './components/Card'
import DeckNav from './components/DeckNav'

import frontend from "../src/decks/frontend.json"
import backend from "../src/decks/backend.json"

// types
type Card = { question: string; answer: string; tags?: string[] }
type Deck = { title?: string; cards: Card[] }

const DECKS = {
  frontend,
  backend,
} satisfies Record<string, Deck>

type DeckId = keyof typeof DECKS

const ORDER: DeckId[] = ['frontend', 'backend']

const LABEL: Record<DeckId, string> = {
  frontend: 'Front-end',
  backend: 'Back-end',
}

function App() {
  	const [deckId, setDeckId] = useState<DeckId>('frontend')
	const [cardIdx, setCardIdx] = useState(0)

	let currentDeck = DECKS[deckId]
	let currentCard = currentDeck.cards[cardIdx]
	const total  = currentDeck.cards.length

	const previousCard = () => setCardIdx(v => (v - 1 + total) % total)
	const nextCard = () => setCardIdx(v => (v + 1) % total)

	useEffect(() => setCardIdx(0), [deckId])

	return (
    <div className='flex flex-col items-center text-center'>
			<h1 className='mt-4 text-[#38BDF8]'>FlashDeck</h1>
			<h3><a href="https://github.com/ericmadureira/flashdeck" target='_blank' className='underline'>by ➡ Eric Madureira</a></h3>
			<p className='mt-8 text-xl'>Deck:</p>
			<select
				value={deckId}
				onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDeckId(e.target.value as DeckId)}
			>
				{ORDER.map(id => (
					<option key={id} value={id}>
						{LABEL[id]}{id===deckId ? ` (${total})` : ''}
					</option>
				))}
			</select>
			<DeckNav previousCard={previousCard} nextCard={nextCard} />
			<Card key={currentCard.question} question={currentCard.question} answer={currentCard.answer} />
    </div>
  )
}

export default App
