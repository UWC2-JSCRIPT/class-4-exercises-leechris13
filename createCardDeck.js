/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
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

// CHECKS
const deck = getDeck()
console.log(`Deck length equals 52? ${deck.length === 52}`)

const randomCard = deck[Math.floor(Math.random() * 52)]

const cardHasVal =
  randomCard && randomCard.val && typeof randomCard.val === 'number'
console.log(`Random card has val? ${cardHasVal}`)

const cardHasSuit =
  randomCard && randomCard.suit && typeof randomCard.suit === 'string'
console.log(`Random card has suit? ${cardHasSuit}`)

const cardHasDisplayVal =
  randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string'
console.log(`Random card has display value? ${cardHasDisplayVal}`)
