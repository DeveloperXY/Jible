import React from "react";

class ListItemCheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.item.isReady,
      item: props.item
    };
    this.handleChecked = this.handleChecked.bind(this);
  }

  handleChecked() {
    const newState = !this.state.isChecked;
    this.setState({ isChecked: newState });
    this.props.onItemReadinessChanged(this.state.item._id, newState);
  }

  render() {
    return (
      <input
        type="checkbox"
        checked={this.state.isChecked}
        onChange={this.handleChecked}
      />
    );
  }
}

export default ListItemCheckBox;
