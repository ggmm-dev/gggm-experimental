import React, { Component } from "react";

import {
  Hero,
  TwoCol,
  TextHeadline,
  ThreeCol,
  Grid,
  FullSlider,
  Mosaic
} from "ggmm-react-lib";
import _ from "lodash";

class Sections extends Component {
  renderChildren() {
    if (this.props.children) {
      const props = this.props,
        children = props.children;
      return _.map(children, child => {
        const module = child.data;
        if (child.module === "TwoCol") {
          return (
            <TwoCol
              id={module.id}
              key={module.id}
              enableIcon={this.props.enableIcon}
              padding={module.padding}
              deleteBlock={this.props.deleteBlock}
              blockUp={this.props.blockUp}
              blockDown={this.props.blockDown}
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
              id={module.id}
              key={module.id}
              enableIcon={this.props.enableIcon}
              padding={module.padding.value}
              deleteBlock={this.props.deleteBlock}
              blockUp={this.props.blockUp}
              blockDown={this.props.blockDown}
              editor={true}
              type={module.type.value} //video or image
              headline={module.headline.value}
              subheadline={module.subheadline.value}
              overlay={module.overlay.value} //disables darkened overlay
              buttonUrl={module.buttonUrl.value}
              height={module.height.value} // represents percentage height
              buttonTitle={module.buttonTitle.value}
              imageUrl={module.imageUrl.value} // src of image for background if type is image
            />
          );
        } else if (child.module === "TextHeadline") {
          return (
            <TextHeadline
              id={module.id}
              key={module.id}
              editor={true}
              enableIcon={this.props.enableIcon}
              padding={module.padding}
              deleteBlock={this.props.deleteBlock}
              blockUp={this.props.blockUp}
              blockDown={this.props.blockDown}
              align={module.align}
              margin={module.margin}
              cat={module.cat}
              width={module.width}
              maxWidth={module.maxWidth}
              subheadline={module.subheadline}
              headline={module.headline}
            />
          );
        } else if (child.module === "ThreeCol") {
          return (
            <ThreeCol
              id={module.id}
              key={module.id}
              editor={true}
              enableIcon={this.props.enableIcon}
              padding={module.padding}
              deleteBlock={this.props.deleteBlock}
              blockUp={this.props.blockUp}
              blockDown={this.props.blockDown}
              fullWidth={module.fullWidth}
              textAlign={module.textAlign}
              type={module.type}
              imageHeight={module.imageHeight}
              text={module.text}
              data={module.data}
            />
          );
        } else if (child.module === "Grid") {
          return (
            <Grid
              id={module.id}
              key={module.id}
              editor={true}
              enableIcon={this.props.enableIcon}
              padding={module.padding}
              deleteBlock={this.props.deleteBlock}
              blockUp={this.props.blockUp}
              blockDown={this.props.blockDown}
              data={module.data}
              columns={module.columns}
              gridGap={module.gridGap}
              height={module.height}
              overlay={module.overlay}
              fullWidth={module.fullWidth}
              text={module.text}
            />
          );
        } else if (child.module === "FullSlider") {
          return (
            <FullSlider
              id={module.id}
              key={module.id}
              editor={true}
              enableIcon={this.props.enableIcon}
              padding={module.padding}
              deleteBlock={this.props.deleteBlock}
              blockUp={this.props.blockUp}
              blockDown={this.props.blockDown}
              data={module.data}
              dots={module.dots}
              infinite={module.infinite}
              speed={module.speed}
              slidesToShow={module.slidesToShow}
              slidesToScroll={module.slidesToScroll}
              height={module.height}
            />
          );
        } else if (child.module === "Mosaic") {
          return (
            <Mosaic
              id={module.id}
              key={module.id}
              editor={true}
              enableIcon={this.props.enableIcon}
              padding={module.padding}
              deleteBlock={this.props.deleteBlock}
              blockUp={this.props.blockUp}
              blockDown={this.props.blockDown}
              aData={module.aData}
              bData={module.bData}
              cData={module.cData}
              height={module.height}
              overlay={module.overlay}
              gridPadding={module.gridPadding}
            />
          );
        }
      });
    }
  }
  render() {
    return <div className="sections">{this.renderChildren()}</div>;
  }
}

export default Sections;
