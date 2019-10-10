import { connect } from "react-refetch";
import { baseUrl } from "../../api/apiUtils";
import ClientSkheras from "../skheras/skheras-view";

const connectWithNotifications = connect(({ userId }) => ({
  skheras: {
    url: `${baseUrl}/clientNotifications?clientId=${userId}`
  }
}));

const ListWithSkheras = connectWithNotifications(ClientSkheras);

export { ListWithSkheras };
