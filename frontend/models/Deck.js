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

  calculate(previousCarryOvers) {
    // construct grouped cards
    const groupedCards = {
      explosive: [],
      log: [],
      big_log: [],
      kindling: [],
      beaver: [],
      termites: [],
      carryover_termites: [],
      log_rescue: [],
      double_log_day: [],
      pest_repellant: [],
      swap: [],
    };
    previousCarryOvers.cards.forEach((card) => {
      if (card.type === "termites") {
        groupedCards.carryover_termites.push(card);
      } else {
        groupedCards[card.type].push(card);
      }
    });
    this.cards.forEach((card) => {
      groupedCards[card.type].push(card);
    });

    // Modify based on pest nullifer cards
    if (groupedCards.pest_repellant.length > 0) {
      groupedCards.beaver = [];
      groupedCards.termites = [];
    }

    groupedCards.explosive.forEach(() => {
      if (groupedCards.beaver.length > 0) {
        groupedCards.beaver.pop();
      } else if (groupedCards.termites.length > 0) {
        groupedCards.termites.pop();
      } else if (groupedCards.big_log.length > 0) {
        groupedCards.big_log.pop();
      } else if (groupedCards.log.length > 0) {
        groupedCards.log.pop();
      }
    });

    // Modify based on pest cards
    groupedCards.carryover_termites.forEach(() => {
      if (groupedCards.big_log.length > 0) {
        groupedCards.big_log.pop();
      } else if (groupedCards.log.length > 0) {
        groupedCards.log.pop();
      }
    });

    groupedCards.beaver.forEach(() => {
      if (groupedCards.big_log.length > 0) {
        groupedCards.big_log.pop();
      } else if (groupedCards.log.length > 0) {
        groupedCards.log.pop();
      }
    });

    // Calculate Remaining Logs
    const logMultiplier = 1 + (groupedCards.double_log_day.length > 0 ? 1 : 0);
    const logScore =
      logMultiplier * 2 * groupedCards.big_log.length +
      logMultiplier * groupedCards.log.length +
      (logMultiplier / 2) * groupedCards.kindling.length;

    const carryOverLogs = [];
    if (groupedCards.log_rescue.length > 0) {
      if (groupedCards.big_log.length > 0) {
        carryOverLogs.push(groupedCards.big_log[0]);
      } else if (groupedCards.log.length > 0) {
        carryOverLogs.push(groupedCards.log[0]);
      }
    }

    return {
      carryOvers: new Deck([...groupedCards.termites, ...carryOverLogs]),
      isSwap: groupedCards.swap.length > 0,
      isLost: logScore === 0,
    };
  }
}

export default Deck;
