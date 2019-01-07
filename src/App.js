import React, { Component } from "react";

import { Hero, TwoCol } from "ggmm-react-lib";
import _ from "lodash";

import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modules from "./Modules";
import Sections from "./Sections";
import { fire } from "./firebase/firebase";
import { TwoColDefault, HeroDefault } from "./module-defaults";

import { withRouter } from "react-router-dom";

const Admin = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  `,
  Edit = styled.div`
    position: fixed;
    background: rgb(1, 9, 14);
    width: 100%;
    top: 0;
    z-index: 10;
    height: 35px;
    .edit-container {
      width: 98%;
      margin: 0 auto;
    }
    i {
      color: #00eadb;
    }
    .icon-bar {
      display: flex;
      position: absolute;
      right: 10px;
      top: 10px;
      i {
        margin-right: 10px;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
  `,
  Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 35px;
  `,
  Editor = styled.div`
    width: 50%;
  `,
  ModuleContainer = styled.div`
    width: 50%;
    background: linear-gradient(to bottom, #001b2f 0%, #01090e 100%);
    height: 100vh;
  `;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: true,
      edit: false,
      modules: true,
      hero: [],
      dragKey: 0,
      pageTitle: "Default",
      children: [],
      Hero: HeroDefault
    };
  }

  saveConfig = config => event => {
    fire
      .database()
      .ref("pages/" + this.state.pageTitle)
      .update(
        {
          children: this.state.children
        },
        () => this.props.history.push("/" + this.state.pageTitle)
      );
  };

  newSection = section => event => {
    const rand = Math.floor(Math.random() * 100000000);

    this.setState({
      children: {
        ...this.state.children,
        [rand]: {
          module: section,
          data: this.state[section]
        }
      }
    });
  };

  componentDidMount() {
    const { router, params, location, routes } = this.props;

    fire
      .database()
      .ref("pages" + location.pathname + "/children")
      .once("value")
      .then(snapshot => {
        const data = snapshot.val();
        this.setState({
          children: data
        });
      });
  }

  saveModule = () => event => {
    const { router, params, location, routes } = this.props;

    fire
      .database()
      .ref("pages" + location.pathname + "/children")
      .update({
        children: this.state.hero
      });
  };

  renderAdmin = state => {
    if (this.state.admin) {
      return _.map(state, (value, key) => {
        return (
          <Admin key={key}>
            <TextField
              className="textField"
              id="standard-name"
              label={key}
              onChange={this.editSection(key)}
              margin="normal"
            />
          </Admin>
        );
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  editSection = name => e => {
    this.setState({
      hero: {
        ...this.state.hero,
        [name]: e.target.value
      }
    });
  };

  enableIcon = name => e => {
    this.setState({
      edit: !this.state.edit,
      modules: false
    });
  };

  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.1.0/css/all.css"
          integrity="sha384-87DrmpqHRiY8hPLIr7ByqhPIywuSsjuQAfMXAE0sMUpY3BM7nXjf+mLIUSvhDArs"
          crossOrigin="anonymous"
        />
        <Edit>
          <div className="edit-container">
            <TextField
              className="textField"
              id="standard-name"
              placeholder="Give it a name"
              onChange={this.handleChange("pageTitle")}
              margin="normal"
            />
            <div className="icon-bar">
              <i onClick={this.saveConfig()} className="far fa-save" />
              <i
                style={{
                  opacity: this.state.modules ? "1" : "0.6"
                }}
                className="far fa-vector-square"
                onClick={() =>
                  this.setState({
                    modules: !this.state.modules,
                    edit: false
                  })
                }
              />
            </div>
          </div>
        </Edit>

        <Container>
          <ModuleContainer
            style={{
              opacity: this.state.modules ? "1" : "0",
              width: this.state.modules ? "20%" : "0%",
              padding: this.state.modules ? "5%" : "0%"
            }}
          >
            <Modules newSection={this.newSection} />
          </ModuleContainer>
          <Editor
            style={{
              background: "linear-gradient(to bottom, #00121f 0%,#01090e 100%)",
              height: "100vh",
              opacity: this.state.edit ? "1" : "0",
              width: this.state.edit ? "20%" : "0%",
              padding: this.state.edit ? "5%" : "0%"
            }}
          >
            {this.renderAdmin(this.state.hero)}
            <Button
              style={{
                background: "#00EADB",
                color: "rgb(1, 9, 14)",
                width: "100%",
                borderRadius: "25px"
              }}
              variant="contained"
              color="primary"
              onClick={this.saveModule()}
            >
              Save
            </Button>
          </Editor>
          <div
            className="wrapper"
            style={{
              width: this.state.edit || this.state.modules ? "70%" : "100%"
            }}
          >
            <Sections
              enableIcon={this.enableIcon()}
              hero={this.state.hero}
              children={this.state.children}
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(App);
