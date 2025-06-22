// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
const form = document.querySelector("form") ;
const input = document.querySelector("input") ;
const resultDisplay = document.querySelector(".result-display") ;
const loader = document.querySelector(".loader") ;
const errorMsg = document.querySelector(".error-msg") ;
form.addEventListener("submit", handleForm) ;
function handleForm(e){
  e.preventDefault() ;
  if(!input.value){
    errorMsg.textContent = "Wops , veuillez remplir ce champs" ;
    return;
  }else{
    errorMsg.textContent = "" ;
    loader.style.display = "flex" ;
    resultDisplay.innerHTML = "" ;
    CallApiWiki(input.value) ;
  }
}
async function CallApiWiki(value){
  try{
    // loader.style.display = "none" ;
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${value}`) ;
    const data = await response.json() ;
    loader.style.display = "none" ;
    CreateCard(data.query.search);
  }catch(e){
    errorMsg.textContent = "Wops , nous avons rencontré une erreur. Veuillez réessayer plus tard." ;
  }
}
function CreateCard(value) {
  if(!value.length){
    errorMsg.textContent = "Wops , aucun resultat." ;
    return ;
  }
    errorMsg.textContent = "" ;
    value.forEach(elem => {
      const url = `https://en.wikipedia.org/?curid=${elem.pageid}` ;
      const card = document.createElement('div') ;
      card.className = "result-item" ;
      card.innerHTML = 
      `
        <h3 class="result-title"><a href="${url}" target="_blank">${elem.title}</a></h3>
        <a class="result-link" href="${url}" target="_blank">${url}</a>
        <p class="result-snippet">${elem.snippet}</p>
      `
      resultDisplay.appendChild(card) ;
    });
}