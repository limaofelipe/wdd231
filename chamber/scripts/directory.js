const fetchMembers = async () => {
  const response = await fetch("scripts/members.json");
  const members = await response.json();
  return members;
};

document.addEventListener("DOMContentLoaded", () => {
  const viewOptions = document.querySelectorAll("#view-options>button");

  viewOptions.forEach(option => {
      option.addEventListener("click", event => handleViewOptions(event.target));
  });

  renderBusiness(business);

});

function handleViewOptions(target) {
  const business = document.querySelector("#business");

  if (target.id === "grid-view") {
      target.classList.toggle("active");
      document.getElementById("list-view").classList.toggle("active");
      business.classList = "grid";
  } else if (target.id === "list-view") {
      target.classList.toggle("active");
      document.getElementById("grid-view").classList.toggle("active");
      business.classList = "list";
  } else {
      while (target.nodeName !== "BUTTON") {
          target = target.parentNode;
      }
      
      handleViewOptions(target);
  }
}

function renderBusiness(business) {

  
  fetchMembers().then(members => {
      let businessElement = document.querySelector("#business");
      businessElement.innerHTML = "";

      members.forEach(member => {
          const companyElement = document.createElement("div");
          companyElement.classList.add("company");
          
          const img = document.createElement("img");
          img.src = member.image;
          img.alt = member.name + " logo";
          img.loading = "lazy";
          img.width = 200;
          img.height = 200;
          companyElement.appendChild(img);

          const h3 = document.createElement("h3");
          h3.textContent = member.name;
          companyElement.appendChild(h3);

          const address = document.createElement("p");
          address.classList.add("address");
          address.textContent = member.address;
          companyElement.appendChild(address);

          const phone = document.createElement("p");
          phone.classList.add("phone");
          phone.textContent = member.phone;
          companyElement.appendChild(phone);

          const website = document.createElement("button");
          website.href = member.website;
          website.target = "_blank"
          website.textContent = "Visit website";
          companyElement.appendChild(website);

          businessElement.appendChild(companyElement);
      });
  });
}