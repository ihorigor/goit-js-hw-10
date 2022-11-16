function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButtonChangeBcgColor = document.querySelector('button[data-start]');
const stopButtonChangeBcgColor = document.querySelector('button[data-stop]');
let timerId = null;

startButtonChangeBcgColor.addEventListener('click', () => {
  timerId = setInterval(() => {
    // console.log('Hello')
    document.body.style.backgroundColor = getRandomHexColor();
    startButtonChangeBcgColor.disabled = true;
    stopButtonChangeBcgColor.disabled = false;
  }, 1000);
});

stopButtonChangeBcgColor.addEventListener('click', () => {
  clearInterval(timerId);
  startButtonChangeBcgColor.disabled = false;
  stopButtonChangeBcgColor.disabled = true;
});
