const correctGlobalPassword = "1506"; // Єдиний пароль для всіх входів на рівні

document.addEventListener('DOMContentLoaded', function() {
    const passwordPrompt = document.getElementById('passwordPrompt');
    const questContent = document.getElementById('questContent');
    const passwordInput = document.getElementById('levelPasswordInput');
    const passwordFeedback = document.getElementById('passwordFeedback');

    // Перевіряємо, чи є елементи для парольного запиту
    if (passwordPrompt && questContent && passwordInput) {
        // Ховаємо контент квесту до введення пароля
        questContent.classList.add('hidden');
        passwordPrompt.classList.remove('hidden'); // Показуємо запит пароля
        passwordInput.focus(); // Фокус на поле вводу пароля

        document.getElementById('checkPasswordBtn').addEventListener('click', checkLevelPassword);
        passwordInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                checkLevelPassword();
            }
        });
    }

    // Логіка для кнопки відповіді на питання квесту
    const answerButton = document.querySelector('.container button');
    if (answerButton) {
        answerButton.addEventListener('click', checkAnswer);
        document.getElementById('answerInput').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                checkAnswer();
            }
        });
    }
});


function checkLevelPassword() {
    const passwordInput = document.getElementById('levelPasswordInput');
    const passwordFeedback = document.getElementById('passwordFeedback');
    const passwordPrompt = document.getElementById('passwordPrompt');
    const questContent = document.getElementById('questContent');

    if (passwordInput.value.trim() === correctGlobalPassword) {
        passwordFeedback.textContent = "Пароль вірний!";
        passwordFeedback.style.color = "#28a745";
        setTimeout(() => {
            passwordPrompt.classList.add('hidden'); // Ховаємо запит пароля
            questContent.classList.remove('hidden'); // Показуємо контент квесту
        }, 500); // Невелика затримка для ефекту
    } else {
        passwordFeedback.textContent = "Невірний пароль. Спробуйте ще раз.";
        passwordFeedback.style.color = "#dc3545";
        passwordInput.value = ''; // Очищаємо поле
    }
}


function checkAnswer() {
    const answerInput = document.getElementById('answerInput');
    const checkButton = document.querySelector('.container button'); // Оновлено селектор
    const feedbackElement = document.getElementById('feedback');
    const userAnswer = answerInput.value.trim().toLowerCase();

    if (userAnswer === correctAnswer.toLowerCase()) {
        feedbackElement.textContent = levelMessage;
        feedbackElement.className = 'correct';
        
        answerInput.disabled = true;
        checkButton.disabled = true;
        checkButton.textContent = "Вірно!"; 
        
        // Для фінального рівня
        if (typeof nextLevelPage === 'undefined' || nextLevelPage === null) {
            feedbackElement.style.fontSize = "1.2em";
            feedbackElement.style.padding = "20px";
            feedbackElement.style.marginTop = "30px";
            // Можна додати додаткові дії для фіналу, наприклад, приховати поле вводу
            answerInput.classList.add('hidden');
        }

    } else {
        feedbackElement.textContent = "Неправильна відповідь. Спробуйте ще раз!";
        feedbackElement.className = 'incorrect';
        answerInput.value = '';
    }
    feedbackElement.classList.remove('hidden');
}