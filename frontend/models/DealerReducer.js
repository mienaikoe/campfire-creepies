import CARD_TYPES from "../config/card_types";
import Card from "./Card";
import Deck from "./Deck";
import RULES from "../config/rules";

const startingReserve = [];
for (const card_key in CARD_TYPES) {
  const cardObj = CARD_TYPES[card_key];
  for (let ix = 0; ix < cardObj.count; ix++) {
    startingReserve.push(new Card(cardObj, `${card_key}${ix}`));
  }
}

const initialState = {
  table: new Deck([]),
  reserve: new Deck(startingReserve),
  carryOver: new Deck([]),
  players: [],
  settledPlayers: [],
  round: 0,
  isSwap: false,
  outcome: null,
};

function addPlayer(state, action) {
  const player = {
    name: action.name,
    role: "Camper",
    hand: state.reserve.createHand(RULES.CARDS_PER_PERSON),
  };
  state.players.push(player);
  return { ...state };
}

function assignPlayers(state) {
  const creepyNum = RULES.CREEPIES[state.players.length];
  for (let ix = 0; ix < creepyNum; ix++) {
    let ix = null;
    while (ix === null || state.players[ix].role === "Creepie") {
      ix = Math.floor(Math.random() * state.players.length);
    }
    state.players[ix].role = "Creepie";
  }
  return { ...state };
}

function pushTo(state, action, destination) {
  const playerIdx = state.players.indexOf(action.player);
  const hand = state.players[playerIdx].hand;
  action.cards.forEach((card) => {
    const cardIdx = hand.indexOf(card);
    const [discardedCard] = hand.splice(cardIdx, 1);
    destination.push(discardedCard);
  });
  destination.shuffle();
  state.settledPlayers.push(action.player);
  return { ...state };
}

function pullFrom(state, action, source) {
  const playerIdx = state.players.indexOf(action.player);
  const hand = state.players[playerIdx].hand;
  for (let ix = 0; ix < action.numCards; ix++) {
    hand.push(source.pop());
  }
  return { ...state };
}

function calculateTable(state) {
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
  state.carryOver.cards.forEach((card) => {
    if (card.type === "termites") {
      groupedCards.carryover_termites.push(card);
    } else {
      groupedCards[card.type].push(card);
    }
  });
  state.table.cards.forEach((card) => {
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

  const clearState = {
    carryOvers: new Deck([...groupedCards.termites, ...carryOverLogs]),
    isSwap: groupedCards.swap.length > 0,
    outcome: logScore === 0 ? "lost" : null,
  };

  return { ...state, ...clearState };
}

function clearTable(state) {
  state.reserve.concat(state.table.clear());
  const newRound = state.round + 1;
  if (newRound === 8) {
    return { ...state, outcome: "won" };
  } else {
    return { ...state, settledPlayers: [], round: newRound };
  }
}

function DealerReducer(state = initialState, action) {
  switch (action.type) {
    case "addPlayer":
      return addPlayer(state, action);
    case "assignPlayers":
      return assignPlayers(state);
    case "pushToReserve":
      return pushTo(state, action, state.reserve);
    case "pullFromReserve":
      return pullFrom(state, action, state.reserve);
    case "pushToTable":
      return pushTo(state, action, state.table);
    case "pullFromTable":
      return pullFrom(state, action, state.table);
    case "calculateTable":
      return calculateTable(state);
    case "clearTable":
      return clearTable(state);
    case "reset":
      return { ...initialState, reserve: initialState.reserve.shuffle() };
    default:
      return state;
  }
}

DealerReducer.initialState = initialState;
DealerReducer.methods = {
  addPlayer: (name) => ({ type: "addPlayer", name }),
  assignPlayers: () => ({ type: "assignPlayers" }),
  pushToReserve: (player, cards) => ({
    type: "pushToReserve",
    player,
    cards,
  }),
  pullFromReserve: (player, numCards) => ({
    type: "pullFromReserve",
    player,
    numCards,
  }),
  pushToTable: (player, cards) => ({
    type: "pushToTable",
    player,
    cards,
  }),
  pullFromTable: (player, numCards) => ({
    type: "pullFromTable",
    player,
    numCards,
  }),
  calculateTable: () => ({ type: "calculateTable" }),
  clearTable: () => ({
    type: "clearTable",
  }),
  reset: () => ({ type: "reset" }),
};

export default DealerReducer;
