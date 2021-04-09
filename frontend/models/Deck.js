import CardCard from "../components/CardCard";

class Deck {
  constructor(cards) {
    this.cards = cards;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    return this;
  }

  clear() {
    const clearingCards = [...this.cards];
    this.cards = [];
    return clearingCards;
  }

  concat(cards) {
    this.cards = this.cards.concat(cards);
  }

  push(card) {
    return this.cards.push(card);
  }

  pop() {
    return this.cards.pop();
  }

  createHand(numCards) {
    return this.cards.splice(0, numCards);
  }
}

export default Deck;
