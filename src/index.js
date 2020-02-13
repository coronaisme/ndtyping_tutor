let countDown;
let wordDrop;
let playerScoreContainer = []
//page will include a side bar with
//username
//button linking to users past games with scores(ordered by score)
//button linking to the leaderboard (top ten highest scores of all users)
//exit button - re render main page(logout)

//main container where words will be falling
//eventlistener to catch words being typed 

//bottom div will hold the currently lowest word in the main container 
//if bottom div word typed correctly matches the word lowest, then word goes away and score is increased



document.addEventListener("DOMContentLoaded", function () {

  listenForSignUp()
  listenForLogin()

})

//if user hits sign up, makes a post, creates user
function listenForSignUp() {
  const signupBtn = document.getElementById('signup-btn')
  signupBtn.addEventListener('click', () => {
    let userInput = document.getElementsByClassName('form-control')[0]
    event.preventDefault()
    fetch('http://localhost:3000/players', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userInput.value
      })
    }).then(res => res.json())
      .then(data => {
        renderGamePage(data)
      })
  })
}

//if user hits login, makes a get, logs user in with their information
function listenForLogin() {
  const loginBtn = document.getElementById('login-btn')
  let userInput = document.getElementsByClassName('form-control')[0]

  loginBtn.addEventListener('click', function (event) {
    event.preventDefault()
    fetch('http://localhost:3000/players')
      .then(res => res.json())
      .then(data => data.forEach(obj => {
        if (userInput.value === "") {
          console.log("Invalid username")
        } else if (obj.name === userInput.value) {
          fetchPlayerGames(obj)
          renderGamePage(obj)
        }
      }))
  })
}


function fetchPlayerGames(user) {
  let ScoreContainer = []
  fetch(`http://localhost:3000/games?user_id=${user.id}`).then(res => res.json()).then(data => {
    ScoreContainer.push(data)
    ScoreContainer[0].forEach(game => {
     playerScoreContainer.push(game.score)
    })
  })
}



//main game page new html, kinda clunky, but works
function renderGamePage(user) {
  const mainContainer = document.getElementsByClassName('container')[0]

  mainContainer.innerHTML = `
  <div class="title" id="" <h1>ndTypingTutor</h1></div>
  <div class="sidebar" id="sidebar">
    <div class="username-tab"><p>Hello, ${user.name}</p>
    </div><br>
      <div class="user-scores-tab" id="${user.id}"><a href="#user-scores">${user.name}'s Scores</a>
      </div><br>
       <br>
          <button class="start-button" id="start-btn">Start</button><br><br>
          <p>score:</p>
            <div class="score" id="score">0</div>
            <div class="logout-tab" id="logout"><a id="logout-link" href="#logout">Logout</a>
    </div>
    <p>Timer: </p>
    <div class="timer" id="timer">5</div>
  </div>
  <div class="game-body" id="game-body">
         <ul class "game-ul" id="game-ul">
         </ul>
         </div> 
         <div class="bottom-bar" id="bot-bar">
         <form autocomplete="off" id="input-word">
         <input id="text-input-id" type="text" placeholder="Type the words!">
         </form>
         </div>
         </div>  `




  listenForStartButton(user)
  listenLogout()
  listenForUserInput()
}

//timer
function func() {
  let timer = document.getElementById('timer')
  let timerVal = parseInt(timer.innerText)
  
  if (timerVal > 0) {
    timerVal--
    timer.innerText = timerVal
  } else {
    timer.innerText = 0
  }
}
//starts the interval to display words

