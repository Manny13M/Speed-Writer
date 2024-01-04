//Reference html elements
let pTag1 = document.querySelectorAll("#pTag1")[0]
let pTag2 = document.querySelectorAll("#pTag2")[0]
let pTag3 = document.querySelectorAll("#pTag3")[0]
let stage = document.querySelectorAll("#stage")[0]
let slider = document.querySelectorAll("#difficulty")[0]
let beginButton = document.querySelectorAll("#confirm")[0]
let difficulty = document.querySelectorAll("#difficulty")[0]

//Create p tags and input tag 
let p = document.createElement("p")
let p2 = document.createElement("p")
let p3 = document.createElement("p")
let playAgainText = document.createTextNode("Refresh browser to play again")
p3.appendChild(playAgainText)

let input = document.createElement("input")
input.focus()


//Vairables to keep count of correct words and seconds
let count = 0
let seconds = 0

//Boolean to check if task was completed
let completed = false

//Array of words
var wordArray = 
[
	"once",
	"upon",
	"a",
	"time",
	"I",
	"was",
	"doing",
	"Javascript",
	"Assignment",
	"3"
];


//-------------------------------------------------------------


//Create event listener to begin the game
beginButton.addEventListener('click', beginHandler)

//Create event listener for keyup events
input.addEventListener('keyup', keyupHandler)


//Function activated when beginButton is clicked
function beginHandler()
{
    //Remove start screen
    pTag1.remove()
    pTag2.remove()
    pTag3.remove()
    slider.remove()
    beginButton.remove()

    //Input field page
    inputFieldPage()

    //Start timer and countdown
    startTimer()
    startCountdown()

}

//Keep track of time in seconds
function startTimer()
{
    //Count seconds
    let intervalId = window.setInterval(tocker, 1000); 
    function tocker()
    {   
        if (seconds < 20 && completed == false)
        {
            seconds++
            console.log(seconds)   
        }
        else
        {
            clearInterval(intervalId)  
        }
    }  
}

//Countdown from 20 seconds
function startCountdown()
{
    //Countdown for 20 seconds
    let timeoutId = window.setTimeout(ticker, 20000);
    function ticker()
    {   
        if(completed == false)
        {
            gameLost() 
            clearTimeout(timeoutId)
        }
        else 
        {
            clearTimeout(timeoutId)
        }
    }
}

//Show p tag and input field prompting user for next word
function inputFieldPage()
{
    let pText = document.createTextNode("Next word: " + wordArray[count])
    p.appendChild(pText)

    stage.appendChild(p)
    stage.appendChild(input)
}

//Function responsible for comparing/match input with word
function keyupHandler()
{
    if(count < difficulty.value)
    {
        if(input.value == wordArray[count])
        {
            count++
            console.log("Match")
            if(count < difficulty.value)
            {
                p.replaceChildren("Next word: " + wordArray[count])
                input.value =''  
            } 
            else
            {
                gameWon()
            }
        } 
    }
}

//Function that will show winning screen
function gameWon()
{
    completed = true
    p.replaceChildren("Congratulations! You completed all " + difficulty.value + " words in " + seconds + " seconds!")
    p.style.color = 'Green';

    //Disable input field
    input.disabled = true
    input.removeEventListener('keyup', keyupHandler)

    //Display play again
    stage.appendChild(p3)

}

//Function that will show losing screen
function gameLost()
{
    p.replaceChildren("Times up!")
                
    let p2Text = document.createTextNode("You got " + count + " out of " + difficulty.value + " words!")
    p2.appendChild(p2Text)

    p.style.color = 'red';
    p.style.fontSize = '32px';
    p.appendChild(p2)

    //Disable input field
    input.disabled = true
    input.removeEventListener('keyup', keyupHandler)

    //Display play again
    stage.appendChild(p3)
}




