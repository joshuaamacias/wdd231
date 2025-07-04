const checkoutForm    = document.getElementById('checkoutForm');
const errorMessagesDiv = document.getElementById('errorMessages');
const errorList        = errorMessagesDiv.querySelector('ul');

/**
 * Validates a credit card number using Luhn's algorithm.
 * @param {string} cardNumber
 * @returns {boolean}
 */
function isValidLuhn(cardNumber) {
    let sum = 0;
    let isSecondDigit = false;
    cardNumber = cardNumber.replace(/\D/g, '');

    if (cardNumber.length < 13 || cardNumber.length > 19) {
        return false;
    }

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);
        if (isSecondDigit) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        isSecondDigit = !isSecondDigit;
    }
    return sum % 10 === 0;
}

checkoutForm.addEventListener('submit', function (event) {
    // Reset previous errors
    errorList.innerHTML = '';
    errorMessagesDiv.classList.add('hidden');

    const errors = [];
    const cardValue = document.getElementById('cardNumber').value;
    const month     = parseInt(document.getElementById('expMonth').value, 10);
    const year      = parseInt(document.getElementById('expYear').value, 10);
    const now       = new Date();
    const currentYear  = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // Credit card validation
    if (!isValidLuhn(cardValue)) {
        errors.push('Enter a valid credit card number');
    }

    // Month validation
    if (isNaN(month) || month < 1 || month > 12) {
        errors.push('Expiration month must be between 1 and 12');
    }

    // Year validation
    if (isNaN(year) || year < currentYear) {
        errors.push('Expiration year cannot be in the past');
    } else if (year === currentYear && month < currentMonth) {
        errors.push('Expiration date cannot be in the past');
    }

    // If there are any errors, block submission and show them
    if (errors.length) {
        event.preventDefault();
        errorMessagesDiv.classList.remove('hidden');
        errors.forEach(msg => {
            const li = document.createElement('li');
            li.textContent = msg;
            errorList.appendChild(li);
        });
    }
});
