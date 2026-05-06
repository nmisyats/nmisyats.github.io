const email = document.getElementById("email");
const emailParts = email?.dataset.parts?.split(",");

if (email && emailParts) {
  email.innerHTML = atob(emailParts.join(""));
}

for (const link of document.getElementsByTagName("a")) {
  if (link.classList.contains("no-new-tab")) {
    continue;
  }

  link.target = "_blank";
  link.rel = "noopener noreferrer";
}

const navLinks = Array.from(document.getElementsByClassName("nav-link"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navLinkDefaultClass = navLinks[0]?.className ?? "";

function updateNavLinks() {
  if (navLinks.length === 0 || sections.length === 0) {
    return;
  }

  const rects = new Map();
  for (const section of sections) {
    rects.set(section.id, section.getBoundingClientRect());
  }

  const lowerSections = sections.filter((section) => rects.get(section.id).bottom > 0);
  lowerSections.sort((a, b) => rects.get(a.id).bottom - rects.get(b.id).bottom);

  for (const navLink of navLinks) {
    navLink.className = navLinkDefaultClass;
  }

  const bestSection = lowerSections[0] ?? sections[sections.length - 1];
  const navLink = navLinks.find((link) => link.getAttribute("href") === `#${bestSection.id}`);
  navLink?.classList.add("nav-link-current");
}

updateNavLinks();
window.addEventListener("scroll", updateNavLinks);
