import React, { Component } from "react";

import styled from "styled-components";

export default class NavEditor extends Component {
  createUI() {
    if (this.props.menuItem) {
      return this.props.menuItem.map((el, i) => (
        <div key={i}>
          <div className="input-row">
            <input
              className="input-block"
              placeholder="Menu Item Title"
              name="name"
              value={el.name || ""}
              onChange={this.props.handleMenuChange(i)}
            />
            <input
              className="input-block"
              placeholder="Link to"
              name="link"
              value={el.link || ""}
              onChange={this.props.handleMenuChange(i)}
            />
            <input
              className="ui-icon"
              type="button"
              value="-"
              onClick={this.props.removeClick(i)}
            />
          </div>
        </div>
      ));
    }
  }

  render() {
    const Input = styled.input`
        cursor: pointer;
        margin: 20px 0;
        border: 1px solid gray;
        padding: 10px 20px;
        list-style-type: none;
        color: gray;
        background: transparent;
        font-size: 20px;
      `,
      Container = styled.div`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      `,
      Save = styled.div`
        cursor: pointer;
        display: flex;
        margin-left: 20px;
        text-transform: uppercase;
        color: gray;
        font-weight: bold;
        letter-spacing: 2px;
        align-items: center;
        opacity: 0.6;
        &:hover {
          opacity: 1;
        }
        i {
          margin-left: 10px;
          color: #00eadb;
        }
      `;
    return (
      <Container>
        {this.createUI()}
        <Input
          type="button"
          value="New Menu Item"
          onClick={this.props.addClick()}
        />
        <Save onClick={this.props.updateMenu()}>
          <p>Save Menu</p>
          <i className="far fa-save" />
        </Save>
      </Container>
    );
  }
}
