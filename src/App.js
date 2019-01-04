import React, { Component } from "react";

import { Hero } from "ggmm-react-lib";
import _ from "lodash";

class App extends Component {
  constructor() {
    super();
    this.state = {
      admin: true,
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
    if (this.state.admin) {
      return _.map(state, val => {
        console.log(Object.keys(val));
      });
    }
  };
  render() {
    const hero = this.state.hero;
    return (
      <div className="App">
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
        {this.renderAdmin(this.state.hero)}
      </div>
    );
  }
}

export default App;
