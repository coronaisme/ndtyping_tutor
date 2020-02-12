//page will include a side bar with
//username
  //button linking to users past games with scores(ordered by score)
  //button linking to the leaderboard (top ten highest scores of all users)
  //exit button - re render main page(logout)

//main container where words will be falling
//eventlistener to catch words being typed 

//bottom div will hold the currently lowest word in the main container 
//if bottom div word typed correctly matches the word lowest, then word goes away and score is increased



document.addEventListener("DOMContentLoaded", function() {

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
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: userInput.value
      })
    }).then(res => res.json())
    .then(data => {
      renderGamePage(data)})
  })
}

//if user hits login, makes a get, logs user in with their information
function listenForLogin() {
  const loginBtn = document.getElementById('login-btn')
  let userInput = document.getElementsByClassName('form-control')[0]

  loginBtn.addEventListener('click', function(event) {
    event.preventDefault()
    fetch('http://localhost:3000/players')
    .then(res => res.json())
    .then(data => data.forEach(obj => {
      if(userInput.value === "") {
        console.log("Invalid username")
      }else if(obj.name === userInput.value){
        renderGamePage(obj)
      }
    }))
  })
}




//main game page new html, kinda clunky, but works
function renderGamePage(user) {
  const mainContainer = document.getElementsByClassName('container')[0]

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
     <form id="input-word">
        <input type="text">
     </form>
     </div>
  </div>  `
  
 

  
listenForStartButton()
listenLogout()
listenForUserInput()
}

//starts the interval to display words
function listenForStartButton(){
  const startButton = document.getElementById('start-btn');
  startButton.addEventListener('click', function(event){
    fetch('http://localhost:3000/words').then(resp => resp.json()).then(words => displayTheWords(words))
  })
}

//gets words to add to a list at interval time
let screenWords = []
function displayTheWords(words){
  const gameBodyUl = document.getElementById('game-ul')
    setInterval(function() {
      const wordLi = document.createElement('li')
      wordLi.innerText = words[Math.floor(Math.random() * words.length)].title
      gameBodyUl.appendChild(wordLi)
      screenWords.push(wordLi.innerText)
      screenWords.forEach(word => {
        wordLi.innerText = word
      })
      console.log(screenWords)
    }, 3500)
  }
  
//refreshes page lol
  function listenLogout() {
    const logoutBtn = document.getElementById('logout')
    logoutBtn.addEventListener('click', function(event) {
      if(event.target.id === 'logout-link'){
      document.location.reload(true)
      }
    })
  }

  function listenForUserInput(){

  }

