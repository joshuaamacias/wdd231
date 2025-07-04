/* Get the customer first and last name and generate a thank-you message that includes their name */
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const first  = params.get('firstName') || '';
    const last   = params.get('lastName')  || '';
    const thank  = document.getElementById('thankYouMessage');
    thank.textContent = `Thank you, ${first} ${last}!`;
});
