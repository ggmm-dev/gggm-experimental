import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const Editor = styled.div`
  width: 50%;
`;

export default class BlockEditor extends Component {
  renderMode = () => {
    const { contentMode, styleMode, selectMode } = this.props,
      Mode = styled.div`
        display: flex;
        margin-bottom: 30px;
        .content,
        .styles {
          background: #fbfbfb;
          cursor: pointer;
          padding: 30px 0;
          text-align: center;
          width: 50%;
          &:hover {
            background: white;
          }
          &:first-child {
            margin-right: 5px;
          }
        }
        .content {
          ${contentMode &&
            "background: #ececec; border-bottom: 3px solid rgb(0, 234, 219)"}
        }
        .styles {
          ${styleMode &&
            "background: #ececec; border-bottom: 3px solid rgb(0, 234, 219)"}
        }
      `;

    return (
      <Mode>
        <div className="content" onClick={selectMode("content")}>
          <i className="far fa-edit" />
          <p>Content</p>
        </div>
        <div className="styles" onClick={selectMode("style")}>
          <i className="far fa-palette" />
          <p>Style</p>
        </div>
      </Mode>
    );
  };

  render() {
    const props = this.props;
    return (
      <Editor
        style={{
          background: "#F4F5F7",
          height: "100vh",
          position: "fixed",
          opacity: props.edit ? "1" : "0",
          width: props.edit ? "20%" : "0%",
          padding: props.edit ? "5%" : "0%"
        }}
      >
        <i onClick={this.props.closeEditor()} className="fal fa-times closer" />
        {this.renderMode()}

        {this.props.renderBlockEditor(props.hero)}
        <Button
          style={{
            background: "#00EADB",
            color: "rgb(1, 9, 14)",
            width: "100%",
            borderRadius: "25px",
            marginTop: "30px"
          }}
          variant="contained"
          color="primary"
          onClick={this.props.saveModule()}
        >
          Save
        </Button>
      </Editor>
    );
  }
}
