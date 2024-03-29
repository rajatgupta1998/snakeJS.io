var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;

var snake = {
    x : 160,
    y : 160,
    cells : [{x : 160, y : 160}, {x:144, }] ,
    eatFruit : false,
    death : false
    }

var fruit  = {
        x : 320,
        y : 320
    }

var score = Number(20);
        
function increaseScore(){
    score += 10;
}

function drawFruit(){
    context.fillStyle = 'red';
    context.fillRect(fruit.x, fruit.y, grid-1, grid-1);
}
drawFruit();


function drawSnake(){
    context.fillStyle = 'green';
    for(let i = 0; i < snake.cells.length ; i++)
    {
        context.fillRect(snake.cells[i].x , snake.cells[i].y , grid-1, grid-1);
    }
}
drawSnake();


function moveSnake(dx, dy){
    snake.x += dx;
    snake.y += dy;
    snake.cells.unshift({x: snake.x, y: snake.y});
    if(!snake.eatFruit)snake.cells.pop();
        else snake.eatFruit = false;
}

// boundaries
function checkBound(){
    if(snake.x < 0 || snake.x == 400 || snake.y < 0 || snake.y == 400 ){
        console.log('out of box');
        snake.die = true;
    }
}

// randomize
function randomInt(){
    return Math.floor(Math.random() * 25) * grid;
}        

// don't spawn fruit on snake
function checkFruitIsOnSnake(){
    for(let i = 0 ; i < snake.cells.length ; i++){
        if(fruit.x == snake.cells[i].x && fruit.y == snake.cells[i].y){
            return true ;
        }
            }
        }

// Generate new fruit
function newFruit(){
    fruit.x = randomInt();
    fruit.y = randomInt();
    if(checkFruitIsOnSnake() ){
        newFruit();
    }
}

// snake gotta eat
function eatIt(){
    if(snake.x == fruit.x && snake.y == fruit.y){
        snake.eatFruit = true ;
        newFruit(); // new fruit is spawned
        drawFruit();
        increaseScore();
    }
}

// but apne ko nahi khane ka
function selfBite(){
    for(var i = 4; i < snake.cells.length; i++)
    {
        if(snake.x == snake.cells[i].x && snake.y == snake.cells[i].y)
        {
            snake.die = true;
        }
    }
}

// hogyi ta khatam ab pau

function gameOver(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.cells = [];
    context.fillStyle = 'red';
    context.font = "30px Arial";
    context.textAlign = "center";
    context.fillText("Game Over. Score: " + score , canvas.width/2, canvas.height/2);
}

document.addEventListener('keydown',function(e){
    let dx, dy;
    // left
    if( e.keyCode ==100 ){
        dx = -grid;
        dy = 0;
    }
    // up
    else if( e.keyCode == 104){
        dx = 0;
        dy = -grid;
    }
    // right
    else if( e.keyCode == 102){
        dx = grid;
        dy = 0;
    }
    // down
    else if( e.keyCode == 98){
        dx = 0;
        dy = grid;
    }
    else
        {
            alert('Please use NumPad Arrows only, Click OK to Reset');
            location.href = 'index.html';
        }

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake(dx,dy);
    checkBound();
    selfBite();
    eatIt();
    if(snake.die){
        gameOver();
    }
    else
        {
            drawSnake();
            drawFruit();
        }
});