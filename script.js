const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const revealTargets = document.querySelectorAll("[data-reveal]");
const footerYear = document.querySelector("[data-year]");

if (footerYear) {
  footerYear.textContent = ` | ${new Date().getFullYear()}`;
}

if (menuButton && header) {
  menuButton.addEventListener("click", () => {
    const isOpen = header.getAttribute("data-open") === "true";
    header.setAttribute("data-open", String(!isOpen));
    menuButton.setAttribute("aria-expanded", String(!isOpen));
  });

  header.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.setAttribute("data-open", "false");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if ("IntersectionObserver" in window && revealTargets.length > 0) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
