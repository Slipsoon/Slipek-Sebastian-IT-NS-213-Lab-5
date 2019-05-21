let ball   = document.querySelector('.ball');
let hole = document.querySelector('.hole');
let square = document.querySelector('.square');
let rndTopPosition = Math.floor(Math.random() * 180);
let rndLeftPosition = Math.floor(Math.random() * 180);

let maxX = square.clientWidth  - ball.clientWidth;
let maxY = square.clientHeight - ball.clientHeight;

function handleOrientation(e) {
  let x = e.beta;
  let y = e.gamma;

  x += 90;
  y += 90;

  if (x > 90) 
    x =  90;
  if (x < -90) 
    x = -90;
  if (y < -90) 
     y = -90;
  if (y > 90)
    y = 90;

  ball.style.top  = `${(maxX * x / 180)}px`;
  ball.style.left = `${(maxY * y / 180)}px`;
  console.log("top: " + (maxX * x / 180) + "px");
  console.log("left: " + (maxY * y / 180) + "px");
}

hole.style.top = `${rndTopPosition}px`;
hole.style.left = `${rndLeftPosition}px`;

// console.log(`top: ${rndTopPosition}px`);
// console.log(`left ${rndLeftPosition}px`);

window.addEventListener('deviceorientation', handleOrientation);
