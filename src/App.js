import React, { Component } from "react";

import { Hero } from "ggmm-react-lib";
import _ from "lodash";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

const Input = styled.input`
    width: 100%;
  `,
  Admin = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  `,
  Values = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 50%;
  `,
  Button = styled.div`
    background: #00eadb;
    color: rgb(1, 9, 14);
    text-align: center;
    padding: 7px;
    border-radius: 25px;
    margin-top: 50px;
    cursor: pointer;
    &:hover {
      filter: brightness(110%);
    }
  `,
  blue = "#00EADB",
  Edit = styled.div`
    position: fixed;
    background: rgb(1, 9, 14);
    width: 100%;
    top: 0;
    z-index: 10;
    height: 35px;

    i {
      width: 20px;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  `,
  Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 35px;
  `,
  Editor = styled.div`
    width: 50%;
  `;

class App extends Component {
  constructor() {
    super();
    this.state = {
      admin: true,
      edit: true,
      hero: {
        headline: "Headline",
        subheadline: "Subheadline",
        image: "https://source.unsplash.com/random",
        type: "image",
        overlay: true,
        buttonUrl: "/",
        height: "50",
        buttonTitle: "Start"
      }
    };
  }

  renderAdmin = state => {
    const length = Object.keys(state).length;
    if (this.state.admin) {
      return _.map(state, (value, key) => {
        return (
          <Admin>
            <TextField
              className="textField"
              id="standard-name"
              label={key}
              placeholder={value}
              onChange={this.editSection(key)}
              margin="normal"
            />
          </Admin>
        );
      });
    }
  };

  editSection = name => e => {
    this.setState({
      hero: {
        ...this.state.hero,
        [name]: e.target.value
      }
    });
  };

  render() {
    const hero = this.state.hero;
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.1.0/css/all.css"
          integrity="sha384-87DrmpqHRiY8hPLIr7ByqhPIywuSsjuQAfMXAE0sMUpY3BM7nXjf+mLIUSvhDArs"
          crossOrigin="anonymous"
        />
        <Edit>
          <i
            style={{ color: "#00EADB", opacity: this.state.edit ? "1" : "0.6" }}
            className="fas fa-bolt"
            onClick={() => this.setState({ edit: !this.state.edit })}
          />
        </Edit>
        <Container>
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
            <Button>Save</Button>
          </Editor>
          <div
            className="wrapper"
            style={{
              width: this.state.edit ? "70%" : "100%"
            }}
          >
            <Hero
              type={hero.type} //video or image
              headline={hero.headline}
              subheadline={hero.subheadline}
              overlay={hero.overlay} //disables darkened overlay
              buttonUrl={hero.buttonUrl}
              height={hero.height} // represents percentage height
              buttonTitle={hero.buttonTitle}
              imageUrl={hero.image}
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
