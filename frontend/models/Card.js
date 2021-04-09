class Card {
  constructor(card_type, key) {
    this.key = key;
    this.type = card_type.key;
    this.name = card_type.name;
    this.description = card_type.description;
  }
}

export default Card;
