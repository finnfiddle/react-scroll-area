(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-dom'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-dom'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactDom);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _reactDom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  // check if value is not null and not undefined
  var isSet = function isSet(val) {
    return val !== null && typeof val !== 'undefined';
  };

  // same as lodash.omit
  var omit = function omit(obj, keys) {
    var result = Object.assign({}, obj);
    keys.forEach(function (key) {
      return delete result[key];
    });
    return result;
  };

  var SIZE_KEYS = {
    Top: 'Height',
    Left: 'Width'
  };

  // function that does the scrolling
  function _scrollTo(_ref) {
    var container = _ref.container;
    var element = _ref.element;
    var key = _ref.key;
    var options = _ref.options;

    // if duration is ero then set it to very small so that we do not divide by zero
    if (options.duration <= 0) options.duration = 0.1;

    // width or height
    var sizeKey = SIZE_KEYS[key];
    // destination measurement
    var to = Math.min(element['offset' + key] + options['offset' + key], container['scroll' + sizeKey] - container['offset' + sizeKey]);
    // if destination is greater than avaialable space then limit to avaialable space
    if (to > container['scroll' + sizeKey]) to = container['scroll' + sizeKey];
    // if destination is less than zero then make it zero
    if (to < 0) to = 0;
    // amount that needs to be scrolled
    var difference = to - container['scroll' + key];
    // amount thats needs to be scrolled every tick
    var perTick = difference / options.duration * options.tick;
    // if we are already scrolled to that point then exit
    if (perTick === 0) return;

    // scroll the amount for one tick
    var doScroll = function doScroll() {
      setTimeout(function () {
        // scroll container
        container['scroll' + key] = container['scroll' + key] + perTick;
        // if we have reached desired position then exit
        if (container['scroll' + key] >= to && perTick > 0 || container['scroll' + key] <= to && perTick < 0) return;
        // else repeat after `TICK` interval
        doScroll();
      }, options.tick);
    };

    doScroll();
  }

  var ScrollArea = function (_Component) {
    _inherits(ScrollArea, _Component);

    function ScrollArea() {
      _classCallCheck(this, ScrollArea);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollArea).apply(this, arguments));
    }

    _createClass(ScrollArea, [{
      key: 'render',
      value: function render() {
        var className = this.props.className;


        return _react2.default.createElement(
          'div',
          _extends({
            className: 'scroll-area ' + (isSet(className) ? className : ''),
            ref: 'scrollarea'
          }, omit(this.props, ['className'])),
          this.props.children
        );
      }
    }, {
      key: 'scrollTo',
      value: function scrollTo(ref, _options) {

        var options = {
          offsetTop: 0,
          offsetLeft: 0,
          duration: 200,
          delay: 0,
          tick: 30
        };

        if (isSet(options)) Object.assign(options, _options);

        var container = _reactDom2.default.findDOMNode(this.refs.scrollarea);
        var element = _reactDom2.default.findDOMNode(ref);

        ['Top', 'Left'].forEach(function (key) {
          return _scrollTo({ container: container, element: element, key: key, options: options });
        });
      }
    }]);

    return ScrollArea;
  }(_react.Component);

  exports.default = ScrollArea;
});