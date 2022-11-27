const getDeck2 = () => {
    const deck = []
    const suits = ['hearts', 'spades', 'clubs', 'diamonds']
  
    for (let index = 0; index < suits.length; index++) {
      
      for (let j = 1; j <= 13; j++) {
  
        const displayVal = '';
  
        const card = {
          val: j,
          displayVal: displayVal,
          suit: suits[index],
        }
        
        switch (j) {
          case 1:
            card.displayVal = 'Ace'
            break
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
            card.displayVal = "" + j
            break
          case 11:
            card.displayVal = 'Jack'
            break
          case 12:
            card.displayVal = 'Queen'
            break
          case 13:
            card.displayVal = 'King'
            break
        }
  
        if (card.displayVal === 'Ace') {
          card.val = 11
        }
  
        deck.push(card)
      }
    }
    return deck;
  }

const blackjackDeck = getDeck2();

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
    let over21 = 0;
    let aceCount = 0;
    let totalCount = 0;
    hand.forEach((card) => {
        //checking if it is ACE
        //
        if((card.displayVal) === 'Ace'){
            aceCount++;
        }
        //checking if it is ACE and totalcount + 11 is less than 21
        //if greater than 21, then change ACE value to 1
        if(card.displayVal === 'Ace' && (totalCount + 11) > 21) {
            over21++;
            card.val = 1;
            totalCount += card.val;
        } else {
            totalCount += card.val;
        }
        
    })
    if(aceCount == over21 && aceCount > 0) {
        blackJackScore.isSoft = false;
    } 
    if(aceCount == 1) {
        blackJackScore.isSoft = true;
    }
    if (totalCount == 17 && aceCount == 1) {
        totalCount = 0;
        hand.forEach((card) => {
            if((card.displayVal) === 'Ace') {
                card.val = 1;
                totalCount += card.val;
            } else {
                totalCount += card.val;
            }
        })
    }
    blackJackScore.total = totalCount;
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
    let dealerStat = calcPoints(dealerHand);
    if (dealerStat.total <= 16) {
        return true;
    } else if (dealerStat.total == 17 && dealerStat.isSoft == true) {
        return true;
    } else {
        return false;
    }
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE
    if(playerScore > 21) {
        return `Dealer's score: ${dealerScore} & Player's score: ${playerScore}, dealer wins!`
    } else {
        return `Dealer's score: ${dealerScore} & Player's score: ${playerScore}, player wins!`
    }
    
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
 console.log(startGame());