interface DeckNavProps {
  previousCard: () => void
  nextCard: () => void
}

const DeckNav = ({ previousCard, nextCard }: DeckNavProps) => {
  return (
    <div className="mt-5 flex w-full max-w-md items-center justify-center gap-3">
      <button
        onClick={previousCard}
        className="flashdeck-nav-button"
        aria-label="Previous card"
      >
        Prev
      </button>
      <button
        onClick={nextCard}
        className="flashdeck-nav-button flashdeck-nav-button-primary"
        aria-label="Next card"
      >
        Next
      </button>
    </div>
  )
}

export default DeckNav
