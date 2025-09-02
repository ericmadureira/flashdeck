import { useState } from 'react'
import './App.css'
import defaultDeck from "../src/decks/default.json"
import Card from './components/Card'
import DeckNav from './components/DeckNav'

function App() {
  const [selectedDeck, setSelectedDeck] = useState(defaultDeck)
  return (
    <div className='flex flex-col text-center'>
			<p className='mt-8'>Deck title: { selectedDeck.title }</p>
			<DeckNav />
      {selectedDeck.cards.map(card =>
				<Card key={card.question} question={card.question} answer={card.answer} />
			)}
    </div>
  )
}

export default App
