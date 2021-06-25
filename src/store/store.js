import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

function getStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware(),
    preloadedState,
  });
}

const store = getStore({});

export default store;
