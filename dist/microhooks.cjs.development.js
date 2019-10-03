'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var load = _interopDefault(require('load-asset'));

function useDeferredState(duration, initialValue) {
  var _useState = React.useState(initialValue),
      response = _useState[0],
      setResponse = _useState[1];

  var _useState2 = React.useState(initialValue),
      innerValue = _useState2[0],
      setInnerValue = _useState2[1];

  React.useEffect(function () {
    var fn = setTimeout(function () {
      setResponse(innerValue);
    }, duration);
    return function () {
      clearTimeout(fn);
    };
  }, [duration, innerValue]);
  return [response, setInnerValue];
}
function useTakeEffect(fn, deps) {
  React.useEffect(function () {
    if (deps.some(function (d) {
      return !d;
    })) return;
    var destructor = fn();
    return function () {
      destructor && destructor();
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
function usePrefetch(assets) {
  React.useEffect(function () {
    load.all(assets);
  }, []);
}
/**
 * const {width, height} = useBounds();
 *
 * @export
 * @returns {Bounds}
 */

function useWindowBounds() {
  var _useState3 = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  }),
      bounds = _useState3[0],
      setBounds = _useState3[1];

  React.useEffect(function () {
    var handleResize = function handleResize() {
      return setBounds({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return bounds;
}
function useInlineSVG(svgString, styles) {
  if (styles === void 0) {
    styles = {};
  }

  var svgContainerRef = React.useRef(null);
  React.useEffect(function () {
    if (svgContainerRef.current) {
      svgContainerRef.current.innerHTML = svgString;
    }
  }, []);

  var render = function render() {
    return React.createElement("div", {
      style: styles,
      ref: svgContainerRef
    });
  };

  return render;
}

exports.useDeferredState = useDeferredState;
exports.useInlineSVG = useInlineSVG;
exports.usePrefetch = usePrefetch;
exports.useTakeEffect = useTakeEffect;
exports.useWindowBounds = useWindowBounds;
//# sourceMappingURL=microhooks.cjs.development.js.map
