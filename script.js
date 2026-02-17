// --- CONFIGURE THESE TWO VALUES FOR YOUR RELATIONSHIP ---
// 1) Put the date you started your relationship (YYYY, MM-1, DD)
//    Example: new Date(2023, 4, 21) for May 21, 2023 (month is zero-based)
// For your 2nd monthsary at midnight tonight, I set this to two months ago:
// December 18, 2025 (adjust if your exact date is different)
const RELATIONSHIP_START = new Date(2025, 11, 18); // Dec 18, 2025

// 2) Put how you want your name to appear in the letter
// Change this to your real name, for example: "— Juan"
const YOUR_NAME_SIGNATURE = "— Your love";
// --------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  updateCounters();
  setupCompliments();
  setupSurpriseButton();
  personalizeName();
});

function updateCounters() {
  const now = new Date();
  const daysElement = document.getElementById("daysTogether");
  const monthsElement = document.getElementById("monthsTogether");

  if (!daysElement || !monthsElement || isNaN(RELATIONSHIP_START.getTime())) return;

  const diffMs = now - RELATIONSHIP_START;
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  // Rough but sweet months calculation: year/month difference, adjust by day
  let months =
    (now.getFullYear() - RELATIONSHIP_START.getFullYear()) * 12 +
    (now.getMonth() - RELATIONSHIP_START.getMonth());
  if (now.getDate() < RELATIONSHIP_START.getDate()) {
    months -= 1;
  }
  months = Math.max(0, months);

  animateNumber(daysElement, days);
  animateNumber(monthsElement, months);
}

function animateNumber(element, target) {
  let current = 0;
  const duration = 900;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    current = Math.round(progress * target);
    element.textContent = current.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function setupCompliments() {
  const pills = Array.from(document.querySelectorAll(".memory-pill"));
  const memoryText = document.getElementById("memoryText");

  if (!pills.length || !memoryText) return;

  const messages = [
    "Your smile has this magic of making even the heaviest days feel a little softer.",
    "You notice the small things, and the way you care about them makes me feel incredibly loved.",
    "When you believe in me, it gives me a strength I can’t always find on my own.",
    "Your laugh is one of my favorite sounds in the world — I could listen to it forever.",
    "Just being next to you, even in silence, feels like home to me."
  ];

  pills.forEach((pill, index) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      memoryText.style.opacity = "0";
      setTimeout(() => {
        memoryText.textContent = messages[index] || messages[0];
        memoryText.style.opacity = "1";
      }, 150);
    });
  });
}

function setupSurpriseButton() {
  const button = document.getElementById("surpriseButton");
  const heartsContainer = document.getElementById("floatingHearts");

  if (!button || !heartsContainer) return;

  button.addEventListener("click", () => {
    createHearts(heartsContainer, 14);
    button.textContent = "I love you. Always have, always will.💕";
    setTimeout(() => {
      button.textContent = "Tap for a tiny surprise";
    }, 2600);
  });
}

function createHearts(container, count) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = Math.random() > 0.5 ? "💖" : "💕";

    const startLeft = Math.random() * 100;
    const delay = Math.random() * 0.9;

    heart.style.left = `${startLeft}vw`;
    heart.style.bottom = "0";
    heart.style.animationDelay = `${delay}s`;

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4200);
  }
}

function personalizeName() {
  const nameSpan = document.getElementById("yourName");
  if (nameSpan && YOUR_NAME_SIGNATURE) {
    nameSpan.textContent = YOUR_NAME_SIGNATURE;
  }
}


