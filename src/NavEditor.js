import React, { Component } from "react";

import _ from "lodash";

import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class NavEditor extends Component {
  createUI() {
    if (this.props.menuItem) {
      return this.props.menuItem.map((el, i) => (
        <div key={i}>
          <input
            placeholder="Menu Item Title"
            name="name"
            value={el.name || ""}
            onChange={this.props.handleMenuChange(i)}
          />
          <input
            placeholder="Link to"
            name="link"
            value={el.link || ""}
            onChange={this.props.handleMenuChange(i)}
          />
          <input
            type="button"
            value="remove"
            onClick={this.props.removeClick(i)}
          />
        </div>
      ));
    }
  }

  render() {
    return (
      <div>
        {this.createUI()}
        <input
          type="button"
          value="New Menu Item"
          onClick={this.props.addClick()}
        />
        <Button onClick={this.props.updateMenu()}>Save Menu</Button>
      </div>
    );
  }
}
