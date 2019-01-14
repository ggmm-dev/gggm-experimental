import React, { Component } from "react";

import styled from "styled-components";

export default class IconBar extends Component {
  render() {
    const props = this.props;
    return (
      <div className="icon-bar">
        <div
          style={{ marginRight: "60px", display: "block" }}
          className="breakpoints"
        >
          <i
            onClick={props.breakpointChange("desktop")}
            style={{ opacity: props.desktop ? "1" : ".6" }}
            className="fas fa-desktop-alt"
          />
          <i
            onClick={props.breakpointChange("tablet")}
            style={{ opacity: props.tablet ? "1" : ".6" }}
            className="fas fa-tablet-android-alt"
          />
          <i
            onClick={props.breakpointChange("mobile")}
            style={{ opacity: props.mobile ? "1" : ".6" }}
            className="far fa-mobile"
          />
        </div>
        <i onClick={props.openNav()} className="far fa-bars" />
        <i onClick={props.saveConfig()} className="far fa-save" />
        <i
          style={{
            opacity: props.modules ? "1" : "0.6"
          }}
          className="far fa-vector-square"
          onClick={props.openModule()}
        />
      </div>
    );
  }
}
