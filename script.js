// Typing effect for role
const roleElement = document.querySelector(".role");
if (roleElement) {
  const roles = ["Software Developer", "Java Enthusiast", "Problem Solver"];
  let roleIndex = 0;
  let charIndex = 0;

  function typeRole() {
    if (charIndex < roles[roleIndex].length) {
      roleElement.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeRole, 100);
    } else {
      setTimeout(eraseRole, 1500);
    }
  }

  function eraseRole() {
    if (charIndex > 0) {
      roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseRole, 60);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 500);
    }
  }

  typeRole();
}

// Smooth scroll for nav
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    if (link.getAttribute("href").includes(".html")) return;
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Fade-in on scroll
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
