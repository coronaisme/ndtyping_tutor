document.addEventListener("DOMContentLoaded", function() {
  //add functionality upon load
  getUsername()
})


function getUsername() {
  const userInput = document.getElementsByClassName('form-control')[0]
  const userSubmit = document.getElementsByClassName('btn float-right login_btn')[0]
  let userInputVal = userInput.value
  
  userSubmit.addEventListener("click", function(event) {
    event.preventDefault()   
    renderGamePage()
    //once logged in, remember username, and render new HTML for actual game page
  })
}

function renderGamePage() {
  const mainContainer = document.getElementsByClassName('container')[0]
  console.log(mainContainer)
  mainContainer.innerHTML = `
  <div class="title" <h1>ndTypingTutor</h1></div>
  <div class="sidebar" id="sidebar">
    <div class="username-tab"><p>Username</p>
    </div><br>
      <div class="user-scores-tab" id="user-scores"><a href="#user-scores">Username's High Scores</a>
      </div><br>
        <div class="leaderboard-tab" id="leaderboard"><a href="#leaderboard">Leaderboard</a>
        </div><br>
          <button class="start-button" id="start-btn">Start</button><br><br>
            <div class="logout-tab" id="logout"><a href="#logout">Logout</a>
    </div>
  </div>
  <div class="game-body" id="game-body">
         
  </div> 
    <div class="bottom-bar" id="bot-bar"> 

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
  

}