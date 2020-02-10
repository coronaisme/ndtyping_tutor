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
    //once logged in, remember username, and render new HTML for actual game page
  })
}

function renderGamePage() {
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