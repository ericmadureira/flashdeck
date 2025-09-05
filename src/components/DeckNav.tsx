interface DeckNavProps {
	previousCard: () => void
	nextCard: () => void
}

const DeckNav = ({ previousCard, nextCard }: DeckNavProps) => {
	return (
		<div className="flex w-full items-center justify-evenly mt-4">
			<button onClick={previousCard} className="
				inline-flex h-9 w-9 items-center justify-center
				rounded-md border border-[#38BDF8] cursor-pointer
				bg-[#2D2D2D] text-[#E5E5E5]	transition
				hover:bg-[#0EA5E9] hover:text-white
				focus:outline-none focus:ring-2 focus:ring-[#38BDF8]
				focus:ring-offset-2 focus:ring-offset-[#1E1E1E]
				disabled:opacity-40 disabled:cursor-not-allowed">⬅</button>
			<button onClick={nextCard} className="
				inline-flex h-9 w-9 items-center justify-center
				rounded-md border border-[#38BDF8]
				bg-[#2D2D2D] text-[#E5E5E5] cursor-pointer
				transition hover:bg-[#0EA5E9] hover:text-white
				focus:outline-none focus:ring-2 focus:ring-[#38BDF8]
				focus:ring-offset-2 focus:ring-offset-[#1E1E1E]
				disabled:opacity-40 disabled:cursor-not-allowed">➡</button>
		</div>
	)
}

export default DeckNav
