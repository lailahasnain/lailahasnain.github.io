const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const revealEls = document.querySelectorAll(".reveal");

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
