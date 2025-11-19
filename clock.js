// Get references to all the elements we need to update
const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');
const digitalTime = document.getElementById('digital-time');
const digitalDay = document.getElementById('digital-day');

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function setClock() {
    const now = new Date();

    // --- Analog Clock Logic ---
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360);
    secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;

    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6);
    minuteHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;

    const hours = now.getHours();
    const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30);
    hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;

    // --- Digital Clock Logic ---
    const displayHours = hours % 12 || 12; // Convert 24hr to 12hr, and 0 to 12
    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    const displaySeconds = seconds < 10 ? '0' + seconds : seconds;
    const amPm = hours >= 12 ? 'PM' : 'AM';

    digitalTime.textContent = `${displayHours}:${displayMinutes}:${displaySeconds} ${amPm}`;
    digitalDay.textContent = daysOfWeek[now.getDay()];
}

// Set the clock immediately, then update it every second
setClock();
setInterval(setClock, 1000);