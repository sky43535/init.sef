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

// Shows a pointer to non-U.S. helplines when the browser's time zone is outside the U.S.
// Uses only the local time zone setting: no location permission, no network request, nothing stored.
(() => {
  const note = document.querySelector("[data-intl-note]");
  if (!note) return;
  let zone = "";
  try {
    zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch (error) {
    return;
  }
  if (!zone) return;
  const usZones =
    /^(America\/(New_York|Detroit|Chicago|Menominee|Denver|Boise|Phoenix|Los_Angeles|Anchorage|Juneau|Sitka|Metlakatla|Yakutat|Nome|Adak|Puerto_Rico|Indiana\/|Kentucky\/|North_Dakota\/)|Pacific\/(Honolulu|Guam|Saipan|Pago_Pago)|US\/|EST5EDT|CST6CDT|MST7MDT|PST8PDT)/;
  if (!usZones.test(zone)) {
    note.hidden = false;
  }
})();
