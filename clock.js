// A "self-executing anonymous function" to prevent conflicts with other scripts
(function() {
    // Get references to all the elements we need to update
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');
    const digitalDay = document.getElementById('digital-day');

    // Make sure we don't run the code if the elements aren't on the page
    if (!hourHand || !minuteHand || !secondHand) return;

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function animateClock() {
        const now = new Date();

        // --- Analog Clock Logic (with SMOOTH Second Hand) ---
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();
        
        const totalSeconds = seconds + milliseconds / 1000;
        const secondsDegrees = (totalSeconds / 60) * 360;
        secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;

        const minutes = now.getMinutes();
        const totalMinutes = minutes + totalSeconds / 60;
        const minutesDegrees = (totalMinutes / 60) * 360;
        minuteHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;

        const hours = now.getHours();
        const totalHours = hours + totalMinutes / 60;
        const hoursDegrees = (totalHours / 12) * 360;
        hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;

        // --- Day of the Week Logic ---
        if (digitalDay) {
            digitalDay.textContent = daysOfWeek[now.getDay()];
        }

        // Request the next frame to continue the animation loop
        requestAnimationFrame(animateClock);
    }

    // Start the animation loop!
    requestAnimationFrame(animateClock);
})();