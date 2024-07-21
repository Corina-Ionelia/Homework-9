document.addEventListener('DOMContentLoaded', () => {
    const datetimePicker = document.querySelector("#datetime-picker");
    const startButton = document.querySelector("#start-button");
    const timerFields = {
        days: document.querySelector("#days"),
        hours: document.querySelector("#hours"),
        minutes: document.querySelector("#minutes"),
        seconds: document.querySelector("#seconds")
    };

    // Funcție pentru adăugarea zero-urilor la începutul numărului
    function addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }

    // Funcție pentru conversia milisecundelor în zile, ore, minute și secunde
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

    // Inițializare flatpickr
    flatpickr(datetimePicker, {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const [selectedDate] = selectedDates;
            if (selectedDate < new Date()) {
                alert("Please choose a date in the future");
                startButton.disabled = true;
            } else {
                startButton.disabled = false;
                startButton.dataset.endDate = selectedDate.toISOString();
                console.log("Date selected:", startButton.dataset.endDate);
            }
        },
    });

    // Funcție pentru actualizarea cronometrului
    function updateTimer() {
        const endDate = new Date(startButton.dataset.endDate);
        const now = new Date();
        const timeLeft = endDate - now;

        console.log("Time left:", timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            Object.values(timerFields).forEach(field => field.textContent = '00');
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(timeLeft);

        timerFields.days.textContent = addLeadingZero(days);
        timerFields.hours.textContent = addLeadingZero(hours);
        timerFields.minutes.textContent = addLeadingZero(minutes);
        timerFields.seconds.textContent = addLeadingZero(seconds);
    }

    let timerInterval;

    // Event listener pentru butonul "Start"
    startButton.addEventListener('click', () => {
        if (timerInterval) clearInterval(timerInterval);
        console.log("Starting timer");
        timerInterval = setInterval(updateTimer, 1000);
        updateTimer(); // Actualizare inițială
    });
});