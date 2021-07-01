import { apolloClient } from "../thunks";
import { setDeploymentId } from "../../actions/rexflow";
import { getAvailableDeployments } from "../../queries/rexflow";

const getDeploymentId = () => async (dispatch) => {
  try {
    const response = await apolloClient.query({
      query: getAvailableDeployments,
    });

    dispatch(
      setDeploymentId(
        response?.data?.workflows?.available?.[0]?.deployments || []
      )
    );
  } catch (e) {
    dispatch(setDeploymentId([]));
  }
};

export default getDeploymentId;
