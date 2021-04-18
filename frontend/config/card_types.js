export default {
  explosive: {
    count: 8,
    key: "explosive",
    name: "Explosive Logs",
    description:
      "Cancels 1 Beaver or Termite played this round. If there are none, destroy 1 Log (destroying Big Logs first)! If there are multiple Beavers/Termites, players decide which gets exploded.",
    image: "/assets/explosive_log.png",
  },
  beaver: {
    count: 8,
    key: "beaver",
    name: "Beaver",
    description:
      " Look out! Unless canceled by an Explosive Log or Pest Repellent, a Beaver will eat 1 Log from the firepit, eating Big Logs first.",
    image: "/assets/beaver_attack.png",
  },
  termites: {
    count: 4,
    key: "termites",
    name: "Termites",
    description:
      "Unless cancelled by an Explosive Log or Pest Repellent (on this turn only), Termites will eat 1 log from the firepit on the next round, eating Big Logs first.",
    image: "/assets/termite_infestation.png",
  },
  log_rescue: {
    count: 4,
    key: "log_rescue",
    name: "Log Rescue",
    description:
      "If there is more than one Log or Big Log left over, rescue 1 of them and save it for the next round. If there are multiple, players decide which is rescued.",
    image: "/assets/log_rescue.png",
  },
  kindling: {
    count: 4,
    key: "kindling",
    name: "Kindling",
    description:
      "if at least 2 players play this card, you do not need any Logs to keep the campfire burning this round.",
    image: "/assets/kindling.png",
  },
  big_log: {
    count: 4,
    key: "big_log",
    name: "Big Log",
    description:
      "This log is so big, it counts as 2 logs! It is always destroyed first by Termites, Beavers, and Explosive Logs.",
    image: "/assets/big_log.png",
  },
  double_log_day: {
    count: 2,
    key: "double_log_day",
    name: "Double Log Day",
    description:
      "For this round: all Logs, Explosive Logs, Big Logs count double. Effect does not stack.",
    image: "/assets/double_log_day.png",
  },
  pest_repellant: {
    count: 2,
    key: "pest_repellant",
    name: "Pest Repellant",
    description:
      "All Beavers and Termites played this round are cancelled. (This does not cancel Termite effects played the previous round.)",
    image: "/assets/pest_repellent.png",
  },
  swap: {
    count: 4,
    key: "swap",
    name: "Swap!",
    description:
      "If the campers survive this round, all players choose 1 card, put it in a pile, shuffle it, and then everyone takes back a random card before the next round.",
    image: "/assets/swap.png",
  },
  log: {
    count: 20,
    key: "log",
    name: "Log",
    description: "You need these to survive the night!",
  },
};
