let countDown;
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
          renderGamePage(obj)
        }
      }))
  })
}

//change speed of interval





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
        <div class="leaderboard-tab" id="leaderboard"><a href="#leaderboard">Leaderboard</a>
        </div><br>
          <button class="start-button" id="start-btn">Start</button><br><br>
          <p>score:</p>
            <div class="score" id="score">0</div>
            <div class="logout-tab" id="logout"><a id="logout-link" href="#logout">Logout</a>
    </div>
    <p>Timer: </p>
    <div class="timer" id="timer">20</div>
  </div>
  <div class="game-body" id="game-body">
         <ul class "game-ul" id="game-ul">
         </ul>
         </div> 
         <div class="bottom-bar" id="bot-bar">
         <form autocomplete="off" id="input-word">
         <input id="text-input-id" type="text">
         </form>
         </div>
         </div>  `




  listenForStartButton(user)
  listenLogout()
  listenForUserInput()
}


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
  let timerVal = parseInt(timer.innerText)
  
  startButton.addEventListener('click', function (event) {
    
      setInterval(func, 6000)
      
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
        console.log(gameData)
      })
    })
  }
  
  
  //gets words to add to a list at interval time, stops after x seconds
  function displayTheWords(words) {
    const scoreDiv = document.getElementById('score') //dont worry about it
    const gameBodyUl = document.getElementById('game-ul')
    // let list = gameBodyUl.children
    // let arr = [...list]
    let timer = document.getElementById('timer')
    
    countDown = setInterval(function () {
      if (parseFloat(timer.innerText) > 0) {
        const wordLi = document.createElement('li')
        // console.log(parseFloat(timer.innerText))
        //getting a random word obj
        let randomWord = words[Math.floor(Math.random() * words.length)]
        //setting our created wordLi id 
        wordLi.id = randomWord.id
        wordLi.value = randomWord.letter_count
        //setting our created wordLi text
        wordLi.innerText = randomWord.title
        //append in an interval of 2.5seconds
        gameBodyUl.appendChild(wordLi)
      }
      else {
        //go to score page 
        //patch score here?
        //at the point where the timer ends
        //how do i get access to the scoreCount so that i can set the end scoreCount
        //to the games new score value?
        
        clearInterval(countDown)
        checkForZero()
        return -1;
      }
    }, 1000)
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

function checkForZero() {
  const scoreDiv = document.getElementById('score')
  let timer = document.getElementById('timer')
  let timerNum = parseInt(timer.innerText)
  console.log(parseInt(scoreDiv.innerText))
  console.log(timer.innerText)
  const playerId = document.getElementsByClassName('user-scores-tab')[0].id

  let title = document.getElementsByClassName('title')[0]
  fetch(`http://localhost:3000/games/${title.id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: playerId,
          score: parseInt(scoreDiv.innerText)
        })
      }).then(resp => resp.json()).then(gameData => console.log(gameData))


  // mainContainer.innerHTML = `<h1>Your score was: ${scoreDiv.innerText}</h1>`

}





