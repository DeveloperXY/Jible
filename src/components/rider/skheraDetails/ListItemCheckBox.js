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
    this.setState({ isChecked: !this.state.isChecked }, () => {
      this.props.onItemReadinessChanged(
        this.state.item._id,
        this.state.isChecked
      );
    });
  }

  render() {
    return (
      <>
        <div
          className={
            "list-item-name " +
            (this.state.isChecked ? "list-item-name-checked" : "")
          }
        >
          {this.state.item.name}
        </div>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.handleChecked}
        />
      </>
    );
  }
}

export default ListItemCheckBox;
