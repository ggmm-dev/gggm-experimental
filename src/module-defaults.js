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
      type: "select",
      mode: "style",
      label: "Background Type"
    },
    headline: {
      value: "Headline",
      type: "textarea",
      mode: "content",
      label: "Headline"
    },
    padding: {
      type: "slider",
      value: 0,
      mode: "style",
      label: "Container Padding"
    },
    subheadline: {
      type: "textarea",
      value: "Subheadline",
      mode: "content",
      label: "Subheadline"
    },
    overlay: {
      type: "switch",
      value: true,
      mode: "style",
      label: "Background Overlay"
    },
    buttonUrl: {
      value: "/",
      type: "text",
      mode: "content",
      label: "Button Url"
    },
    buttonTitle: {
      value: "Button",
      type: "text",
      mode: "content",
      label: "Button Title"
    },
    height: {
      type: "slider",
      value: 70,
      mode: "style",
      label: "Container Height"
    },
    imageUrl: {
      value: "https://source.unsplash.com/random",
      type: "image_picker",
      mode: "content",
      label: "Background Image"
    }
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
