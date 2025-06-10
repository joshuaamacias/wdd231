const button = document.getElementById("load-btn");
const ul     = document.getElementById("quote-list");
const KEY    = "pride-prejudice";

button.addEventListener("click", async () => {
  let quotes;

  // 1️⃣ If we already have them in localStorage, use those…
  const stored = localStorage.getItem(KEY);
  if (stored) {
    quotes = JSON.parse(stored);
  } 
  // 2️⃣ Otherwise fetch & cache them…
  else {
    try {
      const res  = await fetch("quotes.json");
      const data = await res.json();
      quotes    = data["Pride and Prejudice"];
      if (!quotes) throw new Error("No Pride and Prejudice quotes found");
      localStorage.setItem(KEY, JSON.stringify(quotes));
    } catch (err) {
      console.error(err);
      alert("Couldn’t load quotes. Try again later.");
      return;
    }
  }

  // 3️⃣ Render & hide the button
  ul.innerHTML = "";                    
  quotes.forEach(q => {
    const li = document.createElement("li");
    li.textContent = q;
    ul.appendChild(li);
  });
  button.style.display = "none";
});
