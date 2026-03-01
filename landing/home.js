const text = "Predict Your Workout Calorie Burn with Machine Learning";
const typingEl = document.getElementById("typing-text");

let index = 0;

function typeEffect() {
    if (index < text.length) {
        typingEl.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 45);
    }
}

window.onload = typeEffect;

// Profile dropdown toggle
const profileBtn = document.getElementById("profileToggle");
const profileDropdown = document.getElementById("profileDropdown");

profileBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent closing immediately
  profileDropdown.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  profileDropdown.classList.remove("active");
});
