// Get references to all the elements we need to update
const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');
const digitalDay = document.getElementById('digital-day');

// The names of the days
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function animateClock() {
    const now = new Date();

    // --- Analog Clock Logic (with SMOOTH Second Hand) ---
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // THE KEY CHANGE: We now include milliseconds to get a fractional second.
    // This makes the movement continuous instead of a tick.
    const secondsDegrees = ((seconds + milliseconds / 1000) / 60) * 360;
    secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;

    const minutes = now.getMinutes();
    // We also update the minute hand based on the smooth seconds for a more precise movement.
    const minutesDegrees = ((minutes / 60) * 360) + (((seconds + milliseconds / 1000) / 60) * 6);
    minuteHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;

    const hours = now.getHours();
    const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30);
    hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;

    // --- Day of the Week Logic ---
    if (digitalDay) {
        digitalDay.textContent = daysOfWeek[now.getDay()];
    }

    // This is the magic part: it tells the browser to run this function again
    // right before the next screen repaint, creating a smooth animation loop.
    requestAnimationFrame(animateClock);
}

// Start the animation loop!
animateClock();