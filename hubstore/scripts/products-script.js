//CARDS on HOME PAGE
fetch('./scripts/products.json')
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById("cards-section");

    // Verificando a URL para saber qual página estamos
    const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname === '/';

    // Se estiver na home, mostra 6 produtos, senão mostra todos
    const productsToDisplay = isHomePage ? products.slice(0, 6) : products;

    // Renderizando os produtos apropriados
    productsToDisplay.forEach(product => {
      const item = document.createElement("div")
      item.classList.add("card");
      

      item.innerHTML = `
          <img src="${product.image}"/>
        <h3>${product.name}</h3>
        <p>USD ${product.price}</p>
        <p>${product.description}</p>
      `;
      container.appendChild(item);
    });
  })
  .catch(error => console.error('Error loading products:', error));