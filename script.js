// Variables used to "grab" the elements in the game. 
const bird = document.querySelector('.bird')
const gameDisplay = document.querySelector('.game-container')
const ground = document.querySelector('.ground')

// Variables used to "affect" the elements in the game.
let birdLeft = 220
let birdBottom = 100
let gap = 430
let gravity = 2
let isGameOver = false;

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
let gameTimerId = setInterval(startGame, 20)

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

    let obstacleBottom = randomHeight

    // Creates a div element called "bottomObstacle".
    const bottomObstacle = document.createElement('div')

    // Creates a div element called "topObstacle".
    const topObstacle = document.createElement('div')

    // Giving the created div variable obstacle a class name of "bottomObstacle".
    if(!isGameOver) {
        bottomObstacle.classList.add('bottomObstacle')
        topObstacle.classList.add('topObstacle')
    }

    bottomObstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.left = obstacleLeft + 'px'
    bottomObstacle.style.bottom = obstacleBottom + 'px'
    topObstacle.style.bottom = obstacleBottom + gap + 'px'

    // We are appending the newly created div to our parent div.
    gameDisplay.appendChild(bottomObstacle)

    // We are appending the newly created div to our parent div.
    gameDisplay.appendChild(topObstacle)

    function moveObstacle()
    {
        // Moving the obstacle 2 pixels to the left continuously.
        obstacleLeft -= 2
        bottomObstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        
        // If the obstacle is outside our game box then we delete it.
        if(obstacleLeft  == 0) {
            clearInterval(timerId)
            gameDisplay.removeChild(bottomObstacle)
            gameDisplay.removeChild(topObstacle)
        }

        // If the bird collides with an obstacle we called the gameOver method.
        if(obstacleLeft > 200 && 
            obstacleLeft < 280 && 
            birdLeft == 220 && 
            (birdBottom < obstacleBottom + 155 || 
             birdBottom > obstacleTop + gap - 200) || 
            birdBottom == 0) {
            gameOver()
        }
    }

    // Timer to call the moveObstacle method every 20 ms.
    let timerId = setInterval(moveObstacle, 20)

    // If the game is not over then we generate another obstacle.
    if(!isGameOver) { 
        setTimeout(generateObstacle, 3000)
    }
}

generateObstacle()

function gameOver()
{
    clearInterval(gameTimerId)
    isGameOver = true;
    document.removeEventListener('keyup', control)
}