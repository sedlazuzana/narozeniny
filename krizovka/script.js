document.addEventListener('DOMContentLoaded', () => {
    // Správné odpovědi křížovky
    const correctAnswers = {
        'word1': 'ŠTÍROVNÍK',
        'word2': 'AHA',
        'word3': 'KVĚTEN',
        'word4': 'NAPLECH',
        'word5': 'WENSDY'
    };

    const checkBtn = document.getElementById('check-btn');
    const continueBtn = document.getElementById('continue-btn');
    const resultMessage = document.getElementById('result-message');
    const tajenkaResultSpan = document.getElementById('tajenka-result');

    checkBtn.addEventListener('click', checkCrossword);

    // Funkce pro automatické přeskakování na další políčko
    const allInputs = document.querySelectorAll('.crossword-grid input');
    allInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index + 1 < allInputs.length) {
                allInputs[index + 1].focus();
            }
        });
    });


    function checkCrossword() {
        let allWordsAreCorrect = true;

        // Projdeme každé slovo a zkontrolujeme ho
        for (const wordId in correctAnswers) {
            const rowInputs = document.querySelectorAll(`#${wordId} input`);
            let userInput = '';
            rowInputs.forEach(input => {
                userInput += input.value;
            });

            // Porovnáme odpověď (bez ohledu na velikost písmen)
            if (userInput.toUpperCase() === correctAnswers[wordId].toUpperCase()) {
                rowInputs.forEach(input => input.style.borderColor = 'green');
            } else {
                rowInputs.forEach(input => input.style.borderColor = 'red');
                allWordsAreCorrect = false;
            }
        }

        // Pokud jsou všechna slova správně, odhalíme tajenku
        if (allWordsAreCorrect) {
            resultMessage.textContent = 'Všechno je správně! Skvělá práce!';
            resultMessage.className = 'correct';
            checkBtn.classList.add('hidden');
            continueBtn.classList.remove('hidden');

            // CHYTRÉ SESTAVENÍ TAJENKY
            // Skript sám najde políčka označená jako ".tajenka-letter"
            let tajenkaWord = '';
            const tajenkaCells = document.querySelectorAll('.tajenka-letter');
            tajenkaCells.forEach(cell => {
                const input = cell.querySelector('input');
                if (input) {
                    tajenkaWord += input.value;
                }
            });

            tajenkaResultSpan.textContent = tajenkaWord.toUpperCase();

        } else {
            resultMessage.textContent = 'Něco je špatně. Zkus to znovu!';
            resultMessage.className = 'incorrect';
            tajenkaResultSpan.textContent = '?????';
        }
    }
});