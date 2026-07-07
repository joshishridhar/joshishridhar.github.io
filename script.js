const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const typedLine = document.querySelector(".typed-line");
if (typedLine) {
  const typedText = typedLine.getAttribute("data-typed-text") || "";
  let typedIndex = 0;

  const tick = () => {
    typedLine.textContent = typedText.slice(0, typedIndex);
    if (typedIndex < typedText.length) {
      typedIndex += 1;
      window.setTimeout(tick, 34);
    }
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typedLine.textContent = typedText;
  } else {
    tick();
  }
}

const navLinks = [...document.querySelectorAll(".nav-links a")];
const mobileNavLinks = [...document.querySelectorAll(".mobile-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const updateActiveLinks = (id) => {
  [...navLinks, ...mobileNavLinks].forEach((link) => {
    const active = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", active);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.getAttribute("id");
      updateActiveLinks(id);
    });
  },
  {
    rootMargin: "-40% 0px -45% 0px",
    threshold: 0.1,
  }
);

sections.forEach((section) => observer.observe(section));

const revealItems = [...document.querySelectorAll(".reveal")];
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -8% 0px",
  }
);

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  revealItems.forEach((item) => revealObserver.observe(item));
}

if (sections.length > 0) {
  updateActiveLinks(sections[0].getAttribute("id"));
}
