import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerStartBtn = document.querySelector('button[data-start]');
const daysLeft = document.querySelector('.value[data-days]');
const hoursLeft = document.querySelector('.value[data-hours]');
const minutesLeft = document.querySelector('.value[data-minutes]');
const secondsLeft = document.querySelector('.value[data-seconds]');
const DELAY = 1000;
let intervalId = null;

timerStartBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dataAudit(selectedDates);
    timerStartBtn.disabled = false;
  },
  onValueUpdate(selectedDates) {
    dataAudit(selectedDates);
    clearInterval(intervalId);
  },
};
const fp = flatpickr('#datetime-picker', options);

timerStartBtn.addEventListener('click', handleTimerBtnStartClick);

function handleTimerBtnStartClick() {
  const futureDate = fp.selectedDates[0];
  intervalId = setInterval(() => {
    const currentTime = new Date();
    const time = futureDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(time);
    daysLeft.textContent = days;
    hoursLeft.textContent = hours;
    minutesLeft.textContent = minutes;
    secondsLeft.textContent = seconds;
    console.log(`${days}:${hours}:${minutes}:${seconds}`);
  }, DELAY);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function dataAudit(data) {
  const currentDate = new Date();
  if (data[0] - currentDate <= 0) {
    timerStartBtn.disabled = true;
    return Notify.failure('Please choose a date in the future', {showOnlyTheLastOne: true});
  }
}