import React, { Component } from "react";

import { Hero, TwoCol } from "ggmm-react-lib";
import _ from "lodash";

class Sections extends Component {
  renderChildren() {
    const props = this.props;
    return _.map(_.reverse(props.children), child => {
      const module = child.data;
      if (child.module === "TwoCol") {
        return (
          <TwoCol
            enableIcon={this.props.enableIcon}
            editor={true}
            alignItems={module.alignItems}
            height={module.height} //container height
            left={module.left}
            leftAlt={module.leftAlt}
            leftContent={module.leftContent}
            right={module.right}
            rightAlt={module.rightAlt}
            rightContent={module.rightContent}
            fullWidth={module.fullWidth}
            ratio={module.ratio}
          />
        );
      } else if (child.module === "Hero") {
        return (
          <Hero
            enableIcon={this.props.enableIcon}
            editor={true}
            type={module.type} //video or image
            headline={module.headline}
            subheadline={module.subheadline}
            overlay={module.overlay} //disables darkened overlay
            buttonUrl={module.buttonUrl}
            height={module.height} // represents percentage height
            buttonTitle={module.buttonTitle}
            imageUrl={module.imageUrl} // src of image for background if type is image
          />
        );
      }
    });
  }
  render() {
    return <div className="sections">{this.renderChildren()}</div>;
  }
}

export default Sections;
