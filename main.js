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
  const favoritButton = zadatak.querySelector("button.favorit");
  favoritButton.onclick = hendlajFavorita;

  const deleteButton = zadatak.querySelector("button.obrisi");
  deleteButton.onclick = obrisiZadatak;
});


// Napraviti funkciju za stvaranje zadatka
// 1. napraviti wrapper element zadatka [div.zadatak]
// 2. generirati trenutno vrijeme po formatu 01.12.2024. 09:34
// 3. popuniti element div.zadatak po templejtu
// 4. povezati event handelere na gumbe
// 5. vratiti finalni element
function stvoriZadatak(naziv,ocjena){
  const zadatakElement = document.createElement("div")
  zadatakElement.classList.add("zadatak")

  const datum = new Date().toLocaleDateString("hr-HR",{
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute:"2-digit",
  })

  zadatakElement.innerHTML = `<p class="naziv">${naziv} - <i>${ocjena}</i></p>
<p class="vrijeme">${datum}</p>
<div class="kontrole-zadatak">
  <button type="button" class="favorit">Dodaj u favorita</button>
  <button type="button" class="obrisi">Obriši</button>
</div>`
  const favoritButton = zadatakElement.querySelector("button.favorit");
  favoritButton.onclick = hendlajFavorita;

  const deleteButton = zadatakElement.querySelector("button.obrisi");
  deleteButton.onclick = obrisiZadatak;


  return zadatakElement
}


const zadatciKutija = document.querySelector("section.kutija")

// const testniZadatak = stvoriZadatak("DemoTest",21)
// zadatciKutija.append(testniZadatak)


// Povezati funkciju na formu koja će dodati novi zadatak
// 1. onemogućiti standardno ponašanje form onfinish eventa
// 2. prikupiti informacije iz forme
// 3. napraviti novi element zadatka sa tim podatcima
// 4. dodati ga među preostale zadatke
document.querySelector("form#main").onsubmit = (event) => {
  event.preventDefault()
  const naziv = event.target.naziv.value
  const ocjena = event.target.ocjena.value

  const noviZadatak = stvoriZadatak(naziv, ocjena)
  zadatciKutija.append(noviZadatak)

  event.target.reset()
}