import React, { Component } from "react";
import _ from "lodash";
import styled from "styled-components";
import { fire } from "./firebase/firebase";
import Draggable from "react-draggable"; // The default

class Task extends Component {
  constructor() {
    super();
    this.state = {
      modules: []
    };
  }

  componentDidMount() {
    fire
      .database()
      .ref("modules")
      .once("value")
      .then(snapshot => {
        const data = snapshot.val();
        this.setState({
          modules: data
        });
      });
  }

  renderList() {
    return _.map(this.state.modules, (module, i) => {
      return (
        <Draggable key={this.props.dragKey} onStop={this.props.newSection}>
          <li key={i}>{module}</li>
        </Draggable>
      );
    });
  }

  render() {
    const Module = styled.div`
      background: black;
      padding: 20px 0;
      display: flex;
      justify-content: center;
      li {
        margin-right: 30px;
        border: 1px solid gray;
        padding: 10px 20px;
        list-style-type: none;
        color: gray;
        font-size: 20px;
      }
    `;
    return <Module>{this.renderList()}</Module>;
  }
}

export default Task;
