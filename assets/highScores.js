const leaderboard = document.querySelector('#highScoresList')
const highscores = JSON.parse(localStorage.getItem('highScores')) || []

leaderboard.innerHTML =
highscores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')