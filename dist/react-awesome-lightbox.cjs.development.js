'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var DEFAULT_ZOOM_STEP = 0.3;
var DEFAULT_LARGE_ZOOM = 4;

function isTouchEvent(e) {
  return e && "touches" in e;
}

function getXY(e) {
  var x = 0;
  var y = 0;

  if (isTouchEvent(e)) {
    x = e.touches[0].pageX;
    y = e.touches[0].pageY;
  } else {
    x = e.pageX;
    y = e.pageY;
  }

  return {
    x: x,
    y: y
  };
}

function Cond(props) {
  if (!props.condition) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, props.children);
}

var Lightbox = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Lightbox, _React$Component);

  function Lightbox() {
    var _this$props$startInde, _this$props, _this$props2, _this$props2$images;

    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this.initX = 0;
    _this.initY = 0;
    _this.lastX = 0;
    _this.lastY = 0;
    _this._cont = /*#__PURE__*/React.createRef();
    _this.state = {
      x: 0,
      y: 0,
      zoom: 1,
      rotate: 0,
      loading: true,
      moving: false,
      current: (_this$props$startInde = (_this$props = _this.props) == null ? void 0 : _this$props.startIndex) != null ? _this$props$startInde : 0,
      multi: (_this$props2 = _this.props) != null && (_this$props2$images = _this$props2.images) != null && _this$props2$images.length ? true : false
    };

    _this.createTransform = function (x, y, zoom, rotate) {
      return "translate3d(" + x + "px," + y + "px,0px) scale(" + zoom + ") rotate(" + rotate + "deg)";
    };

    _this.stopSideEffect = function (e) {
      return e.stopPropagation();
    };

    _this.getCurrentImage = function (s, p) {
      var _p$image, _ref, _p$images$s$current$u, _p$images$s$current, _p$images;

      if (!s.multi) return (_p$image = p.image) != null ? _p$image : "";
      return (_ref = (_p$images$s$current$u = (_p$images$s$current = p.images[s.current]) == null ? void 0 : _p$images$s$current.url) != null ? _p$images$s$current$u : (_p$images = p.images) == null ? void 0 : _p$images[s.current]) != null ? _ref : "";
    };

    _this.getCurrentTitle = function (s, p) {
      var _p$title, _p$images$s$current$t, _p$images2, _p$images2$s$current;

      if (!s.multi) return (_p$title = p.title) != null ? _p$title : "";
      return (_p$images$s$current$t = (_p$images2 = p.images) == null ? void 0 : (_p$images2$s$current = _p$images2[s.current]) == null ? void 0 : _p$images2$s$current.title) != null ? _p$images$s$current$t : "";
    };

    _this.resetZoom = function () {
      return _this.setState({
        x: 0,
        y: 0,
        zoom: 1
      });
    };

    _this.shockZoom = function (e) {
      var _this$_cont$current;

      var _this$props3 = _this.props,
          _this$props3$zoomStep = _this$props3.zoomStep,
          zoomStep = _this$props3$zoomStep === void 0 ? DEFAULT_ZOOM_STEP : _this$props3$zoomStep,
          _this$props3$allowZoo = _this$props3.allowZoom,
          allowZoom = _this$props3$allowZoo === void 0 ? true : _this$props3$allowZoo,
          _this$props3$doubleCl = _this$props3.doubleClickZoom,
          doubleClickZoom = _this$props3$doubleCl === void 0 ? DEFAULT_LARGE_ZOOM : _this$props3$doubleCl;
      if (!allowZoom || !doubleClickZoom) return false;

      _this.stopSideEffect(e);

      if (_this.state.zoom > 1) return _this.resetZoom();

      var _z = (zoomStep < 1 ? Math.ceil(doubleClickZoom / zoomStep) : zoomStep) * zoomStep;

      var _xy = getXY(e);

      var _cbr = (_this$_cont$current = _this._cont.current) == null ? void 0 : _this$_cont$current.getBoundingClientRect == null ? void 0 : _this$_cont$current.getBoundingClientRect();

      var _ccx = _cbr.x + _cbr.width / 2;

      var _ccy = _cbr.y + _cbr.height / 2;

      var x = (_xy.x - _ccx) * -1 * _z;
      var y = (_xy.y - _ccy) * -1 * _z;

      _this.setState({
        x: x,
        y: y,
        zoom: _z
      });
    };

    _this.navigateImage = function (direction, e) {
      _this.stopSideEffect(e);

      var current = 0;

      switch (direction) {
        case "next":
          current = _this.state.current + 1;
          break;

        case "prev":
          current = _this.state.current - 1;
          break;
      }

      if (current >= _this.props.images.length) current = 0;else if (current < 0) current = _this.props.images.length - 1;

      _this.setState({
        current: current,
        x: 0,
        y: 0,
        zoom: 1,
        rotate: 0,
        loading: true
      });
    };

    _this.startMove = function (e) {
      if (_this.state.zoom <= 1) return false;

      _this.setState({
        moving: true
      });

      var xy = getXY(e);
      _this.initX = xy.x - _this.lastX;
      _this.initY = xy.y - _this.lastY;
    };

    _this.duringMove = function (e) {
      if (!_this.state.moving) return false;
      var xy = getXY(e);
      _this.lastX = xy.x - _this.initX;
      _this.lastY = xy.y - _this.initY;

      _this.setState({
        x: xy.x - _this.initX,
        y: xy.y - _this.initY
      });
    };

    _this.endMove = function (_e) {
      return _this.setState({
        moving: false
      });
    };

    _this.applyZoom = function (type) {
      var _this$props$zoomStep = _this.props.zoomStep,
          zoomStep = _this$props$zoomStep === void 0 ? DEFAULT_ZOOM_STEP : _this$props$zoomStep;

      switch (type) {
        case "in":
          _this.setState({
            zoom: _this.state.zoom + zoomStep
          });

          break;

        case "out":
          var newZoom = _this.state.zoom - zoomStep;
          if (newZoom < 1) break;else if (newZoom === 1) _this.setState({
            x: 0,
            y: 0,
            zoom: 1
          });else _this.setState({
            zoom: newZoom
          });
          break;

        case "reset":
          _this.resetZoom();

          break;
      }
    };

    _this.applyRotate = function (type) {
      switch (type) {
        case "cw":
          _this.setState({
            rotate: _this.state.rotate + 90
          });

          break;

        case "acw":
          _this.setState({
            rotate: _this.state.rotate - 90
          });

          break;
      }
    };

    _this.reset = function (e) {
      _this.stopSideEffect(e);

      _this.setState({
        x: 0,
        y: 0,
        zoom: 1,
        rotate: 0
      });
    };

    _this.exit = function (e) {
      if (typeof _this.props.onClose === "function") return _this.props.onClose(e);
      console.error("No Exit function passed on prop: onClose. Clicking the close button will do nothing");
    };

    _this.shouldShowReset = function () {
      return _this.state.x > 0 || _this.state.y > 0 || _this.state.zoom !== 1 || _this.state.rotate !== 0;
    };

    _this.canvasClick = function (e) {
      var _this$props$clickOuts = _this.props.clickOutsideToExit,
          clickOutsideToExit = _this$props$clickOuts === void 0 ? true : _this$props$clickOuts;
      if (clickOutsideToExit && _this.state.zoom <= 1) return _this.exit(e);
    };

    _this.keyboardNavigation = function (e) {
      var _this$props4 = _this.props,
          _this$props4$allowZoo = _this$props4.allowZoom,
          allowZoom = _this$props4$allowZoo === void 0 ? true : _this$props4$allowZoo,
          _this$props4$allowRes = _this$props4.allowReset,
          allowReset = _this$props4$allowRes === void 0 ? true : _this$props4$allowRes;
      var _this$state = _this.state,
          multi = _this$state.multi,
          x = _this$state.x,
          y = _this$state.y,
          zoom = _this$state.zoom;

      switch (e.key) {
        case "ArrowLeft":
          if (multi && zoom === 1) _this.navigateImage("prev", e);else if (zoom > 1) _this.setState({
            x: x - 20
          });
          break;

        case "ArrowRight":
          if (multi && zoom === 1) _this.navigateImage("next", e);else if (zoom > 1) _this.setState({
            x: x + 20
          });
          break;

        case "ArrowUp":
          if (zoom > 1) _this.setState({
            y: y + 20
          });
          break;

        case "ArrowDown":
          if (zoom > 1) _this.setState({
            y: y - 20
          });
          break;

        case "+":
          if (allowZoom) _this.applyZoom("in");
          break;

        case "-":
          if (allowZoom) _this.applyZoom("out");
          break;

        case "Escape":
          if (allowReset && _this.shouldShowReset()) _this.reset(e);else _this.exit(e);
          break;
      }
    };

    return _this;
  }

  var _proto = Lightbox.prototype;

  _proto.componentDidMount = function componentDidMount() {
    document.body.classList.add("lb-open-lightbox");
    var _this$props$keyboardI = this.props.keyboardInteraction,
        keyboardInteraction = _this$props$keyboardI === void 0 ? true : _this$props$keyboardI;
    if (keyboardInteraction) document.addEventListener("keyup", this.keyboardNavigation);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    document.body.classList.remove("lb-open-lightbox");
    var _this$props$keyboardI2 = this.props.keyboardInteraction,
        keyboardInteraction = _this$props$keyboardI2 === void 0 ? true : _this$props$keyboardI2;
    if (keyboardInteraction) document.removeEventListener("keyup", this.keyboardNavigation);
  };

  _proto.render = function render() {
    var _this2 = this;

    var image = this.getCurrentImage(this.state, this.props);
    var title = this.getCurrentTitle(this.state, this.props);

    if (!image) {
      console.warn("Not showing lightbox because no image was supplied.");
      return null;
    }

    var _this$props5 = this.props,
        _this$props5$allowZoo = _this$props5.allowZoom,
        allowZoom = _this$props5$allowZoo === void 0 ? true : _this$props5$allowZoo,
        _this$props5$allowRot = _this$props5.allowRotate,
        allowRotate = _this$props5$allowRot === void 0 ? true : _this$props5$allowRot,
        _this$props5$buttonAl = _this$props5.buttonAlign,
        buttonAlign = _this$props5$buttonAl === void 0 ? "flex-end" : _this$props5$buttonAl,
        _this$props5$showTitl = _this$props5.showTitle,
        showTitle = _this$props5$showTitl === void 0 ? true : _this$props5$showTitl,
        _this$props5$allowRes = _this$props5.allowReset,
        allowReset = _this$props5$allowRes === void 0 ? true : _this$props5$allowRes;
    var _this$state2 = this.state,
        x = _this$state2.x,
        y = _this$state2.y,
        zoom = _this$state2.zoom,
        rotate = _this$state2.rotate,
        multi = _this$state2.multi,
        loading = _this$state2.loading,
        moving = _this$state2.moving;

    var _reset = allowReset && this.shouldShowReset();

    return /*#__PURE__*/React.createElement("div", {
      className: "lb-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lb-header",
      style: {
        justifyContent: buttonAlign
      }
    }, /*#__PURE__*/React.createElement(Cond, {
      condition: showTitle && title
    }, /*#__PURE__*/React.createElement("div", {
      className: "lb-title",
      style: {
        display: buttonAlign === "center" ? "none" : "flex",
        order: buttonAlign === "flex-start" ? 2 : "unset"
      }
    }, /*#__PURE__*/React.createElement("span", {
      title: title,
      style: {
        textAlign: buttonAlign === "flex-start" ? "right" : "left"
      }
    }, title))), /*#__PURE__*/React.createElement(Cond, {
      condition: buttonAlign === "center" || _reset
    }, /*#__PURE__*/React.createElement("div", {
      title: "Reset",
      style: {
        order: buttonAlign === "flex-start" ? 1 : "unset"
      },
      className: "lb-button lb-icon-reset lb-hide-mobile reload " + (_reset ? "" : "lb-disabled"),
      onClick: this.reset
    })), /*#__PURE__*/React.createElement(Cond, {
      condition: multi
    }, /*#__PURE__*/React.createElement("div", {
      title: "Previous",
      className: "lb-button lb-icon-arrow prev lb-hide-mobile",
      onClick: function onClick(e) {
        return _this2.navigateImage("prev", e);
      }
    }), /*#__PURE__*/React.createElement("div", {
      title: "Next",
      className: "lb-button lb-icon-arrow next lb-hide-mobile",
      onClick: function onClick(e) {
        return _this2.navigateImage("next", e);
      }
    })), /*#__PURE__*/React.createElement(Cond, {
      condition: allowZoom
    }, /*#__PURE__*/React.createElement("div", {
      title: "Zoom In",
      className: "lb-button lb-icon-zoomin zoomin",
      onClick: function onClick() {
        return _this2.applyZoom("in");
      }
    }), /*#__PURE__*/React.createElement("div", {
      title: "Zoom Out",
      className: "lb-button lb-icon-zoomout zoomout " + (zoom <= 1 ? "lb-disabled" : ""),
      onClick: function onClick() {
        return _this2.applyZoom("out");
      }
    })), /*#__PURE__*/React.createElement(Cond, {
      condition: allowRotate
    }, /*#__PURE__*/React.createElement("div", {
      title: "Rotate left",
      className: "lb-button lb-icon-rotate rotatel",
      onClick: function onClick() {
        return _this2.applyRotate("acw");
      }
    }), /*#__PURE__*/React.createElement("div", {
      title: "Rotate right",
      className: "lb-button lb-icon-rotate rotater",
      onClick: function onClick() {
        return _this2.applyRotate("cw");
      }
    })), /*#__PURE__*/React.createElement("div", {
      title: "Close",
      className: "lb-button lb-icon-close close",
      style: {
        order: buttonAlign === "flex-start" ? -1 : "unset"
      },
      onClick: function onClick(e) {
        return _this2.exit(e);
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "lb-canvas" + (loading ? " lb-loading" : ""),
      ref: this._cont,
      onClick: function onClick(e) {
        return _this2.canvasClick(e);
      }
    }, /*#__PURE__*/React.createElement("img", {
      draggable: "false",
      style: {
        transform: this.createTransform(x, y, zoom, rotate),
        cursor: zoom > 1 ? "grab" : "unset",
        transition: moving ? "none" : "all 0.1s"
      },
      onMouseDown: function onMouseDown(e) {
        return _this2.startMove(e);
      },
      onTouchStart: function onTouchStart(e) {
        return _this2.startMove(e);
      },
      onMouseMove: function onMouseMove(e) {
        return _this2.duringMove(e);
      },
      onTouchMove: function onTouchMove(e) {
        return _this2.duringMove(e);
      },
      onMouseUp: function onMouseUp(e) {
        return _this2.endMove(e);
      },
      onMouseLeave: function onMouseLeave(e) {
        return _this2.endMove(e);
      },
      onTouchEnd: function onTouchEnd(e) {
        return _this2.endMove(e);
      },
      onClick: function onClick(e) {
        return _this2.stopSideEffect(e);
      },
      onDoubleClick: function onDoubleClick(e) {
        return _this2.shockZoom(e);
      },
      onLoad: function onLoad() {
        return _this2.setState({
          loading: false
        });
      },
      className: "lb-img" + (loading ? " lb-loading" : ""),
      title: title,
      src: image,
      alt: title
    }), /*#__PURE__*/React.createElement("div", {
      className: "mobile-controls lb-show-mobile"
    }, multi ? /*#__PURE__*/React.createElement("div", {
      title: "Previous",
      className: "lb-button lb-icon-arrow prev",
      onClick: function onClick(e) {
        return _this2.navigateImage("prev", e);
      }
    }) : null, _reset ? /*#__PURE__*/React.createElement("div", {
      title: "Reset",
      className: "lb-button lb-icon-reset reload",
      onClick: this.reset
    }) : null, multi ? /*#__PURE__*/React.createElement("div", {
      title: "Next",
      className: "lb-button lb-icon-arrow next",
      onClick: function onClick(e) {
        return _this2.navigateImage("next", e);
      }
    }) : null)));
  };

  return Lightbox;
}(React.Component);

exports.default = Lightbox;
//# sourceMappingURL=react-awesome-lightbox.cjs.development.js.map
