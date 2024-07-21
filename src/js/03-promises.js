import Notiflix from 'notiflix';

// Funcția createPromise returnează o promisiune
function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}

// Gestionarea trimiterii formularului
document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Preluarea valorilor din formular
    const delay = Number(event.target.elements.delay.value);
    const step = Number(event.target.elements.step.value);
    const amount = Number(event.target.elements.amount.value);

    // Crearea promisiunilor și gestionarea acestora
    for (let i = 1; i <= amount; i++) {
        const currentDelay = delay + (i - 1) * step;

        createPromise(i, currentDelay)
            .then(({ position, delay }) => {
                // Afișează mesajul de succes folosind Notiflix
                Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                // Afișează mesajul de eroare folosind Notiflix
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
    }
});