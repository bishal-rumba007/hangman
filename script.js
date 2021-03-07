let answer;
let wordState;
let num;
const WORDS = ['apple', 'banana', 'guitar', 'language', 'school', 'literature']

const showWordState = () => {
  for (let letter of answer) {
    let button = document.createElement('button')
    $(button).addClass('btn btn-warning m-1')
    $(button).text('_')
    $('#word-container').append(button)
    wordState.push('_')
  }
}

const createButton = () => {
  let start = 'a'
  let end = 'z'
  for(let i = start.charCodeAt(); i <= end.charCodeAt(); i++) {
    let newBtn = document.createElement('button')
    $(newBtn).addClass('btn btn-primary m-1')
    $(newBtn).text(String.fromCharCode(i))
    $(newBtn).one('click', guessLetter)
    $('#button-container').append(newBtn)
  }
}

const guessLetter = (e) => {
  $(e.target).addClass('btn-secondary')
  let currentGuess = $(e.target).text()

  for(let i = 0; i < answer.length; i++){
    if (currentGuess === answer[i]){
      let correctEle = $('#word-container .btn-warning')[i]
      $(correctEle).text(currentGuess)
      wordState[i] = currentGuess
    }
  }
  num--
  $('#guesses').text(num)
  if ( checkWin() ) {
    alert("win!")
    endGame()
  } else if (num === 0) {
    alert("Game Over!")
    endGame()
  }
}
const checkWin = () => {
  let win = false
  if( !wordState.includes('_') ) {
    win = true
  }
  return win
}

const endGame = () => {
  let btn = document.createElement('button')
  $(btn).addClass('btn btn-danger')
  $(btn).text('Play Again!')
  $(btn).on('click', function() {
      $(btn).remove()
      startGame()
  })
  $('#board').append(btn)
}
const startGame = () => {
  answer = WORDS[Math.floor(Math.random() * WORDS.length)]
  wordState = []
  num = 10
  $('#guesses').text(num)
  $('#word-container').html('')
  $('#button-container').html('')
  createButton()
  showWordState()
}

startGame()