import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'

import Card from './components/Card'
import DeckNav from './components/DeckNav'

type CardData = { question: string; answer: string; tags?: string[] }
type Deck = { id?: string; title?: string; cards: CardData[] }
type DeckFile = Deck | CardData[]
type DeckMap = Record<string, Deck>

const deckModules = import.meta.glob('./decks/*.json', { eager: true }) as Record<
  string,
  { default: DeckFile }
>

function toTitleCase(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getDeckId(path: string) {
  return path.split('/').pop()?.replace('.json', '') ?? 'deck'
}

function getDeckTitle(deckId: string, deck?: Deck) {
  return deck?.title?.trim() || toTitleCase(deckId)
}

function isCardData(value: unknown): value is CardData {
  if (!value || typeof value !== 'object') {
    return false
  }

  const card = value as Record<string, unknown>
  return typeof card.question === 'string' && typeof card.answer === 'string'
}

function normalizeDeck(path: string, file: DeckFile): [string, Deck] | null {
  const fallbackId = getDeckId(path)

  if (Array.isArray(file)) {
    const cards = file.filter(isCardData)
    if (cards.length === 0) {
      return null
    }

    return [
      fallbackId,
      {
        id: fallbackId,
        title: toTitleCase(fallbackId),
        cards,
      },
    ]
  }

  if (!file || typeof file !== 'object' || !Array.isArray(file.cards)) {
    return null
  }

  const cards = file.cards.filter(isCardData)
  if (cards.length === 0) {
    return null
  }

  const deckId = typeof file.id === 'string' && file.id.trim() ? file.id : fallbackId

  return [
    deckId,
    {
      id: deckId,
      title: getDeckTitle(deckId, file),
      cards,
    },
  ]
}

const DECKS = Object.fromEntries(
  Object.entries(deckModules)
    .map(([path, module]) => normalizeDeck(path, module.default))
    .filter((entry): entry is [string, Deck] => entry !== null),
) as DeckMap

const ORDER = Object.keys(DECKS).sort((left, right) => {
  if (left === 'typescript') {
    return -1
  }

  if (right === 'typescript') {
    return 1
  }

  return DECKS[left].title!.localeCompare(DECKS[right].title!)
})

function App() {
  const initialDeckId = ORDER[0] ?? ''
  const [deckId, setDeckId] = useState(initialDeckId)
  const [cardIdx, setCardIdx] = useState(0)

  const currentDeck = DECKS[deckId]
  const total = currentDeck?.cards.length ?? 0
  const currentCard = currentDeck?.cards[cardIdx]

  const previousCard = () => {
    if (total === 0) {
      return
    }

    setCardIdx(v => (v - 1 + total) % total)
  }

  const nextCard = () => {
    if (total === 0) {
      return
    }

    setCardIdx(v => (v + 1) % total)
  }

  useEffect(() => {
    if (!DECKS[deckId] && initialDeckId) {
      setDeckId(initialDeckId)
    }
  }, [deckId, initialDeckId])

  useEffect(() => setCardIdx(0), [deckId])

  if (ORDER.length === 0) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center px-6 text-center'>
        <h1 className='mt-4 text-cyan-300'>FlashDeck</h1>
        <p className='mt-6 max-w-md text-lg'>
          Nenhum deck valido foi encontrado em <code>src/decks</code>.
        </p>
        <p className='mt-2 max-w-md text-sm text-zinc-300'>
          Use um JSON com <code>{'{ "title": "...", "cards": [...] }'}</code> ou um array de
          cards com <code>question</code> e <code>answer</code>.
        </p>
      </div>
    )
  }

  return (
    <main className='mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-6 sm:px-6 lg:px-8'>
      <div className='flashdeck-shell w-full rounded-[2rem] border border-white/10 px-5 py-6 shadow-2xl shadow-black/30 sm:px-8 sm:py-8'>
        <section className='flex flex-col items-center text-center'>
          <div className='w-full max-w-md'>
            <h1 className='text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl'>
              FlashDeck
            </h1>
            <a
              href="https://github.com/ericmadureira/flashdeck"
              target='_blank'
              className='mt-3 inline-flex items-center justify-center rounded-full border border-white/12 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white'
            >
              by Eric Madureira
            </a>
          </div>

          <div className='mt-8 w-full max-w-md'>
            <label
              htmlFor='deck-select'
              className='mb-2 block text-xs font-semibold uppercase tracking-[0.28em] text-slate-400'
            >
              Escolha um deck
            </label>
            <select
              id='deck-select'
              className='flashdeck-select w-full'
              value={deckId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setDeckId(e.target.value)}
            >
              {ORDER.map(id => (
                <option key={id} value={id}>
                  {DECKS[id].title}
                  {id === deckId ? ` (${total})` : ''}
                </option>
              ))}
            </select>
          </div>

          <p className='mt-4 text-sm text-slate-400'>
            Carta {cardIdx + 1} de {total}
          </p>

          <DeckNav previousCard={previousCard} nextCard={nextCard} />

          {currentCard && (
            <Card
              key={currentCard.question}
              question={currentCard.question}
              answer={currentCard.answer}
            />
          )}
        </section>
      </div>
    </main>
  )
}

export default App
