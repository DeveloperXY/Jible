import { connect } from "react-refetch";
import { baseUrl } from "../../api/apiUtils";
import ClientSkheras from "../skheras/ClientSkheras";

const connectWithSkheras = connect(({ userId }) => ({
  skheras: `${baseUrl}/skheras?clientId=${userId}`
}));

const ListWithSkheras = connectWithSkheras(ClientSkheras);

export { ListWithSkheras };
