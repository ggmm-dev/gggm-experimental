import React, { Component } from "react";

import _ from "lodash";

import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modules from "./Modules";
import Sections from "./Sections";
import { fire } from "./firebase/firebase";
import {
  TwoColDefault,
  HeroDefault,
  ThreeColDefault,
  TextHeadlineDefault,
  GridDefault,
  FullSliderDefault,
  MosaicDefault
} from "./module-defaults";

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
  Fill = styled.div`
    width: 50%;
    height: 100vh;
  `,
  ModuleContainer = styled.div`
    width: 50%;
    background: linear-gradient(to bottom, #001b2f 0%, #01090e 100%);
    height: 100vh;
    position: fixed;
    z-index: 99;
  `;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: true,
      desktop: false,
      tablet: false,
      currentlyEditing: "",
      admin: true,
      edit: false,
      modules: true,
      hero: [],
      dragKey: 0,
      pageTitle: "Default",
      children: [],
      FullSlider: FullSliderDefault,
      Mosaic: MosaicDefault,
      Hero: HeroDefault,
      Grid: GridDefault,
      TwoCol: TwoColDefault,
      ThreeCol: ThreeColDefault,
      TextHeadline: TextHeadlineDefault
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

  breakpointChange = type => e => {
    if (type === "mobile") {
      this.setState({
        ...this.state,
        mobile: true,
        tablet: false,
        desktop: false
      });
    }
    if (type === "tablet") {
      this.setState({
        ...this.state,
        mobile: false,
        tablet: true,
        desktop: false
      });
    }
    if (type === "desktop") {
      this.setState({
        ...this.state,
        mobile: false,
        tablet: false,
        desktop: true
      });
    }
  };

  newSection = section => event => {
    const rand = new Date().valueOf();
    let length = 0;
    if (this.state.children) {
      const childLength = Object.keys(this.state.children).length - 1;
      length = childLength + 1;
    }

    this.setState({
      children: {
        ...this.state.children,
        [length]: {
          id: rand,
          pos: length,
          module: section,
          data: {
            ...this.state[section],
            id: rand
          }
        }
      }
    });
  };

  enableIcon = name => event => {
    this.setState({
      edit: true,
      modules: false,
      currentlyEditing: name
    });
  };

  deleteBlock = name => event => {
    const data = this.state.children,
      index = _.findIndex(data, { id: name });
    data.splice(index, 1);

    this.setState({
      children: data
    });
  };

  moveItem(arr, from, to) {
    let cutOut = arr.splice(from, 1)[0]; // cut the element at index 'from'
    arr.splice(to, 0, cutOut); // insert it at index 'to'

    this.setState({
      children: arr
    });
  }

  blockUp = name => event => {
    const data = this.state.children,
      index = _.findIndex(data, { id: name });

    if (index > 0) {
      this.moveItem(data, index, index - 1);
    }
  };

  blockDown = name => event => {
    const data = this.state.children,
      index = _.findIndex(data, { id: name }),
      length = Object.keys(data).length - 1;

    if (index < length) {
      this.moveItem(data, index, index + 1);
    }
  };

  componentDidMount() {
    const { location } = this.props,
      pageTitle = location.pathname.replace("/", "");

    fire
      .database()
      .ref("pages" + location.pathname + "/children")
      .once("value")
      .then(snapshot => {
        const data = snapshot.val();
        this.setState({
          pageTitle: pageTitle,
          children: data
        });
      });
  }

  saveModule = () => event => {
    const { location } = this.props;

    fire
      .database()
      .ref("pages" + location.pathname + "/children")
      .update({
        children: this.state.hero
      });
  };

  renderAdmin = () => {
    const blockId = this.state.currentlyEditing,
      fields = _.get(this.state.children, blockId);

    if (fields) {
      return _.map(fields.data, (value, key) => {
        return (
          <Admin key={key}>
            <TextField
              className="textField"
              id="standard-name"
              label={key}
              onChange={this.editSection(blockId, key, fields.module)}
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

  editSection = (blockId, key, moduleType) => e => {
    const blockId = this.state.currentlyEditing,
      fields = _.get(this.state.children, blockId);

    this.setState({
      children: {
        ...this.state.children,
        [blockId]: {
          module: moduleType,
          data: {
            ...fields.data,
            [key]: e.target.value
          }
        }
      }
    });
  };

  renderSections() {
    return (
      <Sections
        blockUp={this.blockUp}
        blockDown={this.blockDown}
        deleteBlock={this.deleteBlock}
        enableIcon={this.enableIcon}
        children={this.state.children}
      />
    );
  }

  renderWrapper() {
    if (this.state.desktop) {
      return (
        <div
          className="wrapper"
          style={{
            width: this.state.edit || this.state.modules ? "70%" : "100%"
          }}
        >
          {this.renderSections()}
        </div>
      );
    } else if (this.state.mobile) {
      return (
        <div
          className="wrapper"
          style={{
            width: this.state.edit || this.state.modules ? "355px" : "100%"
          }}
        >
          <div className="phone">
            <div className="top-nav">
              <div className="sound" />
              <div className="camera" />
            </div>
            {this.renderSections()}
          </div>
        </div>
      );
    }
  }

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
              placeholder={this.state.pageTitle}
              onChange={this.handleChange("pageTitle")}
              margin="normal"
            />

            <div className="icon-bar">
              <div
                style={{ marginRight: "60px", display: "block" }}
                className="breakpoints"
              >
                <i
                  onClick={this.breakpointChange("desktop")}
                  style={{ opacity: this.state.desktop ? "1" : ".6" }}
                  className="fas fa-desktop-alt"
                />
                <i
                  onClick={this.breakpointChange("tablet")}
                  style={{ opacity: this.state.tablet ? "1" : ".6" }}
                  className="fas fa-tablet-android-alt"
                />
                <i
                  onClick={this.breakpointChange("mobile")}
                  style={{ opacity: this.state.mobile ? "1" : ".6" }}
                  className="far fa-mobile"
                />
              </div>
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

        <Container
          style={{ background: this.state.mobile ? "#010a10" : "white" }}
        >
          <Fill
            style={{
              opacity: this.state.modules || this.state.edit ? "1" : "0",
              width: this.state.modules || this.state.edit ? "20%" : "0%",
              padding: this.state.modules || this.state.edit ? "5%" : "0%"
            }}
          />
          <ModuleContainer
            style={{
              opacity: this.state.modules ? "1" : "0",
              width: this.state.modules ? "20%" : "0%",
              padding: this.state.modules ? "5%" : "0%"
            }}
          >
            <i
              onClick={() => this.setState({ modules: false })}
              className="fal fa-times closer"
            />
            <Modules newSection={this.newSection} />
          </ModuleContainer>
          <Editor
            style={{
              background: "linear-gradient(to bottom, #00121f 0%,#01090e 100%)",
              height: "100vh",
              position: "fixed",
              opacity: this.state.edit ? "1" : "0",
              width: this.state.edit ? "20%" : "0%",
              padding: this.state.edit ? "5%" : "0%"
            }}
          >
            <i
              onClick={() => this.setState({ edit: false })}
              className="fal fa-times closer"
            />
            <h2>Edit Block</h2>

            {this.renderAdmin(this.state.hero)}
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
              onClick={this.saveModule()}
            >
              Save
            </Button>
          </Editor>
          {this.renderWrapper()}
        </Container>
      </div>
    );
  }
}

export default withRouter(App);
