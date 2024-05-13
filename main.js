function obrisiZadatak(event) {
  const zadatakElement = event.target.parentElement.parentElement;
  zadatakElement.remove();
}

function hendlajFavorita(event) {
  const favoritButton = event.target;
  const zadatakElement = favoritButton.parentElement.parentElement;
  const vrijemeParagraf = zadatakElement.querySelector("p.vrijeme")

  // #1 - klasa zadatka
  zadatakElement.classList.toggle("favorit");
  // promijenili smo stanje favorita tako da provjeru radimo nakon

const isFavorite = zadatakElement.classList.contains("favorit")
  // #2 ovisno o stanju favorita mijenjamo sadržaj gumba
  favoritButton.innerText = isFavorite
    ? "Ukloni iz favorita"
    : "Dodaj u favorite";

  if(isFavorite){
    vrijemeParagraf.innerHTML += "<i> - Favorit</i>"
  }else{
    vrijemeParagraf.querySelector("i").remove()
  }
}

const zadatci = Array.from(document.querySelectorAll(".zadatak"));

zadatci.forEach((zadatak) => {
  const isFavorite = zadatak.classList.contains("favorit");
  console.log({ zadatak, isFavorite });

  const favoritButton = zadatak.querySelector("button.favorit");
  favoritButton.onclick = hendlajFavorita;

  const deleteButton = zadatak.querySelector("button.obrisi");
  deleteButton.onclick = obrisiZadatak;
});
