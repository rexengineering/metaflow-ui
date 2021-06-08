import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

function getStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware(),
    preloadedState,
  });
}

export default getStore;
