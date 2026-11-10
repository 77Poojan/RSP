const MOVES = ["rock", "paper", "scissors"];
const ICONS = {
  rock: `<svg class="glyph pop" viewBox="0 0 64 64" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" d="M22 30v-7a6 6 0 0 1 12 0v7M34 29v-9a6 6 0 0 1 12 0v11M18 32v-4a5 5 0 0 1 10 0v6M44 34v-3a5 5 0 0 1 9 2v9c0 8-6 14-16 14H27c-9 0-15-5-15-13v-6c0-3 2-6 6-6"/></svg>`,
  paper: `<svg class="glyph pop" viewBox="0 0 64 64" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" d="M22 12h18l12 12v28a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4zM40 12v12h12M26 32h16M26 40h12"/></svg>`,
  scissors: `<svg class="glyph pop" viewBox="0 0 64 64" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" d="M20 44a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm24 0a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM25 33l19-19M39 33L20 14"/></svg>`,
};
const LABELS = { rock: "fist", paper: "paper", scissors: "shears" };
const BEATS = { rock: "scissors", paper: "rock", scissors: "paper" };
const LINES = {
  "rock-scissors": "Fist crushes shears.",
  "paper-rock": "Paper wraps the fist.",
  "scissors-paper": "Shears slice the sheet.",
};

const playerScoreEl = document.getElementById("player-score");
const cpuScoreEl = document.getElementById("cpu-score");
const roundLabelEl = document.getElementById("round-label");
const playerHandEl = document.getElementById("player-hand");
const cpuHandEl = document.getElementById("cpu-hand");
const bannerEl = document.getElementById("banner");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const moveButtons = [...document.querySelectorAll(".move")];

const state = {
  player: 0,
  cpu: 0,
  round: 1,
  locked: false,
  over: false,
};

function cpuMove() {
  return MOVES[Math.floor(Math.random() * MOVES.length)];
}

function outcome(player, cpu) {
  if (player === cpu) return "draw";
  return BEATS[player] === cpu ? "win" : "lose";
}

function setHands(player, cpu, result) {
  playerHandEl.innerHTML = ICONS[player];
  cpuHandEl.innerHTML = ICONS[cpu];
  playerHandEl.className = `hand-well ${result === "win" ? "win" : result === "lose" ? "lose" : "draw"}`;
  cpuHandEl.className = `hand-well ${result === "lose" ? "win" : result === "win" ? "lose" : "draw"}`;
}

function setMovesDisabled(disabled) {
  moveButtons.forEach((btn) => {
    btn.disabled = disabled;
  });
}

function play(player) {
  if (state.locked || state.over) return;

  state.locked = true;
  setMovesDisabled(true);

  const cpu = cpuMove();
  const result = outcome(player, cpu);
  setHands(player, cpu, result);

  if (result === "win") {
    state.player += 1;
    bannerEl.textContent = "You take it";
    statusEl.textContent = LINES[`${player}-${cpu}`];
  } else if (result === "lose") {
    state.cpu += 1;
    bannerEl.textContent = "House takes it";
    statusEl.textContent = LINES[`${cpu}-${player}`];
  } else {
    bannerEl.textContent = "Standoff";
    statusEl.textContent = `Both threw ${LABELS[player]}. Nobody scores.`;
  }

  playerScoreEl.textContent = String(state.player);
  cpuScoreEl.textContent = String(state.cpu);

  if (state.player >= 3 || state.cpu >= 3) {
    state.over = true;
    const youWon = state.player > state.cpu;
    bannerEl.textContent = youWon ? "Match yours" : "House wins";
    statusEl.textContent = youWon
      ? "First to three. The booth owes you a nod."
      : "First to three. The house keeps the streak.";
    roundLabelEl.textContent = "Final";
    resetBtn.focus();
    return;
  }

  state.round += 1;
  roundLabelEl.textContent = `Round ${state.round}`;
  window.setTimeout(() => {
    state.locked = false;
    setMovesDisabled(false);
  }, 420);
}

function reset() {
  state.player = 0;
  state.cpu = 0;
  state.round = 1;
  state.locked = false;
  state.over = false;
  playerScoreEl.textContent = "0";
  cpuScoreEl.textContent = "0";
  roundLabelEl.textContent = "Round 1";
  bannerEl.textContent = "Pick a move";
  statusEl.textContent = "Rock crushes scissors. Paper wraps rock. Scissors slice paper.";
  playerHandEl.className = "hand-well";
  cpuHandEl.className = "hand-well";
  playerHandEl.innerHTML = `<svg class="glyph waiting" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="8 10" /></svg>`;
  cpuHandEl.innerHTML = playerHandEl.innerHTML;
  setMovesDisabled(false);
}

moveButtons.forEach((btn) => {
  btn.addEventListener("click", () => play(btn.dataset.move));
});

resetBtn.addEventListener("click", reset);

document.addEventListener("keydown", (event) => {
  if (event.key === "1") play("rock");
  if (event.key === "2") play("paper");
  if (event.key === "3") play("scissors");
  if (event.key.toLowerCase() === "r" && !event.metaKey && !event.ctrlKey) reset();
});
