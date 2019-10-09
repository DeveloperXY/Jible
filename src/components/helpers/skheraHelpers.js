import { connect } from "react-refetch";
import { baseUrl } from "../../api/apiUtils";
import ClientSkheras from "../skheras/skheras-view";

const connectWithSkheras = connect(({ userId }) => ({
  skheras: {
    url: `${baseUrl}/skheras?clientId=${userId}`,
    refreshInterval: 5000
  }
}));

const ListWithSkheras = connectWithSkheras(ClientSkheras);

export { ListWithSkheras };
