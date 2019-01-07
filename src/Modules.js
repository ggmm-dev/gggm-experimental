import React, { Component } from "react";

import _ from "lodash";
import styled from "styled-components";
import { fire } from "./firebase/firebase";

const Module = styled.div`
    display: flex;
    li {
      margin-right: 30px;
      margin-bottom: 30px;
      border: 1px solid gray;
      padding: 10px 20px;
      list-style-type: none;
      color: gray;
      font-size: 20px;
    }
  `,
  Container = styled.div`
    width: 100%;
  `;

export default class Modules extends Component {
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

  renderModules() {
    return _.map(this.state.modules, (module, i) => {
      return (
        <Module key={i}>
          <li onClick={this.props.newSection(module)}>
            {module}
            <span style={{ color: "#00EADB", paddingLeft: "10px" }}>+</span>
          </li>
        </Module>
      );
    });
  }
  render() {
    return (
      <Container>
        <h2>Add Block</h2>
        {this.renderModules()}
      </Container>
    );
  }
}
