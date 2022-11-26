// const getDeck = () => {
//     const deck = []
//     const suits = ['hearts', 'spades', 'clubs', 'diamonds']
  
//     for (let index = 0; index < suits.length; index++) {
      
//       for (let j = 1; j <= 13; j++) {
      
//         const displayVal = ''
  
//         switch (j) {
//           case j === 1:
//             displayVal = 'Ace'
//             break
//           case j > 1 && j <= 10:
//             displayVal = j
//             break
//           case j === 11:
//             displayVal = 'Jack'
//             break
//           case j === 12:
//             displayVal = 'Queen'
//             break
//           case j === 13:
//             displayVal = 'King'
//             break
//         }
  
//         const card = {
//           val: j,
//           displayVal: displayVal,
//           suit: suits[index],
//         }
  
//         if (displayVal === 'Ace') {
//           card.val = 11
//         }
  
//         deck.push(card)
//       }
//     }
//     return deck;
//   }

const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }
    drawCard() {
        const deckNum = Math.floor(Math.random() * (52));
        this.hand.push(blackjackDeck[deckNum])
    }
}; //TODO

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer'); // TODO
const player = new CardPlayer('Player'); // TODO

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  // CREATE FUNCTION HERE
    let blackJackScore = {total: 0, isSoft: false};
    let aceComp = 0;
    let aceCount = 0;
    let totalCount = 0;
    hand.forEach((card) => {
        //checking if it is ACE
        //
        if((card.displayVal) === 'Ace'){
            aceCount++;
            isSoft = true;
        }
        //checking if it is ACE and totalcount + 11 is less than 21
        //if greater than 21, then change ACE value to 1
        if(card.displayVal === 'Ace' && (totalCount + 11) < 21) {
            aceComp++;
            card.val = 1;
            totalCount += card.val;
        } else {
            totalCount += card.val;
        }
        if(aceCount == aceComp && aceCount > 0) {
            isSoft = false;
        } 
    })
    total = totalCount;
    return blackJackScore;
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
    let dealerPoints = calcPoints(dealerHand);
    
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE

}

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
// console.log(startGame());