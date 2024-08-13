document.addEventListener('DOMContentLoaded', () => {
    const increaseButton = document.getElementById('increase-button');
    const decreaseButton = document.getElementById('decrease-button');
    const startButton = document.getElementById('start-button');
    const durationDisplay = document.getElementById('duration-display');
    const countdownDisplay = document.getElementById('countdown-display');
    const alarmSound = document.getElementById('alarm-sound');
    const countDisplay = document.getElementById('count-display');

    let duration = 0;
    let countdown = 0;
    let intervalId = null;
    let completedCount = 0;

    // Set initial focus to the first button
    increaseButton.focus();

    // Function to handle navigation between buttons
    const focusNextButton = (currentButton, direction) => {
        const buttons = [decreaseButton, increaseButton, startButton];
        let index = buttons.indexOf(currentButton);
        index += direction;
        if (index < 0) index = buttons.length - 1;
        if (index >= buttons.length) index = 0;
        buttons[index].focus();
    };

    // Event listeners for button clicks
    increaseButton.addEventListener('click', () => {
        duration++;
        durationDisplay.textContent = duration;
    });

    decreaseButton.addEventListener('click', () => {
        if (duration > 0) {
            duration--;
            durationDisplay.textContent = duration;
        }
    });

    startButton.addEventListener('click', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            startButton.textContent = 'START';
            countdownDisplay.textContent = "STOPPED";
        } else {
            countdown = duration;
            completedCount = 0; // Reset completed count
            countDisplay.textContent = completedCount;
            startButton.textContent = 'STOP';
            countdownDisplay.textContent = countdown;
            intervalId = setInterval(() => {
                if (countdown > 0) {
                    countdown--;
                    countdownDisplay.textContent = countdown;
                } else {
                    completedCount++;
                    countDisplay.textContent = completedCount;
                    alarmSound.play(); // Play the alarm sound
                    countdown = duration; // Reset countdown to initial duration
                    countdownDisplay.textContent = countdown;
                }
            }, 1000);
        }
    });

    // Listen for keydown events for navigation
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowLeft':
                focusNextButton(document.activeElement, -1);
                break;
            case 'ArrowDown':
            case 'ArrowRight':
                focusNextButton(document.activeElement, 1);
                break;
            default:
                break;
        }
    });
});