function listenForStartButton(user) {
  const startButton = document.getElementById('start-btn');
  let timer = document.getElementById('timer')
  
  startButton.addEventListener('click', function (event) {
    
      wordDrop = setInterval(func, 1000)
      
      fetch('http://localhost:3000/words').then(resp => resp.json()).then(words => displayTheWords(words))
      fetch('http://localhost:3000/games', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: user.id
        })
      }).then(resp => resp.json()).then(gameData => {
        let title = document.getElementsByClassName("title")[0]
        title.id = gameData.id

      })
    })
  }
  
  
  //gets words to add to a list at interval time, stops after x seconds
  function displayTheWords(words) {
    const scoreDiv = document.getElementById('score') //dont worry about it
    currentUser = document.getElementsByClassName('user-scores-tab')[0]
    const gameBodyUl = document.getElementById('game-ul')
    // let list = gameBodyUl.children
    // let arr = [...list]
    let timer = document.getElementById('timer')

    
    countDown = setInterval(function () {
      if (parseFloat(timer.innerText) > 0) {
        const wordLi = document.createElement('li')
      
        //getting a random word obj
        let randomWord = words[Math.floor(Math.random() * words.length)]
        //setting our created wordLi id 
        wordLi.id = randomWord.id
        wordLi.className = "falling"
        wordLi.value = randomWord.letter_count
        //setting our created wordLi text
        wordLi.innerText = randomWord.title
        //append in an interval of 2.5seconds
        gameBodyUl.appendChild(wordLi)
        wordLi.addEventListener("animationend", function(event){
          event.target.remove();
        })
      }
      else {
        
        clearInterval(countDown)
        clearInterval(wordDrop)
        checkForZero()
        renderScoresPage(currentUser)
        return -1;
      }
    }, 3000)
}


//refreshes page lol
function listenLogout() {
  const logoutBtn = document.getElementById('logout')
  logoutBtn.addEventListener('click', function (event) {
    if (event.target.id === 'logout-link') {
      document.location.reload(true)
    }
  })
}

//taking input from user and removing a word from main body of game
//score is incremented here
function listenForUserInput() {
  const gameBodyUl = document.getElementById('game-ul')
  const userInput = document.getElementById('input-word')
  const scoreDiv = document.getElementById('score')
  userInput.addEventListener('submit', (event) => {
    event.preventDefault()
    let inputTarget = event.target[0]
    let scoreCount = parseInt(scoreDiv.innerText)
    let list = gameBodyUl.children
    let arr = [...list]
    arr.forEach(el => {
      if (inputTarget.value === el.innerText) {
        let scoreVal = event.target[0].value.length
        el.remove()
        scoreCount += scoreVal
        scoreDiv.innerText = scoreCount
        //this is what we will patch to game score
      }
    })
    inputTarget.value = ""
  })
}

//update score
function checkForZero() {
  const scoreDiv = document.getElementById('score')
  const playerId = document.getElementsByClassName('user-scores-tab')[0].id
  let title = document.getElementsByClassName('title')[0]
  currentUser = document.getElementsByClassName('user-scores-tab')[0]
  fetch(`http://localhost:3000/games/${title.id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: playerId,
          score: parseInt(scoreDiv.innerText)
        })
      }).then(resp => resp.json()).then(gameData => {
        console.log(gameData)
        playerScoreContainer.push(gameData.score)

        //call renderScorePAge here?
        // console.log(currentUser)
        renderScoresPage(currentUser)
        console.log(playerScoreContainer)})
}
//change page to players scores
function renderScoresPage(user) {
  console.log(user)
  const mainContainer = document.getElementsByClassName('container')[0]
  mainContainer.innerHTML = `<div class="player-score" id="${user.id}"> ${user.innerText}:</div>
  <br>
  <ul id="scores">
  </ul>
  <div class="button">
  <input id="login-btn" type="submit" value="Play Again?" class="btn float-right login_btn">
  </div>
  `
  const ulContainer = document.getElementById('scores') 
  let myScoreContainer = []
  fetch("http://localhost:3000/games").then(res => res.json()).then(data =>{
    data.forEach(game => {
      if(game.player_id === parseInt(user.id)){
        
        myScoreContainer.push(game.score)
      }
    })
      playerScoreContainer.forEach(score => {
      ulContainer.innerHTML += `<li>${score}</li>`
    })
    console.log(playerScoreContainer, "in render scores func")
  })
}





