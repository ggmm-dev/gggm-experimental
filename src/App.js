import React, { Component } from "react";
import logo from "./logo.svg";
import _ from "lodash";

import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/lab/Slider";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Modules from "./Modules";
import Typography from "@material-ui/core/Typography";
import NavEditor from "./NavEditor";
import SlugEditor from "./SlugEditor";
import BlockEditor from "./BlockEditor";
import IconBar from "./IconBar";
import Sections from "./Sections";
import { NavBar } from "ggmm-react-lib";
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
    .module-slider {
      margin: 20px 0;
    }
  `,
  Edit = styled.div`
    position: fixed;
    background: rgb(1, 9, 14);
    width: 100%;
    top: 0;
    z-index: 10;
    padding: 10px 0;
    .edit-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 98%;
      margin: 0 auto;
    }
    i {
      color: #00eadb;
    }

    .icon-bar {
      display: flex;
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

    margin-top: 53px;
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
    background: #f4f5f7;
    height: 100vh;
    position: fixed;
    z-index: 99;
  `;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      progress: 0,
      mobile: false,
      desktop: true,
      tablet: false,
      contentMode: true,
      styleMode: false,
      header: [],
      menuItem: [{ name: "", link: "" }],
      navType: "left",
      currentlyEditing: "",
      admin: true,
      openNav: false,
      edit: true,
      modules: false,
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

  closeEditor = () => e => {
    this.setState({
      edit: false
    });
  };

  handleUploadSuccess = (ce, key) => filename => {
    const prevChildren = [...this.state.children],
      d = this.state.children,
      index = _.findIndex(d, { id: ce });

    this.setState({ avatar: filename, progress: 100, isUploading: false });
    fire
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        prevChildren[index].data.imageUrl.value = url;
        this.setState({
          prevChildren
        });
      });
  };

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

  openNav = name => event => {
    this.setState({
      openNav: !this.state.openNav,
      modules: false,
      edit: false
    });
  };

  openModule = name => event => {
    this.setState({
      modules: !this.state.modules,
      edit: false,
      openNav: false
    });
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

  newPage = () => e => {
    this.props.history.push("/");
    this.setState({
      children: [],
      pageTitle: ""
    });
  };

  newSection = section => event => {
    const rand = new Date().valueOf(),
      { children } = this.state;
    let length = 0;
    if (children) {
      const childLength = Object.keys(children).length - 1;
      length = childLength + 1;
    }

    const newData = {
      id: rand,
      pos: length,
      module: section,
      data: {
        ...this.state[section],
        id: rand
      }
    };

    this.setState({
      children: [...this.state.children, newData]
    });
  };

  enableIcon = name => event => {
    this.setState({
      edit: true,
      modules: false,
      openNav: false,
      currentlyEditing: name
    });
  };

  deleteBlock = name => event => {
    const data = this.state.children,
      index = _.findIndex(data, { id: name });
    data.splice(index, 1);

    this.setState({
      children: data,
      currentlyEditing: "",
      edit: false,
      modules: true
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

    this.refs.container.style.opacity = 1;

    fire
      .database()
      .ref("pages" + location.pathname + "/children")
      .once("value")
      .then(snapshot => {
        const data = snapshot.val();

        if (data) {
          this.setState({
            pageTitle: pageTitle,
            children: data
          });
        }
      });

    fire
      .database()
      .ref("menus/header")
      .once("value")
      .then(snapshot => {
        const data = snapshot.val();

        this.setState({
          menuItem: data
        });
      });
  }

  //Menu Stuff

  addClick = () => e => {
    this.setState(prevState => ({
      menuItem: [...prevState.menuItem, { name: "", link: "" }]
    }));
  };

  handleMenuChange = i => e => {
    const { name, value } = e.target;
    let menuItem = [...this.state.menuItem];
    menuItem[i] = { ...menuItem[i], [name]: value };
    this.setState({ menuItem });
  };

  removeClick = i => e => {
    let menuItem = [...this.state.menuItem];
    menuItem.splice(i, 1);
    this.setState({ menuItem });
  };

  updateMenu = () => e => {
    fire
      .database()
      .ref("menus")
      .update({
        header: this.state.menuItem
      });
  };

  //end menu stuff

  saveModule = () => event => {
    const { location } = this.props;

    fire
      .database()
      .ref("pages" + location.pathname + "/children")
      .update({
        children: this.state.hero
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  selectMode = mode => e => {
    if (mode === "content") {
      this.setState({ contentMode: true, styleMode: false });
    } else if (mode === "style") {
      this.setState({ contentMode: false, styleMode: true });
    }
  };

  renderBlockEditor = () => {
    const { currentlyEditing, children } = this.state;
    if (children && currentlyEditing) {
      const index = children,
        fields = _.findIndex(index, { id: currentlyEditing }),
        fieldData = index[fields];

      return _.map(fieldData.data, (value, key) => {
        if (this.state.contentMode && value.mode === "content") {
          if (value.type === "image_picker") {
            return (
              <CustomUploadButton
                className="image-btn"
                accept="image/*"
                storageRef={fire.storage().ref("images")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess(currentlyEditing)}
                onProgress={this.handleProgress}
              >
                Add Image
              </CustomUploadButton>
            );
          }
          if (value.type === "text") {
            return (
              <Admin key={key}>
                <TextField
                  className="textField"
                  value={value.value}
                  id="standard-name"
                  label={value.label}
                  onChange={this.editSection(
                    currentlyEditing,
                    fields,
                    key,
                    fieldData.module,
                    fieldData
                  )}
                  margin="normal"
                />
              </Admin>
            );
          } else if (value.type === "textarea") {
            return (
              <Admin key={key}>
                <TextField
                  value={value.value}
                  id="standard-multiline-flexible"
                  multiline
                  rowsMax="4"
                  label={value.label}
                  onChange={this.editSection(
                    currentlyEditing,
                    fields,
                    key,
                    fieldData.module,
                    fieldData
                  )}
                  margin="normal"
                />
              </Admin>
            );
          } else if (value.type === "slider") {
            return (
              <Admin key={key}>
                <Slider
                  className="module-slider"
                  value={value.value}
                  aria-labelledby="label"
                  min={10}
                  max={100}
                  step={2}
                  onChange={this.editToggle(
                    currentlyEditing,
                    fields,
                    key,
                    fieldData.module,
                    fieldData
                  )}
                />
              </Admin>
            );
          }
        } else if (this.state.styleMode && value.mode === "style") {
          if (value.type === "text") {
            return (
              <Admin key={key}>
                <TextField
                  value={value.value}
                  className="textField"
                  id="standard-name"
                  label={value.label}
                  onChange={this.editSection(
                    currentlyEditing,
                    fields,
                    key,
                    fieldData.module,
                    fieldData
                  )}
                  margin="normal"
                />
              </Admin>
            );
          } else if (value.type === "select") {
            return (
              <Admin key={key}>
                <FormControl className="form-select-control">
                  <InputLabel htmlFor={value.label}>{value.label}</InputLabel>
                  <Select
                    value={value.value}
                    onChange={this.editSection(
                      currentlyEditing,
                      fields,
                      key,
                      fieldData.module,
                      fieldData
                    )}
                  >
                    {_.map(value.options, options => {
                      return <MenuItem value={options}>{options}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Admin>
            );
          } else if (value.type === "switch") {
            return (
              <Admin key={key}>
                <Typography id="label">{value.label}</Typography>
                <Switch
                  checked={value.value}
                  onChange={this.editToggle(
                    currentlyEditing,
                    fields,
                    key,
                    fieldData.module,
                    fieldData
                  )}
                />
              </Admin>
            );
          } else if (value.type === "textarea") {
            return (
              <Admin key={key}>
                <TextField
                  value={value.value}
                  id="standard-multiline-flexible"
                  multiline
                  rowsMax="4"
                  label={value.label}
                  onChange={this.editSection(
                    currentlyEditing,
                    fields,
                    key,
                    fieldData.module,
                    fieldData
                  )}
                  margin="normal"
                />
              </Admin>
            );
          } else if (value.type === "slider") {
            return (
              <Admin key={key}>
                <Typography id="label">
                  {value.label} ({value.value}%)
                </Typography>
                <Slider
                  className="module-slider"
                  value={value.value}
                  aria-labelledby="label"
                  min={10}
                  max={100}
                  step={2}
                  onChange={this.editToggle(
                    currentlyEditing,
                    fields,
                    key,
                    fieldData.module,
                    fieldData
                  )}
                />
              </Admin>
            );
          }
        }
      });
    }
  };

  editToggle = (blockId, blockIndex, key, moduleType, newData) => (e, val) => {
    const prevChildren = [...this.state.children];
    prevChildren[blockIndex].data[key].value = val;

    this.setState({
      prevChildren
    });
  };

  editSection = (blockId, blockIndex, key, moduleType, newData) => e => {
    const prevChildren = [...this.state.children];
    prevChildren[blockIndex].data[key].value = e.target.value;

    this.setState({
      prevChildren
    });
  };

  renderMenu = (type, location) => {
    if (type === "left") {
      return (
        <NavBar
          backgroundColor="whitesmoke"
          type="left"
          logo={logo}
          navColor="gray"
          logoWidth="50px"
          iconColor="gray"
          padding="10px"
          nav={this.state.menuItem}
          social={this.state.social}
        />
      );
    }
  };

  renderSections() {
    return (
      <div>
        {this.renderMenu(this.state.navType, "header")}
        <Sections
          blockUp={this.blockUp}
          blockDown={this.blockDown}
          deleteBlock={this.deleteBlock}
          enableIcon={this.enableIcon}
          children={this.state.children}
        />
      </div>
    );
  }

  renderWrapper() {
    const state = this.state;
    if (this.state.desktop) {
      return (
        <div
          className="wrapper"
          style={{
            width: state.edit || state.modules || state.openNav ? "70%" : "100%"
          }}
        >
          {this.renderSections()}
        </div>
      );
    } else if (state.mobile) {
      return (
        <div
          className="wrapper"
          style={{
            width:
              state.edit || state.modules || state.openNav ? "355px" : "100%"
          }}
        >
          <div className="phone">{this.renderSections()}</div>
        </div>
      );
    } else if (state.tablet) {
      return (
        <div
          className="wrapper"
          style={{
            width:
              state.edit || state.modules || state.openNav ? "355px" : "100%"
          }}
        >
          <div className="tablet">{this.renderSections()}</div>
        </div>
      );
    }
  }

  renderNavEditor() {
    const state = this.state;
    if (this.state.openNav) {
      return (
        <ModuleContainer
          style={{
            opacity: state.openNav ? "1" : "0",
            width: state.openNav ? "20%" : "0%",
            padding: state.openNav ? "5%" : "0%"
          }}
        >
          <NavEditor
            handleMenuChange={this.handleMenuChange}
            addClick={this.addClick}
            menuItem={state.menuItem}
            removeClick={this.removeClick}
            updateMenu={this.updateMenu}
          />
        </ModuleContainer>
      );
    }
  }

  renderModules() {
    const state = this.state;
    if (state.modules) {
      return (
        <ModuleContainer
          style={{
            opacity: state.modules ? "1" : "0",
            width: state.modules ? "20%" : "0%",
            padding: state.modules ? "5%" : "0%"
          }}
        >
          <i
            onClick={() => this.setState({ modules: false })}
            className="fal fa-times closer"
          />
          <Modules newSection={this.newSection} />
        </ModuleContainer>
      );
    }
  }

  render() {
    const state = this.state;
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
            <SlugEditor
              newPage={this.newPage}
              handleChange={this.handleChange}
              pageTitle={state.pageTitle}
            />

            <IconBar
              ref="a"
              breakpointChange={this.breakpointChange}
              tablet={state.tablet}
              mobile={state.mobilel}
              desktop={state.desktop}
              modules={state.modules}
              openModule={this.openModule}
              openNav={this.openNav}
              saveConfig={this.saveConfig}
            />
          </div>
        </Edit>

        <Container
          ref="container"
          style={{
            opacity: "0",
            transition: "900ms opacity ease-in-out",
            background: state.mobile || state.tablet ? "#010a10" : "white"
          }}
        >
          <Fill
            style={{
              opacity: state.modules || state.edit || state.openNav ? "1" : "0",
              width:
                state.modules || state.edit || state.openNav ? "20%" : "0%",
              padding:
                state.modules || state.edit || state.openNav ? "5%" : "0%"
            }}
          />
          {this.renderNavEditor()}
          {this.renderModules()}
          <BlockEditor
            selectMode={this.selectMode}
            contentMode={state.contentMode}
            styleMode={state.styleMode}
            edit={state.edit}
            hero={state.hero}
            closeEditor={this.closeEditor}
            renderBlockEditor={this.renderBlockEditor}
            saveModule={this.saveModule}
          />
          {this.renderWrapper()}
        </Container>
      </div>
    );
  }
}

export default withRouter(App);
