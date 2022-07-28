import React from "react";
import { isEqual } from "lodash";

const ACTIVE_CLASS = "slider-single active";
const BEFORE_CLASS = "slider-single preactive";
const AFTER_CLASS = "slider-single proactive";
const PREACTIVE_DE_CLASS = "slider-single preactivede";
const PROACTIVE_DE_CLASS = "slider-single proactivede";

interface CarouselSlide {
  class: string;
  element: JSX.Element;
}

interface CarouselProps {
  rawSlides: JSX.Element[];
  interval: number;
}

interface CarouselState {
  slideTotal: number;
  slideCurrent: number;
  slides: CarouselSlide[];
}

export default class Carousel extends React.Component<CarouselProps, CarouselState> {
  private interval: number | null;

  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      slideTotal: 0,
      slideCurrent: -1,
      slides: [],
    };
    this.interval = null;
  }

  componentDidMount() {
    this.setState({
      slides: this.getSlides(),
      slideTotal: this.props.rawSlides.length - 1,
    });
    if (this.state.slideCurrent === -1) this.slide(1);
    this.setInterval();
  }

  componentDidUpdate(prevProps: CarouselProps) {
    if (
      !isEqual(
        prevProps.rawSlides.map((slide) => slide.key),
        this.props.rawSlides.map((slide) => slide.key)
      )
    ) {
      this.setState((prevState) => {
        return { ...prevState };
      });
    }
  }

  getSlides() {
    const slides: CarouselSlide[] = [];
    this.props.rawSlides.forEach((slide) => {
      const slideobject = {
        class: PROACTIVE_DE_CLASS,
        element: slide,
      };
      slides.push(slideobject);
    });
    return slides;
  }

  setCurrentSlide(index: number, total: number, direction: number) {
    index += direction;
    if (index > total) {
      index = 0;
    }
    if (index < 0) {
      index = total;
    }
    return index;
  }

  setClass(slide: CarouselSlide, classes: string[][]) {
    classes.forEach((cl) => {
      const [currentClass, newClass] = cl;
      if (slide.class.includes(currentClass)) {
        slide.class = newClass;
      }
    });
  }

  setSlideClasses(slides: CarouselSlide[], direction: -1 | 1) {
    const classes =
      direction === -1
        ? [
            ["proactivede", PREACTIVE_DE_CLASS],
            ["proactive", PROACTIVE_DE_CLASS],
          ]
        : [
            ["preactivede", PROACTIVE_DE_CLASS],
            ["preactive", PREACTIVE_DE_CLASS],
          ];
    slides.forEach((slide) => this.setClass(slide, classes));
  }

  setSingleSlide(slides: CarouselSlide[]) {
    if (slides[0] && slides[0].class !== ACTIVE_CLASS) {
      slides[0].class = ACTIVE_CLASS;
      this.setState({ slides, slideCurrent: 0 });
    }
  }

  setInterval() {
    this.interval = window.setTimeout(() => {
      this.slide(1);
    }, this.props.interval);
  }

  clearInterval() {
    if (this.interval) {
      clearTimeout(this.interval);
    }
  }

  slide(direction: -1 | 1) {
    const slideTotal = this.state.slideTotal;
    const newSlides = this.state.slides;
    if (slideTotal > 1) {
      let slideCurrent = this.state.slideCurrent;
      slideCurrent = this.setCurrentSlide(slideCurrent, slideTotal, direction);
      this.setSlideClasses(newSlides, direction);

      const preactiveSlide =
        slideCurrent > 0 ? newSlides[slideCurrent - 1] : newSlides[slideTotal];
      preactiveSlide.class = BEFORE_CLASS;
      const proactiveSlide =
        slideCurrent < slideTotal ? newSlides[slideCurrent + 1] : newSlides[0];
      proactiveSlide.class = AFTER_CLASS;
      const activeSlide = newSlides[slideCurrent];
      activeSlide.class = ACTIVE_CLASS;
      this.setState({ slides: newSlides, slideCurrent });
      this.clearInterval();
      this.setInterval();
    } else {
      this.setSingleSlide(newSlides);
    }
  }

  render() {
    return (
      <div className="react-3d-carousel">
        {this.state.slides && this.state.slides.length > 0 && (
          <div className="slider-container">
            <div className="slider-content">
              {this.state.slides.map((slider, index) => {
                return (
                  <div className={slider.class} key={index}>
                    <div className="slider-left" onClick={() => this.slide(-1)}>
                      <div>⬅️</div>
                    </div>
                    <div className="slider-right" onClick={() => this.slide(1)}>
                      <div>➡️</div>
                    </div>

                    <div className="slider-single-content">
                      {slider.element}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
