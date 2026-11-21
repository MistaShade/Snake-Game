const apple = document.querySelector('.apple');
const playground = document.querySelector('.playground');

function toggleAppleVisibility() {
  apple.style.display = apple.style.display === 'none' ? 'block' : 'none';
}

function randomizeApplePosition() {
  const maxX = playground.clientWidth - 100; 
  const maxY = playground.clientHeight - 100; 
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  apple.style.left = randomX + 'px';
  apple.style.top = randomY + 'px';
}


toggleAppleVisibility();
randomizeApplePosition();

setInterval(toggleAppleVisibility, 6000); 
setInterval(randomizeApplePosition, 5000);
