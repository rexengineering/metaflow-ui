import { apolloClient } from "../thunks";
import { setDeploymentId } from "../../actions";
import { getAvailableDeployments } from "../../queries";

const getDeploymentId = () => async (dispatch) => {
  try {
    const response = await apolloClient.query({
      query: getAvailableDeployments,
    });
    const receivedDeployments = response?.data?.workflows?.available;
    const availableDeployments = Array.isArray(receivedDeployments)
                                 ? receivedDeployments
                                 : [];
    const deployments = availableDeployments.map(({deployments}) => deployments[0] ?? "");
    dispatch( setDeploymentId(deployments));
  } catch (e) {
    dispatch(setDeploymentId([]));
  }
};

export default getDeploymentId;
