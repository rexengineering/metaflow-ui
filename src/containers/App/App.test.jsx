import React from "react";
import { render } from "@testing-library/react";
import App from "./App.decorator";
import getStore from "../../store";
import {Provider} from "react-redux";

const store = getStore({});

const renderApp = () => render(
    <Provider store={store}>
      <App keyValue="key1535" />
    </Provider>
);

describe("<App />", () => {

  it("should render", () => {
    const { asFragment } = renderApp();
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = renderApp();
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

});
