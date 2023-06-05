// game constant and variable
let inputDir = { x: 0, y: 0 };
let foodsound = new Audio('food.mp3');
let gameover = new Audio('gameover.mp3');
let movesound = new Audio('move.mp3');
let musicsound = new Audio('music.mp3')
// musicsound.play();
let speed = 3;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 };




//game function
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    // console.log(ctime);
    gameEngine();

}



function isCollide(snake) {
    // if you bump into youy self
    for (let i = 1; i < snakeArr.length; i++) {
         if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
         }
       
    }
    // if you bumb into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
    }
}


function gameEngine() {
    //part1 : Updating the snake array & food
    if(isCollide(snakeArr)) {
        gameover.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over press anykey to play again");
        snakeArr = [
            { x: 13, y: 15 }
        ]
       
        document.getElementById('score').innerHTML = `Score: ${0}`
    }

    // if you have eaten the food ans increment the score and regenarate the food
    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        foodsound.play();
        score +=1
        document.getElementById('score').innerHTML = `Score: ${score}`
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //moveing the sanke
    for(let i = snakeArr.length-2; i>=0; i--){
      
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //part2 : display the sanke and food

    // display the sanke
    board.innerHTML = "";
    snakeArr.forEach((element, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index == 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}
















// main logic start here
window.requestAnimationFrame(main);
window.addEventListener('keyup', e => {
    inputDir = { x: 0, y: 1 } // start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
})
