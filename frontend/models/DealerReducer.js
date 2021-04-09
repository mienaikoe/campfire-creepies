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
  isLost: false,
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
  const clearState = state.table.calculate(state.carryOver);
  return { ...state, ...clearState };
}

function clearTable(state) {
  state.reserve.concat(state.table.clear());
  return { ...state, settledPlayers: [], round: state.round + 1 };
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
