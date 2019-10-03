import { useState, useEffect, useRef, createElement } from 'react';
import load from 'load-asset';

function useDeferredState(duration, initialValue) {
  var _useState = useState(initialValue),
      response = _useState[0],
      setResponse = _useState[1];

  var _useState2 = useState(initialValue),
      innerValue = _useState2[0],
      setInnerValue = _useState2[1];

  useEffect(function () {
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
  useEffect(function () {
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
  useEffect(function () {
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
  var _useState3 = useState({
    width: window.innerWidth,
    height: window.innerHeight
  }),
      bounds = _useState3[0],
      setBounds = _useState3[1];

  useEffect(function () {
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

  var svgContainerRef = useRef(null);
  useEffect(function () {
    if (svgContainerRef.current) {
      svgContainerRef.current.innerHTML = svgString;
    }
  }, []);

  var render = function render() {
    return createElement("div", {
      style: styles,
      ref: svgContainerRef
    });
  };

  return render;
}

export { useDeferredState, useInlineSVG, usePrefetch, useTakeEffect, useWindowBounds };
//# sourceMappingURL=microhooks.esm.js.map
