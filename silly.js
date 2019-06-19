function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomColor() {
    return "rgb(" + getRandomInt(255) + "," + getRandomInt(255) + "," + getRandomInt(255) + ")";
}

  var silly = true;
  var game = 0;
  var start = null;
  var stop = false;
  var table =  document.getElementById('table');
  var scoreDiv =  document.getElementById('score');
  var highScoreDiv =  document.getElementById('high-score');

  var body = document.getElementsByTagName("body")[0];
  var sideLength = 300;
  var top = 0;
  var left = 0;
  var right = sideLength - 20;
  var pRightBound = sideLength - 50;
  var bottom = sideLength - 20;
  var paddleSensitivity = 10;
  var highScore = 0;


  initNewGame();
  
  function initNewGame() {
    bouncedOnBottom = false;
    deltaX = 0.6 * (game%2 ? 1 : -1);
    deltaY = 1;
    speed = 3;
    x = getRandomInt(right) + 1;
    y = 1;
    points = 0;
    pPos = 0;
    pMove = null;
    scoreDiv.innerHTML = points;
    
   
    game++;
  }
  
  
  function scoredAPoint() {
    points++;
    scoreDiv.innerHTML = points;

    if (points > highScore){
        highScore = points;
        highScoreDiv.innerHTML = highScore;
    };
    speed = speed + .5;
  }
  
  
  body.addEventListener('keydown', function(e){
  
  if(e.key==="ArrowRight"){
     pMove = "R";
  }
  
  if(e.key ==="ArrowLeft"){
     pMove = "L";
  }
  });
  
  body.addEventListener('keyup', function(e){
  
  if(e.key==="ArrowRight"){
     pMove = null;
  }
  
  if(e.key ==="ArrowLeft"){
     pMove = null;
  }
  });
  
  i = 0;
  function step(timestamp) {
    if (!start) start = timestamp;
    
    var ctx = document.getElementById('table').getContext('2d');

    if(!silly){ 
        ctx.clearRect(0, 0, 300, 300);
    }

    ctx.fillStyle = 'rgb(0,0,0)';
   
    var newPos = pPos;
    if(pMove === "R") {
         newPos = pPos + paddleSensitivity;
        
    }
    else if (pMove === "L") {
         newPos = pPos - paddleSensitivity;
       
    }
    
    if( newPos > pRightBound){
      newPos = pRightBound;
    }
  
    if(newPos < 0) {
      newPos =  0;
    } 
  
    pPos = Math.floor(newPos);
  
    if(silly) {
        ctx.fillStyle = getRandomColor();
    }

    ctx.fillRect(pPos, 295, 50, 5);
  

    x = Math.floor(x + (deltaX * speed));
    y = Math.floor(y + (deltaY * speed));

    var onPaddle =  x > (pPos - 20) &&  x < (pPos + 50);
  
    if(y > bottom  && onPaddle) {
            if(deltaY > 0)  {
                deltaY = deltaY * -1;
            }
        bouncedOnBottom = true;
        scoredAPoint();
    }
    else if(y > bottom  && !onPaddle) {
      initNewGame();
    }
  
    if ( y < 0 ) {
      if(deltaY < 0)  {
          console.log('top');
        deltaY = deltaY * -1;
      }
    }
    if( x < left) {
      console.log(deltaX);
      if(deltaX < 0) {
        deltaX = deltaX * -1;
      } 
    }
    if( x > right) {
      console.log(deltaX);
      if(deltaX > 0) {
        deltaX = deltaX * -1;
      } 
    }
       
    if(silly) {
        ctx.fillStyle = getRandomColor();
    }
    ctx.fillRect( x, y, 20, 20);

    window.requestAnimationFrame(step);
   
  }
  
  window.requestAnimationFrame(step);