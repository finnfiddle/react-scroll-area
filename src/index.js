// component that scrolls to a child element programmatically
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// check if value is not null and not undefined
const isSet = val => val !== null && typeof val !== 'undefined';

// same as lodash.omit
const omit = (obj, keys) => {
  const result = Object.assign({}, obj);
  keys.forEach(key => delete result[key]);
  return result;
};

const SIZE_KEYS = {
  Top: 'Height',
  Left: 'Width',
};

// function that does the scrolling
function scrollTo({ container, element, key, options }) {
  // if duration is ero then set it to very small so that we do not divide by zero
  if (options.duration <= 0) options.duration = 0.1;

  // width or height
  const sizeKey = SIZE_KEYS[key];
  // destination measurement
  let to = Math.min(
    element[`offset${key}`] + options[`offset${key}`],
    (container[`scroll${sizeKey}`] - container[`offset${sizeKey}`])
  );
  // if destination is greater than avaialable space then limit to avaialable space
  if (to > container[`scroll${sizeKey}`]) to = container[`scroll${sizeKey}`];
  // if destination is less than zero then make it zero
  if (to < 0) to = 0;
  // amount that needs to be scrolled
  const difference = to - container[`scroll${key}`];
  // amount thats needs to be scrolled every tick
  const perTick = difference / options.duration * options.tick;
  // if we are already scrolled to that point then exit
  if (perTick === 0) return;

  // scroll the amount for one tick
  const doScroll = () => {
    setTimeout(() => {
      // scroll container
      container[`scroll${key}`] = container[`scroll${key}`] + perTick;
      // if we have reached desired position then exit
      if (
        (container[`scroll${key}`] >= to && perTick > 0) ||
        (container[`scroll${key}`] <= to && perTick < 0)
      ) return;
      // else repeat after `TICK` interval
      doScroll();
    }, options.tick);
  };

  doScroll();
}

class ScrollArea extends Component {

  render() {
    const { className } = this.props;

    return (
      <div
        className={`scroll-area ${isSet(className) ? className : ''}`}
        ref='scrollarea'
        {...omit(this.props, ['className'])}
      >
        {this.props.children}
      </div>
    );
  }

  // scroll to a child with ref=`ref` argument
  scrollTo(ref, _options) {

    const options = {
      offsetTop: 0,
      offsetLeft: 0,
      duration: 200,
      delay: 0,
      tick: 30,
    };

    if (isSet(options)) Object.assign(options, _options);

    const container = ReactDOM.findDOMNode(this.refs.scrollarea);
    const element = ReactDOM.findDOMNode(ref);

    ['Top', 'Left'].forEach(key => scrollTo({ container, element, key, options }));
  }

}

export default ScrollArea;
