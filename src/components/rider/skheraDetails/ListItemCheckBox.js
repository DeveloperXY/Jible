import React from "react";

class ListItemCheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.item.isReady,
      item: props.item
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.check = this.check.bind(this);
    this.uncheck = this.uncheck.bind(this);
    this.setNewPrice = this.setNewPrice.bind(this);
  }

  check() {
    this.setState({ isChecked: true });
  }

  uncheck() {
    this.setState({ isChecked: false });
  }

  setNewPrice(price) {
    this.setState({
      item: {
        ...this.state.item,
        price
      }
    });
  }

  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked }, () => {
      this.props.onItemReadinessChanged(
        this.props.id,
        this.state.item.name,
        this.state.item._id,
        this.state.isChecked,
        this.check,
        this.uncheck,
        this.setNewPrice
      );
    });
  }

  render() {
    const price = this.state.item.price;

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
        <div
          style={{ display: "flex", alignItems: "center", color: "#419d78" }}
        >
          <div>{price && `${price} dh`}</div>
          <input
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.handleChecked}
            disabled={this.state.isChecked}
          />
        </div>
      </>
    );
  }
}

export default ListItemCheckBox;
