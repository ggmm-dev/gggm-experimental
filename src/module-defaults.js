const threeColData = {
  0: {
    content: "<h2>Headline</h2><p>Descriptive text for each box</p>",
    image: "https://source.unsplash.com/user/williamkarl"
  },
  1: {
    content: "<h2>Headline</h2><p>Descriptive text for each box</p>",
    image: "https://source.unsplash.com/user/timmossholder"
  },
  2: {
    content: "<h2>Headline</h2><p>Descriptive text for each box</p>",
    image: "https://source.unsplash.com/user/braydenlaw"
  }
};

export const TwoColDefault = {
    alignItems: "center",
    height: "400px", //container height
    left: "imageCover",
    leftAlt: "Alt Tag",
    leftContent: "https://source.unsplash.com/user/erondu",
    right: "imageCover",
    rightAlt: "Alt Tag",
    rightContent: "https://source.unsplash.com/user/druks",
    fullWidth: true,
    ratio: "half",
    overlay: true
  },
  HeroDefault = {
    type: "image", //video or image
    headline: "Headline",
    subheadline: "Subheadline",
    overlay: true, //disables darkened overlay
    buttonUrl: "/",
    height: "50", // represents percentage height
    buttonTitle: "Button",
    imageUrl: "https://source.unsplash.com/random" // src of image for background if type is image
  },
  ThreeColDefault = {
    fullWidth: false,
    textAlign: "center",
    type: "imageCover",
    imageHeight: "300px",
    text: true,
    data: threeColData
  },
  TextHeadlineDefault = {
    align: "center",
    margin: "auto",
    cat: "Cat",
    width: "500px",
    maxWidth: "400px",
    padding: "80px",
    subheadline:
      "Bacon ipsum dolor amet beef ribs drumstick swine cow brisket, flank pancetta spare ribs strip steak salami turkey ball tip ground round ham turducken.",
    headline: "Headline"
  };
