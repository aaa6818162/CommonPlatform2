;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M502.005 68.58c77.876 0 142.523 67.271 155.001 155.583h65.037c0-120.318-98.518-217.842-220.038-217.842-121.54 0-220.055 97.523-220.055 217.842h65.056C359.483 135.851 424.131 68.58 502.005 68.58z m343.364 637.197l-66.724-450.485H225.367l-66.722 450.476a56.454 56.454 0 0 0-2.417 16.314c0 34.379 30.96 62.238 69.139 62.238h553.278c38.156 0 69.139-27.859 69.139-62.238 0-5.644-0.85-11.106-2.415-16.305z" fill="#040000" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M913.438 845.344l-209.216-205.8c54.741-59.543 88.391-138.255 88.391-224.879 0-185.248-152.572-335.381-340.786-335.381C263.6 79.284 111 229.417 111 414.665c0 185.261 152.6 335.42 340.827 335.42 81.309 0 155.936-28.15 214.477-74.889L876.309 881.8c10.284 10.101 26.847 10.101 37.129 0 10.177-10.074 10.177-26.409 0-36.456zM451.827 698.48c-159.298 0-288.457-127.034-288.457-283.815 0-156.714 129.159-283.83 288.457-283.83 159.207 0 288.416 127.116 288.416 283.83-0.001 156.781-129.21 283.815-288.416 283.815z" fill="#040000" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M119.841 133H947v78.344H119.841zM119.841 439.327H947v78.325H119.841zM119.841 745.613H947v78.344H119.841z" fill="#040000" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban2" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M946.036 327.469c-17.905-82.813-71.272-127.579-71.272-127.579s-47.002-51.477-145.482-53.716c-174.37-3.987-218.573 107.433-218.573 107.433S465.942 145.055 295.84 145.055c-98.483 2.238-145.484 53.717-145.484 53.717s-54.485 45.884-72.391 128.697-1.469 131.285 46.233 214.867c47.772 83.583 348.459 263.337 348.459 263.337 43.644 42.526 78.688 0 78.688 0s300.688-179.754 348.39-263.337c47.771-83.583 64.207-132.054 46.301-214.867z" fill="#C0BFBF" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban3" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M348.187 79.285c-7.684-5.293-29.063 0.018-34.477 3.079-46.08 26.982-120.922 92.942-109.33 161.516 12.992 76.569 276.963 149.351 276.963 149.351l35.084-17.496c-10.977-58.943-114.267-260.148-168.24-296.45z m-40.339 159.997c-1.011-18.913 22.966-40.459 36.298-50.968 4.983-3.893 11.277-3.331 15.923 1.873 14.863 17.517 46.775 61.66 50.369 121.499 0 0-100.986-46.508-102.59-72.404z" fill="#C51E3E" ></path>' +
    '' +
    '<path d="M677.888 83.741c-5.265-3.257-26.563-8.869-34.352-3.79-54.753 35.412-161.817 234.55-173.625 293.215l34.74 18.224s265.069-67.837 279.693-144.21c12.794-68.367-60.794-135.637-106.456-163.439z m-100.9 227.421c4.634-59.827 37.481-103.367 52.568-120.577 4.562-5.207 11.094-5.499 16.002-1.563 13.098 10.752 36.775 32.759 35.298 51.626-1.95 25.832-103.868 70.514-103.868 70.514zM468.567 576.988l0.309-216.758-301.379-0.64 23.494 216.851z" fill="#C51E3E" ></path>' +
    '' +
    '<path d="M790.801 577.46l30.211-216.623-301.502-0.539-0.309 216.723zM519.064 627.655l-0.376 216.671 234.653 0.448 30.28-216.672zM468.465 627.554l-272.008-0.583 23.581 216.834 248.016 0.419z" fill="#C51E3E" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban4" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M532.076 168.686c-218.739 0-395.989 131.922-395.989 294.727 0 97.726 64.083 184.459 162.555 238.102-0.194 0.828-78.557 143.192-78.557 143.192s238.958-91.152 239.676-91.484c23.479 3.203 47.62 4.861 72.314 4.861 218.738 0 395.988-131.978 395.988-294.671 0.001-162.806-177.249-294.727-395.987-294.727zM341.926 494.901c-17.264 0-31.462-14.198-31.462-31.545 0-17.457 14.198-31.544 31.462-31.544 17.401 0 31.571 14.088 31.571 31.544 0.001 17.347-14.169 31.545-31.571 31.545zM467.413 496.172c-17.402 0-31.572-14.143-31.572-31.517 0-17.43 14.17-31.462 31.572-31.462s31.462 14.032 31.462 31.462c0 17.374-14.060 31.517-31.462 31.517zM594.723 496.172c-17.374 0-31.572-14.143-31.572-31.517 0-17.43 14.198-31.462 31.572-31.462 17.429 0 31.572 14.032 31.572 31.462 0 17.374-14.144 31.517-31.572 31.517zM720.789 496.172c-17.374 0-31.571-14.143-31.571-31.517 0-17.43 14.197-31.462 31.571-31.462 17.43 0 31.571 14.032 31.571 31.462 0 17.374-14.141 31.517-31.571 31.517z" fill="#FFFFFF" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban5" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M474.174 896.219l-0.573-659.722-207.222 245.628-57.411 0.484 265.206-301.871h37.195l301.685 302.004-55.979 0.131-246.124-245.672 0.418 659.018h-37.195zM108 54.686h805.957v30.126H108z" fill="#FFFFFF" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban6" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M511.497 49.885c-244.542 0-443.499 198.957-443.499 443.504 0 244.537 198.958 443.497 443.499 443.497 244.542 0 443.501-198.96 443.501-443.497 0-244.547-198.959-443.504-443.501-443.504z m0 831.563c-213.954 0-388.062-174.055-388.062-388.06 0-213.956 174.108-388.066 388.062-388.066 213.957 0 388.064 174.11 388.064 388.066 0 214.006-174.108 388.06-388.064 388.06z m146.714-352.222L539.213 648.221V271.634c0-15.321-12.395-27.719-27.716-27.719-15.321 0-27.719 12.398-27.719 27.719V648.22L364.783 529.226c-10.829-10.827-28.368-10.827-39.196 0a27.637 27.637 0 0 0-8.121 19.601 27.622 27.622 0 0 0 8.121 19.594l166.312 166.312c10.829 10.829 28.367 10.829 39.199 0L697.409 568.42c10.827-10.827 10.827-28.366 0-39.194-10.831-10.828-28.37-10.828-39.198 0z" fill="#C0BFBF" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban7" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M752.194 610.676c-48.511 0-91.571 23.269-118.617 59.287L400.378 553.02a150.145 150.145 0 0 0 5.623-40.74c0-15.455-2.317-30.438-6.654-44.391l232.255-116.557c26.874 37.608 70.878 62.036 120.592 62.036 81.869 0 148.454-66.371 148.454-148.369 0-81.912-66.585-148.326-148.454-148.326-81.912 0-148.325 66.414-148.325 148.326 0 5.71 0.343 11.334 0.901 16.743L359.808 404.738c-26.617-25.243-62.593-40.785-102.131-40.785-81.913 0-148.326 66.415-148.326 148.326 0 81.911 66.413 148.368 148.326 148.368 40.999 0 78.176-16.614 105.051-43.575l242.515 121.752c-0.858 6.568-1.373 13.309-1.373 20.178 0 81.911 66.413 148.325 148.325 148.325 81.869 0 148.454-66.414 148.454-148.325-0.001-81.955-66.586-148.326-148.455-148.326z m0 0" fill="#D4D4D5" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban8" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M126.816 760.576c0 6.813 2.468 13.725 7.405 18.959 9.875 10.37 25.874 10.37 35.749 0l361.383-382.17 361.407 382.17c9.776 10.37 25.774 10.37 35.649 0 9.874-10.468 9.874-27.452 0-37.82L549.178 340.682c-9.876-10.467-25.873-10.467-35.699 0L134.221 741.715c-4.937 5.234-7.405 12.048-7.405 18.861z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban9" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M909.138 304.227c0-6.76-2.45-13.519-7.348-18.712-9.797-10.384-25.667-10.384-35.463 0L507.78 664.634 149.333 285.515c-9.796-10.384-25.666-10.384-35.462 0-9.797 10.385-9.797 27.137 0 37.521l376.276 397.83c9.798 10.286 25.668 10.286 35.366 0l376.277-397.83c4.898-5.192 7.348-11.952 7.348-18.809z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban10" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M306.782 66.825c-7.24 0-14.479 2.608-20.035 7.827-11.194 10.524-11.194 27.611 0 38.134l407.169 385.028-407.169 385.028c-11.194 10.437-11.194 27.526 0 38.046 11.112 10.524 29.128 10.524 40.24 0l427.284-404.136c11.026-10.438 11.026-27.525 0-37.964L326.987 74.651c-5.556-5.218-12.796-7.826-20.205-7.826z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban11" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M651.339 909.491c6.37 0 12.795-2.326 17.67-6.979 9.803-9.194 9.803-24.205 0-33.455L311.362 530.853l357.646-338.259c9.803-9.195 9.803-24.205 0-33.399-9.805-9.25-25.59-9.25-35.395 0l-375.37 354.932c-9.692 9.249-9.692 24.26 0 33.454l375.37 354.932c4.876 4.652 11.301 6.978 17.726 6.978z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozhizuomoban12" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M236.297 265.265l489.071 488.903H342.259c-8.753 0-15.655 7.238-15.655 15.989 0 8.755 7.071 15.741 15.823 15.741l418.542-0.085c5.051 1.095 10.604-0.085 14.392-4.039 2.777-2.777 4.209-6.314 4.379-9.933l0.335-0.084V348.333c0-8.668-7.153-15.821-15.906-15.906-8.922 0.085-15.907 7.154-15.907 15.738v384.122L258.769 242.792c-6.228-6.229-16.328-6.229-22.472-0.083-6.228 6.228-6.228 16.242 0 22.556z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)