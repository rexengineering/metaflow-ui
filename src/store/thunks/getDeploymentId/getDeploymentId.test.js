import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { query } from "@apollo/client";
import getDeploymentId from ".";
import { rexFlowActionTypes } from "../../actions";
import { error, getAvailableDeployments } from "../../mockResponses";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("getDeploymentId", () => {
  it("should handle a successful request", () => {
    query.mockReturnValueOnce(getAvailableDeployments);
    const store = mockStore({});
    const expectedActionTypes = [rexFlowActionTypes.SET_DEPLOYMENT_ID];

    return store.dispatch(getDeploymentId()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(1);

      actions.forEach((action) => {
        expect(expectedActionTypes).toContain(action.type);
        expect(action.payload).toEqual(
          getAvailableDeployments.data.workflows.available[0]
        );
      });
    });
  });

  it("handle an empty response", () => {
    query.mockReturnValueOnce(error);
    const store = mockStore({});
    const expectedActionTypes = [rexFlowActionTypes.SET_DEPLOYMENT_ID];

    return store.dispatch(getDeploymentId()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(1);

      actions.forEach((action) => {
        expect(expectedActionTypes).toContain(action.type);
        expect(action.payload).toEqual({ deployments: [] });
      });
    });
  });

  it("handle an error response", () => {
    query.mockReturnValueOnce(error);
    const store = mockStore({});
    const expectedActionTypes = [rexFlowActionTypes.SET_DEPLOYMENT_ID];

    return store.dispatch(getDeploymentId()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(1);

      actions.forEach((action) => {
        expect(expectedActionTypes).toContain(action.type);
        expect(action.payload).toEqual({ deployments: [] });
      });
    });
  });

  it("handle a failed request", () => {
    query.mockImplementationOnce(() => {
      throw new TypeError("Network error");
    });
    const store = mockStore({});
    const expectedActionTypes = [rexFlowActionTypes.SET_DEPLOYMENT_ID];

    return store.dispatch(getDeploymentId()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(1);

      actions.forEach((action) => {
        expect(expectedActionTypes).toContain(action.type);
        expect(action.payload).toEqual({ deployments: [] });
      });
    });
  });
});
