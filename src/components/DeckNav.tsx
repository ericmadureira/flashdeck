interface DeckNavProps {
	previousCard: () => void
	nextCard: () => void
}

const DeckNav = ({ previousCard, nextCard }: DeckNavProps) => {
	return (
		<div className="flex max-w-60 justify-around mt-4">
			<button onClick={previousCard} className="border px-2 py-1 cursor-pointer">⬅</button>
			<button onClick={nextCard} className="border px-2 py-1 cursor-pointer">➡</button>
		</div>
	)
}

export default DeckNav
