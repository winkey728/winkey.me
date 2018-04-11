import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TweenFunctions from "tween-functions";
import detectPassiveEvents from "detect-passive-events";

const Wrapper = styled.div`
  position: relative;
  right: ${props => (props.show ? 0 : -100)}px;
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? "visible" : "hidden")};
  transition-duration: ${props => props.css.transitionDuration};
  transition-timing-function: ${props => props.css.transitionTimingFunction};
  transition-delay: ${props => props.css.transitionDelay};
  transition-property: ${props => props.css.transitionProperty};
`;

export default class ScrollUp extends React.Component {
  state = { show: false };

  data = {
    startValue: 0,
    currentTime: 0, // store current time of animation
    startTime: null,
    rafId: null
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.show !== this.state.show;
  }

  componentDidMount() {
    this.handleScroll(); // initialize state

    // Add all listeners which can start scroll
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener(
      "wheel",
      this.stopScrolling,
      detectPassiveEvents.hasSupport ? { passive: true } : false
    );
    window.addEventListener(
      "touchstart",
      this.stopScrolling,
      detectPassiveEvents.hasSupport ? { passive: true } : false
    );
  }

  componentWillUnmount() {
    // Remove all listeners which was registered
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("wheel", this.stopScrolling, false);
    window.removeEventListener("touchstart", this.stopScrolling, false);
  }

  /**
   * Evaluate show/hide this component, depend on new position
   */
  handleScroll = () => {
    if (window.pageYOffset > this.props.showUnder) {
      if (!this.state.show) {
        this.setState({ show: true });
      }
    } else {
      if (this.state.show) {
        this.setState({ show: false });
      }
    }
  };

  /**
   * Handle click on the button
   */
  handleClick = () => {
    this.stopScrolling();
    this.data.startValue = window.pageYOffset;
    this.data.currentTime = 0;
    this.data.startTime = null;
    this.data.rafId = window.requestAnimationFrame(this.scrollStep);
  };

  /**
   * Calculate new position
   * and scroll screen to new position or stop scrolling
   * @param timestamp
   */
  scrollStep = timestamp => {
    if (!this.data.startTime) {
      this.data.startTime = timestamp;
    }

    this.data.currentTime = timestamp - this.data.startTime;

    let position = TweenFunctions[this.props.easing](
      this.data.currentTime,
      this.data.startValue,
      this.props.topPosition,
      this.props.duration
    );

    if (window.pageYOffset <= this.props.topPosition) {
      this.stopScrolling();
    } else {
      window.scrollTo(window.pageYOffset, position);
      this.data.rafId = window.requestAnimationFrame(this.scrollStep);
    }
  };

  /**
   * Stop Animation Frame
   */
  stopScrolling = () => {
    window.cancelAnimationFrame(this.data.rafId);
  };

  render() {
    return (
      <Wrapper
        css={this.props.css}
        show={this.state.show}
        onClick={this.handleClick}
      >
        {this.props.children}
      </Wrapper>
    );
  }
}

// Set default props
ScrollUp.defaultProps = {
  duration: 250,
  easing: "easeOutCubic",
  topPosition: 0,
  css: {
    transitionDuration: "0.4s",
    transitionTimingFunction: "linear",
    transitionDelay: "0s",
    transitionProperty: "opacity, visibility, right"
  }
};

// Set validation property types
ScrollUp.propTypes = {
  topPosition: PropTypes.number,
  showUnder: PropTypes.number.isRequired, // show button under this position,
  easing: PropTypes.oneOf([
    "linear",
    "easeInQuad",
    "easeOutQuad",
    "easeInOutQuad",
    "easeInCubic",
    "easeOutCubic",
    "easeInOutCubic",
    "easeInQuart",
    "easeOutQuart",
    "easeInOutQuart",
    "easeInQuint",
    "easeOutQuint",
    "easeInOutQuint",
    "easeInSine",
    "easeOutSine",
    "easeInOutSine",
    "easeInExpo",
    "easeOutExpo",
    "easeInOutExpo",
    "easeInCirc",
    "easeOutCirc",
    "easeInOutCirc",
    "easeInElastic",
    "easeOutElastic",
    "easeInOutElastic",
    "easeInBack",
    "easeOutBack",
    "easeInOutBack",
    "easeInBounce",
    "easeOutBounce",
    "easeInOutBounce"
  ]),
  duration: PropTypes.number, // seconds
  css: PropTypes.object
};
