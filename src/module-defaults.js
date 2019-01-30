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
  },
  grid = {
    0: {
      image: "https://source.unsplash.com/user/williamkarl",
      content: "Title",
      link: "https://google.com"
    },
    1: {
      image: "https://source.unsplash.com/user/timmossholder",
      content: "Title"
    },
    2: {
      image: "https://source.unsplash.com/user/braydenlaw",
      content: "Title"
    },
    3: {
      image: "https://source.unsplash.com/user/chuttersnap",
      content: "Title"
    }
  };

export const TwoColDefault = {
    alignItems: "center",
    padding: "0px",
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
    type: {
      value: "image",
      options: ["video", "image"],
      type: "select"
    },
    headline: {
      value: "Headline",
      type: "textarea"
    },
    padding: {
      type: "slider",
      value: "0px"
    },
    subheadline: {
      type: "textarea",
      value: "Subheadline"
    },
    overlay: {
      type: "checkbox",
      value: true
    },
    buttonUrl: {
      value: "/",
      type: "text"
    },
    buttonTitle: {
      value: "Button",
      type: "text"
    },
    height: {
      type: "slider",
      value: 70
    },
    imageUrl: {
      value: "https://source.unsplash.com/random",
      type: "image_picker"
    }
  },
  ThreeColDefault = {
    fullWidth: false,
    padding: "40px",
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
  },
  GridDefault = {
    data: grid,
    columns: "2",
    padding: "0px",
    gridGap: "0px",
    height: "400px",
    overlay: true,
    fullWidth: true,
    text: true
  },
  FullSliderDefault = {
    data: grid,
    dots: true,
    padding: "0px",
    infinite: true,
    speed: "500",
    slidesToShow: 1,
    slidesToScroll: 1,
    height: "600px"
  },
  MosaicDefault = {
    aData: grid[0],
    bData: grid[1],
    cData: grid[2],
    height: "700px",
    padding: "0px",
    overlay: true,
    gridPadding: "10px"
  };
