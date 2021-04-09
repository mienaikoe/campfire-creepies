import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import DealerReducer from "./models/DealerReducer";
import Game from "./pages/Game";

const store = createStore(DealerReducer);

export default () => {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
};
