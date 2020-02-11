
document.addEventListener("DOMContentLoaded", function() {
  //add functionality upon load
  getUsername()
  listenForSignUp()
  listenForLogin()
  
})

function listenForSignUp() {
  const signupBtn = document.getElementById('signup-btn')
  let userInput = document.getElementsByClassName('form-control')[0]
  let userInputVal = userInput.value
  signupBtn.addEventListener('click', function(event){
    event.preventDefault()
    console.log(event.target)
    fetch('http://localhost:3000/players', {
      method: "POST", 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: userInput.value
      })
    }).then(res => res.json())
    .then(data => 
      console.log("?"))
  })
}

function listenForLogin() {
  const loginBtn = document.getElementById('login-btn')
  let userInput = document.getElementsByClassName('form-control')[0]
  let userInputVal = userInput.value

  loginBtn.addEventListener('click', function(event) {
    fetch('http://localhost:3000/players')
    .then(res => res.json())
    .then(data => data.forEach(obj => {
      if(obj.name === userInput.value){
        renderGamePage(obj)
      }
    }))
  })
}

// function search(nameKey, myArray){
//   myArray.forEach(obj => {
//     if(obj.name === nameKey) {
//       return obj
//     }
//   })
// }


function getUsername() {
  const userInput = document.getElementsByClassName('form-control')[0]
  const userSubmit = document.getElementsByClassName('btn float-right login_btn')[0]
  let userInputVal = userInput.value
  
  userSubmit.addEventListener("click", function(event) {
    event.preventDefault() 
    
    //once logged in, remember username, and render new HTML for actual game page
  })
}


function renderGamePage(user) {
  const mainContainer = document.getElementsByClassName('container')[0]
  // console.log(mainContainer)
  mainContainer.innerHTML = `
  <div class="title" <h1>ndTypingTutor</h1></div>
  <div class="sidebar" id="sidebar">
    <div class="username-tab"><p>Hello, ${user.name}</p>
    </div><br>
      <div class="user-scores-tab" id="user-scores"><a href="#user-scores">${user.name}'s Scores</a>
      </div><br>
        <div class="leaderboard-tab" id="leaderboard"><a href="#leaderboard">Leaderboard</a>
        </div><br>
          <button class="start-button" id="start-btn">Start</button><br><br>
            <div class="logout-tab" id="logout"><a id="logout-link" href="#logout">Logout</a>
    </div>
  </div>
  <div class="game-body" id="game-body">
         <ul class "game-ul" id="game-ul">
         </ul>
  </div> 
    <div class="bottom-bar" id="bot-bar">
      <div class="word-target" id="word-target">
      </div> 

  </div>  `
  
 

  //page will include a side bar with
  //username
    //button linking to users past games with scores(ordered by score)
    //button linking to the leaderboard (top ten highest scores of all users)
    //exit button - re render main page(logout)

//main container where words will be falling
  //eventlistener to catch words being typed 

//bottom div will hold the currently lowest word in the main container 
//if bottom div word typed correctly matches the word lowest, then word goes away and score is increased
  
listenForStartButton()
}

function listenForStartButton(){
  const startButton = document.getElementById('start-btn');
  startButton.addEventListener('click', function(event){
    fetch('http://localhost:3000/words').then(resp => resp.json()).then(words => displayTheWords(words))
  })
}

function displayTheWords(words){
  const gameBodyUl = document.getElementById('game-ul')
  setInterval(function() {
      const wordLi = document.createElement('li')
      wordLi.innerText = words[Math.floor(Math.random() * words.length)].title
      gameBodyUl.appendChild(wordLi)
      let wordTarget = document.getElementById('word-target')
      wordTarget.innerHTML = wordLi.innerText
      console.log(wordLi.innerText)
  }, 3500)
    

  }


