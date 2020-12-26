// nodo dentro cui verranno create le carte
const board = document.querySelector('.board');

// in futuro saranno selezionabili dall'utente
let righe = 4;
let colonne = 4;
let livello = righe * colonne;
// aggiungo la classe tailwind per incolonnare le carte
board.classList.add(`grid-cols-${colonne}`);

// riempio l'array delle carte 
let cards = [];
for (let index = 1; index <= livello/2; index++) {
  cards.push(index);
  cards.push(index);
}

// function that randomly rearanges the items in an array  
const shuffle = arr => {
  const result = [];
  for (let i = arr.length-1; i >= 0; i--) {
    // picks an integer between 0 and i:
    const r = Math.floor(Math.random()*(i+1));
    // inserts the arr[i] element in the r-th free space in the shuffled array:
    for(let j = 0, k = 0; j <= arr.length-1; j++) {
      if(result[j] === undefined) {
        // if array contains objects, this doesn't clone them! Use a better clone function instead, if that is needed. 
        if(k === r) {
          result[j] = arr[i];
          break;
        }
        k++;
      }
    }
  }
  return result;
}

// mischio l'ordine nell'array
let shuffled = shuffle(cards);

// funzione che creo le carte e le appendo alla board
let ord = 1;
const creaCards = (n) => {
  
  let card = `
    <li data-ord='${ord}' data-num='${n}' class="card h-36 shadow rounded overflow-hidden">
      <div class="retro bg-green-300 p-4 text-green-400 h-full text-center">
        ?
      </div>
      <div class="fronte bg-white hidden p-3 h-full">
        <img src="img/fruits/${n}.png" class="h-full object-scale-down mx-auto">
      </div>
    </li>
    `;
  board.innerHTML += card;
  ord++;
}

// appendo le carte alla board
shuffled.forEach( el => creaCards(el));

// aggiungo il listener
board.addEventListener('click', flipCard);

let numClick = document.querySelector('.numClick');

let numeroClick = 0;
let girateNum = [];
let girateOrd = [];
let coppieTrovate = 0;


function flipCard(e) {
  
  // verifico che sia stato cliccato una card sul retro
  if (e.target.classList.contains('retro') && girateNum.length < 2) {
    // incremento il contatore carte girate
    numeroClick++;
    numClick.innerHTML = `numero di carte girate: ${numeroClick}`;
    
    let retro = e.target;
    // nascondo il retro della carta cliccata
    retro.classList.add('hidden');
    console.log(retro.parentElement.dataset.ord, retro.parentElement.dataset.num);
    // e mostro il fronte
    let fronte = retro.parentElement.children[1];
    fronte.classList.remove('hidden');
    // inserisco valore e posizione della carta neli due array
    girateNum.push(retro.parentElement.dataset.num);
    girateOrd.push(retro.parentElement.dataset.ord);

    if (girateNum.length === 2) {
      // setTimeout(confronta(e), 100);
      confronta(e);
    }
  }
};

let confronta = (girate) => {
  console.log(`confronto le due carte girate: ${girateNum[0]} e ${girateNum[1]}`);
  if (girateNum[0] === girateNum[1]) {
    console.log(girateNum);
    console.log('YEAH!');
    coppieTrovate++;
    if (coppieTrovate === (livello/2)) {
      console.log('Grandissimo! le hai trovate tutte!');
      alert('Grandissimo!');
      setTimeout( function () {
        location = location;
        }, 3000);
    }
  } else {
    console.log('non sono uguali');
    setTimeout( function() {
      unflipCard(girate);
    }, 1000);
  };
  setTimeout( () => {
    girateNum.length = 0;
    girateOrd.length = 0;
    console.log('azzerati i due array');
  }, 1050);
  
};

let unflipCard = (girate) => {
  // seleziono le due carte
  console.log(`carte da nasconder: ${girateOrd[0]} e ${girateOrd[1]}`);
  let carta1 = board.querySelector(`[data-ord="${girateOrd[0]}"]`);
  let carta2 = board.querySelector(`[data-ord="${girateOrd[1]}"]`);

  console.log(carta1.children[0], carta2.children[0]);
  console.log(carta1.children[1], carta2.children[1]);

  // nascondo il fronte delle due carte cliccate
  carta1.children[1].classList.add('hidden');
  carta2.children[1].classList.add('hidden');
  // e mostro il retro
  carta1.children[0].classList.remove('hidden');
  carta2.children[0].classList.remove('hidden');
}