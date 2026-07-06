# Tag Spec

This project already stores tags on individual cards. The current app does not need advanced filtering yet, but tags should stay consistent so custom decks can be added later without reworking the data.

## Current goal

- Keep tags attached to cards.
- Allow future custom decks such as `TypeScript + Basics`, `Security + Backend`, or `Missed in interviews`.
- Avoid turning the UI into a complex search builder right now.

## Recommended tag rules

- Use short stable strings, for example `TypeScript`, `Basics`, `Security`, `React`.
- Use title case for display-friendly tags.
- Put the broadest topic first when possible, then narrower tags after it.
- Prefer reusing an existing tag over creating near-duplicates like `TS` and `TypeScript`.

## Recommended tag categories

- Primary topic: `TypeScript`, `React`, `Node`, `CSS`, `SystemDesign`
- Level: `Basics`, `Intermediate`, `Advanced`, `Senior`
- Skill area: `Safety`, `Generics`, `Performance`, `Security`, `Architecture`
- Intent or source when needed later: `InterviewCore`, `Missed`, `Behavioral`

## Deck model for the future

- Static deck: a JSON file checked into `src/decks`.
- Virtual deck: cards built from one or more tag filters across static decks.
- Personalized deck: a virtual deck plus user-specific tags or feedback such as `Missed` or `NeedsReview`.

## Minimal future-compatible JSON shape

```json
{
  "id": "typescript",
  "title": "TypeScript Interview Prep",
  "cards": [
    {
      "question": "What is type narrowing?",
      "answer": "Refining a union into a more specific type.",
      "tags": ["Technical", "TypeScript", "Basics", "InterviewCore"]
    }
  ]
}
```

## Notes

- `tags` should remain optional for backward compatibility.
- New decks should keep cards ordered intentionally if study progression matters.
- If custom filtering is added later, prefer deriving decks from tags instead of duplicating the same card into many files.
