// public/js/cardapio.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/lanches")
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById("cardapio");
      data.forEach(lanche => {
        const item = document.createElement("div");
        item.classList.add("lanche");
        item.innerHTML = `
          <h2>${lanche.nome}</h2>
          <p>${lanche.ingredientes}</p>
        `;
        lista.appendChild(item);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar o cardápio:", err);
    });
});
