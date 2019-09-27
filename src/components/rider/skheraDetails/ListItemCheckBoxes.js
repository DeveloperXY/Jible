import React from "react";
import ListItemCheckBox from "./ListItemCheckBox";

class ListItemCheckBoxes extends React.Component {
  constructor(props) {
    super(props);
    let checkboxes = {};
    props.items.forEach((item, i) => {
      checkboxes[`checkbox${i}`] = {
        isChecked: item.isReady
      };
    });
    this.state = {
      checkboxes
    };
    this.onCheckBoxValueChanged = this.onCheckBoxValueChanged.bind(this);
  }

  onCheckBoxValueChanged(checkBoxId, itemId, newValue) {
    this.setState(
      {
        checkboxes: {
          ...this.state.checkboxes,
          [`checkbox${checkBoxId}`]: {
            isChecked: newValue
          }
        }
      },
      () => {
        this.props.handleItemReadinessChange(
          itemId,
          newValue,
          this.state.checkboxes
        );
      }
    );
  }

  render() {
    return (
      <>
        {this.props.items.map((item, index) => (
          <div className="skhera-items-checklist-item" key={index}>
            <ListItemCheckBox
              id={index}
              item={item}
              onItemReadinessChanged={this.onCheckBoxValueChanged}
            />
          </div>
        ))}
      </>
    );
  }
}

export default ListItemCheckBoxes;
