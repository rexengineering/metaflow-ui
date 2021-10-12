import { query } from "@apollo/client";
import getDeploymentId from ".";
import { rexFlowActionTypes } from "../../actions";
import { error, getAvailableDeployments } from "../../mockResponses";
import { handleResponse } from "../../../utils/testThunks";

describe("getDeploymentId", () => {

  it("should handle a successful request", () => {
    query.mockReturnValueOnce(getAvailableDeployments);
    const expectedActionTypesAndPayloads = [{
      type: rexFlowActionTypes.SET_DEPLOYMENT_ID,
      payload: getAvailableDeployments.data.workflows.available[0],
    }];
    return handleResponse(getDeploymentId, expectedActionTypesAndPayloads);
  });

  it("handle an empty response", () => {
    query.mockReturnValueOnce(error);
    const expectedActionTypesAndPayloads = [{
      type: rexFlowActionTypes.SET_DEPLOYMENT_ID,
      payload: { deployments: [] },
    }];
    return handleResponse(getDeploymentId, expectedActionTypesAndPayloads);
  });

  it("handle an error response", () => {
    query.mockReturnValueOnce(error);
    const expectedActionTypesAndPayloads = [{
      type: rexFlowActionTypes.SET_DEPLOYMENT_ID,
      payload: { deployments: [] },
    }];
    return handleResponse(getDeploymentId, expectedActionTypesAndPayloads);
  });

  it("handle a failed request", () => {
    query.mockImplementationOnce(() => {
      throw new TypeError("Network error");
    });
    const expectedActionTypesAndPayloads = [{
      type: rexFlowActionTypes.SET_DEPLOYMENT_ID,
      payload: { deployments: [] },
    }];
    return handleResponse(getDeploymentId, expectedActionTypesAndPayloads);
  });
});
