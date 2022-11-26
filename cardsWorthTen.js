const cards = [
  { val: 2, displayVal: "2", suit: "hearts" },
  { val: 3, displayVal: "3", suit: "hearts" },
  { val: 4, displayVal: "4", suit: "hearts" },
  { val: 5, displayVal: "5", suit: "hearts" },
  { val: 6, displayVal: "6", suit: "hearts" },
  { val: 7, displayVal: "7", suit: "hearts" },
  { val: 8, displayVal: "8", suit: "hearts" },
  { val: 9, displayVal: "9", suit: "hearts" },
  { val: 10, displayVal: "10", suit: "hearts" },
  { val: 10, displayVal: "Jack", suit: "hearts" },
  { val: 10, displayVal: "Queen", suit: "hearts" },
  { val: 10, displayVal: "King", suit: "hearts" },
  { val: 11, displayVal: "Ace", suit: "hearts" }
];
const animals = [
  { name: 'snake', kind: 'reptile' },
  { name: 'crocodiles', kind: 'reptile' },
  { name: 'panda', kind: 'mammal' },
  { name: 'dog', kind: 'mammal' },
  ];
/**
 * Takes an array of cards and returns a string of the card display
 * values where the value is equal to 10
 *
 * @param {array} cards
 * @return {string} displayVal
 */
const cardsWorthTen = cards => {
  let array1 = cards.filter((value) => value.val === 10);
  let array2 = array1.map(value2 => value2.displayVal);
  return array2.join(', ') 
};

console.log(cardsWorthTen(cards));
// should return/log "10, Jack, Queen, King"
