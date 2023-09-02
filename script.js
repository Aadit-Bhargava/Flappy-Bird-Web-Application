// Variables used to "grab" the elements in the game. 
const bird = document.querySelector('.bird')
const gameDisplay = document.querySelector('.game-container')
const ground = document.querySelector('.ground')

// Variables used to "affect" the elements in the game.
let birdLeft = 220
let birdBottom = 100
let gravity = 2

/**
 * Method to begin the game with default positioning of the bird.
 */
function startGame()
{
    birdBottom -= 2
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'
}

// Used to call the startGame method at a regular interval of 20 ms.
let timeId = setInterval(startGame, 20)

/**
 * Method to call the "jump" method if the space-bar key event is pressed.
 * 
 * @param event The key pressed by the user as an "event".
 */
function control(event) 
{
    if(event.keyCode == 32) {
        jump()
    }
}

/**
 * Method used to allow the bird to jump until it reaches a certain height.
 */
function jump()
{
    if(birdBottom <= 490) {
        birdBottom += 50
    }
    bird.style.bottom = birdBottom + 'px'
}

// When we press and release the space-bar our control method is called.
document.addEventListener('keyup', control)

function generateObstacle()
{
    let obstacleLeft = 500

    // Generating an obstacle at a random height from the ground.
    let randomHeight = Math.random() * 60

    let obstacleBotoom = randomHeight

    // Creates a div element called "obstacle".
    const obstacle = document.createElement('div')

    // Giving the created div variable obstacle a class name of "obstacle".
    obstacle.classList.add('obstacle')

    obstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBotoom + 'px'

    // We are appending the newly created div to our parent div.
    gameDisplay.appendChild(obstacle)

    function moveObstacle()
    {
        obstacleLeft -= 2
        obstacle.style.left = obstacleLeft + 'px'

        if(obstacleLeft  == -60) {
            clearInterval(timerId)
            gameDisplay.removeChild(obstacle)
        }

        if(birdBottom == 0) {
            gameOver()
        }
    }
    let timerId = setInterval(moveObstacle, 20)
    setTimeout(generateObstacle, 3000)
}

generateObstacle()

function gameOver()
{

}