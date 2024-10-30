
// OPEN AND CLOSE MENU MOBILE

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("#menu");

  menu.addEventListener("click", () => handleMenuClick());

});

function handleMenuClick() {
  const nav = document.querySelector("#navigation");

  const isExpanded = menu.getAttribute("aria-expanded") === "true";
  
  menu.setAttribute("aria-expanded", !isExpanded);
  
  nav.setAttribute("aria-hidden", isExpanded);

  nav.classList.toggle("expanded");
  nav.classList.toggle("collapsed");

  menu.textContent = isExpanded ? "☰" : "✖";
}


