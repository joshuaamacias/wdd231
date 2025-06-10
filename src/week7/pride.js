// pride.js

function populateList(quotes) {
  const ul = document.getElementById('quote-list');
  ul.style.display = '';
  ul.innerHTML = '';
  quotes.forEach(q => {
    const li = document.createElement('li');
    li.textContent = q;
    ul.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const loadBtn = document.getElementById('load-btn');
  const hideBtn = document.getElementById('hide-btn');
  const stored = localStorage.getItem('pride-prejudice');

  if (stored) {
    // Show stored quotes and hide the load button
    populateList(JSON.parse(stored));
    loadBtn.style.display = 'none';
    hideBtn.style.display = 'inline-block';
  } else {
    // No stored quotes yet: hide the hide button
    hideBtn.style.display = 'none';
  }

  // Load quotes from JSON on click
  loadBtn.addEventListener('click', () => {
    fetch('./quotes.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const books = Array.isArray(data.books) ? data.books : [];
        const pp = books.find(b => b.title === 'Pride and Prejudice');
        const quotes = (pp && Array.isArray(pp.quotes)) ? pp.quotes : [];
        if (!quotes.length) throw new Error('No P&P quotes found');

        localStorage.setItem('pride-prejudice', JSON.stringify(quotes));
        populateList(quotes);

        loadBtn.style.display = 'none';
        hideBtn.style.display = 'inline-block';
      })
      .catch(err => {
        console.error(err);
        document.getElementById('quote-list').innerHTML = '<li>Sorry, could not load quotes.</li>';
      });
  });

  // Hide the list and toggle buttons
  hideBtn.addEventListener('click', () => {
    document.getElementById('quote-list').style.display = 'none';
    hideBtn.style.display = 'none';
    loadBtn.style.display = 'inline-block';
  });
});
