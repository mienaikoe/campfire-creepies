export default {
  explosive: {
    count: 8,
    name: "Explosive Logs",
    description:
      "Cancels 1 Beaver or Termite played this round. If there are none, destroy 1 Log (destroying Big Logs first)! If there are multiple Beavers/Termites, players decide which gets exploded.",
  },
  beaver: {
    count: 8,
    name: "Beaver",
    description:
      " Look out! Unless canceled by an Explosive Log or Pest Repellent, a Beaver will eat 1 Log from the firepit, eating Big Logs first.",
  },
  termites: {
    count: 4,
    name: "Termites",
    description:
      "Unless cancelled by an Explosive Log or Pest Repellent (on this turn only), Termites will eat 1 log from the firepit on the next round, eating Big Logs first.",
  },
  log_rescue: {
    count: 4,
    name: "Log Rescue",
    description:
      "If there is more than one Log or Big Log left over, rescue 1 of them and save it for the next round. If there are multiple, players decide which is rescued.",
  },
  kindling: {
    count: 4,
    name: "Kindling",
    description:
      "if at least 2 players play this card, you do not need any Logs to keep the campfire burning this round.",
  },
  big_log: {
    count: 4,
    name: "Big Log",
    description:
      "This log is so big, it counts as 2 logs! It is always destroyed first by Termites, Beavers, and Explosive Logs.",
  },
  double_log_day: {
    count: 2,
    name: "Double Log Day",
    description:
      "For this round: all Logs, Explosive Logs, Big Logs count double. Effect does not stack.",
  },
  pest_repellant: {
    count: 2,
    name: "Pest Repellant",
    description:
      "All Beavers and Termites played this round are cancelled. (This does not cancel Termite effects played the previous round.)",
  },
  swap: {
    count: 4,
    name: "Swap!",
    description:
      "If the campers survive this round, all players choose 1 card, put it in a pile, shuffle it, and then everyone takes back a random card before the next round.",
  },
  log: {
    count: 20,
    name: "Log",
    description: "You need these to survive the night!",
  },
};