import React from "react";
import { render } from "@testing-library/react";
import { faComment } from "@fortawesome/pro-solid-svg-icons";
import fontAwesomePropType from "./fontAwesomePropType";

function TestComponent() {
  return null;
}

describe("fontAwesomePropType", () => {
  const consoleSpy = jest.spyOn(console, "error");

  beforeEach(() => {
    consoleSpy.mockClear();
  });

  it("should pass for an empty prop if not required", () => {
    TestComponent.propTypes = {
      myProp: fontAwesomePropType,
    };

    render(<TestComponent myProp={undefined} />);
    expect(consoleSpy).not.toBeCalled();
  });

  it("should fail for an invalid prop if not required", () => {
    TestComponent.propTypes = {
      myProp: fontAwesomePropType,
    };

    render(<TestComponent myProp="a bad type" />);
    expect(consoleSpy).toBeCalled();
  });

  it("should pass for a valid prop if not required", () => {
    TestComponent.propTypes = {
      myProp: fontAwesomePropType,
    };

    render(<TestComponent myProp={faComment} />);
    expect(consoleSpy).not.toBeCalled();
  });

  it("should fail for an empty prop if required", () => {
    TestComponent.propTypes = {
      myProp: fontAwesomePropType.isRequired,
    };

    render(<TestComponent myProp={undefined} />);
    expect(consoleSpy).toBeCalled();
  });

  it("should fail for an invalid prop if required", () => {
    TestComponent.propTypes = {
      myProp: fontAwesomePropType.isRequired,
    };

    render(<TestComponent myProp="a bad type" />);
    expect(consoleSpy).not.toBeCalled();
  });

  it("should pass for a valid prop if required", () => {
    TestComponent.propTypes = {
      myProp: fontAwesomePropType.isRequired,
    };

    render(<TestComponent myProp={faComment} />);
    expect(consoleSpy).not.toBeCalled();
  });
});
