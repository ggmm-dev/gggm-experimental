import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";

export default class SlugEditor extends Component {
  render() {
    const props = this.props;
    return (
      <div className="slug-editor">
        <p>localhost:3000/</p>
        <TextField
          className="textField"
          id="standard-name"
          placeholder=""
          value={props.pageTitle}
          onChange={this.props.handleChange("pageTitle")}
          margin="normal"
        />

        <div className="new-slug">
          <p onClick={props.newPage()}>New Page +</p>
        </div>
      </div>
    );
  }
}
