const a = "MgW2F0XSBlY2Uu";
const b = "dWJjLmNh";
const c = "bm1pc3lhdH";
document.getElementById("email").innerHTML = atob(c + a + b);

window.onload = () => {
    const elts = document.getElementsByTagName("a");
    for(const a of elts){
        if(a.classList.contains("no-new-tab"))
            continue;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    }
};

const navLinks = Array.from(document.getElementsByClassName("nav-link"));
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href')));

const navLinkDefaultClass = navLinks[0].className;

function updateNavLinks(){
    const rects = new Map();
    for(const section of sections) {
        rects.set(section.id, section.getBoundingClientRect());
    }
    const lowerSections = sections.filter(section => rects.get(section.id).bottom > 0);
    lowerSections.sort((a, b) => (rects.get(a.id).bottom - rects.get(b.id).bottom));

    for(const navLink of navLinks){
        navLink.className = navLinkDefaultClass;
    }

    const bestSection = lowerSections[0];
    const navLink = navLinks.find(a => a.getAttribute('href') == '#' + bestSection.id);
    navLink.classList.add("nav-link-current");
}

updateNavLinks();
window.onscroll = () => updateNavLinks();