let inputDir={x:0,y:0}; //snake static at game start time

const foodSound=new Audio('../Sound Effects/food.mp3');
const gameoversound=new Audio('../Sound Effects/gameover.mp3');
const moveSound=new Audio('../Sound Effects/move.mp3');
const musicSound=new Audio('../Sound Effects/music.mp3');

let speed=4;
let YourScore=0;
let lastpainttime=0;

let snakearr=[
    {x:13,y:15}
]

let food={x:6,y:7}; //food object

function main(ctime)
{
    window.requestAnimationFrame(main); //game loop
    //console.log(ctime)
    if(((ctime-lastpainttime)/1000) < 1/speed) 
        {
            return;
        }
    lastpainttime=ctime;
    gamengine();
}

function isCollide(sarr)//Snake encounters wall/itself
{
    for (let i = 1; i < snakearr.length; i++) 
    {
        if(snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y)
        {
            return true;
        }
    }

    if(snakearr[0].x>=18 || snakearr[0].x<=0 && snakearr[0].y>=18 || snakearr[0].y<=0)
    {
        return true;
    }
    return false;
}

function gamengine()
{
    if(isCollide(snakearr))
    {
        gameoversound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again!");
        snakearr=[{x:13,y:15}];
        musicSound.play();
        YourScore=0;

    }

    //When snake eats food
    if(snakearr[0].y==food.y && snakearr[0].x==food.x)
    {
        foodSound.play();
        snakearr.unshift({x:snakearr[0].x + inputDir.x, y:snakearr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x: Math.round(a + (b-a)*Math.random()),y:Math.round(a + (b-a)*Math.random())} // randomly generating food's new position
    }

    //Moving the snake by iterating over whole snake body
    for (let i = snakearr.length -2; i >= 0; i--) 
    {
        snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x+=inputDir.x;
    snakearr[0].y+=inputDir.y;

    //Snake Array
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;

        if(index==0) 
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //Food element
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;

    foodElement.classList.add('food')
    board.appendChild(foodElement);
    
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1}
    moveSound.play();

    switch(e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break; 
        
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
            
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;

        default:
            break;
    }
})