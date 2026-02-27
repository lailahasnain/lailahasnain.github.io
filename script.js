const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const revealEls = document.querySelectorAll(".reveal");
const mobileNav = document.querySelector(".mobile-sticky-nav");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", active);
      });
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
  }
);

revealEls.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 85, 420)}ms`;
  revealObserver.observe(element);
});

let lastY = window.scrollY;
const isMobileLayout = () => window.matchMedia("(max-width: 960px)").matches;

const handleScrollDirection = () => {
  if (!mobileNav) return;
  if (!isMobileLayout()) {
    mobileNav.classList.remove("is-hidden");
    lastY = window.scrollY;
    return;
  }

  const currentY = window.scrollY;
  if (currentY <= 8) {
    mobileNav.classList.remove("is-hidden");
  } else if (currentY > lastY + 4) {
    mobileNav.classList.add("is-hidden");
  } else if (currentY < lastY - 4) {
    mobileNav.classList.remove("is-hidden");
  }
  lastY = currentY;
};

window.addEventListener("scroll", handleScrollDirection, { passive: true });
window.addEventListener("resize", handleScrollDirection);
handleScrollDirection();
