  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  let timerId = null;
  const bodyEl = document.body;
  const startBtn = document.querySelector('[data-start]');
  const stopBtn = document.querySelector('[data-stop]');

  startBtn.addEventListener('click', () => {
    startBtn.disabled = true; 
    timerId = setInterval(() => {
      bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });

  stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    startBtn.disabled = false; 
  });
