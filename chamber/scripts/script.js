document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector("#menu");

    menu.addEventListener("click", () => handleMenuClick());

    setCurrentYear();
    setLastModified();
    setCurrentPageNav();
});

function setCurrentYear() {
    let currentYear = new Date().getFullYear();

    document.getElementById("currentYear").textContent = currentYear;
}

function setLastModified() {
    let lastModified = document.lastModified;

    document.getElementById("lastModified").textContent = lastModified;
}

function setCurrentPageNav() {
    let currentPage = document.URL;

    let navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        let href = link.getAttribute("href").replace(".html", "");

        if (currentPage.includes(href)) {
            link.classList.add("active");
        }
    });
}

function handleMenuClick() {
    const nav = document.querySelector("#navigation");

    const isExpanded = menu.getAttribute("aria-expanded") === "true";
    
    menu.setAttribute("aria-expanded", !isExpanded);
    
    nav.setAttribute("aria-hidden", isExpanded);

    nav.classList.toggle("expanded");
    nav.classList.toggle("collapsed");

    menu.textContent = isExpanded ? "☰" : "✖";
}

