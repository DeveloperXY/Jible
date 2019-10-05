import React from "react";
import { fetchSkheras } from "../../api/skheraApi";
import { connect } from "react-redux";
import MySkheras from "./MySkheras";

class MySkherasContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skheras: []
    };
  }

  componentDidMount() {
    const { currentUser } = this.props;
    setInterval(() => {
      fetchSkheras(currentUser._id).then(skheras => this.setState({ skheras }));
    }, 5000);
  }

  render() {
    return <MySkheras skheras={this.state.skheras} />;
  }
}

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser
  };
};

export default connect(mapStateToProps)(MySkherasContainer);
