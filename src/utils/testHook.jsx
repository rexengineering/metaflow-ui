import { render } from "@testing-library/react";
import React from "react";

function TestHook({ callback }) {
  callback();
  return null;
}

const testHook = (callback) => {
  render(<TestHook callback={callback} />);
};

export default testHook;
