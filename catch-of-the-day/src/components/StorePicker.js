import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();

  handleSubmit = event => {
    event.preventDefault();
    const storeName = this.myInput.current.value;
    console.log(this);
    console.log(this.myInput);
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.handleSubmit}>
        <h2>Please Enter a Store</h2>
        <input
          type="text"
          ref={this.myInput}
          placeholder="Store Name"
          required
          defaultValue={getFunName()}
        />
        <button type="submit" onClick={this.handleEvent}>
          Visit Store ➡
        </button>
      </form>
    );
  }
}

export default StorePicker;
