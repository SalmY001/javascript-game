const userInitials  = document.querySelector('#username')
const saveScore  = document.querySelector('#saveScoreBtn')
const endScore  = document.querySelector('#finalScore')
const lastScore  = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const MAX_HIGH_SCORES = 5

endScore.innerText = lastScore

userInitials.addEventListener('keyup', () => {
    saveScore.disabled = !userInitials.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: lastScore,
        name: userInitials.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score -a.score
    })

    highScores.splice(5)
    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('./highScores.html')
}



