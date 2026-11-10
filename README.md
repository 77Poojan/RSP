# Fist · Paper · Shears

A browser rock-paper-scissors game. You play against the house. First to three wins the match.

## Play

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8765
```

Then visit [http://127.0.0.1:8765/](http://127.0.0.1:8765/).

| Move    | Button | Key |
|---------|--------|-----|
| Fist    | Fist   | `1` |
| Paper   | Paper  | `2` |
| Shears  | Shears | `3` |
| Restart | New match | `R` |

Fist beats shears, paper beats fist, shears beat paper. Ties score nothing.

## Files

- `index.html` — page layout
- `styles.css` — look and layout
- `game.js` — scoring and house picks

No build step or dependencies. Google Fonts load when you are online; the game still works offline with system fonts.
