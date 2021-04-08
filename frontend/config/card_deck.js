import CARD_TYPES from "./card_types";

const CARD_DECK = [];

for (const card_key in CARD_TYPES) {
  const cardObj = CARD_TYPES[card_key];
  for (let ix = 0; ix < cardObj.count; ix++) {
    CARD_DECK.push(cardObj);
  }
}

export default CARD_DECK;
