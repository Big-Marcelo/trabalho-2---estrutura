let cards = ['🍇', '🍇', '🍉', '🍉', '🍎', '🍎', '🍌', '🍌', '🍍', '🍍', '🍒', '🍒', '🍊', '🍊', '🍈', '🍈'];
let flippedCards = [];
let matchedCards = [];
let gameGrid = document.getElementById('game-grid');

// Função para embaralhar as cartas
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Função para reiniciar o jogo
function resetGame() {
  matchedCards = [];
  flippedCards = [];
  cards = shuffle(cards);
  renderGame();
}

// Função para lidar com o clique nas cartas
function handleCardClick(cardElement, index) {
  if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
    // Mostra a carta clicada
    showCard(cardElement, index);
    flippedCards.push(index);

    // Verifica se duas cartas estão viradas
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

// Função para mostrar a carta clicada
function showCard(cardElement, index) {
  cardElement.innerHTML = cards[index];
  cardElement.classList.add('clicked');
}

// Função para verificar se as cartas viradas combinam
function checkMatch() {
  let [index1, index2] = flippedCards;
  if (cards[index1] === cards[index2]) {
    // Cartas combinam
    matchedCards.push(index1, index2);
    flippedCards = [];
  } else {
    // Cartas não combinam
    hideCards(index1, index2);
  }

  // Verifica se o jogo foi concluído
  if (matchedCards.length === cards.length) {
    alert('Parabéns! Você ganhou!');
  }
}

// Função para esconder cartas que não combinam
function hideCards(index1, index2) {
  let card1 = gameGrid.children[index1];
  let card2 = gameGrid.children[index2];
  setTimeout(() => {
    card1.innerHTML = '';
    card2.innerHTML = '';
    card1.classList.remove('clicked');
    card2.classList.remove('clicked');
    flippedCards = [];
  }, 500);
}

// Função para renderizar o jogo na tela
function renderGame() {
  gameGrid.innerHTML = '';
  cards.forEach((card, index) => {
    let cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.addEventListener('click', () => handleCardClick(cardElement, index));
    gameGrid.appendChild(cardElement);
  });
}

// Inicializa o jogo embaralhando e renderizando as cartas
shuffle(cards);
renderGame();
