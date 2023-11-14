/*!
 * AngularJS Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.10
 */
(function( window, angular, undefined ){
"use strict";

(function(){
"use strict";

angular.module('ngMaterial', ["ng","ngAnimate","ngAria","material.core","material.core.gestures","material.core.interaction","material.core.layout","material.core.meta","material.core.theming.palette","material.core.theming","material.core.animate","material.components.backdrop","material.components.button","material.components.card","material.components.colors","material.components.content","material.components.dialog","material.components.divider","material.components.fabActions","material.components.fabShared","material.components.fabSpeedDial","material.components.gridList","material.components.icon","material.components.list","material.components.panel","material.components.progressLinear","material.components.showHide","material.components.sidenav","material.components.slider","material.components.subheader","material.components.toolbar","material.components.tooltip","material.components.truncate","material.components.whiteframe"]);
})();
(function(){
"use strict";

/**
 * Initialization function that validates environment
 * requirements.
 */
DetectNgTouch.$inject = ["$log", "$injector"];
MdCoreConfigure.$inject = ["$provide", "$mdThemingProvider"];
rAFDecorator.$inject = ["$delegate"];
qDecorator.$inject = ["$delegate"];
angular
  .module('material.core', [
    'ngAnimate',
    'material.core.animate',
    'material.core.layout',
    'material.core.interaction',
    'material.core.gestures',
    'material.core.theming'
  ])
  .config(MdCoreConfigure)
  .run(DetectNgTouch);


/**
 * Detect if the ng-Touch module is also being used.
 * Warn if detected.
 * @ngInject
 */
function DetectNgTouch($log, $injector) {
  if ( $injector.has('$swipe') ) {
    var msg = "" +
      "You are using the ngTouch module. \n" +
      "AngularJS Material already has mobile click, tap, and swipe support... \n" +
      "ngTouch is not supported with AngularJS Material!";
    $log.warn(msg);
  }
}

/**
 * @ngInject
 */
function MdCoreConfigure($provide, $mdThemingProvider) {

  $provide.decorator('$$rAF', ['$delegate', rAFDecorator]);
  $provide.decorator('$q', ['$delegate', qDecorator]);

  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('pink')
    .warnPalette('deep-orange')
    .backgroundPalette('grey');
}

/**
 * @ngInject
 */
function rAFDecorator($delegate) {
  /**
   * Use this to throttle events that come in often.
   * The throttled function will always use the *last* invocation before the
   * coming frame.
   *
   * For example, window resize events that fire many times a second:
   * If we set to use an raf-throttled callback on window resize, then
   * our callback will only be fired once per frame, with the last resize
   * event that happened before that frame.
   *
   * @param {function} callback function to debounce
   */
  $delegate.throttle = function(cb) {
    var queuedArgs, alreadyQueued, queueCb, context;
    return function debounced() {
      queuedArgs = arguments;
      context = this;
      queueCb = cb;
      if (!alreadyQueued) {
        alreadyQueued = true;
        $delegate(function() {
          queueCb.apply(context, Array.prototype.slice.call(queuedArgs));
          alreadyQueued = false;
        });
      }
    };
  };
  return $delegate;
}

/**
 * @ngInject
 */
function qDecorator($delegate) {
  /**
   * Adds a shim for $q.resolve for AngularJS version that don't have it,
   * so we don't have to think about it.
   *
   * via https://github.com/angular/angular.js/pull/11987
   */

  // TODO(crisbeto): this won't be necessary once we drop AngularJS 1.3
  if (!$delegate.resolve) {
    $delegate.resolve = $delegate.when;
  }
  return $delegate;
}

})();
(function(){
"use strict";


MdAutofocusDirective.$inject = ["$parse"];angular.module('material.core')
  .directive('mdAutofocus', MdAutofocusDirective)

  // Support the deprecated md-auto-focus and md-sidenav-focus as well
  .directive('mdAutoFocus', MdAutofocusDirective)
  .directive('mdSidenavFocus', MdAutofocusDirective);

/**
 * @ngdoc directive
 * @name mdAutofocus
 * @module material.core.util
 *
 * @description
 *
 * `[md-autofocus]` provides an optional way to identify the focused element when a `$mdDialog`,
 * `$mdBottomSheet`, `$mdMenu` or `$mdSidenav` opens or upon page load for input-like elements.
 *
 * When one of these opens, it will find the first nested element with the `[md-autofocus]`
 * attribute directive and optional expression. An expression may be specified as the directive
 * value to enable conditional activation of the autofocus.
 *
 * @usage
 *
 * ### Dialog
 * <hljs lang="html">
 * <md-dialog>
 *   <form>
 *     <md-input-container>
 *       <label for="testInput">Label</label>
 *       <input id="testInput" type="text" md-autofocus>
 *     </md-input-container>
 *   </form>
 * </md-dialog>
 * </hljs>
 *
 * ### Bottomsheet
 * <hljs lang="html">
 * <md-bottom-sheet class="md-list md-has-header">
 *  <md-subheader>Comment Actions</md-subheader>
 *  <md-list>
 *    <md-list-item ng-repeat="item in items">
 *
 *      <md-button md-autofocus="$index == 2">
 *        <md-icon md-svg-src="{{item.icon}}"></md-icon>
 *        <span class="md-inline-list-icon-label">{{ item.name }}</span>
 *      </md-button>
 *
 *    </md-list-item>
 *  </md-list>
 * </md-bottom-sheet>
 * </hljs>
 *
 * ### Autocomplete
 * <hljs lang="html">
 *   <md-autocomplete
 *       md-autofocus
 *       md-selected-item="selectedItem"
 *       md-search-text="searchText"
 *       md-items="item in getMatches(searchText)"
 *       md-item-text="item.display">
 *     <span md-highlight-text="searchText">{{item.display}}</span>
 *   </md-autocomplete>
 * </hljs>
 *
 * ### Sidenav
 * <hljs lang="html">
 * <div layout="row" ng-controller="MyController">
 *   <md-sidenav md-component-id="left" class="md-sidenav-left">
 *     Left Nav!
 *   </md-sidenav>
 *
 *   <md-content>
 *     Center Content
 *     <md-button ng-click="openLeftMenu()">
 *       Open Left Menu
 *     </md-button>
 *   </md-content>
 *
 *   <md-sidenav md-component-id="right"
 *     md-is-locked-open="$mdMedia('min-width: 333px')"
 *     class="md-sidenav-right">
 *     <form>
 *       <md-input-container>
 *         <label for="testInput">Test input</label>
 *         <input id="testInput" type="text"
 *                ng-model="data" md-autofocus>
 *       </md-input-container>
 *     </form>
 *   </md-sidenav>
 * </div>
 * </hljs>
 **/
function MdAutofocusDirective($parse) {
  return {
    restrict: 'A',
    link: {
      pre: preLink
    }
  };

  function preLink(scope, element, attr) {
    var attrExp = attr.mdAutoFocus || attr.mdAutofocus || attr.mdSidenavFocus;

    // Initially update the expression by manually parsing the expression as per $watch source.
    updateExpression($parse(attrExp)(scope));

    // Only watch the expression if it is not empty.
    if (attrExp) {
      scope.$watch(attrExp, updateExpression);
    }

    /**
     * Updates the autofocus class which is used to determine whether the attribute
     * expression evaluates to true or false.
     * @param {string|boolean} value Attribute Value
     */
    function updateExpression(value) {

      // Rather than passing undefined to the jqLite toggle class function we explicitly set the
      // value to true. Otherwise the class will be just toggled instead of being forced.
      if (angular.isUndefined(value)) {
        value = true;
      }

      element.toggleClass('md-autofocus', !!value);
    }
  }

}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.core.colorUtil
 * @description
 * Color Util
 */
angular
  .module('material.core')
  .factory('$mdColorUtil', ColorUtilFactory);

function ColorUtilFactory() {
  /**
   * Converts hex value to RGBA string
   * @param color {string}
   * @returns {string}
   */
  function hexToRgba (color) {
    var hex   = color[ 0 ] === '#' ? color.substr(1) : color,
      dig   = hex.length / 3,
      red   = hex.substr(0, dig),
      green = hex.substr(dig, dig),
      blue  = hex.substr(dig * 2);
    if (dig === 1) {
      red += red;
      green += green;
      blue += blue;
    }
    return 'rgba(' + parseInt(red, 16) + ',' + parseInt(green, 16) + ',' + parseInt(blue, 16) + ',0.1)';
  }

  /**
   * Converts rgba value to hex string
   * @param color {string}
   * @returns {string}
   */
  function rgbaToHex(color) {
    color = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    var hex = (color && color.length === 4) ? "#" +
    ("0" + parseInt(color[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(color[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(color[3],10).toString(16)).slice(-2) : '';

    return hex.toUpperCase();
  }

  /**
   * Converts an RGB color to RGBA
   * @param color {string}
   * @returns {string}
   */
  function rgbToRgba (color) {
    return color.replace(')', ', 0.1)').replace('(', 'a(');
  }

  /**
   * Converts an RGBA color to RGB
   * @param color {string}
   * @returns {string}
   */
  function rgbaToRgb (color) {
    return color
      ? color.replace('rgba', 'rgb').replace(/,[^),]+\)/, ')')
      : 'rgb(0,0,0)';
  }

  return {
    rgbaToHex: rgbaToHex,
    hexToRgba: hexToRgba,
    rgbToRgba: rgbToRgba,
    rgbaToRgb: rgbaToRgb
  };
}

})();
(function(){
"use strict";

angular.module('material.core')
.factory('$mdConstant', MdConstantFactory);

/**
 * Factory function that creates the grab-bag $mdConstant service.
 * @ngInject
 */
function MdConstantFactory() {

  var prefixTestEl = document.createElement('div');
  var vendorPrefix = getVendorPrefix(prefixTestEl);
  var isWebkit = /webkit/i.test(vendorPrefix);
  var SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g;

  function vendorProperty(name) {
    // Add a dash between the prefix and name, to be able to transform the string into camelcase.
    var prefixedName = vendorPrefix + '-' + name;
    var ucPrefix = camelCase(prefixedName);
    var lcPrefix = ucPrefix.charAt(0).toLowerCase() + ucPrefix.substring(1);

    return hasStyleProperty(prefixTestEl, name)     ? name     :       // The current browser supports the un-prefixed property
           hasStyleProperty(prefixTestEl, ucPrefix) ? ucPrefix :       // The current browser only supports the prefixed property.
           hasStyleProperty(prefixTestEl, lcPrefix) ? lcPrefix : name; // Some browsers are only supporting the prefix in lowercase.
  }

  function hasStyleProperty(testElement, property) {
    return angular.isDefined(testElement.style[property]);
  }

  function camelCase(input) {
    return input.replace(SPECIAL_CHARS_REGEXP, function(matches, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    });
  }

  function getVendorPrefix(testElement) {
    var prop, match;
    var vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/;

    for (prop in testElement.style) {
      if (match = vendorRegex.exec(prop)) {
        return match[0];
      }
    }
  }

  var self = {
    isInputKey : function(e) { return (e.keyCode >= 31 && e.keyCode <= 90); },
    isNumPadKey : function(e) { return (3 === e.location && e.keyCode >= 97 && e.keyCode <= 105); },
    isMetaKey: function(e) { return (e.keyCode >= 91 && e.keyCode <= 93); },
    isFnLockKey: function(e) { return (e.keyCode >= 112 && e.keyCode <= 145); },
    isNavigationKey : function(e) {
      var kc = self.KEY_CODE, NAVIGATION_KEYS =  [kc.SPACE, kc.ENTER, kc.UP_ARROW, kc.DOWN_ARROW];
      return (NAVIGATION_KEYS.indexOf(e.keyCode) != -1);
    },
    hasModifierKey: function(e) {
      return e.ctrlKey || e.metaKey || e.altKey;
    },

    /**
     * Maximum size, in pixels, that can be explicitly set to an element. The actual value varies
     * between browsers, but IE11 has the very lowest size at a mere 1,533,917px. Ideally we could
     * compute this value, but Firefox always reports an element to have a size of zero if it
     * goes over the max, meaning that we'd have to binary search for the value.
     */
    ELEMENT_MAX_PIXELS: 1533917,

    /**
     * Priority for a directive that should run before the directives from ngAria.
     */
    BEFORE_NG_ARIA: 210,

    /**
     * Common Keyboard actions and their associated keycode.
     */
    KEY_CODE: {
      COMMA: 188,
      SEMICOLON : 186,
      ENTER: 13,
      ESCAPE: 27,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      LEFT_ARROW : 37,
      UP_ARROW : 38,
      RIGHT_ARROW : 39,
      DOWN_ARROW : 40,
      TAB : 9,
      BACKSPACE: 8,
      DELETE: 46
    },

    /**
     * Vendor prefixed CSS properties to be used to support the given functionality in older browsers
     * as well.
     */
    CSS: {
      /* Constants */
      TRANSITIONEND: 'transitionend' + (isWebkit ? ' webkitTransitionEnd' : ''),
      ANIMATIONEND: 'animationend' + (isWebkit ? ' webkitAnimationEnd' : ''),

      TRANSFORM: vendorProperty('transform'),
      TRANSFORM_ORIGIN: vendorProperty('transformOrigin'),
      TRANSITION: vendorProperty('transition'),
      TRANSITION_DURATION: vendorProperty('transitionDuration'),
      ANIMATION_PLAY_STATE: vendorProperty('animationPlayState'),
      ANIMATION_DURATION: vendorProperty('animationDuration'),
      ANIMATION_NAME: vendorProperty('animationName'),
      ANIMATION_TIMING: vendorProperty('animationTimingFunction'),
      ANIMATION_DIRECTION: vendorProperty('animationDirection')
    },

    /**
     * As defined in core/style/variables.scss
     *
     * $layout-breakpoint-xs:     600px !default;
     * $layout-breakpoint-sm:     960px !default;
     * $layout-breakpoint-md:     1280px !default;
     * $layout-breakpoint-lg:     1920px !default;
     *
     */
    MEDIA: {
      'xs'        : '(max-width: 599px)'                         ,
      'gt-xs'     : '(min-width: 600px)'                         ,
      'sm'        : '(min-width: 600px) and (max-width: 959px)'  ,
      'gt-sm'     : '(min-width: 960px)'                         ,
      'md'        : '(min-width: 960px) and (max-width: 1279px)' ,
      'gt-md'     : '(min-width: 1280px)'                        ,
      'lg'        : '(min-width: 1280px) and (max-width: 1919px)',
      'gt-lg'     : '(min-width: 1920px)'                        ,
      'gt-lgish'     : '(min-width: 1900px)'                     ,
      'xl'        : '(min-width: 1920px)'                        ,
      'landscape' : '(orientation: landscape)'                   ,
      'portrait'  : '(orientation: portrait)'                    ,
      'print' : 'print'
    },

    MEDIA_PRIORITY: [
      'xl',
      'gt-lg',
      'lg',
      'gt-md',
      'md',
      'gt-sm',
      'sm',
      'gt-xs',
      'xs',
      'landscape',
      'portrait',
      'print'
    ]
  };

  return self;
}

})();
(function(){
"use strict";

  angular
    .module('material.core')
    .config( ["$provide", function($provide){
       $provide.decorator('$mdUtil', ['$delegate', function ($delegate){
           /**
            * Inject the iterator facade to easily support iteration and accessors
            * @see iterator below
            */
           $delegate.iterator = MdIterator;

           return $delegate;
         }
       ]);
     }]);

  /**
   * iterator is a list facade to easily support iteration and accessors
   *
   * @param items Array list which this iterator will enumerate
   * @param reloop Boolean enables iterator to consider the list as an endless reloop
   */
  function MdIterator(items, reloop) {
    var trueFn = function() { return true; };

    if (items && !angular.isArray(items)) {
      items = Array.prototype.slice.call(items);
    }

    reloop = !!reloop;
    var _items = items || [ ];

    // Published API
    return {
      items: getItems,
      count: count,

      inRange: inRange,
      contains: contains,
      indexOf: indexOf,
      itemAt: itemAt,

      findBy: findBy,

      add: add,
      remove: remove,

      first: first,
      last: last,
      next: angular.bind(null, findSubsequentItem, false),
      previous: angular.bind(null, findSubsequentItem, true),

      hasPrevious: hasPrevious,
      hasNext: hasNext

    };

    /**
     * Publish copy of the enumerable set
     * @returns {Array|*}
     */
    function getItems() {
      return [].concat(_items);
    }

    /**
     * Determine length of the list
     * @returns {Array.length|*|number}
     */
    function count() {
      return _items.length;
    }

    /**
     * Is the index specified valid
     * @param index
     * @returns {Array.length|*|number|boolean}
     */
    function inRange(index) {
      return _items.length && ( index > -1 ) && (index < _items.length );
    }

    /**
     * Can the iterator proceed to the next item in the list; relative to
     * the specified item.
     *
     * @param item
     * @returns {Array.length|*|number|boolean}
     */
    function hasNext(item) {
      return item ? inRange(indexOf(item) + 1) : false;
    }

    /**
     * Can the iterator proceed to the previous item in the list; relative to
     * the specified item.
     *
     * @param item
     * @returns {Array.length|*|number|boolean}
     */
    function hasPrevious(item) {
      return item ? inRange(indexOf(item) - 1) : false;
    }

    /**
     * Get item at specified index/position
     * @param index
     * @returns {*}
     */
    function itemAt(index) {
      return inRange(index) ? _items[index] : null;
    }

    /**
     * Find all elements matching the key/value pair
     * otherwise return null
     *
     * @param val
     * @param key
     *
     * @return array
     */
    function findBy(key, val) {
      return _items.filter(function(item) {
        return item[key] === val;
      });
    }

    /**
     * Add item to list
     * @param item
     * @param index
     * @returns {*}
     */
    function add(item, index) {
      if ( !item ) return -1;

      if (!angular.isNumber(index)) {
        index = _items.length;
      }

      _items.splice(index, 0, item);

      return indexOf(item);
    }

    /**
     * Remove item from list...
     * @param item
     */
    function remove(item) {
      if ( contains(item) ){
        _items.splice(indexOf(item), 1);
      }
    }

    /**
     * Get the zero-based index of the target item
     * @param item
     * @returns {*}
     */
    function indexOf(item) {
      return _items.indexOf(item);
    }

    /**
     * Boolean existence check
     * @param item
     * @returns {boolean}
     */
    function contains(item) {
      return item && (indexOf(item) > -1);
    }

    /**
     * Return first item in the list
     * @returns {*}
     */
    function first() {
      return _items.length ? _items[0] : null;
    }

    /**
     * Return last item in the list...
     * @returns {*}
     */
    function last() {
      return _items.length ? _items[_items.length - 1] : null;
    }

    /**
     * Find the next item. If reloop is true and at the end of the list, it will go back to the
     * first item. If given, the `validate` callback will be used to determine whether the next item
     * is valid. If not valid, it will try to find the next item again.
     *
     * @param {boolean} backwards Specifies the direction of searching (forwards/backwards)
     * @param {*} item The item whose subsequent item we are looking for
     * @param {Function=} validate The `validate` function
     * @param {integer=} limit The recursion limit
     *
     * @returns {*} The subsequent item or null
     */
    function findSubsequentItem(backwards, item, validate, limit) {
      validate = validate || trueFn;

      var curIndex = indexOf(item);
      while (true) {
        if (!inRange(curIndex)) return null;

        var nextIndex = curIndex + (backwards ? -1 : 1);
        var foundItem = null;
        if (inRange(nextIndex)) {
          foundItem = _items[nextIndex];
        } else if (reloop) {
          foundItem = backwards ? last() : first();
          nextIndex = indexOf(foundItem);
        }

        if ((foundItem === null) || (nextIndex === limit)) return null;
        if (validate(foundItem)) return foundItem;

        if (angular.isUndefined(limit)) limit = nextIndex;

        curIndex = nextIndex;
      }
    }
  }


})();
(function(){
"use strict";


mdMediaFactory.$inject = ["$mdConstant", "$rootScope", "$window"];angular.module('material.core')
.factory('$mdMedia', mdMediaFactory);

/**
 * @ngdoc service
 * @name $mdMedia
 * @module material.core
 *
 * @description
 * `$mdMedia` is used to evaluate whether a given media query is true or false given the
 * current device's screen / window size. The media query will be re-evaluated on resize, allowing
 * you to register a watch.
 *
 * `$mdMedia` also has pre-programmed support for media queries that match the layout breakpoints:
 *
 *  <table class="md-api-table">
 *    <thead>
 *    <tr>
 *      <th>Breakpoint</th>
 *      <th>mediaQuery</th>
 *    </tr>
 *    </thead>
 *    <tbody>
 *    <tr>
 *      <td>xs</td>
 *      <td>(max-width: 599px)</td>
 *    </tr>
 *    <tr>
 *      <td>gt-xs</td>
 *      <td>(min-width: 600px)</td>
 *    </tr>
 *    <tr>
 *      <td>sm</td>
 *      <td>(min-width: 600px) and (max-width: 959px)</td>
 *    </tr>
 *    <tr>
 *      <td>gt-sm</td>
 *      <td>(min-width: 960px)</td>
 *    </tr>
 *    <tr>
 *      <td>md</td>
 *      <td>(min-width: 960px) and (max-width: 1279px)</td>
 *    </tr>
 *    <tr>
 *      <td>gt-md</td>
 *      <td>(min-width: 1280px)</td>
 *    </tr>
 *    <tr>
 *      <td>lg</td>
 *      <td>(min-width: 1280px) and (max-width: 1919px)</td>
 *    </tr>
 *    <tr>
 *      <td>gt-lg</td>
 *      <td>(min-width: 1920px)</td>
 *    </tr>
 *    <tr>
 *      <td>xl</td>
 *      <td>(min-width: 1920px)</td>
 *    </tr>
 *    <tr>
 *      <td>landscape</td>
 *      <td>landscape</td>
 *    </tr>
 *    <tr>
 *      <td>portrait</td>
 *      <td>portrait</td>
 *    </tr>
 *    <tr>
 *      <td>print</td>
 *      <td>print</td>
 *    </tr>
 *    </tbody>
 *  </table>
 *
 *  See Material Design's <a href="https://material.google.com/layout/responsive-ui.html">Layout - Adaptive UI</a> for more details.
 *
 *  <a href="https://www.google.com/design/spec/layout/adaptive-ui.html">
 *  <img src="https://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B8olV15J7abPSGFxemFiQVRtb1k/layout_adaptive_breakpoints_01.png" width="100%" height="100%"></img>
 *  </a>
 *
 * @returns {boolean} a boolean representing whether or not the given media query is true or false.
 *
 * @usage
 * <hljs lang="js">
 * app.controller('MyController', function($mdMedia, $scope) {
 *   $scope.$watch(function() { return $mdMedia('lg'); }, function(big) {
 *     $scope.bigScreen = big;
 *   });
 *
 *   $scope.screenIsSmall = $mdMedia('sm');
 *   $scope.customQuery = $mdMedia('(min-width: 1234px)');
 *   $scope.anotherCustom = $mdMedia('max-width: 300px');
 * });
 * </hljs>
 */

/* @ngInject */
function mdMediaFactory($mdConstant, $rootScope, $window) {
  var queries = {};
  var mqls = {};
  var results = {};
  var normalizeCache = {};

  $mdMedia.getResponsiveAttribute = getResponsiveAttribute;
  $mdMedia.getQuery = getQuery;
  $mdMedia.watchResponsiveAttributes = watchResponsiveAttributes;

  return $mdMedia;

  function $mdMedia(query) {
    var validated = queries[query];
    if (angular.isUndefined(validated)) {
      validated = queries[query] = validate(query);
    }

    var result = results[validated];
    if (angular.isUndefined(result)) {
      result = add(validated);
    }

    return result;
  }

  function validate(query) {
    return $mdConstant.MEDIA[query] ||
           ((query.charAt(0) !== '(') ? ('(' + query + ')') : query);
  }

  function add(query) {
    var result = mqls[query];
    if ( !result ) {
      result = mqls[query] = $window.matchMedia(query);
    }

    result.addListener(onQueryChange);
    return (results[result.media] = !!result.matches);
  }

  function onQueryChange(query) {
    $rootScope.$evalAsync(function() {
      results[query.media] = !!query.matches;
    });
  }

  function getQuery(name) {
    return mqls[name];
  }

  function getResponsiveAttribute(attrs, attrName) {
    for (var i = 0; i < $mdConstant.MEDIA_PRIORITY.length; i++) {
      var mediaName = $mdConstant.MEDIA_PRIORITY[i];
      if (!mqls[queries[mediaName]].matches) {
        continue;
      }

      var normalizedName = getNormalizedName(attrs, attrName + '-' + mediaName);
      if (attrs[normalizedName]) {
        return attrs[normalizedName];
      }
    }

    // fallback on unprefixed
    return attrs[getNormalizedName(attrs, attrName)];
  }

  function watchResponsiveAttributes(attrNames, attrs, watchFn) {
    var unwatchFns = [];
    attrNames.forEach(function(attrName) {
      var normalizedName = getNormalizedName(attrs, attrName);
      if (angular.isDefined(attrs[normalizedName])) {
        unwatchFns.push(
            attrs.$observe(normalizedName, angular.bind(void 0, watchFn, null)));
      }

      for (var mediaName in $mdConstant.MEDIA) {
        normalizedName = getNormalizedName(attrs, attrName + '-' + mediaName);
        if (angular.isDefined(attrs[normalizedName])) {
          unwatchFns.push(
              attrs.$observe(normalizedName, angular.bind(void 0, watchFn, mediaName)));
        }
      }
    });

    return function unwatch() {
      unwatchFns.forEach(function(fn) { fn(); });
    };
  }

  // Improves performance dramatically
  function getNormalizedName(attrs, attrName) {
    return normalizeCache[attrName] ||
        (normalizeCache[attrName] = attrs.$normalize(attrName));
  }
}

})();
(function(){
"use strict";

angular
  .module('material.core')
  .config( ["$provide", function($provide) {
    $provide.decorator('$mdUtil', ['$delegate', function ($delegate) {

      // Inject the prefixer into our original $mdUtil service.
      $delegate.prefixer = MdPrefixer;

      return $delegate;
    }]);
  }]);

function MdPrefixer(initialAttributes, buildSelector) {
  var PREFIXES = ['data', 'x'];

  if (initialAttributes) {
    // The prefixer also accepts attributes as a parameter, and immediately builds a list or selector for
    // the specified attributes.
    return buildSelector ? _buildSelector(initialAttributes) : _buildList(initialAttributes);
  }

  return {
    buildList: _buildList,
    buildSelector: _buildSelector,
    hasAttribute: _hasAttribute,
    removeAttribute: _removeAttribute
  };

  function _buildList(attributes) {
    attributes = angular.isArray(attributes) ? attributes : [attributes];

    attributes.forEach(function(item) {
      PREFIXES.forEach(function(prefix) {
        attributes.push(prefix + '-' + item);
      });
    });

    return attributes;
  }

  function _buildSelector(attributes) {
    attributes = angular.isArray(attributes) ? attributes : [attributes];

    return _buildList(attributes)
      .map(function(item) {
        return '[' + item + ']';
      })
      .join(',');
  }

  function _hasAttribute(element, attribute) {
    element = _getNativeElement(element);

    if (!element) {
      return false;
    }

    var prefixedAttrs = _buildList(attribute);

    for (var i = 0; i < prefixedAttrs.length; i++) {
      if (element.hasAttribute(prefixedAttrs[i])) {
        return true;
      }
    }

    return false;
  }

  function _removeAttribute(element, attribute) {
    element = _getNativeElement(element);

    if (!element) {
      return;
    }

    _buildList(attribute).forEach(function(prefixedAttribute) {
      element.removeAttribute(prefixedAttribute);
    });
  }

  /**
   * Transforms a jqLite or DOM element into a HTML element.
   * This is useful when supporting jqLite elements and DOM elements at
   * same time.
   * @param element {JQLite|Element} Element to be parsed
   * @returns {HTMLElement} Parsed HTMLElement
   */
  function _getNativeElement(element) {
    element =  element[0] || element;

    if (element.nodeType) {
      return element;
    }
  }

}

})();
(function(){
"use strict";

/*
 * This var has to be outside the angular factory, otherwise when
 * there are multiple material apps on the same page, each app
 * will create its own instance of this array and the app's IDs
 * will not be unique.
 */
UtilFactory.$inject = ["$document", "$timeout", "$compile", "$rootScope", "$$mdAnimate", "$interpolate", "$log", "$rootElement", "$window", "$$rAF"];
var nextUniqueId = 0;

/**
 * @ngdoc module
 * @name material.core.util
 * @description
 * Util
 */
angular
  .module('material.core')
  .factory('$mdUtil', UtilFactory);

/**
 * @ngInject
 */
function UtilFactory($document, $timeout, $compile, $rootScope, $$mdAnimate, $interpolate, $log, $rootElement, $window, $$rAF) {
  // Setup some core variables for the processTemplate method
  var startSymbol = $interpolate.startSymbol(),
    endSymbol = $interpolate.endSymbol(),
    usesStandardSymbols = ((startSymbol === '{{') && (endSymbol === '}}'));

  /**
   * Checks if the target element has the requested style by key
   * @param {DOMElement|JQLite} target Target element
   * @param {string} key Style key
   * @param {string=} expectedVal Optional expected value
   * @returns {boolean} Whether the target element has the style or not
   */
  var hasComputedStyle = function (target, key, expectedVal) {
    var hasValue = false;

    if ( target && target.length  ) {
      var computedStyles = $window.getComputedStyle(target[0]);
      hasValue = angular.isDefined(computedStyles[key]) && (expectedVal ? computedStyles[key] == expectedVal : true);
    }

    return hasValue;
  };

  function validateCssValue(value) {
    return !value       ? '0'   :
      hasPx(value) || hasPercent(value) ? value : value + 'px';
  }

  function hasPx(value) {
    return String(value).indexOf('px') > -1;
  }

  function hasPercent(value) {
    return String(value).indexOf('%') > -1;

  }

  var $mdUtil = {
    dom: {},
    now: window.performance && window.performance.now ?
      angular.bind(window.performance, window.performance.now) : Date.now || function() {
      return new Date().getTime();
    },

    /**
     * Cross-version compatibility method to retrieve an option of a ngModel controller,
     * which supports the breaking changes in the AngularJS snapshot (SHA 87a2ff76af5d0a9268d8eb84db5755077d27c84c).
     * @param {!angular.ngModelCtrl} ngModelCtrl
     * @param {!string} optionName
     * @returns {Object|undefined}
     */
    getModelOption: function (ngModelCtrl, optionName) {
      if (!ngModelCtrl.$options) {
        return;
      }

      var $options = ngModelCtrl.$options;

      // The newer versions of AngularJS introduced a `getOption function and made the option values no longer
      // visible on the $options object.
      return $options.getOption ? $options.getOption(optionName) : $options[optionName];
    },

    /**
     * Bi-directional accessor/mutator used to easily update an element's
     * property based on the current 'dir'ectional value.
     */
    bidi : function(element, property, lValue, rValue) {
      var ltr = !($document[0].dir == 'rtl' || $document[0].body.dir == 'rtl');

      // If accessor
      if ( arguments.length == 0 ) return ltr ? 'ltr' : 'rtl';

      // If mutator
      var elem = angular.element(element);

      if ( ltr && angular.isDefined(lValue)) {
        elem.css(property, validateCssValue(lValue));
      }
      else if ( !ltr && angular.isDefined(rValue)) {
        elem.css(property, validateCssValue(rValue) );
      }
    },

    bidiProperty: function (element, lProperty, rProperty, value) {
      var ltr = !($document[0].dir == 'rtl' || $document[0].body.dir == 'rtl');

      var elem = angular.element(element);

      if ( ltr && angular.isDefined(lProperty)) {
        elem.css(lProperty, validateCssValue(value));
        elem.css(rProperty, '');
      }
      else if ( !ltr && angular.isDefined(rProperty)) {
        elem.css(rProperty, validateCssValue(value) );
        elem.css(lProperty, '');
      }
    },

    clientRect: function(element, offsetParent, isOffsetRect) {
      var node = getNode(element);
      offsetParent = getNode(offsetParent || node.offsetParent || document.body);
      var nodeRect = node.getBoundingClientRect();

      // The user can ask for an offsetRect: a rect relative to the offsetParent,
      // or a clientRect: a rect relative to the page
      var offsetRect = isOffsetRect ?
        offsetParent.getBoundingClientRect() :
      {left: 0, top: 0, width: 0, height: 0};
      return {
        left: nodeRect.left - offsetRect.left,
        top: nodeRect.top - offsetRect.top,
        width: nodeRect.width,
        height: nodeRect.height
      };
    },
    offsetRect: function(element, offsetParent) {
      return $mdUtil.clientRect(element, offsetParent, true);
    },

    // Annoying method to copy nodes to an array, thanks to IE
    nodesToArray: function(nodes) {
      nodes = nodes || [];

      var results = [];
      for (var i = 0; i < nodes.length; ++i) {
        results.push(nodes.item(i));
      }
      return results;
    },

    /**
     * Determines the absolute position of the viewport.
     * Useful when making client rectangles absolute.
     * @returns {number}
     */
    getViewportTop: function() {
      return window.scrollY || window.pageYOffset || 0;
    },

    /**
     * Finds the proper focus target by searching the DOM.
     *
     * @param containerEl
     * @param attributeVal
     * @returns {*}
     */
    findFocusTarget: function(containerEl, attributeVal) {
      var AUTO_FOCUS = this.prefixer('md-autofocus', true);
      var elToFocus;

      elToFocus = scanForFocusable(containerEl, attributeVal || AUTO_FOCUS);

      if ( !elToFocus && attributeVal != AUTO_FOCUS) {
        // Scan for deprecated attribute
        elToFocus = scanForFocusable(containerEl, this.prefixer('md-auto-focus', true));

        if ( !elToFocus ) {
          // Scan for fallback to 'universal' API
          elToFocus = scanForFocusable(containerEl, AUTO_FOCUS);
        }
      }

      return elToFocus;

      /**
       * Can target and nested children for specified Selector (attribute)
       * whose value may be an expression that evaluates to True/False.
       */
      function scanForFocusable(target, selector) {
        var elFound, items = target[0].querySelectorAll(selector);

        // Find the last child element with the focus attribute
        if ( items && items.length ){
          items.length && angular.forEach(items, function(it) {
            it = angular.element(it);

            // Check the element for the md-autofocus class to ensure any associated expression
            // evaluated to true.
            var isFocusable = it.hasClass('md-autofocus');
            if (isFocusable) elFound = it;
          });
        }
        return elFound;
      }
    },

    /**
     * Disables scroll around the passed parent element.
     * @param element Unused
     * @param {!Element|!angular.JQLite} parent Element to disable scrolling within.
     *   Defaults to body if none supplied.
     * @param options Object of options to modify functionality
     *   - disableScrollMask Boolean of whether or not to create a scroll mask element or
     *     use the passed parent element.
     */
    disableScrollAround: function(element, parent, options) {
      options = options || {};

      $mdUtil.disableScrollAround._count = Math.max(0, $mdUtil.disableScrollAround._count || 0);
      $mdUtil.disableScrollAround._count++;

      if ($mdUtil.disableScrollAround._restoreScroll) {
        return $mdUtil.disableScrollAround._restoreScroll;
      }

      var body = $document[0].body;
      var restoreBody = disableBodyScroll();
      var restoreElement = disableElementScroll(parent);

      return $mdUtil.disableScrollAround._restoreScroll = function() {
        if (--$mdUtil.disableScrollAround._count <= 0) {
          restoreBody();
          restoreElement();
          delete $mdUtil.disableScrollAround._restoreScroll;
        }
      };

      /**
       * Creates a virtual scrolling mask to prevent touchmove, keyboard, scrollbar clicking,
       * and wheel events
       */
      function disableElementScroll(element) {
        element = angular.element(element || body);

        var scrollMask;

        if (options.disableScrollMask) {
          scrollMask = element;
        } else {
          scrollMask = angular.element(
            '<div class="md-scroll-mask">' +
            '  <div class="md-scroll-mask-bar"></div>' +
            '</div>');
          element.append(scrollMask);
        }

        scrollMask.on('wheel', preventDefault);
        scrollMask.on('touchmove', preventDefault);

        return function restoreElementScroll() {
          scrollMask.off('wheel');
          scrollMask.off('touchmove');

          if (!options.disableScrollMask && scrollMask[0].parentNode ) {
            scrollMask[0].parentNode.removeChild(scrollMask[0]);
          }
        };

        function preventDefault(e) {
          e.preventDefault();
        }
      }

      // Converts the body to a position fixed block and translate it to the proper scroll position
      function disableBodyScroll() {
        var documentElement = $document[0].documentElement;

        var prevDocumentStyle = documentElement.style.cssText || '';
        var prevBodyStyle = body.style.cssText || '';

        var viewportTop = $mdUtil.getViewportTop();
        var clientWidth = body.clientWidth;
        var hasVerticalScrollbar = body.scrollHeight > body.clientHeight + 1;

        // Scroll may be set on <html> element (for example by overflow-y: scroll)
        // but Chrome is reporting the scrollTop position always on <body>.
        // scrollElement will allow to restore the scrollTop position to proper target.
        var scrollElement = documentElement.scrollTop > 0 ? documentElement : body;

        if (hasVerticalScrollbar) {
          angular.element(body).css({
            position: 'fixed',
            width: '100%',
            top: -viewportTop + 'px'
          });
        }

        if (body.clientWidth < clientWidth) {
          body.style.overflow = 'hidden';
        }

        // This should be applied after the manipulation to the body, because
        // adding a scrollbar can potentially resize it, causing the measurement
        // to change.
        if (hasVerticalScrollbar) {
          documentElement.style.overflowY = 'scroll';
        }

        return function restoreScroll() {
          // Reset the inline style CSS to the previous.
          body.style.cssText = prevBodyStyle;
          documentElement.style.cssText = prevDocumentStyle;

          // The scroll position while being fixed
          scrollElement.scrollTop = viewportTop;
        };
      }

    },

    enableScrolling: function() {
      var restoreFn = this.disableScrollAround._restoreScroll;
      restoreFn && restoreFn();
    },

    floatingScrollbars: function() {
      if (this.floatingScrollbars.cached === undefined) {
        var tempNode = angular.element('<div><div></div></div>').css({
          width: '100%',
          'z-index': -1,
          position: 'absolute',
          height: '35px',
          'overflow-y': 'scroll'
        });
        tempNode.children().css('height', '60px');

        $document[0].body.appendChild(tempNode[0]);
        this.floatingScrollbars.cached = (tempNode[0].offsetWidth == tempNode[0].childNodes[0].offsetWidth);
        tempNode.remove();
      }
      return this.floatingScrollbars.cached;
    },

    // Mobile safari only allows you to set focus in click event listeners...
    forceFocus: function(element) {
      var node = element[0] || element;

      document.addEventListener('click', function focusOnClick(ev) {
        if (ev.target === node && ev.$focus) {
          node.focus();
          ev.stopImmediatePropagation();
          ev.preventDefault();
          node.removeEventListener('click', focusOnClick);
        }
      }, true);

      var newEvent = document.createEvent('MouseEvents');
      newEvent.initMouseEvent('click', false, true, window, {}, 0, 0, 0, 0,
        false, false, false, false, 0, null);
      newEvent.$material = true;
      newEvent.$focus = true;
      node.dispatchEvent(newEvent);
    },

    /**
     * facade to build md-backdrop element with desired styles
     * NOTE: Use $compile to trigger backdrop postLink function
     */
    createBackdrop: function(scope, addClass) {
      return $compile($mdUtil.supplant('<md-backdrop class="{0}">', [addClass]))(scope);
    },

    /**
     * supplant() method from Crockford's `Remedial Javascript`
     * Equivalent to use of $interpolate; without dependency on
     * interpolation symbols and scope. Note: the '{<token>}' can
     * be property names, property chains, or array indices.
     */
    supplant: function(template, values, pattern) {
      pattern = pattern || /\{([^{}]*)\}/g;
      return template.replace(pattern, function(a, b) {
        var p = b.split('.'),
          r = values;
        try {
          for (var s in p) {
            if (p.hasOwnProperty(s) ) {
              r = r[p[s]];
            }
          }
        } catch (e) {
          r = a;
        }
        return (typeof r === 'string' || typeof r === 'number') ? r : a;
      });
    },

    fakeNgModel: function() {
      return {
        $fake: true,
        $setTouched: angular.noop,
        $setViewValue: function(value) {
          this.$viewValue = value;
          this.$render(value);
          this.$viewChangeListeners.forEach(function(cb) {
            cb();
          });
        },
        $isEmpty: function(value) {
          return ('' + value).length === 0;
        },
        $parsers: [],
        $formatters: [],
        $viewChangeListeners: [],
        $render: angular.noop
      };
    },

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds.
    // @param wait Integer value of msecs to delay (since last debounce reset); default value 10 msecs
    // @param invokeApply should the $timeout trigger $digest() dirty checking
    debounce: function(func, wait, scope, invokeApply) {
      var timer;

      return function debounced() {
        var context = scope,
          args = Array.prototype.slice.call(arguments);

        $timeout.cancel(timer);
        timer = $timeout(function() {

          timer = undefined;
          func.apply(context, args);

        }, wait || 10, invokeApply);
      };
    },

    // Returns a function that can only be triggered every `delay` milliseconds.
    // In other words, the function will not be called unless it has been more
    // than `delay` milliseconds since the last call.
    throttle: function throttle(func, delay) {
      var recent;
      return function throttled() {
        var context = this;
        var args = arguments;
        var now = $mdUtil.now();

        if (!recent || (now - recent > delay)) {
          func.apply(context, args);
          recent = now;
        }
      };
    },

    /**
     * Measures the number of milliseconds taken to run the provided callback
     * function. Uses a high-precision timer if available.
     */
    time: function time(cb) {
      var start = $mdUtil.now();
      cb();
      return $mdUtil.now() - start;
    },

    /**
     * Create an implicit getter that caches its `getter()`
     * lookup value
     */
    valueOnUse : function (scope, key, getter) {
      var value = null, args = Array.prototype.slice.call(arguments);
      var params = (args.length > 3) ? args.slice(3) : [ ];

      Object.defineProperty(scope, key, {
        get: function () {
          if (value === null) value = getter.apply(scope, params);
          return value;
        }
      });
    },

    /**
     * Get a unique ID.
     *
     * @returns {string} an unique numeric string
     */
    nextUid: function() {
      return '' + nextUniqueId++;
    },

    // Stop watchers and events from firing on a scope without destroying it,
    // by disconnecting it from its parent and its siblings' linked lists.
    disconnectScope: function disconnectScope(scope) {
      if (!scope) return;

      // we can't destroy the root scope or a scope that has been already destroyed
      if (scope.$root === scope) return;
      if (scope.$$destroyed) return;

      var parent = scope.$parent;
      scope.$$disconnected = true;

      // See Scope.$destroy
      if (parent.$$childHead === scope) parent.$$childHead = scope.$$nextSibling;
      if (parent.$$childTail === scope) parent.$$childTail = scope.$$prevSibling;
      if (scope.$$prevSibling) scope.$$prevSibling.$$nextSibling = scope.$$nextSibling;
      if (scope.$$nextSibling) scope.$$nextSibling.$$prevSibling = scope.$$prevSibling;

      scope.$$nextSibling = scope.$$prevSibling = null;

    },

    // Undo the effects of disconnectScope above.
    reconnectScope: function reconnectScope(scope) {
      if (!scope) return;

      // we can't disconnect the root node or scope already disconnected
      if (scope.$root === scope) return;
      if (!scope.$$disconnected) return;

      var child = scope;

      var parent = child.$parent;
      child.$$disconnected = false;
      // See Scope.$new for this logic...
      child.$$prevSibling = parent.$$childTail;
      if (parent.$$childHead) {
        parent.$$childTail.$$nextSibling = child;
        parent.$$childTail = child;
      } else {
        parent.$$childHead = parent.$$childTail = child;
      }
    },

    /*
     * getClosest replicates jQuery.closest() to walk up the DOM tree until it finds a matching nodeName
     *
     * @param el Element to start walking the DOM from
     * @param check Either a string or a function. If a string is passed, it will be evaluated against
     * each of the parent nodes' tag name. If a function is passed, the loop will call it with each of
     * the parents and will use the return value to determine whether the node is a match.
     * @param onlyParent Only start checking from the parent element, not `el`.
     */
    getClosest: function getClosest(el, validateWith, onlyParent) {
      if ( angular.isString(validateWith) ) {
        var tagName = validateWith.toUpperCase();
        validateWith = function(el) {
          return el.nodeName.toUpperCase() === tagName;
        };
      }

      if (el instanceof angular.element) el = el[0];
      if (onlyParent) el = el.parentNode;
      if (!el) return null;

      do {
        if (validateWith(el)) {
          return el;
        }
      } while (el = el.parentNode);

      return null;
    },

    /**
     * Build polyfill for the Node.contains feature (if needed)
     */
    elementContains: function(node, child) {
      var hasContains = (window.Node && window.Node.prototype && Node.prototype.contains);
      var findFn = hasContains ? angular.bind(node, node.contains) : angular.bind(node, function(arg) {
        // compares the positions of two nodes and returns a bitmask
        return (node === child) || !!(this.compareDocumentPosition(arg) & 16);
      });

      return findFn(child);
    },

    /**
     * Functional equivalent for $element.filter(‘md-bottom-sheet’)
     * useful with interimElements where the element and its container are important...
     *
     * @param {[]} elements to scan
     * @param {string} name of node to find (e.g. 'md-dialog')
     * @param {boolean=} optional flag to allow deep scans; defaults to 'false'.
     * @param {boolean=} optional flag to enable log warnings; defaults to false
     */
    extractElementByName: function(element, nodeName, scanDeep, warnNotFound) {
      var found = scanTree(element);
      if (!found && !!warnNotFound) {
        $log.warn( $mdUtil.supplant("Unable to find node '{0}' in element '{1}'.",[nodeName, element[0].outerHTML]) );
      }

      return angular.element(found || element);

      /**
       * Breadth-First tree scan for element with matching `nodeName`
       */
      function scanTree(element) {
        return scanLevel(element) || (scanDeep ? scanChildren(element) : null);
      }

      /**
       * Case-insensitive scan of current elements only (do not descend).
       */
      function scanLevel(element) {
        if ( element ) {
          for (var i = 0, len = element.length; i < len; i++) {
            if (element[i].nodeName.toLowerCase() === nodeName) {
              return element[i];
            }
          }
        }
        return null;
      }

      /**
       * Scan children of specified node
       */
      function scanChildren(element) {
        var found;
        if ( element ) {
          for (var i = 0, len = element.length; i < len; i++) {
            var target = element[i];
            if ( !found ) {
              for (var j = 0, numChild = target.childNodes.length; j < numChild; j++) {
                found = found || scanTree([target.childNodes[j]]);
              }
            }
          }
        }
        return found;
      }

    },

    /**
     * Give optional properties with no value a boolean true if attr provided or false otherwise
     */
    initOptionalProperties: function(scope, attr, defaults) {
      defaults = defaults || {};
      angular.forEach(scope.$$isolateBindings, function(binding, key) {
        if (binding.optional && angular.isUndefined(scope[key])) {
          var attrIsDefined = angular.isDefined(attr[binding.attrName]);
          scope[key] = angular.isDefined(defaults[key]) ? defaults[key] : attrIsDefined;
        }
      });
    },

    /**
     * Alternative to $timeout calls with 0 delay.
     * nextTick() coalesces all calls within a single frame
     * to minimize $digest thrashing
     *
     * @param callback
     * @param digest
     * @returns {*}
     */
    nextTick: function(callback, digest, scope) {
      //-- grab function reference for storing state details
      var nextTick = $mdUtil.nextTick;
      var timeout = nextTick.timeout;
      var queue = nextTick.queue || [];

      //-- add callback to the queue
      queue.push({scope: scope, callback: callback});

      //-- set default value for digest
      if (digest == null) digest = true;

      //-- store updated digest/queue values
      nextTick.digest = nextTick.digest || digest;
      nextTick.queue = queue;

      //-- either return existing timeout or create a new one
      return timeout || (nextTick.timeout = $timeout(processQueue, 0, false));

      /**
       * Grab a copy of the current queue
       * Clear the queue for future use
       * Process the existing queue
       * Trigger digest if necessary
       */
      function processQueue() {
        var queue = nextTick.queue;
        var digest = nextTick.digest;

        nextTick.queue = [];
        nextTick.timeout = null;
        nextTick.digest = false;

        queue.forEach(function(queueItem) {
          var skip = queueItem.scope && queueItem.scope.$$destroyed;
          if (!skip) {
            queueItem.callback();
          }
        });

        if (digest) $rootScope.$digest();
      }
    },

    /**
     * Processes a template and replaces the start/end symbols if the application has
     * overridden them.
     *
     * @param template The template to process whose start/end tags may be replaced.
     * @returns {*}
     */
    processTemplate: function(template) {
      if (usesStandardSymbols) {
        return template;
      } else {
        if (!template || !angular.isString(template)) return template;
        return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
      }
    },

    /**
     * Scan up dom hierarchy for enabled parent;
     */
    getParentWithPointerEvents: function (element) {
      var parent = element.parent();

      // jqLite might return a non-null, but still empty, parent; so check for parent and length
      while (hasComputedStyle(parent, 'pointer-events', 'none')) {
        parent = parent.parent();
      }

      return parent;
    },

    getNearestContentElement: function (element) {
      var current = element.parent()[0];
      // Look for the nearest parent md-content, stopping at the rootElement.
      while (current && current !== $rootElement[0] && current !== document.body && current.nodeName.toUpperCase() !== 'MD-CONTENT') {
        current = current.parentNode;
      }
      return current;
    },

    /**
     * Checks if the current browser is natively supporting the `sticky` position.
     * @returns {string} supported sticky property name
     */
    checkStickySupport: function() {
      var stickyProp;
      var testEl = angular.element('<div>');
      $document[0].body.appendChild(testEl[0]);

      var stickyProps = ['sticky', '-webkit-sticky'];
      for (var i = 0; i < stickyProps.length; ++i) {
        testEl.css({
          position: stickyProps[i],
          top: 0,
          'z-index': 2
        });

        if (testEl.css('position') == stickyProps[i]) {
          stickyProp = stickyProps[i];
          break;
        }
      }

      testEl.remove();

      return stickyProp;
    },

    /**
     * Parses an attribute value, mostly a string.
     * By default checks for negated values and returns `false´ if present.
     * Negated values are: (native falsy) and negative strings like:
     * `false` or `0`.
     * @param value Attribute value which should be parsed.
     * @param negatedCheck When set to false, won't check for negated values.
     * @returns {boolean}
     */
    parseAttributeBoolean: function(value, negatedCheck) {
      return value === '' || !!value && (negatedCheck === false || value !== 'false' && value !== '0');
    },

    hasComputedStyle: hasComputedStyle,

    /**
     * Returns true if the parent form of the element has been submitted.
     *
     * @param element An AngularJS or HTML5 element.
     *
     * @returns {boolean}
     */
    isParentFormSubmitted: function(element) {
      var parent = $mdUtil.getClosest(element, 'form');
      var form = parent ? angular.element(parent).controller('form') : null;

      return form ? form.$submitted : false;
    },

    /**
     * Animate the requested element's scrollTop to the requested scrollPosition with basic easing.
     *
     * @param {!HTMLElement} element The element to scroll.
     * @param {number} scrollEnd The new/final scroll position.
     * @param {number=} duration Duration of the scroll. Default is 1000ms.
     */
    animateScrollTo: function(element, scrollEnd, duration) {
      var scrollStart = element.scrollTop;
      var scrollChange = scrollEnd - scrollStart;
      var scrollingDown = scrollStart < scrollEnd;
      var startTime = $mdUtil.now();

      $$rAF(scrollChunk);

      function scrollChunk() {
        var newPosition = calculateNewPosition();

        element.scrollTop = newPosition;

        if (scrollingDown ? newPosition < scrollEnd : newPosition > scrollEnd) {
          $$rAF(scrollChunk);
        }
      }

      function calculateNewPosition() {
        var easeDuration = duration || 1000;
        var currentTime = $mdUtil.now() - startTime;

        return ease(currentTime, scrollStart, scrollChange, easeDuration);
      }

      function ease(currentTime, start, change, duration) {
        // If the duration has passed (which can occur if our app loses focus due to $$rAF), jump
        // straight to the proper position
        if (currentTime > duration) {
          return start + change;
        }

        var ts = (currentTime /= duration) * currentTime;
        var tc = ts * currentTime;

        return start + change * (-2 * tc + 3 * ts);
      }
    },

    /**
     * Provides an easy mechanism for removing duplicates from an array.
     *
     *    var myArray = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
     *
     *    $mdUtil.uniq(myArray) => [1, 2, 3, 4]
     *
     * @param {array} array The array whose unique values should be returned.
     *
     * @returns {array} A copy of the array containing only unique values.
     */
    uniq: function(array) {
      if (!array) { return; }

      return array.filter(function(value, index, self) {
        return self.indexOf(value) === index;
      });
    }
  };


// Instantiate other namespace utility methods

  $mdUtil.dom.animator = $$mdAnimate($mdUtil);

  return $mdUtil;

  function getNode(el) {
    return el[0] || el;
  }

}

/*
 * Since removing jQuery from the demos, some code that uses `element.focus()` is broken.
 * We need to add `element.focus()`, because it's testable unlike `element[0].focus`.
 */

angular.element.prototype.focus = angular.element.prototype.focus || function() {
    if (this.length) {
      this[0].focus();
    }
    return this;
  };
angular.element.prototype.blur = angular.element.prototype.blur || function() {
    if (this.length) {
      this[0].blur();
    }
    return this;
  };

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.core.aria
 * @description
 * Aria Expectations for AngularJS Material components.
 */
MdAriaService.$inject = ["$$rAF", "$log", "$window", "$interpolate"];
angular
  .module('material.core')
  .provider('$mdAria', MdAriaProvider);

/**
 * @ngdoc service
 * @name $mdAriaProvider
 * @module material.core.aria
 *
 * @description
 *
 * Modify options of the `$mdAria` service, which will be used by most of the AngularJS Material
 * components.
 *
 * You are able to disable `$mdAria` warnings, by using the following markup.
 *
 * <hljs lang="js">
 *   app.config(function($mdAriaProvider) {
 *     // Globally disables all ARIA warnings.
 *     $mdAriaProvider.disableWarnings();
 *   });
 * </hljs>
 *
 */
function MdAriaProvider() {

  var config = {
    /** Whether we should show ARIA warnings in the console if labels are missing on the element */
    showWarnings: true
  };

  return {
    disableWarnings: disableWarnings,
    $get: ["$$rAF", "$log", "$window", "$interpolate", function($$rAF, $log, $window, $interpolate) {
      return MdAriaService.apply(config, arguments);
    }]
  };

  /**
   * @ngdoc method
   * @name $mdAriaProvider#disableWarnings
   * @description Disables all ARIA warnings generated by AngularJS Material.
   */
  function disableWarnings() {
    config.showWarnings = false;
  }
}

/*
 * @ngInject
 */
function MdAriaService($$rAF, $log, $window, $interpolate) {

  // Load the showWarnings option from the current context and store it inside of a scope variable,
  // because the context will be probably lost in some function calls.
  var showWarnings = this.showWarnings;

  return {
    expect: expect,
    expectAsync: expectAsync,
    expectWithText: expectWithText,
    expectWithoutText: expectWithoutText,
    getText: getText,
    hasAriaLabel: hasAriaLabel,
    parentHasAriaLabel: parentHasAriaLabel
  };

  /**
   * Check if expected attribute has been specified on the target element or child
   * @param element
   * @param attrName
   * @param {optional} defaultValue What to set the attr to if no value is found
   */
  function expect(element, attrName, defaultValue) {

    var node = angular.element(element)[0] || element;

    // if node exists and neither it nor its children have the attribute
    if (node &&
       ((!node.hasAttribute(attrName) ||
        node.getAttribute(attrName).length === 0) &&
        !childHasAttribute(node, attrName))) {

      defaultValue = angular.isString(defaultValue) ? defaultValue.trim() : '';
      if (defaultValue.length) {
        element.attr(attrName, defaultValue);
      } else if (showWarnings) {
        $log.warn('ARIA: Attribute "', attrName, '", required for accessibility, is missing on node:', node);
      }

    }
  }

  function expectAsync(element, attrName, defaultValueGetter) {
    // Problem: when retrieving the element's contents synchronously to find the label,
    // the text may not be defined yet in the case of a binding.
    // There is a higher chance that a binding will be defined if we wait one frame.
    $$rAF(function() {
        expect(element, attrName, defaultValueGetter());
    });
  }

  function expectWithText(element, attrName) {
    var content = getText(element) || "";
    var hasBinding = content.indexOf($interpolate.startSymbol()) > -1;

    if (hasBinding) {
      expectAsync(element, attrName, function() {
        return getText(element);
      });
    } else {
      expect(element, attrName, content);
    }
  }

  function expectWithoutText(element, attrName) {
    var content = getText(element);
    var hasBinding = content.indexOf($interpolate.startSymbol()) > -1;

    if ( !hasBinding && !content) {
      expect(element, attrName, content);
    }
  }

  function getText(element) {
    element = element[0] || element;
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    var text = '';

    var node;
    while (node = walker.nextNode()) {
      if (!isAriaHiddenNode(node)) {
        text += node.textContent;
      }
    }

    return text.trim() || '';

    function isAriaHiddenNode(node) {
      while (node.parentNode && (node = node.parentNode) !== element) {
        if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') {
          return true;
        }
      }
    }
  }

  function childHasAttribute(node, attrName) {
    var hasChildren = node.hasChildNodes(),
        hasAttr = false;

    function isHidden(el) {
      var style = el.currentStyle ? el.currentStyle : $window.getComputedStyle(el);
      return (style.display === 'none');
    }

    if (hasChildren) {
      var children = node.childNodes;
      for (var i=0; i < children.length; i++) {
        var child = children[i];
        if (child.nodeType === 1 && child.hasAttribute(attrName)) {
          if (!isHidden(child)) {
            hasAttr = true;
          }
        }
      }
    }
    return hasAttr;
  }

  /**
   * Check if expected element has aria label attribute
   * @param element
   */
  function hasAriaLabel(element) {
    var node = angular.element(element)[0] || element;

    /* Check if compatible node type (ie: not HTML Document node) */
    if (!node.hasAttribute) {
      return false;
    }

    /* Check label or description attributes */
    return node.hasAttribute('aria-label') || node.hasAttribute('aria-labelledby') || node.hasAttribute('aria-describedby');
  }

  /**
   * Check if expected element's parent has aria label attribute and has valid role and tagName
   * @param element
   * @param {optional} level Number of levels deep search should be performed
   */
  function parentHasAriaLabel(element, level) {
    level = level || 1;
    var node = angular.element(element)[0] || element;
    if (!node.parentNode) {
      return false;
    }
    if (performCheck(node.parentNode)) {
      return true;
    }
    level--;
    if (level) {
      return parentHasAriaLabel(node.parentNode, level);
    }
    return false;

    function performCheck(parentNode) {
      if (!hasAriaLabel(parentNode)) {
        return false;
      }
      /* Perform role blacklist check */
      if (parentNode.hasAttribute('role')) {
        switch(parentNode.getAttribute('role').toLowerCase()) {
          case 'command':
          case 'definition':
          case 'directory':
          case 'grid':
          case 'list':
          case 'listitem':
          case 'log':
          case 'marquee':
          case 'menu':
          case 'menubar':
          case 'note':
          case 'presentation':
          case 'separator':
          case 'scrollbar':
          case 'status':
          case 'tablist':
            return false;
        }
      }
      /* Perform tagName blacklist check */
      switch(parentNode.tagName.toLowerCase()) {
        case 'abbr':
        case 'acronym':
        case 'address':
        case 'applet':
        case 'audio':
        case 'b':
        case 'bdi':
        case 'bdo':
        case 'big':
        case 'blockquote':
        case 'br':
        case 'canvas':
        case 'caption':
        case 'center':
        case 'cite':
        case 'code':
        case 'col':
        case 'data':
        case 'dd':
        case 'del':
        case 'dfn':
        case 'dir':
        case 'div':
        case 'dl':
        case 'em':
        case 'embed':
        case 'fieldset':
        case 'figcaption':
        case 'font':
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'hgroup':
        case 'html':
        case 'i':
        case 'ins':
        case 'isindex':
        case 'kbd':
        case 'keygen':
        case 'label':
        case 'legend':
        case 'li':
        case 'map':
        case 'mark':
        case 'menu':
        case 'object':
        case 'ol':
        case 'output':
        case 'pre':
        case 'presentation':
        case 'q':
        case 'rt':
        case 'ruby':
        case 'samp':
        case 'small':
        case 'source':
        case 'span':
        case 'status':
        case 'strike':
        case 'strong':
        case 'sub':
        case 'sup':
        case 'svg':
        case 'tbody':
        case 'td':
        case 'th':
        case 'thead':
        case 'time':
        case 'tr':
        case 'track':
        case 'tt':
        case 'ul':
        case 'var':
          return false;
      }
      return true;
    }
  }
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.core.compiler
 * @description
 * AngularJS Material template and element compiler.
 */
angular
  .module('material.core')
  .provider('$mdCompiler', MdCompilerProvider);

/**
 * @ngdoc service
 * @name $mdCompilerProvider
 * @module material.core.compiler
 * @description
 * The `$mdCompiler` is able to respect the AngularJS `$compileProvider.preAssignBindingsEnabled`
 * state when using AngularJS versions greater than or equal to 1.5.10 and less than 1.7.0.
 * See the [AngularJS documentation for `$compileProvider.preAssignBindingsEnabled`
 * ](https://code.angularjs.org/1.6.10/docs/api/ng/provider/$compileProvider#preAssignBindingsEnabled)
 * for more information.
 *
 * To enable/disable whether the controllers of dynamic AngularJS Material components
 * (i.e. dialog, panel, toast, bottomsheet) respect the AngularJS
 * `$compileProvider.preAssignBindingsEnabled` flag, call the AngularJS Material method:
 * `$mdCompilerProvider.respectPreAssignBindingsEnabled(boolean)`.
 *
 * This AngularJS Material *flag* doesn't affect directives/components created via regular
 * AngularJS methods. These constitute the majority of AngularJS Material and user-created
 * components. Only dynamic construction of elements such as Dialogs, Panels, Toasts, BottomSheets,
 * etc. may be affected. Invoking `$mdCompilerProvider.respectPreAssignBindingsEnabled(true)`
 * will effect **bindings** in controllers created by AngularJS Material's services like
 * `$mdDialog`, `$mdPanel`, `$mdToast`, or `$mdBottomSheet`.
 *
 * See [$mdCompilerProvider.respectPreAssignBindingsEnabled](#mdcompilerprovider-respectpreassignbindingsenabled-respected)
 * for the details of how the different versions and settings of AngularJS affect this behavior.
 *
 * @usage
 *
 * Respect the AngularJS Compiler Setting
 *
 * <hljs lang="js">
 *   app.config(function($mdCompilerProvider) {
 *     $mdCompilerProvider.respectPreAssignBindingsEnabled(true);
 *   });
 * </hljs>
 *
 * @example
 * Using the default (backwards compatible) values for AngularJS 1.6
 * - AngularJS' `$compileProvider.preAssignBindingsEnabled(false)`
 * - AngularJS Material's `$mdCompilerProvider.respectPreAssignBindingsEnabled(false)`
 * <br><br>
 *
 * <hljs lang="js">
 * $mdDialog.show({
 *   locals: {
 *     myVar: true
 *   },
 *   controller: MyController,
 *   bindToController: true
 * }
 *
 * function MyController() {
 *   // Locals from Angular Material are available. e.g myVar is true.
 * }
 *
 * MyController.prototype.$onInit = function() {
 *   // Bindings are also available in the $onInit lifecycle hook.
 * }
 * </hljs>
 *
 * Recommended Settings for AngularJS 1.6
 * - AngularJS' `$compileProvider.preAssignBindingsEnabled(false)`
 * - AngularJS Material's `$mdCompilerProvider.respectPreAssignBindingsEnabled(true)`
 * <br><br>
 *
 * <hljs lang="js">
 * $mdDialog.show({
 *   locals: {
 *     myVar: true
 *   },
 *   controller: MyController,
 *   bindToController: true
 * }
 *
 * function MyController() {
 *   // No locals from Angular Material are available. e.g myVar is undefined.
 * }
 *
 * MyController.prototype.$onInit = function() {
 *   // Bindings are now available in the $onInit lifecycle hook.
 * }
 * </hljs>
 *
 */
MdCompilerProvider.$inject = ['$compileProvider'];
function MdCompilerProvider($compileProvider) {

  var provider = this;

  /**
   * @ngdoc method
   * @name $mdCompilerProvider#respectPreAssignBindingsEnabled
   *
   * @param {boolean=} respected update the `respectPreAssignBindingsEnabled` state if provided,
   *  otherwise just return the current Material `respectPreAssignBindingsEnabled` state.
   * @returns {boolean|MdCompilerProvider} current value, if used as a getter, or itself (chaining)
   *  if used as a setter.
   *
   * @description
   * Call this method to enable/disable whether Material-specific (dialog/panel/toast/bottomsheet)
   * controllers respect the AngularJS `$compileProvider.preAssignBindingsEnabled` flag. Note that
   * this doesn't affect directives/components created via regular AngularJS methods which
   * constitute most Material and user-created components.
   *
   * If disabled (`false`), the compiler assigns the value of each of the bindings to the
   * properties of the controller object before the constructor of this object is called.
   * The ability to disable this settings is **deprecated** and will be removed in
   * AngularJS Material 1.2.0.
   *
   * If enabled (`true`) the behavior depends on the AngularJS version used:
   *
   * - `<1.5.10`
   *  - Bindings are pre-assigned.
   * - `>=1.5.10 <1.7`
   *  - Respects whatever `$compileProvider.preAssignBindingsEnabled()` reports. If the
   *    `preAssignBindingsEnabled` flag wasn't set manually, it defaults to pre-assigning bindings
   *    with AngularJS `1.5` and to calling the constructor first with AngularJS `1.6`.
   * - `>=1.7`
   *  - The compiler calls the constructor first before assigning bindings and
   *    `$compileProvider.preAssignBindingsEnabled()` no longer exists.
   *
   * Defaults
   * - The default value is `false` in AngularJS 1.6 and earlier.
   *  - It is planned to fix this value to `true` and not allow the `false` value in
   *    AngularJS Material 1.2.0.
   *
   * It is recommended to set this flag to `true` when using AngularJS Material 1.1.x with
   * AngularJS versions >= 1.5.10. The only reason it's not set that way by default is backwards
   * compatibility.
   *
   * By not setting the flag to `true` when AngularJS' `$compileProvider.preAssignBindingsEnabled()`
   * is set to `false` (i.e. default behavior in AngularJS 1.6 or newer), unit testing of
   * Material Dialog/Panel/Toast/BottomSheet controllers using the `$controller` helper
   * is problematic as it always follows AngularJS' `$compileProvider.preAssignBindingsEnabled()`
   * value.
   */
  var respectPreAssignBindingsEnabled = false;
  this.respectPreAssignBindingsEnabled = function(respected) {
    if (angular.isDefined(respected)) {
      respectPreAssignBindingsEnabled = respected;
      return this;
    }

    return respectPreAssignBindingsEnabled;
  };

  /**
   * @private
   * @description
   * This function returns `true` if AngularJS Material-specific (dialog/panel/toast/bottomsheet)
   * controllers have bindings pre-assigned in controller constructors and `false` otherwise.
   *
   * Note that this doesn't affect directives/components created via regular AngularJS methods
   * which constitute most Material and user-created components; their behavior can be checked via
   * `$compileProvider.preAssignBindingsEnabled()` in AngularJS `>=1.5.10 <1.7.0`.
   *
   * @returns {*} current preAssignBindingsEnabled state
   */
  function getPreAssignBindingsEnabled() {
    if (!respectPreAssignBindingsEnabled) {
      // respectPreAssignBindingsEnabled === false
      // We're ignoring the AngularJS `$compileProvider.preAssignBindingsEnabled()` value in this case.
      return true;
    }

    // respectPreAssignBindingsEnabled === true

    // This check is needed because $compileProvider.preAssignBindingsEnabled does not exist prior
    // to AngularJS 1.5.10, is deprecated in AngularJS 1.6.x, and removed in AngularJS 1.7.x.
    if (typeof $compileProvider.preAssignBindingsEnabled === 'function') {
      return $compileProvider.preAssignBindingsEnabled();
    }

    // Flag respected but not present => apply logic based on AngularJS version used.
    if (angular.version.major === 1 && angular.version.minor < 6) {
      // AngularJS <1.5.10
      return true;
    }

    // AngularJS >=1.7.0
    return false;
  }

  this.$get = ["$q", "$templateRequest", "$injector", "$compile", "$controller",
    function($q, $templateRequest, $injector, $compile, $controller) {
      return new MdCompilerService($q, $templateRequest, $injector, $compile, $controller);
    }];

  /**
   * @ngdoc service
   * @name $mdCompiler
   * @module material.core.compiler
   * @description
   * The $mdCompiler service is an abstraction of AngularJS's compiler, that allows developers
   * to easily compile an element with options like in a Directive Definition Object.
   *
   * > The compiler powers a lot of components inside of AngularJS Material.
   * > Like the `$mdPanel` or `$mdDialog`.
   *
   * @usage
   *
   * Basic Usage with a template
   *
   * <hljs lang="js">
   *   $mdCompiler.compile({
   *     templateUrl: 'modal.html',
   *     controller: 'ModalCtrl',
   *     locals: {
   *       modal: myModalInstance;
   *     }
   *   }).then(function (compileData) {
   *     compileData.element; // Compiled DOM element
   *     compileData.link(myScope); // Instantiate controller and link element to scope.
   *   });
   * </hljs>
   *
   * Example with a content element
   *
   * <hljs lang="js">
   *
   *   // Create a virtual element and link it manually.
   *   // The compiler doesn't need to recompile the element each time.
   *   var myElement = $compile('<span>Test</span>')(myScope);
   *
   *   $mdCompiler.compile({
   *     contentElement: myElement
   *   }).then(function (compileData) {
   *     compileData.element // Content Element (same as above)
   *     compileData.link // This does nothing when using a contentElement.
   *   });
   * </hljs>
   *
   * > Content Element is a significant performance improvement when the developer already knows that the
   * > compiled element will be always the same and the scope will not change either.
   *
   * The `contentElement` option also supports DOM elements which will be temporary removed and restored
   * at its old position.
   *
   * <hljs lang="js">
   *   var domElement = document.querySelector('#myElement');
   *
   *   $mdCompiler.compile({
   *     contentElement: myElement
   *   }).then(function (compileData) {
   *     compileData.element // Content Element (same as above)
   *     compileData.link // This does nothing when using a contentElement.
   *   });
   * </hljs>
   *
   * The `$mdCompiler` can also query for the element in the DOM itself.
   *
   * <hljs lang="js">
   *   $mdCompiler.compile({
   *     contentElement: '#myElement'
   *   }).then(function (compileData) {
   *     compileData.element // Content Element (same as above)
   *     compileData.link // This does nothing when using a contentElement.
   *   });
   * </hljs>
   *
   */
  function MdCompilerService($q, $templateRequest, $injector, $compile, $controller) {

    /** @private @const {!angular.$q} */
    this.$q = $q;

    /** @private @const {!angular.$templateRequest} */
    this.$templateRequest = $templateRequest;

    /** @private @const {!angular.$injector} */
    this.$injector = $injector;

    /** @private @const {!angular.$compile} */
    this.$compile = $compile;

    /** @private @const {!angular.$controller} */
    this.$controller = $controller;
  }

  /**
   * @ngdoc method
   * @name $mdCompiler#compile
   * @description
   *
   * A method to compile a HTML template with the AngularJS compiler.
   * The `$mdCompiler` is wrapper around the AngularJS compiler and provides extra functionality
   * like controller instantiation or async resolves.
   *
   * @param {!Object} options An options object, with the following properties:
   *
   *    - `controller` - `{string|function}` Controller fn that should be associated with
   *         newly created scope or the name of a registered controller if passed as a string.
   *    - `controllerAs` - `{string=}` A controller alias name. If present the controller will be
   *         published to scope under the `controllerAs` name.
   *    - `contentElement` - `{string|Element}`: Instead of using a template, which will be
   *         compiled each time, you can also use a DOM element.<br/>
   *    - `template` - `{string=}` An html template as a string.
   *    - `templateUrl` - `{string=}` A path to an html template.
   *    - `transformTemplate` - `{function(template)=}` A function which transforms the template after
   *        it is loaded. It will be given the template string as a parameter, and should
   *        return a a new string representing the transformed template.
   *    - `resolve` - `{Object.<string, function>=}` - An optional map of dependencies which should
   *        be injected into the controller. If any of these dependencies are promises, the compiler
   *        will wait for them all to be resolved, or if one is rejected before the controller is
   *        instantiated `compile()` will fail..
   *      * `key` - `{string}`: a name of a dependency to be injected into the controller.
   *      * `factory` - `{string|function}`: If `string` then it is an alias for a service.
   *        Otherwise if function, then it is injected and the return value is treated as the
   *        dependency. If the result is a promise, it is resolved before its value is
   *        injected into the controller.
   *
   * @returns {Object} promise A promise, which will be resolved with a `compileData` object.
   * `compileData` has the following properties:
   *
   *   - `element` - `{Element}`: an uncompiled element matching the provided template.
   *   - `link` - `{function(scope)}`: A link function, which, when called, will compile
   *     the element and instantiate the provided controller (if given).
   *   - `locals` - `{Object}`: The locals which will be passed into the controller once `link` is
   *     called. If `bindToController` is true, they will be copied to the ctrl instead
   */
  MdCompilerService.prototype.compile = function(options) {

    if (options.contentElement) {
      return this._prepareContentElement(options);
    } else {
      return this._compileTemplate(options);
    }

  };

  /**
   * Instead of compiling any template, the compiler just fetches an existing HTML element from the DOM and
   * provides a restore function to put the element back it old DOM position.
   * @param {!Object} options Options to be used for the compiler.
   */
  MdCompilerService.prototype._prepareContentElement = function(options) {

    var contentElement = this._fetchContentElement(options);

    return this.$q.resolve({
      element: contentElement.element,
      cleanup: contentElement.restore,
      locals: {},
      link: function() {
        return contentElement.element;
      }
    });

  };

  /**
   * Compiles a template by considering all options and waiting for all resolves to be ready.
   * @param {!Object} options Compile options
   * @returns {!Object} Compile data with link function.
   */
  MdCompilerService.prototype._compileTemplate = function(options) {

    var self = this;
    var templateUrl = options.templateUrl;
    var template = options.template || '';
    var resolve = angular.extend({}, options.resolve);
    var locals = angular.extend({}, options.locals);
    var transformTemplate = options.transformTemplate || angular.identity;

    // Take resolve values and invoke them.
    // Resolves can either be a string (value: 'MyRegisteredAngularConst'),
    // or an invokable 'factory' of sorts: (value: function ValueGetter($dependency) {})
    angular.forEach(resolve, function(value, key) {
      if (angular.isString(value)) {
        resolve[key] = self.$injector.get(value);
      } else {
        resolve[key] = self.$injector.invoke(value);
      }
    });

    // Add the locals, which are just straight values to inject
    // eg locals: { three: 3 }, will inject three into the controller
    angular.extend(resolve, locals);

    if (templateUrl) {
      resolve.$$ngTemplate = this.$templateRequest(templateUrl);
    } else {
      resolve.$$ngTemplate = this.$q.when(template);
    }


    // Wait for all the resolves to finish if they are promises
    return this.$q.all(resolve).then(function(locals) {

      var template = transformTemplate(locals.$$ngTemplate, options);
      var element = options.element || angular.element('<div>').html(template.trim()).contents();

      return self._compileElement(locals, element, options);
    });

  };

  /**
   * Method to compile an element with the given options.
   * @param {!Object} locals Locals to be injected to the controller if present
   * @param {!JQLite} element Element to be compiled and linked
   * @param {!Object} options Options to be used for linking.
   * @returns {!Object} Compile data with link function.
   */
  MdCompilerService.prototype._compileElement = function(locals, element, options) {
    var self = this;
    var ngLinkFn = this.$compile(element);

    var compileData = {
      element: element,
      cleanup: element.remove.bind(element),
      locals: locals,
      link: linkFn
    };

    function linkFn(scope) {
      locals.$scope = scope;

      // Instantiate controller if the developer provided one.
      if (options.controller) {

        var injectLocals = angular.extend({}, locals, {
          $element: element
        });

        // Create the specified controller instance.
        var ctrl = self._createController(options, injectLocals, locals);

        // Unique identifier for AngularJS Route ngView controllers.
        element.data('$ngControllerController', ctrl);
        element.children().data('$ngControllerController', ctrl);

        // Expose the instantiated controller to the compile data
        compileData.controller = ctrl;
      }

      // Invoke the AngularJS $compile link function.
      return ngLinkFn(scope);
    }

    return compileData;

  };

  /**
   * Creates and instantiates a new controller with the specified options.
   * @param {!Object} options Options that include the controller function or string.
   * @param {!Object} injectLocals Locals to to be provided in the controller DI.
   * @param {!Object} locals Locals to be injected to the controller.
   * @returns {!Object} Created controller instance.
   */
  MdCompilerService.prototype._createController = function(options, injectLocals, locals) {
    var ctrl;
    var preAssignBindingsEnabled = getPreAssignBindingsEnabled();
    // The third argument to $controller is considered private and undocumented:
    // https://github.com/angular/angular.js/blob/v1.6.10/src/ng/controller.js#L102-L109.
    // TODO remove the use of this third argument in AngularJS Material 1.2.0.
    // Passing `true` as the third argument causes `$controller` to return a function that
    // gets the controller instance instead of returning the instance directly. When the
    // controller is defined as a function, `invokeCtrl.instance` is the *same instance* as
    // `invokeCtrl()`. However, when the controller is an ES6 class, `invokeCtrl.instance` is a
    // *different instance* from `invokeCtrl()`.
    if (preAssignBindingsEnabled) {
      var invokeCtrl = this.$controller(options.controller, injectLocals, true);

      if (options.bindToController) {
        angular.extend(invokeCtrl.instance, locals);
      }

      // Use the private API callback to instantiate and initialize the specified controller.
      ctrl = invokeCtrl();
    } else {
      // If we don't need to pre-assign bindings, avoid using the private API third argument and
      // related callback.
      ctrl = this.$controller(options.controller, injectLocals);

      if (options.bindToController) {
        angular.extend(ctrl, locals);
      }
    }

    if (options.controllerAs) {
      injectLocals.$scope[options.controllerAs] = ctrl;
    }

    // Call the $onInit hook if it's present on the controller.
    angular.isFunction(ctrl.$onInit) && ctrl.$onInit();

    return ctrl;
  };

  /**
   * Fetches an element removing it from the DOM and using it temporary for the compiler.
   * Elements which were fetched will be restored after use.
   * @param {!Object} options Options to be used for the compilation.
   * @returns {{element: !JQLite, restore: !function}}
   */
  MdCompilerService.prototype._fetchContentElement = function(options) {

    var contentEl = options.contentElement;
    var restoreFn = null;

    if (angular.isString(contentEl)) {
      contentEl = document.querySelector(contentEl);
      restoreFn = createRestoreFn(contentEl);
    } else {
      contentEl = contentEl[0] || contentEl;

      // When the element is visible in the DOM, then we restore it at close of the dialog.
      // Otherwise it will be removed from the DOM after close.
      if (document.contains(contentEl)) {
        restoreFn = createRestoreFn(contentEl);
      } else {
        restoreFn = function() {
          if (contentEl.parentNode) {
            contentEl.parentNode.removeChild(contentEl);
          }
        };
      }
    }

    return {
      element: angular.element(contentEl),
      restore: restoreFn
    };

    function createRestoreFn(element) {
      var parent = element.parentNode;
      var nextSibling = element.nextElementSibling;

      return function() {
        if (!nextSibling) {
          // When the element didn't had any sibling, then it can be simply appended to the
          // parent, because it plays no role, which index it had before.
          parent.appendChild(element);
        } else {
          // When the element had a sibling, which marks the previous position of the element
          // in the DOM, we insert it correctly before the sibling, to have the same index as
          // before.
          parent.insertBefore(element, nextSibling);
        }
      };
    }
  };
}


})();
(function(){
"use strict";


MdGesture.$inject = ["$$MdGestureHandler", "$$rAF", "$timeout"];
attachToDocument.$inject = ["$mdGesture", "$$MdGestureHandler"];var HANDLERS = {};

/* The state of the current 'pointer'
 * The pointer represents the state of the current touch.
 * It contains normalized x and y coordinates from DOM events,
 * as well as other information abstracted from the DOM.
 */

var pointer, lastPointer, forceSkipClickHijack = false, maxClickDistance = 6;

/**
 * The position of the most recent click if that click was on a label element.
 * @type {{x: number, y: number}?}
 */
var lastLabelClickPos = null;

// Used to attach event listeners once when multiple ng-apps are running.
var isInitialized = false;

angular
    .module('material.core.gestures', [ ])
    .provider('$mdGesture', MdGestureProvider)
    .factory('$$MdGestureHandler', MdGestureHandler)
    .run(attachToDocument );

/**
 * @ngdoc service
 * @name $mdGestureProvider
 * @module material.core.gestures
 *
 * @description
 * In some scenarios on Mobile devices (without jQuery), the click events should NOT be hijacked.
 * `$mdGestureProvider` is used to configure the Gesture module to ignore or skip click hijacking on mobile
 * devices.
 * You can also change max click distance (6px by default) if you have issues on some touch screens.
 *
 * <hljs lang="js">
 *   app.config(function($mdGestureProvider) {
   *
   *     // For mobile devices without jQuery loaded, do not
   *     // intercept click events during the capture phase.
   *     $mdGestureProvider.skipClickHijack();
   *
   *     // If hijcacking clicks, change default 6px click distance
   *     $mdGestureProvider.setMaxClickDistance(12);
   *
   *   });
 * </hljs>
 *
 */
function MdGestureProvider() { }

MdGestureProvider.prototype = {

    // Publish access to setter to configure a variable  BEFORE the
    // $mdGesture service is instantiated...
    skipClickHijack: function() {
        return forceSkipClickHijack = true;
    },

    setMaxClickDistance: function(clickDistance) {
        maxClickDistance = parseInt(clickDistance);
    },

    /**
     * $get is used to build an instance of $mdGesture
     * @ngInject
     */
    $get : ["$$MdGestureHandler", "$$rAF", "$timeout", function($$MdGestureHandler, $$rAF, $timeout) {
        return new MdGesture($$MdGestureHandler, $$rAF, $timeout);
    }]
};



/**
 * MdGesture factory construction function
 * @ngInject
 */
function MdGesture($$MdGestureHandler, $$rAF, $timeout) {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var isIos = userAgent.match(/ipad|iphone|ipod/i);
    var isAndroid = userAgent.match(/android/i);
    var touchActionProperty = getTouchAction();
    var hasJQuery =  (typeof window.jQuery !== 'undefined') && (angular.element === window.jQuery);

    if (window.Hammer) {
        var self = {
            handler: function () {
                return function () {};
            },
            register: function () {
                return function () {};
            },
            // On mobile w/out jQuery, we normally intercept clicks. Should we skip that?
            isHijackingClicks: (isIos || isAndroid) && !hasJQuery && !forceSkipClickHijack
        };
    } else {
        var self = {
            handler: addHandler,
            register: register,
            // On mobile w/out jQuery, we normally intercept clicks. Should we skip that?
            isHijackingClicks: (isIos || isAndroid) && !hasJQuery && !forceSkipClickHijack
        };
    }

    if (window.Hammer) {
        return self;
    }

    if (self.isHijackingClicks) {
        self.handler('click', {
            options: {
                maxDistance: maxClickDistance
            },
            onEnd: checkDistanceAndEmit('click')
        });

        self.handler('focus', {
            options: {
                maxDistance: maxClickDistance
            },
            onEnd: function(ev, pointer) {
                if (pointer.distance < this.state.options.maxDistance && canFocus(ev.target)) {
                    this.dispatchEvent(ev, 'focus', pointer);
                    ev.target.focus();
                }
            }
        });

        self.handler('mouseup', {
            options: {
                maxDistance: maxClickDistance
            },
            onEnd: checkDistanceAndEmit('mouseup')
        });

        self.handler('mousedown', {
            onStart: function(ev) {
                this.dispatchEvent(ev, 'mousedown');
            }
        });
    }

    function checkDistanceAndEmit(eventName) {
        return function(ev, pointer) {
            if (pointer.distance < this.state.options.maxDistance) {
                this.dispatchEvent(ev, eventName, pointer);
            }
        };
    }

    /*
     * Register an element to listen for a handler.
     * This allows an element to override the default options for a handler.
     * Additionally, some handlers like drag and hold only dispatch events if
     * the domEvent happens inside an element that's registered to listen for these events.
     *
     * @see GestureHandler for how overriding of default options works.
     * @example $mdGesture.register(myElement, 'drag', { minDistance: 20, horziontal: false })
     */
    function register(element, handlerName, options) {
        var handler = HANDLERS[handlerName.replace(/^\$md./, '')];
        if (!handler) {
            throw new Error('Failed to register element with handler ' + handlerName + '. ' +
                'Available handlers: ' + Object.keys(HANDLERS).join(', '));
        }
        return handler.registerElement(element, options);
    }

    /*
     * add a handler to $mdGesture. see below.
     */
    function addHandler(name, definition) {
        var handler = new $$MdGestureHandler(name);
        angular.extend(handler, definition);
        HANDLERS[name] = handler;

        return self;
    }

    /*
     * Register handlers. These listen to touch/start/move events, interpret them,
     * and dispatch gesture events depending on options & conditions. These are all
     * instances of GestureHandler.
     * @see GestureHandler
     */
    return self
    /*
     * The press handler dispatches an event on touchdown/touchend.
     * It's a simple abstraction of touch/mouse/pointer start and end.
     */
        .handler('press', {
            onStart: function (ev, pointer) {
                this.dispatchEvent(ev, '$md.pressdown');
            },
            onEnd: function (ev, pointer) {
                this.dispatchEvent(ev, '$md.pressup');
            }
        })

        /*
         * The hold handler dispatches an event if the user keeps their finger within
         * the same <maxDistance> area for <delay> ms.
         * The hold handler will only run if a parent of the touch target is registered
         * to listen for hold events through $mdGesture.register()
         */
        .handler('hold', {
            options: {
                maxDistance: 6,
                delay: 500
            },
            onCancel: function () {
                $timeout.cancel(this.state.timeout);
            },
            onStart: function (ev, pointer) {
                // For hold, require a parent to be registered with $mdGesture.register()
                // Because we prevent scroll events, this is necessary.
                if (!this.state.registeredParent) return this.cancel();

                this.state.pos = {x: pointer.x, y: pointer.y};
                this.state.timeout = $timeout(angular.bind(this, function holdDelayFn() {
                    this.dispatchEvent(ev, '$md.hold');
                    this.cancel(); //we're done!
                }), this.state.options.delay, false);
            },
            onMove: function (ev, pointer) {
                // Don't scroll while waiting for hold.
                // If we don't preventDefault touchmove events here, Android will assume we don't
                // want to listen to anymore touch events. It will start scrolling and stop sending
                // touchmove events.
                if (!touchActionProperty && ev.type === 'touchmove') ev.preventDefault();

                // If the user moves greater than <maxDistance> pixels, stop the hold timer
                // set in onStart
                var dx = this.state.pos.x - pointer.x;
                var dy = this.state.pos.y - pointer.y;
                if (Math.sqrt(dx * dx + dy * dy) > this.options.maxDistance) {
                    this.cancel();
                }
            },
            onEnd: function () {
                this.onCancel();
            }
        })

        /*
         * The drag handler dispatches a drag event if the user holds and moves his finger greater than
         * <minDistance> px in the x or y direction, depending on options.horizontal.
         * The drag will be cancelled if the user moves his finger greater than <minDistance>*<cancelMultiplier> in
         * the perpendicular direction. Eg if the drag is horizontal and the user moves his finger <minDistance>*<cancelMultiplier>
         * pixels vertically, this handler won't consider the move part of a drag.
         */
        .handler('drag', {
            options: {
                minDistance: 6,
                horizontal: true,
                cancelMultiplier: 1.5
            },
            onSetup: function(element, options) {
                if (touchActionProperty) {
                    // We check for horizontal to be false, because otherwise we would overwrite the default opts.
                    this.oldTouchAction = element[0].style[touchActionProperty];
                    element[0].style[touchActionProperty] = options.horizontal ? 'pan-y' : 'pan-x';
                }
            },
            onCleanup: function(element) {
                if (this.oldTouchAction) {
                    element[0].style[touchActionProperty] = this.oldTouchAction;
                }
            },
            onStart: function (ev) {
                // For drag, require a parent to be registered with $mdGesture.register()
                if (!this.state.registeredParent) this.cancel();
            },
            onMove: function (ev, pointer) {
                var shouldStartDrag, shouldCancel;
                // Don't scroll while deciding if this touchmove qualifies as a drag event.
                // If we don't preventDefault touchmove events here, Android will assume we don't
                // want to listen to anymore touch events. It will start scrolling and stop sending
                // touchmove events.
                if (!touchActionProperty && ev.type === 'touchmove') ev.preventDefault();

                if (!this.state.dragPointer) {
                    if (this.state.options.horizontal) {
                        shouldStartDrag = Math.abs(pointer.distanceX) > this.state.options.minDistance;
                        shouldCancel = Math.abs(pointer.distanceY) > this.state.options.minDistance * this.state.options.cancelMultiplier;
                    } else {
                        shouldStartDrag = Math.abs(pointer.distanceY) > this.state.options.minDistance;
                        shouldCancel = Math.abs(pointer.distanceX) > this.state.options.minDistance * this.state.options.cancelMultiplier;
                    }

                    if (shouldStartDrag) {
                        // Create a new pointer representing this drag, starting at this point where the drag started.
                        this.state.dragPointer = makeStartPointer(ev);
                        updatePointerState(ev, this.state.dragPointer);
                        this.dispatchEvent(ev, '$md.dragstart', this.state.dragPointer);

                    } else if (shouldCancel) {
                        this.cancel();
                    }
                } else {
                    this.dispatchDragMove(ev);
                }
            },
            // Only dispatch dragmove events every frame; any more is unnecessary
            dispatchDragMove: $$rAF.throttle(function (ev) {
                // Make sure the drag didn't stop while waiting for the next frame
                if (this.state.isRunning) {
                    updatePointerState(ev, this.state.dragPointer);
                    this.dispatchEvent(ev, '$md.drag', this.state.dragPointer);
                }
            }),
            onEnd: function (ev, pointer) {
                if (this.state.dragPointer) {
                    updatePointerState(ev, this.state.dragPointer);
                    this.dispatchEvent(ev, '$md.dragend', this.state.dragPointer);
                }
            }
        })

        /*
         * The swipe handler will dispatch a swipe event if, on the end of a touch,
         * the velocity and distance were high enough.
         */
        .handler('swipe', {
            options: {
                minVelocity: 0.65,
                minDistance: 10
            },
            onEnd: function (ev, pointer) {
                var eventType;

                if (Math.abs(pointer.velocityX) > this.state.options.minVelocity &&
                    Math.abs(pointer.distanceX) > this.state.options.minDistance) {
                    eventType = pointer.directionX == 'left' ? '$md.swipeleft' : '$md.swiperight';
                    this.dispatchEvent(ev, eventType);
                }
                else if (Math.abs(pointer.velocityY) > this.state.options.minVelocity &&
                    Math.abs(pointer.distanceY) > this.state.options.minDistance) {
                    eventType = pointer.directionY == 'up' ? '$md.swipeup' : '$md.swipedown';
                    this.dispatchEvent(ev, eventType);
                }
            }
        });

    function getTouchAction() {
        var testEl = document.createElement('div');
        var vendorPrefixes = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];

        for (var i = 0; i < vendorPrefixes.length; i++) {
            var prefix = vendorPrefixes[i];
            var property = prefix ? prefix + 'TouchAction' : 'touchAction';
            if (angular.isDefined(testEl.style[property])) {
                return property;
            }
        }
    }

}

/**
 * MdGestureHandler
 * A GestureHandler is an object which is able to dispatch custom dom events
 * based on native dom {touch,pointer,mouse}{start,move,end} events.
 *
 * A gesture will manage its lifecycle through the start,move,end, and cancel
 * functions, which are called by native dom events.
 *
 * A gesture has the concept of 'options' (eg a swipe's required velocity), which can be
 * overridden by elements registering through $mdGesture.register()
 */
function GestureHandler (name) {
    this.name = name;
    this.state = {};
}

function MdGestureHandler() {
    var hasJQuery =  (typeof window.jQuery !== 'undefined') && (angular.element === window.jQuery);

    GestureHandler.prototype = {
        options: {},
        // jQuery listeners don't work with custom DOMEvents, so we have to dispatch events
        // differently when jQuery is loaded
        dispatchEvent: hasJQuery ?  jQueryDispatchEvent : nativeDispatchEvent,

        // These are overridden by the registered handler
        onSetup: angular.noop,
        onCleanup: angular.noop,
        onStart: angular.noop,
        onMove: angular.noop,
        onEnd: angular.noop,
        onCancel: angular.noop,

        // onStart sets up a new state for the handler, which includes options from the
        // nearest registered parent element of ev.target.
        start: function (ev, pointer) {
            if (this.state.isRunning) return;
            var parentTarget = this.getNearestParent(ev.target);
            // Get the options from the nearest registered parent
            var parentTargetOptions = parentTarget && parentTarget.$mdGesture[this.name] || {};

            this.state = {
                isRunning: true,
                // Override the default options with the nearest registered parent's options
                options: angular.extend({}, this.options, parentTargetOptions),
                // Pass in the registered parent node to the state so the onStart listener can use
                registeredParent: parentTarget
            };
            this.onStart(ev, pointer);
        },
        move: function (ev, pointer) {
            if (!this.state.isRunning) return;
            this.onMove(ev, pointer);
        },
        end: function (ev, pointer) {
            if (!this.state.isRunning) return;
            this.onEnd(ev, pointer);
            this.state.isRunning = false;
        },
        cancel: function (ev, pointer) {
            this.onCancel(ev, pointer);
            this.state = {};
        },

        // Find and return the nearest parent element that has been registered to
        // listen for this handler via $mdGesture.register(element, 'handlerName').
        getNearestParent: function (node) {
            var current = node;
            while (current) {
                if ((current.$mdGesture || {})[this.name]) {
                    return current;
                }
                current = current.parentNode;
            }
            return null;
        },

        // Called from $mdGesture.register when an element registers itself with a handler.
        // Store the options the user gave on the DOMElement itself. These options will
        // be retrieved with getNearestParent when the handler starts.
        registerElement: function (element, options) {
            var self = this;
            element[0].$mdGesture = element[0].$mdGesture || {};
            element[0].$mdGesture[this.name] = options || {};
            element.on('$destroy', onDestroy);

            self.onSetup(element, options || {});

            return onDestroy;

            function onDestroy() {
                delete element[0].$mdGesture[self.name];
                element.off('$destroy', onDestroy);

                self.onCleanup(element, options || {});
            }
        }
    };

    return GestureHandler;

    /*
     * Dispatch an event with jQuery
     * TODO: Make sure this sends bubbling events
     *
     * @param srcEvent the original DOM touch event that started this.
     * @param eventType the name of the custom event to send (eg 'click' or '$md.drag')
     * @param eventPointer the pointer object that matches this event.
     */
    function jQueryDispatchEvent(srcEvent, eventType, eventPointer) {
        eventPointer = eventPointer || pointer;
        var eventObj = new angular.element.Event(eventType);

        eventObj.$material = true;
        eventObj.pointer = eventPointer;
        eventObj.srcEvent = srcEvent;

        angular.extend(eventObj, {
            clientX: eventPointer.x,
            clientY: eventPointer.y,
            screenX: eventPointer.x,
            screenY: eventPointer.y,
            pageX: eventPointer.x,
            pageY: eventPointer.y,
            ctrlKey: srcEvent.ctrlKey,
            altKey: srcEvent.altKey,
            shiftKey: srcEvent.shiftKey,
            metaKey: srcEvent.metaKey
        });
        angular.element(eventPointer.target).trigger(eventObj);
    }

    /*
     * NOTE: nativeDispatchEvent is very performance sensitive.
     * @param srcEvent the original DOM touch event that started this.
     * @param eventType the name of the custom event to send (eg 'click' or '$md.drag')
     * @param eventPointer the pointer object that matches this event.
     */
    function nativeDispatchEvent(srcEvent, eventType, eventPointer) {
        eventPointer = eventPointer || pointer;
        var eventObj;

        if (eventType === 'click' || eventType == 'mouseup' || eventType == 'mousedown' ) {
            eventObj = document.createEvent('MouseEvents');
            eventObj.initMouseEvent(
                eventType, true, true, window, srcEvent.detail,
                eventPointer.x, eventPointer.y, eventPointer.x, eventPointer.y,
                srcEvent.ctrlKey, srcEvent.altKey, srcEvent.shiftKey, srcEvent.metaKey,
                srcEvent.button, srcEvent.relatedTarget || null
            );

        } else {
            eventObj = document.createEvent('CustomEvent');
            eventObj.initCustomEvent(eventType, true, true, {});
        }
        eventObj.$material = true;
        eventObj.pointer = eventPointer;
        eventObj.srcEvent = srcEvent;
        eventPointer.target.dispatchEvent(eventObj);
    }

}

/**
 * Attach Gestures: hook document and check shouldHijack clicks
 * @ngInject
 */
function attachToDocument( $mdGesture, $$MdGestureHandler ) {

    if (window.Hammer) {
        return;
    }

    // Polyfill document.contains for IE11.
    // TODO: move to util
    document.contains || (document.contains = function (node) {
        return document.body.contains(node);
    });

    if (!isInitialized && $mdGesture.isHijackingClicks ) {
        /*
         * If hijack clicks is true, we preventDefault any click that wasn't
         * sent by AngularJS Material. This is because on older Android & iOS, a false, or 'ghost',
         * click event will be sent ~400ms after a touchend event happens.
         * The only way to know if this click is real is to prevent any normal
         * click events, and add a flag to events sent by material so we know not to prevent those.
         *
         * Two exceptions to click events that should be prevented are:
         *  - click events sent by the keyboard (eg form submit)
         *  - events that originate from an Ionic app
         */
        document.addEventListener('click'    , clickHijacker     , true);
        document.addEventListener('mouseup'  , mouseInputHijacker, true);
        document.addEventListener('mousedown', mouseInputHijacker, true);
        document.addEventListener('focus'    , mouseInputHijacker, true);

        isInitialized = true;
    }

    function mouseInputHijacker(ev) {
        var isKeyClick = !ev.clientX && !ev.clientY;

        if (
            !isKeyClick &&
            !ev.$material &&
            !ev.isIonicTap &&
            !isInputEventFromLabelClick(ev) &&
            (ev.type !== 'mousedown' || (!canFocus(ev.target) && !canFocus(document.activeElement)))
        ) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    function clickHijacker(ev) {
        var isKeyClick = ev.clientX === 0 && ev.clientY === 0;
        var isSubmitEvent = ev.target && ev.target.type === 'submit';
        if (!isKeyClick && !ev.$material && !ev.isIonicTap
            && !isInputEventFromLabelClick(ev)
            && !isSubmitEvent) {
            ev.preventDefault();
            ev.stopPropagation();
            lastLabelClickPos = null;
        } else {
            lastLabelClickPos = null;
            if (ev.target.tagName.toLowerCase() == 'label') {
                lastLabelClickPos = {x: ev.x, y: ev.y};
            }
        }
    }


    // Listen to all events to cover all platforms.
    var START_EVENTS = 'mousedown touchstart pointerdown';
    var MOVE_EVENTS = 'mousemove touchmove pointermove';
    var END_EVENTS = 'mouseup mouseleave touchend touchcancel pointerup pointercancel';

    angular.element(document)
        .on(START_EVENTS, gestureStart)
        .on(MOVE_EVENTS, gestureMove)
        .on(END_EVENTS, gestureEnd)
        // For testing
        .on('$$mdGestureReset', function gestureClearCache () {
            lastPointer = pointer = null;
        });

    /*
     * When a DOM event happens, run all registered gesture handlers' lifecycle
     * methods which match the DOM event.
     * Eg when a 'touchstart' event happens, runHandlers('start') will call and
     * run `handler.cancel()` and `handler.start()` on all registered handlers.
     */
    function runHandlers(handlerEvent, event) {
        var handler;
        for (var name in HANDLERS) {
            handler = HANDLERS[name];
            if( handler instanceof $$MdGestureHandler ) {

                if (handlerEvent === 'start') {
                    // Run cancel to reset any handlers' state
                    handler.cancel();
                }
                handler[handlerEvent](event, pointer);

            }
        }
    }

    /*
     * gestureStart vets if a start event is legitimate (and not part of a 'ghost click' from iOS/Android)
     * If it is legitimate, we initiate the pointer state and mark the current pointer's type
     * For example, for a touchstart event, mark the current pointer as a 'touch' pointer, so mouse events
     * won't effect it.
     */
    function gestureStart(ev) {
        // If we're already touched down, abort
        if (pointer) return;

        var now = +Date.now();

        // iOS & old android bug: after a touch event, a click event is sent 350 ms later.
        // If <400ms have passed, don't allow an event of a different type than the previous event
        if (lastPointer && !typesMatch(ev, lastPointer) && (now - lastPointer.endTime < 1500)) {
            return;
        }

        pointer = makeStartPointer(ev);

        runHandlers('start', ev);
    }
    /*
     * If a move event happens of the right type, update the pointer and run all the move handlers.
     * "of the right type": if a mousemove happens but our pointer started with a touch event, do nothing.
     */
    function gestureMove(ev) {
        if (!pointer || !typesMatch(ev, pointer)) return;

        updatePointerState(ev, pointer);
        runHandlers('move', ev);
    }
    /*
     * If an end event happens of the right type, update the pointer, run endHandlers, and save the pointer as 'lastPointer'
     */
    function gestureEnd(ev) {
        if (!pointer || !typesMatch(ev, pointer)) return;

        updatePointerState(ev, pointer);
        pointer.endTime = +Date.now();

        if (ev.type !== 'pointercancel') {
            runHandlers('end', ev);
        }

        lastPointer = pointer;
        pointer = null;
    }

}

// ********************
// Module Functions
// ********************

/*
 * Initiate the pointer. x, y, and the pointer's type.
 */
function makeStartPointer(ev) {
    var point = getEventPoint(ev);
    var startPointer = {
        startTime: +Date.now(),
        target: ev.target,
        // 'p' for pointer events, 'm' for mouse, 't' for touch
        type: ev.type.charAt(0)
    };
    startPointer.startX = startPointer.x = point.pageX;
    startPointer.startY = startPointer.y = point.pageY;
    return startPointer;
}

/*
 * return whether the pointer's type matches the event's type.
 * Eg if a touch event happens but the pointer has a mouse type, return false.
 */
function typesMatch(ev, pointer) {
    return ev && pointer && ev.type.charAt(0) === pointer.type;
}

/**
 * Gets whether the given event is an input event that was caused by clicking on an
 * associated label element.
 *
 * This is necessary because the browser will, upon clicking on a label element, fire an
 * *extra* click event on its associated input (if any). mdGesture is able to flag the label
 * click as with `$material` correctly, but not the second input click.
 *
 * In order to determine whether an input event is from a label click, we compare the (x, y) for
 * the event to the (x, y) for the most recent label click (which is cleared whenever a non-label
 * click occurs). Unfortunately, there are no event properties that tie the input and the label
 * together (such as relatedTarget).
 *
 * @param {MouseEvent} event
 * @returns {boolean}
 */
function isInputEventFromLabelClick(event) {
    return lastLabelClickPos
        && lastLabelClickPos.x == event.x
        && lastLabelClickPos.y == event.y;
}

/*
 * Update the given pointer based upon the given DOMEvent.
 * Distance, velocity, direction, duration, etc
 */
function updatePointerState(ev, pointer) {
    var point = getEventPoint(ev);
    var x = pointer.x = point.pageX;
    var y = pointer.y = point.pageY;

    pointer.distanceX = x - pointer.startX;
    pointer.distanceY = y - pointer.startY;
    pointer.distance = Math.sqrt(
        pointer.distanceX * pointer.distanceX + pointer.distanceY * pointer.distanceY
    );

    pointer.directionX = pointer.distanceX > 0 ? 'right' : pointer.distanceX < 0 ? 'left' : '';
    pointer.directionY = pointer.distanceY > 0 ? 'down' : pointer.distanceY < 0 ? 'up' : '';

    pointer.duration = +Date.now() - pointer.startTime;
    pointer.velocityX = pointer.distanceX / pointer.duration;
    pointer.velocityY = pointer.distanceY / pointer.duration;
}

/*
 * Normalize the point where the DOM event happened whether it's touch or mouse.
 * @returns point event obj with pageX and pageY on it.
 */
function getEventPoint(ev) {
    ev = ev.originalEvent || ev; // support jQuery events
    return (ev.touches && ev.touches[0]) ||
        (ev.changedTouches && ev.changedTouches[0]) ||
        ev;
}

/** Checks whether an element can be focused. */
function canFocus(element) {
    return (
        !!element &&
        element.getAttribute('tabindex') != '-1' &&
        !element.hasAttribute('disabled') &&
        (
            element.hasAttribute('tabindex') ||
            element.hasAttribute('href') ||
            element.isContentEditable ||
            ['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA', 'VIDEO', 'AUDIO'].indexOf(element.nodeName) != -1
        )
    );
}
})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.core.interaction
 * @description
 * User interaction detection to provide proper accessibility.
 */
MdInteractionService.$inject = ["$timeout", "$mdUtil"];
angular
  .module('material.core.interaction', [])
  .service('$mdInteraction', MdInteractionService);


/**
 * @ngdoc service
 * @name $mdInteraction
 * @module material.core.interaction
 *
 * @description
 *
 * Service which keeps track of the last interaction type and validates them for several browsers.
 * The service hooks into the document's body and listens for touch, mouse and keyboard events.
 *
 * The most recent interaction type can be retrieved by calling the `getLastInteractionType` method.
 *
 * Here is an example markup for using the interaction service.
 *
 * <hljs lang="js">
 *   var lastType = $mdInteraction.getLastInteractionType();
 *
 *   if (lastType === 'keyboard') {
 *     // We only restore the focus for keyboard users.
 *     restoreFocus();
 *   }
 * </hljs>
 *
 */
function MdInteractionService($timeout, $mdUtil) {
  this.$timeout = $timeout;
  this.$mdUtil = $mdUtil;

  this.bodyElement = angular.element(document.body);
  this.isBuffering = false;
  this.bufferTimeout = null;
  this.lastInteractionType = null;
  this.lastInteractionTime = null;

  // Type Mappings for the different events
  // There will be three three interaction types
  // `keyboard`, `mouse` and `touch`
  // type `pointer` will be evaluated in `pointerMap` for IE Browser events
  this.inputEventMap = {
    'keydown': 'keyboard',
    'mousedown': 'mouse',
    'mouseenter': 'mouse',
    'touchstart': 'touch',
    'pointerdown': 'pointer',
    'MSPointerDown': 'pointer'
  };

  // IE PointerDown events will be validated in `touch` or `mouse`
  // Index numbers referenced here: https://msdn.microsoft.com/library/windows/apps/hh466130.aspx
  this.iePointerMap = {
    2: 'touch',
    3: 'touch',
    4: 'mouse'
  };

  this.initializeEvents();
}

/**
 * Initializes the interaction service, by registering all interaction events to the
 * body element.
 */
MdInteractionService.prototype.initializeEvents = function() {
  // IE browsers can also trigger pointer events, which also leads to an interaction.
  var pointerEvent = 'MSPointerEvent' in window ? 'MSPointerDown' : 'PointerEvent' in window ? 'pointerdown' : null;

  this.bodyElement.on('keydown mousedown', this.onInputEvent.bind(this));

  if ('ontouchstart' in document.documentElement) {
    this.bodyElement.on('touchstart', this.onBufferInputEvent.bind(this));
  }

  if (pointerEvent) {
    this.bodyElement.on(pointerEvent, this.onInputEvent.bind(this));
  }

};

/**
 * Event listener for normal interaction events, which should be tracked.
 * @param event {MouseEvent|KeyboardEvent|PointerEvent|TouchEvent}
 */
MdInteractionService.prototype.onInputEvent = function(event) {
  if (this.isBuffering) {
    return;
  }

  var type = this.inputEventMap[event.type];

  if (type === 'pointer') {
    type = this.iePointerMap[event.pointerType] || event.pointerType;
  }

  this.lastInteractionType = type;
  this.lastInteractionTime = this.$mdUtil.now();
};

/**
 * Event listener for interaction events which should be buffered (touch events).
 * @param event {TouchEvent}
 */
MdInteractionService.prototype.onBufferInputEvent = function(event) {
  this.$timeout.cancel(this.bufferTimeout);

  this.onInputEvent(event);
  this.isBuffering = true;

  // The timeout of 650ms is needed to delay the touchstart, because otherwise the touch will call
  // the `onInput` function multiple times.
  this.bufferTimeout = this.$timeout(function() {
    this.isBuffering = false;
  }.bind(this), 650, false);

};

/**
 * @ngdoc method
 * @name $mdInteraction#getLastInteractionType
 * @description Retrieves the last interaction type triggered in body.
 * @returns {string|null} Last interaction type.
 */
MdInteractionService.prototype.getLastInteractionType = function() {
  return this.lastInteractionType;
};

/**
 * @ngdoc method
 * @name $mdInteraction#isUserInvoked
 * @description Method to detect whether any interaction happened recently or not.
 * @param {number=} checkDelay Time to check for any interaction to have been triggered.
 * @returns {boolean} Whether there was any interaction or not.
 */
MdInteractionService.prototype.isUserInvoked = function(checkDelay) {
  var delay = angular.isNumber(checkDelay) ? checkDelay : 15;

  // Check for any interaction to be within the specified check time.
  return this.lastInteractionTime >= this.$mdUtil.now() - delay;
};

})();
(function(){
"use strict";

angular.module('material.core')
    .provider('$$interimElement', InterimElementProvider);

/*
 * @ngdoc service
 * @name $$interimElement
 * @module material.core
 *
 * @description
 *
 * Factory that contructs `$$interimElement.$service` services.
 * Used internally in material design for elements that appear on screen temporarily.
 * The service provides a promise-like API for interacting with the temporary
 * elements.
 *
 * ```js
 * app.service('$mdToast', function($$interimElement) {
 *   var $mdToast = $$interimElement(toastDefaultOptions);
 *   return $mdToast;
 * });
 * ```
 * @param {object=} defaultOptions Options used by default for the `show` method on the service.
 *
 * @returns {$$interimElement.$service}
 *
 */

function InterimElementProvider() {
    InterimElementFactory.$inject = ["$document", "$q", "$$q", "$rootScope", "$timeout", "$rootElement", "$animate", "$mdUtil", "$mdCompiler", "$mdTheming", "$injector"];
    createInterimElementProvider.$get = InterimElementFactory;
    return createInterimElementProvider;

    /**
     * Returns a new provider which allows configuration of a new interimElement
     * service. Allows configuration of default options & methods for options,
     * as well as configuration of 'preset' methods (eg dialog.basic(): basic is a preset method)
     */
    function createInterimElementProvider(interimFactoryName) {
        factory.$inject = ["$$interimElement", "$injector"];
        var EXPOSED_METHODS = ['onHide', 'onShow', 'onRemove'];

        var customMethods = {};
        var providerConfig = {
            presets: {}
        };

        var provider = {
            setDefaults: setDefaults,
            addPreset: addPreset,
            addMethod: addMethod,
            $get: factory
        };

        /**
         * all interim elements will come with the 'build' preset
         */
        provider.addPreset('build', {
            methods: ['controller', 'controllerAs', 'resolve',
                'template', 'templateUrl', 'themable', 'transformTemplate', 'parent', 'contentElement'
            ]
        });

        return provider;

        /**
         * Save the configured defaults to be used when the factory is instantiated
         */
        function setDefaults(definition) {
            providerConfig.optionsFactory = definition.options;
            providerConfig.methods = (definition.methods || []).concat(EXPOSED_METHODS);
            return provider;
        }

        /**
         * Add a method to the factory that isn't specific to any interim element operations
         */

        function addMethod(name, fn) {
            customMethods[name] = fn;
            return provider;
        }

        /**
         * Save the configured preset to be used when the factory is instantiated
         */
        function addPreset(name, definition) {
            definition = definition || {};
            definition.methods = definition.methods || [];
            definition.options = definition.options || function() {
                return {};
            };

            if (/^cancel|hide|show$/.test(name)) {
                throw new Error("Preset '" + name + "' in " + interimFactoryName + " is reserved!");
            }
            if (definition.methods.indexOf('_options') > -1) {
                throw new Error("Method '_options' in " + interimFactoryName + " is reserved!");
            }
            providerConfig.presets[name] = {
                methods: definition.methods.concat(EXPOSED_METHODS),
                optionsFactory: definition.options,
                argOption: definition.argOption
            };
            return provider;
        }

        function addPresetMethod(presetName, methodName, method) {
            providerConfig.presets[presetName][methodName] = method;
        }

        /**
         * Create a factory that has the given methods & defaults implementing interimElement
         */
        /* @ngInject */
        function factory($$interimElement, $injector) {
            var defaultMethods;
            var defaultOptions;
            var interimElementService = $$interimElement();

            /*
             * publicService is what the developer will be using.
             * It has methods hide(), cancel(), show(), build(), and any other
             * presets which were set during the config phase.
             */
            var publicService = {
                hide: interimElementService.hide,
                cancel: interimElementService.cancel,
                show: showInterimElement,

                // Special internal method to destroy an interim element without animations
                // used when navigation changes causes a $scope.$destroy() action
                destroy: destroyInterimElement
            };


            defaultMethods = providerConfig.methods || [];
            // This must be invoked after the publicService is initialized
            defaultOptions = invokeFactory(providerConfig.optionsFactory, {});

            // Copy over the simple custom methods
            angular.forEach(customMethods, function(fn, name) {
                publicService[name] = fn;
            });

            angular.forEach(providerConfig.presets, function(definition, name) {
                var presetDefaults = invokeFactory(definition.optionsFactory, {});
                var presetMethods = (definition.methods || []).concat(defaultMethods);

                // Every interimElement built with a preset has a field called `$type`,
                // which matches the name of the preset.
                // Eg in preset 'confirm', options.$type === 'confirm'
                angular.extend(presetDefaults, {
                    $type: name
                });

                // This creates a preset class which has setter methods for every
                // method given in the `.addPreset()` function, as well as every
                // method given in the `.setDefaults()` function.
                //
                // @example
                // .setDefaults({
                //   methods: ['hasBackdrop', 'clickOutsideToClose', 'escapeToClose', 'targetEvent'],
                //   options: dialogDefaultOptions
                // })
                // .addPreset('alert', {
                //   methods: ['title', 'ok'],
                //   options: alertDialogOptions
                // })
                //
                // Set values will be passed to the options when interimElement.show() is called.
                function Preset(opts) {
                    this._options = angular.extend({}, presetDefaults, opts);
                }
                angular.forEach(presetMethods, function(name) {
                    Preset.prototype[name] = function(value) {
                        this._options[name] = value;
                        return this;
                    };
                });

                // Create shortcut method for one-linear methods
                if (definition.argOption) {
                    var methodName = 'show' + name.charAt(0).toUpperCase() + name.slice(1);
                    publicService[methodName] = function(arg) {
                        var config = publicService[name](arg);
                        return publicService.show(config);
                    };
                }

                // eg $mdDialog.alert() will return a new alert preset
                publicService[name] = function(arg) {
                    // If argOption is supplied, eg `argOption: 'content'`, then we assume
                    // if the argument is not an options object then it is the `argOption` option.
                    //
                    // @example `$mdToast.simple('hello')` // sets options.content to hello
                    //                                     // because argOption === 'content'
                    if (arguments.length && definition.argOption &&
                        !angular.isObject(arg) && !angular.isArray(arg)) {

                        return (new Preset())[definition.argOption](arg);

                    } else {
                        return new Preset(arg);
                    }

                };
            });

            return publicService;

            /**
             *
             */
            function showInterimElement(opts) {
                // opts is either a preset which stores its options on an _options field,
                // or just an object made up of options
                opts = opts || {};
                if (opts._options) opts = opts._options;

                return interimElementService.show(
                    angular.extend({}, defaultOptions, opts)
                );
            }

            /**
             *  Special method to hide and destroy an interimElement WITHOUT
             *  any 'leave` or hide animations ( an immediate force hide/remove )
             *
             *  NOTE: This calls the onRemove() subclass method for each component...
             *  which must have code to respond to `options.$destroy == true`
             */
            function destroyInterimElement(opts) {
                return interimElementService.destroy(opts);
            }

            /**
             * Helper to call $injector.invoke with a local of the factory name for
             * this provider.
             * If an $mdDialog is providing options for a dialog and tries to inject
             * $mdDialog, a circular dependency error will happen.
             * We get around that by manually injecting $mdDialog as a local.
             */
            function invokeFactory(factory, defaultVal) {
                var locals = {};
                locals[interimFactoryName] = publicService;
                return $injector.invoke(factory || function() {
                    return defaultVal;
                }, {}, locals);
            }

        }

    }

    /* @ngInject */
    function InterimElementFactory($document, $q, $$q, $rootScope, $timeout, $rootElement, $animate,
                                   $mdUtil, $mdCompiler, $mdTheming, $injector) {
        return function createInterimElementService() {
            var SHOW_CANCELLED = false;

            /*
             * @ngdoc service
             * @name $$interimElement.$service
             *
             * @description
             * A service used to control inserting and removing an element into the DOM.
             *
             */

            var service;

            var showPromises = []; // Promises for the interim's which are currently opening.
            var hidePromises = []; // Promises for the interim's which are currently hiding.
            var showingInterims = []; // Interim elements which are currently showing up.

            // Publish instance $$interimElement service;
            // ... used as $mdDialog, $mdToast, $mdMenu, and $mdSelect

            return service = {
                show: show,
                hide: waitForInterim(hide),
                cancel: waitForInterim(cancel),
                destroy: destroy,
                $injector_: $injector
            };

            /*
             * @ngdoc method
             * @name $$interimElement.$service#show
             * @kind function
             *
             * @description
             * Adds the `$interimElement` to the DOM and returns a special promise that will be resolved or rejected
             * with hide or cancel, respectively. To external cancel/hide, developers should use the
             *
             * @param {*} options is hashMap of settings
             * @returns a Promise
             *
             */
            function show(options) {
                options = options || {};
                var interimElement = new InterimElement(options || {});

                // When an interim element is currently showing, we have to cancel it.
                // Just hiding it, will resolve the InterimElement's promise, the promise should be
                // rejected instead.
                var hideAction = options.multiple ? $q.resolve() : $q.all(showPromises);

                function closex() {
                    var reason = 'cancel';
                    var hideAction = interimElement
                        .remove(reason, false, options || {})
                        .catch(function(reason) {
                            return reason;
                        })
                        .finally(function() {
                            hidePromises.splice(hidePromises.indexOf(hideAction), 1);
                        });

                    showingInterims.splice(showingInterims.indexOf(interimElement), 1);
                    hidePromises.push(hideAction);

                    return interimElement.deferred.promise;
                }

                if (interimElement.options.scope !== undefined && interimElement.options.isolateScope) {
                    interimElement.options.scope.$interimElement = interimElement;
                    interimElement.options.scope.$on('$destroy', function () {
                        setTimeout(function () {
                            interimElement.options.scope.$interimElement = null;
                            interimElement.options.scope._close = null;
                            interimElement.options.scope.close = null;
                        }, 100);
                    });


                    interimElement.options.scope._close = closex;
                    interimElement.options.scope.close = closex;
                }

                if (!options.multiple) {
                    // Wait for all opening interim's to finish their transition.
                    hideAction = hideAction.then(function() {
                        // Wait for all closing and showing interim's to be completely closed.
                        var promiseArray = hidePromises.concat(showingInterims.map(service.cancel));
                        return $q.all(promiseArray);
                    });
                }

                var showAction = hideAction.then(function() {

                    return interimElement
                        .show()
                        .catch(function(reason) {
                            return reason;
                        })
                        .finally(function() {
                            showPromises.splice(showPromises.indexOf(showAction), 1);
                            showingInterims.push(interimElement);
                        });

                });

                showPromises.push(showAction);

                // Return a promise that will be resolved when the interim
                // element is hidden or cancelled...
                interimElement.deferred.promise.$interimElement = interimElement;
                return interimElement.deferred.promise;
            }

            /*
             * @ngdoc method
             * @name $$interimElement.$service#hide
             * @kind function
             *
             * @description
             * Removes the `$interimElement` from the DOM and resolves the promise returned from `show`
             *
             * @param {*} resolveParam Data to resolve the promise with
             * @returns a Promise that will be resolved after the element has been removed.
             *
             */
            function hide(reason, options) {
                options = options || {};

                if (options.closeAll) {
                    // We have to make a shallow copy of the array, because otherwise the map will break.
                    var promises = [];
                    angular.forEach(showingInterims.slice().reverse(), function(s) {
                        // do not closeAll dialogs, because that's just retarded
                        if (!(s.element && s.element.is('md-dialog'))) {
                            promises.push(s);
                        }
                    });
                    return $q.all(promises.map(closeElement));
                } else if (options.closeTo !== undefined) {
                    return $q.all(showingInterims.slice(options.closeTo).map(closeElement));
                }

                // Hide the latest showing interim element.
                return closeElement(showingInterims[showingInterims.length - 1]);

                function closeElement(interim) {

                    var hideAction = interim
                        .remove(reason, false, options || {})
                        .catch(function(reason) {
                            return reason;
                        })
                        .finally(function() {
                            hidePromises.splice(hidePromises.indexOf(hideAction), 1);
                        });

                    showingInterims.splice(showingInterims.indexOf(interim), 1);
                    hidePromises.push(hideAction);

                    return interim.deferred.promise;
                }
            }

            /*
             * @ngdoc method
             * @name $$interimElement.$service#cancel
             * @kind function
             *
             * @description
             * Removes the `$interimElement` from the DOM and rejects the promise returned from `show`
             *
             * @param {*} reason Data to reject the promise with
             * @returns Promise that will be resolved after the element has been removed.
             *
             */
            function cancel(reason, options) {
                var interim = showingInterims.pop();
                if (!interim) {
                    return $q.when(reason);
                }

                var cancelAction = interim
                    .remove(reason, true, options || {})
                    .catch(function(reason) {
                        return reason;
                    })
                    .finally(function() {
                        hidePromises.splice(hidePromises.indexOf(cancelAction), 1);
                    });

                hidePromises.push(cancelAction);

                // Since Angular 1.6.7, promises will be logged to $exceptionHandler when the promise
                // is not handling the rejection. We create a pseudo catch handler, which will prevent the
                // promise from being logged to the $exceptionHandler.
                return interim.deferred.promise.catch(angular.noop);
            }

            /**
             * Creates a function to wait for at least one interim element to be available.
             * @param callbackFn Function to be used as callback
             * @returns {Function}
             */
            function waitForInterim(callbackFn) {
                return function() {
                    var fnArguments = arguments;

                    if (!showingInterims.length) {
                        // When there are still interim's opening, then wait for the first interim element to
                        // finish its open animation.
                        if (showPromises.length) {
                            return showPromises[0].finally(function() {
                                return callbackFn.apply(service, fnArguments);
                            });
                        }

                        return $q.when("No interim elements currently showing up.");
                    }

                    return callbackFn.apply(service, fnArguments);
                };
            }

            /*
             * Special method to quick-remove the interim element without animations
             * Note: interim elements are in "interim containers"
             */
            function destroy(targetEl) {
                var interim = !targetEl ? showingInterims.shift() : null;

                var parentEl = angular.element(targetEl).length && angular.element(targetEl)[0].parentNode;

                if (parentEl) {
                    // Try to find the interim in the stack which corresponds to the supplied DOM element.
                    var filtered = showingInterims.filter(function(entry) {
                        return entry.options.element[0] === parentEl;
                    });

                    // Note: This function might be called when the element already has been removed,
                    // in which case we won't find any matches.
                    if (filtered.length) {
                        interim = filtered[0];
                        showingInterims.splice(showingInterims.indexOf(interim), 1);
                    }
                }

                return interim ? interim.remove(SHOW_CANCELLED, false, {
                        '$destroy': true
                    }) :
                    $q.when(SHOW_CANCELLED);
            }

            /*
             * Internal Interim Element Object
             * Used internally to manage the DOM element and related data
             */
            function InterimElement(options) {
                var self, element, showAction = $q.when(true);

                options = configureScopeAndTransitions(options);

                return self = {
                    options: options,
                    deferred: $q.defer(),
                    show: createAndTransitionIn,
                    remove: transitionOutAndRemove
                };

                /**
                 * Compile, link, and show this interim element
                 * Use optional autoHided and transition-in effects
                 */
                function createAndTransitionIn() {
                    return $q(function(resolve, reject) {

                        // Trigger onCompiling callback before the compilation starts.
                        // This is useful, when modifying options, which can be influenced by developers.
                        options.onCompiling && options.onCompiling(options);

                        compileElement(options)
                            .then(function(compiledData) {
                                element = linkElement(compiledData, options);

                                // Expose the cleanup function from the compiler.
                                options.cleanupElement = compiledData.cleanup;

                                showAction = showElement(element, options, compiledData.controller)
                                    .then(resolve, rejectAll);

                                showAction.then(function() {
                                    if (options.escapeToClose !== false) {
                                        var backButtonQueue;
                                        try {
                                            backButtonQueue = $injector.get('backButtonQueue');
                                        } catch (e) {

                                        }
                                        if (backButtonQueue) {
                                            options.backButtonDeregister = backButtonQueue.add(function() {
                                                transitionOutAndRemove('back', false, options);
                                            });
                                        }
                                    }
                                });

                            }, rejectAll);

                        function rejectAll(fault) {
                            // Force the '$md<xxx>.show()' promise to reject
                            self.deferred.reject(fault);

                            // Continue rejection propagation
                            reject(fault);
                        }
                    });
                }

                /**
                 * After the show process has finished/rejected:
                 * - announce 'removing',
                 * - perform the transition-out, and
                 * - perform optional clean up scope.
                 */
                function transitionOutAndRemove(response, isCancelled, opts) {

                    // abort if the show() and compile failed
                    if (!element) return $q.when(false);

                    options = angular.extend(options || {}, opts || {});
                    options.cancelAutoHide && options.cancelAutoHide();
                    options.element.triggerHandler('$mdInterimElementRemove');

                    if (options.backButtonDeregister) {
                        options.backButtonDeregister();
                    }

                    if (options.$destroy === true) {

                        return hideElement(options.element, options).then(function() {
                            (isCancelled && rejectAll(response)) || resolveAll(response);
                        });

                    } else {

                        $q.when(showAction)
                            .finally(function() {
                                hideElement(options.element, options).then(function() {

                                    (isCancelled && rejectAll(response)) || resolveAll(response);

                                }, rejectAll);
                            });

                        return self.deferred.promise;
                    }


                    /**
                     * The `show()` returns a promise that will be resolved when the interim
                     * element is hidden or cancelled...
                     */
                    function resolveAll(response) {
                        self.deferred.resolve(response);
                    }

                    /**
                     * Force the '$md<xxx>.show()' promise to reject
                     */
                    function rejectAll(fault) {
                        self.deferred.reject(fault);
                    }
                }

                /**
                 * Prepare optional isolated scope and prepare $animate with default enter and leave
                 * transitions for the new element instance.
                 */
                function configureScopeAndTransitions(options) {
                    options = options || {};
                    if (options.template) {
                        options.template = $mdUtil.processTemplate(options.template);
                    }

                    return angular.extend({
                        preserveScope: false,
                        cancelAutoHide: angular.noop,
                        scope: options.scope || $rootScope.$new(options.isolateScope),

                        /**
                         * Default usage to enable $animate to transition-in; can be easily overridden via 'options'
                         */
                        onShow: function transitionIn(scope, element, options) {
                            return $animate.enter(element, options.parent);
                        },

                        /**
                         * Default usage to enable $animate to transition-out; can be easily overridden via 'options'
                         */
                        onRemove: function transitionOut(scope, element) {
                            // Element could be undefined if a new element is shown before
                            // the old one finishes compiling.
                            return element && $animate.leave(element) || $q.when();
                        }
                    }, options);

                }

                /**
                 * Compile an element with a templateUrl, controller, and locals
                 */
                function compileElement(options) {

                    var compiled = !options.skipCompile ? $mdCompiler.compile(options) : null;

                    return compiled || $q(function(resolve) {
                        resolve({
                            locals: {},
                            link: function() {
                                return options.element;
                            }
                        });
                    });
                }

                /**
                 *  Link an element with compiled configuration
                 */
                function linkElement(compileData, options) {
                    angular.extend(compileData.locals, options);

                    var element = compileData.link(options.scope);

                    // Search for parent at insertion time, if not specified
                    options.element = element;
                    options.parent = findParent(element, options);
                    if (options.themable) $mdTheming(element);

                    return element;
                }

                /**
                 * Search for parent at insertion time, if not specified
                 */
                function findParent(element, options) {
                    var parent = options.parent;

                    // Search for parent at insertion time, if not specified
                    if (angular.isFunction(parent)) {
                        parent = parent(options.scope, element, options);
                    } else if (angular.isString(parent)) {
                        parent = angular.element($document[0].querySelector(parent));
                    } else {
                        parent = angular.element(parent);
                    }

                    // If parent querySelector/getter function fails, or it's just null,
                    // find a default.
                    if (!(parent || {}).length) {
                        var el;
                        if ($rootElement[0] && $rootElement[0].querySelector) {
                            el = $rootElement[0].querySelector(':not(svg) > body');
                        }
                        if (!el) el = $rootElement[0];
                        if (el.nodeName == '#comment') {
                            el = $document[0].body;
                        }
                        return angular.element(el);
                    }

                    return parent;
                }

                /**
                 * If auto-hide is enabled, start timer and prepare cancel function
                 */
                function startAutoHide() {
                    var autoHideTimer, cancelAutoHide = angular.noop;

                    if (options.hideDelay) {
                        autoHideTimer = $timeout(function() {
                            //service.hide();
                            options.scope.close();
                        }, options.hideDelay);
                        cancelAutoHide = function() {
                            $timeout.cancel(autoHideTimer);
                        };
                    }

                    // Cache for subsequent use
                    options.cancelAutoHide = function() {
                        cancelAutoHide();
                        options.cancelAutoHide = undefined;
                    };
                }

                /**
                 * Show the element ( with transitions), notify complete and start
                 * optional auto-Hide
                 */
                function showElement(element, options, controller) {
                    // Trigger onShowing callback before the `show()` starts
                    var notifyShowing = options.onShowing || angular.noop;
                    // Trigger onComplete callback when the `show()` finishes
                    var notifyComplete = options.onComplete || angular.noop;

                    // Necessary for consistency between Angular 1.5 and 1.6.
                    try {
                        notifyShowing(options.scope, element, options, controller);
                    } catch (e) {
                        return $q.reject(e);
                    }

                    return $q(function(resolve, reject) {
                        try {
                            // Start transitionIn
                            $q.when(options.onShow(options.scope, element, options, controller))
                                .then(function() {
                                    notifyComplete(options.scope, element, options);
                                    startAutoHide();

                                    resolve(element);

                                }, reject);

                        } catch (e) {
                            reject(e.message);
                        }
                    });
                }

                function hideElement(element, options) {
                    var announceRemoving = options.onRemoving || angular.noop;

                    return $$q(function(resolve, reject) {
                        try {
                            // Start transitionIn
                            var action = $$q.when(options.onRemove(options.scope, element, options) || true);

                            // Trigger callback *before* the remove operation starts
                            announceRemoving(element, action);

                            if (options.$destroy) {

                                // For $destroy, onRemove should be synchronous
                                resolve(element);

                                if (!options.preserveScope && options.scope) {
                                    // scope destroy should still be be done after the current digest is done
                                    action.then(function() {
                                        options.scope.$destroy();
                                    });
                                }

                            } else {

                                // Wait until transition-out is done
                                action.then(function() {

                                    if (!options.preserveScope && options.scope) {
                                        options.scope.$destroy();
                                    }

                                    resolve(element);

                                }, reject);
                            }

                        } catch (e) {
                            reject(e);
                        }
                    });
                }

            }
        };

    }

}
})();
(function(){
"use strict";

(function() {
  'use strict';

  var $mdUtil, $interpolate, $log;

  var SUFFIXES = /(-gt)?-(sm|md|lg|print)/g;
  var WHITESPACE = /\s+/g;

  var FLEX_OPTIONS = ['grow', 'initial', 'auto', 'none', 'noshrink', 'nogrow' ];
  var LAYOUT_OPTIONS = ['row', 'column'];
  var ALIGNMENT_MAIN_AXIS= [ "", "start", "center", "end", "stretch", "space-around", "space-between" ];
  var ALIGNMENT_CROSS_AXIS= [ "", "start", "center", "end", "stretch" ];

  var config = {
    /**
     * Enable directive attribute-to-class conversions
     * Developers can use `<body md-layout-css />` to quickly
     * disable the Layout directives and prohibit the injection of Layout classNames
     */
    enabled: true,

    /**
     * List of mediaQuery breakpoints and associated suffixes
     *
     *   [
     *    { suffix: "sm", mediaQuery: "screen and (max-width: 599px)" },
     *    { suffix: "md", mediaQuery: "screen and (min-width: 600px) and (max-width: 959px)" }
     *   ]
     */
    breakpoints: []
  };

  registerLayoutAPI( angular.module('material.core.layout', ['ng']) );

  /**
   *   registerLayoutAPI()
   *
   *   The original AngularJS Material Layout solution used attribute selectors and CSS.
   *
   *  ```html
   *  <div layout="column"> My Content </div>
   *  ```
   *
   *  ```css
   *  [layout] {
   *    box-sizing: border-box;
   *    display:flex;
   *  }
   *  [layout=column] {
   *    flex-direction : column
   *  }
   *  ```
   *
   *  Use of attribute selectors creates significant performance impacts in some
   *  browsers... mainly IE.
   *
   *  This module registers directives that allow the same layout attributes to be
   *  interpreted and converted to class selectors. The directive will add equivalent classes to each element that
   *  contains a Layout directive.
   *
   * ```html
   *   <div layout="column" class="layout layout-column"> My Content </div>
   *```
   *
   *  ```css
   *  .layout {
   *    box-sizing: border-box;
   *    display:flex;
   *  }
   *  .layout-column {
   *    flex-direction : column
   *  }
   *  ```
   */
  function registerLayoutAPI(module){
    var PREFIX_REGEXP = /^((?:x|data)[:\-_])/i;
    var SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g;

    // NOTE: these are also defined in constants::MEDIA_PRIORITY and constants::MEDIA
    var BREAKPOINTS     = [ "", "xs", "gt-xs", "sm", "gt-sm", "md", "gt-md", "lg", "gt-lg", "gt-lgish", "xl", "print" ];
    var API_WITH_VALUES = [ "layout", "flex", "flex-order", "flex-offset", "layout-align" ];
    var API_NO_VALUES   = [ "show", "hide", "layout-padding", "layout-margin" ];


    // Build directive registration functions for the standard Layout API... for all breakpoints.
    angular.forEach(BREAKPOINTS, function(mqb) {

      // Attribute directives with expected, observable value(s)
      angular.forEach( API_WITH_VALUES, function(name){
        var fullName = mqb ? name + "-" + mqb : name;
        module.directive( directiveNormalize(fullName), attributeWithObserve(fullName));
      });

      // Attribute directives with no expected value(s)
      angular.forEach( API_NO_VALUES, function(name){
        var fullName = mqb ? name + "-" + mqb : name;
        module.directive( directiveNormalize(fullName), attributeWithoutValue(fullName));
      });

    });

    // Register other, special directive functions for the Layout features:
    module

      .provider('$$mdLayout'     , function() {
        // Publish internal service for Layouts
        return {
          $get : angular.noop,
          validateAttributeValue : validateAttributeValue,
          validateAttributeUsage : validateAttributeUsage,
          /**
           * Easy way to disable/enable the Layout API.
           * When disabled, this stops all attribute-to-classname generations
           */
          disableLayouts  : function(isDisabled) {
            config.enabled =  (isDisabled !== true);
          }
        };
      })

      .directive('mdLayoutCss'        , disableLayoutDirective )
      .directive('ngCloak'            , buildCloakInterceptor('ng-cloak'))

      .directive('layoutWrap'   , attributeWithoutValue('layout-wrap'))
      .directive('layoutNowrap' , attributeWithoutValue('layout-nowrap'))
      .directive('layoutNoWrap' , attributeWithoutValue('layout-no-wrap'))
      .directive('layoutFill'   , attributeWithoutValue('layout-fill'))

      // !! Deprecated attributes: use the `-lt` (aka less-than) notations

      .directive('layoutLtMd'     , warnAttrNotSupported('layout-lt-md', true))
      .directive('layoutLtLg'     , warnAttrNotSupported('layout-lt-lg', true))
      .directive('flexLtMd'       , warnAttrNotSupported('flex-lt-md', true))
      .directive('flexLtLg'       , warnAttrNotSupported('flex-lt-lg', true))

      .directive('layoutAlignLtMd', warnAttrNotSupported('layout-align-lt-md'))
      .directive('layoutAlignLtLg', warnAttrNotSupported('layout-align-lt-lg'))
      .directive('flexOrderLtMd'  , warnAttrNotSupported('flex-order-lt-md'))
      .directive('flexOrderLtLg'  , warnAttrNotSupported('flex-order-lt-lg'))
      .directive('offsetLtMd'     , warnAttrNotSupported('flex-offset-lt-md'))
      .directive('offsetLtLg'     , warnAttrNotSupported('flex-offset-lt-lg'))

      .directive('hideLtMd'       , warnAttrNotSupported('hide-lt-md'))
      .directive('hideLtLg'       , warnAttrNotSupported('hide-lt-lg'))
      .directive('showLtMd'       , warnAttrNotSupported('show-lt-md'))
      .directive('showLtLg'       , warnAttrNotSupported('show-lt-lg'))

      // Determine if
      .config( detectDisabledLayouts );

    /**
     * Converts snake_case to camelCase.
     * Also there is special case for Moz prefix starting with upper case letter.
     * @param name Name to normalize
     */
    function directiveNormalize(name) {
      return name
        .replace(PREFIX_REGEXP, '')
        .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        });
    }

  }


  /**
    * Detect if any of the HTML tags has a [md-layouts-disabled] attribute;
    * If yes, then immediately disable all layout API features
    *
    * Note: this attribute should be specified on either the HTML or BODY tags
    */
   /**
    * @ngInject
    */
   function detectDisabledLayouts() {
     var isDisabled = !!document.querySelector('[md-layouts-disabled]');
     config.enabled = !isDisabled;
   }

  /**
   * Special directive that will disable ALL Layout conversions of layout
   * attribute(s) to classname(s).
   *
   * <link rel="stylesheet" href="angular-material.min.css">
   * <link rel="stylesheet" href="angular-material.layout.css">
   *
   * <body md-layout-css>
   *  ...
   * </body>
   *
   * Note: Using md-layout-css directive requires the developer to load the Material
   * Layout Attribute stylesheet (which only uses attribute selectors):
   *
   *       `angular-material.layout.css`
   *
   * Another option is to use the LayoutProvider to configure and disable the attribute
   * conversions; this would obviate the use of the `md-layout-css` directive
   *
   */
  function disableLayoutDirective() {
    // Return a 1x-only, first-match attribute directive
    config.enabled = false;

    return {
      restrict : 'A',
      priority : '900'
    };
  }

  /**
   * Tail-hook ngCloak to delay the uncloaking while Layout transformers
   * finish processing. Eliminates flicker with Material.Layouts
   */
  function buildCloakInterceptor(className) {
    return [ '$timeout', function($timeout){
      return {
        restrict : 'A',
        priority : -10,   // run after normal ng-cloak
        compile  : function( element ) {
          if (!config.enabled) return angular.noop;

          // Re-add the cloak
          element.addClass(className);

          return function( scope, element ) {
            // Wait while layout injectors configure, then uncloak
            // NOTE: $rAF does not delay enough... and this is a 1x-only event,
            //       $timeout is acceptable.
            $timeout( function(){
              element.removeClass(className);
            }, 10, false);
          };
        }
      };
    }];
  }


  // *********************************************************************************
  //
  // These functions create registration functions for AngularJS Material Layout attribute directives
  // This provides easy translation to switch AngularJS Material attribute selectors to
  // CLASS selectors and directives; which has huge performance implications
  // for IE Browsers
  //
  // *********************************************************************************

  /**
   * Creates a directive registration function where a possible dynamic attribute
   * value will be observed/watched.
   * @param {string} className attribute name; eg `layout-gt-md` with value ="row"
   */
  function attributeWithObserve(className) {

    return ['$mdUtil', '$interpolate', "$log", function(_$mdUtil_, _$interpolate_, _$log_) {
      $mdUtil = _$mdUtil_;
      $interpolate = _$interpolate_;
      $log = _$log_;

      return {
        restrict: 'A',
        compile: function(element, attr) {
          var linkFn;
          if (config.enabled) {
            // immediately replace static (non-interpolated) invalid values...

            validateAttributeUsage(className, attr, element, $log);

            validateAttributeValue( className,
              getNormalizedAttrValue(className, attr, ""),
              buildUpdateFn(element, className, attr)
            );

            linkFn = translateWithValueToCssClass;
          }

          // Use for postLink to account for transforms after ng-transclude.
          return linkFn || angular.noop;
        }
      };
    }];

    /**
     * Add as transformed class selector(s), then
     * remove the deprecated attribute selector
     */
    function translateWithValueToCssClass(scope, element, attrs) {
      var updateFn = updateClassWithValue(element, className, attrs);
      var unwatch = attrs.$observe(attrs.$normalize(className), updateFn);

      updateFn(getNormalizedAttrValue(className, attrs, ""));
      scope.$on("$destroy", function() { unwatch(); });
    }
  }

  /**
   * Creates a registration function for AngularJS Material Layout attribute directive.
   * This is a `simple` transpose of attribute usage to class usage; where we ignore
   * any attribute value
   */
  function attributeWithoutValue(className) {
    return ['$mdUtil', '$interpolate', "$log", function(_$mdUtil_, _$interpolate_, _$log_) {
      $mdUtil = _$mdUtil_;
      $interpolate = _$interpolate_;
      $log = _$log_;

      return {
        restrict: 'A',
        compile: function(element, attr) {
          var linkFn;
          if (config.enabled) {
            // immediately replace static (non-interpolated) invalid values...

            validateAttributeValue( className,
              getNormalizedAttrValue(className, attr, ""),
              buildUpdateFn(element, className, attr)
            );

            translateToCssClass(null, element);

            // Use for postLink to account for transforms after ng-transclude.
            linkFn = translateToCssClass;
          }

          return linkFn || angular.noop;
        }
      };
    }];

    /**
     * Add as transformed class selector, then
     * remove the deprecated attribute selector
     */
    function translateToCssClass(scope, element) {
      element.addClass(className);
    }
  }



  /**
   * After link-phase, do NOT remove deprecated layout attribute selector.
   * Instead watch the attribute so interpolated data-bindings to layout
   * selectors will continue to be supported.
   *
   * $observe() the className and update with new class (after removing the last one)
   *
   * e.g. `layout="{{layoutDemo.direction}}"` will update...
   *
   * NOTE: The value must match one of the specified styles in the CSS.
   * For example `flex-gt-md="{{size}}`  where `scope.size == 47` will NOT work since
   * only breakpoints for 0, 5, 10, 15... 100, 33, 34, 66, 67 are defined.
   *
   */
  function updateClassWithValue(element, className) {
    var lastClass;

    return function updateClassFn(newValue) {
      var value = validateAttributeValue(className, newValue || "");
      if ( angular.isDefined(value) ) {
        if (lastClass) element.removeClass(lastClass);
        lastClass = !value ? className : className + "-" + value.trim().replace(WHITESPACE, "-");
        element.addClass(lastClass);
      }
    };
  }

  /**
   * Provide console warning that this layout attribute has been deprecated
   *
   */
  function warnAttrNotSupported(className) {
    var parts = className.split("-");
    return ["$log", function($log) {
      $log.warn(className + "has been deprecated. Please use a `" + parts[0] + "-gt-<xxx>` variant.");
      return angular.noop;
    }];
  }

  /**
   * Centralize warnings for known flexbox issues (especially IE-related issues)
   */
  function validateAttributeUsage(className, attr, element, $log){
    var message, usage, url;
    var nodeName = element[0].nodeName.toLowerCase();

    switch(className.replace(SUFFIXES,"")) {
      case "flex":
        if ((nodeName == "md-button") || (nodeName == "fieldset")){
          // @see https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers
          // Use <div flex> wrapper inside (preferred) or outside

          usage = "<" + nodeName + " " + className + "></" + nodeName + ">";
          url = "https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers";
          message = "Markup '{0}' may not work as expected in IE Browsers. Consult '{1}' for details.";

          $log.warn( $mdUtil.supplant(message, [usage, url]) );
        }
    }

  }


  /**
   * For the Layout attribute value, validate or replace with default
   * fallback value
   */
  function validateAttributeValue(className, value, updateFn) {
    var origValue;

    if (!needsInterpolation(value)) {
      switch (className.replace(SUFFIXES,"")) {
        case 'layout'        :
          if ( !findIn(value, LAYOUT_OPTIONS) ) {
            value = LAYOUT_OPTIONS[0];    // 'row';
          }
          break;

        case 'flex'          :
          if (!findIn(value, FLEX_OPTIONS)) {
            if (isNaN(value)) {
              value = '';
            }
          }
          break;

        case 'flex-offset' :
        case 'flex-order'    :
          if (!value || isNaN(+value)) {
            value = '0';
          }
          break;

        case 'layout-align'  :
          var axis = extractAlignAxis(value);
          value = $mdUtil.supplant("{main}-{cross}",axis);
          break;

        case 'layout-padding' :
        case 'layout-margin'  :
        case 'layout-fill'    :
        case 'layout-wrap'    :
        case 'layout-nowrap' :
          value = '';
          break;
      }

      if (value != origValue) {
        (updateFn || angular.noop)(value);
      }
    }

    return value ? value.trim() : "";
  }

  /**
   * Replace current attribute value with fallback value
   */
  function buildUpdateFn(element, className, attrs) {
    return function updateAttrValue(fallback) {
      if (!needsInterpolation(fallback)) {
        // Do not modify the element's attribute value; so
        // uses '<ui-layout layout="/api/sidebar.html" />' will not
        // be affected. Just update the attrs value.
        attrs[attrs.$normalize(className)] = fallback;
      }
    };
  }

  /**
   * See if the original value has interpolation symbols:
   * e.g.  flex-gt-md="{{triggerPoint}}"
   */
  function needsInterpolation(value) {
    return (value || "").indexOf($interpolate.startSymbol()) > -1;
  }

  function getNormalizedAttrValue(className, attrs, defaultVal) {
    var normalizedAttr = attrs.$normalize(className);
    return attrs[normalizedAttr] ? attrs[normalizedAttr].trim().replace(WHITESPACE, "-") : defaultVal || null;
  }

  function findIn(item, list, replaceWith) {
    item = replaceWith && item ? item.replace(WHITESPACE, replaceWith) : item;

    var found = false;
    if (item) {
      list.forEach(function(it) {
        it = replaceWith ? it.replace(WHITESPACE, replaceWith) : it;
        found = found || (it === item);
      });
    }
    return found;
  }

  function extractAlignAxis(attrValue) {
    var axis = {
      main : "start",
      cross: "stretch"
    }, values;

    attrValue = (attrValue || "");

    if ( attrValue.indexOf("-") === 0 || attrValue.indexOf(" ") === 0) {
      // For missing main-axis values
      attrValue = "none" + attrValue;
    }

    values = attrValue.toLowerCase().trim().replace(WHITESPACE, "-").split("-");
    if ( values.length && (values[0] === "space") ) {
      // for main-axis values of "space-around" or "space-between"
      values = [ values[0]+"-"+values[1],values[2] ];
    }

    if ( values.length > 0 ) axis.main  = values[0] || axis.main;
    if ( values.length > 1 ) axis.cross = values[1] || axis.cross;

    if ( ALIGNMENT_MAIN_AXIS.indexOf(axis.main) < 0 )   axis.main = "start";
    if ( ALIGNMENT_CROSS_AXIS.indexOf(axis.cross) < 0 ) axis.cross = "stretch";

    return axis;
  }


})();

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.core.liveannouncer
 * @description
 * AngularJS Material Live Announcer to provide accessibility for Voice Readers.
 */
MdLiveAnnouncer.$inject = ["$timeout"];
angular
  .module('material.core')
  .service('$mdLiveAnnouncer', MdLiveAnnouncer);

/**
 * @ngdoc service
 * @name $mdLiveAnnouncer
 * @module material.core.liveannouncer
 *
 * @description
 *
 * Service to announce messages to supported screenreaders.
 *
 * > The `$mdLiveAnnouncer` service is internally used for components to provide proper accessibility.
 *
 * <hljs lang="js">
 *   module.controller('AppCtrl', function($mdLiveAnnouncer) {
 *     // Basic announcement (Polite Mode)
 *     $mdLiveAnnouncer.announce('Hey Google');
 *
 *     // Custom announcement (Assertive Mode)
 *     $mdLiveAnnouncer.announce('Hey Google', 'assertive');
 *   });
 * </hljs>
 *
 */
function MdLiveAnnouncer($timeout) {
  /** @private @const @type {!angular.$timeout} */
  this._$timeout = $timeout;

  /** @private @const @type {!HTMLElement} */
  this._liveElement = this._createLiveElement();

  /** @private @const @type {!number} */
  this._announceTimeout = 100;
}

/**
 * @ngdoc method
 * @name $mdLiveAnnouncer#announce
 * @description Announces messages to supported screenreaders.
 * @param {string} message Message to be announced to the screenreader
 * @param {'off'|'polite'|'assertive'} politeness The politeness of the announcer element.
 */
MdLiveAnnouncer.prototype.announce = function(message, politeness) {
  if (!politeness) {
    politeness = 'polite';
  }

  var self = this;

  self._liveElement.textContent = '';
  self._liveElement.setAttribute('aria-live', politeness);

  // This 100ms timeout is necessary for some browser + screen-reader combinations:
  // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
  // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
  //   second time without clearing and then using a non-zero delay.
  // (using JAWS 17 at time of this writing).
  self._$timeout(function() {
    self._liveElement.textContent = message;
  }, self._announceTimeout, false);
};

/**
 * Creates a live announcer element, which listens for DOM changes and announces them
 * to the screenreaders.
 * @returns {!HTMLElement}
 * @private
 */
MdLiveAnnouncer.prototype._createLiveElement = function() {
  var liveEl = document.createElement('div');

  liveEl.classList.add('md-visually-hidden');
  liveEl.setAttribute('role', 'status');
  liveEl.setAttribute('aria-atomic', 'true');
  liveEl.setAttribute('aria-live', 'polite');

  document.body.appendChild(liveEl);

  return liveEl;
};

})();
(function(){
"use strict";

/**
 * @ngdoc service
 * @name $$mdMeta
 * @module material.core.meta
 *
 * @description
 *
 * A provider and a service that simplifies meta tags access
 *
 * Note: This is intended only for use with dynamic meta tags such as browser color and title.
 * Tags that are only processed when the page is rendered (such as `charset`, and `http-equiv`)
 * will not work since `$$mdMeta` adds the tags after the page has already been loaded.
 *
 * ```js
 * app.config(function($$mdMetaProvider) {
 *   var removeMeta = $$mdMetaProvider.setMeta('meta-name', 'content');
 *   var metaValue  = $$mdMetaProvider.getMeta('meta-name'); // -> 'content'
 *
 *   removeMeta();
 * });
 *
 * app.controller('myController', function($$mdMeta) {
 *   var removeMeta = $$mdMeta.setMeta('meta-name', 'content');
 *   var metaValue  = $$mdMeta.getMeta('meta-name'); // -> 'content'
 *
 *   removeMeta();
 * });
 * ```
 *
 * @returns {$$mdMeta.$service}
 *
 */
angular.module('material.core.meta', [])
  .provider('$$mdMeta', function () {
    var head = angular.element(document.head);
    var metaElements = {};

    /**
     * Checks if the requested element was written manually and maps it
     *
     * @param {string} name meta tag 'name' attribute value
     * @returns {boolean} returns true if there is an element with the requested name
     */
    function mapExistingElement(name) {
      if (metaElements[name]) {
        return true;
      }

      var element = document.getElementsByName(name)[0];

      if (!element) {
        return false;
      }

      metaElements[name] = angular.element(element);

      return true;
    }

    /**
     * @ngdoc method
     * @name $$mdMeta#setMeta
     *
     * @description
     * Creates meta element with the 'name' and 'content' attributes,
     * if the meta tag is already created than we replace the 'content' value
     *
     * @param {string} name meta tag 'name' attribute value
     * @param {string} content meta tag 'content' attribute value
     * @returns {function} remove function
     *
     */
    function setMeta(name, content) {
      mapExistingElement(name);

      if (!metaElements[name]) {
        var newMeta = angular.element('<meta name="' + name + '" content="' + content + '"/>');
        head.append(newMeta);
        metaElements[name] = newMeta;
      }
      else {
        metaElements[name].attr('content', content);
      }

      return function () {
        metaElements[name].attr('content', '');
        metaElements[name].remove();
        delete metaElements[name];
      };
    }

    /**
     * @ngdoc method
     * @name $$mdMeta#getMeta
     *
     * @description
     * Gets the 'content' attribute value of the wanted meta element
     *
     * @param {string} name meta tag 'name' attribute value
     * @returns {string} content attribute value
     */
    function getMeta(name) {
      if (!mapExistingElement(name)) {
        throw Error('$$mdMeta: could not find a meta tag with the name \'' + name + '\'');
      }

      return metaElements[name].attr('content');
    }

    var module = {
      setMeta: setMeta,
      getMeta: getMeta
    };

    return angular.extend({}, module, {
      $get: function () {
        return module;
      }
    });
  });
})();
(function(){
"use strict";

  /**
   * @ngdoc module
   * @name material.core.componentRegistry
   *
   * @description
   * A component instance registration service.
   * Note: currently this as a private service in the SideNav component.
   */
  ComponentRegistry.$inject = ["$log", "$q"];
  angular.module('material.core')
    .factory('$mdComponentRegistry', ComponentRegistry);

  /*
   * @private
   * @ngdoc factory
   * @name ComponentRegistry
   * @module material.core.componentRegistry
   *
   */
  function ComponentRegistry($log, $q) {

    var self;
    var instances = [ ];
    var pendings = { };

    return self = {
      /**
       * Used to print an error when an instance for a handle isn't found.
       */
      notFoundError: function(handle, msgContext) {
        $log.error( (msgContext || "") + 'No instance found for handle', handle);
      },
      /**
       * Return all registered instances as an array.
       */
      getInstances: function() {
        return instances;
      },

      /**
       * Get a registered instance.
       * @param handle the String handle to look up for a registered instance.
       */
      get: function(handle) {
        if ( !isValidID(handle) ) return null;

        var i, j, instance;
        for(i = 0, j = instances.length; i < j; i++) {
          instance = instances[i];
          if(instance.$$mdHandle === handle) {
            return instance;
          }
        }
        return null;
      },

      /**
       * Register an instance.
       * @param instance the instance to register
       * @param handle the handle to identify the instance under.
       */
      register: function(instance, handle) {
        if ( !handle ) return angular.noop;

        instance.$$mdHandle = handle;
        instances.push(instance);
        resolveWhen();

        return deregister;

        /**
         * Remove registration for an instance
         */
        function deregister() {
          var index = instances.indexOf(instance);
          if (index !== -1) {
            instances.splice(index, 1);
          }
        }

        /**
         * Resolve any pending promises for this instance
         */
        function resolveWhen() {
          var dfd = pendings[handle];
          if ( dfd ) {
            dfd.forEach(function (promise) {
              promise.resolve(instance);
            });
            delete pendings[handle];
          }
        }
      },

      /**
       * Async accessor to registered component instance
       * If not available then a promise is created to notify
       * all listeners when the instance is registered.
       */
      when : function(handle) {
        if ( isValidID(handle) ) {
          var deferred = $q.defer();
          var instance = self.get(handle);

          if ( instance )  {
            deferred.resolve( instance );
          } else {
            if (pendings[handle] === undefined) {
              pendings[handle] = [];
            }
            pendings[handle].push(deferred);
          }

          return deferred.promise;
        }
        return $q.reject("Invalid `md-component-id` value.");
      }

    };

    function isValidID(handle){
      return handle && (handle !== "");
    }

  }

})();
(function(){
"use strict";

(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name $mdButtonInkRipple
   * @module material.core
   *
   * @description
   * Provides ripple effects for md-button.  See $mdInkRipple service for all possible configuration options.
   *
   * @param {object=} scope Scope within the current context
   * @param {object=} element The element the ripple effect should be applied to
   * @param {object=} options (Optional) Configuration options to override the default ripple configuration
   */

  MdButtonInkRipple.$inject = ["$mdInkRipple"];
  angular.module('material.core')
    .factory('$mdButtonInkRipple', MdButtonInkRipple);

  function MdButtonInkRipple($mdInkRipple) {
    return {
      attach: function attachRipple(scope, element, options) {
        options = angular.extend(optionsForElement(element), options);

        return $mdInkRipple.attach(scope, element, options);
      }
    };

    function optionsForElement(element) {
      if (element.hasClass('md-icon-button')) {
        return {
          isMenuItem: element.hasClass('md-menu-item'),
          fitRipple: true,
          center: true
        };
      } else {
        return {
          isMenuItem: element.hasClass('md-menu-item'),
          dimBackground: true
        };
      }
    }
  }
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

    /**
   * @ngdoc service
   * @name $mdCheckboxInkRipple
   * @module material.core
   *
   * @description
   * Provides ripple effects for md-checkbox.  See $mdInkRipple service for all possible configuration options.
   *
   * @param {object=} scope Scope within the current context
   * @param {object=} element The element the ripple effect should be applied to
   * @param {object=} options (Optional) Configuration options to override the defaultripple configuration
   */

  MdCheckboxInkRipple.$inject = ["$mdInkRipple"];
  angular.module('material.core')
    .factory('$mdCheckboxInkRipple', MdCheckboxInkRipple);

  function MdCheckboxInkRipple($mdInkRipple) {
    return {
      attach: attach
    };

    function attach(scope, element, options) {
      return $mdInkRipple.attach(scope, element, angular.extend({
        center: true,
        dimBackground: false,
        fitRipple: true
      }, options));
    }
  }
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name $mdListInkRipple
   * @module material.core
   *
   * @description
   * Provides ripple effects for md-list.  See $mdInkRipple service for all possible configuration options.
   *
   * @param {object=} scope Scope within the current context
   * @param {object=} element The element the ripple effect should be applied to
   * @param {object=} options (Optional) Configuration options to override the defaultripple configuration
   */

  MdListInkRipple.$inject = ["$mdInkRipple"];
  angular.module('material.core')
    .factory('$mdListInkRipple', MdListInkRipple);

  function MdListInkRipple($mdInkRipple) {
    return {
      attach: attach
    };

    function attach(scope, element, options) {
      return $mdInkRipple.attach(scope, element, angular.extend({
        center: false,
        dimBackground: true,
        outline: false,
        rippleSize: 'full'
      }, options));
    }
  }
})();

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.core.ripple
 * @description
 * Ripple
 */
InkRippleCtrl.$inject = ["$scope", "$element", "rippleOptions", "$window", "$timeout", "$mdUtil", "$mdColorUtil"];
InkRippleDirective.$inject = ["$mdButtonInkRipple", "$mdCheckboxInkRipple"];
angular.module('material.core')
    .provider('$mdInkRipple', InkRippleProvider)
    .directive('mdInkRipple', InkRippleDirective)
    .directive('mdNoInk', attrNoDirective)
    .directive('mdNoBar', attrNoDirective)
    .directive('mdNoStretch', attrNoDirective);

var DURATION = 200;

/**
 * @ngdoc directive
 * @name mdInkRipple
 * @module material.core.ripple
 *
 * @description
 * The `md-ink-ripple` directive allows you to specify the ripple color or if a ripple is allowed.
 *
 * @param {string|boolean} md-ink-ripple A color string `#FF0000` or boolean (`false` or `0`) for preventing ripple
 *
 * @usage
 * ### String values
 * <hljs lang="html">
 *   <ANY md-ink-ripple="#FF0000">
 *     Ripples in red
 *   </ANY>
 *
 *   <ANY md-ink-ripple="false">
 *     Not rippling
 *   </ANY>
 * </hljs>
 *
 * ### Interpolated values
 * <hljs lang="html">
 *   <ANY md-ink-ripple="{{ randomColor() }}">
 *     Ripples with the return value of 'randomColor' function
 *   </ANY>
 *
 *   <ANY md-ink-ripple="{{ canRipple() }}">
 *     Ripples if 'canRipple' function return value is not 'false' or '0'
 *   </ANY>
 * </hljs>
 */
function InkRippleDirective ($mdButtonInkRipple, $mdCheckboxInkRipple) {
  return {
    controller: angular.noop,
    link:       function (scope, element, attr) {
      attr.hasOwnProperty('mdInkRippleCheckbox')
          ? $mdCheckboxInkRipple.attach(scope, element)
          : $mdButtonInkRipple.attach(scope, element);
    }
  };
}

/**
 * @ngdoc service
 * @name $mdInkRipple
 * @module material.core.ripple
 *
 * @description
 * `$mdInkRipple` is a service for adding ripples to any element
 *
 * @usage
 * <hljs lang="js">
 * app.factory('$myElementInkRipple', function($mdInkRipple) {
 *   return {
 *     attach: function (scope, element, options) {
 *       return $mdInkRipple.attach(scope, element, angular.extend({
 *         center: false,
 *         dimBackground: true
 *       }, options));
 *     }
 *   };
 * });
 *
 * app.controller('myController', function ($scope, $element, $myElementInkRipple) {
 *   $scope.onClick = function (ev) {
 *     $myElementInkRipple.attach($scope, angular.element(ev.target), { center: true });
 *   }
 * });
 * </hljs>
 *
 * ### Disabling ripples globally
 * If you want to disable ink ripples globally, for all components, you can call the
 * `disableInkRipple` method in your app's config.
 *
 * <hljs lang="js">
 * app.config(function ($mdInkRippleProvider) {
 *   $mdInkRippleProvider.disableInkRipple();
 * });
 */

function InkRippleProvider () {
  var isDisabledGlobally = false;

  return {
    disableInkRipple: disableInkRipple,
    $get: ["$injector", function($injector) {
      return { attach: attach };

      /**
       * @ngdoc method
       * @name $mdInkRipple#attach
       *
       * @description
       * Attaching given scope, element and options to inkRipple controller
       *
       * @param {object=} scope Scope within the current context
       * @param {object=} element The element the ripple effect should be applied to
       * @param {object=} options (Optional) Configuration options to override the defaultRipple configuration
       * * `center` -  Whether the ripple should start from the center of the container element
       * * `dimBackground` - Whether the background should be dimmed with the ripple color
       * * `colorElement` - The element the ripple should take its color from, defined by css property `color`
       * * `fitRipple` - Whether the ripple should fill the element
       */
      function attach (scope, element, options) {
        if (isDisabledGlobally || element.controller('mdNoInk')) return angular.noop;
        return $injector.instantiate(InkRippleCtrl, {
          $scope:        scope,
          $element:      element,
          rippleOptions: options
        });
      }
    }]
  };

  /**
   * @ngdoc method
   * @name $mdInkRipple#disableInkRipple
   *
   * @description
   * A config-time method that, when called, disables ripples globally.
   */
  function disableInkRipple () {
    isDisabledGlobally = true;
  }
}

/**
 * Controller used by the ripple service in order to apply ripples
 * @ngInject
 */
function InkRippleCtrl ($scope, $element, rippleOptions, $window, $timeout, $mdUtil, $mdColorUtil) {
  this.$window    = $window;
  this.$timeout   = $timeout;
  this.$mdUtil    = $mdUtil;
  this.$mdColorUtil    = $mdColorUtil;
  this.$scope     = $scope;
  this.$element   = $element;
  this.options    = rippleOptions;
  this.mousedown  = false;
  this.ripples    = [];
  this.timeout    = null; // Stores a reference to the most-recent ripple timeout
  this.lastRipple = null;

  $mdUtil.valueOnUse(this, 'container', this.createContainer);

  this.$element.addClass('md-ink-ripple');

  // attach method for unit tests
  ($element.controller('mdInkRipple') || {}).createRipple = angular.bind(this, this.createRipple);
  ($element.controller('mdInkRipple') || {}).setColor = angular.bind(this, this.color);

  this.bindEvents();
}


/**
 * Either remove or unlock any remaining ripples when the user mouses off of the element (either by
 * mouseup or mouseleave event)
 */
function autoCleanup (self, cleanupFn) {

  if ( self.mousedown || self.lastRipple ) {
    self.mousedown = false;
    self.$mdUtil.nextTick( angular.bind(self, cleanupFn), false);
  }

}


/**
 * Returns the color that the ripple should be (either based on CSS or hard-coded)
 * @returns {string}
 */
InkRippleCtrl.prototype.color = function (value) {
  var self = this;

  // If assigning a color value, apply it to background and the ripple color
  if (angular.isDefined(value)) {
    self._color = self._parseColor(value);
  }

  // If color lookup, use assigned, defined, or inherited
  return self._color || self._parseColor( self.inkRipple() ) || self._parseColor( getElementColor() );

  /**
   * Finds the color element and returns its text color for use as default ripple color
   * @returns {string}
   */
  function getElementColor () {
    var items = self.options && self.options.colorElement ? self.options.colorElement : [];
    var elem =  items.length ? items[ 0 ] : self.$element[ 0 ];

    return elem ? self.$window.getComputedStyle(elem).color : 'rgb(0,0,0)';
  }
};

/**
 * Updating the ripple colors based on the current inkRipple value
 * or the element's computed style color
 */
InkRippleCtrl.prototype.calculateColor = function () {
  return this.color();
};


/**
 * Takes a string color and converts it to RGBA format
 * @param color {string}
 * @param [multiplier] {int}
 * @returns {string}
 */

InkRippleCtrl.prototype._parseColor = function parseColor (color, multiplier) {
  multiplier = multiplier || 1;
  var colorUtil = this.$mdColorUtil;

  if (!color) return;
  if (color.indexOf('rgba') === 0) return color.replace(/\d?\.?\d*\s*\)\s*$/, (0.1 * multiplier).toString() + ')');
  if (color.indexOf('rgb') === 0) return colorUtil.rgbToRgba(color);
  if (color.indexOf('#') === 0) return colorUtil.hexToRgba(color);

};

/**
 * Binds events to the root element for
 */
InkRippleCtrl.prototype.bindEvents = function () {
  this.$element.on('mousedown', angular.bind(this, this.handleMousedown));
  this.$element.on('mouseup touchend', angular.bind(this, this.handleMouseup));
  this.$element.on('mouseleave', angular.bind(this, this.handleMouseup));
  this.$element.on('touchmove', angular.bind(this, this.handleTouchmove));
};

/**
 * Create a new ripple on every mousedown event from the root element
 * @param event {MouseEvent}
 */
InkRippleCtrl.prototype.handleMousedown = function (event) {
  if ( this.mousedown ) return;

  // When jQuery is loaded, we have to get the original event
  if (event.hasOwnProperty('originalEvent')) event = event.originalEvent;
  this.mousedown = true;
  if (this.options.center) {
    this.createRipple(this.container.prop('clientWidth') / 2, this.container.prop('clientWidth') / 2);
  } else {

    // We need to calculate the relative coordinates if the target is a sublayer of the ripple element
    if (event.srcElement !== this.$element[0]) {
      var layerRect = this.$element[0].getBoundingClientRect();
      var layerX = event.clientX - layerRect.left;
      var layerY = event.clientY - layerRect.top;

      this.createRipple(layerX, layerY);
    } else {
      this.createRipple(event.offsetX, event.offsetY);
    }
  }
};

/**
 * Either remove or unlock any remaining ripples when the user mouses off of the element (either by
 * mouseup, touchend or mouseleave event)
 */
InkRippleCtrl.prototype.handleMouseup = function () {
  this.$timeout(function () {
    autoCleanup(this, this.clearRipples);
  }.bind(this));
};

/**
 * Either remove or unlock any remaining ripples when the user mouses off of the element (by
 * touchmove)
 */
InkRippleCtrl.prototype.handleTouchmove = function () {
  autoCleanup(this, this.deleteRipples);
};

/**
 * Cycles through all ripples and attempts to remove them.
 */
InkRippleCtrl.prototype.deleteRipples = function () {
  for (var i = 0; i < this.ripples.length; i++) {
    this.ripples[ i ].remove();
  }
};

/**
 * Cycles through all ripples and attempts to remove them with fade.
 * Depending on logic within `fadeInComplete`, some removals will be postponed.
 */
InkRippleCtrl.prototype.clearRipples = function () {
  for (var i = 0; i < this.ripples.length; i++) {
    this.fadeInComplete(this.ripples[ i ]);
  }
};

/**
 * Creates the ripple container element
 * @returns {*}
 */
InkRippleCtrl.prototype.createContainer = function () {
  var container = angular.element('<div class="md-ripple-container"></div>');
  this.$element.append(container);
  return container;
};

InkRippleCtrl.prototype.clearTimeout = function () {
  if (this.timeout) {
    this.$timeout.cancel(this.timeout);
    this.timeout = null;
  }
};

InkRippleCtrl.prototype.isRippleAllowed = function () {
  var element = this.$element[0];
  do {
    if (!element.tagName || element.tagName === 'BODY') break;

    if (element && angular.isFunction(element.hasAttribute)) {
      if (element.hasAttribute('disabled')) return false;
      if (this.inkRipple() === 'false' || this.inkRipple() === '0') return false;
    }

  } while (element = element.parentNode);
  return true;
};

/**
 * The attribute `md-ink-ripple` may be a static or interpolated
 * color value OR a boolean indicator (used to disable ripples)
 */
InkRippleCtrl.prototype.inkRipple = function () {
  return this.$element.attr('md-ink-ripple');
};

/**
 * Creates a new ripple and adds it to the container.  Also tracks ripple in `this.ripples`.
 * @param left
 * @param top
 */
InkRippleCtrl.prototype.createRipple = function (left, top) {
  if (!this.isRippleAllowed()) return;

  var ctrl        = this;
  var colorUtil   = ctrl.$mdColorUtil;
  var ripple      = angular.element('<div class="md-ripple"></div>');
  var width       = this.$element.prop('clientWidth');
  var height      = this.$element.prop('clientHeight');
  var x           = Math.max(Math.abs(width - left), left) * 2;
  var y           = Math.max(Math.abs(height - top), top) * 2;
  var size        = getSize(this.options.fitRipple, x, y);
  var color       = this.calculateColor();

  ripple.css({
    left:            left + 'px',
    top:             top + 'px',
    background:      'black',
    width:           size + 'px',
    height:          size + 'px',
    backgroundColor: colorUtil.rgbaToRgb(color),
    borderColor:     colorUtil.rgbaToRgb(color)
  });
  this.lastRipple = ripple;

  // we only want one timeout to be running at a time
  this.clearTimeout();
  this.timeout    = this.$timeout(function () {
    ctrl.clearTimeout();
    if (!ctrl.mousedown) ctrl.fadeInComplete(ripple);
  }, DURATION * 0.35, false);

  if (this.options.dimBackground) this.container.css({ backgroundColor: color });
  this.container.append(ripple);
  this.ripples.push(ripple);
  ripple.addClass('md-ripple-placed');

  this.$mdUtil.nextTick(function () {

    ripple.addClass('md-ripple-scaled md-ripple-active');
    ctrl.$timeout(function () {
      ctrl.clearRipples();
    }, DURATION, false);

  }, false);

  function getSize (fit, x, y) {
    return fit
        ? Math.max(x, y)
        : Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }
};



/**
 * After fadeIn finishes, either kicks off the fade-out animation or queues the element for removal on mouseup
 * @param ripple
 */
InkRippleCtrl.prototype.fadeInComplete = function (ripple) {
  if (this.lastRipple === ripple) {
    if (!this.timeout && !this.mousedown) {
      this.removeRipple(ripple);
    }
  } else {
    this.removeRipple(ripple);
  }
};

/**
 * Kicks off the animation for removing a ripple
 * @param ripple {Element}
 */
InkRippleCtrl.prototype.removeRipple = function (ripple) {
  var ctrl  = this;
  var index = this.ripples.indexOf(ripple);
  if (index < 0) return;
  this.ripples.splice(this.ripples.indexOf(ripple), 1);
  ripple.removeClass('md-ripple-active');
  ripple.addClass('md-ripple-remove');
  if (this.ripples.length === 0) this.container.css({ backgroundColor: '' });
  // use a 2-second timeout in order to allow for the animation to finish
  // we don't actually care how long the animation takes
  this.$timeout(function () {
    ctrl.fadeOutComplete(ripple);
  }, DURATION, false);
};

/**
 * Removes the provided ripple from the DOM
 * @param ripple
 */
InkRippleCtrl.prototype.fadeOutComplete = function (ripple) {
  ripple.remove();
  this.lastRipple = null;
};

/**
 * Used to create an empty directive.  This is used to track flag-directives whose children may have
 * functionality based on them.
 *
 * Example: `md-no-ink` will potentially be used by all child directives.
 */
function attrNoDirective () {
  return { controller: angular.noop };
}

})();
(function(){
"use strict";

(function() {
  'use strict';

    /**
   * @ngdoc service
   * @name $mdTabInkRipple
   * @module material.core
   *
   * @description
   * Provides ripple effects for md-tabs.  See $mdInkRipple service for all possible configuration options.
   *
   * @param {object=} scope Scope within the current context
   * @param {object=} element The element the ripple effect should be applied to
   * @param {object=} options (Optional) Configuration options to override the defaultripple configuration
   */

  MdTabInkRipple.$inject = ["$mdInkRipple"];
  angular.module('material.core')
    .factory('$mdTabInkRipple', MdTabInkRipple);

  function MdTabInkRipple($mdInkRipple) {
    return {
      attach: attach
    };

    function attach(scope, element, options) {
      return $mdInkRipple.attach(scope, element, angular.extend({
        center: false,
        dimBackground: true,
        outline: false,
        rippleSize: 'full'
      }, options));
    }
  }
})();

})();
(function(){
"use strict";

angular.module('material.core.theming.palette', [])
.constant('$mdColorPalette', {
  'red': {
    '50': '#ffebee',
    '100': '#ffcdd2',
    '200': '#ef9a9a',
    '300': '#e57373',
    '400': '#ef5350',
    '500': '#f44336',
    '600': '#e53935',
    '700': '#d32f2f',
    '800': '#c62828',
    '900': '#b71c1c',
    'A100': '#ff8a80',
    'A200': '#ff5252',
    'A400': '#ff1744',
    'A700': '#d50000',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 A100',
    'contrastStrongLightColors': '400 500 600 700 A200 A400 A700'
  },
  'pink': {
    '50': '#fce4ec',
    '100': '#f8bbd0',
    '200': '#f48fb1',
    '300': '#f06292',
    '400': '#ec407a',
    '500': '#e91e63',
    '600': '#d81b60',
    '700': '#c2185b',
    '800': '#ad1457',
    '900': '#880e4f',
    'A100': '#ff80ab',
    'A200': '#ff4081',
    'A400': '#f50057',
    'A700': '#c51162',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100',
    'contrastStrongLightColors': '500 600 A200 A400 A700'
  },
  'purple': {
    '50': '#f3e5f5',
    '100': '#e1bee7',
    '200': '#ce93d8',
    '300': '#ba68c8',
    '400': '#ab47bc',
    '500': '#9c27b0',
    '600': '#8e24aa',
    '700': '#7b1fa2',
    '800': '#6a1b9a',
    '900': '#4a148c',
    'A100': '#ea80fc',
    'A200': '#e040fb',
    'A400': '#d500f9',
    'A700': '#aa00ff',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100',
    'contrastStrongLightColors': '300 400 A200 A400 A700'
  },
  'deep-purple': {
    '50': '#ede7f6',
    '100': '#d1c4e9',
    '200': '#b39ddb',
    '300': '#9575cd',
    '400': '#7e57c2',
    '500': '#673ab7',
    '600': '#5e35b1',
    '700': '#512da8',
    '800': '#4527a0',
    '900': '#311b92',
    'A100': '#b388ff',
    'A200': '#7c4dff',
    'A400': '#651fff',
    'A700': '#6200ea',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100',
    'contrastStrongLightColors': '300 400 A200'
  },
  'indigo': {
    '50': '#e8eaf6',
    '100': '#c5cae9',
    '200': '#9fa8da',
    '300': '#7986cb',
    '400': '#5c6bc0',
    '500': '#3f51b5',
    '600': '#3949ab',
    '700': '#303f9f',
    '800': '#283593',
    '900': '#1a237e',
    'A100': '#8c9eff',
    'A200': '#536dfe',
    'A400': '#3d5afe',
    'A700': '#304ffe',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100',
    'contrastStrongLightColors': '300 400 A200 A400'
  },
  'blue': {
    '50': '#e3f2fd',
    '100': '#bbdefb',
    '200': '#90caf9',
    '300': '#64b5f6',
    '400': '#42a5f5',
    '500': '#2196f3',
    '600': '#1e88e5',
    '700': '#1976d2',
    '800': '#1565c0',
    '900': '#0d47a1',
    'A100': '#82b1ff',
    'A200': '#448aff',
    'A400': '#2979ff',
    'A700': '#2962ff',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 400 A100',
    'contrastStrongLightColors': '500 600 700 A200 A400 A700'
  },
  'light-blue': {
    '50': '#e1f5fe',
    '100': '#b3e5fc',
    '200': '#81d4fa',
    '300': '#4fc3f7',
    '400': '#29b6f6',
    '500': '#03a9f4',
    '600': '#039be5',
    '700': '#0288d1',
    '800': '#0277bd',
    '900': '#01579b',
    'A100': '#80d8ff',
    'A200': '#40c4ff',
    'A400': '#00b0ff',
    'A700': '#0091ea',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '600 700 800 900 A700',
    'contrastStrongLightColors': '600 700 800 A700'
  },
  'cyan': {
    '50': '#e0f7fa',
    '100': '#b2ebf2',
    '200': '#80deea',
    '300': '#4dd0e1',
    '400': '#26c6da',
    '500': '#00bcd4',
    '600': '#00acc1',
    '700': '#0097a7',
    '800': '#00838f',
    '900': '#006064',
    'A100': '#84ffff',
    'A200': '#18ffff',
    'A400': '#00e5ff',
    'A700': '#00b8d4',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '700 800 900',
    'contrastStrongLightColors': '700 800 900'
  },
  'teal': {
    '50': '#e0f2f1',
    '100': '#b2dfdb',
    '200': '#80cbc4',
    '300': '#4db6ac',
    '400': '#26a69a',
    '500': '#009688',
    '600': '#00897b',
    '700': '#00796b',
    '800': '#00695c',
    '900': '#004d40',
    'A100': '#a7ffeb',
    'A200': '#64ffda',
    'A400': '#1de9b6',
    'A700': '#00bfa5',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '500 600 700 800 900',
    'contrastStrongLightColors': '500 600 700'
  },
  'green': {
    '50': '#e8f5e9',
    '100': '#c8e6c9',
    '200': '#a5d6a7',
    '300': '#81c784',
    '400': '#66bb6a',
    '500': '#4caf50',
    '600': '#43a047',
    '700': '#388e3c',
    '800': '#2e7d32',
    '900': '#1b5e20',
    'A100': '#b9f6ca',
    'A200': '#69f0ae',
    'A400': '#00e676',
    'A700': '#00c853',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '500 600 700 800 900',
    'contrastStrongLightColors': '500 600 700'
  },
  'light-green': {
    '50': '#f1f8e9',
    '100': '#dcedc8',
    '200': '#c5e1a5',
    '300': '#aed581',
    '400': '#9ccc65',
    '500': '#8bc34a',
    '600': '#7cb342',
    '700': '#689f38',
    '800': '#558b2f',
    '900': '#33691e',
    'A100': '#ccff90',
    'A200': '#b2ff59',
    'A400': '#76ff03',
    'A700': '#64dd17',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '700 800 900',
    'contrastStrongLightColors': '700 800 900'
  },
  'lime': {
    '50': '#f9fbe7',
    '100': '#f0f4c3',
    '200': '#e6ee9c',
    '300': '#dce775',
    '400': '#d4e157',
    '500': '#cddc39',
    '600': '#c0ca33',
    '700': '#afb42b',
    '800': '#9e9d24',
    '900': '#827717',
    'A100': '#f4ff81',
    'A200': '#eeff41',
    'A400': '#c6ff00',
    'A700': '#aeea00',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '900',
    'contrastStrongLightColors': '900'
  },
  'yellow': {
    '50': '#fffde7',
    '100': '#fff9c4',
    '200': '#fff59d',
    '300': '#fff176',
    '400': '#ffee58',
    '500': '#ffeb3b',
    '600': '#fdd835',
    '700': '#fbc02d',
    '800': '#f9a825',
    '900': '#f57f17',
    'A100': '#ffff8d',
    'A200': '#ffff00',
    'A400': '#ffea00',
    'A700': '#ffd600',
    'contrastDefaultColor': 'dark'
  },
  'amber': {
    '50': '#fff8e1',
    '100': '#ffecb3',
    '200': '#ffe082',
    '300': '#ffd54f',
    '400': '#ffca28',
    '500': '#ffc107',
    '600': '#ffb300',
    '700': '#ffa000',
    '800': '#ff8f00',
    '900': '#ff6f00',
    'A100': '#ffe57f',
    'A200': '#ffd740',
    'A400': '#ffc400',
    'A700': '#ffab00',
    'contrastDefaultColor': 'dark'
  },
  'orange': {
    '50': '#fff3e0',
    '100': '#ffe0b2',
    '200': '#ffcc80',
    '300': '#ffb74d',
    '400': '#ffa726',
    '500': '#ff9800',
    '600': '#fb8c00',
    '700': '#f57c00',
    '800': '#ef6c00',
    '900': '#e65100',
    'A100': '#ffd180',
    'A200': '#ffab40',
    'A400': '#ff9100',
    'A700': '#ff6d00',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '800 900',
    'contrastStrongLightColors': '800 900'
  },
  'deep-orange': {
    '50': '#fbe9e7',
    '100': '#ffccbc',
    '200': '#ffab91',
    '300': '#ff8a65',
    '400': '#ff7043',
    '500': '#ff5722',
    '600': '#f4511e',
    '700': '#e64a19',
    '800': '#d84315',
    '900': '#bf360c',
    'A100': '#ff9e80',
    'A200': '#ff6e40',
    'A400': '#ff3d00',
    'A700': '#dd2c00',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 400 A100 A200',
    'contrastStrongLightColors': '500 600 700 800 900 A400 A700'
  },
  'brown': {
    '50': '#efebe9',
    '100': '#d7ccc8',
    '200': '#bcaaa4',
    '300': '#a1887f',
    '400': '#8d6e63',
    '500': '#795548',
    '600': '#6d4c41',
    '700': '#5d4037',
    '800': '#4e342e',
    '900': '#3e2723',
    'A100': '#d7ccc8',
    'A200': '#bcaaa4',
    'A400': '#8d6e63',
    'A700': '#5d4037',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100 A200',
    'contrastStrongLightColors': '300 400'
  },
  'grey': {
    '50': '#fafafa',
    '100': '#f5f5f5',
    '200': '#eeeeee',
    '300': '#e0e0e0',
    '400': '#bdbdbd',
    '500': '#9e9e9e',
    '600': '#757575',
    '700': '#616161',
    '800': '#424242',
    '900': '#212121',
    'A100': '#ffffff',
    'A200': '#000000',
    'A400': '#303030',
    'A700': '#616161',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '600 700 800 900 A200 A400 A700'
  },
  'blue-grey': {
    '50': '#eceff1',
    '100': '#cfd8dc',
    '200': '#b0bec5',
    '300': '#90a4ae',
    '400': '#78909c',
    '500': '#607d8b',
    '600': '#546e7a',
    '700': '#455a64',
    '800': '#37474f',
    '900': '#263238',
    'A100': '#cfd8dc',
    'A200': '#b0bec5',
    'A400': '#78909c',
    'A700': '#455a64',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 A100 A200',
    'contrastStrongLightColors': '400 500 700'
  }
});

})();
(function(){
"use strict";

(function(angular) {
  'use strict';
/**
 * @ngdoc module
 * @name material.core.theming
 * @description
 * Theming
 */
detectDisabledThemes.$inject = ["$mdThemingProvider"];
ThemingDirective.$inject = ["$mdTheming", "$interpolate", "$parse", "$mdUtil", "$q", "$log"];
ThemableDirective.$inject = ["$mdTheming"];
ThemingProvider.$inject = ["$mdColorPalette", "$$mdMetaProvider"];
generateAllThemes.$inject = ["$injector", "$mdTheming"];
angular.module('material.core.theming', ['material.core.theming.palette', 'material.core.meta'])
  .directive('mdTheme', ThemingDirective)
  .directive('mdThemable', ThemableDirective)
  .directive('mdThemesDisabled', disableThemesDirective )
  .provider('$mdTheming', ThemingProvider)
  .config( detectDisabledThemes )
  .run(generateAllThemes);

/**
 * Detect if the HTML or the BODY tags has a [md-themes-disabled] attribute
 * If yes, then immediately disable all theme stylesheet generation and DOM injection
 */
/**
 * @ngInject
 */
function detectDisabledThemes($mdThemingProvider) {
  var isDisabled = !!document.querySelector('[md-themes-disabled]');
  $mdThemingProvider.disableTheming(isDisabled);
}

/**
 * @ngdoc service
 * @name $mdThemingProvider
 * @module material.core.theming
 *
 * @description Provider to configure the `$mdTheming` service.
 *
 * ### Default Theme
 * The `$mdThemingProvider` uses by default the following theme configuration:
 *
 * - Primary Palette: `Blue`
 * - Accent Palette: `Pink`
 * - Warn Palette: `Deep-Orange`
 * - Background Palette: `Grey`
 *
 * If you don't want to use the `md-theme` directive on the elements itself, you may want to overwrite
 * the default theme.<br/>
 * This can be done by using the following markup.
 *
 * <hljs lang="js">
 *   myAppModule.config(function($mdThemingProvider) {
 *     $mdThemingProvider
 *       .theme('default')
 *       .primaryPalette('blue')
 *       .accentPalette('teal')
 *       .warnPalette('red')
 *       .backgroundPalette('grey');
 *   });
 * </hljs>
 *

 * ### Dynamic Themes
 *
 * By default, if you change a theme at runtime, the `$mdTheming` service will not detect those changes.<br/>
 * If you have an application, which changes its theme on runtime, you have to enable theme watching.
 *
 * <hljs lang="js">
 *   myAppModule.config(function($mdThemingProvider) {
 *     // Enable theme watching.
 *     $mdThemingProvider.alwaysWatchTheme(true);
 *   });
 * </hljs>
 *
 * ### Custom Theme Styles
 *
 * Sometimes you may want to use your own theme styles for some custom components.<br/>
 * You are able to register your own styles by using the following markup.
 *
 * <hljs lang="js">
 *   myAppModule.config(function($mdThemingProvider) {
 *     // Register our custom stylesheet into the theming provider.
 *     $mdThemingProvider.registerStyles(STYLESHEET);
 *   });
 * </hljs>
 *
 * The `registerStyles` method only accepts strings as value, so you're actually not able to load an external
 * stylesheet file into the `$mdThemingProvider`.
 *
 * If it's necessary to load an external stylesheet, we suggest using a bundler, which supports including raw content,
 * like [raw-loader](https://github.com/webpack/raw-loader) for `webpack`.
 *
 * <hljs lang="js">
 *   myAppModule.config(function($mdThemingProvider) {
 *     // Register your custom stylesheet into the theming provider.
 *     $mdThemingProvider.registerStyles(require('../styles/my-component.theme.css'));
 *   });
 * </hljs>
 *
 * ### Browser color
 *
 * Enables browser header coloring
 * for more info please visit:
 * https://developers.google.com/web/fundamentals/design-and-ui/browser-customization/theme-color
 *
 * Options parameter: <br/>
 * `theme`   - A defined theme via `$mdThemeProvider` to use the palettes from. Default is `default` theme. <br/>
 * `palette` - Can be any one of the basic material design palettes, extended defined palettes and 'primary',
 *             'accent', 'background' and 'warn'. Default is `primary`. <br/>
 * `hue`     - The hue from the selected palette. Default is `800`<br/>
 *
 * <hljs lang="js">
 *   myAppModule.config(function($mdThemingProvider) {
 *     // Enable browser color
 *     $mdThemingProvider.enableBrowserColor({
 *       theme: 'myTheme', // Default is 'default'
 *       palette: 'accent', // Default is 'primary', any basic material palette and extended palettes are available
 *       hue: '200' // Default is '800'
 *     });
 *   });
 * </hljs>
 */

/**
 * Some Example Valid Theming Expressions
 * =======================================
 *
 * Intention group expansion: (valid for primary, accent, warn, background)
 *
 * {{primary-100}} - grab shade 100 from the primary palette
 * {{primary-100-0.7}} - grab shade 100, apply opacity of 0.7
 * {{primary-100-contrast}} - grab shade 100's contrast color
 * {{primary-hue-1}} - grab the shade assigned to hue-1 from the primary palette
 * {{primary-hue-1-0.7}} - apply 0.7 opacity to primary-hue-1
 * {{primary-color}} - Generates .md-hue-1, .md-hue-2, .md-hue-3 with configured shades set for each hue
 * {{primary-color-0.7}} - Apply 0.7 opacity to each of the above rules
 * {{primary-contrast}} - Generates .md-hue-1, .md-hue-2, .md-hue-3 with configured contrast (ie. text) color shades set for each hue
 * {{primary-contrast-0.7}} - Apply 0.7 opacity to each of the above rules
 *
 * Foreground expansion: Applies rgba to black/white foreground text
 *
 * {{foreground-1}} - used for primary text
 * {{foreground-2}} - used for secondary text/divider
 * {{foreground-3}} - used for disabled text
 * {{foreground-4}} - used for dividers
 */

// In memory generated CSS rules; registered by theme.name
var GENERATED = { };

// In memory storage of defined themes and color palettes (both loaded by CSS, and user specified)
var PALETTES;

// Text Colors on light and dark backgrounds
// @see https://www.google.com/design/spec/style/color.html#color-text-background-colors
var DARK_FOREGROUND = {
  name: 'dark',
  '1': 'rgba(0,0,0,0.87)',
  '2': 'rgba(0,0,0,0.54)',
  '3': 'rgba(0,0,0,0.38)',
  '4': 'rgba(0,0,0,0.12)'
};
var LIGHT_FOREGROUND = {
  name: 'light',
  '1': 'rgba(255,255,255,1.0)',
  '2': 'rgba(255,255,255,0.7)',
  '3': 'rgba(255,255,255,0.5)',
  '4': 'rgba(255,255,255,0.12)'
};

var DARK_SHADOW = '1px 1px 0px rgba(0,0,0,0.4), -1px -1px 0px rgba(0,0,0,0.4)';
var LIGHT_SHADOW = '';

var DARK_CONTRAST_COLOR = colorToRgbaArray('rgba(0,0,0,0.87)');
var LIGHT_CONTRAST_COLOR = colorToRgbaArray('rgba(255,255,255,0.87)');
var STRONG_LIGHT_CONTRAST_COLOR = colorToRgbaArray('rgb(255,255,255)');

var THEME_COLOR_TYPES = ['primary', 'accent', 'warn', 'background'];
var DEFAULT_COLOR_TYPE = 'primary';

// A color in a theme will use these hues by default, if not specified by user.
var LIGHT_DEFAULT_HUES = {
  'accent': {
    'default': 'A200',
    'hue-1': 'A100',
    'hue-2': 'A400',
    'hue-3': 'A700'
  },
  'background': {
    'default': '50',
    'hue-1': 'A100',
    'hue-2': '100',
    'hue-3': '300'
  }
};

var DARK_DEFAULT_HUES = {
  'background': {
    'default': 'A400',
    'hue-1': '800',
    'hue-2': '900',
    'hue-3': 'A200'
  }
};
THEME_COLOR_TYPES.forEach(function(colorType) {
  // Color types with unspecified default hues will use these default hue values
  var defaultDefaultHues = {
    'default': '500',
    'hue-1': '300',
    'hue-2': '800',
    'hue-3': 'A100'
  };
  if (!LIGHT_DEFAULT_HUES[colorType]) LIGHT_DEFAULT_HUES[colorType] = defaultDefaultHues;
  if (!DARK_DEFAULT_HUES[colorType]) DARK_DEFAULT_HUES[colorType] = defaultDefaultHues;
});

var VALID_HUE_VALUES = [
  '50', '100', '200', '300', '400', '500', '600',
  '700', '800', '900', 'A100', 'A200', 'A400', 'A700'
];

var themeConfig = {
  disableTheming : false,   // Generate our themes at run time; also disable stylesheet DOM injection
  generateOnDemand : false, // Whether or not themes are to be generated on-demand (vs. eagerly).
  registeredStyles : [],    // Custom styles registered to be used in the theming of custom components.
  nonce : null              // Nonce to be added as an attribute to the generated themes style tags.
};

/**
 *
 */
function ThemingProvider($mdColorPalette, $$mdMetaProvider) {
  ThemingService.$inject = ["$rootScope", "$mdUtil", "$q", "$log"];
  PALETTES = { };
  var THEMES = { };

  var themingProvider;

  var alwaysWatchTheme = false;
  var defaultTheme = 'default';

  // Load JS Defined Palettes
  angular.extend(PALETTES, $mdColorPalette);

  // Default theme defined in core.js

  /**
   * Adds `theme-color` and `msapplication-navbutton-color` meta tags with the color parameter
   * @param {string} color Hex value of the wanted browser color
   * @returns {function} Remove function of the meta tags
   */
  var setBrowserColor = function (color) {
    // Chrome, Firefox OS and Opera
    var removeChrome = $$mdMetaProvider.setMeta('theme-color', color);
    // Windows Phone
    var removeWindows = $$mdMetaProvider.setMeta('msapplication-navbutton-color', color);

    return function () {
      removeChrome();
      removeWindows();
    };
  };

  /**
   * @ngdoc method
   * @name $mdThemingProvider#enableBrowserColor
   * @description
   * Enables browser header coloring. For more info please visit
   * <a href="https://developers.google.com/web/fundamentals/design-and-ui/browser-customization/theme-color">
   *   Web Fundamentals</a>.
   * @param {object=} options Options for the browser color, which include:<br/>
   * - `theme` - `{string}`: A defined theme via `$mdThemeProvider` to use the palettes from. Default is `default` theme. <br/>
   * - `palette` - `{string}`:  Can be any one of the basic material design palettes, extended defined palettes, or `primary`,
   *  `accent`, `background`, and `warn`. Default is `primary`.<br/>
   * - `hue` -  `{string}`: The hue from the selected palette. Default is `800`.<br/>
   * @returns {function} Function that removes the browser coloring when called.
   */
  var enableBrowserColor = function (options) {
    options = angular.isObject(options) ? options : {};

    var theme = options.theme || 'default';
    var hue = options.hue || '800';

    var palette = PALETTES[options.palette] ||
      PALETTES[THEMES[theme].colors[options.palette || 'primary'].name];

    var color = angular.isObject(palette[hue]) ? palette[hue].hex : palette[hue];

    return setBrowserColor(color);
  };

  return themingProvider = {
    definePalette: definePalette,
    extendPalette: extendPalette,
    theme: registerTheme,

    /**
     * return a read-only clone of the current theme configuration
     */
    configuration : function() {
      return angular.extend( { }, themeConfig, {
        defaultTheme : defaultTheme,
        alwaysWatchTheme : alwaysWatchTheme,
        registeredStyles : [].concat(themeConfig.registeredStyles)
      });
    },

    /**
     * @ngdoc method
     * @name $mdThemingProvider#disableTheming
     * @description
     * An easier way to disable theming without having to use `.constant("$MD_THEME_CSS","");`.
     * This disables all dynamic theme style sheet generations and injections.
     * @param {boolean=} isDisabled Disable all dynamic theme style sheet generations and injections
     *  if `true` or `undefined`.
     */
    disableTheming: function(isDisabled) {
      themeConfig.disableTheming = angular.isUndefined(isDisabled) || !!isDisabled;
    },

    /**
     * @ngdoc method
     * @name $mdThemingProvider#registerStyles
     * @param {string} styles The styles to be appended to AngularJS Material's built in theme CSS.
     */
    registerStyles: function(styles) {
      themeConfig.registeredStyles.push(styles);
    },

    /**
     * @ngdoc method
     * @name $mdThemingProvider#setNonce
     * @param {string} nonceValue The nonce to be added as an attribute to the theme style tags.
     * Setting a value allows the use of CSP policy without using the unsafe-inline directive.
     */
    setNonce: function(nonceValue) {
      themeConfig.nonce = nonceValue;
    },

    generateThemesOnDemand: function(onDemand) {
      themeConfig.generateOnDemand = onDemand;
    },

    /**
     * @ngdoc method
     * @name $mdThemingProvider#setDefaultTheme
     * @param {string} theme Default theme name to be applied to elements. Default value is `default`.
     */
    setDefaultTheme: function(theme) {
      defaultTheme = theme;
    },

    /**
     * @ngdoc method
     * @name $mdThemingProvider#alwaysWatchTheme
     * @param {boolean} alwaysWatch Whether or not to always watch themes for changes and re-apply
     * classes when they change. Default is `false`. Enabling can reduce performance.
     */
    alwaysWatchTheme: function(alwaysWatch) {
      alwaysWatchTheme = alwaysWatch;
    },

    enableBrowserColor: enableBrowserColor,

    $get: ThemingService,
    _LIGHT_DEFAULT_HUES: LIGHT_DEFAULT_HUES,
    _DARK_DEFAULT_HUES: DARK_DEFAULT_HUES,
    _PALETTES: PALETTES,
    _THEMES: THEMES,
    _parseRules: parseRules,
    _rgba: rgba
  };

  /**
   * @ngdoc method
   * @name $mdThemingProvider#definePalette
   * @description
   * In the event that you need to define a custom color palette, you can use this function to
   * make it available to your theme for use in its intention groups.<br>
   * Note that you must specify all hues in the definition map.
   * @param {string} name Name of palette being defined
   * @param {object} map Palette definition that includes hue definitions and contrast colors:
   * - `'50'` - `{string}`: HEX color
   * - `'100'` - `{string}`: HEX color
   * - `'200'` - `{string}`: HEX color
   * - `'300'` - `{string}`: HEX color
   * - `'400'` - `{string}`: HEX color
   * - `'500'` - `{string}`: HEX color
   * - `'600'` - `{string}`: HEX color
   * - `'700'` - `{string}`: HEX color
   * - `'800'` - `{string}`: HEX color
   * - `'900'` - `{string}`: HEX color
   * - `'A100'` - `{string}`: HEX color
   * - `'A200'` - `{string}`: HEX color
   * - `'A400'` - `{string}`: HEX color
   * - `'A700'` - `{string}`: HEX color
   * - `'contrastDefaultColor'` - `{string}`: `light` or `dark`
   * - `'contrastDarkColors'` - `{string[]}`: Hues which should use dark contrast colors (i.e. raised button text).
   *  For example: `['50', '100', '200', '300', '400', 'A100']`.
   * - `'contrastLightColors'` - `{string[]}`: Hues which should use light contrast colors (i.e. raised button text).
   *  For example: `['500', '600', '700', '800', '900', 'A200', 'A400', 'A700']`.
   */
  function definePalette(name, map) {
    map = map || {};
    PALETTES[name] = checkPaletteValid(name, map);
    return themingProvider;
  }

  /**
   * @ngdoc method
   * @name $mdThemingProvider#extendPalette
   * @description
   * Sometimes it is easier to extend an existing color palette and then change a few properties,
   * rather than defining a whole new palette.
   * @param {string} name Name of palette being extended
   * @param {object} map Palette definition that includes optional hue definitions and contrast colors:
   * - `'50'` - `{string}`: HEX color
   * - `'100'` - `{string}`: HEX color
   * - `'200'` - `{string}`: HEX color
   * - `'300'` - `{string}`: HEX color
   * - `'400'` - `{string}`: HEX color
   * - `'500'` - `{string}`: HEX color
   * - `'600'` - `{string}`: HEX color
   * - `'700'` - `{string}`: HEX color
   * - `'800'` - `{string}`: HEX color
   * - `'900'` - `{string}`: HEX color
   * - `'A100'` - `{string}`: HEX color
   * - `'A200'` - `{string}`: HEX color
   * - `'A400'` - `{string}`: HEX color
   * - `'A700'` - `{string}`: HEX color
   * - `'contrastDefaultColor'` - `{string}`: `light` or `dark`
   * - `'contrastDarkColors'` - `{string[]}`: Hues which should use dark contrast colors (i.e. raised button text).
   *  For example: `['50', '100', '200', '300', '400', 'A100']`.
   * - `'contrastLightColors'` - `{string[]}`: Hues which should use light contrast colors (i.e. raised button text).
   *  For example: `['500', '600', '700', '800', '900', 'A200', 'A400', 'A700']`.
   *  @returns {object} A new object which is a copy of the given palette, `name`,
   *    with variables from `map` overwritten.
   */
  function extendPalette(name, map) {
    return checkPaletteValid(name,  angular.extend({}, PALETTES[name] || {}, map) );
  }

  // Make sure that palette has all required hues
  function checkPaletteValid(name, map) {
    var missingColors = VALID_HUE_VALUES.filter(function(field) {
      return !map[field];
    });
    if (missingColors.length) {
      throw new Error("Missing colors %1 in palette %2!"
                      .replace('%1', missingColors.join(', '))
                      .replace('%2', name));
    }

    return map;
  }

  /**
   * @ngdoc method
   * @name $mdThemingProvider#theme
   * @description
   * Register a theme (which is a collection of color palettes); i.e. `warn`, `accent`,
   * `background`, and `primary`.<br>
   * Optionally inherit from an existing theme.
   * @param {string} name Name of theme being registered
   * @param {string=} inheritFrom Existing theme name to inherit from
   */
  function registerTheme(name, inheritFrom) {
    if (THEMES[name]) return THEMES[name];

    inheritFrom = inheritFrom || 'default';

    var parentTheme = typeof inheritFrom === 'string' ? THEMES[inheritFrom] : inheritFrom;
    var theme = new Theme(name);

    if (parentTheme) {
      angular.forEach(parentTheme.colors, function(color, colorType) {
        theme.colors[colorType] = {
          name: color.name,
          // Make sure a COPY of the hues is given to the child color,
          // not the same reference.
          hues: angular.extend({}, color.hues)
        };
      });
    }
    THEMES[name] = theme;

    return theme;
  }

  function Theme(name) {
    var self = this;
    self.name = name;
    self.colors = {};

    self.dark = setDark;
    setDark(false);

    function setDark(isDark) {
      isDark = arguments.length === 0 ? true : !!isDark;

      // If no change, abort
      if (isDark === self.isDark) return;

      self.isDark = isDark;

      self.foregroundPalette = self.isDark ? LIGHT_FOREGROUND : DARK_FOREGROUND;
      self.foregroundShadow = self.isDark ? DARK_SHADOW : LIGHT_SHADOW;

      // Light and dark themes have different default hues.
      // Go through each existing color type for this theme, and for every
      // hue value that is still the default hue value from the previous light/dark setting,
      // set it to the default hue value from the new light/dark setting.
      var newDefaultHues = self.isDark ? DARK_DEFAULT_HUES : LIGHT_DEFAULT_HUES;
      var oldDefaultHues = self.isDark ? LIGHT_DEFAULT_HUES : DARK_DEFAULT_HUES;
      angular.forEach(newDefaultHues, function(newDefaults, colorType) {
        var color = self.colors[colorType];
        var oldDefaults = oldDefaultHues[colorType];
        if (color) {
          for (var hueName in color.hues) {
            if (color.hues[hueName] === oldDefaults[hueName]) {
              color.hues[hueName] = newDefaults[hueName];
            }
          }
        }
      });

      return self;
    }

    THEME_COLOR_TYPES.forEach(function(colorType) {
      var defaultHues = (self.isDark ? DARK_DEFAULT_HUES : LIGHT_DEFAULT_HUES)[colorType];
      self[colorType + 'Palette'] = function setPaletteType(paletteName, hues) {
        var color = self.colors[colorType] = {
          name: paletteName,
          hues: angular.extend({}, defaultHues, hues)
        };

        Object.keys(color.hues).forEach(function(name) {
          if (!defaultHues[name]) {
            throw new Error("Invalid hue name '%1' in theme %2's %3 color %4. Available hue names: %4"
              .replace('%1', name)
              .replace('%2', self.name)
              .replace('%3', paletteName)
              .replace('%4', Object.keys(defaultHues).join(', '))
            );
          }
        });
        Object.keys(color.hues).map(function(key) {
          return color.hues[key];
        }).forEach(function(hueValue) {
          if (VALID_HUE_VALUES.indexOf(hueValue) == -1) {
            throw new Error("Invalid hue value '%1' in theme %2's %3 color %4. Available hue values: %5"
              .replace('%1', hueValue)
              .replace('%2', self.name)
              .replace('%3', colorType)
              .replace('%4', paletteName)
              .replace('%5', VALID_HUE_VALUES.join(', '))
            );
          }
        });
        return self;
      };

      self[colorType + 'Color'] = function() {
        var args = Array.prototype.slice.call(arguments);
        // eslint-disable-next-line no-console
        console.warn('$mdThemingProviderTheme.' + colorType + 'Color() has been deprecated. ' +
                     'Use $mdThemingProviderTheme.' + colorType + 'Palette() instead.');
        return self[colorType + 'Palette'].apply(self, args);
      };
    });
  }

  /**
   * @ngdoc service
   * @name $mdTheming
   * @module material.core.theming
   * @description
   * Service that makes an element apply theming related <b>classes</b> to itself.
   *
   * <hljs lang="js">
   * // Example component directive that we want to apply theming classes to.
   * app.directive('myFancyDirective', function($mdTheming) {
   *   return {
   *     restrict: 'AE',
   *     link: function(scope, element, attrs) {
   *       // Initialize the service using our directive's element
   *       $mdTheming(element);
   *
   *       $mdTheming.defineTheme('myTheme', {
   *         primary: 'blue',
   *         accent: 'pink',
   *         dark: true
   *       });
   *       // Your directive's custom code here.
   *     }
   *   };
   * });
   * </hljs>
   * @param {element=} element Element that will have theming classes applied to it.
   */

  /**
   * @ngdoc property
   * @name $mdTheming#THEMES
   * @description
   * Property to get all the themes defined
   * @returns {object} All the themes defined with their properties.
   */

  /**
   * @ngdoc property
   * @name $mdTheming#PALETTES
   * @description
   * Property to get all the palettes defined
   * @returns {object} All the palettes defined with their colors.
   */

  /**
   * @ngdoc method
   * @name $mdTheming#registered
   * @description
   * Determine is specified theme name is a valid, registered theme
   * @param {string} themeName the theme to check if registered
   * @returns {boolean} whether the theme is registered or not
   */

  /**
   * @ngdoc method
   * @name $mdTheming#defaultTheme
   * @description
   * Returns the default theme
   * @returns {string} The default theme
   */

  /**
   * @ngdoc method
   * @name $mdTheming#generateTheme
   * @description
   * Lazy generate themes - by default, every theme is generated when defined.
   * You can disable this in the configuration section using the
   * `$mdThemingProvider.generateThemesOnDemand(true);`
   *
   * The theme name that is passed in must match the name of the theme that was defined as part of
   * the configuration block.
   *
   * @param {string} name theme name to generate
   */

  /**
   * @ngdoc method
   * @name $mdTheming#setBrowserColor
   * @description
   * Enables browser header coloring. For more info please visit
   * <a href="https://developers.google.com/web/fundamentals/design-and-ui/browser-customization/theme-color">
   *   Web Fundamentals</a>.
   * @param {object=} options Options for the browser color, which include:<br/>
   * - `theme` - `{string}`: A defined theme via `$mdThemeProvider` to use the palettes from.
   *    Default is `default` theme. <br/>
   * - `palette` - `{string}`:  Can be any one of the basic material design palettes, extended
   *    defined palettes, or `primary`, `accent`, `background`, and `warn`. Default is `primary`.
   * <br/>
   * - `hue` -  `{string}`: The hue from the selected palette. Default is `800`.<br/>
   * @returns {function} Function that removes the browser coloring when called.
   */

  /**
   * @ngdoc method
   * @name $mdTheming#defineTheme
   * @description
   * Dynamically define a theme by using an options object that contains palette names.
   *
   * @param {string} name Theme name to define
   * @param {object} options Theme definition options
   * Options are:<br/>
   * - `primary` - `{string}`: The name of the primary palette to use in the theme.<br/>
   * - `accent` - `{string}`: The name of the accent palette to use in the theme.<br/>
   * - `warn` - `{string}`: The name of the warn palette to use in the theme.<br/>
   * - `background` - `{string}`: The name of the background palette to use in the theme.<br/>
   * - `dark` - `{boolean}`: Indicates if it's a dark theme.<br/>
   * @returns {Promise<string>} A resolved promise with the new theme name.
   */

  /* @ngInject */
  function ThemingService($rootScope, $mdUtil, $q, $log) {
    // Allow us to be invoked via a linking function signature.
    var applyTheme = function (scope, el) {
      if (el === undefined) { el = scope; scope = undefined; }
      if (scope === undefined) { scope = $rootScope; }
      applyTheme.inherit(el, el);
    };

    Object.defineProperty(applyTheme, 'THEMES', {
      get: function () {
        return angular.extend({}, THEMES);
      }
    });
    Object.defineProperty(applyTheme, 'PALETTES', {
      get: function () {
        return angular.extend({}, PALETTES);
      }
    });
    Object.defineProperty(applyTheme, 'ALWAYS_WATCH', {
      get: function () {
        return alwaysWatchTheme;
      }
    });
    applyTheme.inherit = inheritTheme;
    applyTheme.registered = registered;
    applyTheme.defaultTheme = function() { return defaultTheme; };
    applyTheme.generateTheme = function(name) { generateTheme(THEMES[name], name, themeConfig.nonce); };
    applyTheme.overrideTheme = function (src, target) {
        generateTheme(THEMES[src], src, themeConfig.nonce, THEMES[target]);
    };
    applyTheme.defineTheme = function(name, options) {
      options = options || {};

      var theme = registerTheme(name);

      if (options.primary) {
        theme.primaryPalette(options.primary);
      }
      if (options.accent) {
        theme.accentPalette(options.accent);
      }
      if (options.warn) {
        theme.warnPalette(options.warn);
      }
      if (options.background) {
        theme.backgroundPalette(options.background);
      }
      if (options.dark){
        theme.dark();
      }

      this.generateTheme(name);

      return $q.resolve(name);
    };
    applyTheme.setBrowserColor = enableBrowserColor;

    return applyTheme;

    /**
     * Determine is specified theme name is a valid, registered theme
     */
    function registered(themeName) {
      if (themeName === undefined || themeName === '') return true;
      return applyTheme.THEMES[themeName] !== undefined;
    }

    /**
     * Get theme name for the element, then update with Theme CSS class
     */
    function inheritTheme (el, parent) {
      var ctrl = parent.controller('mdTheme') || el.data('$mdThemeController');
      var scope = el.scope();

      updateThemeClass(lookupThemeName());

      if (ctrl) {
        var watchTheme = alwaysWatchTheme ||
                         ctrl.$shouldWatch ||
                         $mdUtil.parseAttributeBoolean(el.attr('md-theme-watch'));

        if (watchTheme || ctrl.isAsyncTheme) {
          var clearNameWatcher = function () {
            if (unwatch) {
              unwatch();
              unwatch = undefined;
            }
          };

          var unwatch = ctrl.registerChanges(function(name) {
            updateThemeClass(name);

            if (!watchTheme) {
              clearNameWatcher();
            }
          });

          if (scope) {
            scope.$on('$destroy', clearNameWatcher);
          } else {
            el.on('$destroy', clearNameWatcher);
          }
        }
      }

      /**
       * Find the theme name from the parent controller or element data
       */
      function lookupThemeName() {
        // As a few components (dialog) add their controllers later, we should also watch for a controller init.
        return ctrl && ctrl.$mdTheme || (defaultTheme === 'default' ? '' : defaultTheme);
      }

      /**
       * Remove old theme class and apply a new one
       * NOTE: if not a valid theme name, then the current name is not changed
       */
      function updateThemeClass(theme) {
        if (!theme) return;
        if (!registered(theme)) {
          $log.warn('Attempted to use unregistered theme \'' + theme + '\'. ' +
                    'Register it with $mdThemingProvider.theme().');
        }

        var oldTheme = el.data('$mdThemeName');
        if (oldTheme) el.removeClass('md-' + oldTheme +'-theme');
        el.addClass('md-' + theme + '-theme');
        el.data('$mdThemeName', theme);
        if (ctrl) {
          el.data('$mdThemeController', ctrl);
        }
      }
    }

  }
}

function ThemingDirective($mdTheming, $interpolate, $parse, $mdUtil, $q, $log) {
  return {
    priority: 101, // has to be more than 100 to be before interpolation (issue on IE)
    link: {
      pre: function(scope, el, attrs) {
        var registeredCallbacks = [];

        var startSymbol = $interpolate.startSymbol();
        var endSymbol = $interpolate.endSymbol();

        var theme = attrs.mdTheme.trim();

        var hasInterpolation =
          theme.substr(0, startSymbol.length) === startSymbol &&
          theme.lastIndexOf(endSymbol) === theme.length - endSymbol.length;

        var oneTimeOperator = '::';
        var oneTimeBind = attrs.mdTheme
            .split(startSymbol).join('')
            .split(endSymbol).join('')
            .trim()
            .substr(0, oneTimeOperator.length) === oneTimeOperator;

        var getTheme = function () {
          var interpolation = $interpolate(attrs.mdTheme)(scope);
          return $parse(interpolation)(scope) || interpolation;
        };

        var ctrl = {
          isAsyncTheme: angular.isFunction(getTheme()) || angular.isFunction(getTheme().then),
          registerChanges: function (cb, context) {
            if (context) {
              cb = angular.bind(context, cb);
            }

            registeredCallbacks.push(cb);

            return function () {
              var index = registeredCallbacks.indexOf(cb);

              if (index > -1) {
                registeredCallbacks.splice(index, 1);
              }
            };
          },
          $setTheme: function (theme) {
            if (!$mdTheming.registered(theme)) {
              $log.warn('attempted to use unregistered theme \'' + theme + '\'');
            }

            ctrl.$mdTheme = theme;

            // Iterating backwards to support unregistering during iteration
            // http://stackoverflow.com/a/9882349/890293
            // we don't use `reverse()` of array because it mutates the array and we don't want it
            // to get re-indexed
            for (var i = registeredCallbacks.length; i--;) {
              registeredCallbacks[i](theme);
            }
          },
          $shouldWatch: $mdUtil.parseAttributeBoolean(el.attr('md-theme-watch')) ||
                        $mdTheming.ALWAYS_WATCH ||
                        (hasInterpolation && !oneTimeBind)
        };

        el.data('$mdThemeController', ctrl);

        var setParsedTheme = function (theme) {
          if (typeof theme === 'string') {
            return ctrl.$setTheme(theme);
          }

          $q.when( angular.isFunction(theme) ?  theme() : theme )
            .then(function(name) {
              ctrl.$setTheme(name);
            });
        };

        setParsedTheme(getTheme());

        var unwatch = scope.$watch(getTheme, function(theme) {
          if (theme) {
            setParsedTheme(theme);

            if (!ctrl.$shouldWatch) {
              unwatch();
            }
          }
        });
      }
    }
  };
}

/**
 * Special directive that will disable ALL runtime Theme style generation and DOM injection
 *
 * <link rel="stylesheet" href="angular-material.min.css">
 * <link rel="stylesheet" href="angular-material.themes.css">
 *
 * <body md-themes-disabled>
 *  ...
 * </body>
 *
 * Note: Using md-themes-css directive requires the developer to load external
 * theme stylesheets; e.g. custom themes from Material-Tools:
 *
 *       `angular-material.themes.css`
 *
 * Another option is to use the ThemingProvider to configure and disable the attribute
 * conversions; this would obviate the use of the `md-themes-css` directive
 *
 */
function disableThemesDirective() {
  themeConfig.disableTheming = true;

  // Return a 1x-only, first-match attribute directive
  return {
    restrict : 'A',
    priority : '900'
  };
}

function ThemableDirective($mdTheming) {
  return $mdTheming;
}

function parseRules(theme, colorType, rules, override) {
  checkValidPalette(theme, colorType);
  if (override) {
    theme = override;
    var initialOverride = override.name;
    theme.name = 'default';
  }

  rules = rules.replace(/THEME_NAME/g, theme.name);
  var themeNameRegex = new RegExp('\\.md-' + theme.name + '-theme', 'g');
  // "foobar { background:{{mui-theme.pallete.action.selected}};".match(/'?"?\{\{\s*mui-theme\.(.*)\s*\}\}'?"?/g)
  // .replace(function (match, key
  var simpleVariableRegex = /'?"?\{\{\s*([a-zA-Z]+)-(A?\d+|hue-[0-3]|shadow|default)-?(\d\.?\d*)?(contrast)?\s*\}\}'?"?/g;
  var muiVariableRegex = /'?"?\{\{\s*mui\.(.*)\s*\}\}'?"?/g;
  var c = theme.colors;
  var thm = window.getMuiTheme(c.primary.name, c.accent.name, c.background.name, c.warn.name);
  thm = theme.isDark ? thm.dark : thm.light;
  rules = rules.replace(muiVariableRegex, function (match, key) {
    var kkey = key;
    var args = [];
    var fn = false;
    if (key.includes('(')) {
      fn = true;
      kkey = kkey.split("(")[0];
      args = key.split("(")[1].split(")")[0].split(",").map(function (v) {
        var mkey = v.trim();
        var mkget = window._.get(thm, mkey);
        if (mkget) {
          return mkget;
        }
        if (!mkey.includes('"')) {
          if (!isNaN(parseFloat(mkey))) {
            return parseFloat(mkey);
          }
        }
        return mkey;
      });
    }
    var thing = window._.get(thm, kkey);
    if (fn) {
      return thing.apply(null, args);
    }
    return thing;
  });

  // find and replace simple variables where we use a specific hue, not an entire palette
  // eg. "{{primary-100}}"
  //\(' + THEME_COLOR_TYPES.join('\|') + '\)'
  rules = rules.replace(simpleVariableRegex, function(match, colorType, hue, opacity, contrast) {
    if (colorType === 'foreground') {
      if (hue == 'shadow') {
        return theme.foregroundShadow;
      } else {
        return theme.foregroundPalette[hue] || theme.foregroundPalette['1'];
      }
    }

    // `default` is also accepted as a hue-value, because the background palettes are
    // using it as a name for the default hue.
    if (hue.indexOf('hue') === 0 || hue === 'default') {
      hue = theme.colors[colorType].hues[hue];
    }

    return rgba( (PALETTES[ theme.colors[colorType].name ][hue] || '')[contrast ? 'contrast' : 'value'], opacity );
  });

  // Matches '{{ primary-color }}', etc
  var hueRegex = new RegExp('(\'|")?{{\\s*([a-zA-Z]+)-(color|contrast)-?(\\d\\.?\\d*)?\\s*}}("|\')?','g');
  var generatedRules = [];

  // For each type, generate rules for each hue (ie. default, md-hue-1, md-hue-2, md-hue-3)
  angular.forEach(['default', 'hue-1', 'hue-2', 'hue-3'], function(hueName) {
    var newRule = rules
      .replace(hueRegex, function(match, _, matchedColorType, hueType, opacity) {
        var color = theme.colors[matchedColorType];
        var palette = PALETTES[color.name];
        var hueValue = color.hues[hueName];
        return rgba(palette[hueValue][hueType === 'color' ? 'value' : 'contrast'], opacity);
      });
    if (hueName !== 'default') {
      newRule = newRule.replace(themeNameRegex, '.md-' + theme.name + '-theme.md-' + hueName);
    }

    // Don't apply a selector rule to the default theme, making it easier to override
    // styles of the base-component
    if (theme.name == 'default') {
      var themeRuleRegex = /((?:\s|>|\.|\w|-|:|\(|\)|\[|\]|"|'|=)*)\.md-default-theme((?:\s|>|\.|\w|-|:|\(|\)|\[|\]|"|'|=)*)/g;

      newRule = newRule.replace(themeRuleRegex, function(match, start, end) {
        return match + ', ' + start + end;
      });
    }
    generatedRules.push(newRule);
  });

  if (override) {
    theme.name = initialOverride;
  }

  return generatedRules;
}

var rulesByType = {};

// Generate our themes at run time given the state of THEMES and PALETTES
function generateAllThemes($injector, $mdTheming) {
  var head = document.head;
  var firstChild = head ? head.firstElementChild : null;
  var themeCss = !themeConfig.disableTheming && $injector.has('$MD_THEME_CSS') ? $injector.get('$MD_THEME_CSS') : '';

  // Append our custom registered styles to the theme stylesheet.
  themeCss += themeConfig.registeredStyles.join('');

  if ( !firstChild ) return;
  if (themeCss.length === 0) return; // no rules, so no point in running this expensive task

  // Expose contrast colors for palettes to ensure that text is always readable
  angular.forEach(PALETTES, sanitizePalette);

  // MD_THEME_CSS is a string generated by the build process that includes all the themable
  // components as templates

  // Break the CSS into individual rules
  var rules = themeCss
                  .split(/\}(?!(\}|'|"|;))/)
                  .filter(function(rule) { return rule && rule.trim().length; })
                  .map(function(rule) { return rule.trim() + '}'; });

  THEME_COLOR_TYPES.forEach(function(type) {
    rulesByType[type] = '';
  });

  // Sort the rules based on type, allowing us to do color substitution on a per-type basis
  rules.forEach(function(rule) {
    // First: test that if the rule has '.md-accent', it goes into the accent set of rules
    for (var i = 0, type; type = THEME_COLOR_TYPES[i]; i++) {
      if (rule.indexOf('.md-' + type) > -1) {
        return rulesByType[type] += rule;
      }
    }

    // If no eg 'md-accent' class is found, try to just find 'accent' in the rule and guess from
    // there
    for (i = 0; type = THEME_COLOR_TYPES[i]; i++) {
      if (rule.indexOf(type) > -1) {
        return rulesByType[type] += rule;
      }
    }

    // Default to the primary array
    return rulesByType[DEFAULT_COLOR_TYPE] += rule;
  });

  // If themes are being generated on-demand, quit here. The user will later manually
  // call generateTheme to do this on a theme-by-theme basis.
  if (themeConfig.generateOnDemand) return;

  angular.forEach($mdTheming.THEMES, function(theme) {
    if (!GENERATED[theme.name] && !($mdTheming.defaultTheme() !== 'default' && theme.name === 'default')) {
      generateTheme(theme, theme.name, themeConfig.nonce);
    }
  });


  // *************************
  // Internal functions
  // *************************

  // The user specifies a 'default' contrast color as either light or dark,
  // then explicitly lists which hues are the opposite contrast (eg. A100 has dark, A200 has light)
  function sanitizePalette(palette, name) {
    var defaultContrast = palette.contrastDefaultColor;
    var lightColors = palette.contrastLightColors || [];
    var strongLightColors = palette.contrastStrongLightColors || [];
    var darkColors = palette.contrastDarkColors || [];

    // These colors are provided as space-separated lists
    if (typeof lightColors === 'string') lightColors = lightColors.split(' ');
    if (typeof strongLightColors === 'string') strongLightColors = strongLightColors.split(' ');
    if (typeof darkColors === 'string') darkColors = darkColors.split(' ');

    // Cleanup after ourselves
    delete palette.contrastDefaultColor;
    delete palette.contrastLightColors;
    delete palette.contrastStrongLightColors;
    delete palette.contrastDarkColors;

    // Change { 'A100': '#fffeee' } to { 'A100': { value: '#fffeee', contrast:DARK_CONTRAST_COLOR }
    angular.forEach(palette, function(hueValue, hueName) {
      if (angular.isObject(hueValue)) return; // Already converted
      // Map everything to rgb colors
      var rgbValue = colorToRgbaArray(hueValue);
      if (!rgbValue) {
        throw new Error("Color %1, in palette %2's hue %3, is invalid. Hex or rgb(a) color expected."
                        .replace('%1', hueValue)
                        .replace('%2', palette.name)
                        .replace('%3', hueName));
      }

      palette[hueName] = {
        hex: palette[hueName],
        value: rgbValue,
        contrast: getContrastColor()
      };
      function getContrastColor() {
        if (defaultContrast === 'light') {
          if (darkColors.indexOf(hueName) > -1) {
            return DARK_CONTRAST_COLOR;
          } else {
            return strongLightColors.indexOf(hueName) > -1 ? STRONG_LIGHT_CONTRAST_COLOR
              : LIGHT_CONTRAST_COLOR;
          }
        } else {
          if (lightColors.indexOf(hueName) > -1) {
            return strongLightColors.indexOf(hueName) > -1 ? STRONG_LIGHT_CONTRAST_COLOR
              : LIGHT_CONTRAST_COLOR;
          } else {
            return DARK_CONTRAST_COLOR;
          }
        }
      }
    });
  }
}

function generateTheme(theme, name, nonce, override) {
  var head = document.head;
  var firstChild = null;

  if (override && GENERATED[name]) {
     var initial = GENERATED[name];
     delete GENERATED[name];
     angular.forEach(initial, function (node) {
         head.removeChild(node);
     });
  }

  if (!GENERATED[name]) {
    var stylesheets = [];
    // For each theme, use the color palettes specified for
    // `primary`, `warn` and `accent` to generate CSS rules.
    THEME_COLOR_TYPES.forEach(function(colorType) {
      var styleStrings = parseRules(theme, colorType, rulesByType[colorType], override);
      while (styleStrings.length) {
        var styleContent = styleStrings.shift();
        if (styleContent) {
          var style = document.createElement('style');
          style.setAttribute('md-theme-style', '');
          if (nonce) {
            style.setAttribute('nonce', nonce);
          }
          style.appendChild(document.createTextNode(styleContent));
          head.insertBefore(style, firstChild);
          stylesheets.push(style);
        }
      }
    });

    GENERATED[theme.name] = stylesheets;

  }

}


function checkValidPalette(theme, colorType) {
  // If theme attempts to use a palette that doesnt exist, throw error
  if (!PALETTES[ (theme.colors[colorType] || {}).name ]) {
    throw new Error(
      "You supplied an invalid color palette for theme %1's %2 palette. Available palettes: %3"
                    .replace('%1', theme.name)
                    .replace('%2', colorType)
                    .replace('%3', Object.keys(PALETTES).join(', '))
    );
  }
}

function colorToRgbaArray(clr) {
  if (angular.isArray(clr) && clr.length == 3) return clr;
  if (/^rgb/.test(clr)) {
    return clr.replace(/(^\s*rgba?\(|\)\s*$)/g, '').split(',').map(function(value, i) {
      return i == 3 ? parseFloat(value, 10) : parseInt(value, 10);
    });
  }
  if (clr.charAt(0) == '#') clr = clr.substring(1);
  if (!/^([a-fA-F0-9]{3}){1,2}$/g.test(clr)) return;

  var dig = clr.length / 3;
  var red = clr.substr(0, dig);
  var grn = clr.substr(dig, dig);
  var blu = clr.substr(dig * 2);
  if (dig === 1) {
    red += red;
    grn += grn;
    blu += blu;
  }
  return [parseInt(red, 16), parseInt(grn, 16), parseInt(blu, 16)];
}

function rgba(rgbArray, opacity) {
  if ( !rgbArray ) return "rgb('0,0,0')";

  if (rgbArray.length == 4) {
    rgbArray = angular.copy(rgbArray);
    opacity ? rgbArray.pop() : opacity = rgbArray.pop();
  }
  return opacity && (typeof opacity == 'number' || (typeof opacity == 'string' && opacity.length)) ?
    'rgba(' + rgbArray.join(',') + ',' + opacity + ')' :
    'rgb(' + rgbArray.join(',') + ')';
}


})(window.angular);

})();
(function(){
"use strict";

// Polyfill angular < 1.4 (provide $animateCss)
angular
  .module('material.core')
  .factory('$$mdAnimate', ["$q", "$timeout", "$mdConstant", "$animateCss", function($q, $timeout, $mdConstant, $animateCss){

     // Since $$mdAnimate is injected into $mdUtil... use a wrapper function
     // to subsequently inject $mdUtil as an argument to the AnimateDomUtils

     return function($mdUtil) {
       return AnimateDomUtils( $mdUtil, $q, $timeout, $mdConstant, $animateCss);
     };
   }]);

/**
 * Factory function that requires special injections
 */
function AnimateDomUtils($mdUtil, $q, $timeout, $mdConstant, $animateCss) {
  var self;
  return self = {
    /**
     *
     */
    translate3d : function( target, from, to, options ) {
      return $animateCss(target, {
        from: from,
        to: to,
        addClass: options.transitionInClass,
        removeClass: options.transitionOutClass,
        duration: options.duration
      })
      .start()
      .then(function(){
          // Resolve with reverser function...
          return reverseTranslate;
      });

      /**
       * Specific reversal of the request translate animation above...
       */
      function reverseTranslate (newFrom) {
        return $animateCss(target, {
           to: newFrom || from,
           addClass: options.transitionOutClass,
           removeClass: options.transitionInClass,
           duration: options.duration
        }).start();

      }
    },

    /**
     * Listen for transitionEnd event (with optional timeout)
     * Announce completion or failure via promise handlers
     */
    waitTransitionEnd: function (element, opts) {
      var TIMEOUT = 3000; // fallback is 3 secs

      return $q(function(resolve, reject){
        opts = opts || { };

        // If there is no transition is found, resolve immediately
        //
        // NOTE: using $mdUtil.nextTick() causes delays/issues
        if (noTransitionFound(opts.cachedTransitionStyles)) {
          TIMEOUT = 0;
        }

        var timer = $timeout(finished, opts.timeout || TIMEOUT);
        element.on($mdConstant.CSS.TRANSITIONEND, finished);

        /**
         * Upon timeout or transitionEnd, reject or resolve (respectively) this promise.
         * NOTE: Make sure this transitionEnd didn't bubble up from a child
         */
        function finished(ev) {
          if ( ev && ev.target !== element[0]) return;

          if ( ev  ) $timeout.cancel(timer);
          element.off($mdConstant.CSS.TRANSITIONEND, finished);

          // Never reject since ngAnimate may cause timeouts due missed transitionEnd events
          resolve();

        }

        /**
         * Checks whether or not there is a transition.
         *
         * @param styles The cached styles to use for the calculation. If null, getComputedStyle()
         * will be used.
         *
         * @returns {boolean} True if there is no transition/duration; false otherwise.
         */
        function noTransitionFound(styles) {
          styles = styles || window.getComputedStyle(element[0]);

          return styles.transitionDuration == '0s' || (!styles.transition && !styles.transitionProperty);
        }

      });
    },

    calculateTransformValues: function (element, originator) {
      var origin = originator.element;
      var bounds = originator.bounds;

      if (origin || bounds) {
        var originBnds = origin ? self.clientRect(origin) || currentBounds() : self.copyRect(bounds);
        var dialogRect = self.copyRect(element[0].getBoundingClientRect());
        var dialogCenterPt = self.centerPointFor(dialogRect);
        var originCenterPt = self.centerPointFor(originBnds);

        return {
          centerX: originCenterPt.x - dialogCenterPt.x,
          centerY: originCenterPt.y - dialogCenterPt.y,
          scaleX: Math.round(100 * Math.min(0.5, originBnds.width / dialogRect.width)) / 100,
          scaleY: Math.round(100 * Math.min(0.5, originBnds.height / dialogRect.height)) / 100
        };
      }
      return {centerX: 0, centerY: 0, scaleX: 0.5, scaleY: 0.5};

      /**
       * This is a fallback if the origin information is no longer valid, then the
       * origin bounds simply becomes the current bounds for the dialogContainer's parent
       */
      function currentBounds() {
        var cntr = element ? element.parent() : null;
        var parent = cntr ? cntr.parent() : null;

        return parent ? self.clientRect(parent) : null;
      }
    },

    /**
     * Calculate the zoom transform from dialog to origin.
     *
     * We use this to set the dialog position immediately;
     * then the md-transition-in actually translates back to
     * `translate3d(0,0,0) scale(1.0)`...
     *
     * NOTE: all values are rounded to the nearest integer
     */
    calculateZoomToOrigin: function (element, originator) {
      var zoomTemplate = "translate3d( {centerX}px, {centerY}px, 0 ) scale( {scaleX}, {scaleY} )";
      var buildZoom = angular.bind(null, $mdUtil.supplant, zoomTemplate);

      return buildZoom(self.calculateTransformValues(element, originator));
    },

    /**
     * Calculate the slide transform from panel to origin.
     * NOTE: all values are rounded to the nearest integer
     */
    calculateSlideToOrigin: function (element, originator) {
      var slideTemplate = "translate3d( {centerX}px, {centerY}px, 0 )";
      var buildSlide = angular.bind(null, $mdUtil.supplant, slideTemplate);

      return buildSlide(self.calculateTransformValues(element, originator));
    },

    /**
     * Enhance raw values to represent valid css stylings...
     */
    toCss : function( raw ) {
      var css = { };
      var lookups = 'left top right bottom width height x y min-width min-height max-width max-height';

      angular.forEach(raw, function(value,key) {
        if ( angular.isUndefined(value) ) return;

        if ( lookups.indexOf(key) >= 0 ) {
          css[key] = value + 'px';
        } else {
          switch (key) {
            case 'transition':
              convertToVendor(key, $mdConstant.CSS.TRANSITION, value);
              break;
            case 'transform':
              convertToVendor(key, $mdConstant.CSS.TRANSFORM, value);
              break;
            case 'transformOrigin':
              convertToVendor(key, $mdConstant.CSS.TRANSFORM_ORIGIN, value);
              break;
            case 'font-size':
              css['font-size'] = value; // font sizes aren't always in px
              break;
          }
        }
      });

      return css;

      function convertToVendor(key, vendor, value) {
        angular.forEach(vendor.split(' '), function (key) {
          css[key] = value;
        });
      }
    },

    /**
     * Convert the translate CSS value to key/value pair(s).
     */
    toTransformCss: function (transform, addTransition, transition) {
      var css = {};
      angular.forEach($mdConstant.CSS.TRANSFORM.split(' '), function (key) {
        css[key] = transform;
      });

      if (addTransition) {
        transition = transition || "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important";
        css.transition = transition;
      }

      return css;
    },

    /**
     *  Clone the Rect and calculate the height/width if needed
     */
    copyRect: function (source, destination) {
      if (!source) return null;

      destination = destination || {};

      angular.forEach('left top right bottom width height'.split(' '), function (key) {
        destination[key] = Math.round(source[key]);
      });

      destination.width = destination.width || (destination.right - destination.left);
      destination.height = destination.height || (destination.bottom - destination.top);

      return destination;
    },

    /**
     * Calculate ClientRect of element; return null if hidden or zero size
     */
    clientRect: function (element) {
      var bounds = angular.element(element)[0].getBoundingClientRect();
      var isPositiveSizeClientRect = function (rect) {
        return rect && (rect.width > 0) && (rect.height > 0);
      };

      // If the event origin element has zero size, it has probably been hidden.
      return isPositiveSizeClientRect(bounds) ? self.copyRect(bounds) : null;
    },

    /**
     *  Calculate 'rounded' center point of Rect
     */
    centerPointFor: function (targetRect) {
      return targetRect ? {
        x: Math.round(targetRect.left + (targetRect.width / 2)),
        y: Math.round(targetRect.top + (targetRect.height / 2))
      } : { x : 0, y : 0 };
    }

  };
}


})();
(function(){
"use strict";

if (angular.version.minor >= 4) {
  angular.module('material.core.animate', []);
} else {
(function() {
  "use strict";

  var forEach = angular.forEach;

  var WEBKIT = angular.isDefined(document.documentElement.style.WebkitAppearance);
  var TRANSITION_PROP = WEBKIT ? 'WebkitTransition' : 'transition';
  var ANIMATION_PROP = WEBKIT ? 'WebkitAnimation' : 'animation';
  var PREFIX = WEBKIT ? '-webkit-' : '';

  var TRANSITION_EVENTS = (WEBKIT ? 'webkitTransitionEnd ' : '') + 'transitionend';
  var ANIMATION_EVENTS = (WEBKIT ? 'webkitAnimationEnd ' : '') + 'animationend';

  var $$ForceReflowFactory = ['$document', function($document) {
    return function() {
      return $document[0].body.clientWidth + 1;
    };
  }];

  var $$rAFMutexFactory = ['$$rAF', function($$rAF) {
    return function() {
      var passed = false;
      $$rAF(function() {
        passed = true;
      });
      return function(fn) {
        passed ? fn() : $$rAF(fn);
      };
    };
  }];

  var $$AnimateRunnerFactory = ['$q', '$$rAFMutex', function($q, $$rAFMutex) {
    var INITIAL_STATE = 0;
    var DONE_PENDING_STATE = 1;
    var DONE_COMPLETE_STATE = 2;

    function AnimateRunner(host) {
      this.setHost(host);

      this._doneCallbacks = [];
      this._runInAnimationFrame = $$rAFMutex();
      this._state = 0;
    }

    AnimateRunner.prototype = {
      setHost: function(host) {
        this.host = host || {};
      },

      done: function(fn) {
        if (this._state === DONE_COMPLETE_STATE) {
          fn();
        } else {
          this._doneCallbacks.push(fn);
        }
      },

      progress: angular.noop,

      getPromise: function() {
        if (!this.promise) {
          var self = this;
          this.promise = $q(function(resolve, reject) {
            self.done(function(status) {
              status === false ? reject() : resolve();
            });
          });
        }
        return this.promise;
      },

      then: function(resolveHandler, rejectHandler) {
        return this.getPromise().then(resolveHandler, rejectHandler);
      },

      'catch': function(handler) {
        return this.getPromise()['catch'](handler);
      },

      'finally': function(handler) {
        return this.getPromise()['finally'](handler);
      },

      pause: function() {
        if (this.host.pause) {
          this.host.pause();
        }
      },

      resume: function() {
        if (this.host.resume) {
          this.host.resume();
        }
      },

      end: function() {
        if (this.host.end) {
          this.host.end();
        }
        this._resolve(true);
      },

      cancel: function() {
        if (this.host.cancel) {
          this.host.cancel();
        }
        this._resolve(false);
      },

      complete: function(response) {
        var self = this;
        if (self._state === INITIAL_STATE) {
          self._state = DONE_PENDING_STATE;
          self._runInAnimationFrame(function() {
            self._resolve(response);
          });
        }
      },

      _resolve: function(response) {
        if (this._state !== DONE_COMPLETE_STATE) {
          forEach(this._doneCallbacks, function(fn) {
            fn(response);
          });
          this._doneCallbacks.length = 0;
          this._state = DONE_COMPLETE_STATE;
        }
      }
    };

    // Polyfill AnimateRunner.all which is used by input animations
    AnimateRunner.all = function(runners, callback) {
      var count = 0;
      var status = true;
      forEach(runners, function(runner) {
        runner.done(onProgress);
      });

      function onProgress(response) {
        status = status && response;
        if (++count === runners.length) {
          callback(status);
        }
      }
    };

    return AnimateRunner;
  }];

  angular
    .module('material.core.animate', [])
    .factory('$$forceReflow', $$ForceReflowFactory)
    .factory('$$AnimateRunner', $$AnimateRunnerFactory)
    .factory('$$rAFMutex', $$rAFMutexFactory)
    .factory('$animateCss', ['$window', '$$rAF', '$$AnimateRunner', '$$forceReflow', '$$jqLite', '$timeout', '$animate',
                     function($window,   $$rAF,   $$AnimateRunner,   $$forceReflow,   $$jqLite,   $timeout, $animate) {

      function init(element, options) {

        var temporaryStyles = [];
        var node = getDomNode(element);
        var areAnimationsAllowed = node && $animate.enabled();

        var hasCompleteStyles = false;
        var hasCompleteClasses = false;

        if (areAnimationsAllowed) {
          if (options.transitionStyle) {
            temporaryStyles.push([PREFIX + 'transition', options.transitionStyle]);
          }

          if (options.keyframeStyle) {
            temporaryStyles.push([PREFIX + 'animation', options.keyframeStyle]);
          }

          if (options.delay) {
            temporaryStyles.push([PREFIX + 'transition-delay', options.delay + 's']);
          }

          if (options.duration) {
            temporaryStyles.push([PREFIX + 'transition-duration', options.duration + 's']);
          }

          hasCompleteStyles = options.keyframeStyle ||
              (options.to && (options.duration > 0 || options.transitionStyle));
          hasCompleteClasses = !!options.addClass || !!options.removeClass;

          blockTransition(element, true);
        }

        var hasCompleteAnimation = areAnimationsAllowed && (hasCompleteStyles || hasCompleteClasses);

        applyAnimationFromStyles(element, options);

        var animationClosed = false;
        var events, eventFn;

        return {
          close: $window.close,
          start: function() {
            var runner = new $$AnimateRunner();
            waitUntilQuiet(function() {
              blockTransition(element, false);
              if (!hasCompleteAnimation) {
                return close();
              }

              forEach(temporaryStyles, function(entry) {
                var key = entry[0];
                var value = entry[1];
                node.style[camelCase(key)] = value;
              });

              applyClasses(element, options);

              var timings = computeTimings(element);
              if (timings.duration === 0) {
                return close();
              }

              var moreStyles = [];

              if (options.easing) {
                if (timings.transitionDuration) {
                  moreStyles.push([PREFIX + 'transition-timing-function', options.easing]);
                }
                if (timings.animationDuration) {
                  moreStyles.push([PREFIX + 'animation-timing-function', options.easing]);
                }
              }

              if (options.delay && timings.animationDelay) {
                moreStyles.push([PREFIX + 'animation-delay', options.delay + 's']);
              }

              if (options.duration && timings.animationDuration) {
                moreStyles.push([PREFIX + 'animation-duration', options.duration + 's']);
              }

              forEach(moreStyles, function(entry) {
                var key = entry[0];
                var value = entry[1];
                node.style[camelCase(key)] = value;
                temporaryStyles.push(entry);
              });

              var maxDelay = timings.delay;
              var maxDelayTime = maxDelay * 1000;
              var maxDuration = timings.duration;
              var maxDurationTime = maxDuration * 1000;
              var startTime = Date.now();

              events = [];
              if (timings.transitionDuration) {
                events.push(TRANSITION_EVENTS);
              }
              if (timings.animationDuration) {
                events.push(ANIMATION_EVENTS);
              }
              events = events.join(' ');
              eventFn = function(event) {
                event.stopPropagation();
                var ev = event.originalEvent || event;
                var timeStamp = ev.timeStamp || Date.now();
                var elapsedTime = parseFloat(ev.elapsedTime.toFixed(3));
                if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {
                  close();
                }
              };
              element.on(events, eventFn);

              applyAnimationToStyles(element, options);

              $timeout(close, maxDelayTime + maxDurationTime * 1.5, false);
            });

            return runner;

            function close() {
              if (animationClosed) return;
              animationClosed = true;

              if (events && eventFn) {
                element.off(events, eventFn);
              }
              applyClasses(element, options);
              applyAnimationStyles(element, options);
              forEach(temporaryStyles, function(entry) {
                node.style[camelCase(entry[0])] = '';
              });
              runner.complete(true);
              return runner;
            }
          }
        };
      }

      function applyClasses(element, options) {
        if (options.addClass) {
          $$jqLite.addClass(element, options.addClass);
          options.addClass = null;
        }
        if (options.removeClass) {
          $$jqLite.removeClass(element, options.removeClass);
          options.removeClass = null;
        }
      }

      function computeTimings(element) {
        var node = getDomNode(element);
        var cs = $window.getComputedStyle(node);
        var tdr = parseMaxTime(cs[prop('transitionDuration')]);
        var adr = parseMaxTime(cs[prop('animationDuration')]);
        var tdy = parseMaxTime(cs[prop('transitionDelay')]);
        var ady = parseMaxTime(cs[prop('animationDelay')]);

        adr *= (parseInt(cs[prop('animationIterationCount')], 10) || 1);
        var duration = Math.max(adr, tdr);
        var delay = Math.max(ady, tdy);

        return {
          duration: duration,
          delay: delay,
          animationDuration: adr,
          transitionDuration: tdr,
          animationDelay: ady,
          transitionDelay: tdy
        };

        function prop(key) {
          return WEBKIT ? 'Webkit' + key.charAt(0).toUpperCase() + key.substr(1)
                        : key;
        }
      }

      function parseMaxTime(str) {
        var maxValue = 0;
        var values = (str || "").split(/\s*,\s*/);
        forEach(values, function(value) {
          // it's always safe to consider only second values and omit `ms` values since
          // getComputedStyle will always handle the conversion for us
          if (value.charAt(value.length - 1) == 's') {
            value = value.substring(0, value.length - 1);
          }
          value = parseFloat(value) || 0;
          maxValue = maxValue ? Math.max(value, maxValue) : value;
        });
        return maxValue;
      }

      var cancelLastRAFRequest;
      var rafWaitQueue = [];
      function waitUntilQuiet(callback) {
        if (cancelLastRAFRequest) {
          cancelLastRAFRequest(); //cancels the request
        }
        rafWaitQueue.push(callback);
        cancelLastRAFRequest = $$rAF(function() {
          cancelLastRAFRequest = null;

          // DO NOT REMOVE THIS LINE OR REFACTOR OUT THE `pageWidth` variable.
          // PLEASE EXAMINE THE `$$forceReflow` service to understand why.
          var pageWidth = $$forceReflow();

          // we use a for loop to ensure that if the queue is changed
          // during this looping then it will consider new requests
          for (var i = 0; i < rafWaitQueue.length; i++) {
            rafWaitQueue[i](pageWidth);
          }
          rafWaitQueue.length = 0;
        });
      }

      function applyAnimationStyles(element, options) {
        applyAnimationFromStyles(element, options);
        applyAnimationToStyles(element, options);
      }

      function applyAnimationFromStyles(element, options) {
        if (options.from) {
          element.css(options.from);
          options.from = null;
        }
      }

      function applyAnimationToStyles(element, options) {
        if (options.to) {
          element.css(options.to);
          options.to = null;
        }
      }

      function getDomNode(element) {
        for (var i = 0; i < element.length; i++) {
          if (element[i].nodeType === 1) return element[i];
        }
      }

      function blockTransition(element, bool) {
        var node = getDomNode(element);
        var key = camelCase(PREFIX + 'transition-delay');
        node.style[key] = bool ? '-9999s' : '';
      }

      return init;
    }]);

  /**
   * Older browsers [FF31] expect camelCase
   * property keys.
   * e.g.
   *  animation-duration --> animationDuration
   */
  function camelCase(str) {
    return str.replace(/-[a-z]/g, function(str) {
      return str.charAt(1).toUpperCase();
    });
  }

})();

}

})();
(function(){
"use strict";

/*
 * @ngdoc module
 * @name material.components.backdrop
 * @description Backdrop
 */

/**
 * @ngdoc directive
 * @name mdBackdrop
 * @module material.components.backdrop
 *
 * @restrict E
 *
 * @description
 * `<md-backdrop>` is a backdrop element used by other components, such as dialog and bottom sheet.
 * Apply class `opaque` to make the backdrop use the theme backdrop color.
 *
 */

angular
  .module('material.components.backdrop', ['material.core'])
  .directive('mdBackdrop', ["$mdTheming", "$mdUtil", "$animate", "$rootElement", "$window", "$log", "$$rAF", "$document", function BackdropDirective($mdTheming, $mdUtil, $animate, $rootElement, $window, $log, $$rAF, $document) {
    var ERROR_CSS_POSITION = '<md-backdrop> may not work properly in a scrolled, static-positioned parent container.';

    return {
      restrict: 'E',
      link: postLink
    };

    function postLink(scope, element, attrs) {
      // backdrop may be outside the $rootElement, tell ngAnimate to animate regardless
      if ($animate.pin) $animate.pin(element, $rootElement);

      var bodyStyles;

      $$rAF(function() {
        // If body scrolling has been disabled using mdUtil.disableBodyScroll(),
        // adjust the 'backdrop' height to account for the fixed 'body' top offset.
        // Note that this can be pretty expensive and is better done inside the $$rAF.
        bodyStyles = $window.getComputedStyle($document[0].body);

        if (bodyStyles.position === 'fixed') {
          var resizeHandler = $mdUtil.debounce(function(){
            bodyStyles = $window.getComputedStyle($document[0].body);
            resize();
          }, 60, null, false);

          resize();
          angular.element($window).on('resize', resizeHandler);

          scope.$on('$destroy', function() {
            angular.element($window).off('resize', resizeHandler);
          });
        }

        // Often $animate.enter() is used to append the backDrop element
        // so let's wait until $animate is done...
        var parent = element.parent();

        if (parent.length) {
          if (parent[0].nodeName === 'BODY') {
            element.css('position', 'fixed');
          }

          var styles = $window.getComputedStyle(parent[0]);

          if (styles.position === 'static') {
            // backdrop uses position:absolute and will not work properly with parent position:static (default)
            $log.warn(ERROR_CSS_POSITION);
          }

          // Only inherit the parent if the backdrop has a parent.
          $mdTheming.inherit(element, parent);
        }
      });

      function resize() {
        var viewportHeight = parseInt(bodyStyles.height, 10) + Math.abs(parseInt(bodyStyles.top, 10));
        element.css('height', viewportHeight + 'px');
      }
    }

  }]);

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.button
 * @description
 *
 * Button
 */
MdButtonDirective.$inject = ["$mdButtonInkRipple", "$mdTheming", "$mdAria", "$mdInteraction"];
MdAnchorDirective.$inject = ["$mdTheming"];
angular
    .module('material.components.button', [ 'material.core' ])
    .directive('mdButton', MdButtonDirective)
    .directive('a', MdAnchorDirective);


/**
 * @private
 * @restrict E
 *
 * @description
 * `a` is an anchor directive used to inherit theme colors for md-primary, md-accent, etc.
 *
 * @usage
 *
 * <hljs lang="html">
 *  <md-content md-theme="myTheme">
 *    <a href="#chapter1" class="md-accent"></a>
 *  </md-content>
 * </hljs>
 */
function MdAnchorDirective($mdTheming) {
  return {
    restrict : 'E',
    link : function postLink(scope, element) {
      // Make sure to inherit theme so stand-alone anchors
      // support theme colors for md-primary, md-accent, etc.
      $mdTheming(element);
    }
  };
}


/**
 * @ngdoc directive
 * @name mdButton
 * @module material.components.button
 *
 * @restrict E
 *
 * @description
 * `<md-button>` is a button directive with optional ink ripples (default enabled).
 *
 * If you supply a `href` or `ng-href` attribute, it will become an `<a>` element. Otherwise, it
 * will become a `<button>` element. As per the
 * [Material Design specifications](https://material.google.com/style/color.html#color-color-palette)
 * the FAB button background is filled with the accent color [by default]. The primary color palette
 * may be used with the `md-primary` class.
 *
 * Developers can also change the color palette of the button, by using the following classes
 * - `md-primary`
 * - `md-accent`
 * - `md-warn`
 *
 * See for example
 *
 * <hljs lang="html">
 *   <md-button class="md-primary">Primary Button</md-button>
 * </hljs>
 *
 * Button can be also raised, which means that they will use the current color palette to fill the button.
 *
 * <hljs lang="html">
 *   <md-button class="md-accent md-raised">Raised and Accent Button</md-button>
 * </hljs>
 *
 * It is also possible to disable the focus effect on the button, by using the following markup.
 *
 * <hljs lang="html">
 *   <md-button class="md-no-focus">No Focus Style</md-button>
 * </hljs>
 *
 * @param {string=} aria-label Adds alternative text to button for accessibility, useful for icon buttons.
 * If no default text is found, a warning will be logged.
 * @param {boolean=} md-no-ink If present, disable ink ripple effects.
 * @param {string=} md-ripple-size Overrides the default ripple size logic. Options: `full`, `partial`, `auto`.
 * @param {expression=} ng-disabled Disable the button when the expression is truthy.
 * @param {expression=} ng-blur Expression evaluated when focus is removed from the button.
 *
 * @usage
 *
 * Regular buttons:
 *
 * <hljs lang="html">
 *  <md-button> Flat Button </md-button>
 *  <md-button href="http://google.com"> Flat link </md-button>
 *  <md-button class="md-raised"> Raised Button </md-button>
 *  <md-button ng-disabled="true"> Disabled Button </md-button>
 *  <md-button>
 *    <md-icon md-svg-src="your/icon.svg"></md-icon>
 *    Register Now
 *  </md-button>
 * </hljs>
 *
 * FAB buttons:
 *
 * <hljs lang="html">
 *  <md-button class="md-fab" aria-label="FAB">
 *    <md-icon md-svg-src="your/icon.svg"></md-icon>
 *  </md-button>
 *  <!-- mini-FAB -->
 *  <md-button class="md-fab md-mini" aria-label="Mini FAB">
 *    <md-icon md-svg-src="your/icon.svg"></md-icon>
 *  </md-button>
 *  <!-- Button with SVG Icon -->
 *  <md-button class="md-icon-button" aria-label="Custom Icon Button">
 *    <md-icon md-svg-icon="path/to/your.svg"></md-icon>
 *  </md-button>
 * </hljs>
 */
function MdButtonDirective($mdButtonInkRipple, $mdTheming, $mdAria, $mdInteraction) {

  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    template: getTemplate,
    link: postLink
  };

  function isAnchor(attr) {
    return angular.isDefined(attr.href) || angular.isDefined(attr.ngHref) || angular.isDefined(attr.ngLink) || angular.isDefined(attr.uiSref);
  }

  function getTemplate(element, attr) {
    if (isAnchor(attr)) {
      return '<a class="md-button" ng-transclude></a>';
    } else {
      //If buttons don't have type="button", they will submit forms automatically.
      var btnType = (typeof attr.type === 'undefined') ? 'button' : attr.type;
      return '<button class="md-button" type="' + btnType + '" ng-transclude></button>';
    }
  }

  function postLink(scope, element, attr) {
    $mdTheming(element);
    $mdButtonInkRipple.attach(scope, element);

    // Use async expect to support possible bindings in the button label
    $mdAria.expectWithoutText(element, 'aria-label');

    // For anchor elements, we have to set tabindex manually when the
    // element is disabled
    if (isAnchor(attr) && angular.isDefined(attr.ngDisabled) ) {
      scope.$watch(attr.ngDisabled, function(isDisabled) {
        element.attr('tabindex', isDisabled ? -1 : 0);
      });
    }

    // disabling click event when disabled is true
    element.on('click', function(e){
      if (attr.disabled === true) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });

    if (!element.hasClass('md-no-focus')) {

      element.on('focus', function() {

        // Only show the focus effect when being focused through keyboard interaction or programmatically
        if (!$mdInteraction.isUserInvoked() || $mdInteraction.getLastInteractionType() === 'keyboard') {
          element.addClass('md-focused');
        }

      });

      element.on('blur', function() {
        element.removeClass('md-focused');
      });
    }

  }

}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.card
 *
 * @description
 * Card components.
 */
mdCardDirective.$inject = ["$mdTheming"];
angular.module('material.components.card', [
    'material.core'
  ])
  .directive('mdCard', mdCardDirective);


/**
 * @ngdoc directive
 * @name mdCard
 * @module material.components.card
 *
 * @restrict E
 *
 * @description
 * The `<md-card>` directive is a container element used within `<md-content>` containers.
 *
 * An image included as a direct descendant will fill the card's width. If you want to avoid this,
 * you can add the `md-image-no-fill` class to the parent element. The `<md-card-content>`
 * container will wrap text content and provide padding. An `<md-card-footer>` element can be
 * optionally included to put content flush against the bottom edge of the card.
 *
 * Action buttons can be included in an `<md-card-actions>` element, similar to `<md-dialog-actions>`.
 * You can then position buttons using layout attributes.
 *
 * Card is built with:
 * * `<md-card-header>` - Header for the card, holds avatar, text and squared image
 *  - `<md-card-avatar>` - Card avatar
 *    - `md-user-avatar` - Class for user image
 *    - `<md-icon>`
 *  - `<md-card-header-text>` - Contains elements for the card description
 *    - `md-title` - Class for the card title
 *    - `md-subhead` - Class for the card sub header
 * * `<img>` - Image for the card
 * * `<md-card-title>` - Card content title
 *  - `<md-card-title-text>`
 *    - `md-headline` - Class for the card content title
 *    - `md-subhead` - Class for the card content sub header
 *  - `<md-card-title-media>` - Squared image within the title
 *    - `md-media-sm` - Class for small image
 *    - `md-media-md` - Class for medium image
 *    - `md-media-lg` - Class for large image
 *    - `md-media-xl` - Class for extra large image
 * * `<md-card-content>` - Card content
 * * `<md-card-actions>` - Card actions
 *  - `<md-card-icon-actions>` - Icon actions
 *
 * Cards have constant width and variable heights; where the maximum height is limited to what can
 * fit within a single view on a platform, but it can temporarily expand as needed.
 *
 * @usage
 * ### Card with optional footer
 * <hljs lang="html">
 * <md-card>
 *  <img src="card-image.png" class="md-card-image" alt="image caption">
 *  <md-card-content>
 *    <h2>Card headline</h2>
 *    <p>Card content</p>
 *  </md-card-content>
 *  <md-card-footer>
 *    Card footer
 *  </md-card-footer>
 * </md-card>
 * </hljs>
 *
 * ### Card with actions
 * <hljs lang="html">
 * <md-card>
 *  <img src="card-image.png" class="md-card-image" alt="image caption">
 *  <md-card-content>
 *    <h2>Card headline</h2>
 *    <p>Card content</p>
 *  </md-card-content>
 *  <md-card-actions layout="row" layout-align="end center">
 *    <md-button>Action 1</md-button>
 *    <md-button>Action 2</md-button>
 *  </md-card-actions>
 * </md-card>
 * </hljs>
 *
 * ### Card with header, image, title actions and content
 * <hljs lang="html">
 * <md-card>
 *   <md-card-header>
 *     <md-card-avatar>
 *       <img class="md-user-avatar" src="avatar.png"/>
 *     </md-card-avatar>
 *     <md-card-header-text>
 *       <span class="md-title">Title</span>
 *       <span class="md-subhead">Sub header</span>
 *     </md-card-header-text>
 *   </md-card-header>
 *   <img ng-src="card-image.png" class="md-card-image" alt="image caption">
 *   <md-card-title>
 *     <md-card-title-text>
 *       <span class="md-headline">Card headline</span>
 *       <span class="md-subhead">Card subheader</span>
 *     </md-card-title-text>
 *   </md-card-title>
 *   <md-card-actions layout="row" layout-align="start center">
 *     <md-button>Action 1</md-button>
 *     <md-button>Action 2</md-button>
 *     <md-card-icon-actions>
 *       <md-button class="md-icon-button" aria-label="icon">
 *         <md-icon md-svg-icon="icon"></md-icon>
 *       </md-button>
 *     </md-card-icon-actions>
 *   </md-card-actions>
 *   <md-card-content>
 *     <p>
 *      Card content
 *     </p>
 *   </md-card-content>
 * </md-card>
 * </hljs>
 */
function mdCardDirective($mdTheming) {
  return {
    restrict: 'E',
    link: function ($scope, $element, attr) {
      $element.addClass('_md');     // private md component indicator for styling
      $mdTheming($element);
    }
  };
}

})();
(function(){
"use strict";

(function () {
  "use strict";

  /**
   *  Use a RegExp to check if the `md-colors="<expression>"` is static string
   *  or one that should be observed and dynamically interpolated.
   */
  MdColorsDirective.$inject = ["$mdColors", "$mdUtil", "$log", "$parse"];
  MdColorsService.$inject = ["$mdTheming", "$mdUtil", "$log"];
  var STATIC_COLOR_EXPRESSION = /^{((\s|,)*?["'a-zA-Z-]+?\s*?:\s*?('|")[a-zA-Z0-9-.]*('|"))+\s*}$/;
  var colorPalettes = null;

  /**
   * @ngdoc module
   * @name material.components.colors
   *
   * @description
   * Define $mdColors service and a `md-colors=""` attribute directive
   */
  angular
    .module('material.components.colors', ['material.core'])
    .directive('mdColors', MdColorsDirective)
    .service('$mdColors', MdColorsService);

  /**
   * @ngdoc service
   * @name $mdColors
   * @module material.components.colors
   *
   * @description
   * With only defining themes, one couldn't get non AngularJS Material elements colored with Material colors,
   * `$mdColors` service is used by the md-color directive to convert the 1..n color expressions to RGBA values and will apply
   * those values to element as CSS property values.
   *
   *  @usage
   *  <hljs lang="js">
   *    angular.controller('myCtrl', function ($mdColors) {
   *      var color = $mdColors.getThemeColor('myTheme-red-200-0.5');
   *      ...
   *    });
   *  </hljs>
   *
   */
  function MdColorsService($mdTheming, $mdUtil, $log) {
    colorPalettes = colorPalettes || Object.keys($mdTheming.PALETTES);

    // Publish service instance
    return {
      applyThemeColors: applyThemeColors,
      getThemeColor: getThemeColor,
      hasTheme: hasTheme
    };

    // ********************************************
    // Internal Methods
    // ********************************************

    /**
     * @ngdoc method
     * @name $mdColors#applyThemeColors
     *
     * @description
     * Gets a color json object, keys are css properties and values are string of the wanted color
     * Then calculate the rgba() values based on the theme color parts
     *
     * @param {DOMElement} element the element to apply the styles on.
     * @param {object} colorExpression json object, keys are css properties and values are string of the wanted color,
     * for example: `{color: 'red-A200-0.3'}`.
     *
     * @usage
     * <hljs lang="js">
     *   app.directive('myDirective', function($mdColors) {
     *     return {
     *       ...
     *       link: function (scope, elem) {
     *         $mdColors.applyThemeColors(elem, {color: 'red'});
     *       }
     *    }
     *   });
     * </hljs>
     */
    function applyThemeColors(element, colorExpression) {
      try {
        if (colorExpression) {
          // Assign the calculate RGBA color values directly as inline CSS
          element.css(interpolateColors(colorExpression));
        }
      } catch (e) {
        $log.error(e.message);
      }

    }

    /**
     * @ngdoc method
     * @name $mdColors#getThemeColor
     *
     * @description
     * Get parsed color from expression
     *
     * @param {string} expression string of a color expression (for instance `'red-700-0.8'`)
     *
     * @returns {string} a css color expression (for instance `rgba(211, 47, 47, 0.8)`)
     *
     * @usage
     *  <hljs lang="js">
     *    angular.controller('myCtrl', function ($mdColors) {
     *      var color = $mdColors.getThemeColor('myTheme-red-200-0.5');
     *      ...
     *    });
     *  </hljs>
     */
    function getThemeColor(expression) {
      var color = extractColorOptions(expression);

      return parseColor(color);
    }

    /**
     * Return the parsed color
     * @param color hashmap of color definitions
     * @param contrast whether use contrast color for foreground
     * @returns rgba color string
     */
    function parseColor(color, contrast) {
      contrast = contrast || false;
      var rgbValues = $mdTheming.PALETTES[color.palette][color.hue];

      rgbValues = contrast ? rgbValues.contrast : rgbValues.value;

      return $mdUtil.supplant('rgba({0}, {1}, {2}, {3})',
        [rgbValues[0], rgbValues[1], rgbValues[2], rgbValues[3] || color.opacity]
      );
    }

    /**
     * Convert the color expression into an object with scope-interpolated values
     * Then calculate the rgba() values based on the theme color parts
     *
     * @results Hashmap of CSS properties with associated `rgba( )` string vales
     *
     *
     */
    function interpolateColors(themeColors) {
      var rgbColors = {};

      var hasColorProperty = themeColors.hasOwnProperty('color');

      angular.forEach(themeColors, function (value, key) {
        var color = extractColorOptions(value);
        var hasBackground = key.indexOf('background') > -1;

        rgbColors[key] = parseColor(color);
        if (hasBackground && !hasColorProperty) {
          rgbColors.color = parseColor(color, true);
        }
      });

      return rgbColors;
    }

    /**
     * Check if expression has defined theme
     * e.g.
     * 'myTheme-primary' => true
     * 'red-800' => false
     */
    function hasTheme(expression) {
      return angular.isDefined($mdTheming.THEMES[expression.split('-')[0]]);
    }

    /**
     * For the evaluated expression, extract the color parts into a hash map
     */
    function extractColorOptions(expression) {
      var parts = expression.split('-');
      var hasTheme = angular.isDefined($mdTheming.THEMES[parts[0]]);
      var theme = hasTheme ? parts.splice(0, 1)[0] : $mdTheming.defaultTheme();

      return {
        theme: theme,
        palette: extractPalette(parts, theme),
        hue: extractHue(parts, theme),
        opacity: parts[2] || 1
      };
    }

    /**
     * Calculate the theme palette name
     */
    function extractPalette(parts, theme) {
      // If the next section is one of the palettes we assume it's a two word palette
      // Two word palette can be also written in camelCase, forming camelCase to dash-case

      var isTwoWord = parts.length > 1 && colorPalettes.indexOf(parts[1]) !== -1;
      var palette = parts[0].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

      if (isTwoWord)  palette = parts[0] + '-' + parts.splice(1, 1);

      if (colorPalettes.indexOf(palette) === -1) {
        // If the palette is not in the palette list it's one of primary/accent/warn/background
        var scheme = $mdTheming.THEMES[theme].colors[palette];
        if (!scheme) {
          throw new Error($mdUtil.supplant('mdColors: couldn\'t find \'{palette}\' in the palettes.', {palette: palette}));
        }
        palette = scheme.name;
      }

      return palette;
    }

    function extractHue(parts, theme) {
      var themeColors = $mdTheming.THEMES[theme].colors;

      if (parts[1] === 'hue') {
        var hueNumber = parseInt(parts.splice(2, 1)[0], 10);

        if (hueNumber < 1 || hueNumber > 3) {
          throw new Error($mdUtil.supplant('mdColors: \'hue-{hueNumber}\' is not a valid hue, can be only \'hue-1\', \'hue-2\' and \'hue-3\'', {hueNumber: hueNumber}));
        }
        parts[1] = 'hue-' + hueNumber;

        if (!(parts[0] in themeColors)) {
          throw new Error($mdUtil.supplant('mdColors: \'hue-x\' can only be used with [{availableThemes}], but was used with \'{usedTheme}\'', {
            availableThemes: Object.keys(themeColors).join(', '),
            usedTheme: parts[0]
          }));
        }

        return themeColors[parts[0]].hues[parts[1]];
      }

      return parts[1] || themeColors[parts[0] in themeColors ? parts[0] : 'primary'].hues['default'];
    }
  }

  /**
   * @ngdoc directive
   * @name mdColors
   * @module material.components.colors
   *
   * @restrict A
   *
   * @description
   * `mdColors` directive will apply the theme-based color expression as RGBA CSS style values.
   *
   *   The format will be similar to our color defining in the scss files:
   *
   *   ## `[?theme]-[palette]-[?hue]-[?opacity]`
   *   - [theme]    - default value is the default theme
   *   - [palette]  - can be either palette name or primary/accent/warn/background
   *   - [hue]      - default is 500 (hue-x can be used with primary/accent/warn/background)
   *   - [opacity]  - default is 1
   *
   *   > `?` indicates optional parameter
   *
   * @usage
   * <hljs lang="html">
   *   <div md-colors="{background: 'myTheme-accent-900-0.43'}">
   *     <div md-colors="{color: 'red-A100', 'border-color': 'primary-600'}">
   *       <span>Color demo</span>
   *     </div>
   *   </div>
   * </hljs>
   *
   * `mdColors` directive will automatically watch for changes in the expression if it recognizes an interpolation
   * expression or a function. For performance options, you can use `::` prefix to the `md-colors` expression
   * to indicate a one-time data binding.
   * <hljs lang="html">
   *   <md-card md-colors="::{background: '{{theme}}-primary-700'}">
   *   </md-card>
   * </hljs>
   *
   */
  function MdColorsDirective($mdColors, $mdUtil, $log, $parse) {
    return {
      restrict: 'A',
      require: ['^?mdTheme'],
      compile: function (tElem, tAttrs) {
        var shouldWatch = shouldColorsWatch();

        return function (scope, element, attrs, ctrl) {
          var mdThemeController = ctrl[0];

          var lastColors = {};

          var parseColors = function (theme) {
            if (typeof theme !== 'string') {
              theme = '';
            }

            if (!attrs.mdColors) {
              attrs.mdColors = '{}';
            }

            /**
             * Json.parse() does not work because the keys are not quoted;
             * use $parse to convert to a hash map
             */
            var colors = $parse(attrs.mdColors)(scope);

            /**
             * If mdTheme is defined up the DOM tree
             * we add mdTheme theme to colors who doesn't specified a theme
             *
             * # example
             * <hljs lang="html">
             *   <div md-theme="myTheme">
             *     <div md-colors="{background: 'primary-600'}">
             *       <span md-colors="{background: 'mySecondTheme-accent-200'}">Color demo</span>
             *     </div>
             *   </div>
             * </hljs>
             *
             * 'primary-600' will be 'myTheme-primary-600',
             * but 'mySecondTheme-accent-200' will stay the same cause it has a theme prefix
             */
            if (mdThemeController) {
              Object.keys(colors).forEach(function (prop) {
                var color = colors[prop];
                if (!$mdColors.hasTheme(color)) {
                  colors[prop] = (theme || mdThemeController.$mdTheme) + '-' + color;
                }
              });
            }

            cleanElement(colors);

            return colors;
          };

          var cleanElement = function (colors) {
            if (!angular.equals(colors, lastColors)) {
              var keys = Object.keys(lastColors);

              if (lastColors.background && !keys.color) {
                keys.push('color');
              }

              keys.forEach(function (key) {
                element.css(key, '');
              });
            }

            lastColors = colors;
          };

          /**
           * Registering for mgTheme changes and asking mdTheme controller run our callback whenever a theme changes
           */
          var unregisterChanges = angular.noop;

          if (mdThemeController) {
            unregisterChanges = mdThemeController.registerChanges(function (theme) {
              $mdColors.applyThemeColors(element, parseColors(theme));
            });
          }

          scope.$on('$destroy', function () {
            unregisterChanges();
          });

          try {
            if (shouldWatch) {
              scope.$watch(parseColors, angular.bind(this,
                $mdColors.applyThemeColors, element
              ), true);
            }
            else {
              $mdColors.applyThemeColors(element, parseColors());
            }

          }
          catch (e) {
            $log.error(e.message);
          }

        };

        function shouldColorsWatch() {
          // Simulate 1x binding and mark mdColorsWatch == false
          var rawColorExpression = tAttrs.mdColors;
          var bindOnce = rawColorExpression.indexOf('::') > -1;
          var isStatic = bindOnce ? true : STATIC_COLOR_EXPRESSION.test(tAttrs.mdColors);

          // Remove it for the postLink...
          tAttrs.mdColors = rawColorExpression.replace('::', '');

          var hasWatchAttr = angular.isDefined(tAttrs.mdColorsWatch);

          return (bindOnce || isStatic) ? false :
            hasWatchAttr ? $mdUtil.parseAttributeBoolean(tAttrs.mdColorsWatch) : true;
        }
      }
    };

  }


})();

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.content
 *
 * @description
 * Scrollable content
 */
mdContentDirective.$inject = ["$mdTheming"];
angular.module('material.components.content', [
  'material.core'
])
  .directive('mdContent', mdContentDirective);

/**
 * @ngdoc directive
 * @name mdContent
 * @module material.components.content
 *
 * @restrict E
 *
 * @description
 *
 * The `<md-content>` directive is a container element useful for scrollable content. It achieves
 * this by setting the CSS `overflow` property to `auto` so that content can properly scroll.
 *
 * In general, `<md-content>` components are not designed to be nested inside one another. If
 * possible, it is better to make them siblings. This often results in a better user experience as
 * having nested scrollbars may confuse the user.
 *
 * ## Troubleshooting
 *
 * In some cases, you may wish to apply the `md-no-momentum` class to ensure that Safari's
 * momentum scrolling is disabled. Momentum scrolling can cause flickering issues while scrolling
 * SVG icons and some other components.
 *
 * Additionally, we now also offer the `md-no-flicker` class which can be applied to any element
 * and uses a Webkit-specific filter of `blur(0px)` that forces GPU rendering of all elements
 * inside (which eliminates the flicker on iOS devices).
 *
 * _<b>Note:</b> Forcing an element to render on the GPU can have unintended side-effects, especially
 * related to the z-index of elements. Please use with caution and only on the elements needed._
 *
 * @usage
 *
 * Add the `[layout-padding]` attribute to make the content padded.
 *
 * <hljs lang="html">
 *  <md-content layout-padding>
 *      Lorem ipsum dolor sit amet, ne quod novum mei.
 *  </md-content>
 * </hljs>
 */

function mdContentDirective($mdTheming) {
  return {
    restrict: 'E',
    controller: ['$scope', '$element', ContentController],
    link: function(scope, element) {
      element.addClass('_md');     // private md component indicator for styling

      $mdTheming(element);
      scope.$broadcast('$mdContentLoaded', element);

      iosScrollFix(element[0]);
    }
  };

  function ContentController($scope, $element) {
    this.$scope = $scope;
    this.$element = $element;
  }
}

function iosScrollFix(node) {
  // IOS FIX:
  // If we scroll where there is no more room for the webview to scroll,
  // by default the webview itself will scroll up and down, this looks really
  // bad.  So if we are scrolling to the very top or bottom, add/subtract one
  angular.element(node).on('$md.pressdown', function(ev) {
    // Only touch events
    if (ev.pointer.type !== 't') return;
    // Don't let a child content's touchstart ruin it for us.
    if (ev.$materialScrollFixed) return;
    ev.$materialScrollFixed = true;

    if (node.scrollTop === 0) {
      node.scrollTop = 1;
    } else if (node.scrollHeight === node.scrollTop + node.offsetHeight) {
      node.scrollTop -= 1;
    }
  });
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.dialog
 */
MdDialogDirective.$inject = ["$$rAF", "$mdTheming", "$mdDialog"];
MdDialogProvider.$inject = ["$$interimElementProvider"];
angular
  .module('material.components.dialog', [
    'material.core',
    'material.components.backdrop'
  ])
  .directive('mdDialog', MdDialogDirective)
  .provider('$mdDialog', MdDialogProvider);

/**
 * @ngdoc directive
 * @name mdDialog
 * @module material.components.dialog
 *
 * @restrict E
 *
 * @description
 * `<md-dialog>` - The dialog's template must be inside this element.
 *
 * Inside, use an `<md-dialog-content>` element for the dialog's content, and use
 * an `<md-dialog-actions>` element for the dialog's actions.
 *
 * ## CSS
 * - `.md-dialog-content` - class that sets the padding on the content as the spec file
 *
 * ## Notes
 * - If you specify an `id` for the `<md-dialog>`, the `<md-dialog-content>` will have the same `id`
 * prefixed with `dialogContent_`.
 *
 * @usage
 * ### Dialog template
 * <hljs lang="html">
 * <md-dialog aria-label="List dialog">
 *   <md-dialog-content>
 *     <md-list>
 *       <md-list-item ng-repeat="item in items">
 *         <p>Number {{item}}</p>
 *       </md-list-item>
 *     </md-list>
 *   </md-dialog-content>
 *   <md-dialog-actions>
 *     <md-button ng-click="closeDialog()" class="md-primary">Close Dialog</md-button>
 *   </md-dialog-actions>
 * </md-dialog>
 * </hljs>
 */
function MdDialogDirective($$rAF, $mdTheming, $mdDialog) {
  return {
    restrict: 'E',
    link: function(scope, element) {
      element.addClass('_md');     // private md component indicator for styling

      $mdTheming(element);
      $$rAF(function() {
        var images;
        var content = element[0].querySelector('md-dialog-content');

        if (content) {
          images = content.getElementsByTagName('img');
          addOverflowClass();
          //-- delayed image loading may impact scroll height, check after images are loaded
          angular.element(images).on('load', addOverflowClass);
        }

        scope.$on('$destroy', function() {
          $mdDialog.destroy(element);
        });

        /**
         *
         */
        function addOverflowClass() {
          element.toggleClass('md-content-overflow', content.scrollHeight > content.clientHeight);
        }


      });
    }
  };
}

/**
 * @ngdoc service
 * @name $mdDialog
 * @module material.components.dialog
 *
 * @description
 * `$mdDialog` opens a dialog over the app to inform users about critical information or require
 *  them to make decisions. There are two approaches for setup: a simple promise API
 *  and regular object syntax.
 *
 * ## Restrictions
 *
 * - The dialog is always given an isolate scope.
 * - The dialog's template must have an outer `<md-dialog>` element.
 *   Inside, use an `<md-dialog-content>` element for the dialog's content, and use
 *   an `<md-dialog-actions>` element for the dialog's actions.
 * - Dialogs must cover the entire application to keep interactions inside of them.
 * Use the `parent` option to change where dialogs are appended.
 *
 * ## Sizing
 * - Complex dialogs can be sized with `flex="percentage"`, i.e. `flex="66"`.
 * - Default max-width is 80% of the `rootElement` or `parent`.
 *
 * ## CSS
 * - `.md-dialog-content` - class that sets the padding on the content as the spec file
 *
 * @usage
 * <hljs lang="html">
 * <div  ng-app="demoApp" ng-controller="EmployeeController">
 *   <div>
 *     <md-button ng-click="showAlert()" class="md-raised md-warn">
 *       Employee Alert!
 *       </md-button>
 *   </div>
 *   <div>
 *     <md-button ng-click="showDialog($event)" class="md-raised">
 *       Custom Dialog
 *       </md-button>
 *   </div>
 *   <div>
 *     <md-button ng-click="closeAlert()" ng-disabled="!hasAlert()" class="md-raised">
 *       Close Alert
 *     </md-button>
 *   </div>
 *   <div>
 *     <md-button ng-click="showGreeting($event)" class="md-raised md-primary" >
 *       Greet Employee
 *       </md-button>
 *   </div>
 * </div>
 * </hljs>
 *
 * ### JavaScript: object syntax
 * <hljs lang="js">
 * (function(angular, undefined){
 *   "use strict";
 *
 *   angular
 *    .module('demoApp', ['ngMaterial'])
 *    .controller('AppCtrl', AppController);
 *
 *   function AppController($scope, $mdDialog) {
 *     var alert;
 *     $scope.showAlert = showAlert;
 *     $scope.showDialog = showDialog;
 *     $scope.items = [1, 2, 3];
 *
 *     // Internal method
 *     function showAlert() {
 *       alert = $mdDialog.alert({
 *         title: 'Attention',
 *         textContent: 'This is an example of how easy dialogs can be!',
 *         ok: 'Close'
 *       });
 *
 *       $mdDialog
 *         .show( alert )
 *         .finally(function() {
 *           alert = undefined;
 *         });
 *     }
 *
 *     function showDialog($event) {
 *        var parentEl = angular.element(document.body);
 *        $mdDialog.show({
 *          parent: parentEl,
 *          targetEvent: $event,
 *          template:
 *            '<md-dialog aria-label="List dialog">' +
 *            '  <md-dialog-content>'+
 *            '    <md-list>'+
 *            '      <md-list-item ng-repeat="item in items">'+
 *            '       <p>Number {{item}}</p>' +
 *            '      </md-item>'+
 *            '    </md-list>'+
 *            '  </md-dialog-content>' +
 *            '  <md-dialog-actions>' +
 *            '    <md-button ng-click="closeDialog()" class="md-primary">' +
 *            '      Close Dialog' +
 *            '    </md-button>' +
 *            '  </md-dialog-actions>' +
 *            '</md-dialog>',
 *          locals: {
 *            items: $scope.items
 *          },
 *          controller: DialogController
 *       });
 *       function DialogController($scope, $mdDialog, items) {
 *         $scope.items = items;
 *         $scope.closeDialog = function() {
 *           $mdDialog.hide();
 *         }
 *       }
 *     }
 *   }
 * })(angular);
 * </hljs>
 *
 * ### Multiple Dialogs
 * Using the `multiple` option for the `$mdDialog` service allows developers to show multiple dialogs
 * at the same time.
 *
 * <hljs lang="js">
 *   // From plain options
 *   $mdDialog.show({
 *     multiple: true
 *   });
 *
 *   // From a dialog preset
 *   $mdDialog.show(
 *     $mdDialog
 *       .alert()
 *       .multiple(true)
 *   );
 *
 * </hljs>
 *
 * ### Pre-Rendered Dialogs
 * By using the `contentElement` option, it is possible to use an already existing element in the DOM.
 *
 * > Pre-rendered dialogs will be not linked to any scope and will not instantiate any new controller.<br/>
 * > You can manually link the elements to a scope or instantiate a controller from the template (`ng-controller`)
 *
 * <hljs lang="js">
 *   $scope.showPrerenderedDialog = function() {
 *     $mdDialog.show({
 *       contentElement: '#myStaticDialog',
 *       parent: angular.element(document.body)
 *     });
 *   };
 * </hljs>
 *
 * When using a string as value, `$mdDialog` will automatically query the DOM for the specified CSS selector.
 *
 * <hljs lang="html">
 *   <div style="visibility: hidden">
 *     <div class="md-dialog-container" id="myStaticDialog">
 *       <md-dialog>
 *         This is a pre-rendered dialog.
 *       </md-dialog>
 *     </div>
 *   </div>
 * </hljs>
 *
 * **Notice**: It is important, to use the `.md-dialog-container` as the content element, otherwise the dialog
 * will not show up.
 *
 * It also possible to use a DOM element for the `contentElement` option.
 * - `contentElement: document.querySelector('#myStaticDialog')`
 * - `contentElement: angular.element(TEMPLATE)`
 *
 * When using a `template` as content element, it will be not compiled upon open.
 * This allows you to compile the element yourself and use it each time the dialog opens.
 *
 * ### Custom Presets
 * Developers are also able to create their own preset, which can be easily used without repeating
 * their options each time.
 *
 * <hljs lang="js">
 *   $mdDialogProvider.addPreset('testPreset', {
 *     options: function() {
 *       return {
 *         template:
 *           '<md-dialog>' +
 *             'This is a custom preset' +
 *           '</md-dialog>',
 *         controllerAs: 'dialog',
 *         bindToController: true,
 *         clickOutsideToClose: true,
 *         escapeToClose: true
 *       };
 *     }
 *   });
 * </hljs>
 *
 * After you created your preset at config phase, you can easily access it.
 *
 * <hljs lang="js">
 *   $mdDialog.show(
 *     $mdDialog.testPreset()
 *   );
 * </hljs>
 *
 * ### JavaScript: promise API syntax, custom dialog template
 * <hljs lang="js">
 * (function(angular, undefined){
 *   "use strict";
 *
 *   angular
 *     .module('demoApp', ['ngMaterial'])
 *     .controller('EmployeeController', EmployeeEditor)
 *     .controller('GreetingController', GreetingController);
 *
 *   // Fictitious Employee Editor to show how to use simple and complex dialogs.
 *
 *   function EmployeeEditor($scope, $mdDialog) {
 *     var alert;
 *
 *     $scope.showAlert = showAlert;
 *     $scope.closeAlert = closeAlert;
 *     $scope.showGreeting = showCustomGreeting;
 *
 *     $scope.hasAlert = function() { return !!alert };
 *     $scope.userName = $scope.userName || 'Bobby';
 *
 *     // Dialog #1 - Show simple alert dialog and cache
 *     // reference to dialog instance
 *
 *     function showAlert() {
 *       alert = $mdDialog.alert()
 *         .title('Attention, ' + $scope.userName)
 *         .textContent('This is an example of how easy dialogs can be!')
 *         .ok('Close');
 *
 *       $mdDialog
 *           .show( alert )
 *           .finally(function() {
 *             alert = undefined;
 *           });
 *     }
 *
 *     // Close the specified dialog instance and resolve with 'finished' flag
 *     // Normally this is not needed, just use '$mdDialog.hide()' to close
 *     // the most recent dialog popup.
 *
 *     function closeAlert() {
 *       $mdDialog.hide( alert, "finished" );
 *       alert = undefined;
 *     }
 *
 *     // Dialog #2 - Demonstrate more complex dialogs construction and popup.
 *
 *     function showCustomGreeting($event) {
 *         $mdDialog.show({
 *           targetEvent: $event,
 *           template:
 *             '<md-dialog>' +
 *
 *             '  <md-dialog-content>Hello {{ employee }}!</md-dialog-content>' +
 *
 *             '  <md-dialog-actions>' +
 *             '    <md-button ng-click="closeDialog()" class="md-primary">' +
 *             '      Close Greeting' +
 *             '    </md-button>' +
 *             '  </md-dialog-actions>' +
 *             '</md-dialog>',
 *           controller: 'GreetingController',
 *           onComplete: afterShowAnimation,
 *           locals: { employee: $scope.userName }
 *         });
 *
 *         // When the 'enter' animation finishes...
 *
 *         function afterShowAnimation(scope, element, options) {
 *            // post-show code here: DOM element focus, etc.
 *         }
 *     }
 *
 *     // Dialog #3 - Demonstrate use of ControllerAs and passing $scope to dialog
 *     //             Here we used ng-controller="GreetingController as vm" and
 *     //             $scope.vm === <controller instance>
 *
 *     function showCustomGreeting() {
 *
 *        $mdDialog.show({
 *           clickOutsideToClose: true,
 *
 *           scope: $scope,        // use parent scope in template
 *           preserveScope: true,  // do not forget this if use parent scope

 *           // Since GreetingController is instantiated with ControllerAs syntax
 *           // AND we are passing the parent '$scope' to the dialog, we MUST
 *           // use 'vm.<xxx>' in the template markup
 *
 *           template: '<md-dialog>' +
 *                     '  <md-dialog-content>' +
 *                     '     Hi There {{vm.employee}}' +
 *                     '  </md-dialog-content>' +
 *                     '</md-dialog>',
 *
 *           controller: function DialogController($scope, $mdDialog) {
 *             $scope.closeDialog = function() {
 *               $mdDialog.hide();
 *             }
 *           }
 *        });
 *     }
 *
 *   }
 *
 *   // Greeting controller used with the more complex 'showCustomGreeting()' custom dialog
 *
 *   function GreetingController($scope, $mdDialog, employee) {
 *     // Assigned from construction <code>locals</code> options...
 *     $scope.employee = employee;
 *
 *     $scope.closeDialog = function() {
 *       // Easily hides most recent dialog shown...
 *       // no specific instance reference is needed.
 *       $mdDialog.hide();
 *     };
 *   }
 *
 * })(angular);
 * </hljs>
 */

/**
 * @ngdoc method
 * @name $mdDialog#alert
 *
 * @description
 * Builds a preconfigured dialog with the specified message.
 *
 * @returns {obj} an `$mdDialogPreset` with the chainable configuration methods:
 *
 * - $mdDialogPreset#title(string) - Sets the alert title.
 * - $mdDialogPreset#textContent(string) - Sets the alert message.
 * - $mdDialogPreset#htmlContent(string) - Sets the alert message as HTML. Requires ngSanitize
 *     module to be loaded. HTML is not run through Angular's compiler.
 * - $mdDialogPreset#ok(string) - Sets the alert "Okay" button text.
 * - $mdDialogPreset#theme(string) - Sets the theme of the alert dialog.
 * - $mdDialogPreset#targetEvent(DOMClickEvent=) - A click's event object. When passed in as an option,
 *     the location of the click will be used as the starting point for the opening animation
 *     of the the dialog.
 *
 */

/**
 * @ngdoc method
 * @name $mdDialog#confirm
 *
 * @description
 * Builds a preconfigured dialog with the specified message. You can call show and the promise returned
 * will be resolved only if the user clicks the confirm action on the dialog.
 *
 * @returns {obj} an `$mdDialogPreset` with the chainable configuration methods:
 *
 * Additionally, it supports the following methods:
 *
 * - $mdDialogPreset#title(string) - Sets the confirm title.
 * - $mdDialogPreset#textContent(string) - Sets the confirm message.
 * - $mdDialogPreset#htmlContent(string) - Sets the confirm message as HTML. Requires ngSanitize
 *     module to be loaded. HTML is not run through Angular's compiler.
 * - $mdDialogPreset#ok(string) - Sets the confirm "Okay" button text.
 * - $mdDialogPreset#cancel(string) - Sets the confirm "Cancel" button text.
 * - $mdDialogPreset#theme(string) - Sets the theme of the confirm dialog.
 * - $mdDialogPreset#targetEvent(DOMClickEvent=) - A click's event object. When passed in as an option,
 *     the location of the click will be used as the starting point for the opening animation
 *     of the the dialog.
 *
 */

/**
 * @ngdoc method
 * @name $mdDialog#prompt
 *
 * @description
 * Builds a preconfigured dialog with the specified message and input box. You can call show and the promise returned
 * will be resolved only if the user clicks the prompt action on the dialog, passing the input value as the first argument.
 *
 * @returns {obj} an `$mdDialogPreset` with the chainable configuration methods:
 *
 * Additionally, it supports the following methods:
 *
 * - $mdDialogPreset#title(string) - Sets the prompt title.
 * - $mdDialogPreset#textContent(string) - Sets the prompt message.
 * - $mdDialogPreset#htmlContent(string) - Sets the prompt message as HTML. Requires ngSanitize
 *     module to be loaded. HTML is not run through Angular's compiler.
 * - $mdDialogPreset#placeholder(string) - Sets the placeholder text for the input.
 * - $mdDialogPreset#required(boolean) - Sets the input required value.
 * - $mdDialogPreset#initialValue(string) - Sets the initial value for the prompt input.
 * - $mdDialogPreset#ok(string) - Sets the prompt "Okay" button text.
 * - $mdDialogPreset#cancel(string) - Sets the prompt "Cancel" button text.
 * - $mdDialogPreset#theme(string) - Sets the theme of the prompt dialog.
 * - $mdDialogPreset#targetEvent(DOMClickEvent=) - A click's event object. When passed in as an option,
 *     the location of the click will be used as the starting point for the opening animation
 *     of the the dialog.
 *
 */

/**
 * @ngdoc method
 * @name $mdDialog#show
 *
 * @description
 * Show a dialog with the specified options.
 *
 * @param {object} optionsOrPreset Either provide an `$mdDialogPreset` returned from `alert()`, and
 * `confirm()`, or an options object with the following properties:
 *   - `templateUrl` - `{string=}`: The url of a template that will be used as the content
 *   of the dialog.
 *   - `template` - `{string=}`: HTML template to show in the dialog. This **must** be trusted HTML
 *      with respect to Angular's [$sce service](https://docs.angularjs.org/api/ng/service/$sce).
 *      This template should **never** be constructed with any kind of user input or user data.
 *   - `contentElement` - `{string|Element}`: Instead of using a template, which will be compiled each time a
 *     dialog opens, you can also use a DOM element.<br/>
 *     * When specifying an element, which is present on the DOM, `$mdDialog` will temporary fetch the element into
 *       the dialog and restores it at the old DOM position upon close.
 *     * When specifying a string, the string be used as a CSS selector, to lookup for the element in the DOM.
 *   - `autoWrap` - `{boolean=}`: Whether or not to automatically wrap the template with a
 *     `<md-dialog>` tag if one is not provided. Defaults to true. Can be disabled if you provide a
 *     custom dialog directive.
 *   - `targetEvent` - `{DOMClickEvent=}`: A click's event object. When passed in as an option,
 *     the location of the click will be used as the starting point for the opening animation
 *     of the the dialog.
 *   - `openFrom` - `{string|Element|object}`: The query selector, DOM element or the Rect object
 *     that is used to determine the bounds (top, left, height, width) from which the Dialog will
 *     originate.
 *   - `closeTo` - `{string|Element|object}`: The query selector, DOM element or the Rect object
 *     that is used to determine the bounds (top, left, height, width) to which the Dialog will
 *     target.
 *   - `scope` - `{object=}`: the scope to link the template / controller to. If none is specified,
 *     it will create a new isolate scope.
 *     This scope will be destroyed when the dialog is removed unless `preserveScope` is set to true.
 *   - `preserveScope` - `{boolean=}`: whether to preserve the scope when the element is removed. Default is false
 *   - `disableParentScroll` - `{boolean=}`: Whether to disable scrolling while the dialog is open.
 *     Default true.
 *   - `hasBackdrop` - `{boolean=}`: Whether there should be an opaque backdrop behind the dialog.
 *     Default true.
 *   - `clickOutsideToClose` - `{boolean=}`: Whether the user can click outside the dialog to
 *     close it. Default false.
 *   - `escapeToClose` - `{boolean=}`: Whether the user can press escape to close the dialog.
 *     Default true.
 *   - `focusOnOpen` - `{boolean=}`: An option to override focus behavior on open. Only disable if
 *     focusing some other way, as focus management is required for dialogs to be accessible.
 *     Defaults to true.
 *   - `controller` - `{function|string=}`: The controller to associate with the dialog. The controller
 *     will be injected with the local `$mdDialog`, which passes along a scope for the dialog.
 *   - `locals` - `{object=}`: An object containing key/value pairs. The keys will be used as names
 *     of values to inject into the controller. For example, `locals: {three: 3}` would inject
 *     `three` into the controller, with the value 3. If `bindToController` is true, they will be
 *     copied to the controller instead.
 *   - `bindToController` - `bool`: bind the locals to the controller, instead of passing them in.
 *   - `resolve` - `{function=}`: Similar to locals, except it takes as values functions that return promises, and the
 *      dialog will not open until all of the promises resolve.
 *   - `controllerAs` - `{string=}`: An alias to assign the controller to on the scope.
 *   - `parent` - `{element=}`: The element to append the dialog to. Defaults to appending
 *     to the root element of the application.
 *   - `onShowing` - `function(scope, element)`: Callback function used to announce the show() action is
 *     starting.
 *   - `onComplete` - `function(scope, element)`: Callback function used to announce when the show() action is
 *     finished.
 *   - `onRemoving` - `function(element, removePromise)`: Callback function used to announce the
 *      close/hide() action is starting. This allows developers to run custom animations
 *      in parallel with the close animations.
 *   - `fullscreen` `{boolean=}`: An option to toggle whether the dialog should show in fullscreen
 *      or not. Defaults to `false`.
 *   - `multiple` `{boolean=}`: An option to allow this dialog to display over one that's currently open.
 * @returns {promise} A promise that can be resolved with `$mdDialog.hide()` or
 * rejected with `$mdDialog.cancel()`.
 */

/**
 * @ngdoc method
 * @name $mdDialog#hide
 *
 * @description
 * Hide an existing dialog and resolve the promise returned from `$mdDialog.show()`.
 *
 * @param {*=} response An argument for the resolved promise.
 *
 * @returns {promise} A promise that is resolved when the dialog has been closed.
 */

/**
 * @ngdoc method
 * @name $mdDialog#cancel
 *
 * @description
 * Hide an existing dialog and reject the promise returned from `$mdDialog.show()`.
 *
 * @param {*=} response An argument for the rejected promise.
 *
 * @returns {promise} A promise that is resolved when the dialog has been closed.
 */

function MdDialogProvider($$interimElementProvider) {
  // Elements to capture and redirect focus when the user presses tab at the dialog boundary.
  MdDialogController.$inject = ["$mdDialog", "$mdConstant"];
  dialogDefaultOptions.$inject = ["$mdDialog", "$mdAria", "$mdUtil", "$mdConstant", "$animate", "$document", "$window", "$rootElement", "$log", "$injector", "$mdTheming", "$interpolate", "$mdInteraction"];
  var topFocusTrap, bottomFocusTrap;

  return $$interimElementProvider('$mdDialog')
    .setDefaults({
      methods: ['disableParentScroll', 'hasBackdrop', 'clickOutsideToClose', 'escapeToClose',
          'targetEvent', 'closeTo', 'openFrom', 'parent', 'fullscreen', 'multiple'],
      options: dialogDefaultOptions
    })
    .addPreset('alert', {
      methods: ['title', 'htmlContent', 'textContent', 'content', 'ariaLabel', 'ok', 'theme',
          'css'],
      options: advancedDialogOptions
    })
    .addPreset('confirm', {
      methods: ['title', 'htmlContent', 'textContent', 'content', 'ariaLabel', 'ok', 'cancel',
          'theme', 'css'],
      options: advancedDialogOptions
    })
    .addPreset('prompt', {
      methods: ['title', 'htmlContent', 'textContent', 'initialValue', 'content', 'placeholder', 'ariaLabel',
          'ok', 'cancel', 'theme', 'css', 'required'],
      options: advancedDialogOptions
    });

  /* @ngInject */
  function advancedDialogOptions() {
    return {
      template: [
        '<md-dialog md-theme="{{ dialog.theme || dialog.defaultTheme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">',
        '  <md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">',
        '    <h2 class="md-title">{{ dialog.title }}</h2>',
        '    <div ng-if="::dialog.mdHtmlContent" class="md-dialog-content-body" ',
        '        ng-bind-html="::dialog.mdHtmlContent"></div>',
        '    <div ng-if="::!dialog.mdHtmlContent" class="md-dialog-content-body">',
        '      <p>{{::dialog.mdTextContent}}</p>',
        '    </div>',
        '    <md-input-container md-no-float ng-if="::dialog.$type == \'prompt\'" class="md-prompt-input-container">',
        '      <input ng-keypress="dialog.keypress($event)" md-autofocus ng-model="dialog.result" ' +
        '             placeholder="{{::dialog.placeholder}}" ng-required="dialog.required">',
        '    </md-input-container>',
        '  </md-dialog-content>',
        '  <md-dialog-actions>',
        '    <md-button ng-if="dialog.$type === \'confirm\' || dialog.$type === \'prompt\'"' +
        '               ng-click="dialog.abort()" class="md-primary md-cancel-button">',
        '      {{ dialog.cancel }}',
        '    </md-button>',
        '    <md-button ng-click="dialog.hide()" class="md-primary md-confirm-button" md-autofocus="dialog.$type===\'alert\'"' +
        '               ng-disabled="dialog.required && !dialog.result">',
        '      {{ dialog.ok }}',
        '    </md-button>',
        '  </md-dialog-actions>',
        '</md-dialog>'
      ].join('').replace(/\s\s+/g, ''),
      controller: MdDialogController,
      controllerAs: 'dialog',
      bindToController: true,
    };
  }

  /**
   * Controller for the md-dialog interim elements
   * @ngInject
   */
  function MdDialogController($mdDialog, $mdConstant) {
    // For compatibility with AngularJS 1.6+, we should always use the $onInit hook in
    // interimElements. The $mdCompiler simulates the $onInit hook for all versions.
    this.$onInit = function() {
      var isPrompt = this.$type == 'prompt';

      if (isPrompt && this.initialValue) {
        this.result = this.initialValue;
      }

      this.hide = function() {
        $mdDialog.hide(isPrompt ? this.result : true);
      };
      this.abort = function() {
        $mdDialog.cancel();
      };
      this.keypress = function($event) {
        var invalidPrompt = isPrompt && this.required && !angular.isDefined(this.result);

        if ($event.keyCode === $mdConstant.KEY_CODE.ENTER && !invalidPrompt) {
          $mdDialog.hide(this.result);
        }
      };
    };
  }

  /* @ngInject */
  function dialogDefaultOptions($mdDialog, $mdAria, $mdUtil, $mdConstant, $animate, $document, $window, $rootElement,
                                $log, $injector, $mdTheming, $interpolate, $mdInteraction) {

    var initialWidth = $($window).width(),
        initialHeight = $($window).height();

    $($window).on('orientationchange', function () {
        initialWidth = $($window).width();
        initialHeight = $($window).height();
    });

    $($window).on('resize', function () {
      var cw = $($window).width(), ch = $($window).height();
      initialWidth = cw > initialWidth ? cw : initialWidth;
      initialHeight = ch > initialHeight ? ch : initialHeight;
    });

    return {
      hasBackdrop: true,
      isolateScope: true,
      onCompiling: beforeCompile,
      onShow: onShow,
      onShowing: beforeShow,
      onRemove: onRemove,
      clickOutsideToClose: false,
      escapeToClose: true,
      targetEvent: null,
      closeTo: null,
      openFrom: null,
      focusOnOpen: true,
      disableParentScroll: true,
      autoWrap: true,
      fullscreen: false,
      transformTemplate: function(template, options) {
        // Make the dialog container focusable, because otherwise the focus will be always redirected to
        // an element outside of the container, and the focus trap won't work probably..
        // Also the tabindex is needed for the `escapeToClose` functionality, because
        // the keyDown event can't be triggered when the focus is outside of the container.
        var startSymbol = $interpolate.startSymbol();
        var endSymbol = $interpolate.endSymbol();
        var theme = startSymbol + (options.themeWatch ? '' : '::') + 'theme' + endSymbol;
        var themeAttr = (options.hasTheme) ? 'md-theme="'+theme+'"': '';
        return '<div class="md-dialog-container" tabindex="-1" ' + themeAttr + '>' + validatedTemplate(template) + '</div>';

        /**
         * The specified template should contain a <md-dialog> wrapper element....
         */
        function validatedTemplate(template) {
          if (options.autoWrap && !/<\/md-dialog>/g.test(template)) {
            return '<md-dialog>' + (template || '') + '</md-dialog>';
          } else {
            return template || '';
          }
        }
      }
    };

    function beforeCompile(options) {
      // Automatically apply the theme, if the user didn't specify a theme explicitly.
      // Those option changes need to be done, before the compilation has started, because otherwise
      // the option changes will be not available in the $mdCompilers locales.
      options.defaultTheme = $mdTheming.defaultTheme();

      detectTheming(options);
    }

    function beforeShow(scope, element, options, controller) {

      if (controller) {
        var mdHtmlContent = controller.htmlContent || options.htmlContent || '';
        var mdTextContent = controller.textContent || options.textContent ||
            controller.content || options.content || '';

        if (mdHtmlContent && !$injector.has('$sanitize')) {
          throw Error('The ngSanitize module must be loaded in order to use htmlContent.');
        }

        if (mdHtmlContent && mdTextContent) {
          throw Error('md-dialog cannot have both `htmlContent` and `textContent`');
        }

        // Only assign the content if nothing throws, otherwise it'll still be compiled.
        controller.mdHtmlContent = mdHtmlContent;
        controller.mdTextContent = mdTextContent;
      }
    }

    /** Show method for dialogs */
    function onShow(scope, element, options, controller) {
      angular.element($document[0].body).addClass('md-dialog-is-showing');

      var dialogElement = element.find('md-dialog');

      // Once a dialog has `ng-cloak` applied on his template the dialog animation will not work properly.
      // This is a very common problem, so we have to notify the developer about this.
      if (dialogElement.hasClass('ng-cloak')) {
        var message = '$mdDialog: using `<md-dialog ng-cloak>` will affect the dialog opening animations.';
        $log.warn( message, element[0] );
      }

      captureParentAndFromToElements(options);
      configureAria(dialogElement, options);
      showBackdrop(scope, element, options);
      activateListeners(element, options);

      return dialogPopIn(element, options)
        .then(function() {
          lockScreenReader(element, options);
          warnDeprecatedActions();
          focusOnOpen();
        });

      /**
       * Check to see if they used the deprecated .md-actions class and log a warning
       */
      function warnDeprecatedActions() {
        if (element[0].querySelector('.md-actions')) {
          $log.warn('Using a class of md-actions is deprecated, please use <md-dialog-actions>.');
        }
      }

      /**
       * For alerts, focus on content... otherwise focus on
       * the close button (or equivalent)
       */
      function focusOnOpen() {
        if (options.focusOnOpen) {
          var target = $mdUtil.findFocusTarget(element) || findCloseButton() || dialogElement;
          target.focus();
        }

        /**
         * If no element with class dialog-close, try to find the last
         * button child in md-actions and assume it is a close button.
         *
         * If we find no actions at all, log a warning to the console.
         */
        function findCloseButton() {
          return element[0].querySelector('.dialog-close, md-dialog-actions button:last-child');
        }
      }
    }

    /**
     * Remove function for all dialogs
     */
    function onRemove(scope, element, options) {
      if (options.deactivateListeners) {
          options.deactivateListeners();
      }
      if (options.unlockScreenReader) {
          options.unlockScreenReader();
      }
      if (options.hideBackdrop) {
        options.hideBackdrop(options.$destroy);
      }

      // Remove the focus traps that we added earlier for keeping focus within the dialog.
      if (topFocusTrap && topFocusTrap.parentNode) {
        topFocusTrap.parentNode.removeChild(topFocusTrap);
      }

      if (bottomFocusTrap && bottomFocusTrap.parentNode) {
        bottomFocusTrap.parentNode.removeChild(bottomFocusTrap);
      }

      // For navigation $destroy events, do a quick, non-animated removal,
      // but for normal closes (from clicks, etc) animate the removal
      return options.$destroy ? detachAndClean() : animateRemoval().then( detachAndClean );

      /**
       * For normal closes, animate the removal.
       * For forced closes (like $destroy events), skip the animations
       */
      function animateRemoval() {
        return dialogPopOut(element, options);
      }

      /**
       * Detach the element
       */
      function detachAndClean() {
        angular.element($document[0].body).removeClass('md-dialog-is-showing');

        // Reverse the container stretch if using a content element.
        if (options.contentElement) {
          options.reverseContainerStretch();
        }

        // Exposed cleanup function from the $mdCompiler.
        options.cleanupElement();

        // Restores the focus to the origin element if the last interaction upon opening was a keyboard.
        if (!options.$destroy && options.originInteraction === 'keyboard') {
          options.origin.focus();
        }
      }
    }

    function detectTheming(options) {
      // Once the user specifies a targetEvent, we will automatically try to find the correct
      // nested theme.
      var targetEl;
      if (options.targetEvent && options.targetEvent.target) {
        targetEl = angular.element(options.targetEvent.target);
      }

      var themeCtrl = targetEl && targetEl.controller('mdTheme');

      options.hasTheme = (!!themeCtrl);

      if (!options.hasTheme) {
        return;
      }

      options.themeWatch = themeCtrl.$shouldWatch;

      var theme = options.theme || themeCtrl.$mdTheme;

      if (theme) {
        options.scope.theme = theme;
      }

      var unwatch = themeCtrl.registerChanges(function (newTheme) {
        options.scope.theme = newTheme;

        if (!options.themeWatch) {
          unwatch();
        }
      });
    }

    /**
     * Capture originator/trigger/from/to element information (if available)
     * and the parent container for the dialog; defaults to the $rootElement
     * unless overridden in the options.parent
     */
    function captureParentAndFromToElements(options) {
          options.origin = angular.extend({
            element: null,
            bounds: null,
            focus: angular.noop
          }, options.origin || {});

          options.parent   = getDomElement(options.parent, $rootElement);
          options.closeTo  = getBoundingClientRect(getDomElement(options.closeTo));
          options.openFrom = getBoundingClientRect(getDomElement(options.openFrom));

          if ( options.targetEvent ) {
            options.origin = getBoundingClientRect(options.targetEvent.target, options.origin);
            options.originInteraction = $mdInteraction.getLastInteractionType();
          }


          /**
           * Identify the bounding RECT for the target element
           *
           */
          function getBoundingClientRect (element, orig) {
            var source = angular.element((element || {}));
            if (source && source.length) {
              // Compute and save the target element's bounding rect, so that if the
              // element is hidden when the dialog closes, we can shrink the dialog
              // back to the same position it expanded from.
              //
              // Checking if the source is a rect object or a DOM element
              var bounds = {top:0,left:0,height:0,width:0};
              var hasFn = angular.isFunction(source[0].getBoundingClientRect);

              return angular.extend(orig || {}, {
                  element : hasFn ? source : undefined,
                  bounds  : hasFn ? source[0].getBoundingClientRect() : angular.extend({}, bounds, source[0]),
                  focus   : angular.bind(source, source.focus),
              });
            }
          }

          /**
           * If the specifier is a simple string selector, then query for
           * the DOM element.
           */
          function getDomElement(element, defaultElement) {
            if (angular.isString(element)) {
              element = $document[0].querySelector(element);
            }

            // If we have a reference to a raw dom element, always wrap it in jqLite
            return angular.element(element || defaultElement);
          }

        }

    /**
     * Listen for escape keys and outside clicks to auto close
     */
    function activateListeners(element, options) {
      var window = angular.element($window);
      var onWindowResize = $mdUtil.debounce(function() {
        stretchDialogContainerToViewport(element, options);
      }, 60);

      var removeListeners = [];
      var smartClose = function() {
        // Only 'confirm' dialogs have a cancel button... escape/clickOutside will
        // cancel or fallback to hide.
        var closeFn = ( options.$type == 'alert' ) ? $mdDialog.hide : $mdDialog.cancel;
        $mdUtil.nextTick(closeFn, true);
      };

      if (options.escapeToClose) {
        var parentTarget = options.parent;
        var keyHandlerFn = function(ev) {
          if (ev.keyCode === $mdConstant.KEY_CODE.ESCAPE) {
            ev.stopPropagation();
            ev.preventDefault();

            smartClose();
          }
        };

        // Add keydown listeners
        element.on('keydown', keyHandlerFn);
        parentTarget.on('keydown', keyHandlerFn);

        // Queue remove listeners function
        removeListeners.push(function() {

          element.off('keydown', keyHandlerFn);
          parentTarget.off('keydown', keyHandlerFn);

        });
      }

      // Register listener to update dialog on window resize
      window.on('resize', onWindowResize);

      removeListeners.push(function() {
        window.off('resize', onWindowResize);
      });

      if (options.clickOutsideToClose) {
        var target = element;
        var sourceElem;

        // Keep track of the element on which the mouse originally went down
        // so that we can only close the backdrop when the 'click' started on it.
        // A simple 'click' handler does not work,
        // it sets the target object as the element the mouse went down on.
        var mousedownHandler = function(ev) {
          sourceElem = ev.target;
        };

        // We check if our original element and the target is the backdrop
        // because if the original was the backdrop and the target was inside the dialog
        // we don't want to dialog to close.
        var mouseupHandler = function(ev) {
          if (sourceElem === target[0] && ev.target === target[0]) {
            ev.stopPropagation();
            ev.preventDefault();

            smartClose();
          }
        };

        // Add listeners
        target.on('mousedown', mousedownHandler);
        target.on('mouseup', mouseupHandler);

        // Queue remove listeners function
        removeListeners.push(function() {
          target.off('mousedown', mousedownHandler);
          target.off('mouseup', mouseupHandler);
        });
      }

      // Attach specific `remove` listener handler
      options.deactivateListeners = function() {
        removeListeners.forEach(function(removeFn) {
          removeFn();
        });
        options.deactivateListeners = null;
      };
    }

    /**
     * Show modal backdrop element...
     */
    function showBackdrop(scope, element, options) {

      if (options.disableParentScroll) {
        // !! DO this before creating the backdrop; since disableScrollAround()
        //    configures the scroll offset; which is used by mdBackDrop postLink()
        options.restoreScroll = $mdUtil.disableScrollAround(element, options.parent);
      }

      if (options.hasBackdrop) {
        options.backdrop = $mdUtil.createBackdrop(scope, "md-dialog-backdrop md-opaque");
        $animate.enter(options.backdrop, options.parent);
      }

      /**
       * Hide modal backdrop element...
       */
      options.hideBackdrop = function hideBackdrop($destroy) {
        if (options.backdrop) {
          if ( $destroy ) options.backdrop.remove();
          else              $animate.leave(options.backdrop);
        }


        if (options.disableParentScroll) {
          options.restoreScroll && options.restoreScroll();
          delete options.restoreScroll;
        }

        options.hideBackdrop = null;
      };
    }

    /**
     * Inject ARIA-specific attributes appropriate for Dialogs
     */
    function configureAria(element, options) {

      var role = (options.$type === 'alert') ? 'alertdialog' : 'dialog';
      var dialogContent = element.find('md-dialog-content');
      var existingDialogId = element.attr('id');
      var dialogContentId = 'dialogContent_' + (existingDialogId || $mdUtil.nextUid());

      element.attr({
        'role': role,
        'tabIndex': '-1'
      });

      if (dialogContent.length === 0) {
        dialogContent = element;
        // If the dialog element already had an ID, don't clobber it.
        if (existingDialogId) {
          dialogContentId = existingDialogId;
        }
      }

      dialogContent.attr('id', dialogContentId);
      element.attr('aria-describedby', dialogContentId);

      if (options.ariaLabel) {
        $mdAria.expect(element, 'aria-label', options.ariaLabel);
      }
      else {
        $mdAria.expectAsync(element, 'aria-label', function() {
          // If dialog title is specified, set aria-label with it
          // See https://github.com/angular/material/issues/10582
          if (options.title) {
            return options.title;
          } else {
            var words = dialogContent.text().split(/\s+/);
            if (words.length > 3) words = words.slice(0, 3).concat('...');
            return words.join(' ');
          }
        });
      }

      // Set up elements before and after the dialog content to capture focus and
      // redirect back into the dialog.
      topFocusTrap = document.createElement('div');
      topFocusTrap.classList.add('md-dialog-focus-trap');
      topFocusTrap.tabIndex = 0;

      bottomFocusTrap = topFocusTrap.cloneNode(false);

      // When focus is about to move out of the dialog, we want to intercept it and redirect it
      // back to the dialog element.
      var focusHandler = function() {
        element.focus();
      };
      topFocusTrap.addEventListener('focus', focusHandler);
      bottomFocusTrap.addEventListener('focus', focusHandler);

      // The top focus trap inserted immeidately before the md-dialog element (as a sibling).
      // The bottom focus trap is inserted at the very end of the md-dialog element (as a child).
      element[0].parentNode.insertBefore(topFocusTrap, element[0]);
      element.after(bottomFocusTrap);
    }

    /**
     * Prevents screen reader interaction behind modal window
     * on swipe interfaces
     */
    function lockScreenReader(element, options) {
      var isHidden = true;

      // get raw DOM node
      walkDOM(element[0]);

      options.unlockScreenReader = function () {
        isHidden = false;
        walkDOM(element[0]);

        options.unlockScreenReader = null;
      };

      /**
       * Get all of an element's parent elements up the DOM tree
       * @return {Array} The parent elements
       */
      function getParents(element) {
        var parents = [];
        while (element.parentNode) {
          if (element === document.body) {
            return parents;
          }
          var children = element.parentNode.children;
          for (var i = 0; i < children.length; i++) {
            // skip over child if it is an ascendant of the dialog
            // a script or style tag, or a live region.
            if (element !== children[i] &&
                !isNodeOneOf(children[i], ['SCRIPT', 'STYLE']) &&
                !children[i].hasAttribute('aria-live')) {
              parents.push(children[i]);
            }
          }
          element = element.parentNode;
        }
        return parents;
      }

      /**
       * Walk DOM to apply or remove aria-hidden on sibling nodes
       * and parent sibling nodes
       */
      function walkDOM(element) {
        var elements = getParents(element);
        for (var i = 0; i < elements.length; i++) {
          elements[i].setAttribute('aria-hidden', isHidden);
        }
      }
    }

    function scrollToElement(container) {
        var $scrollingContainer = container.find('md-dialog-content');
        if ($scrollingContainer.length) {
            var input = $(document.activeElement);
            var objectheight;
            var mdContainer = input.parents('md-input-container:first');
            if (mdContainer.length) {
                input = mdContainer;
                var chips = input.parents('md-chips-wrap:first');
                if (chips.length) {
                    input = chips;
                    var marginized = chips.parents('.md-input-container-margin:first');
                    if (marginized.length) {
                        input = marginized;
                    }
                }
            }
            objectheight = input.outerHeight(true);
            var toolbar = $scrollingContainer.parents('md-toolbar:first');
            var theight = 0;
            if (toolbar.length) {
                theight = toolbar.height();
            }

            var scrollto = ($scrollingContainer.scrollTop() + input.offset().top) - (theight + objectheight + 20);
            $scrollingContainer.scrollTop(scrollto);
        }
    }

    /**
     * Ensure the dialog container fill-stretches to the viewport
     */
    function stretchDialogContainerToViewport(container, options) {
      var isFixed = $window.getComputedStyle($document[0].body).position == 'fixed';
      var backdrop = options.backdrop ? $window.getComputedStyle(options.backdrop[0]) : null;
      var height = backdrop ? Math.min($document[0].body.clientHeight, Math.ceil(Math.abs(parseInt(backdrop.height, 10)))) : 0;
      // window.bowser && bowser.android && !window.cordova
      if (false) {
          var padding = container.find('.fix-keyboard-over-padding');
          height = initialHeight;
          if (padding.length) {
              padding.css('padding-bottom', initialHeight - $(window).height());
              if (document.activeElement && container.find(document.activeElement)) {
                  scrollToElement(container);
              }
          }
      }

      var previousStyles = {
        top: container.css('top'),
        height: container.css('height')
      };

      // If the body is fixed, determine the distance to the viewport in relative from the parent.
      var parentTop = Math.abs(options.parent[0].getBoundingClientRect().top);

      if (!options.noAutoHeight) {
        container.css({
          top: (isFixed ? parentTop : 0) + 'px',
          height: height ? height + 'px' : '100%'
        });
      } else {
        previousStyles = {};
      }

      return function() {
        // Reverts the modified styles back to the previous values.
        // This is needed for contentElements, which should have the same styles after close
        // as before.
        container.css(previousStyles);
      };
    }

    /**
     *  Dialog open and pop-in animation
     */
    function dialogPopIn(container, options) {
      // Add the `md-dialog-container` to the DOM
      options.parent.append(container);
      options.reverseContainerStretch = stretchDialogContainerToViewport(container, options);

      var dialogEl = container.find('md-dialog');
      var animator = $mdUtil.dom.animator;
      var buildTranslateToOrigin = animator.calculateZoomToOrigin;
      var translateOptions = {transitionInClass: 'md-transition-in', transitionOutClass: 'md-transition-out'};
      var from = animator.toTransformCss(buildTranslateToOrigin(dialogEl, options.openFrom || options.origin));
      var to = animator.toTransformCss("");  // defaults to center display (or parent or $rootElement)

      dialogEl.toggleClass('md-dialog-fullscreen', !!options.fullscreen);

      return animator
        .translate3d(dialogEl, from, to, translateOptions)
        .then(function(animateReversal) {

          // Build a reversal translate function synced to this translation...
          options.reverseAnimate = function() {
            delete options.reverseAnimate;

            if (options.closeTo) {
              // Using the opposite classes to create a close animation to the closeTo element
              translateOptions = {transitionInClass: 'md-transition-out', transitionOutClass: 'md-transition-in'};
              from = to;
              to = animator.toTransformCss(buildTranslateToOrigin(dialogEl, options.closeTo));

              return animator
                .translate3d(dialogEl, from, to,translateOptions);
            }

            if (options.defaultAnimation !== true) {
              return animateReversal({
                opacity: 0
              });
            }

            return animateReversal(
              to = animator.toTransformCss(
                // in case the origin element has moved or is hidden,
                // let's recalculate the translateCSS
                buildTranslateToOrigin(dialogEl, options.origin)
              )
            );

          };

          // Function to revert the generated animation styles on the dialog element.
          // Useful when using a contentElement instead of a template.
          options.clearAnimate = function() {
            delete options.clearAnimate;

            // Remove the transition classes, added from $animateCSS, since those can't be removed
            // by reversely running the animator.
            dialogEl.removeClass([
              translateOptions.transitionOutClass,
              translateOptions.transitionInClass
            ].join(' '));

            // Run the animation reversely to remove the previous added animation styles.
            return animator.translate3d(dialogEl, to, animator.toTransformCss(''), {});
          };

          return true;
        });
    }

    /**
     * Dialog close and pop-out animation
     */
    function dialogPopOut(container, options) {
      return options.reverseAnimate().then(function() {
        if (options.contentElement) {
          // When we use a contentElement, we want the element to be the same as before.
          // That means, that we have to clear all the animation properties, like transform.
          options.clearAnimate();
        }
      });
    }

    /**
     * Utility function to filter out raw DOM nodes
     */
    function isNodeOneOf(elem, nodeTypeArray) {
      if (nodeTypeArray.indexOf(elem.nodeName) !== -1) {
        return true;
      }
    }

  }
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.divider
 * @description Divider module!
 */
MdDividerDirective.$inject = ["$mdTheming"];
angular.module('material.components.divider', [
  'material.core'
])
  .directive('mdDivider', MdDividerDirective);

/**
 * @ngdoc directive
 * @name mdDivider
 * @module material.components.divider
 * @restrict E
 *
 * @description
 * Dividers group and separate content within lists and page layouts using strong visual and spatial distinctions. This divider is a thin rule, lightweight enough to not distract the user from content.
 *
 * @param {boolean=} md-inset Add this attribute to activate the inset divider style.
 * @usage
 * <hljs lang="html">
 * <md-divider></md-divider>
 *
 * <md-divider md-inset></md-divider>
 * </hljs>
 *
 */
function MdDividerDirective($mdTheming) {
  return {
    restrict: 'E',
    link: $mdTheming
  };
}

})();
(function(){
"use strict";

(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name material.components.fabActions
   */
  MdFabActionsDirective.$inject = ["$mdUtil"];
  angular
    .module('material.components.fabActions', ['material.core'])
    .directive('mdFabActions', MdFabActionsDirective);

  /**
   * @ngdoc directive
   * @name mdFabActions
   * @module material.components.fabActions
   *
   * @restrict E
   *
   * @description
   * The `<md-fab-actions>` directive is used inside of a `<md-fab-speed-dial>` or
   * `<md-fab-toolbar>` directive to mark an element (or elements) as the actions and setup the
   * proper event listeners.
   *
   * @usage
   * See the `<md-fab-speed-dial>` or `<md-fab-toolbar>` directives for example usage.
   */
  function MdFabActionsDirective($mdUtil) {
    return {
      restrict: 'E',

      require: ['^?mdFabSpeedDial', '^?mdFabToolbar'],

      compile: function(element, attributes) {
        var children = element.children();

        var hasNgRepeat = $mdUtil.prefixer().hasAttribute(children, 'ng-repeat');

        // Support both ng-repeat and static content
        if (hasNgRepeat) {
          children.addClass('md-fab-action-item');
        } else {
          // Wrap every child in a new div and add a class that we can scale/fling independently
          children.wrap('<div class="md-fab-action-item">');
        }
      }
    };
  }

})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  MdFabController.$inject = ["$scope", "$element", "$animate", "$mdUtil", "$mdConstant", "$timeout"];
  angular.module('material.components.fabShared', ['material.core'])
    .controller('MdFabController', MdFabController);

  function MdFabController($scope, $element, $animate, $mdUtil, $mdConstant, $timeout) {
    var vm = this;
    var initialAnimationAttempts = 0;

    // NOTE: We use async eval(s) below to avoid conflicts with any existing digest loops

    vm.open = function() {
      $scope.$evalAsync("vm.isOpen = true");
    };

    vm.close = function() {
      // Async eval to avoid conflicts with existing digest loops
      $scope.$evalAsync("vm.isOpen = false");

      // Focus the trigger when the element closes so users can still tab to the next item
      $element.find('md-fab-trigger')[0].focus();
    };

    // Toggle the open/close state when the trigger is clicked
    vm.toggle = function() {
      $scope.$evalAsync("vm.isOpen = !vm.isOpen");
    };

    /*
     * AngularJS Lifecycle hook for newer AngularJS versions.
     * Bindings are not guaranteed to have been assigned in the controller, but they are in the $onInit hook.
     */
    vm.$onInit = function() {
      setupDefaults();
      setupListeners();
      setupWatchers();

      fireInitialAnimations();
    };

    // For AngularJS 1.4 and older, where there are no lifecycle hooks but bindings are pre-assigned,
    // manually call the $onInit hook.
    if (angular.version.major === 1 && angular.version.minor <= 4) {
      this.$onInit();
    }

    function setupDefaults() {
      // Set the default direction to 'down' if none is specified
      vm.direction = vm.direction || 'down';

      // Set the default to be closed
      vm.isOpen = vm.isOpen || false;

      // Start the keyboard interaction at the first action
      resetActionIndex();

      // Add an animations waiting class so we know not to run
      $element.addClass('md-animations-waiting');
    }

    function setupListeners() {
      var eventTypes = [
        'click', 'focusin', 'focusout'
      ];

      // Add our listeners
      angular.forEach(eventTypes, function(eventType) {
        $element.on(eventType, parseEvents);
      });

      // Remove our listeners when destroyed
      $scope.$on('$destroy', function() {
        angular.forEach(eventTypes, function(eventType) {
          $element.off(eventType, parseEvents);
        });

        // remove any attached keyboard handlers in case element is removed while
        // speed dial is open
        disableKeyboard();
      });
    }

    var closeTimeout;
    function parseEvents(event) {
      // If the event is a click, just handle it
      if (event.type == 'click') {
        handleItemClick(event);
      }

      // If we focusout, set a timeout to close the element
      if (event.type == 'focusout' && !closeTimeout) {
        closeTimeout = $timeout(function() {
          vm.close();
        }, 100, false);
      }

      // If we see a focusin and there is a timeout about to run, cancel it so we stay open
      if (event.type == 'focusin' && closeTimeout) {
        $timeout.cancel(closeTimeout);
        closeTimeout = null;
      }
    }

    function resetActionIndex() {
      vm.currentActionIndex = -1;
    }

    function setupWatchers() {
      // Watch for changes to the direction and update classes/attributes
      $scope.$watch('vm.direction', function(newDir, oldDir) {
        // Add the appropriate classes so we can target the direction in the CSS
        $animate.removeClass($element, 'md-' + oldDir);
        $animate.addClass($element, 'md-' + newDir);

        // Reset the action index since it may have changed
        resetActionIndex();
      });

      var trigger, actions;

      // Watch for changes to md-open
      $scope.$watch('vm.isOpen', function(isOpen) {
        // Reset the action index since it may have changed
        resetActionIndex();

        // We can't get the trigger/actions outside of the watch because the component hasn't been
        // linked yet, so we wait until the first watch fires to cache them.
        if (!trigger || !actions) {
          trigger = getTriggerElement();
          actions = getActionsElement();
        }

        if (isOpen) {
          enableKeyboard();
        } else {
          disableKeyboard();
        }

        var toAdd = isOpen ? 'md-is-open' : '';
        var toRemove = isOpen ? '' : 'md-is-open';

        // Set the proper ARIA attributes
        trigger.attr('aria-haspopup', true);
        trigger.attr('aria-expanded', isOpen);
        actions.attr('aria-hidden', !isOpen);

        // Animate the CSS classes
        $animate.setClass($element, toAdd, toRemove);
      });
    }

    function fireInitialAnimations() {
      // If the element is actually visible on the screen
      if ($element[0].scrollHeight > 0) {
        // Fire our animation
        $animate.addClass($element, '_md-animations-ready').then(function() {
          // Remove the waiting class
          $element.removeClass('md-animations-waiting');
        });
      }

      // Otherwise, try for up to 1 second before giving up
      else if (initialAnimationAttempts < 10) {
        $timeout(fireInitialAnimations, 100);

        // Increment our counter
        initialAnimationAttempts = initialAnimationAttempts + 1;
      }
    }

    function enableKeyboard() {
      $element.on('keydown', keyPressed);

      // On the next tick, setup a check for outside clicks; we do this on the next tick to avoid
      // clicks/touches that result in the isOpen attribute changing (e.g. a bound radio button)
      $mdUtil.nextTick(function() {
        angular.element(document).on('click touchend', checkForOutsideClick);
      });

      // TODO: On desktop, we should be able to reset the indexes so you cannot tab through, but
      // this breaks accessibility, especially on mobile, since you have no arrow keys to press
      //resetActionTabIndexes();
    }

    function disableKeyboard() {
      $element.off('keydown', keyPressed);
      angular.element(document).off('click touchend', checkForOutsideClick);
    }

    function checkForOutsideClick(event) {
      if (event.target) {
        var closestTrigger = $mdUtil.getClosest(event.target, 'md-fab-trigger');
        var closestActions = $mdUtil.getClosest(event.target, 'md-fab-actions');

        if (!closestTrigger && !closestActions) {
          vm.close();
        }
      }
    }

    function keyPressed(event) {
      switch (event.which) {
        case $mdConstant.KEY_CODE.ESCAPE: vm.close(); event.preventDefault(); return false;
        case $mdConstant.KEY_CODE.LEFT_ARROW: doKeyLeft(event); return false;
        case $mdConstant.KEY_CODE.UP_ARROW: doKeyUp(event); return false;
        case $mdConstant.KEY_CODE.RIGHT_ARROW: doKeyRight(event); return false;
        case $mdConstant.KEY_CODE.DOWN_ARROW: doKeyDown(event); return false;
      }
    }

    function doActionPrev(event) {
      focusAction(event, -1);
    }

    function doActionNext(event) {
      focusAction(event, 1);
    }

    function focusAction(event, direction) {
      var actions = resetActionTabIndexes();

      // Increment/decrement the counter with restrictions
      vm.currentActionIndex = vm.currentActionIndex + direction;
      vm.currentActionIndex = Math.min(actions.length - 1, vm.currentActionIndex);
      vm.currentActionIndex = Math.max(0, vm.currentActionIndex);

      // Focus the element
      var focusElement =  angular.element(actions[vm.currentActionIndex]).children()[0];
      angular.element(focusElement).attr('tabindex', 0);
      focusElement.focus();

      // Make sure the event doesn't bubble and cause something else
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    function resetActionTabIndexes() {
      // Grab all of the actions
      var actions = getActionsElement()[0].querySelectorAll('.md-fab-action-item');

      // Disable all other actions for tabbing
      angular.forEach(actions, function(action) {
        angular.element(angular.element(action).children()[0]).attr('tabindex', -1);
      });

      return actions;
    }

    function doKeyLeft(event) {
      if (vm.direction === 'left') {
        doActionNext(event);
      } else {
        doActionPrev(event);
      }
    }

    function doKeyUp(event) {
      if (vm.direction === 'down') {
        doActionPrev(event);
      } else {
        doActionNext(event);
      }
    }

    function doKeyRight(event) {
      if (vm.direction === 'left') {
        doActionPrev(event);
      } else {
        doActionNext(event);
      }
    }

    function doKeyDown(event) {
      if (vm.direction === 'up') {
        doActionPrev(event);
      } else {
        doActionNext(event);
      }
    }

    function isTrigger(element) {
      return $mdUtil.getClosest(element, 'md-fab-trigger');
    }

    function isAction(element) {
      return $mdUtil.getClosest(element, 'md-fab-actions');
    }

    function handleItemClick(event) {
      if (isTrigger(event.target)) {
        vm.toggle();
      }

      if (isAction(event.target)) {
        vm.close();
      }
    }

    function getTriggerElement() {
      return $element.find('md-fab-trigger');
    }

    function getActionsElement() {
      return $element.find('md-fab-actions');
    }
  }
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  /**
   * The duration of the CSS animation in milliseconds.
   *
   * @type {number}
   */
  MdFabSpeedDialFlingAnimation.$inject = ["$timeout"];
  MdFabSpeedDialScaleAnimation.$inject = ["$timeout"];
  var cssAnimationDuration = 100;

  /**
   * @ngdoc module
   * @name material.components.fabSpeedDial
   */
  angular
    // Declare our module
    .module('material.components.fabSpeedDial', [
      'material.core',
      'material.components.fabShared',
      'material.components.fabActions'
    ])

    // Register our directive
    .directive('mdFabSpeedDial', MdFabSpeedDialDirective)

    // Register our custom animations
    .animation('.md-fling', MdFabSpeedDialFlingAnimation)
    .animation('.md-scale', MdFabSpeedDialScaleAnimation)

    // Register a service for each animation so that we can easily inject them into unit tests
    .service('mdFabSpeedDialFlingAnimation', MdFabSpeedDialFlingAnimation)
    .service('mdFabSpeedDialScaleAnimation', MdFabSpeedDialScaleAnimation);

  /**
   * @ngdoc directive
   * @name mdFabSpeedDial
   * @module material.components.fabSpeedDial
   *
   * @restrict E
   *
   * @description
   * The `<md-fab-speed-dial>` directive is used to present a series of popup elements (usually
   * `<md-button>`s) for quick access to common actions.
   *
   * There are currently two animations available by applying one of the following classes to
   * the component:
   *
   *  - `md-fling` - The speed dial items appear from underneath the trigger and move into their
   *    appropriate positions.
   *  - `md-scale` - The speed dial items appear in their proper places by scaling from 0% to 100%.
   *
   * You may also easily position the trigger by applying one one of the following classes to the
   * `<md-fab-speed-dial>` element:
   *  - `md-fab-top-left`
   *  - `md-fab-top-right`
   *  - `md-fab-bottom-left`
   *  - `md-fab-bottom-right`
   *
   * These CSS classes use `position: absolute`, so you need to ensure that the container element
   * also uses `position: absolute` or `position: relative` in order for them to work.
   *
   * Additionally, you may use the standard `ng-mouseenter` and `ng-mouseleave` directives to
   * open or close the speed dial. However, if you wish to allow users to hover over the empty
   * space where the actions will appear, you must also add the `md-hover-full` class to the speed
   * dial element. Without this, the hover effect will only occur on top of the trigger.
   *
   * See the demos for more information.
   *
   * ## Troubleshooting
   *
   * If your speed dial shows the closing animation upon launch, you may need to use `ng-cloak` on
   * the parent container to ensure that it is only visible once ready. We have plans to remove this
   * necessity in the future.
   *
   * @usage
   * <hljs lang="html">
   * <md-fab-speed-dial md-direction="up" class="md-fling">
   *   <md-fab-trigger>
   *     <md-button aria-label="Add..."><md-icon md-svg-src="/img/icons/plus.svg"></md-icon></md-button>
   *   </md-fab-trigger>
   *
   *   <md-fab-actions>
   *     <md-button aria-label="Add User">
   *       <md-icon md-svg-src="/img/icons/user.svg"></md-icon>
   *     </md-button>
   *
   *     <md-button aria-label="Add Group">
   *       <md-icon md-svg-src="/img/icons/group.svg"></md-icon>
   *     </md-button>
   *   </md-fab-actions>
   * </md-fab-speed-dial>
   * </hljs>
   *
   * @param {string} md-direction From which direction you would like the speed dial to appear
   * relative to the trigger element.
   * @param {expression=} md-open Programmatically control whether or not the speed-dial is visible.
   */
  function MdFabSpeedDialDirective() {
    return {
      restrict: 'E',

      scope: {
        direction: '@?mdDirection',
        isOpen: '=?mdOpen'
      },

      bindToController: true,
      controller: 'MdFabController',
      controllerAs: 'vm',

      link: FabSpeedDialLink
    };

    function FabSpeedDialLink(scope, element) {
      // Prepend an element to hold our CSS variables so we can use them in the animations below
      element.prepend('<div class="_md-css-variables"></div>');
    }
  }

  function MdFabSpeedDialFlingAnimation($timeout) {
    function delayDone(done) { $timeout(done, cssAnimationDuration, false); }

    function runAnimation(element) {
      // Don't run if we are still waiting and we are not ready
      if (element.hasClass('md-animations-waiting') && !element.hasClass('_md-animations-ready')) {
        return;
      }

      var el = element[0];
      var ctrl = element.controller('mdFabSpeedDial');
      var items = el.querySelectorAll('.md-fab-action-item');

      // Grab our trigger element
      var triggerElement = el.querySelector('md-fab-trigger');

      // Grab our element which stores CSS variables
      var variablesElement = el.querySelector('._md-css-variables');

      // Setup JS variables based on our CSS variables
      var startZIndex = parseInt(window.getComputedStyle(variablesElement).zIndex);

      // Always reset the items to their natural position/state
      angular.forEach(items, function(item, index) {
        var styles = item.style;

        styles.transform = styles.webkitTransform = '';
        styles.transitionDelay = '';
        styles.opacity = 1;

        // Make the items closest to the trigger have the highest z-index
        styles.zIndex = (items.length - index) + startZIndex;
      });

      // Set the trigger to be above all of the actions so they disappear behind it.
      triggerElement.style.zIndex = startZIndex + items.length + 1;

      // If the control is closed, hide the items behind the trigger
      if (!ctrl.isOpen) {
        angular.forEach(items, function(item, index) {
          var newPosition, axis;
          var styles = item.style;

          // Make sure to account for differences in the dimensions of the trigger verses the items
          // so that we can properly center everything; this helps hide the item's shadows behind
          // the trigger.
          var triggerItemHeightOffset = (triggerElement.clientHeight - item.clientHeight) / 2;
          var triggerItemWidthOffset = (triggerElement.clientWidth - item.clientWidth) / 2;

          switch (ctrl.direction) {
            case 'up':
              newPosition = (item.scrollHeight * (index + 1) + triggerItemHeightOffset);
              axis = 'Y';
              break;
            case 'down':
              newPosition = -(item.scrollHeight * (index + 1) + triggerItemHeightOffset);
              axis = 'Y';
              break;
            case 'left':
              newPosition = (item.scrollWidth * (index + 1) + triggerItemWidthOffset);
              axis = 'X';
              break;
            case 'right':
              newPosition = -(item.scrollWidth * (index + 1) + triggerItemWidthOffset);
              axis = 'X';
              break;
          }

          var newTranslate = 'translate' + axis + '(' + newPosition + 'px)';

          styles.transform = styles.webkitTransform = newTranslate;
        });
      }
    }

    return {
      addClass: function(element, className, done) {
        if (element.hasClass('md-fling')) {
          runAnimation(element);
          delayDone(done);
        } else {
          done();
        }
      },
      removeClass: function(element, className, done) {
        runAnimation(element);
        delayDone(done);
      }
    };
  }

  function MdFabSpeedDialScaleAnimation($timeout) {
    function delayDone(done) { $timeout(done, cssAnimationDuration, false); }

    var delay = 30;

    function runAnimation(element) {
      var el = element[0];
      var ctrl = element.controller('mdFabSpeedDial');
      var items = el.querySelectorAll('.md-fab-action-item');

      // Grab our element which stores CSS variables
      var variablesElement = el.querySelector('._md-css-variables');

      // Setup JS variables based on our CSS variables
      var startZIndex = parseInt(window.getComputedStyle(variablesElement).zIndex);

      // Always reset the items to their natural position/state
      var maxDelay = items.length * delay;
      angular.forEach(items, function(item, index) {
        var styles = item.style,
          offsetDelay = index * delay;

        styles.opacity = ctrl.isOpen ? 1 : 0;
        styles.transform = styles.webkitTransform = ctrl.isOpen ? 'scale(1)' : 'scale(0)';
        styles.transitionDelay = (ctrl.isOpen ? offsetDelay : (maxDelay - offsetDelay)) + 'ms';

        // Make the items closest to the trigger have the highest z-index
        styles.zIndex = (items.length - index) + startZIndex;
      });
    }

    return {
      addClass: function(element, className, done) {
        runAnimation(element);
        delayDone(done);
      },

      removeClass: function(element, className, done) {
        runAnimation(element);
        delayDone(done);
      }
    };
  }
})();

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.gridList
 */
GridListController.$inject = ["$mdUtil"];
GridLayoutFactory.$inject = ["$mdUtil"];
GridListDirective.$inject = ["$interpolate", "$mdConstant", "$mdGridLayout", "$mdMedia"];
GridTileDirective.$inject = ["$mdMedia"];
angular.module('material.components.gridList', ['material.core'])
       .directive('mdGridList', GridListDirective)
       .directive('mdGridTile', GridTileDirective)
       .directive('mdGridTileFooter', GridTileCaptionDirective)
       .directive('mdGridTileHeader', GridTileCaptionDirective)
       .factory('$mdGridLayout', GridLayoutFactory);

/**
 * @ngdoc directive
 * @name mdGridList
 * @module material.components.gridList
 * @restrict E
 * @description
 * Grid lists are an alternative to standard list views. Grid lists are distinct
 * from grids used for layouts and other visual presentations.
 *
 * A grid list is best suited to presenting a homogenous data type, typically
 * images, and is optimized for visual comprehension and differentiating between
 * like data types.
 *
 * A grid list is a continuous element consisting of tessellated, regular
 * subdivisions called cells that contain tiles (`md-grid-tile`).
 *
 * <img src="//material-design.storage.googleapis.com/publish/v_2/material_ext_publish/0Bx4BSt6jniD7OVlEaXZ5YmU1Xzg/components_grids_usage2.png"
 *    style="width: 300px; height: auto; margin-right: 16px;" alt="Concept of grid explained visually">
 * <img src="//material-design.storage.googleapis.com/publish/v_2/material_ext_publish/0Bx4BSt6jniD7VGhsOE5idWlJWXM/components_grids_usage3.png"
 *    style="width: 300px; height: auto;" alt="Grid concepts legend">
 *
 * Cells are arrayed vertically and horizontally within the grid.
 *
 * Tiles hold content and can span one or more cells vertically or horizontally.
 *
 * ### Responsive Attributes
 *
 * The `md-grid-list` directive supports "responsive" attributes, which allow
 * different `md-cols`, `md-gutter` and `md-row-height` values depending on the
 * currently matching media query.
 *
 * In order to set a responsive attribute, first define the fallback value with
 * the standard attribute name, then add additional attributes with the
 * following convention: `{base-attribute-name}-{media-query-name}="{value}"`
 * (ie. `md-cols-lg="8"`)
 *
 * @param {number} md-cols Number of columns in the grid.
 * @param {string} md-row-height One of
 * <ul>
 *   <li>CSS length - Fixed height rows (eg. `8px` or `1rem`)</li>
 *   <li>`{width}:{height}` - Ratio of width to height (eg.
 *   `md-row-height="16:9"`)</li>
 *   <li>`"fit"` - Height will be determined by subdividing the available
 *   height by the number of rows</li>
 * </ul>
 * @param {string=} md-gutter The amount of space between tiles in CSS units
 *     (default 1px)
 * @param {expression=} md-on-layout Expression to evaluate after layout. Event
 *     object is available as `$event`, and contains performance information.
 *
 * @usage
 * Basic:
 * <hljs lang="html">
 * <md-grid-list md-cols="5" md-gutter="1em" md-row-height="4:3">
 *   <md-grid-tile></md-grid-tile>
 * </md-grid-list>
 * </hljs>
 *
 * Fixed-height rows:
 * <hljs lang="html">
 * <md-grid-list md-cols="4" md-row-height="200px" ...>
 *   <md-grid-tile></md-grid-tile>
 * </md-grid-list>
 * </hljs>
 *
 * Fit rows:
 * <hljs lang="html">
 * <md-grid-list md-cols="4" md-row-height="fit" style="height: 400px;" ...>
 *   <md-grid-tile></md-grid-tile>
 * </md-grid-list>
 * </hljs>
 *
 * Using responsive attributes:
 * <hljs lang="html">
 * <md-grid-list
 *     md-cols-sm="2"
 *     md-cols-md="4"
 *     md-cols-lg="8"
 *     md-cols-gt-lg="12"
 *     ...>
 *   <md-grid-tile></md-grid-tile>
 * </md-grid-list>
 * </hljs>
 */
function GridListDirective($interpolate, $mdConstant, $mdGridLayout, $mdMedia) {
  return {
    restrict: 'E',
    controller: GridListController,
    scope: {
      mdOnLayout: '&'
    },
    link: postLink
  };

  function postLink(scope, element, attrs, ctrl) {
    element.addClass('_md');     // private md component indicator for styling

    // Apply semantics
    element.attr('role', 'list');

    // Provide the controller with a way to trigger layouts.
    ctrl.layoutDelegate = layoutDelegate;

    var invalidateLayout = angular.bind(ctrl, ctrl.invalidateLayout),
        unwatchAttrs = watchMedia();
      scope.$on('$destroy', unwatchMedia);

    /**
     * Watches for changes in media, invalidating layout as necessary.
     */
    function watchMedia() {
      for (var mediaName in $mdConstant.MEDIA) {
        $mdMedia(mediaName); // initialize
        $mdMedia.getQuery($mdConstant.MEDIA[mediaName])
            .addListener(invalidateLayout);
      }
      return $mdMedia.watchResponsiveAttributes(
          ['md-cols', 'md-row-height', 'md-gutter'], attrs, layoutIfMediaMatch);
    }

    function unwatchMedia() {
      ctrl.layoutDelegate = angular.noop;

      unwatchAttrs();
      for (var mediaName in $mdConstant.MEDIA) {
        $mdMedia.getQuery($mdConstant.MEDIA[mediaName])
            .removeListener(invalidateLayout);
      }
    }

    /**
     * Performs grid layout if the provided mediaName matches the currently
     * active media type.
     */
    function layoutIfMediaMatch(mediaName) {
      if (mediaName == null) {
        // TODO(shyndman): It would be nice to only layout if we have
        // instances of attributes using this media type
        ctrl.invalidateLayout();
      } else if ($mdMedia(mediaName)) {
        ctrl.invalidateLayout();
      }
    }

    var lastLayoutProps;

    /**
     * Invokes the layout engine, and uses its results to lay out our
     * tile elements.
     *
     * @param {boolean} tilesInvalidated Whether tiles have been
     *    added/removed/moved since the last layout. This is to avoid situations
     *    where tiles are replaced with properties identical to their removed
     *    counterparts.
     */
    function layoutDelegate(tilesInvalidated) {
      var tiles = getTileElements();
      var props = {
        tileSpans: getTileSpans(tiles),
        colCount: getColumnCount(),
        rowMode: getRowMode(),
        rowHeight: getRowHeight(),
        gutter: getGutter()
      };

      if (!tilesInvalidated && angular.equals(props, lastLayoutProps)) {
        return;
      }

      var performance =
        $mdGridLayout(props.colCount, props.tileSpans, tiles)
          .map(function(tilePositions, rowCount) {
            return {
              grid: {
                element: element,
                style: getGridStyle(props.colCount, rowCount,
                    props.gutter, props.rowMode, props.rowHeight)
              },
              tiles: tilePositions.map(function(ps, i) {
                return {
                  element: angular.element(tiles[i]),
                  style: getTileStyle(ps.position, ps.spans,
                      props.colCount, rowCount,
                      props.gutter, props.rowMode, props.rowHeight)
                };
              })
            };
          })
          .reflow()
          .performance();

      // Report layout
      scope.mdOnLayout({
        $event: {
          performance: performance
        }
      });

      lastLayoutProps = props;
    }

    // Use $interpolate to do some simple string interpolation as a convenience.

    var startSymbol = $interpolate.startSymbol();
    var endSymbol = $interpolate.endSymbol();

    // Returns an expression wrapped in the interpolator's start and end symbols.
    function expr(exprStr) {
      return startSymbol + exprStr + endSymbol;
    }

    // The amount of space a single 1x1 tile would take up (either width or height), used as
    // a basis for other calculations. This consists of taking the base size percent (as would be
    // if evenly dividing the size between cells), and then subtracting the size of one gutter.
    // However, since there are no gutters on the edges, each tile only uses a fration
    // (gutterShare = numGutters / numCells) of the gutter size. (Imagine having one gutter per
    // tile, and then breaking up the extra gutter on the edge evenly among the cells).
    var UNIT = $interpolate(expr('share') + '% - (' + expr('gutter') + ' * ' + expr('gutterShare') + ')');

    // The horizontal or vertical position of a tile, e.g., the 'top' or 'left' property value.
    // The position comes the size of a 1x1 tile plus gutter for each previous tile in the
    // row/column (offset).
    var POSITION  = $interpolate('calc((' + expr('unit') + ' + ' + expr('gutter') + ') * ' + expr('offset') + ')');

    // The actual size of a tile, e.g., width or height, taking rowSpan or colSpan into account.
    // This is computed by multiplying the base unit by the rowSpan/colSpan, and then adding back
    // in the space that the gutter would normally have used (which was already accounted for in
    // the base unit calculation).
    var DIMENSION = $interpolate('calc((' + expr('unit') + ') * ' + expr('span') + ' + (' + expr('span') + ' - 1) * ' + expr('gutter') + ')');

    /**
     * Gets the styles applied to a tile element described by the given parameters.
     * @param {{row: number, col: number}} position The row and column indices of the tile.
     * @param {{row: number, col: number}} spans The rowSpan and colSpan of the tile.
     * @param {number} colCount The number of columns.
     * @param {number} rowCount The number of rows.
     * @param {string} gutter The amount of space between tiles. This will be something like
     *     '5px' or '2em'.
     * @param {string} rowMode The row height mode. Can be one of:
     *     'fixed': all rows have a fixed size, given by rowHeight,
     *     'ratio': row height defined as a ratio to width, or
     *     'fit': fit to the grid-list element height, divinding evenly among rows.
     * @param {string|number} rowHeight The height of a row. This is only used for 'fixed' mode and
     *     for 'ratio' mode. For 'ratio' mode, this is the *ratio* of width-to-height (e.g., 0.75).
     * @returns {Object} Map of CSS properties to be applied to the style element. Will define
     *     values for top, left, width, height, marginTop, and paddingTop.
     */
    function getTileStyle(position, spans, colCount, rowCount, gutter, rowMode, rowHeight) {
      // TODO(shyndman): There are style caching opportunities here.

      // Percent of the available horizontal space that one column takes up.
      var hShare = (1 / colCount) * 100;

      // Fraction of the gutter size that each column takes up.
      var hGutterShare = (colCount - 1) / colCount;

      // Base horizontal size of a column.
      var hUnit = UNIT({share: hShare, gutterShare: hGutterShare, gutter: gutter});

      // The width and horizontal position of each tile is always calculated the same way, but the
      // height and vertical position depends on the rowMode.
      var ltr = document.dir != 'rtl' && document.body.dir != 'rtl';
      var style = ltr ? {
          left: POSITION({ unit: hUnit, offset: position.col, gutter: gutter }),
          width: DIMENSION({ unit: hUnit, span: spans.col, gutter: gutter }),
          // resets
          paddingTop: '',
          marginTop: '',
          top: '',
          height: ''
        } : {
        right: POSITION({ unit: hUnit, offset: position.col, gutter: gutter }),
        width: DIMENSION({ unit: hUnit, span: spans.col, gutter: gutter }),
        // resets
        paddingTop: '',
        marginTop: '',
        top: '',
        height: ''
      };

      switch (rowMode) {
        case 'fixed':
          // In fixed mode, simply use the given rowHeight.
          style.top = POSITION({ unit: rowHeight, offset: position.row, gutter: gutter });
          style.height = DIMENSION({ unit: rowHeight, span: spans.row, gutter: gutter });
          break;

        case 'ratio':
          // Percent of the available vertical space that one row takes up. Here, rowHeight holds
          // the ratio value. For example, if the width:height ratio is 4:3, rowHeight = 1.333.
          var vShare = hShare / rowHeight;

          // Base veritcal size of a row.
          var vUnit = UNIT({ share: vShare, gutterShare: hGutterShare, gutter: gutter });

          // padidngTop and marginTop are used to maintain the given aspect ratio, as
          // a percentage-based value for these properties is applied to the *width* of the
          // containing block. See http://www.w3.org/TR/CSS2/box.html#margin-properties
          style.paddingTop = DIMENSION({ unit: vUnit, span: spans.row, gutter: gutter});
          style.marginTop = POSITION({ unit: vUnit, offset: position.row, gutter: gutter });
          break;

        case 'fit':
          // Fraction of the gutter size that each column takes up.
          var vGutterShare = (rowCount - 1) / rowCount;

          // Percent of the available vertical space that one row takes up.
          vShare = (1 / rowCount) * 100;

          // Base vertical size of a row.
          vUnit = UNIT({share: vShare, gutterShare: vGutterShare, gutter: gutter});

          style.top = POSITION({unit: vUnit, offset: position.row, gutter: gutter});
          style.height = DIMENSION({unit: vUnit, span: spans.row, gutter: gutter});
          break;
      }

      return style;
    }

    function getGridStyle(colCount, rowCount, gutter, rowMode, rowHeight) {
      var style = {};

      switch(rowMode) {
        case 'fixed':
          style.height = DIMENSION({ unit: rowHeight, span: rowCount, gutter: gutter });
          style.paddingBottom = '';
          break;

        case 'ratio':
          // rowHeight is width / height
          var hGutterShare = colCount === 1 ? 0 : (colCount - 1) / colCount,
              hShare = (1 / colCount) * 100,
              vShare = hShare * (1 / rowHeight),
              vUnit = UNIT({ share: vShare, gutterShare: hGutterShare, gutter: gutter });

          style.height = '';
          style.paddingBottom = DIMENSION({ unit: vUnit, span: rowCount, gutter: gutter});
          break;

        case 'fit':
          // noop, as the height is user set
          break;
      }

      return style;
    }

    function getTileElements() {
      return [].filter.call(element.children(), function(ele) {
        return ele.tagName == 'MD-GRID-TILE' && !ele.$$mdDestroyed;
      });
    }

    /**
     * Gets an array of objects containing the rowspan and colspan for each tile.
     * @returns {Array<{row: number, col: number}>}
     */
    function getTileSpans(tileElements) {
      return [].map.call(tileElements, function(ele) {
        var ctrl = angular.element(ele).controller('mdGridTile');
        return {
          row: parseInt(
              $mdMedia.getResponsiveAttribute(ctrl.$attrs, 'md-rowspan'), 10) || 1,
          col: parseInt(
              $mdMedia.getResponsiveAttribute(ctrl.$attrs, 'md-colspan'), 10) || 1
        };
      });
    }

    function getColumnCount() {
      var colCount = parseInt($mdMedia.getResponsiveAttribute(attrs, 'md-cols'), 10);
      if (isNaN(colCount)) {
        throw 'md-grid-list: md-cols attribute was not found, or contained a non-numeric value';
      }
      return colCount;
    }

    function getGutter() {
      return applyDefaultUnit($mdMedia.getResponsiveAttribute(attrs, 'md-gutter') || 1);
    }

    function getRowHeight() {
      var rowHeight = $mdMedia.getResponsiveAttribute(attrs, 'md-row-height');
      if (!rowHeight) {
        throw 'md-grid-list: md-row-height attribute was not found';
      }

      switch (getRowMode()) {
        case 'fixed':
          return applyDefaultUnit(rowHeight);
        case 'ratio':
          var whRatio = rowHeight.split(':');
          return parseFloat(whRatio[0]) / parseFloat(whRatio[1]);
        case 'fit':
          return 0; // N/A
      }
    }

    function getRowMode() {
      var rowHeight = $mdMedia.getResponsiveAttribute(attrs, 'md-row-height');
      if (!rowHeight) {
        throw 'md-grid-list: md-row-height attribute was not found';
      }

      if (rowHeight == 'fit') {
        return 'fit';
      } else if (rowHeight.indexOf(':') !== -1) {
        return 'ratio';
      } else {
        return 'fixed';
      }
    }

    function applyDefaultUnit(val) {
      return /\D$/.test(val) ? val : val + 'px';
    }
  }
}

/* @ngInject */
function GridListController($mdUtil) {
  this.layoutInvalidated = false;
  this.tilesInvalidated = false;
  this.$timeout_ = $mdUtil.nextTick;
  this.layoutDelegate = angular.noop;
}

GridListController.prototype = {
  invalidateTiles: function() {
    this.tilesInvalidated = true;
    this.invalidateLayout();
  },

  invalidateLayout: function() {
    if (this.layoutInvalidated) {
      return;
    }
    this.layoutInvalidated = true;
    this.$timeout_(angular.bind(this, this.layout));
  },

  layout: function() {
    try {
      this.layoutDelegate(this.tilesInvalidated);
    } finally {
      this.layoutInvalidated = false;
      this.tilesInvalidated = false;
    }
  }
};


/* @ngInject */
function GridLayoutFactory($mdUtil) {
  var defaultAnimator = GridTileAnimator;

  /**
   * Set the reflow animator callback
   */
  GridLayout.animateWith = function(customAnimator) {
    defaultAnimator = !angular.isFunction(customAnimator) ? GridTileAnimator : customAnimator;
  };

  return GridLayout;

  /**
   * Publish layout function
   */
  function GridLayout(colCount, tileSpans) {
      var self, layoutInfo, gridStyles, layoutTime, mapTime, reflowTime;

      layoutTime = $mdUtil.time(function() {
        layoutInfo = calculateGridFor(colCount, tileSpans);
      });

      return self = {

        /**
         * An array of objects describing each tile's position in the grid.
         */
        layoutInfo: function() {
          return layoutInfo;
        },

        /**
         * Maps grid positioning to an element and a set of styles using the
         * provided updateFn.
         */
        map: function(updateFn) {
          mapTime = $mdUtil.time(function() {
            var info = self.layoutInfo();
            gridStyles = updateFn(info.positioning, info.rowCount);
          });
          return self;
        },

        /**
         * Default animator simply sets the element.css( <styles> ). An alternate
         * animator can be provided as an argument. The function has the following
         * signature:
         *
         *    function({grid: {element: JQLite, style: Object}, tiles: Array<{element: JQLite, style: Object}>)
         */
        reflow: function(animatorFn) {
          reflowTime = $mdUtil.time(function() {
            var animator = animatorFn || defaultAnimator;
            animator(gridStyles.grid, gridStyles.tiles);
          });
          return self;
        },

        /**
         * Timing for the most recent layout run.
         */
        performance: function() {
          return {
            tileCount: tileSpans.length,
            layoutTime: layoutTime,
            mapTime: mapTime,
            reflowTime: reflowTime,
            totalTime: layoutTime + mapTime + reflowTime
          };
        }
      };
    }

  /**
   * Default Gridlist animator simple sets the css for each element;
   * NOTE: any transitions effects must be manually set in the CSS.
   * e.g.
   *
   *  md-grid-tile {
   *    transition: all 700ms ease-out 50ms;
   *  }
   *
   */
  function GridTileAnimator(grid, tiles) {
    grid.element.css(grid.style);
    tiles.forEach(function(t) {
      t.element.css(t.style);
    });
  }

  /**
   * Calculates the positions of tiles.
   *
   * The algorithm works as follows:
   *    An Array<Number> with length colCount (spaceTracker) keeps track of
   *    available tiling positions, where elements of value 0 represents an
   *    empty position. Space for a tile is reserved by finding a sequence of
   *    0s with length <= than the tile's colspan. When such a space has been
   *    found, the occupied tile positions are incremented by the tile's
   *    rowspan value, as these positions have become unavailable for that
   *    many rows.
   *
   *    If the end of a row has been reached without finding space for the
   *    tile, spaceTracker's elements are each decremented by 1 to a minimum
   *    of 0. Rows are searched in this fashion until space is found.
   */
  function calculateGridFor(colCount, tileSpans) {
    var curCol = 0,
        curRow = 0,
        spaceTracker = newSpaceTracker();

    return {
      positioning: tileSpans.map(function(spans, i) {
        return {
          spans: spans,
          position: reserveSpace(spans, i)
        };
      }),
      rowCount: curRow + Math.max.apply(Math, spaceTracker)
    };

    function reserveSpace(spans, i) {
      if (spans.col > colCount) {
        throw 'md-grid-list: Tile at position ' + i + ' has a colspan ' +
            '(' + spans.col + ') that exceeds the column count ' +
            '(' + colCount + ')';
      }

      var start = 0,
          end = 0;

      // TODO(shyndman): This loop isn't strictly necessary if you can
      // determine the minimum number of rows before a space opens up. To do
      // this, recognize that you've iterated across an entire row looking for
      // space, and if so fast-forward by the minimum rowSpan count. Repeat
      // until the required space opens up.
      while (end - start < spans.col) {
        if (curCol >= colCount) {
          nextRow();
          continue;
        }

        start = spaceTracker.indexOf(0, curCol);
        if (start === -1 || (end = findEnd(start + 1)) === -1) {
          start = end = 0;
          nextRow();
          continue;
        }

        curCol = end + 1;
      }

      adjustRow(start, spans.col, spans.row);
      curCol = start + spans.col;

      return {
        col: start,
        row: curRow
      };
    }

    function nextRow() {
      curCol = 0;
      curRow++;
      adjustRow(0, colCount, -1); // Decrement row spans by one
    }

    function adjustRow(from, cols, by) {
      for (var i = from; i < from + cols; i++) {
        spaceTracker[i] = Math.max(spaceTracker[i] + by, 0);
      }
    }

    function findEnd(start) {
      var i;
      for (i = start; i < spaceTracker.length; i++) {
        if (spaceTracker[i] !== 0) {
          return i;
        }
      }

      if (i === spaceTracker.length) {
        return i;
      }
    }

    function newSpaceTracker() {
      var tracker = [];
      for (var i = 0; i < colCount; i++) {
        tracker.push(0);
      }
      return tracker;
    }
  }
}

/**
 * @ngdoc directive
 * @name mdGridTile
 * @module material.components.gridList
 * @restrict E
 * @description
 * Tiles contain the content of an `md-grid-list`. They span one or more grid
 * cells vertically or horizontally, and use `md-grid-tile-{footer,header}` to
 * display secondary content.
 *
 * ### Responsive Attributes
 *
 * The `md-grid-tile` directive supports "responsive" attributes, which allow
 * different `md-rowspan` and `md-colspan` values depending on the currently
 * matching media query.
 *
 * In order to set a responsive attribute, first define the fallback value with
 * the standard attribute name, then add additional attributes with the
 * following convention: `{base-attribute-name}-{media-query-name}="{value}"`
 * (ie. `md-colspan-sm="4"`)
 *
 * @param {number=} md-colspan The number of columns to span (default 1). Cannot
 *    exceed the number of columns in the grid. Supports interpolation.
 * @param {number=} md-rowspan The number of rows to span (default 1). Supports
 *     interpolation.
 *
 * @usage
 * With header:
 * <hljs lang="html">
 * <md-grid-tile>
 *   <md-grid-tile-header>
 *     <h3>This is a header</h3>
 *   </md-grid-tile-header>
 * </md-grid-tile>
 * </hljs>
 *
 * With footer:
 * <hljs lang="html">
 * <md-grid-tile>
 *   <md-grid-tile-footer>
 *     <h3>This is a footer</h3>
 *   </md-grid-tile-footer>
 * </md-grid-tile>
 * </hljs>
 *
 * Spanning multiple rows/columns:
 * <hljs lang="html">
 * <md-grid-tile md-colspan="2" md-rowspan="3">
 * </md-grid-tile>
 * </hljs>
 *
 * Responsive attributes:
 * <hljs lang="html">
 * <md-grid-tile md-colspan="1" md-colspan-sm="3" md-colspan-md="5">
 * </md-grid-tile>
 * </hljs>
 */
function GridTileDirective($mdMedia) {
  return {
    restrict: 'E',
    require: '^mdGridList',
    template: '<figure ng-transclude></figure>',
    transclude: true,
    scope: {},
    // Simple controller that exposes attributes to the grid directive
    controller: ["$attrs", function($attrs) {
      this.$attrs = $attrs;
    }],
    link: postLink
  };

  function postLink(scope, element, attrs, gridCtrl) {
    // Apply semantics
    element.attr('role', 'listitem');

    // If our colspan or rowspan changes, trigger a layout
    var unwatchAttrs = $mdMedia.watchResponsiveAttributes(['md-colspan', 'md-rowspan'],
        attrs, angular.bind(gridCtrl, gridCtrl.invalidateLayout));

    // Tile registration/deregistration
    gridCtrl.invalidateTiles();
    scope.$on('$destroy', function() {
      // Mark the tile as destroyed so it is no longer considered in layout,
      // even if the DOM element sticks around (like during a leave animation)
      element[0].$$mdDestroyed = true;
      unwatchAttrs();
      gridCtrl.invalidateLayout();
    });

    if (angular.isDefined(scope.$parent.$index)) {
      scope.$watch(function() { return scope.$parent.$index; },
        function indexChanged(newIdx, oldIdx) {
          if (newIdx === oldIdx) {
            return;
          }
          gridCtrl.invalidateTiles();
        });
    }
  }
}


function GridTileCaptionDirective() {
  return {
    template: '<figcaption ng-transclude></figcaption>',
    transclude: true
  };
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.icon
 * @description
 * Icon
 */
angular.module('material.components.icon', ['material.core']);

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.list
 * @description
 * List module
 */
MdListController.$inject = ["$scope", "$element", "$mdListInkRipple"];
mdListDirective.$inject = ["$mdTheming"];
mdListItemDirective.$inject = ["$mdAria", "$mdConstant", "$mdUtil", "$timeout"];
angular.module('material.components.list', [
  'material.core'
])
  .controller('MdListController', MdListController)
  .directive('mdList', mdListDirective)
  .directive('mdListItem', mdListItemDirective);

/**
 * @ngdoc directive
 * @name mdList
 * @module material.components.list
 *
 * @restrict E
 *
 * @description
 * The `<md-list>` directive is a list container for 1..n `<md-list-item>` tags.
 *
 * @usage
 * <hljs lang="html">
 * <md-list>
 *   <md-list-item class="md-2-line" ng-repeat="item in todos">
 *     <md-checkbox ng-model="item.done"></md-checkbox>
 *     <div class="md-list-item-text">
 *       <h3>{{item.title}}</h3>
 *       <p>{{item.description}}</p>
 *     </div>
 *   </md-list-item>
 * </md-list>
 * </hljs>
 */

function mdListDirective($mdTheming) {
  return {
    restrict: 'E',
    compile: function(tEl) {
      tEl[0].setAttribute('role', 'list');
      return $mdTheming;
    }
  };
}
/**
 * @ngdoc directive
 * @name mdListItem
 * @module material.components.list
 *
 * @restrict E
 *
 * @description
 * A `md-list-item` element can be used to represent some information in a row.<br/>
 *
 * @usage
 * ### Single Row Item
 * <hljs lang="html">
 *   <md-list-item>
 *     <span>Single Row Item</span>
 *   </md-list-item>
 * </hljs>
 *
 * ### Multiple Lines
 * By using the following markup, you will be able to have two lines inside of one `md-list-item`.
 *
 * <hljs lang="html">
 *   <md-list-item class="md-2-line">
 *     <div class="md-list-item-text" layout="column">
 *       <p>First Line</p>
 *       <p>Second Line</p>
 *     </div>
 *   </md-list-item>
 * </hljs>
 *
 * It is also possible to have three lines inside of one list item.
 *
 * <hljs lang="html">
 *   <md-list-item class="md-3-line">
 *     <div class="md-list-item-text" layout="column">
 *       <p>First Line</p>
 *       <p>Second Line</p>
 *       <p>Third Line</p>
 *     </div>
 *   </md-list-item>
 * </hljs>
 *
 * ### Secondary Items
 * Secondary items are elements which will be aligned at the end of the `md-list-item`.
 *
 * <hljs lang="html">
 *   <md-list-item>
 *     <span>Single Row Item</span>
 *     <md-button class="md-secondary">
 *       Secondary Button
 *     </md-button>
 *   </md-list-item>
 * </hljs>
 *
 * It also possible to have multiple secondary items inside of one `md-list-item`.
 *
 * <hljs lang="html">
 *   <md-list-item>
 *     <span>Single Row Item</span>
 *     <md-button class="md-secondary">First Button</md-button>
 *     <md-button class="md-secondary">Second Button</md-button>
 *   </md-list-item>
 * </hljs>
 *
 * ### Proxy Item
 * Proxies are elements, which will execute their specific action on click<br/>
 * Currently supported proxy items are
 * - `md-checkbox` (Toggle)
 * - `md-switch` (Toggle)
 * - `md-menu` (Open)
 *
 * This means, when using a supported proxy item inside of `md-list-item`, the list item will
 * automatically become clickable and executes the associated action of the proxy element on click.
 *
 * It is possible to disable this behavior by applying the `md-no-proxy` class to the list item.
 *
 * <hljs lang="html">
 *   <md-list-item class="md-no-proxy">
 *     <span>No Proxy List</span>
 *     <md-checkbox class="md-secondary"></md-checkbox>
 *   </md-list-item>
 * </hljs>
 *
 * Here are a few examples of proxy elements inside of a list item.
 *
 * <hljs lang="html">
 *   <md-list-item>
 *     <span>First Line</span>
 *     <md-checkbox class="md-secondary"></md-checkbox>
 *   </md-list-item>
 * </hljs>
 *
 * The `md-checkbox` element will be automatically detected as a proxy element and will toggle on click.
 *
 * <hljs lang="html">
 *   <md-list-item>
 *     <span>First Line</span>
 *     <md-switch class="md-secondary"></md-switch>
 *   </md-list-item>
 * </hljs>
 *
 * The recognized `md-switch` will toggle its state, when the user clicks on the `md-list-item`.
 *
 * It is also possible to have a `md-menu` inside of a `md-list-item`.
 * <hljs lang="html">
 *   <md-list-item>
 *     <p>Click anywhere to fire the secondary action</p>
 *     <md-menu class="md-secondary">
 *       <md-button class="md-icon-button">
 *         <md-icon md-svg-icon="communication:message"></md-icon>
 *       </md-button>
 *       <md-menu-content width="4">
 *         <md-menu-item>
 *           <md-button>
 *             Redial
 *           </md-button>
 *         </md-menu-item>
 *         <md-menu-item>
 *           <md-button>
 *             Check voicemail
 *           </md-button>
 *         </md-menu-item>
 *         <md-menu-divider></md-menu-divider>
 *         <md-menu-item>
 *           <md-button>
 *             Notifications
 *           </md-button>
 *         </md-menu-item>
 *       </md-menu-content>
 *     </md-menu>
 *   </md-list-item>
 * </hljs>
 *
 * The menu will automatically open, when the users clicks on the `md-list-item`.<br/>
 *
 * If the developer didn't specify any position mode on the menu, the `md-list-item` will automatically detect the
 * position mode and applies it to the `md-menu`.
 *
 * ### Avatars
 * Sometimes you may want to have some avatars inside of the `md-list-item `.<br/>
 * You are able to create a optimized icon for the list item, by applying the `.md-avatar` class on the `<img>` element.
 *
 * <hljs lang="html">
 *   <md-list-item>
 *     <img src="my-avatar.png" class="md-avatar">
 *     <span>Alan Turing</span>
 * </hljs>
 *
 * When using `<md-icon>` for an avatar, you have to use the `.md-avatar-icon` class.
 * <hljs lang="html">
 *   <md-list-item>
 *     <md-icon class="md-avatar-icon" md-svg-icon="avatars:timothy"></md-icon>
 *     <span>Timothy Kopra</span>
 *   </md-list-item>
 * </hljs>
 *
 * In cases, you have a `md-list-item`, which doesn't have any avatar,
 * but you want to align it with the other avatar items, you have to use the `.md-offset` class.
 *
 * <hljs lang="html">
 *   <md-list-item class="md-offset">
 *     <span>Jon Doe</span>
 *   </md-list-item>
 * </hljs>
 *
 * ### DOM modification
 * The `md-list-item` component automatically detects if the list item should be clickable.
 *
 * ---
 * If the `md-list-item` is clickable, we wrap all content inside of a `<div>` and create
 * an overlaying button, which will will execute the given actions (like `ng-href`, `ng-click`)
 *
 * We create an overlaying button, instead of wrapping all content inside of the button,
 * because otherwise some elements may not be clickable inside of the button.
 *
 * ---
 * When using a secondary item inside of your list item, the `md-list-item` component will automatically create
 * a secondary container at the end of the `md-list-item`, which contains all secondary items.
 *
 * The secondary item container is not static, because otherwise the overflow will not work properly on the
 * list item.
 *
 */
function mdListItemDirective($mdAria, $mdConstant, $mdUtil, $timeout) {
  var proxiedTypes = ['md-checkbox', 'md-switch', 'md-menu'];
  return {
    restrict: 'E',
    controller: 'MdListController',
    compile: function(tEl, tAttrs) {

      // Check for proxy controls (no ng-click on parent, and a control inside)
      var secondaryItems = tEl[0].querySelectorAll('.md-secondary');
      var hasProxiedElement;
      var proxyElement;
      var itemContainer = tEl;

      tEl[0].setAttribute('role', 'listitem');

      if (tAttrs.ngClick || tAttrs.ngDblclick ||  tAttrs.ngHref || tAttrs.href || tAttrs.uiSref || tAttrs.ngAttrUiSref) {
        wrapIn('button');
      } else if (!tEl.hasClass('md-no-proxy')) {

        for (var i = 0, type; type = proxiedTypes[i]; ++i) {
          if (proxyElement = tEl[0].querySelector(type)) {
            hasProxiedElement = true;
            break;
          }
        }

        if (hasProxiedElement) {
          wrapIn('div');
        } else {
          tEl.addClass('md-no-proxy');
        }

      }

      wrapSecondaryItems();
      setupToggleAria();

      if (hasProxiedElement && proxyElement.nodeName === "MD-MENU") {
        setupProxiedMenu();
      }

      function setupToggleAria() {
        var toggleTypes = ['md-switch', 'md-checkbox'];
        var toggle;

        for (var i = 0, toggleType; toggleType = toggleTypes[i]; ++i) {
          if (toggle = tEl.find(toggleType)[0]) {
            if (!toggle.hasAttribute('aria-label')) {
              var p = tEl.find('p')[0];
              if (!p) return;
              toggle.setAttribute('aria-label', 'Toggle ' + p.textContent);
            }
          }
        }
      }

      function setupProxiedMenu() {
        var menuEl = angular.element(proxyElement);

        var isEndAligned = menuEl.parent().hasClass('md-secondary-container') ||
                           proxyElement.parentNode.firstElementChild !== proxyElement;

        var xAxisPosition = 'left';

        if (isEndAligned) {
          // When the proxy item is aligned at the end of the list, we have to set the origin to the end.
          xAxisPosition = 'right';
        }

        // Set the position mode / origin of the proxied menu.
        if (!menuEl.attr('md-position-mode')) {
          menuEl.attr('md-position-mode', xAxisPosition + ' target');
        }

        // Apply menu open binding to menu button
        var menuOpenButton = menuEl.children().eq(0);
        if (!hasClickEvent(menuOpenButton[0])) {
          menuOpenButton.attr('ng-click', '$mdMenu.open($event)');
        }

        if (!menuOpenButton.attr('aria-label')) {
          menuOpenButton.attr('aria-label', 'Open List Menu');
        }
      }

      function wrapIn(type) {
        if (type == 'div') {
          itemContainer = angular.element('<div class="md-no-style md-list-item-inner">');
          itemContainer.append(tEl.contents());
          tEl.addClass('md-proxy-focus');
        } else {
          // Element which holds the default list-item content.
          itemContainer = angular.element(
            '<div class="md-button md-no-style">'+
            '   <div class="md-list-item-inner"></div>'+
            '</div>'
          );

          // Button which shows ripple and executes primary action.
          var buttonWrap = angular.element(
            '<md-button class="md-no-style"></md-button>'
          );

          copyAttributes(tEl[0], buttonWrap[0]);

          // If there is no aria-label set on the button (previously copied over if present)
          // we determine the label from the content and copy it to the button.
          if (!buttonWrap.attr('aria-label')) {
            buttonWrap.attr('aria-label', $mdAria.getText(tEl));
          }

          // We allow developers to specify the `md-no-focus` class, to disable the focus style
          // on the button executor. Once more classes should be forwarded, we should probably make the
          // class forward more generic.
          if (tEl.hasClass('md-no-focus')) {
            buttonWrap.addClass('md-no-focus');
          }

          // Append the button wrap before our list-item content, because it will overlay in relative.
          itemContainer.prepend(buttonWrap);
          itemContainer.children().eq(1).append(tEl.contents());

          tEl.addClass('_md-button-wrap');
        }

        tEl[0].setAttribute('tabindex', '-1');
        tEl.append(itemContainer);
      }

      function wrapSecondaryItems() {
        var secondaryItemsWrapper = angular.element('<div class="md-secondary-container">');

        angular.forEach(secondaryItems, function(secondaryItem) {
          wrapSecondaryItem(secondaryItem, secondaryItemsWrapper);
        });

        itemContainer.append(secondaryItemsWrapper);
      }

      function wrapSecondaryItem(secondaryItem, container) {
        // If the current secondary item is not a button, but contains a ng-click attribute,
        // the secondary item will be automatically wrapped inside of a button.
        if (secondaryItem && !isButton(secondaryItem) && secondaryItem.hasAttribute('ng-click')) {

          $mdAria.expect(secondaryItem, 'aria-label');
          var buttonWrapper = angular.element('<md-button class="md-secondary md-icon-button">');

          // Copy the attributes from the secondary item to the generated button.
          // We also support some additional attributes from the secondary item,
          // because some developers may use a ngIf, ngHide, ngShow on their item.
          copyAttributes(secondaryItem, buttonWrapper[0], ['ng-if', 'ng-hide', 'ng-show']);

          secondaryItem.setAttribute('tabindex', '-1');
          buttonWrapper.append(secondaryItem);

          secondaryItem = buttonWrapper[0];
        }

        if (secondaryItem && (!hasClickEvent(secondaryItem) || (!tAttrs.ngClick && isProxiedElement(secondaryItem)))) {
          // In this case we remove the secondary class, so we can identify it later, when we searching for the
          // proxy items.
          angular.element(secondaryItem).removeClass('md-secondary');
        }

        tEl.addClass('md-with-secondary');
        container.append(secondaryItem);
      }

      /**
       * Copies attributes from a source element to the destination element
       * By default the function will copy the most necessary attributes, supported
       * by the button executor for clickable list items.
       * @param source Element with the specified attributes
       * @param destination Element which will retrieve the attributes
       * @param extraAttrs Additional attributes, which will be copied over.
       */
      function copyAttributes(source, destination, extraAttrs) {
        var copiedAttrs = $mdUtil.prefixer([
          'ng-if', 'ng-click', 'ng-dblclick', 'aria-label', 'ng-disabled', 'ui-sref',
          'href', 'ng-href', 'rel', 'target', 'ng-attr-ui-sref', 'ui-sref-opts', 'download'
        ]);

        if (extraAttrs) {
          copiedAttrs = copiedAttrs.concat($mdUtil.prefixer(extraAttrs));
        }

        angular.forEach(copiedAttrs, function(attr) {
          if (source.hasAttribute(attr)) {
            destination.setAttribute(attr, source.getAttribute(attr));
            source.removeAttribute(attr);
          }
        });
      }

      function isProxiedElement(el) {
        return proxiedTypes.indexOf(el.nodeName.toLowerCase()) != -1;
      }

      function isButton(el) {
        var nodeName = el.nodeName.toUpperCase();

        return nodeName == "MD-BUTTON" || nodeName == "BUTTON";
      }

      function hasClickEvent (element) {
        var attr = element.attributes;
        for (var i = 0; i < attr.length; i++) {
          if (tAttrs.$normalize(attr[i].name) === 'ngClick') return true;
        }
        return false;
      }

      return postLink;

      function postLink($scope, $element, $attr, ctrl) {
        $element.addClass('_md');     // private md component indicator for styling

        var proxies       = [],
            firstElement  = $element[0].firstElementChild,
            isButtonWrap  = $element.hasClass('_md-button-wrap'),
            clickChild    = isButtonWrap ? firstElement.firstElementChild : firstElement,
            hasClick      = clickChild && hasClickEvent(clickChild),
            noProxies     = $element.hasClass('md-no-proxy');

        computeProxies();
        computeClickable();

        if (proxies.length) {
          angular.forEach(proxies, function(proxy) {
            proxy = angular.element(proxy);

            $scope.mouseActive = false;
            proxy.on('mousedown', function() {
              $scope.mouseActive = true;
              $timeout(function(){
                $scope.mouseActive = false;
              }, 100);
            })
            .on('focus', function() {
              if ($scope.mouseActive === false) { $element.addClass('md-focused'); }
              proxy.on('blur', function proxyOnBlur() {
                $element.removeClass('md-focused');
                proxy.off('blur', proxyOnBlur);
              });
            });
          });
        }


        function computeProxies() {

          if (firstElement && firstElement.children && !hasClick && !noProxies) {

            angular.forEach(proxiedTypes, function(type) {

              // All elements which are not capable for being used a proxy have the .md-secondary class
              // applied. These items had been sorted out in the secondary wrap function.
              angular.forEach(firstElement.querySelectorAll(type + ':not(.md-secondary)'), function(child) {
                proxies.push(child);
              });
            });

          }
        }

        function computeClickable() {
          if (proxies.length == 1 || hasClick) {
            $element.addClass('md-clickable');

            if (!hasClick) {
              ctrl.attachRipple($scope, angular.element($element[0].querySelector('.md-no-style')));
            }
          }
        }

        function isEventFromControl(event) {
          var forbiddenControls = ['md-slider'];

          // If there is no path property in the event, then we can assume that the event was not bubbled.
          if (!event.path) {
            return forbiddenControls.indexOf(event.target.tagName.toLowerCase()) !== -1;
          }

          // We iterate the event path up and check for a possible component.
          // Our maximum index to search, is the list item root.
          var maxPath = event.path.indexOf($element.children()[0]);

          for (var i = 0; i < maxPath; i++) {
            if (forbiddenControls.indexOf(event.path[i].tagName.toLowerCase()) !== -1) {
              return true;
            }
          }
        }

        var clickChildKeypressListener = function(e) {
          if (e.target.nodeName != 'INPUT' && e.target.nodeName != 'TEXTAREA' && !e.target.isContentEditable) {
            var keyCode = e.which || e.keyCode;
            if (keyCode == $mdConstant.KEY_CODE.SPACE) {
              if (clickChild) {
                clickChild.click();
                e.preventDefault();
                e.stopPropagation();
              }
            }
          }
        };

        if (!hasClick && !proxies.length) {
          clickChild && clickChild.addEventListener('keypress', clickChildKeypressListener);
        }

        $element.off('click');
        $element.off('keypress');

        if (proxies.length == 1 && clickChild) {
          $element.children().eq(0).on('click', function(e) {
            // When the event is coming from an control and it should not trigger the proxied element
            // then we are skipping.
            if (isEventFromControl(e)) return;

            var parentButton = $mdUtil.getClosest(e.target, 'BUTTON');
            if (!parentButton && clickChild.contains(e.target)) {
              angular.forEach(proxies, function(proxy) {
                if (e.target !== proxy && !proxy.contains(e.target)) {
                  if (proxy.nodeName === 'MD-MENU') {
                    proxy = proxy.children[0];
                  }
                  angular.element(proxy).triggerHandler('click');
                }
              });
            }
          });
        }

        $scope.$on('$destroy', function () {
          clickChild && clickChild.removeEventListener('keypress', clickChildKeypressListener);
        });
      }
    }
  };
}

/*
 * @private
 * @ngdoc controller
 * @name MdListController
 * @module material.components.list
 *
 */
function MdListController($scope, $element, $mdListInkRipple) {
  var ctrl = this;
  ctrl.attachRipple = attachRipple;

  function attachRipple (scope, element) {
    var options = {};
    $mdListInkRipple.attach(scope, element, options);
  }
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.panel
 */
MdPanelService.$inject = ["presets", "$rootElement", "$rootScope", "$injector", "$window"];
angular
  .module('material.components.panel', [
    'material.core',
    'material.components.backdrop'
  ])
  .provider('$mdPanel', MdPanelProvider);


/*****************************************************************************
 *                            PUBLIC DOCUMENTATION                           *
 *****************************************************************************/


/**
 * @ngdoc service
 * @name $mdPanelProvider
 * @module material.components.panel
 *
 * @description
 * `$mdPanelProvider` allows users to create configuration presets that will be
 * stored within a cached presets object. When the configuration is needed, the
 * user can request the preset by passing it as the first parameter in the
 * `$mdPanel.create` or `$mdPanel.open` methods.
 *
 * @usage
 * <hljs lang="js">
 * (function(angular, undefined) {
 *   'use strict';
 *
 *   angular
 *       .module('demoApp', ['ngMaterial'])
 *       .config(DemoConfig)
 *       .controller('DemoCtrl', DemoCtrl)
 *       .controller('DemoMenuCtrl', DemoMenuCtrl);
 *
 *   function DemoConfig($mdPanelProvider) {
 *     $mdPanelProvider.definePreset('demoPreset', {
 *       attachTo: angular.element(document.body),
 *       controller: DemoMenuCtrl,
 *       controllerAs: 'ctrl',
 *       template: '' +
 *           '<div class="menu-panel" md-whiteframe="4">' +
 *           '  <div class="menu-content">' +
 *           '    <div class="menu-item" ng-repeat="item in ctrl.items">' +
 *           '      <button class="md-button">' +
 *           '        <span>{{item}}</span>' +
 *           '      </button>' +
 *           '    </div>' +
 *           '    <md-divider></md-divider>' +
 *           '    <div class="menu-item">' +
 *           '      <button class="md-button" ng-click="ctrl.closeMenu()">' +
 *           '        <span>Close Menu</span>' +
 *           '      </button>' +
 *           '    </div>' +
 *           '  </div>' +
 *           '</div>',
 *       panelClass: 'menu-panel-container',
 *       focusOnOpen: false,
 *       zIndex: 100,
 *       propagateContainerEvents: true,
 *       groupName: 'menus'
 *     });
 *   }
 *
 *   function PanelProviderCtrl($mdPanel) {
 *     this.navigation = {
 *       name: 'navigation',
 *       items: [
 *         'Home',
 *         'About',
 *         'Contact'
 *       ]
 *     };
 *     this.favorites = {
 *       name: 'favorites',
 *       items: [
 *         'Add to Favorites'
 *       ]
 *     };
 *     this.more = {
 *       name: 'more',
 *       items: [
 *         'Account',
 *         'Sign Out'
 *       ]
 *     };
 *
 *     $mdPanel.newPanelGroup('menus', {
 *       maxOpen: 2
 *     });
 *
 *     this.showMenu = function($event, menu) {
 *       $mdPanel.open('demoPreset', {
 *         id: 'menu_' + menu.name,
 *         position: $mdPanel.newPanelPosition()
 *             .relativeTo($event.target)
 *             .addPanelPosition(
 *               $mdPanel.xPosition.ALIGN_START,
 *               $mdPanel.yPosition.BELOW
 *             ),
 *         locals: {
 *           items: menu.items
 *         },
 *         openFrom: $event
 *       });
 *     };
 *   }
 *
 *   function PanelMenuCtrl(mdPanelRef) {
 *     // The controller is provided with an import named 'mdPanelRef'
 *     this.closeMenu = function() {
 *       mdPanelRef && mdPanelRef.close();
 *     };
 *   }
 * })(angular);
 * </hljs>
 */

/**
 * @ngdoc method
 * @name $mdPanelProvider#definePreset
 * @description
 * Takes the passed in preset name and preset configuration object and adds it
 * to the `_presets` object of the provider. This `_presets` object is then
 * passed along to the `$mdPanel` service.
 *
 * @param {string} name Preset name.
 * @param {!Object} preset Specific configuration object that can contain any
 *     and all of the parameters avaialble within the `$mdPanel.create` method.
 *     However, parameters that pertain to id, position, animation, and user
 *     interaction are not allowed and will be removed from the preset
 *     configuration.
 */


/*****************************************************************************
 *                               MdPanel Service                             *
 *****************************************************************************/


/**
 * @ngdoc service
 * @name $mdPanel
 * @module material.components.panel
 *
 * @description
 * `$mdPanel` is a robust, low-level service for creating floating panels on
 * the screen. It can be used to implement tooltips, dialogs, pop-ups, etc.
 *
 * The following types, referenced below, have separate documentation:
 * - <a href="api/type/MdPanelAnimation">MdPanelAnimation</a> from `$mdPanel.newPanelAnimation()`
 * - <a href="api/type/MdPanelPosition">MdPanelPosition</a> from `$mdPanel.newPanelPosition()`
 * - <a href="api/type/MdPanelRef">MdPanelRef</a> from the `$mdPanel.open()` Promise or
 * injected in the panel's controller
 *
 * @usage
 * <hljs lang="js">
 * (function(angular, undefined) {
 *   'use strict';
 *
 *   angular
 *       .module('demoApp', ['ngMaterial'])
 *       .controller('DemoDialogController', DialogController)
 *       .controller('DemoCtrl', function($mdPanel) {
 *
 *     var panelRef;
 *
 *     function showPanel($event) {
 *       var panelPosition = $mdPanel.newPanelPosition()
 *           .absolute()
 *           .top('50%')
 *           .left('50%');
 *
 *       var panelAnimation = $mdPanel.newPanelAnimation()
 *           .openFrom($event)
 *           .duration(200)
 *           .closeTo('.show-button')
 *           .withAnimation($mdPanel.animation.SCALE);
 *
 *       var config = {
 *         attachTo: angular.element(document.body),
 *         controller: DialogController,
 *         controllerAs: 'ctrl',
 *         position: panelPosition,
 *         animation: panelAnimation,
 *         targetEvent: $event,
 *         templateUrl: 'dialog-template.html',
 *         clickOutsideToClose: true,
 *         escapeToClose: true,
 *         focusOnOpen: true
 *       };
 *
 *       $mdPanel.open(config)
 *           .then(function(result) {
 *             panelRef = result;
 *           });
 *     }
 *   }
 *
 *   function DialogController(MdPanelRef) {
 *     function closeDialog() {
 *       if (MdPanelRef) MdPanelRef.close();
 *     }
 *   }
 * })(angular);
 * </hljs>
 */

/**
 * @ngdoc method
 * @name $mdPanel#create
 * @description
 * Creates a panel with the specified options.
 *
 * @param config {!Object=} Specific configuration object that may contain the
 *     following properties:
 *
 *   - `id` - `{string=}`: An ID to track the panel by. When an ID is provided,
 *     the created panel is added to a tracked panels object. Any subsequent
 *     requests made to create a panel with that ID are ignored. This is useful
 *     in having the panel service not open multiple panels from the same user
 *     interaction when there is no backdrop and events are propagated. Defaults
 *     to an arbitrary string that is not tracked.
 *   - `template` - `{string=}`: HTML template to show in the panel. This
 *     **must** be trusted HTML with respect to AngularJS’s
 *     [$sce service](https://docs.angularjs.org/api/ng/service/$sce).
 *   - `templateUrl` - `{string=}`: The URL that will be used as the content of
 *     the panel.
 *   - `contentElement` - `{(string|!angular.JQLite|!Element)=}`: Pre-compiled
 *     element to be used as the panel's content.
 *   - `controller` - `{(function|string)=}`: The controller to associate with
 *     the panel. The controller can inject a reference to the returned
 *     panelRef, which allows the panel to be closed, hidden, and shown. Any
 *     fields passed in through locals or resolve will be bound to the
 *     controller.
 *   - `controllerAs` - `{string=}`: An alias to assign the controller to on
 *     the scope.
 *   - `bindToController` - `{boolean=}`: Binds locals to the controller
 *     instead of passing them in. Defaults to true, as this is a best
 *     practice.
 *   - `locals` - `{Object=}`: An object containing key/value pairs. The keys
 *     will be used as names of values to inject into the controller. For
 *     example, `locals: {three: 3}` would inject `three` into the controller,
 *     with the value 3. 'mdPanelRef' is a reserved key, and will always
 *     be set to the created MdPanelRef instance.
 *   - `resolve` - `{Object=}`: Similar to locals, except it takes promises as
 *     values. The panel will not open until all of the promises resolve.
 *   - `attachTo` - `{(string|!angular.JQLite|!Element)=}`: The element to
 *     attach the panel to. Defaults to appending to the root element of the
 *     application.
 *   - `propagateContainerEvents` - `{boolean=}`: Whether pointer or touch
 *     events should be allowed to propagate 'go through' the container, aka the
 *     wrapper, of the panel. Defaults to false.
 *   - `panelClass` - `{string=}`: A css class to apply to the panel element.
 *     This class should define any borders, box-shadow, etc. for the panel.
 *   - `zIndex` - `{number=}`: The z-index to place the panel at.
 *     Defaults to 80.
 *   - `position` - `{MdPanelPosition=}`: An MdPanelPosition object that
 *     specifies the alignment of the panel. For more information, see
 *     `MdPanelPosition`.
 *   - `clickOutsideToClose` - `{boolean=}`: Whether the user can click
 *     outside the panel to close it. Defaults to false.
 *   - `escapeToClose` - `{boolean=}`: Whether the user can press escape to
 *     close the panel. Defaults to false.
 *   - `onCloseSuccess` - `{function(!panelRef, string)=}`: Function that is
 *     called after the close successfully finishes. The first parameter passed
 *     into this function is the current panelRef and the 2nd is an optional
 *     string explaining the close reason. The currently supported closeReasons
 *     can be found in the MdPanelRef.closeReasons enum. These are by default
 *     passed along by the panel.
 *   - `trapFocus` - `{boolean=}`: Whether focus should be trapped within the
 *     panel. If `trapFocus` is true, the user will not be able to interact
 *     with the rest of the page until the panel is dismissed. Defaults to
 *     false.
 *   - `focusOnOpen` - `{boolean=}`: An option to override focus behavior on
 *     open. Only disable if focusing some other way, as focus management is
 *     required for panels to be accessible. Defaults to true.
 *   - `fullscreen` - `{boolean=}`: Whether the panel should be full screen.
 *     Applies the class `._md-panel-fullscreen` to the panel on open. Defaults
 *     to false.
 *   - `animation` - `{MdPanelAnimation=}`: An MdPanelAnimation object that
 *     specifies the animation of the panel. For more information, see
 *     `MdPanelAnimation`.
 *   - `hasBackdrop` - `{boolean=}`: Whether there should be an opaque backdrop
 *     behind the panel. Defaults to false.
 *   - `disableParentScroll` - `{boolean=}`: Whether the user can scroll the
 *     page behind the panel. Defaults to false.
 *   - `onDomAdded` - `{function=}`: Callback function used to announce when
 *     the panel is added to the DOM.
 *   - `onOpenComplete` - `{function=}`: Callback function used to announce
 *     when the open() action is finished.
 *   - `onRemoving` - `{function=}`: Callback function used to announce the
 *     close/hide() action is starting.
 *   - `onDomRemoved` - `{function=}`: Callback function used to announce when
 *     the panel is removed from the DOM.
 *   - `origin` - `{(string|!angular.JQLite|!Element)=}`: The element to focus
 *     on when the panel closes. This is commonly the element which triggered
 *     the opening of the panel. If you do not use `origin`, you need to control
 *     the focus manually.
 *   - `groupName` - `{(string|!Array<string>)=}`: A group name or an array of
 *     group names. The group name is used for creating a group of panels. The
 *     group is used for configuring the number of open panels and identifying
 *     specific behaviors for groups. For instance, all tooltips could be
 *     identified using the same groupName.
 *
 * @returns {!MdPanelRef} panelRef
 */

/**
 * @ngdoc method
 * @name $mdPanel#open
 * @description
 * Calls the create method above, then opens the panel. This is a shortcut for
 * creating and then calling open manually. If custom methods need to be
 * called when the panel is added to the DOM or opened, do not use this method.
 * Instead create the panel, chain promises on the domAdded and openComplete
 * methods, and call open from the returned panelRef.
 *
 * @param {!Object=} config Specific configuration object that may contain
 *     the properties defined in `$mdPanel.create`.
 * @returns {!angular.$q.Promise<!MdPanelRef>} panelRef A promise that resolves
 *     to an instance of the panel.
 */

/**
 * @ngdoc method
 * @name $mdPanel#newPanelPosition
 * @description
 * Returns a new instance of the MdPanelPosition object. Use this to create
 * the position config object.
 *
 * @returns {!MdPanelPosition} panelPosition
 */

/**
 * @ngdoc method
 * @name $mdPanel#newPanelAnimation
 * @description
 * Returns a new instance of the MdPanelAnimation object. Use this to create
 * the animation config object.
 *
 * @returns {!MdPanelAnimation} panelAnimation
 */

/**
 * @ngdoc method
 * @name $mdPanel#newPanelGroup
 * @description
 * Creates a panel group and adds it to a tracked list of panel groups.
 *
 * @param {string} groupName Name of the group to create.
 * @param {!Object=} config Specific configuration object that may contain the
 *     following properties:
 *
 *   - `maxOpen` - `{number=}`: The maximum number of panels that are allowed to
 *     be open within a defined panel group.
 *
 * @returns {!Object<string,
 *     {panels: !Array<!MdPanelRef>,
 *     openPanels: !Array<!MdPanelRef>,
 *     maxOpen: number}>} panelGroup
 */

/**
 * @ngdoc method
 * @name $mdPanel#setGroupMaxOpen
 * @description
 * Sets the maximum number of panels in a group that can be opened at a given
 * time.
 *
 * @param {string} groupName The name of the group to configure.
 * @param {number} maxOpen The maximum number of panels that can be
 *     opened. Infinity can be passed in to remove the maxOpen limit.
 */


/*****************************************************************************
 *                                 MdPanelRef                                *
 *****************************************************************************/


/**
 * @ngdoc type
 * @name MdPanelRef
 * @module material.components.panel
 * @description
 * A reference to a created panel. This reference contains a unique id for the
 * panel, along with the following properties:
 *
 *   - `id` - `{string}`: The unique id for the panel. This id is used to track
 *     when a panel was interacted with.
 *   - `config` - `{!Object=}`: The entire config object that was used in
 *     create.
 *   - `isAttached` - `{boolean}`: Whether the panel is attached to the DOM.
 *     Visibility to the user does not factor into isAttached.
 *   - `panelContainer` - `{angular.JQLite}`: The wrapper element containing the
 *     panel. This property is added in order to have access to the `addClass`,
 *     `removeClass`, `toggleClass`, etc methods.
 *   - `panelEl` - `{angular.JQLite}`: The panel element. This property is added
 *     in order to have access to the `addClass`, `removeClass`, `toggleClass`,
 *     etc methods.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#open
 * @description
 * Attaches and shows the panel.
 *
 * @returns {!angular.$q.Promise} A promise that is resolved when the panel is
 *     opened.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#close
 * @description
 * Hides and detaches the panel. Note that this will **not** destroy the panel.
 * If you don't intend on using the panel again, call the {@link #destroy
 * destroy} method afterwards.
 *
 * @returns {!angular.$q.Promise} A promise that is resolved when the panel is
 *     closed.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#attach
 * @description
 * Create the panel elements and attach them to the DOM. The panel will be
 * hidden by default.
 *
 * @returns {!angular.$q.Promise} A promise that is resolved when the panel is
 *     attached.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#detach
 * @description
 * Removes the panel from the DOM. This will NOT hide the panel before removing
 * it.
 *
 * @returns {!angular.$q.Promise} A promise that is resolved when the panel is
 *     detached.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#show
 * @description
 * Shows the panel.
 *
 * @returns {!angular.$q.Promise} A promise that is resolved when the panel has
 *     shown and animations are completed.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#hide
 * @description
 * Hides the panel.
 *
 * @returns {!angular.$q.Promise} A promise that is resolved when the panel has
 *     hidden and animations are completed.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#destroy
 * @description
 * Destroys the panel. The panel cannot be opened again after this is called.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#addClass
 * @deprecated
 * This method is in the process of being deprecated in favor of using the panel
 * and container JQLite elements that are referenced in the MdPanelRef object.
 * Full deprecation is scheduled for material 1.2.
 * @description
 * Adds a class to the panel. DO NOT use this hide/show the panel.
 *
 * @param {string} newClass class to be added.
 * @param {boolean} toElement Whether or not to add the class to the panel
 *     element instead of the container.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#removeClass
 * @deprecated
 * This method is in the process of being deprecated in favor of using the panel
 * and container JQLite elements that are referenced in the MdPanelRef object.
 * Full deprecation is scheduled for material 1.2.
 * @description
 * Removes a class from the panel. DO NOT use this to hide/show the panel.
 *
 * @param {string} oldClass Class to be removed.
 * @param {boolean} fromElement Whether or not to remove the class from the
 *     panel element instead of the container.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#toggleClass
 * @deprecated
 * This method is in the process of being deprecated in favor of using the panel
 * and container JQLite elements that are referenced in the MdPanelRef object.
 * Full deprecation is scheduled for material 1.2.
 * @description
 * Toggles a class on the panel. DO NOT use this to hide/show the panel.
 *
 * @param {string} toggleClass Class to be toggled.
 * @param {boolean} onElement Whether or not to remove the class from the panel
 *     element instead of the container.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#updatePosition
 * @description
 * Updates the position configuration of a panel. Use this to update the
 * position of a panel that is open, without having to close and re-open the
 * panel.
 *
 * @param {!MdPanelPosition} position
 */

/**
 * @ngdoc method
 * @name MdPanelRef#addToGroup
 * @description
 * Adds a panel to a group if the panel does not exist within the group already.
 * A panel can only exist within a single group.
 *
 * @param {string} groupName The name of the group to add the panel to.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#removeFromGroup
 * @description
 * Removes a panel from a group if the panel exists within that group. The group
 * must be created ahead of time.
 *
 * @param {string} groupName The name of the group.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#registerInterceptor
 * @description
 * Registers an interceptor with the panel. The callback should return a promise,
 * which will allow the action to continue when it gets resolved, or will
 * prevent an action if it is rejected. The interceptors are called sequentially
 * and it reverse order. `type` must be one of the following
 * values available on `$mdPanel.interceptorTypes`:
 * * `CLOSE` - Gets called before the panel begins closing.
 *
 * @param {string} type Type of interceptor.
 * @param {!angular.$q.Promise<any>} callback Callback to be registered.
 * @returns {!MdPanelRef}
 */

/**
 * @ngdoc method
 * @name MdPanelRef#removeInterceptor
 * @description
 * Removes a registered interceptor.
 *
 * @param {string} type Type of interceptor to be removed.
 * @param {function(): !angular.$q.Promise<any>} callback Interceptor to be removed.
 * @returns {!MdPanelRef}
 */

/**
 * @ngdoc method
 * @name MdPanelRef#removeAllInterceptors
 * @description
 * Removes all interceptors. If a type is supplied, only the
 * interceptors of that type will be cleared.
 *
 * @param {string=} type Type of interceptors to be removed.
 * @returns {!MdPanelRef}
 */

/**
 * @ngdoc method
 * @name MdPanelRef#updateAnimation
 * @description
 * Updates the animation configuration for a panel. You can use this to change
 * the panel's animation without having to re-create it.
 *
 * @param {!MdPanelAnimation} animation
 */


/*****************************************************************************
 *                               MdPanelPosition                            *
 *****************************************************************************/


/**
 * @ngdoc type
 * @name MdPanelPosition
 * @module material.components.panel
 * @description
 *
 * Object for configuring the position of the panel.
 *
 * @usage
 *
 * #### Centering the panel
 *
 * <hljs lang="js">
 * new MdPanelPosition().absolute().center();
 * </hljs>
 *
 * #### Overlapping the panel with an element
 *
 * <hljs lang="js">
 * new MdPanelPosition()
 *     .relativeTo(someElement)
 *     .addPanelPosition(
 *       $mdPanel.xPosition.ALIGN_START,
 *       $mdPanel.yPosition.ALIGN_TOPS
 *     );
 * </hljs>
 *
 * #### Aligning the panel with the bottom of an element
 *
 * <hljs lang="js">
 * new MdPanelPosition()
 *     .relativeTo(someElement)
 *     .addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
 * </hljs>
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#absolute
 * @description
 * Positions the panel absolutely relative to the parent element. If the parent
 * is document.body, this is equivalent to positioning the panel absolutely
 * within the viewport.
 *
 * @returns {!MdPanelPosition}
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#relativeTo
 * @description
 * Positions the panel relative to a specific element.
 *
 * @param {string|!Element|!angular.JQLite} element Query selector, DOM element,
 *     or angular element to position the panel with respect to.
 * @returns {!MdPanelPosition}
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#top
 * @description
 * Sets the value of `top` for the panel. Clears any previously set vertical
 * position.
 *
 * @param {string=} top Value of `top`. Defaults to '0'.
 * @returns {!MdPanelPosition}
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#bottom
 * @description
 * Sets the value of `bottom` for the panel. Clears any previously set vertical
 * position.
 *
 * @param {string=} bottom Value of `bottom`. Defaults to '0'.
 * @returns {!MdPanelPosition}
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#start
 * @description
 * Sets the panel to the start of the page - `left` if `ltr` or `right` for
 * `rtl`. Clears any previously set horizontal position.
 *
 * @param {string=} start Value of position. Defaults to '0'.
 * @returns {!MdPanelPosition}
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#end
 * @description
 * Sets the panel to the end of the page - `right` if `ltr` or `left` for `rtl`.
 * Clears any previously set horizontal position.
 *
 * @param {string=} end Value of position. Defaults to '0'.
 * @returns {!MdPanelPosition}
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#left
 * @description
 * Sets the value of `left` for the panel. Clears any previously set
 * horizontal position.
 *
 * @param {string=} left Value of `left`. Defaults to '0'.
 * @returns {!MdPanelPosition}
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#right
 * @description
 * Sets the value of `right` for the panel. Clears any previously set
 * horizontal position.
 *
 * @param {string=} right Value of `right`. Defaults to '0'.
 * @returns {!MdPanelPosition}
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#centerHorizontally
 * @description
 * Centers the panel horizontally in the viewport. Clears any previously set
 * horizontal position.
 *
 * @returns {!MdPanelPosition}
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#centerVertically
 * @description
 * Centers the panel vertically in the viewport. Clears any previously set
 * vertical position.
 *
 * @returns {!MdPanelPosition}
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#center
 * @description
 * Centers the panel horizontally and vertically in the viewport. This is
 * equivalent to calling both `centerHorizontally` and `centerVertically`.
 * Clears any previously set horizontal and vertical positions.
 *
 * @returns {!MdPanelPosition}
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#addPanelPosition
 * @description
 * Sets the x and y position for the panel relative to another element. Can be
 * called multiple times to specify an ordered list of panel positions. The
 * first position which allows the panel to be completely on-screen will be
 * chosen; the last position will be chose whether it is on-screen or not.
 *
 * xPosition must be one of the following values available on
 * $mdPanel.xPosition:
 *
 *
 * CENTER | ALIGN_START | ALIGN_END | OFFSET_START | OFFSET_END
 *
 * <pre>
 *    *************
 *    *           *
 *    *   PANEL   *
 *    *           *
 *    *************
 *   A B    C    D E
 *
 * A: OFFSET_START (for LTR displays)
 * B: ALIGN_START (for LTR displays)
 * C: CENTER
 * D: ALIGN_END (for LTR displays)
 * E: OFFSET_END (for LTR displays)
 * </pre>
 *
 * yPosition must be one of the following values available on
 * $mdPanel.yPosition:
 *
 * CENTER | ALIGN_TOPS | ALIGN_BOTTOMS | ABOVE | BELOW
 *
 * <pre>
 *   F
 *   G *************
 *     *           *
 *   H *   PANEL   *
 *     *           *
 *   I *************
 *   J
 *
 * F: BELOW
 * G: ALIGN_TOPS
 * H: CENTER
 * I: ALIGN_BOTTOMS
 * J: ABOVE
 * </pre>
 *
 * @param {string} xPosition
 * @param {string} yPosition
 * @returns {!MdPanelPosition}
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#withOffsetX
 * @description
 * Sets the value of the offset in the x-direction.
 *
 * @param {string|number} offsetX
 * @returns {!MdPanelPosition}
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#withOffsetY
 * @description
 * Sets the value of the offset in the y-direction.
 *
 * @param {string|number} offsetY
 * @returns {!MdPanelPosition}
 */


/*****************************************************************************
 *                               MdPanelAnimation                            *
 *****************************************************************************/


/**
 * @ngdoc type
 * @name MdPanelAnimation
 * @module material.components.panel
 * @description
 * Animation configuration object. To use, create an MdPanelAnimation with the
 * desired properties, then pass the object as part of $mdPanel creation.
 *
 * @usage
 *
 * <hljs lang="js">
 * var panelAnimation = new MdPanelAnimation()
 *     .openFrom(myButtonEl)
 *     .duration(1337)
 *     .closeTo('.my-button')
 *     .withAnimation($mdPanel.animation.SCALE);
 *
 * $mdPanel.create({
 *   animation: panelAnimation
 * });
 * </hljs>
 */

/**
 * @ngdoc method
 * @name MdPanelAnimation#openFrom
 * @description
 * Specifies where to start the open animation. `openFrom` accepts a
 * click event object, query selector, DOM element, or a Rect object that
 * is used to determine the bounds. When passed a click event, the location
 * of the click will be used as the position to start the animation.
 *
 * @param {string|!Element|!Event|{top: number, left: number}}
 * @returns {!MdPanelAnimation}
 */

/**
 * @ngdoc method
 * @name MdPanelAnimation#closeTo
 * @description
 * Specifies where to animate the panel close. `closeTo` accepts a
 * query selector, DOM element, or a Rect object that is used to determine
 * the bounds.
 *
 * @param {string|!Element|{top: number, left: number}}
 * @returns {!MdPanelAnimation}
 */

/**
 * @ngdoc method
 * @name MdPanelAnimation#withAnimation
 * @description
 * Specifies the animation class.
 *
 * There are several default animations that can be used: `$mdPanel.animation.`
 *  - `SLIDE`: The panel slides in and out from the specified
 *       elements. It will not fade in or out.
 *  - `SCALE`: The panel scales in and out. Slide and fade are
 *       included in this animation.
 *  - `FADE`: The panel fades in and out.
 *
 * Custom classes will by default fade in and out unless
 * `transition: opacity 1ms` is added to the to custom class.
 *
 * @param {string|{open: string, close: string}} cssClass
 * @returns {!MdPanelAnimation}
 */

/**
 * @ngdoc method
 * @name MdPanelAnimation#duration
 * @description
 * Specifies the duration of the animation in milliseconds. The `duration`
 * method accepts either a number or an object with separate open and close
 * durations.
 *
 * @param {number|{open: number, close: number}} duration
 * @returns {!MdPanelAnimation}
 */


/*****************************************************************************
 *                            PUBLIC DOCUMENTATION                           *
 *****************************************************************************/


var MD_PANEL_Z_INDEX = 80;
var MD_PANEL_HIDDEN = '_md-panel-hidden';
var FOCUS_TRAP_TEMPLATE = angular.element(
    '<div class="_md-panel-focus-trap" tabindex="0"></div>');

var _presets = {};


/**
 * A provider that is used for creating presets for the panel API.
 * @final @constructor @ngInject
 */
function MdPanelProvider() {
  return {
    'definePreset': definePreset,
    'getAllPresets': getAllPresets,
    'clearPresets': clearPresets,
    '$get': $getProvider()
  };
}


/**
 * Takes the passed in panel configuration object and adds it to the `_presets`
 * object at the specified name.
 * @param {string} name Name of the preset to set.
 * @param {!Object} preset Specific configuration object that can contain any
 *     and all of the parameters available within the `$mdPanel.create` method.
 *     However, parameters that pertain to id, position, animation, and user
 *     interaction are not allowed and will be removed from the preset
 *     configuration.
 */
function definePreset(name, preset) {
  if (!name || !preset) {
    throw new Error('mdPanelProvider: The panel preset definition is ' +
        'malformed. The name and preset object are required.');
  } else if (_presets.hasOwnProperty(name)) {
    throw new Error('mdPanelProvider: The panel preset you have requested ' +
        'has already been defined.');
  }

  // Delete any property on the preset that is not allowed.
  delete preset.id;
  delete preset.position;
  delete preset.animation;

  _presets[name] = preset;
}


/**
 * Gets a clone of the `_presets`.
 * @return {!Object}
 */
function getAllPresets() {
  return angular.copy(_presets);
}


/**
 * Clears all of the stored presets.
 */
function clearPresets() {
  _presets = {};
}


/**
 * Represents the `$get` method of the AngularJS provider. From here, a new
 * reference to the MdPanelService is returned where the needed arguments are
 * passed in including the MdPanelProvider `_presets`.
 * @param {!Object} _presets
 * @param {!angular.JQLite} $rootElement
 * @param {!angular.Scope} $rootScope
 * @param {!angular.$injector} $injector
 * @param {!angular.$window} $window
 */
function $getProvider() {
  return [
    '$rootElement', '$rootScope', '$injector', '$window',
    function($rootElement, $rootScope, $injector, $window) {
      return new MdPanelService(_presets, $rootElement, $rootScope,
          $injector, $window);
    }
  ];
}


/*****************************************************************************
 *                               MdPanel Service                             *
 *****************************************************************************/


/**
 * A service that is used for controlling/displaying panels on the screen.
 * @param {!Object} presets
 * @param {!angular.JQLite} $rootElement
 * @param {!angular.Scope} $rootScope
 * @param {!angular.$injector} $injector
 * @param {!angular.$window} $window
 * @final @constructor @ngInject
 */
function MdPanelService(presets, $rootElement, $rootScope, $injector, $window) {
  /**
   * Default config options for the panel.
   * Anything angular related needs to be done later. Therefore
   *     scope: $rootScope.$new(true),
   *     attachTo: $rootElement,
   * are added later.
   * @private {!Object}
   */
  this._defaultConfigOptions = {
    bindToController: true,
    clickOutsideToClose: false,
    disableParentScroll: false,
    escapeToClose: false,
    focusOnOpen: true,
    fullscreen: false,
    hasBackdrop: false,
    propagateContainerEvents: false,
    transformTemplate: angular.bind(this, this._wrapTemplate),
    trapFocus: false,
    zIndex: MD_PANEL_Z_INDEX
  };

  /** @private {!Object} */
  this._config = {};

  /** @private {!Object} */
  this._presets = presets;

  /** @private @const */
  this._$rootElement = $rootElement;

  /** @private @const */
  this._$rootScope = $rootScope;

  /** @private @const */
  this._$injector = $injector;

  /** @private @const */
  this._$window = $window;

  /** @private @const */
  this._$mdUtil = this._$injector.get('$mdUtil');

  /** @private {!Object<string, !MdPanelRef>} */
  this._trackedPanels = {};

  /**
   * @private {!Object<string,
   *     {panels: !Array<!MdPanelRef>,
   *     openPanels: !Array<!MdPanelRef>,
   *     maxOpen: number}>}
   */
  this._groups = Object.create(null);

  /**
   * Default animations that can be used within the panel.
   * @type {enum}
   */
  this.animation = MdPanelAnimation.animation;

  /**
   * Possible values of xPosition for positioning the panel relative to
   * another element.
   * @type {enum}
   */
  this.xPosition = MdPanelPosition.xPosition;

  /**
   * Possible values of yPosition for positioning the panel relative to
   * another element.
   * @type {enum}
   */
  this.yPosition = MdPanelPosition.yPosition;

  /**
   * Possible values for the interceptors that can be registered on a panel.
   * @type {enum}
   */
  this.interceptorTypes = MdPanelRef.interceptorTypes;

  /**
   * Possible values for closing of a panel.
   * @type {enum}
   */
  this.closeReasons = MdPanelRef.closeReasons;

  /**
   * Possible values of absolute position.
   * @type {enum}
   */
  this.absPosition = MdPanelPosition.absPosition;
}


/**
 * Creates a panel with the specified options.
 * @param {string=} preset Name of a preset configuration that can be used to
 *     extend the panel configuration.
 * @param {!Object=} config Configuration object for the panel.
 * @returns {!MdPanelRef}
 */
MdPanelService.prototype.create = function(preset, config) {
  if (typeof preset === 'string') {
    preset = this._getPresetByName(preset);
  } else if (typeof preset === 'object' &&
      (angular.isUndefined(config) || !config)) {
    config = preset;
    preset = {};
  }

  preset = preset || {};
  config = config || {};

  // If the passed-in config contains an ID and the ID is within _trackedPanels,
  // return the tracked panel after updating its config with the passed-in
  // config.
  if (angular.isDefined(config.id) && this._trackedPanels[config.id]) {
    var trackedPanel = this._trackedPanels[config.id];
    angular.extend(trackedPanel.config, config);
    return trackedPanel;
  }

  // Combine the passed-in config, the _defaultConfigOptions, and the preset
  // configuration into the `_config`.
  this._config = angular.extend({
    // If no ID is set within the passed-in config, then create an arbitrary ID.
    id: config.id || 'panel_' + this._$mdUtil.nextUid(),
    scope: this._$rootScope.$new(true),
    attachTo: this._$rootElement
  }, this._defaultConfigOptions, config, preset);

  // Create the panelRef and add it to the `_trackedPanels` object.
  var panelRef = new MdPanelRef(this._config, this._$injector, this);
  this._trackedPanels[config.id] = panelRef;

  // Add the panel to each of its requested groups.
  if (this._config.groupName) {
    if (angular.isString(this._config.groupName)) {
      this._config.groupName = [this._config.groupName];
    }
    angular.forEach(this._config.groupName, function(group) {
      panelRef.addToGroup(group);
    });
  }

  this._config.scope.$on('$destroy', angular.bind(panelRef, panelRef.detach));

  return panelRef;
};


/**
 * Creates and opens a panel with the specified options.
 * @param {string=} preset Name of a preset configuration that can be used to
 *     extend the panel configuration.
 * @param {!Object=} config Configuration object for the panel.
 * @returns {!angular.$q.Promise<!MdPanelRef>} The panel created from create.
 */
MdPanelService.prototype.open = function(preset, config) {
  var panelRef = this.create(preset, config);
  return panelRef.open().then(function() {
    return panelRef;
  });
};


/**
 * Gets a specific preset configuration object saved within `_presets`.
 * @param {string} preset Name of the preset to search for.
 * @returns {!Object} The preset configuration object.
 */
MdPanelService.prototype._getPresetByName = function(preset) {
  if (!this._presets[preset]) {
    throw new Error('mdPanel: The panel preset configuration that you ' +
        'requested does not exist. Use the $mdPanelProvider to create a ' +
        'preset before requesting one.');
  }
  return this._presets[preset];
};


/**
 * Returns a new instance of the MdPanelPosition. Use this to create the
 * positioning object.
 * @returns {!MdPanelPosition}
 */
MdPanelService.prototype.newPanelPosition = function() {
  return new MdPanelPosition(this._$injector);
};


/**
 * Returns a new instance of the MdPanelAnimation. Use this to create the
 * animation object.
 * @returns {!MdPanelAnimation}
 */
MdPanelService.prototype.newPanelAnimation = function() {
  return new MdPanelAnimation(this._$injector);
};


/**
 * Creates a panel group and adds it to a tracked list of panel groups.
 * @param groupName {string} Name of the group to create.
 * @param config {!Object=} Specific configuration object that may contain the
 *     following properties:
 *
 *   - `maxOpen` - `{number=}`: The maximum number of panels that are allowed
 *     open within a defined panel group.
 *
 * @returns {!Object<string,
 *     {panels: !Array<!MdPanelRef>,
 *     openPanels: !Array<!MdPanelRef>,
 *     maxOpen: number}>} panelGroup
 */
MdPanelService.prototype.newPanelGroup = function(groupName, config) {
  if (!this._groups[groupName]) {
    config = config || {};
    var group = {
      panels: [],
      openPanels: [],
      maxOpen: config.maxOpen > 0 ? config.maxOpen : Infinity
    };
    this._groups[groupName] = group;
  }
  return this._groups[groupName];
};


/**
 * Sets the maximum number of panels in a group that can be opened at a given
 * time.
 * @param {string} groupName The name of the group to configure.
 * @param {number} maxOpen The maximum number of panels that can be
 *     opened. Infinity can be passed in to remove the maxOpen limit.
 */
MdPanelService.prototype.setGroupMaxOpen = function(groupName, maxOpen) {
  if (this._groups[groupName]) {
    this._groups[groupName].maxOpen = maxOpen;
  } else {
    throw new Error('mdPanel: Group does not exist yet. Call newPanelGroup().');
  }
};


/**
 * Determines if the current number of open panels within a group exceeds the
 * limit of allowed open panels.
 * @param {string} groupName The name of the group to check.
 * @returns {boolean} true if open count does exceed maxOpen and false if not.
 * @private
 */
MdPanelService.prototype._openCountExceedsMaxOpen = function(groupName) {
  if (this._groups[groupName]) {
    var group = this._groups[groupName];
    return group.maxOpen > 0 && group.openPanels.length > group.maxOpen;
  }
  return false;
};


/**
 * Closes the first open panel within a specific group.
 * @param {string} groupName The name of the group.
 * @private
 */
MdPanelService.prototype._closeFirstOpenedPanel = function(groupName) {
  this._groups[groupName].openPanels[0].close();
};


/**
 * Wraps the users template in two elements, md-panel-outer-wrapper, which
 * covers the entire attachTo element, and md-panel, which contains only the
 * template. This allows the panel control over positioning, animations,
 * and similar properties.
 * @param {string} origTemplate The original template.
 * @returns {string} The wrapped template.
 * @private
 */
MdPanelService.prototype._wrapTemplate = function(origTemplate) {
  var template = origTemplate || '';

  // The panel should be initially rendered offscreen so we can calculate
  // height and width for positioning.
  return '' +
      '<div class="md-panel-outer-wrapper">' +
      '  <div class="md-panel _md-panel-offscreen">' + template + '</div>' +
      '</div>';
};


/**
 * Wraps a content element in a md-panel-outer wrapper and
 * positions it off-screen. Allows for proper control over positoning
 * and animations.
 * @param {!angular.JQLite} contentElement Element to be wrapped.
 * @return {!angular.JQLite} Wrapper element.
 * @private
 */
MdPanelService.prototype._wrapContentElement = function(contentElement) {
  var wrapper = angular.element('<div class="md-panel-outer-wrapper">');

  contentElement.addClass('md-panel _md-panel-offscreen');
  wrapper.append(contentElement);

  return wrapper;
};


/*****************************************************************************
 *                                 MdPanelRef                                *
 *****************************************************************************/


/**
 * A reference to a created panel. This reference contains a unique id for the
 * panel, along with properties/functions used to control the panel.
 * @param {!Object} config
 * @param {!angular.$injector} $injector
 * @final @constructor
 */
function MdPanelRef(config, $injector, parent) {
  // Injected variables.
  /** @private @const {!angular.$q} */
  this._$q = $injector.get('$q');
  this._parent = parent;

  /** @private @const {!angular.$mdCompiler} */
  this._$mdCompiler = $injector.get('$mdCompiler');

  /** @private @const {!angular.$mdConstant} */
  this._$mdConstant = $injector.get('$mdConstant');

  /** @private @const {!angular.$mdUtil} */
  this._$mdUtil = $injector.get('$mdUtil');

  /** @private @const {!angular.$mdTheming} */
  this._$mdTheming = $injector.get('$mdTheming');

  /** @private @const {!angular.Scope} */
  this._$rootScope = $injector.get('$rootScope');

  /** @private @const {!angular.$animate} */
  this._$animate = $injector.get('$animate');

  /** @private @const {!MdPanelRef} */
  this._$mdPanel = $injector.get('$mdPanel');

  /** @private @const {!angular.$log} */
  this._$log = $injector.get('$log');

  /** @private @const {!angular.$window} */
  this._$window = $injector.get('$window');

  /** @private @const {!Function} */
  this._$$rAF = $injector.get('$$rAF');

  // Public variables.
  /**
   * Unique id for the panelRef.
   * @type {string}
   */
  this.id = config.id;

  /** @type {!Object} */
  this.config = config;

  /** @type {!angular.JQLite|undefined} */
  this.panelContainer;

  /** @type {!angular.JQLite|undefined} */
  this.panelEl;

  /**
   * Whether the panel is attached. This is synchronous. When attach is called,
   * isAttached is set to true. When detach is called, isAttached is set to
   * false.
   * @type {boolean}
   */
  this.isAttached = false;

  // Private variables.
  /** @private {Array<function()>} */
  this._removeListeners = [];

  /** @private {!angular.JQLite|undefined} */
  this._topFocusTrap;

  /** @private {!angular.JQLite|undefined} */
  this._bottomFocusTrap;

  /** @private {!$mdPanel|undefined} */
  this._backdropRef;

  /** @private {Function?} */
  this._restoreScroll = null;

  /**
   * Keeps track of all the panel interceptors.
   * @private {!Object}
   */
  this._interceptors = Object.create(null);

  /**
   * Cleanup function, provided by `$mdCompiler` and assigned after the element
   * has been compiled. When `contentElement` is used, the function is used to
   * restore the element to it's proper place in the DOM.
   * @private {!Function}
   */
  this._compilerCleanup = null;

  /**
   * Cache for saving and restoring element inline styles, CSS classes etc.
   * @type {{styles: string, classes: string}}
   */
  this._restoreCache = {
    styles: '',
    classes: ''
  };
}


MdPanelRef.interceptorTypes = {
  CLOSE: 'onClose'
};


/**
 * Opens an already created and configured panel. If the panel is already
 * visible, does nothing.
 * @returns {!angular.$q.Promise<!MdPanelRef>} A promise that is resolved when
 *     the panel is opened and animations finish.
 */
MdPanelRef.prototype.open = function() {
  var self = this;
  return this._$q(function(resolve, reject) {
    var done = self._done(resolve, self);
    var show = self._simpleBind(self.show, self);
    var checkGroupMaxOpen = function() {
      if (self.config.groupName) {
        angular.forEach(self.config.groupName, function(group) {
          if (self._$mdPanel._openCountExceedsMaxOpen(group)) {
            self._$mdPanel._closeFirstOpenedPanel(group);
          }
        });
      }
    };

    self.attach()
        .then(show)
        .then(checkGroupMaxOpen)
        .then(done)
        .catch(reject);
  });
};


/**
 * Closes the panel.
 * @param {string} closeReason The event type that triggered the close.
 * @returns {!angular.$q.Promise<!MdPanelRef>} A promise that is resolved when
 *     the panel is closed and animations finish.
 */
MdPanelRef.prototype.close = function(closeReason) {
  var self = this;

  return this._$q(function(resolve, reject) {
    self._callInterceptors(MdPanelRef.interceptorTypes.CLOSE).then(function() {
      var done = self._done(resolve, self);
      var detach = self._simpleBind(self.detach, self);
      var onCloseSuccess = self.config['onCloseSuccess'] || angular.noop;
      onCloseSuccess = angular.bind(self, onCloseSuccess, self, closeReason);

      self.hide()
          .then(detach)
          .then(done)
          .then(onCloseSuccess)
          .catch(reject);
    }, reject);
  });
};


/**
 * Attaches the panel. The panel will be hidden afterwards.
 * @returns {!angular.$q.Promise<!MdPanelRef>} A promise that is resolved when
 *     the panel is attached.
 */
MdPanelRef.prototype.attach = function() {
  if (this.isAttached && this.panelEl) {
    return this._$q.when(this);
  }

  var self = this;
  return this._$q(function(resolve, reject) {
    var done = self._done(resolve, self);
    var onDomAdded = self.config['onDomAdded'] || angular.noop;
    var addListeners = function(response) {
      self.isAttached = true;
      self._addEventListeners();
      return response;
    };

    self._$q.all([
        self._createBackdrop(),
        self._createPanel()
            .then(addListeners)
            .catch(reject)
    ]).then(onDomAdded)
      .then(done)
      .catch(reject);
  });
};


/**
 * Only detaches the panel. Will NOT hide the panel first.
 * @returns {!angular.$q.Promise<!MdPanelRef>} A promise that is resolved when
 *     the panel is detached.
 */
MdPanelRef.prototype.detach = function() {
  if (!this.isAttached) {
    return this._$q.when(this);
  }

  var self = this;
  var onDomRemoved = self.config['onDomRemoved'] || angular.noop;

  var detachFn = function() {
    self._removeEventListeners();

    // Remove the focus traps that we added earlier for keeping focus within
    // the panel.
    if (self._topFocusTrap && self._topFocusTrap.parentNode) {
      self._topFocusTrap.parentNode.removeChild(self._topFocusTrap);
    }

    if (self._bottomFocusTrap && self._bottomFocusTrap.parentNode) {
      self._bottomFocusTrap.parentNode.removeChild(self._bottomFocusTrap);
    }

    if (self._restoreCache.classes) {
      self.panelEl[0].className = self._restoreCache.classes;
    }

    // Either restore the saved styles or clear the ones set by mdPanel.
    self.panelEl[0].style.cssText = self._restoreCache.styles || '';

    self._compilerCleanup();
    self.panelContainer.remove();
    self.isAttached = false;
    return self._$q.when(self);
  };

  if (this._restoreScroll) {
    this._restoreScroll();
    this._restoreScroll = null;
  }

  return this._$q(function(resolve, reject) {
    var done = self._done(resolve, self);

    self._$q.all([
      detachFn(),
      self._backdropRef ? self._backdropRef.detach() : true
    ]).then(onDomRemoved)
      .then(done)
      .catch(reject);
  });
};


/**
 * Destroys the panel. The Panel cannot be opened again after this.
 */
MdPanelRef.prototype.destroy = function() {
  var self = this;
  if (this.config.groupName) {
    angular.forEach(this.config.groupName, function(group) {
      self.removeFromGroup(group);
    });
  }
  delete this._parent._trackedPanels[this.config.id];
  this._parent = null;
  this.config.scope.$destroy();
  this.config.locals = null;
  this.config.onDomAdded = null;
  this.config.onDomRemoved = null;
  this.config.onRemoving = null;
  this.config.onOpenComplete = null;
  this._interceptors = null;
};


/**
 * Shows the panel.
 * @returns {!angular.$q.Promise<!MdPanelRef>} A promise that is resolved when
 *     the panel has shown and animations finish.
 */
MdPanelRef.prototype.show = function() {
  if (!this.panelContainer) {
    return this._$q(function(resolve, reject) {
      reject('mdPanel: Panel does not exist yet. Call open() or attach().');
    });
  }

  if (!this.panelContainer.hasClass(MD_PANEL_HIDDEN)) {
    return this._$q.when(this);
  }

  var self = this;
  var animatePromise = function() {
    self.panelContainer.removeClass(MD_PANEL_HIDDEN);
    return self._animateOpen();
  };

  return this._$q(function(resolve, reject) {
    var done = self._done(resolve, self);
    var onOpenComplete = self.config['onOpenComplete'] || angular.noop;
    var addToGroupOpen = function() {
      if (self.config.groupName) {
        angular.forEach(self.config.groupName, function(group) {
          self._$mdPanel._groups[group].openPanels.push(self);
        });
      }
    };

    self._$q.all([
      self._backdropRef ? self._backdropRef.show() : self,
      animatePromise().then(function() { self._focusOnOpen(); }, reject)
    ]).then(onOpenComplete)
      .then(addToGroupOpen)
      .then(done)
      .catch(reject);
  });
};


/**
 * Hides the panel.
 * @returns {!angular.$q.Promise<!MdPanelRef>} A promise that is resolved when
 *     the panel has hidden and animations finish.
 */
MdPanelRef.prototype.hide = function() {
  if (!this.panelContainer) {
    return this._$q(function(resolve, reject) {
      reject('mdPanel: Panel does not exist yet. Call open() or attach().');
    });
  }

  if (this.panelContainer.hasClass(MD_PANEL_HIDDEN)) {
    return this._$q.when(this);
  }

  var self = this;

  return this._$q(function(resolve, reject) {
    var done = self._done(resolve, self);
    var onRemoving = self.config['onRemoving'] || angular.noop;
    var hidePanel = function() {
      self.panelContainer.addClass(MD_PANEL_HIDDEN);
    };
    var removeFromGroupOpen = function() {
      if (self.config.groupName) {
        var group, index;
        angular.forEach(self.config.groupName, function(group) {
          group = self._$mdPanel._groups[group];
          index = group.openPanels.indexOf(self);
          if (index > -1) {
            group.openPanels.splice(index, 1);
          }
        });
      }
    };
    var focusOnOrigin = function() {
      var origin = self.config['origin'];
      if (origin) {
        getElement(origin).focus();
      }
    };

    self._$q.all([
      self._backdropRef ? self._backdropRef.hide() : self,
      self._animateClose()
          .then(onRemoving)
          .then(hidePanel)
          .then(removeFromGroupOpen)
          .then(focusOnOrigin)
          .catch(reject)
    ]).then(done, reject);
  });
};


/**
 * Add a class to the panel. DO NOT use this to hide/show the panel.
 * @deprecated
 * This method is in the process of being deprecated in favor of using the panel
 * and container JQLite elements that are referenced in the MdPanelRef object.
 * Full deprecation is scheduled for material 1.2.
 *
 * @param {string} newClass Class to be added.
 * @param {boolean} toElement Whether or not to add the class to the panel
 *     element instead of the container.
 */
MdPanelRef.prototype.addClass = function(newClass, toElement) {
  this._$log.warn(
      'mdPanel: The addClass method is in the process of being deprecated. ' +
      'Full deprecation is scheduled for the AngularJS Material 1.2 release. ' +
      'To achieve the same results, use the panelContainer or panelEl ' +
      'JQLite elements that are referenced in MdPanelRef.');

  if (!this.panelContainer) {
    throw new Error(
        'mdPanel: Panel does not exist yet. Call open() or attach().');
  }

  if (!toElement && !this.panelContainer.hasClass(newClass)) {
    this.panelContainer.addClass(newClass);
  } else if (toElement && !this.panelEl.hasClass(newClass)) {
    this.panelEl.addClass(newClass);
  }
};


/**
 * Remove a class from the panel. DO NOT use this to hide/show the panel.
 * @deprecated
 * This method is in the process of being deprecated in favor of using the panel
 * and container JQLite elements that are referenced in the MdPanelRef object.
 * Full deprecation is scheduled for material 1.2.
 *
 * @param {string} oldClass Class to be removed.
 * @param {boolean} fromElement Whether or not to remove the class from the
 *     panel element instead of the container.
 */
MdPanelRef.prototype.removeClass = function(oldClass, fromElement) {
  this._$log.warn(
      'mdPanel: The removeClass method is in the process of being deprecated. ' +
      'Full deprecation is scheduled for the AngularJS Material 1.2 release. ' +
      'To achieve the same results, use the panelContainer or panelEl ' +
      'JQLite elements that are referenced in MdPanelRef.');

  if (!this.panelContainer) {
    throw new Error(
        'mdPanel: Panel does not exist yet. Call open() or attach().');
  }

  if (!fromElement && this.panelContainer.hasClass(oldClass)) {
    this.panelContainer.removeClass(oldClass);
  } else if (fromElement && this.panelEl.hasClass(oldClass)) {
    this.panelEl.removeClass(oldClass);
  }
};


/**
 * Toggle a class on the panel. DO NOT use this to hide/show the panel.
 * @deprecated
 * This method is in the process of being deprecated in favor of using the panel
 * and container JQLite elements that are referenced in the MdPanelRef object.
 * Full deprecation is scheduled for material 1.2.
 *
 * @param {string} toggleClass The class to toggle.
 * @param {boolean} onElement Whether or not to toggle the class on the panel
 *     element instead of the container.
 */
MdPanelRef.prototype.toggleClass = function(toggleClass, onElement) {
  this._$log.warn(
      'mdPanel: The toggleClass method is in the process of being deprecated. ' +
      'Full deprecation is scheduled for the AngularJS Material 1.2 release. ' +
      'To achieve the same results, use the panelContainer or panelEl ' +
      'JQLite elements that are referenced in MdPanelRef.');

  if (!this.panelContainer) {
    throw new Error(
        'mdPanel: Panel does not exist yet. Call open() or attach().');
  }

  if (!onElement) {
    this.panelContainer.toggleClass(toggleClass);
  } else {
    this.panelEl.toggleClass(toggleClass);
  }
};


/**
 * Compiles the panel, according to the passed in config and appends it to
 * the DOM. Helps normalize differences in the compilation process between
 * using a string template and a content element.
 * @returns {!angular.$q.Promise<!MdPanelRef>} Promise that is resolved when
 *     the element has been compiled and added to the DOM.
 * @private
 */
MdPanelRef.prototype._compile = function() {
  var self = this;

  // Compile the element via $mdCompiler. Note that when using a
  // contentElement, the element isn't actually being compiled, rather the
  // compiler saves it's place in the DOM and provides a way of restoring it.
  return self._$mdCompiler.compile(self.config).then(function(compileData) {
    var config = self.config;

    if (config.contentElement) {
      var panelEl = compileData.element;

      // Since mdPanel modifies the inline styles and CSS classes, we need
      // to save them in order to be able to restore on close.
      self._restoreCache.styles = panelEl[0].style.cssText;
      self._restoreCache.classes = panelEl[0].className;

      self.panelContainer = self._$mdPanel._wrapContentElement(panelEl);
      self.panelEl = panelEl;
    } else {
      self.panelContainer = compileData.link(config['scope']);
      self.panelEl = angular.element(
        self.panelContainer[0].querySelector('.md-panel')
      );
    }

    // Save a reference to the cleanup function from the compiler.
    self._compilerCleanup = compileData.cleanup;

    // Attach the panel to the proper place in the DOM.
    getElement(self.config['attachTo']).append(self.panelContainer);

    return self;
  });
};


/**
 * Creates a panel and adds it to the dom.
 * @returns {!angular.$q.Promise} A promise that is resolved when the panel is
 *     created.
 * @private
 */
MdPanelRef.prototype._createPanel = function() {
  var self = this;

  return this._$q(function(resolve, reject) {
    if (!self.config.locals) {
      self.config.locals = {};
    }

    self.config.locals.mdPanelRef = self;

    self._compile().then(function() {
      if (self.config['disableParentScroll']) {
        self._restoreScroll = self._$mdUtil.disableScrollAround(
          null,
          self.panelContainer,
          { disableScrollMask: true }
        );
      }

      // Add a custom CSS class to the panel element.
      if (self.config['panelClass']) {
        self.panelEl.addClass(self.config['panelClass']);
      }

      // Handle click and touch events for the panel container.
      if (self.config['propagateContainerEvents']) {
        self.panelContainer.css('pointer-events', 'none');
        self.panelEl.css('pointer-events', 'all');
      }

      // Panel may be outside the $rootElement, tell ngAnimate to animate
      // regardless.
      if (self._$animate.pin) {
        self._$animate.pin(
          self.panelContainer,
          getElement(self.config['attachTo'])
        );
      }

      self._configureTrapFocus();
      self._addStyles().then(function() {
        resolve(self);
      }, reject);
    }, reject);

  });
};


/**
 * Adds the styles for the panel, such as positioning and z-index. Also,
 * themes the panel element and panel container using `$mdTheming`.
 * @returns {!angular.$q.Promise<!MdPanelRef>}
 * @private
 */
MdPanelRef.prototype._addStyles = function() {
  var self = this;
  return this._$q(function(resolve) {
    self.panelContainer.css('z-index', self.config['zIndex']);
    self.panelEl.css('z-index', self.config['zIndex'] + 1);

    var hideAndResolve = function() {
      // Theme the element and container.
      self._setTheming();

      // Remove offscreen class and add hidden class.
      self.panelEl.removeClass('_md-panel-offscreen');
      self.panelContainer.addClass(MD_PANEL_HIDDEN);

      resolve(self);
    };

    if (self.config['fullscreen']) {
      self.panelEl.addClass('_md-panel-fullscreen');
      hideAndResolve();
      return; // Don't setup positioning.
    }

    var positionConfig = self.config['position'];
    if (!positionConfig) {
      hideAndResolve();
      return; // Don't setup positioning.
    }

    // Wait for angular to finish processing the template
    self._$rootScope['$$postDigest'](function() {
      // Position it correctly. This is necessary so that the panel will have a
      // defined height and width.
      self._updatePosition(true);

      // Theme the element and container.
      self._setTheming();

      resolve(self);
    });
  });
};


/**
 * Sets the `$mdTheming` classes on the `panelContainer` and `panelEl`.
 * @private
 */
MdPanelRef.prototype._setTheming = function() {
  this._$mdTheming(this.panelEl);
  this._$mdTheming(this.panelContainer);
};


/**
 * Updates the position configuration of a panel
 * @param {!MdPanelPosition} position
 */
MdPanelRef.prototype.updatePosition = function(position) {
  if (!this.panelContainer) {
    throw new Error(
        'mdPanel: Panel does not exist yet. Call open() or attach().');
  }

  this.config['position'] = position;
  this._updatePosition();
};


/**
 * Calculates and updates the position of the panel.
 * @param {boolean=} init
 * @private
 */
MdPanelRef.prototype._updatePosition = function(init) {
  var positionConfig = this.config['position'];

  if (positionConfig) {
    positionConfig._setPanelPosition(this.panelEl);

    // Hide the panel now that position is known.
    if (init) {
      this.panelEl.removeClass('_md-panel-offscreen');
      this.panelContainer.addClass(MD_PANEL_HIDDEN);
    }

    this.panelEl.css(
      MdPanelPosition.absPosition.TOP,
      positionConfig.getTop()
    );
    this.panelEl.css(
      MdPanelPosition.absPosition.BOTTOM,
      positionConfig.getBottom()
    );
    this.panelEl.css(
      MdPanelPosition.absPosition.LEFT,
      positionConfig.getLeft()
    );
    this.panelEl.css(
      MdPanelPosition.absPosition.RIGHT,
      positionConfig.getRight()
    );
  }
};


/**
 * Focuses on the panel or the first focus target.
 * @private
 */
MdPanelRef.prototype._focusOnOpen = function() {
  if (this.config['focusOnOpen']) {
    // Wait for the template to finish rendering to guarantee md-autofocus has
    // finished adding the class md-autofocus, otherwise the focusable element
    // isn't available to focus.
    var self = this;
    this._$rootScope['$$postDigest'](function() {
      var target = self._$mdUtil.findFocusTarget(self.panelEl) ||
          self.panelEl;
      target.focus();
    });
  }
};


/**
 * Shows the backdrop.
 * @returns {!angular.$q.Promise} A promise that is resolved when the backdrop
 *     is created and attached.
 * @private
 */
MdPanelRef.prototype._createBackdrop = function() {
  if (this.config.hasBackdrop) {
    if (!this._backdropRef) {
      var backdropAnimation = this._$mdPanel.newPanelAnimation()
          .openFrom(this.config.attachTo)
          .withAnimation({
            open: '_md-opaque-enter',
            close: '_md-opaque-leave'
          });

      if (this.config.animation) {
        backdropAnimation.duration(this.config.animation._rawDuration);
      }

      var backdropConfig = {
        animation: backdropAnimation,
        attachTo: this.config.attachTo,
        focusOnOpen: false,
        panelClass: '_md-panel-backdrop',
        zIndex: this.config.zIndex - 1
      };

      this._backdropRef = this._$mdPanel.create(backdropConfig);
    }
    if (!this._backdropRef.isAttached) {
      return this._backdropRef.attach();
    }
  }
};


/**
 * Listen for escape keys and outside clicks to auto close.
 * @private
 */
MdPanelRef.prototype._addEventListeners = function() {
  this._configureEscapeToClose();
  this._configureClickOutsideToClose();
  this._configureScrollListener();
};


/**
 * Remove event listeners added in _addEventListeners.
 * @private
 */
MdPanelRef.prototype._removeEventListeners = function() {
  this._removeListeners && this._removeListeners.forEach(function(removeFn) {
    removeFn();
  });
  this._removeListeners = [];
};


/**
 * Setup the escapeToClose event listeners.
 * @private
 */
MdPanelRef.prototype._configureEscapeToClose = function() {
  if (this.config['escapeToClose']) {
    var parentTarget = getElement(this.config['attachTo']);
    var self = this;

    var keyHandlerFn = function(ev) {
      if (ev.keyCode === self._$mdConstant.KEY_CODE.ESCAPE) {
        ev.stopPropagation();
        ev.preventDefault();

        self.close(MdPanelRef.closeReasons.ESCAPE);
      }
    };

    // Add keydown listeners
    this.panelContainer.on('keydown', keyHandlerFn);
    parentTarget.on('keydown', keyHandlerFn);

    // Queue remove listeners function
    this._removeListeners.push(function() {
      self.panelContainer.off('keydown', keyHandlerFn);
      parentTarget.off('keydown', keyHandlerFn);
    });
  }
};


/**
 * Setup the clickOutsideToClose event listeners.
 * @private
 */
MdPanelRef.prototype._configureClickOutsideToClose = function() {
  if (this.config['clickOutsideToClose']) {
    var target = this.config['propagateContainerEvents'] ?
        angular.element(document.body) :
        this.panelContainer;
    var sourceEl;

    // Keep track of the element on which the mouse originally went down
    // so that we can only close the backdrop when the 'click' started on it.
    // A simple 'click' handler does not work, it sets the target object as the
    // element the mouse went down on.
    var mousedownHandler = function(ev) {
      sourceEl = ev.target;
    };

    // We check if our original element and the target is the backdrop
    // because if the original was the backdrop and the target was inside the
    // panel we don't want to panel to close.
    var self = this;
    var mouseupHandler = function(ev) {
      if (self.config['propagateContainerEvents']) {

        // We check if the sourceEl of the event is the panel element or one
        // of it's children. If it is not, then close the panel.
        if (sourceEl !== self.panelEl[0] && !self.panelEl[0].contains(sourceEl)) {
          self.close();
        }

      } else if (sourceEl === target[0] && ev.target === target[0]) {
        ev.stopPropagation();
        ev.preventDefault();

        self.close(MdPanelRef.closeReasons.CLICK_OUTSIDE);
      }
    };

    // Add listeners
    target.on('mousedown', mousedownHandler);
    target.on('mouseup', mouseupHandler);

    // Queue remove listeners function
    this._removeListeners.push(function() {
      target.off('mousedown', mousedownHandler);
      target.off('mouseup', mouseupHandler);
    });
  }
};


/**
 * Configures the listeners for updating the panel position on scroll.
 * @private
*/
MdPanelRef.prototype._configureScrollListener = function() {
  // No need to bind the event if scrolling is disabled.
  if (!this.config['disableParentScroll']) {
    var updatePosition = angular.bind(this, this._updatePosition);
    var debouncedUpdatePosition = this._$$rAF.throttle(updatePosition);
    var self = this;

    var onScroll = function() {
      debouncedUpdatePosition();
    };

    // Add listeners.
    this._$window.addEventListener('scroll', onScroll, true);

    // Queue remove listeners function.
    this._removeListeners.push(function() {
      self._$window.removeEventListener('scroll', onScroll, true);
    });
  }
};


/**
 * Setup the focus traps. These traps will wrap focus when tabbing past the
 * panel. When shift-tabbing, the focus will stick in place.
 * @private
 */
MdPanelRef.prototype._configureTrapFocus = function() {
  // Focus doesn't remain inside of the panel without this.
  this.panelEl.attr('tabIndex', '-1');
  if (this.config['trapFocus']) {
    var element = this.panelEl;
    // Set up elements before and after the panel to capture focus and
    // redirect back into the panel.
    this._topFocusTrap = FOCUS_TRAP_TEMPLATE.clone()[0];
    this._bottomFocusTrap = FOCUS_TRAP_TEMPLATE.clone()[0];

    // When focus is about to move out of the panel, we want to intercept it
    // and redirect it back to the panel element.
    var focusHandler = function() {
      element.focus();
    };
    this._topFocusTrap.addEventListener('focus', focusHandler);
    this._bottomFocusTrap.addEventListener('focus', focusHandler);

    // Queue remove listeners function
    this._removeListeners.push(this._simpleBind(function() {
      this._topFocusTrap.removeEventListener('focus', focusHandler);
      this._bottomFocusTrap.removeEventListener('focus', focusHandler);
    }, this));

    // The top focus trap inserted immediately before the md-panel element (as
    // a sibling). The bottom focus trap inserted immediately after the
    // md-panel element (as a sibling).
    element[0].parentNode.insertBefore(this._topFocusTrap, element[0]);
    element.after(this._bottomFocusTrap);
  }
};


/**
 * Updates the animation of a panel.
 * @param {!MdPanelAnimation} animation
 */
MdPanelRef.prototype.updateAnimation = function(animation) {
  this.config['animation'] = animation;

  if (this._backdropRef) {
    this._backdropRef.config.animation.duration(animation._rawDuration);
  }
};


/**
 * Animate the panel opening.
 * @returns {!angular.$q.Promise} A promise that is resolved when the panel has
 *     animated open.
 * @private
 */
MdPanelRef.prototype._animateOpen = function() {
  this.panelContainer.addClass('md-panel-is-showing');
  var animationConfig = this.config['animation'];
  if (!animationConfig) {
    // Promise is in progress, return it.
    this.panelContainer.addClass('_md-panel-shown');
    return this._$q.when(this);
  }

  var self = this;
  return this._$q(function(resolve) {
    var done = self._done(resolve, self);
    var warnAndOpen = function() {
      self._$log.warn(
          'mdPanel: MdPanel Animations failed. ' +
          'Showing panel without animating.');
      done();
    };

    animationConfig.animateOpen(self.panelEl)
        .then(done, warnAndOpen);
  });
};


/**
 * Animate the panel closing.
 * @returns {!angular.$q.Promise} A promise that is resolved when the panel has
 *     animated closed.
 * @private
 */
MdPanelRef.prototype._animateClose = function() {
  var animationConfig = this.config['animation'];
  if (!animationConfig) {
    this.panelContainer.removeClass('md-panel-is-showing');
    this.panelContainer.removeClass('_md-panel-shown');
    return this._$q.when(this);
  }

  var self = this;
  return this._$q(function(resolve) {
    var done = function() {
      self.panelContainer.removeClass('md-panel-is-showing');
      resolve(self);
    };
    var warnAndClose = function() {
      self._$log.warn(
          'mdPanel: MdPanel Animations failed. ' +
          'Hiding panel without animating.');
      done();
    };

    animationConfig.animateClose(self.panelEl)
        .then(done, warnAndClose);
  });
};


/**
 * Registers a interceptor with the panel. The callback should return a promise,
 * which will allow the action to continue when it gets resolved, or will
 * prevent an action if it is rejected.
 * @param {string} type Type of interceptor.
 * @param {!angular.$q.Promise<!any>} callback Callback to be registered.
 * @returns {!MdPanelRef}
 */
MdPanelRef.prototype.registerInterceptor = function(type, callback) {
  var error = null;

  if (!angular.isString(type)) {
    error = 'Interceptor type must be a string, instead got ' + typeof type;
  } else if (!angular.isFunction(callback)) {
    error = 'Interceptor callback must be a function, instead got ' + typeof callback;
  }

  if (error) {
    throw new Error('MdPanel: ' + error);
  }

  var interceptors = this._interceptors[type] = this._interceptors[type] || [];

  if (interceptors.indexOf(callback) === -1) {
    interceptors.push(callback);
  }

  return this;
};


/**
 * Removes a registered interceptor.
 * @param {string} type Type of interceptor to be removed.
 * @param {Function} callback Interceptor to be removed.
 * @returns {!MdPanelRef}
 */
MdPanelRef.prototype.removeInterceptor = function(type, callback) {
  var index = this._interceptors[type] ?
    this._interceptors[type].indexOf(callback) : -1;

  if (index > -1) {
    this._interceptors[type].splice(index, 1);
  }

  return this;
};


/**
 * Removes all interceptors.
 * @param {string=} type Type of interceptors to be removed.
 *     If ommited, all interceptors types will be removed.
 * @returns {!MdPanelRef}
 */
MdPanelRef.prototype.removeAllInterceptors = function(type) {
  if (type) {
    this._interceptors[type] = [];
  } else {
    this._interceptors = Object.create(null);
  }

  return this;
};


/**
 * Invokes all the interceptors of a certain type sequantially in
 *     reverse order. Works in a similar way to `$q.all`, except it
 *     respects the order of the functions.
 * @param {string} type Type of interceptors to be invoked.
 * @returns {!angular.$q.Promise<!MdPanelRef>}
 * @private
 */
MdPanelRef.prototype._callInterceptors = function(type) {
  var self = this;
  var $q = self._$q;
  var interceptors = self._interceptors && self._interceptors[type] || [];

  return interceptors.reduceRight(function(promise, interceptor) {
    var isPromiseLike = interceptor && angular.isFunction(interceptor.then);
    var response = isPromiseLike ? interceptor : null;

    /**
    * For interceptors to reject/cancel subsequent portions of the chain, simply
    * return a `$q.reject(<value>)`
    */
    return promise.then(function() {
      if (!response) {
        try {
          response = interceptor(self);
        } catch(e) {
          response = $q.reject(e);
        }
      }

     return response;
    });
  }, $q.resolve(self));
};


/**
 * Faster, more basic than angular.bind
 * http://jsperf.com/angular-bind-vs-custom-vs-native
 * @param {function} callback
 * @param {!Object} self
 * @return {function} Callback function with a bound self.
 */
MdPanelRef.prototype._simpleBind = function(callback, self) {
  return function(value) {
    return callback.apply(self, value);
  };
};


/**
 * @param {function} callback
 * @param {!Object} self
 * @return {function} Callback function with a self param.
 */
MdPanelRef.prototype._done = function(callback, self) {
  return function() {
    callback(self);
  };
};


/**
 * Adds a panel to a group if the panel does not exist within the group already.
 * A panel can only exist within a single group.
 * @param {string} groupName The name of the group.
 */
MdPanelRef.prototype.addToGroup = function(groupName) {
  if (!this._$mdPanel._groups[groupName]) {
    this._$mdPanel.newPanelGroup(groupName);
  }

  var group = this._$mdPanel._groups[groupName];
  var index = group.panels.indexOf(this);

  if (index < 0) {
    group.panels.push(this);
  }
};


/**
 * Removes a panel from a group if the panel exists within that group. The group
 * must be created ahead of time.
 * @param {string} groupName The name of the group.
 */
MdPanelRef.prototype.removeFromGroup = function(groupName) {
  if (!this._$mdPanel._groups[groupName]) {
    throw new Error('mdPanel: The group ' + groupName + ' does not exist.');
  }

  var group = this._$mdPanel._groups[groupName];
  var index = group.panels.indexOf(this);

  if (index > -1) {
    group.panels.splice(index, 1);
  }
};


/**
 * Possible default closeReasons for the close function.
 * @enum {string}
 */
MdPanelRef.closeReasons = {
  CLICK_OUTSIDE: 'clickOutsideToClose',
  ESCAPE: 'escapeToClose',
};


/*****************************************************************************
 *                               MdPanelPosition                             *
 *****************************************************************************/


/**
 * Position configuration object. To use, create an MdPanelPosition with the
 * desired properties, then pass the object as part of $mdPanel creation.
 *
 * Example:
 *
 * var panelPosition = new MdPanelPosition()
 *     .relativeTo(myButtonEl)
 *     .addPanelPosition(
 *       $mdPanel.xPosition.CENTER,
 *       $mdPanel.yPosition.ALIGN_TOPS
 *     );
 *
 * $mdPanel.create({
 *   position: panelPosition
 * });
 *
 * @param {!angular.$injector} $injector
 * @final @constructor
 */
function MdPanelPosition($injector) {
  /** @private @const {!angular.$window} */
  this._$window = $injector.get('$window');

  /** @private {boolean} */
  this._isRTL = $injector.get('$mdUtil').bidi() === 'rtl';

  /** @private @const {!angular.$mdConstant} */
  this._$mdConstant = $injector.get('$mdConstant');

  /** @private {boolean} */
  this._absolute = false;

  /** @private {!angular.JQLite} */
  this._relativeToEl;

  /** @private {string} */
  this._top = '';

  /** @private {string} */
  this._bottom = '';

  /** @private {string} */
  this._left = '';

  /** @private {string} */
  this._right = '';

  /** @private {!Array<string>} */
  this._translateX = [];

  /** @private {!Array<string>} */
  this._translateY = [];

  /** @private {!Array<{x:string, y:string}>} */
  this._positions = [];

  /** @private {?{x:string, y:string}} */
  this._actualPosition;
}


/**
 * Possible values of xPosition.
 * @enum {string}
 */
MdPanelPosition.xPosition = {
  CENTER: 'center',
  ALIGN_START: 'align-start',
  ALIGN_END: 'align-end',
  OFFSET_START: 'offset-start',
  OFFSET_END: 'offset-end'
};


/**
 * Possible values of yPosition.
 * @enum {string}
 */
MdPanelPosition.yPosition = {
  CENTER: 'center',
  ALIGN_TOPS: 'align-tops',
  ALIGN_BOTTOMS: 'align-bottoms',
  ABOVE: 'above',
  BELOW: 'below'
};


/**
 * Possible values of absolute position.
 * @enum {string}
 */
MdPanelPosition.absPosition = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left'
};

/**
 * Margin between the edges of a panel and the viewport.
 * @const {number}
 */
MdPanelPosition.viewportMargin = 8;


/**
 * Sets absolute positioning for the panel.
 * @return {!MdPanelPosition}
 */
MdPanelPosition.prototype.absolute = function() {
  this._absolute = true;
  return this;
};


/**
 * Sets the value of a position for the panel. Clears any previously set
 * position.
 * @param {string} position Position to set
 * @param {string=} value Value of the position. Defaults to '0'.
 * @returns {!MdPanelPosition}
 * @private
 */
MdPanelPosition.prototype._setPosition = function(position, value) {
  if (position === MdPanelPosition.absPosition.RIGHT ||
      position === MdPanelPosition.absPosition.LEFT) {
    this._left = this._right = '';
  } else if (
      position === MdPanelPosition.absPosition.BOTTOM ||
      position === MdPanelPosition.absPosition.TOP) {
    this._top = this._bottom = '';
  } else {
    var positions = Object.keys(MdPanelPosition.absPosition).join()
        .toLowerCase();

    throw new Error('mdPanel: Position must be one of ' + positions + '.');
  }

  this['_' +  position] = angular.isString(value) ? value : '0';

  return this;
};


/**
 * Sets the value of `top` for the panel. Clears any previously set vertical
 * position.
 * @param {string=} top Value of `top`. Defaults to '0'.
 * @returns {!MdPanelPosition}
 */
MdPanelPosition.prototype.top = function(top) {
  return this._setPosition(MdPanelPosition.absPosition.TOP, top);
};


/**
 * Sets the value of `bottom` for the panel. Clears any previously set vertical
 * position.
 * @param {string=} bottom Value of `bottom`. Defaults to '0'.
 * @returns {!MdPanelPosition}
 */
MdPanelPosition.prototype.bottom = function(bottom) {
  return this._setPosition(MdPanelPosition.absPosition.BOTTOM, bottom);
};


/**
 * Sets the panel to the start of the page - `left` if `ltr` or `right` for
 * `rtl`. Clears any previously set horizontal position.
 * @param {string=} start Value of position. Defaults to '0'.
 * @returns {!MdPanelPosition}
 */
MdPanelPosition.prototype.start = function(start) {
  var position = this._isRTL ? MdPanelPosition.absPosition.RIGHT : MdPanelPosition.absPosition.LEFT;
  return this._setPosition(position, start);
};


/**
 * Sets the panel to the end of the page - `right` if `ltr` or `left` for `rtl`.
 * Clears any previously set horizontal position.
 * @param {string=} end Value of position. Defaults to '0'.
 * @returns {!MdPanelPosition}
 */
MdPanelPosition.prototype.end = function(end) {
  var position = this._isRTL ? MdPanelPosition.absPosition.LEFT : MdPanelPosition.absPosition.RIGHT;
  return this._setPosition(position, end);
};


/**
 * Sets the value of `left` for the panel. Clears any previously set
 * horizontal position.
 * @param {string=} left Value of `left`. Defaults to '0'.
 * @returns {!MdPanelPosition}
 */
MdPanelPosition.prototype.left = function(left) {
  return this._setPosition(MdPanelPosition.absPosition.LEFT, left);
};


/**
 * Sets the value of `right` for the panel. Clears any previously set
 * horizontal position.
 * @param {string=} right Value of `right`. Defaults to '0'.
 * @returns {!MdPanelPosition}
*/
MdPanelPosition.prototype.right = function(right) {
  return this._setPosition(MdPanelPosition.absPosition.RIGHT, right);
};


/**
 * Centers the panel horizontally in the viewport. Clears any previously set
 * horizontal position.
 * @returns {!MdPanelPosition}
 */
MdPanelPosition.prototype.centerHorizontally = function() {
  this._left = '50%';
  this._right = '';
  this._translateX = ['-50%'];
  return this;
};


/**
 * Centers the panel vertically in the viewport. Clears any previously set
 * vertical position.
 * @returns {!MdPanelPosition}
 */
MdPanelPosition.prototype.centerVertically = function() {
  this._top = '50%';
  this._bottom = '';
  this._translateY = ['-50%'];
  return this;
};


/**
 * Centers the panel horizontally and vertically in the viewport. This is
 * equivalent to calling both `centerHorizontally` and `centerVertically`.
 * Clears any previously set horizontal and vertical positions.
 * @returns {!MdPanelPosition}
 */
MdPanelPosition.prototype.center = function() {
  return this.centerHorizontally().centerVertically();
};


/**
 * Sets element for relative positioning.
 * @param {string|!Element|!angular.JQLite} element Query selector, DOM element,
 *     or angular element to set the panel relative to.
 * @returns {!MdPanelPosition}
 */
MdPanelPosition.prototype.relativeTo = function(element) {
  this._absolute = false;
  this._relativeToEl = getElement(element);
  return this;
};


/**
 * Sets the x and y positions for the panel relative to another element.
 * @param {string} xPosition must be one of the MdPanelPosition.xPosition
 *     values.
 * @param {string} yPosition must be one of the MdPanelPosition.yPosition
 *     values.
 * @returns {!MdPanelPosition}
 */
MdPanelPosition.prototype.addPanelPosition = function(xPosition, yPosition) {
  if (!this._relativeToEl) {
    throw new Error('mdPanel: addPanelPosition can only be used with ' +
        'relative positioning. Set relativeTo first.');
  }

  this._validateXPosition(xPosition);
  this._validateYPosition(yPosition);

  this._positions.push({
      x: xPosition,
      y: yPosition,
  });
  return this;
};


/**
 * Ensures that yPosition is a valid position name. Throw an exception if not.
 * @param {string} yPosition
 */
MdPanelPosition.prototype._validateYPosition = function(yPosition) {
  // empty is ok
  if (yPosition == null) {
      return;
  }

  var positionKeys = Object.keys(MdPanelPosition.yPosition);
  var positionValues = [];
  for (var key, i = 0; key = positionKeys[i]; i++) {
    var position = MdPanelPosition.yPosition[key];
    positionValues.push(position);

    if (position === yPosition) {
      return;
    }
  }

  throw new Error('mdPanel: Panel y position only accepts the following ' +
      'values:\n' + positionValues.join(' | '));
};


/**
 * Ensures that xPosition is a valid position name. Throw an exception if not.
 * @param {string} xPosition
 */
MdPanelPosition.prototype._validateXPosition = function(xPosition) {
  // empty is ok
  if (xPosition == null) {
      return;
  }

  var positionKeys = Object.keys(MdPanelPosition.xPosition);
  var positionValues = [];
  for (var key, i = 0; key = positionKeys[i]; i++) {
    var position = MdPanelPosition.xPosition[key];
    positionValues.push(position);
    if (position === xPosition) {
      return;
    }
  }

  throw new Error('mdPanel: Panel x Position only accepts the following ' +
      'values:\n' + positionValues.join(' | '));
};


/**
 * Sets the value of the offset in the x-direction. This will add to any
 * previously set offsets.
 * @param {string|number|function(MdPanelPosition): string} offsetX
 * @returns {!MdPanelPosition}
 */
MdPanelPosition.prototype.withOffsetX = function(offsetX) {
  this._translateX.push(addUnits(offsetX));
  return this;
};


/**
 * Sets the value of the offset in the y-direction. This will add to any
 * previously set offsets.
 * @param {string|number|function(MdPanelPosition): string} offsetY
 * @returns {!MdPanelPosition}
 */
MdPanelPosition.prototype.withOffsetY = function(offsetY) {
  this._translateY.push(addUnits(offsetY));
  return this;
};


/**
 * Gets the value of `top` for the panel.
 * @returns {string}
 */
MdPanelPosition.prototype.getTop = function() {
  return this._top;
};


/**
 * Gets the value of `bottom` for the panel.
 * @returns {string}
 */
MdPanelPosition.prototype.getBottom = function() {
  return this._bottom;
};


/**
 * Gets the value of `left` for the panel.
 * @returns {string}
 */
MdPanelPosition.prototype.getLeft = function() {
  return this._left;
};


/**
 * Gets the value of `right` for the panel.
 * @returns {string}
 */
MdPanelPosition.prototype.getRight = function() {
  return this._right;
};


/**
 * Gets the value of `transform` for the panel.
 * @returns {string}
 */
MdPanelPosition.prototype.getTransform = function() {
  var translateX = this._reduceTranslateValues('translateX', this._translateX);
  var translateY = this._reduceTranslateValues('translateY', this._translateY);

  // It's important to trim the result, because the browser will ignore the set
  // operation if the string contains only whitespace.
  return (translateX + ' ' + translateY).trim();
};


/**
 * Sets the `transform` value for a panel element.
 * @param {!angular.JQLite} panelEl
 * @returns {!angular.JQLite}
 * @private
 */
MdPanelPosition.prototype._setTransform = function(panelEl) {
  return panelEl.css(this._$mdConstant.CSS.TRANSFORM, this.getTransform());
};


/**
 * True if the panel is completely on-screen with this positioning; false
 * otherwise.
 * @param {!angular.JQLite} panelEl
 * @return {boolean}
 * @private
 */
MdPanelPosition.prototype._isOnscreen = function(panelEl) {
  // this works because we always use fixed positioning for the panel,
  // which is relative to the viewport.
  var left = parseInt(this.getLeft());
  var top = parseInt(this.getTop());

  if (this._translateX.length || this._translateY.length) {
    var prefixedTransform = this._$mdConstant.CSS.TRANSFORM;
    var offsets = getComputedTranslations(panelEl, prefixedTransform);
    left += offsets.x;
    top += offsets.y;
  }

  var right = left + panelEl[0].offsetWidth;
  var bottom = top + panelEl[0].offsetHeight;

  return (left >= 0) &&
    (top >= 0) &&
    (bottom <= this._$window.innerHeight) &&
    (right <= this._$window.innerWidth);
};


/**
 * Gets the first x/y position that can fit on-screen.
 * @returns {{x: string, y: string}}
 */
MdPanelPosition.prototype.getActualPosition = function() {
  return this._actualPosition;
};


/**
 * Reduces a list of translate values to a string that can be used within
 * transform.
 * @param {string} translateFn
 * @param {!Array<string>} values
 * @returns {string}
 * @private
 */
MdPanelPosition.prototype._reduceTranslateValues =
    function(translateFn, values) {
      return values.map(function(translation) {
        var translationValue = angular.isFunction(translation) ?
            addUnits(translation(this)) : translation;
        return translateFn + '(' + translationValue + ')';
      }, this).join(' ');
    };


/**
 * Sets the panel position based on the created panel element and best x/y
 * positioning.
 * @param {!angular.JQLite} panelEl
 * @private
 */
MdPanelPosition.prototype._setPanelPosition = function(panelEl) {
  // Remove the "position adjusted" class in case it has been added before.
  panelEl.removeClass('_md-panel-position-adjusted');

  // Only calculate the position if necessary.
  if (this._absolute) {
    this._setTransform(panelEl);
    return;
  }

  if (this._actualPosition) {
    this._calculatePanelPosition(panelEl, this._actualPosition);
    this._setTransform(panelEl);
    this._constrainToViewport(panelEl);
    return;
  }

  for (var i = 0; i < this._positions.length; i++) {
    this._actualPosition = this._positions[i];
    this._calculatePanelPosition(panelEl, this._actualPosition);
    this._setTransform(panelEl);

    if (this._isOnscreen(panelEl)) {
      return;
    }
  }

  this._constrainToViewport(panelEl);
};


/**
 * Constrains a panel's position to the viewport.
 * @param {!angular.JQLite} panelEl
 * @private
 */
MdPanelPosition.prototype._constrainToViewport = function(panelEl) {
  var margin = MdPanelPosition.viewportMargin;
  var initialTop = this._top;
  var initialLeft = this._left;

  if (this.getTop()) {
    var top = parseInt(this.getTop());
    var bottom = panelEl[0].offsetHeight + top;
    var viewportHeight = this._$window.innerHeight;

    if (top < margin) {
      this._top = margin + 'px';
    } else if (bottom > viewportHeight) {
      this._top = top - (bottom - viewportHeight + margin) + 'px';
    }
  }

  if (this.getLeft()) {
    var left = parseInt(this.getLeft());
    var right = panelEl[0].offsetWidth + left;
    var viewportWidth = this._$window.innerWidth;

    if (left < margin) {
      this._left = margin + 'px';
    } else if (right > viewportWidth) {
      this._left = left - (right - viewportWidth + margin) + 'px';
    }
  }

  // Class that can be used to re-style the panel if it was repositioned.
  panelEl.toggleClass(
    '_md-panel-position-adjusted',
    this._top !== initialTop || this._left !== initialLeft
  );
};


/**
 * Switches between 'start' and 'end'.
 * @param {string} position Horizontal position of the panel
 * @returns {string} Reversed position
 * @private
 */
MdPanelPosition.prototype._reverseXPosition = function(position) {
  if (position === MdPanelPosition.xPosition.CENTER) {
    return position;
  }

  var start = 'start';
  var end = 'end';

  return position.indexOf(start) > -1 ? position.replace(start, end) : position.replace(end, start);
};


/**
 * Handles horizontal positioning in rtl or ltr environments.
 * @param {string} position Horizontal position of the panel
 * @returns {string} The correct position according the page direction
 * @private
 */
MdPanelPosition.prototype._bidi = function(position) {
  return this._isRTL ? this._reverseXPosition(position) : position;
};


/**
 * Calculates the panel position based on the created panel element and the
 * provided positioning.
 * @param {!angular.JQLite} panelEl
 * @param {!{x:string, y:string}} position
 * @private
 */
MdPanelPosition.prototype._calculatePanelPosition = function(panelEl, position) {

  var panelBounds = panelEl[0].getBoundingClientRect();
  var panelWidth = Math.max(panelBounds.width, panelEl[0].clientWidth);
  var panelHeight = Math.max(panelBounds.height, panelEl[0].clientHeight);

  var targetBounds = this._relativeToEl[0].getBoundingClientRect();

  var targetLeft = targetBounds.left;
  var targetRight = targetBounds.right;
  var targetWidth = targetBounds.width;

  switch (this._bidi(position.x)) {
    case MdPanelPosition.xPosition.OFFSET_START:
      this._left = targetLeft - panelWidth + 'px';
      break;
    case MdPanelPosition.xPosition.ALIGN_END:
      this._left = targetRight - panelWidth + 'px';
      break;
    case MdPanelPosition.xPosition.CENTER:
      var left = targetLeft + (0.5 * targetWidth) - (0.5 * panelWidth);
      this._left = left + 'px';
      break;
    case MdPanelPosition.xPosition.ALIGN_START:
      this._left = targetLeft + 'px';
      break;
    case MdPanelPosition.xPosition.OFFSET_END:
      this._left = targetRight + 'px';
      break;
  }

  var targetTop = targetBounds.top;
  var targetBottom = targetBounds.bottom;
  var targetHeight = targetBounds.height;

  switch (position.y) {
    case MdPanelPosition.yPosition.ABOVE:
      this._top = targetTop - panelHeight + 'px';
      break;
    case MdPanelPosition.yPosition.ALIGN_BOTTOMS:
      this._top = targetBottom - panelHeight + 'px';
      break;
    case MdPanelPosition.yPosition.CENTER:
      var top = targetTop + (0.5 * targetHeight) - (0.5 * panelHeight);
      this._top = top + 'px';
      break;
    case MdPanelPosition.yPosition.ALIGN_TOPS:
      this._top = targetTop + 'px';
      break;
    case MdPanelPosition.yPosition.BELOW:
      this._top = targetBottom + 'px';
      break;
  }
};


/*****************************************************************************
 *                               MdPanelAnimation                            *
 *****************************************************************************/


/**
 * Animation configuration object. To use, create an MdPanelAnimation with the
 * desired properties, then pass the object as part of $mdPanel creation.
 *
 * Example:
 *
 * var panelAnimation = new MdPanelAnimation()
 *     .openFrom(myButtonEl)
 *     .closeTo('.my-button')
 *     .withAnimation($mdPanel.animation.SCALE);
 *
 * $mdPanel.create({
 *   animation: panelAnimation
 * });
 *
 * @param {!angular.$injector} $injector
 * @final @constructor
 */
function MdPanelAnimation($injector) {
  /** @private @const {!angular.$mdUtil} */
  this._$mdUtil = $injector.get('$mdUtil');

  /**
   * @private {{element: !angular.JQLite|undefined, bounds: !DOMRect}|
   *     undefined}
   */
  this._openFrom;

  /**
   * @private {{element: !angular.JQLite|undefined, bounds: !DOMRect}|
   *     undefined}
   */
  this._closeTo;

  /** @private {string|{open: string, close: string}} */
  this._animationClass = '';

  /** @private {number} */
  this._openDuration;

  /** @private {number} */
  this._closeDuration;

  /** @private {number|{open: number, close: number}} */
  this._rawDuration;
}


/**
 * Possible default animations.
 * @enum {string}
 */
MdPanelAnimation.animation = {
  SLIDE: 'md-panel-animate-slide',
  SCALE: 'md-panel-animate-scale',
  FADE: 'md-panel-animate-fade'
};


/**
 * Specifies where to start the open animation. `openFrom` accepts a
 * click event object, query selector, DOM element, or a Rect object that
 * is used to determine the bounds. When passed a click event, the location
 * of the click will be used as the position to start the animation.
 * @param {string|!Element|!Event|{top: number, left: number}} openFrom
 * @returns {!MdPanelAnimation}
 */
MdPanelAnimation.prototype.openFrom = function(openFrom) {
  // Check if 'openFrom' is an Event.
  openFrom = openFrom.target ? openFrom.target : openFrom;

  this._openFrom = this._getPanelAnimationTarget(openFrom);

  if (!this._closeTo) {
    this._closeTo = this._openFrom;
  }
  return this;
};


/**
 * Specifies where to animate the panel close. `closeTo` accepts a
 * query selector, DOM element, or a Rect object that is used to determine
 * the bounds.
 * @param {string|!Element|{top: number, left: number}} closeTo
 * @returns {!MdPanelAnimation}
 */
MdPanelAnimation.prototype.closeTo = function(closeTo) {
  this._closeTo = this._getPanelAnimationTarget(closeTo);
  return this;
};


/**
 * Specifies the duration of the animation in milliseconds.
 * @param {number|{open: number, close: number}} duration
 * @returns {!MdPanelAnimation}
 */
MdPanelAnimation.prototype.duration = function(duration) {
  if (duration) {
    if (angular.isNumber(duration)) {
      this._openDuration = this._closeDuration = toSeconds(duration);
    } else if (angular.isObject(duration)) {
      this._openDuration = toSeconds(duration.open);
      this._closeDuration = toSeconds(duration.close);
    }
  }

  // Save the original value so it can be passed to the backdrop.
  this._rawDuration = duration;

  return this;

  function toSeconds(value) {
    if (angular.isNumber(value)) return value / 1000;
  }
};


/**
 * Returns the element and bounds for the animation target.
 * @param {string|!Element|{top: number, left: number}} location
 * @returns {{element: !angular.JQLite|undefined, bounds: !DOMRect}}
 * @private
 */
MdPanelAnimation.prototype._getPanelAnimationTarget = function(location) {
  if (angular.isDefined(location.top) || angular.isDefined(location.left)) {
    return {
      element: undefined,
      bounds: {
        top: location.top || 0,
        left: location.left || 0
      }
    };
  } else {
    return this._getBoundingClientRect(getElement(location));
  }
};


/**
 * Specifies the animation class.
 *
 * There are several default animations that can be used:
 * (MdPanelAnimation.animation)
 *   SLIDE: The panel slides in and out from the specified
 *        elements.
 *   SCALE: The panel scales in and out.
 *   FADE: The panel fades in and out.
 *
 * @param {string|{open: string, close: string}} cssClass
 * @returns {!MdPanelAnimation}
 */
MdPanelAnimation.prototype.withAnimation = function(cssClass) {
  this._animationClass = cssClass;
  return this;
};


/**
 * Animate the panel open.
 * @param {!angular.JQLite} panelEl
 * @returns {!angular.$q.Promise} A promise that is resolved when the open
 *     animation is complete.
 */
MdPanelAnimation.prototype.animateOpen = function(panelEl) {
  var animator = this._$mdUtil.dom.animator;

  this._fixBounds(panelEl);
  var animationOptions = {};

  // Include the panel transformations when calculating the animations.
  var panelTransform = panelEl[0].style.transform || '';

  var openFrom = animator.toTransformCss(panelTransform);
  var openTo = animator.toTransformCss(panelTransform);

  switch (this._animationClass) {
    case MdPanelAnimation.animation.SLIDE:
      // Slide should start with opacity: 1.
      panelEl.css('opacity', '1');

      animationOptions = {
        transitionInClass: '_md-panel-animate-enter'
      };

      var openSlide = animator.calculateSlideToOrigin(
              panelEl, this._openFrom) || '';
      openFrom = animator.toTransformCss(openSlide + ' ' + panelTransform);
      break;

    case MdPanelAnimation.animation.SCALE:
      animationOptions = {
        transitionInClass: '_md-panel-animate-enter'
      };

      var openScale = animator.calculateZoomToOrigin(
              panelEl, this._openFrom) || '';
      openFrom = animator.toTransformCss(openScale + ' ' + panelTransform);
      break;

    case MdPanelAnimation.animation.FADE:
      animationOptions = {
        transitionInClass: '_md-panel-animate-enter'
      };
      break;

    default:
      if (angular.isString(this._animationClass)) {
        animationOptions = {
          transitionInClass: this._animationClass
        };
      } else {
        animationOptions = {
          transitionInClass: this._animationClass['open'],
          transitionOutClass: this._animationClass['close'],
        };
      }
  }

  animationOptions.duration = this._openDuration;

  return animator
      .translate3d(panelEl, openFrom, openTo, animationOptions);
};


/**
 * Animate the panel close.
 * @param {!angular.JQLite} panelEl
 * @returns {!angular.$q.Promise} A promise that resolves when the close
 *     animation is complete.
 */
MdPanelAnimation.prototype.animateClose = function(panelEl) {
  var animator = this._$mdUtil.dom.animator;
  var reverseAnimationOptions = {};

  // Include the panel transformations when calculating the animations.
  var panelTransform = panelEl[0].style.transform || '';

  var closeFrom = animator.toTransformCss(panelTransform);
  var closeTo = animator.toTransformCss(panelTransform);

  switch (this._animationClass) {
    case MdPanelAnimation.animation.SLIDE:
      // Slide should start with opacity: 1.
      panelEl.css('opacity', '1');
      reverseAnimationOptions = {
        transitionInClass: '_md-panel-animate-leave'
      };

      var closeSlide = animator.calculateSlideToOrigin(
              panelEl, this._closeTo) || '';
      closeTo = animator.toTransformCss(closeSlide + ' ' + panelTransform);
      break;

    case MdPanelAnimation.animation.SCALE:
      reverseAnimationOptions = {
        transitionInClass: '_md-panel-animate-scale-out _md-panel-animate-leave'
      };

      var closeScale = animator.calculateZoomToOrigin(
              panelEl, this._closeTo) || '';
      closeTo = animator.toTransformCss(closeScale + ' ' + panelTransform);
      break;

    case MdPanelAnimation.animation.FADE:
      reverseAnimationOptions = {
        transitionInClass: '_md-panel-animate-fade-out _md-panel-animate-leave'
      };
      break;

    default:
      if (angular.isString(this._animationClass)) {
        reverseAnimationOptions = {
          transitionOutClass: this._animationClass
        };
      } else {
        reverseAnimationOptions = {
          transitionInClass: this._animationClass['close'],
          transitionOutClass: this._animationClass['open']
        };
      }
  }

  reverseAnimationOptions.duration = this._closeDuration;

  return animator
      .translate3d(panelEl, closeFrom, closeTo, reverseAnimationOptions);
};


/**
 * Set the height and width to match the panel if not provided.
 * @param {!angular.JQLite} panelEl
 * @private
 */
MdPanelAnimation.prototype._fixBounds = function(panelEl) {
  var panelWidth = panelEl[0].offsetWidth;
  var panelHeight = panelEl[0].offsetHeight;

  if (this._openFrom && this._openFrom.bounds.height == null) {
    this._openFrom.bounds.height = panelHeight;
  }
  if (this._openFrom && this._openFrom.bounds.width == null) {
    this._openFrom.bounds.width = panelWidth;
  }
  if (this._closeTo && this._closeTo.bounds.height == null) {
    this._closeTo.bounds.height = panelHeight;
  }
  if (this._closeTo && this._closeTo.bounds.width == null) {
    this._closeTo.bounds.width = panelWidth;
  }
};


/**
 * Identify the bounding RECT for the target element.
 * @param {!angular.JQLite} element
 * @returns {{element: !angular.JQLite|undefined, bounds: !DOMRect}}
 * @private
 */
MdPanelAnimation.prototype._getBoundingClientRect = function(element) {
  if (element instanceof angular.element) {
    return {
      element: element,
      bounds: element[0].getBoundingClientRect()
    };
  }
};


/*****************************************************************************
 *                                Util Methods                               *
 *****************************************************************************/


/**
 * Returns the angular element associated with a css selector or element.
 * @param el {string|!angular.JQLite|!Element}
 * @returns {!angular.JQLite}
 */
function getElement(el) {
  var queryResult = angular.isString(el) ?
      document.querySelector(el) : el;
  return angular.element(queryResult);
}

/**
 * Gets the computed values for an element's translateX and translateY in px.
 * @param {!angular.JQLite|!Element} el
 * @param {string} property
 * @return {{x: number, y: number}}
 */
function getComputedTranslations(el, property) {
  // The transform being returned by `getComputedStyle` is in the format:
  // `matrix(a, b, c, d, translateX, translateY)` if defined and `none`
  // if the element doesn't have a transform.
  var transform = getComputedStyle(el[0] || el)[property];
  var openIndex = transform.indexOf('(');
  var closeIndex = transform.lastIndexOf(')');
  var output = { x: 0, y: 0 };

  if (openIndex > -1 && closeIndex > -1) {
    var parsedValues = transform
      .substring(openIndex + 1, closeIndex)
      .split(', ')
      .slice(-2);

    output.x = parseInt(parsedValues[0]);
    output.y = parseInt(parsedValues[1]);
  }

  return output;
}

/**
 * Adds units to a number value.
 * @param {string|number} value
 * @return {string}
 */
function addUnits(value) {
  return angular.isNumber(value) ? value + 'px' : value;
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.progressLinear
 * @description Linear Progress module!
 */
MdProgressLinearDirective.$inject = ["$mdTheming", "$mdUtil", "$log"];
angular.module('material.components.progressLinear', [
  'material.core'
])
  .directive('mdProgressLinear', MdProgressLinearDirective);

/**
 * @ngdoc directive
 * @name mdProgressLinear
 * @module material.components.progressLinear
 * @restrict E
 *
 * @description
 * The linear progress directive is used to make loading content
 * in your app as delightful and painless as possible by minimizing
 * the amount of visual change a user sees before they can view
 * and interact with content.
 *
 * Each operation should only be represented by one activity indicator
 * For example: one refresh operation should not display both a
 * refresh bar and an activity circle.
 *
 * For operations where the percentage of the operation completed
 * can be determined, use a determinate indicator. They give users
 * a quick sense of how long an operation will take.
 *
 * For operations where the user is asked to wait a moment while
 * something finishes up, and it’s not necessary to expose what's
 * happening behind the scenes and how long it will take, use an
 * indeterminate indicator.
 *
 * @param {string} md-mode Select from one of four modes: determinate, indeterminate, buffer or query.
 *
 * Note: if the `md-mode` value is set as undefined or specified as 1 of the four (4) valid modes, then `indeterminate`
 * will be auto-applied as the mode.
 *
 * Note: if not configured, the `md-mode="indeterminate"` will be auto injected as an attribute. If `value=""` is also specified, however,
 * then `md-mode="determinate"` would be auto-injected instead.
 * @param {number=} value In determinate and buffer modes, this number represents the percentage of the primary progress bar. Default: 0
 * @param {number=} md-buffer-value In the buffer mode, this number represents the percentage of the secondary progress bar. Default: 0
 * @param {boolean=} ng-disabled Determines whether to disable the progress element.
 *
 * @usage
 * <hljs lang="html">
 * <md-progress-linear md-mode="determinate" value="..."></md-progress-linear>
 *
 * <md-progress-linear md-mode="determinate" ng-value="..."></md-progress-linear>
 *
 * <md-progress-linear md-mode="indeterminate"></md-progress-linear>
 *
 * <md-progress-linear md-mode="buffer" value="..." md-buffer-value="..."></md-progress-linear>
 *
 * <md-progress-linear md-mode="query"></md-progress-linear>
 * </hljs>
 */
function MdProgressLinearDirective($mdTheming, $mdUtil, $log) {
  var MODE_DETERMINATE = "determinate";
  var MODE_INDETERMINATE = "indeterminate";
  var MODE_BUFFER = "buffer";
  var MODE_QUERY = "query";
  var DISABLED_CLASS = "_md-progress-linear-disabled";

  return {
    restrict: 'E',
    template: '<div class="md-container">' +
      '<div class="md-dashed"></div>' +
      '<div class="md-bar md-bar1"></div>' +
      '<div class="md-bar md-bar2"></div>' +
      '</div>',
    compile: compile
  };

  function compile(tElement, tAttrs, transclude) {
    tElement.attr('aria-valuemin', 0);
    tElement.attr('aria-valuemax', 100);
    tElement.attr('role', 'progressbar');

    return postLink;
  }
  function postLink(scope, element, attr) {
    $mdTheming(element);

    var lastMode;
    var isDisabled = attr.hasOwnProperty('disabled');
    var toVendorCSS = $mdUtil.dom.animator.toCss;
    var bar1 = angular.element(element[0].querySelector('.md-bar1'));
    var bar2 = angular.element(element[0].querySelector('.md-bar2'));
    var container = angular.element(element[0].querySelector('.md-container'));

    element
      .attr('md-mode', mode())
      .toggleClass(DISABLED_CLASS, isDisabled);

    validateMode();
    watchAttributes();

    /**
     * Watch the value, md-buffer-value, and md-mode attributes
     */
    function watchAttributes() {
      attr.$observe('value', function(value) {
        var percentValue = clamp(value);
        element.attr('aria-valuenow', percentValue);

        if (mode() != MODE_QUERY) animateIndicator(bar2, percentValue);
      });

      attr.$observe('mdBufferValue', function(value) {
        animateIndicator(bar1, clamp(value));
      });

      attr.$observe('disabled', function(value) {
        if (value === true || value === false) {
          isDisabled = !!value;
        } else {
          isDisabled = angular.isDefined(value);
        }

        element.toggleClass(DISABLED_CLASS, isDisabled);
        container.toggleClass(lastMode, !isDisabled);
      });

      attr.$observe('mdMode', function(mode) {
        if (lastMode) container.removeClass( lastMode );

        switch( mode ) {
          case MODE_QUERY:
          case MODE_BUFFER:
          case MODE_DETERMINATE:
          case MODE_INDETERMINATE:
            container.addClass( lastMode = "md-mode-" + mode );
            break;
          default:
            container.addClass( lastMode = "md-mode-" + MODE_INDETERMINATE );
            break;
        }
      });
    }

    /**
     * Auto-defaults the mode to either `determinate` or `indeterminate` mode; if not specified
     */
    function validateMode() {
      if ( angular.isUndefined(attr.mdMode) ) {
        var hasValue = angular.isDefined(attr.value);
        var mode = hasValue ? MODE_DETERMINATE : MODE_INDETERMINATE;
        var info = "Auto-adding the missing md-mode='{0}' to the ProgressLinear element";

        //$log.debug( $mdUtil.supplant(info, [mode]) );

        element.attr("md-mode", mode);
        attr.mdMode = mode;
      }
    }

    /**
     * Is the md-mode a valid option?
     */
    function mode() {
      var value = (attr.mdMode || "").trim();
      if ( value ) {
        switch(value) {
          case MODE_DETERMINATE:
          case MODE_INDETERMINATE:
          case MODE_BUFFER:
          case MODE_QUERY:
            break;
          default:
            value = MODE_INDETERMINATE;
            break;
        }
      }
      return value;
    }

    /**
     * Manually set CSS to animate the Determinate indicator based on the specified
     * percentage value (0-100).
     */
    function animateIndicator(target, value) {
      if ( isDisabled || !mode() ) return;

      var to = $mdUtil.supplant("translateX({0}%) scale({1},1)", [ (value-100)/2, value/100 ]);
      var styles = toVendorCSS({ transform : to });
      angular.element(target).css( styles );
    }
  }

  /**
   * Clamps the value to be between 0 and 100.
   * @param {number} value The value to clamp.
   * @returns {number}
   */
  function clamp(value) {
    return Math.max(0, Math.min(value || 0, 100));
  }
}


})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.showHide
 */

// Add additional handlers to ng-show and ng-hide that notify directives
// contained within that they should recompute their size.
// These run in addition to AngularJS's built-in ng-hide and ng-show directives.
angular.module('material.components.showHide', [
  'material.core'
])
  .directive('ngShow', createDirective('ngShow', true))
  .directive('ngHide', createDirective('ngHide', false));


function createDirective(name, targetValue) {
  return ['$mdUtil', '$window', function($mdUtil, $window) {
    return {
      restrict: 'A',
      multiElement: true,
      link: function($scope, $element, $attr) {
        var unregister = $scope.$on('$md-resize-enable', function() {
          unregister();

          var node = $element[0];
          var cachedTransitionStyles = node.nodeType === $window.Node.ELEMENT_NODE ?
            $window.getComputedStyle(node) : {};

          $scope.$watch($attr[name], function(value) {
            if (!!value === targetValue) {
              $mdUtil.nextTick(function() {
                $scope.$broadcast('$md-resize');
              });

              var opts = {
                cachedTransitionStyles: cachedTransitionStyles
              };

              $mdUtil.dom.animator.waitTransitionEnd($element, opts).then(function() {
                $scope.$broadcast('$md-resize');
              });
            }
          });
        });
      }
    };
  }];
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.sidenav
 *
 * @description
 * A Sidenav QP component.
 */
SidenavService.$inject = ["$mdComponentRegistry", "$mdUtil", "$q", "$log"];
angular
    .module('material.components.sidenav', [
        'material.core',
        'material.components.backdrop'
    ])
    .factory('$mdSidenav', SidenavService );


/**
 * @ngdoc service
 * @name $mdSidenav
 * @module material.components.sidenav
 *
 * @description
 * `$mdSidenav` makes it easy to interact with multiple sidenavs
 * in an app. When looking up a sidenav instance, you can either look
 * it up synchronously or wait for it to be initializied asynchronously.
 * This is done by passing the second argument to `$mdSidenav`.
 *
 * @usage
 * <hljs lang="js">
 * // Async lookup for sidenav instance; will resolve when the instance is available
 * $mdSidenav(componentId, true).then(function(instance) {
 *   $log.debug( componentId + "is now ready" );
 * });
 * // Sync lookup for sidenav instance; this will resolve immediately.
 * $mdSidenav(componentId).then(function(instance) {
 *   $log.debug( componentId + "is now ready" );
 * });
 * // Async toggle the given sidenav;
 * // when instance is known ready and lazy lookup is not needed.
 * $mdSidenav(componentId)
 *    .toggle()
 *    .then(function(){
 *      $log.debug('toggled');
 *    });
 * // Async open the given sidenav
 * $mdSidenav(componentId)
 *    .open()
 *    .then(function(){
 *      $log.debug('opened');
 *    });
 * // Async close the given sidenav
 * $mdSidenav(componentId)
 *    .close()
 *    .then(function(){
 *      $log.debug('closed');
 *    });
 * // Async lookup for sidenav instance
 * $mdSidenav(componentId, true).then(function(instance) {
 *   // On close callback to handle close, backdrop click, or escape key pressed.
 *   // Callback happens BEFORE the close action occurs.
 *   instance.onClose(function() {
 *     $log.debug('closing');
 *   });
 * });
 * // Sync check to see if the specified sidenav is set to be open
 * $mdSidenav(componentId).isOpen();
 * // Sync check to whether given sidenav is locked open
 * // If this is true, the sidenav will be open regardless of close()
 * $mdSidenav(componentId).isLockedOpen();
 * </hljs>
 */
function SidenavService($mdComponentRegistry, $mdUtil, $q, $log) {
    var errorMsg = "SideNav '{0}' is not available! Did you use md-component-id='{0}'?";
    var service = {
        find    : findInstance,     //  sync  - returns proxy API
        waitFor : waitForInstance   //  async - returns promise
    };

    /**
     * Service API that supports three (3) usages:
     *   $mdSidenav().find("left")                       // sync (must already exist) or returns undefined
     *   $mdSidenav("left").toggle();                    // sync (must already exist) or returns reject promise;
     *   $mdSidenav("left",true).then( function(left){   // async returns instance when available
   *    left.toggle();
   *   });
     */
    return function(handle, enableWait) {
        if ( angular.isUndefined(handle) ) return service;

        var shouldWait = enableWait === true;
        var instance = service.find(handle, shouldWait);
        return  !instance && shouldWait ? service.waitFor(handle) :
            !instance && angular.isUndefined(enableWait) ? addLegacyAPI(service, handle) : instance;
    };

    /**
     * For failed instance/handle lookups, older-clients expect an response object with noops
     * that include `rejected promise APIs`
     */
    function addLegacyAPI(service, handle) {
        var falseFn  = function() { return false; };
        var rejectFn = function() {
            return $q.when($mdUtil.supplant(errorMsg, [handle || ""]));
        };

        return angular.extend({
            isLockedOpen : falseFn,
            isOpen       : falseFn,
            toggle       : rejectFn,
            open         : rejectFn,
            close        : rejectFn,
            onClose      : angular.noop,
            then : function(callback) {
                return waitForInstance(handle)
                    .then(callback || angular.noop);
            }
        }, service);
    }
    /**
     * Synchronously lookup the controller instance for the specified sidNav instance which has been
     * registered with the markup `md-component-id`
     */
    function findInstance(handle, shouldWait) {
        var instance = $mdComponentRegistry.get(handle);

        if (!instance && !shouldWait) {

            // Report missing instance
            $log.error( $mdUtil.supplant(errorMsg, [handle || ""]) );

            // The component has not registered itself... most like NOT yet created
            // return null to indicate that the Sidenav is not in the DOM
            return undefined;
        }
        return instance;
    }

    /**
     * Asynchronously wait for the component instantiation,
     * Deferred lookup of component instance using $component registry
     */
    function waitForInstance(handle) {
        return $mdComponentRegistry.when(handle).catch($log.error);
    }
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.slider
 */
SliderDirective.$inject = ["$$rAF", "$window", "$mdAria", "$mdUtil", "$mdConstant", "$mdTheming", "$mdGesture", "$parse", "$log", "$timeout"];
angular.module('material.components.slider', [
  'material.core'
])
.directive('mdSlider', SliderDirective)
.directive('mdSliderContainer', SliderContainerDirective);

/**
 * @ngdoc directive
 * @name mdSliderContainer
 * @module material.components.slider
 * @restrict E
 * @description
 * The `<md-slider-container>` can hold the slider with two other elements.
 * In this case, the other elements are a `span` for the label and an `input` for displaying
 * the model value.
 *
 * @usage
 * <hljs lang="html">
 *  <md-slider-container>
 *    <span>Red</span>
 *    <md-slider min="0" max="255" ng-model="color.red" aria-label="red" id="red-slider">
 *    </md-slider>
 *    <md-input-container>
 *      <input type="number" ng-model="color.red" aria-label="Red" aria-controls="red-slider">
 *    </md-input-container>
 *  </md-slider-container>
 * </hljs>
 */
function SliderContainerDirective() {
  return {
    controller: function () {},
    compile: function (elem) {
      var slider = elem.find('md-slider');

      if (!slider) {
        return;
      }

      var vertical = slider.attr('md-vertical');

      if (vertical !== undefined) {
        elem.attr('md-vertical', '');
      }

      if(!slider.attr('flex')) {
        slider.attr('flex', '');
      }

      return function postLink(scope, element, attr, ctrl) {
        element.addClass('_md');     // private md component indicator for styling

        // We have to manually stop the $watch on ngDisabled because it exists
        // on the parent scope, and won't be automatically destroyed when
        // the component is destroyed.
        function setDisable(value) {
          element.children().attr('disabled', value);
          element.find('input').attr('disabled', value);
        }

        var stopDisabledWatch = angular.noop;

        if (attr.disabled) {
          setDisable(true);
        }
        else if (attr.ngDisabled) {
          stopDisabledWatch = scope.$watch(attr.ngDisabled, function (value) {
            setDisable(value);
          });
        }

        scope.$on('$destroy', function () {
          stopDisabledWatch();
        });

        var initialMaxWidth;

        ctrl.fitInputWidthToTextLength = function (length) {
          var input = element[0].querySelector('md-input-container');

          if (input) {
            var computedStyle = getComputedStyle(input);
            var minWidth = parseInt(computedStyle.minWidth);
            var padding = parseInt(computedStyle.paddingLeft) + parseInt(computedStyle.paddingRight);

            initialMaxWidth = initialMaxWidth || parseInt(computedStyle.maxWidth);
            var newMaxWidth = Math.max(initialMaxWidth, minWidth + padding + (minWidth / 2 * length));

            input.style.maxWidth = newMaxWidth + 'px';
          }
        };
      };
    }
  };
}

/**
 * @ngdoc directive
 * @name mdSlider
 * @module material.components.slider
 * @restrict E
 * @description
 * The `<md-slider>` component allows the user to choose from a range of values.
 *
 * As per the [material design spec](https://material.io/guidelines/style/color.html#color-color-system)
 * the slider is in the accent color by default. The primary color palette may be used with
 * the `md-primary` class.
 *
 * It has two modes:
 * - "normal" mode where the user slides between a wide range of values
 * - "discrete" mode where the user slides between only a few select values
 *
 * To enable discrete mode, add the `md-discrete` attribute to a slider
 * and use the `step` attribute to change the distance between
 * values the user is allowed to pick.
 *
 * When using the keyboard, holding the Meta, Control, or Alt key while pressing the left
 * and right arrow buttons will cause the slider to move 4 steps.
 *
 * @usage
 * <h4>Normal Mode</h4>
 * <hljs lang="html">
 * <md-slider ng-model="myValue" min="5" max="500">
 * </md-slider>
 * </hljs>
 * <h4>Discrete Mode</h4>
 * <hljs lang="html">
 * <md-slider md-discrete ng-model="myDiscreteValue" step="10" min="10" max="130">
 * </md-slider>
 * </hljs>
 * <h4>Invert Mode</h4>
 * <hljs lang="html">
 * <md-slider md-invert ng-model="myValue" step="10" min="10" max="130">
 * </md-slider>
 * </hljs>
 *
 * @param {expression} ng-model Assignable angular expression to be data-bound.
 *  The expression should evaluate to a `number`.
 * @param {boolean=} md-discrete Whether to enable discrete mode.
 * @param {boolean=} md-invert Whether to enable invert mode.
 * @param {number=} step The distance between values the user is allowed to pick. Default `1`.
 * @param {number=} min The minimum value the user is allowed to pick. Default `0`.
 * @param {number=} max The maximum value the user is allowed to pick. Default `100`.
 * @param {number=} round The amount of numbers after the decimal point. The maximum is 6 to
 *  prevent scientific notation. Default `3`.
 */
function SliderDirective($$rAF, $window, $mdAria, $mdUtil, $mdConstant, $mdTheming, $mdGesture,
                         $parse, $log, $timeout) {
  return {
    scope: {},
    require: ['?ngModel', '?^mdSliderContainer'],
    template:
      '<div class="md-slider-wrapper">' +
        '<div class="md-slider-content">' +
          '<div class="md-track-container">' +
            '<div class="md-track"></div>' +
            '<div class="md-track md-track-fill"></div>' +
            '<div class="md-track-ticks"></div>' +
          '</div>' +
          '<div class="md-thumb-container">' +
            '<div class="md-thumb"></div>' +
            '<div class="md-focus-thumb"></div>' +
            '<div class="md-focus-ring"></div>' +
            '<div class="md-sign">' +
              '<span class="md-thumb-text"></span>' +
            '</div>' +
            '<div class="md-disabled-thumb"></div>' +
          '</div>' +
        '</div>' +
      '</div>',
    compile: compile
  };

  // **********************************************************
  // Private Methods
  // **********************************************************

  function compile (tElement, tAttrs) {
    var wrapper = angular.element(tElement[0].getElementsByClassName('md-slider-wrapper'));

    var tabIndex = tAttrs.tabindex || 0;
    wrapper.attr('tabindex', tabIndex);

    if (tAttrs.disabled || tAttrs.ngDisabled) wrapper.attr('tabindex', -1);

    tElement.attr('role', 'slider');

    $mdAria.expect(tElement, 'aria-label');

    return postLink;
  }

  function postLink(scope, element, attr, ctrls) {
    $mdTheming(element);
    var ngModelCtrl = ctrls[0] || {
      // Mock ngModelController if it doesn't exist to give us
      // the minimum functionality needed
      $setViewValue: function(val) {
        this.$viewValue = val;
        this.$viewChangeListeners.forEach(function(cb) { cb(); });
      },
      $parsers: [],
      $formatters: [],
      $viewChangeListeners: []
    };

    var containerCtrl = ctrls[1];
    var container = angular.element($mdUtil.getClosest(element, '_md-slider-container', true));
    var isDisabled = attr.ngDisabled ? angular.bind(null, $parse(attr.ngDisabled), scope.$parent) : function () {
          return element[0].hasAttribute('disabled');
        };

    var thumb = angular.element(element[0].querySelector('.md-thumb'));
    var thumbText = angular.element(element[0].querySelector('.md-thumb-text'));
    var thumbContainer = thumb.parent();
    var trackContainer = angular.element(element[0].querySelector('.md-track-container'));
    var activeTrack = angular.element(element[0].querySelector('.md-track-fill'));
    var tickContainer = angular.element(element[0].querySelector('.md-track-ticks'));
    var wrapper = angular.element(element[0].getElementsByClassName('md-slider-wrapper'));
    var content = angular.element(element[0].getElementsByClassName('md-slider-content'));
    var throttledRefreshDimensions = $mdUtil.throttle(refreshSliderDimensions, 5000);

    // Default values, overridable by attrs
    var DEFAULT_ROUND = 3;
    var vertical = angular.isDefined(attr.mdVertical);
    var discrete = angular.isDefined(attr.mdDiscrete);
    var invert = angular.isDefined(attr.mdInvert);
    angular.isDefined(attr.min) ? attr.$observe('min', updateMin) : updateMin(0);
    angular.isDefined(attr.max) ? attr.$observe('max', updateMax) : updateMax(100);
    angular.isDefined(attr.step)? attr.$observe('step', updateStep) : updateStep(1);
    angular.isDefined(attr.round)? attr.$observe('round', updateRound) : updateRound(DEFAULT_ROUND);

    // We have to manually stop the $watch on ngDisabled because it exists
    // on the parent scope, and won't be automatically destroyed when
    // the component is destroyed.
    var stopDisabledWatch = angular.noop;
    if (attr.ngDisabled) {
      stopDisabledWatch = scope.$parent.$watch(attr.ngDisabled, updateAriaDisabled);
    }

    $mdGesture.register(wrapper, 'drag', { horizontal: !vertical });

    scope.mouseActive = false;

    wrapper
      .on('keydown', keydownListener)
      .on('mousedown', mouseDownListener)
      .on('focus', focusListener)
      .on('blur', blurListener);

      var hammertime = null;

    if (window.Hammer) {
        hammertime = new Hammer(wrapper[0]);
        hammertime.on('tap', function (ev) {
            ev.pointer = ev.center;
            onPressDown(ev);
        });
        hammertime.on('pressup', function (ev) {
            ev.pointer = ev.center;
            onPressUp(ev);
        });
        // drag, dragstart, dragend
        hammertime.on('panstart', function (ev) {
            ev.pointer = ev.center;
            onDragStart(ev);
        });
        hammertime.on('panleft', function (ev) {
            ev.pointer = ev.center;
            onDrag(ev);
        });
        hammertime.on('panright', function (ev) {
            ev.pointer = ev.center;
            onDrag(ev);
        });
        hammertime.on('panend', function (ev) {
            ev.pointer = ev.center;
            onDragEnd(ev);
        });

        scope.$on('$destroy', function () {
            hammertime.destroy();
        });

        wrapper.on('click', function () {
            refreshSliderDimensions();
        });
    } else {
        wrapper
            .on('$md.pressdown', onPressDown)
            .on('$md.pressup', onPressUp)
            .on('$md.dragstart', onDragStart)
            .on('$md.drag', onDrag)
            .on('$md.dragend', onDragEnd);
    }

    // On resize, recalculate the slider's dimensions and re-render
    function updateAll() {
      refreshSliderDimensions();
      ngModelRender();
    }
    setTimeout(updateAll, 0);

    var debouncedUpdateAll = $$rAF.throttle(updateAll);
    angular.element($window).on('resize', debouncedUpdateAll);

    scope.$on('$destroy', function() {
      angular.element($window).off('resize', debouncedUpdateAll);
    });

    ngModelCtrl.$render = ngModelRender;
    ngModelCtrl.$viewChangeListeners.push(ngModelRender);
    ngModelCtrl.$formatters.push(minMaxValidator);
    ngModelCtrl.$formatters.push(stepValidator);

    /**
     * Attributes
     */
    var min;
    var max;
    var step;
    var round;
    function updateMin(value) {
      min = parseFloat(value);
      ngModelCtrl.$viewValue = minMaxValidator(ngModelCtrl.$modelValue, min, max);
      element.attr('aria-valuemin', value);
      updateAll();
    }
    function updateMax(value) {
      max = parseFloat(value);
      ngModelCtrl.$viewValue = minMaxValidator(ngModelCtrl.$modelValue, min, max);
      element.attr('aria-valuemax', value);
      updateAll();
    }
    function updateStep(value) {
      step = parseFloat(value);
    }
    function updateRound(value) {
      // Set max round digits to 6, after 6 the input uses scientific notation
      round = minMaxValidator(parseInt(value), 0, 6);
    }
    function updateAriaDisabled() {
      element.attr('aria-disabled', !!isDisabled());
    }

    // Draw the ticks with canvas.
    // The alternative to drawing ticks with canvas is to draw one element for each tick,
    // which could quickly become a performance bottleneck.
    var tickCanvas, tickCtx;
    function redrawTicks() {
      if (!discrete || isDisabled()) return;
      if ( angular.isUndefined(step) )         return;

      if ( step <= 0 ) {
        var msg = 'Slider step value must be greater than zero when in discrete mode';
        $log.error(msg);
        throw new Error(msg);
      }

      var numSteps = Math.floor( (max - min) / step );
      if (!tickCanvas) {
        tickCanvas = angular.element('<canvas>').css('position', 'absolute');
        tickContainer.append(tickCanvas);

        tickCtx = tickCanvas[0].getContext('2d');
      }

      var dimensions = getSliderDimensions();

      // If `dimensions` doesn't have height and width it might be the first attempt so we will refresh dimensions
      if (dimensions && !dimensions.height && !dimensions.width) {
        refreshSliderDimensions();
        dimensions = sliderDimensions;
      }

      tickCanvas[0].width = dimensions.width;
      tickCanvas[0].height = dimensions.height;

      var distance;
      for (var i = 0; i <= numSteps; i++) {
        var trackTicksStyle = $window.getComputedStyle(tickContainer[0]);
        tickCtx.fillStyle = trackTicksStyle.color || 'black';

        distance = Math.floor((vertical ? dimensions.height : dimensions.width) * (i / numSteps));

        tickCtx.fillRect(vertical ? 0 : distance - 1,
          vertical ? distance - 1 : 0,
          vertical ? dimensions.width : 2,
          vertical ? 2 : dimensions.height);
      }
    }

    function clearTicks() {
      if(tickCanvas && tickCtx) {
        var dimensions = getSliderDimensions();
        tickCtx.clearRect(0, 0, dimensions.width, dimensions.height);
      }
    }

    /**
     * Refreshing Dimensions
     */
    var sliderDimensions = {};
    refreshSliderDimensions();
    function refreshSliderDimensions() {
      sliderDimensions = trackContainer[0].getBoundingClientRect();
    }
    function getSliderDimensions() {
      throttledRefreshDimensions();
      return sliderDimensions;
    }

    /**
     * left/right/up/down arrow listener
     */
    function keydownListener(ev) {
      if (isDisabled()) return;

      var changeAmount;
      if (vertical ? ev.keyCode === $mdConstant.KEY_CODE.DOWN_ARROW : ev.keyCode === $mdConstant.KEY_CODE.LEFT_ARROW) {
        changeAmount = -step;
      } else if (vertical ? ev.keyCode === $mdConstant.KEY_CODE.UP_ARROW : ev.keyCode === $mdConstant.KEY_CODE.RIGHT_ARROW) {
        changeAmount = step;
      }
      changeAmount = invert ? -changeAmount : changeAmount;
      if (changeAmount) {
        if (ev.metaKey || ev.ctrlKey || ev.altKey) {
          changeAmount *= 4;
        }
        ev.preventDefault();
        if (ev.stopPropagation) {
            ev.stopPropagation();
        }
        scope.$evalAsync(function() {
          setModelValue(ngModelCtrl.$viewValue + changeAmount);
        });
      }
    }

    function mouseDownListener() {
      redrawTicks();

      scope.mouseActive = true;
      wrapper.removeClass('md-focused');

      $timeout(function() {
        scope.mouseActive = false;
      }, 100);
    }

    function focusListener() {
      if (scope.mouseActive === false) {
        wrapper.addClass('md-focused');
      }
    }

    function blurListener() {
      wrapper.removeClass('md-focused');
      element.removeClass('md-active');
      clearTicks();
    }

    /**
     * ngModel setters and validators
     */
    function setModelValue(value) {
      ngModelCtrl.$setViewValue( minMaxValidator(stepValidator(value)) );
    }
    function ngModelRender() {
      if (isNaN(ngModelCtrl.$viewValue)) {
        ngModelCtrl.$viewValue = ngModelCtrl.$modelValue;
      }

      ngModelCtrl.$viewValue = minMaxValidator(ngModelCtrl.$viewValue);

      var percent = valueToPercent(ngModelCtrl.$viewValue);
      scope.modelValue = ngModelCtrl.$viewValue;
      element.attr('aria-valuenow', ngModelCtrl.$viewValue);
      setSliderPercent(percent);
      thumbText.text( ngModelCtrl.$viewValue );
    }

    function minMaxValidator(value, minValue, maxValue) {
      if (angular.isNumber(value)) {
        minValue = angular.isNumber(minValue) ? minValue : min;
        maxValue = angular.isNumber(maxValue) ? maxValue : max;

        return Math.max(minValue, Math.min(maxValue, value));
      }
    }

    function stepValidator(value) {
      if (angular.isNumber(value)) {
        var formattedValue = (Math.round((value - min) / step) * step + min);
        formattedValue = (Math.round(formattedValue * Math.pow(10, round)) / Math.pow(10, round));

        if (containerCtrl && containerCtrl.fitInputWidthToTextLength){
          $mdUtil.debounce(function () {
            containerCtrl.fitInputWidthToTextLength(formattedValue.toString().length);
          }, 100)();
        }

        return formattedValue;
      }
    }

    /**
     * @param percent 0-1
     */
    function setSliderPercent(percent) {

      percent = clamp(percent);

      var thumbPosition = (percent * 100) + '%';
      var activeTrackPercent = invert ? (1 - percent) * 100 + '%' : thumbPosition;

      if (vertical) {
        thumbContainer.css('bottom', thumbPosition);
      }
      else {
        $mdUtil.bidiProperty(thumbContainer, 'left', 'right', thumbPosition);
      }

      
      activeTrack.css(vertical ? 'height' : 'width', activeTrackPercent);

      element.toggleClass((invert ? 'md-max' : 'md-min'), percent === 0);
      element.toggleClass((invert ? 'md-min' : 'md-max'), percent === 1);
    }

    /**
     * Slide listeners
     */
    var isDragging = false;

    function onPressDown(ev) {
      if (isDisabled()) return;

      element.addClass('md-active');
      element[0].focus();
      refreshSliderDimensions();

      var exactVal = percentToValue( positionToPercent( vertical ? ev.pointer.y : ev.pointer.x ));
      var closestVal = minMaxValidator( stepValidator(exactVal) );
      scope.$apply(function() {
        setModelValue( closestVal );
        setSliderPercent( valueToPercent(closestVal));
      });
    }
    function onPressUp(ev) {
      if (isDisabled()) return;

      element.removeClass('md-dragging');

      var exactVal = percentToValue( positionToPercent( vertical ? ev.pointer.y : ev.pointer.x ));
      var closestVal = minMaxValidator( stepValidator(exactVal) );
      scope.$apply(function() {
        setModelValue(closestVal);
        ngModelRender();
      });
    }
    function onDragStart(ev) {
      if (isDisabled()) return;
      isDragging = true;

      if (ev.stopPropagation) {
          ev.stopPropagation();
      }

      element.addClass('md-dragging');
      setSliderFromEvent(ev);
    }
    function onDrag(ev) {
      if (!isDragging) return;
      if (ev.stopPropagation) {
          ev.stopPropagation();
      }
      setSliderFromEvent(ev);
    }
    function onDragEnd(ev) {
      if (!isDragging) return;
      if (ev.stopPropagation) {
          ev.stopPropagation();
      }
      isDragging = false;
    }

    function setSliderFromEvent(ev) {
      // While panning discrete, update only the
      // visual positioning but not the model value.
      if ( discrete ) adjustThumbPosition( vertical ? ev.pointer.y : ev.pointer.x );
      else            doSlide( vertical ? ev.pointer.y : ev.pointer.x );
    }

    /**
     * Slide the UI by changing the model value
     * @param x
     */
    function doSlide( x ) {
      scope.$evalAsync( function() {
        setModelValue( percentToValue( positionToPercent(x) ));
      });
    }

    /**
     * Slide the UI without changing the model (while dragging/panning)
     * @param x
     */
    function adjustThumbPosition( x ) {
      var exactVal = percentToValue( positionToPercent( x ));
      var closestVal = minMaxValidator( stepValidator(exactVal) );
      setSliderPercent( positionToPercent(x) );
      thumbText.text( closestVal );
    }

    /**
    * Clamps the value to be between 0 and 1.
    * @param {number} value The value to clamp.
    * @returns {number}
    */
    function clamp(value) {
      return Math.max(0, Math.min(value || 0, 1));
    }

    /**
     * Convert position on slider to percentage value of offset from beginning...
     * @param position
     * @returns {number}
     */
    function positionToPercent( position ) {
      var offset = vertical ? sliderDimensions.top : sliderDimensions.left;
      var size = vertical ? sliderDimensions.height : sliderDimensions.width;
      var calc = (position - offset) / size;

      if (!vertical && $mdUtil.bidi() === 'rtl') {
        calc = 1 - calc;
      }

      return Math.max(0, Math.min(1, vertical ? 1 - calc : calc));
    }

    /**
     * Convert percentage offset on slide to equivalent model value
     * @param percent
     * @returns {*}
     */
    function percentToValue( percent ) {
      var adjustedPercent = invert ? (1 - percent) : percent;
      return (min + adjustedPercent * (max - min));
    }

    function valueToPercent( val ) {
      var percent = (val - min) / (max - min);
      return invert ? (1 - percent) : percent;
    }
  }
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.subheader
 * @description
 * SubHeader module
 *
 *  Subheaders are special list tiles that delineate distinct sections of a
 *  list or grid list and are typically related to the current filtering or
 *  sorting criteria. Subheader tiles are either displayed inline with tiles or
 *  can be associated with content, for example, in an adjacent column.
 *
 *  Upon scrolling, subheaders remain pinned to the top of the screen and remain
 *  pinned until pushed on or off screen by the next subheader. @see [Material
 *  Design Specifications](https://www.google.com/design/spec/components/subheaders.html)
 *
 *  > To improve the visual grouping of content, use the system color for your subheaders.
 *
 */
MdSubheaderDirective.$inject = ["$compile", "$mdTheming", "$mdUtil", "$mdAria"];
angular
  .module('material.components.subheader', [
    'material.core'
  ])
  .directive('mdSubheader', MdSubheaderDirective);

/**
 * @ngdoc directive
 * @name mdSubheader
 * @module material.components.subheader
 *
 * @restrict E
 *
 * @description
 * The `md-subheader` directive creates a sticky subheader for a section.
 *
 * Developers are able to disable the stickiness of the subheader by using the following markup
 *
 * <hljs lang="html">
 *   <md-subheader class="md-no-sticky">Not Sticky</md-subheader>
 * </hljs>
 *
 * ### Notes
 * - The `md-subheader` directive uses the <a ng-href="api/service/$mdSticky">$mdSticky</a> service
 * to make the subheader sticky.
 *
 * > Whenever the current browser doesn't support stickiness natively, the subheader
 * will be compiled twice to create a sticky clone of the subheader.
 *
 * @usage
 * <hljs lang="html">
 * <md-subheader>Online Friends</md-subheader>
 * </hljs>
 */

function MdSubheaderDirective($compile, $mdTheming, $mdUtil, $mdAria) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: (
    '<div class="md-subheader _md">' +
    '  <div class="md-subheader-inner">' +
    '    <div class="md-subheader-content"></div>' +
    '  </div>' +
    '</div>'
    ),
    link: function postLink(scope, element, attr, controllers, transclude) {
      $mdTheming(element);
      element.addClass('_md');

      // Remove the ngRepeat attribute from the root element, because we don't want to compile
      // the ngRepeat for the sticky clone again.
      $mdUtil.prefixer().removeAttribute(element, 'ng-repeat');

      var outerHTML = element[0].outerHTML;

      function getContent(el) {
        return angular.element(el[0].querySelector('.md-subheader-content'));
      }

      // Set the ARIA attributes on the original element since it keeps it's original place in
      // the DOM, whereas the clones are in reverse order. Should be done after the outerHTML,
      // in order to avoid having multiple element be marked as headers.
      attr.$set('role', 'heading');
      $mdAria.expect(element, 'aria-level', '2');

      // Transclude the user-given contents of the subheader
      // the conventional way.
      transclude(scope, function(clone) {
        getContent(element).append(clone);
      });

      // Create another clone, that uses the outer and inner contents
      // of the element, that will be 'stickied' as the user scrolls.
      if (!element.hasClass('md-no-sticky')) {
        transclude(scope, function(clone) {
          // If the user adds an ng-if or ng-repeat directly to the md-subheader element, the
          // compiled clone below will only be a comment tag (since they replace their elements with
          // a comment) which cannot be properly passed to the $mdSticky; so we wrap it in our own
          // DIV to ensure we have something $mdSticky can use
          var wrapper = $compile('<div class="md-subheader-wrapper" aria-hidden="true">' + outerHTML + '</div>')(scope);

          // Delay initialization until after any `ng-if`/`ng-repeat`/etc has finished before
          // attempting to create the clone
          $mdUtil.nextTick(function() {
            // Append our transcluded clone into the wrapper.
            // We don't have to recompile the element again, because the clone is already
            // compiled in it's transclusion scope. If we recompile the outerHTML of the new clone, we would lose
            // our ngIf's and other previous registered bindings / properties.
            getContent(wrapper).append(clone);
          });

          // Make the element sticky and provide the stickyClone our self, to avoid recompilation of the subheader
          // element.
          //$mdSticky(scope, element, wrapper);
        });
      }
    }
  };
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.toolbar
 */
mdToolbarDirective.$inject = ["$$rAF", "$mdConstant", "$mdUtil", "$mdTheming", "$animate"];
angular.module('material.components.toolbar', [
  'material.core',
  'material.components.content'
])
  .directive('mdToolbar', mdToolbarDirective);

/**
 * @ngdoc directive
 * @name mdToolbar
 * @module material.components.toolbar
 * @restrict E
 * @description
 * `md-toolbar` is used to place a toolbar in your app.
 *
 * Toolbars are usually used above a content area to display the title of the
 * current page, and show relevant action buttons for that page.
 *
 * You can change the height of the toolbar by adding either the
 * `md-medium-tall` or `md-tall` class to the toolbar.
 *
 * @usage
 * <hljs lang="html">
 * <div layout="column" layout-fill>
 *   <md-toolbar>
 *
 *     <div class="md-toolbar-tools">
 *       <h2 md-truncate flex>My App's Title</h2>
 *
 *       <md-button>
 *         Right Bar Button
 *       </md-button>
 *     </div>
 *
 *   </md-toolbar>
 *   <md-content>
 *     Hello!
 *   </md-content>
 * </div>
 * </hljs>
 *
 * <i><b>Note:</b> The code above shows usage with the `md-truncate` component which provides an
 * ellipsis if the title is longer than the width of the Toolbar.</i>
 *
 * ## CSS & Styles
 *
 * The `<md-toolbar>` provides a few custom CSS classes that you may use to enhance the
 * functionality of your toolbar.
 *
 * <div>
 * <docs-css-api-table>
 *
 *   <docs-css-selector code="md-toolbar .md-toolbar-tools">
 *     The `md-toolbar-tools` class provides quite a bit of automatic styling for your toolbar
 *     buttons and text. When applied, it will center the buttons and text vertically for you.
 *   </docs-css-selector>
 *
 * </docs-css-api-table>
 * </div>
 *
 * ### Private Classes
 *
 * Currently, the only private class is the `md-toolbar-transitions` class. All other classes are
 * considered public.
 *
 * @param {boolean=} md-scroll-shrink Whether the header should shrink away as
 * the user scrolls down, and reveal itself as the user scrolls up.
 *
 * _**Note (1):** for scrollShrink to work, the toolbar must be a sibling of a
 * `md-content` element, placed before it. See the scroll shrink demo._
 *
 * _**Note (2):** The `md-scroll-shrink` attribute is only parsed on component
 * initialization, it does not watch for scope changes._
 *
 *
 * @param {number=} md-shrink-speed-factor How much to change the speed of the toolbar's
 * shrinking by. For example, if 0.25 is given then the toolbar will shrink
 * at one fourth the rate at which the user scrolls down. Default 0.5.
 *
 */

function mdToolbarDirective($$rAF, $mdConstant, $mdUtil, $mdTheming, $animate) {
  var translateY = angular.bind(null, $mdUtil.supplant, 'translate3d(0,{0}px,0)');

  return {
    template: '',
    restrict: 'E',

    link: function(scope, element, attr) {

      element.addClass('_md');     // private md component indicator for styling
      $mdTheming(element);

      $mdUtil.nextTick(function () {
        element.addClass('_md-toolbar-transitions');     // adding toolbar transitions after digest
      }, false);

      if (angular.isDefined(attr.mdScrollShrink)) {
        setupScrollShrink();
      }

      function setupScrollShrink() {

        var toolbarHeight;
        var contentElement;
        var disableScrollShrink = angular.noop;

        // Current "y" position of scroll
        // Store the last scroll top position
        var y = 0;
        var prevScrollTop = 0;
        var shrinkSpeedFactor = attr.mdShrinkSpeedFactor || 0.5;

        var debouncedContentScroll = $$rAF.throttle(onContentScroll);
        var debouncedUpdateHeight = $mdUtil.debounce(updateToolbarHeight, 5 * 1000);

        // Wait for $mdContentLoaded event from mdContent directive.
        // If the mdContent element is a sibling of our toolbar, hook it up
        // to scroll events.

        scope.$on('$mdContentLoaded', onMdContentLoad);

        // If the toolbar is used inside an ng-if statement, we may miss the
        // $mdContentLoaded event, so we attempt to fake it if we have a
        // md-content close enough.

        attr.$observe('mdScrollShrink', onChangeScrollShrink);

        // If the toolbar has ngShow or ngHide we need to update height immediately as it changed
        // and not wait for $mdUtil.debounce to happen

        if (attr.ngShow) { scope.$watch(attr.ngShow, updateToolbarHeight); }
        if (attr.ngHide) { scope.$watch(attr.ngHide, updateToolbarHeight); }

        // If the scope is destroyed (which could happen with ng-if), make sure
        // to disable scroll shrinking again

        scope.$on('$destroy', disableScrollShrink);

        /**
         *
         */
        function onChangeScrollShrink(shrinkWithScroll) {
          var closestContent = element.parent().find('md-content');

          // If we have a content element, fake the call; this might still fail
          // if the content element isn't a sibling of the toolbar

          if (!contentElement && closestContent.length) {
            onMdContentLoad(null, closestContent);
          }

          // Evaluate the expression
          shrinkWithScroll = scope.$eval(shrinkWithScroll);

          // Disable only if the attribute's expression evaluates to false
          if (shrinkWithScroll === false) {
            disableScrollShrink();
          } else {
            disableScrollShrink = enableScrollShrink();
          }
        }

        /**
         *
         */
        function onMdContentLoad($event, newContentEl) {
          // Toolbar and content must be siblings
          if (newContentEl && element.parent()[0] === newContentEl.parent()[0]) {
            // unhook old content event listener if exists
            if (contentElement) {
              contentElement.off('scroll', debouncedContentScroll);
            }

            contentElement = newContentEl;
            disableScrollShrink = enableScrollShrink();
          }
        }

        /**
         *
         */
        function onContentScroll(e) {
          var scrollTop = e ? e.target.scrollTop : prevScrollTop;

          debouncedUpdateHeight();

          y = Math.min(
            toolbarHeight / shrinkSpeedFactor,
            Math.max(0, y + scrollTop - prevScrollTop)
          );

          element.css($mdConstant.CSS.TRANSFORM, translateY([-y * shrinkSpeedFactor]));
          contentElement.css($mdConstant.CSS.TRANSFORM, translateY([(toolbarHeight - y) * shrinkSpeedFactor]));

          prevScrollTop = scrollTop;

          $mdUtil.nextTick(function() {
            var hasWhiteFrame = element.hasClass('md-whiteframe-z1');

            if (hasWhiteFrame && !y) {
              $animate.removeClass(element, 'md-whiteframe-z1');
            } else if (!hasWhiteFrame && y) {
              $animate.addClass(element, 'md-whiteframe-z1');
            }
          });

        }

        /**
         *
         */
        function enableScrollShrink() {
          if (!contentElement)     return angular.noop;           // no md-content

          contentElement.on('scroll', debouncedContentScroll);
          contentElement.attr('scroll-shrink', 'true');

          $mdUtil.nextTick(updateToolbarHeight, false);

          return function disableScrollShrink() {
            contentElement.off('scroll', debouncedContentScroll);
            contentElement.attr('scroll-shrink', 'false');

            updateToolbarHeight();
          };
        }

        /**
         *
         */
        function updateToolbarHeight() {
          toolbarHeight = element.prop('offsetHeight');
          // Add a negative margin-top the size of the toolbar to the content el.
          // The content will start transformed down the toolbarHeight amount,
          // so everything looks normal.
          //
          // As the user scrolls down, the content will be transformed up slowly
          // to put the content underneath where the toolbar was.
          var margin = (-toolbarHeight * shrinkSpeedFactor) + 'px';

          contentElement.css({
            "margin-top": margin,
            "margin-bottom": margin
          });

          onContentScroll();
        }

      }

    }
  };

}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.tooltip
 */
MdTooltipDirective.$inject = ["$timeout", "$window", "$$rAF", "$document", "$interpolate", "$mdUtil", "$mdPanel", "$$mdTooltipRegistry"];
angular
    .module('material.components.tooltip', [
      'material.core',
      'material.components.panel'
    ])
    .directive('mdTooltip', MdTooltipDirective)
    .service('$$mdTooltipRegistry', MdTooltipRegistry);


/**
 * @ngdoc directive
 * @name mdTooltip
 * @module material.components.tooltip
 * @description
 * Tooltips are used to describe elements that are interactive and primarily
 * graphical (not textual).
 *
 * Place a `<md-tooltip>` as a child of the element it describes.
 *
 * A tooltip will activate when the user hovers over, focuses, or touches the
 * parent element.
 *
 * @usage
 * <hljs lang="html">
 *   <md-button class="md-fab md-accent" aria-label="Play">
 *     <md-tooltip>Play Music</md-tooltip>
 *     <md-icon md-svg-src="img/icons/ic_play_arrow_24px.svg"></md-icon>
 *   </md-button>
 * </hljs>
 *
 * @param {number=} md-z-index The visual level that the tooltip will appear
 *     in comparison with the rest of the elements of the application.
 * @param {expression=} md-visible Boolean bound to whether the tooltip is
 *     currently visible.
 * @param {number=} md-delay How many milliseconds to wait to show the tooltip
 *     after the user hovers over, focuses, or touches the parent element.
 *     Defaults to 0ms on non-touch devices and 75ms on touch.
 * @param {boolean=} md-autohide If present or provided with a boolean value,
 *     the tooltip will hide on mouse leave, regardless of focus.
 * @param {string=} md-direction The direction that the tooltip is shown,
 *     relative to the parent element. Supports top, right, bottom, and left.
 *     Defaults to bottom.
 */
function MdTooltipDirective($timeout, $window, $$rAF, $document, $interpolate,
    $mdUtil, $mdPanel, $$mdTooltipRegistry) {

  var ENTER_EVENTS = 'focus mouseenter';
  var LEAVE_EVENTS = 'blur mouseleave';
  var TOOLTIP_DEFAULT_Z_INDEX = 99999;
  var TOOLTIP_DEFAULT_SHOW_DELAY = 0;
  var TOOLTIP_DEFAULT_DIRECTION = 'bottom';
  var TOOLTIP_DIRECTIONS = {
    top: { x: $mdPanel.xPosition.CENTER, y: $mdPanel.yPosition.ABOVE },
    right: { x: $mdPanel.xPosition.OFFSET_END, y: $mdPanel.yPosition.CENTER },
    bottom: { x: $mdPanel.xPosition.CENTER, y: $mdPanel.yPosition.BELOW },
    left: { x: $mdPanel.xPosition.OFFSET_START, y: $mdPanel.yPosition.CENTER }
  };

  return {
    restrict: 'E',
    priority: 210, // Before ngAria
    scope: {
      mdZIndex: '=?mdZIndex',
      mdDelay: '=?mdDelay',
      mdVisible: '=?mdVisible',
      mdAutohide: '=?mdAutohide',
      mdDirection: '@?mdDirection' // Do not expect expressions.
    },
    link: linkFunc
  };

  function linkFunc(scope, element, attr) {
    // Set constants.
    var tooltipId = 'md-tooltip-' + $mdUtil.nextUid();
    var parent = $mdUtil.getParentWithPointerEvents(element);
    var debouncedOnResize = $$rAF.throttle(updatePosition);
    var mouseActive = false;
    var origin, position, hammertime, panelPosition, panelRef, autohide, showTimeout,
        elementFocusedOnWindowBlur = null;

    // Set defaults
    setDefaults();

    // Set parent aria-label.
    addAriaLabel();

    // Remove the element from its current DOM position.
    element.detach();

    updatePosition();
    bindEvents();
    configureWatchers();

    function setDefaults() {
      scope.mdZIndex = scope.mdZIndex || TOOLTIP_DEFAULT_Z_INDEX;
      scope.mdDelay = scope.mdDelay || TOOLTIP_DEFAULT_SHOW_DELAY;
      if (!TOOLTIP_DIRECTIONS[scope.mdDirection]) {
        scope.mdDirection = TOOLTIP_DEFAULT_DIRECTION;
      }
    }

    function addAriaLabel(labelText) {
      // Only interpolate the text from the HTML element because otherwise the custom text could
      // be interpolated twice and cause XSS violations.
      var interpolatedText = labelText || $interpolate(element.text().trim())(scope.$parent);

      // Only add the `aria-label` to the parent if there isn't already one, if there isn't an
      // already present `aria-labelledby`, or if the previous `aria-label` was added by the
      // tooltip directive.
      if (
        (!parent.attr('aria-label') && !parent.attr('aria-labelledby')) ||
        parent.attr('md-labeled-by-tooltip')
      ) {
        parent.attr('aria-label', interpolatedText);

        // Set the `md-labeled-by-tooltip` attribute if it has not already been set.
        if (!parent.attr('md-labeled-by-tooltip')) {
          parent.attr('md-labeled-by-tooltip', tooltipId);
        }
      }
    }

    function updatePosition() {
      setDefaults();

      // If the panel has already been created, remove the current origin
      // class from the panel element.
      if (panelRef && panelRef.panelEl) {
        panelRef.panelEl.removeClass(origin);
      }

      // Set the panel element origin class based off of the current
      // mdDirection.
      origin = 'md-origin-' + scope.mdDirection;

      // Create the position of the panel based off of the mdDirection.
      position = TOOLTIP_DIRECTIONS[scope.mdDirection];

      // Using the newly created position object, use the MdPanel
      // panelPosition API to build the panel's position.
      panelPosition = $mdPanel.newPanelPosition()
          .relativeTo(parent)
          .addPanelPosition(position.x, position.y);

      // If the panel has already been created, add the new origin class to
      // the panel element and update it's position with the panelPosition.
      if (panelRef && panelRef.panelEl) {
        panelRef.panelEl.addClass(origin);
        panelRef.updatePosition(panelPosition);
      }
    }

    function bindEvents() {
      // Add a mutationObserver where there is support for it and the need
      // for it in the form of viable host(parent[0]).
      if (parent[0] && 'MutationObserver' in $window) {
        // Use a mutationObserver to tackle #2602.
        var attributeObserver = new MutationObserver(function(mutations) {
          if (isDisabledMutation(mutations)) {
            $mdUtil.nextTick(function() {
              setVisible(false);
            });
          }
        });

        attributeObserver.observe(parent[0], {
          attributes: true
        });
      }

      elementFocusedOnWindowBlur = false;

      $$mdTooltipRegistry.register('scroll', windowScrollEventHandler, true);
      $$mdTooltipRegistry.register('blur', windowBlurEventHandler);
      $$mdTooltipRegistry.register('resize', debouncedOnResize);

      scope.$on('$destroy', onDestroy);

      // To avoid 'synthetic clicks', we listen to mousedown instead of
      // 'click'.


      if (window.Hammer && window.Modernizr && window.Modernizr.touchevents) {
          hammertime = new window.Hammer(parent[0]);
          hammertime.on('press', enterEventHandler);
          hammertime.on('pressup', leaveEventHandler);
      } else {
          parent.on('mousedown', mousedownEventHandler);
          parent.on(ENTER_EVENTS, enterEventHandler);
      }

      function isDisabledMutation(mutations) {
        mutations.some(function(mutation) {
          return mutation.attributeName === 'disabled' && parent[0].disabled;
        });
        return false;
      }

      function windowScrollEventHandler() {
        setVisible(false);
      }

      function windowBlurEventHandler() {
        elementFocusedOnWindowBlur = document.activeElement === parent[0];
      }

      function enterEventHandler($event) {
        // Prevent the tooltip from showing when the window is receiving
        // focus.
        if ($event.type === 'focus' && elementFocusedOnWindowBlur) {
          elementFocusedOnWindowBlur = false;
        } else if (!scope.mdVisible) {
          parent.on(LEAVE_EVENTS, leaveEventHandler);
          setVisible(true);

          // If the user is on a touch device, we should bind the tap away
          // after the 'touched' in order to prevent the tooltip being
          // removed immediately.
          if ($event.type === 'touchstart') {
            parent.one('touchend', function() {
              $mdUtil.nextTick(function() {
                $document.one('touchend', leaveEventHandler);
              }, false);
            });
          }
        }
      }

      function leaveEventHandler() {
        autohide = scope.hasOwnProperty('mdAutohide') ?
            scope.mdAutohide :
            attr.hasOwnProperty('mdAutohide');

        if (autohide || mouseActive ||
            $document[0].activeElement !== parent[0]) {
          // When a show timeout is currently in progress, then we have
          // to cancel it, otherwise the tooltip will remain showing
          // without focus or hover.
          if (showTimeout) {
            $timeout.cancel(showTimeout);
            setVisible.queued = false;
            showTimeout = null;
          }

          parent.off(LEAVE_EVENTS, leaveEventHandler);
          parent.triggerHandler('blur');
          setVisible(false);
        }
        mouseActive = false;
      }

      function mousedownEventHandler() {
        mouseActive = true;
      }

      function onDestroy() {

        if (hammertime) {
            hammertime.destroy();
        }

        $$mdTooltipRegistry.deregister('scroll', windowScrollEventHandler, true);
        $$mdTooltipRegistry.deregister('blur', windowBlurEventHandler);
        $$mdTooltipRegistry.deregister('resize', debouncedOnResize);

        parent
            .off(ENTER_EVENTS, enterEventHandler)
            .off(LEAVE_EVENTS, leaveEventHandler)
            .off('mousedown', mousedownEventHandler);

        // Trigger the handler in case any of the tooltips are
        // still visible.
        leaveEventHandler();
        attributeObserver && attributeObserver.disconnect();
      }
    }

    function configureWatchers() {
      if (element[0] && 'MutationObserver' in $window) {
        var attributeObserver = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'md-visible' &&
                !scope.visibleWatcher ) {
              scope.visibleWatcher = scope.$watch('mdVisible',
                  onVisibleChanged);
            }
          });
        });

        attributeObserver.observe(element[0], {
          attributes: true
        });

        // Build watcher only if mdVisible is being used.
        if (attr.hasOwnProperty('mdVisible')) {
          scope.visibleWatcher = scope.$watch('mdVisible',
              onVisibleChanged);
        }
      } else {
        // MutationObserver not supported
        scope.visibleWatcher = scope.$watch('mdVisible', onVisibleChanged);
      }

      // Direction watcher
      scope.$watch('mdDirection', updatePosition);

      // Clean up if the element or parent was removed via jqLite's .remove.
      // A couple of notes:
      //   - In these cases the scope might not have been destroyed, which
      //     is why we destroy it manually. An example of this can be having
      //     `md-visible="false"` and adding tooltips while they're
      //     invisible. If `md-visible` becomes true, at some point, you'd
      //     usually get a lot of tooltips.
      //   - We use `.one`, not `.on`, because this only needs to fire once.
      //     If we were using `.on`, it would get thrown into an infinite
      //     loop.
      //   - This kicks off the scope's `$destroy` event which finishes the
      //     cleanup.
      element.one('$destroy', onElementDestroy);
      parent.one('$destroy', onElementDestroy);
      scope.$on('$destroy', function() {
        setVisible(false);
        panelRef && panelRef.destroy();
        attributeObserver && attributeObserver.disconnect();
        element.remove();
      });

      // Updates the aria-label when the element text changes. This watch
      // doesn't need to be set up if the element doesn't have any data
      // bindings.
      if (element.text().indexOf($interpolate.startSymbol()) > -1) {
        scope.$watch(function() {
          return element.text().trim();
        }, addAriaLabel);
      }

      function onElementDestroy() {
        scope.$destroy();
      }
    }

    function setVisible(value) {
      // Break if passed value is already in queue or there is no queue and
      // passed value is current in the controller.
      if (setVisible.queued && setVisible.value === !!value ||
          !setVisible.queued && scope.mdVisible === !!value) {
        return;
      }
      setVisible.value = !!value;

      if (!setVisible.queued) {
        if (value) {
          setVisible.queued = true;
          showTimeout = $timeout(function() {
            scope.mdVisible = setVisible.value;
            setVisible.queued = false;
            showTimeout = null;
            if (!scope.visibleWatcher) {
              onVisibleChanged(scope.mdVisible);
            }
          }, scope.mdDelay);
        } else {
          $mdUtil.nextTick(function() {
            scope.mdVisible = false;
            if (!scope.visibleWatcher) {
              onVisibleChanged(false);
            }
          });
        }
      }
    }

    function onVisibleChanged(isVisible) {
      isVisible ? showTooltip() : hideTooltip();
    }

    function showTooltip() {
      // Do not show the tooltip if the text is empty.
      if (!element[0].textContent.trim()) {
        throw new Error('Text for the tooltip has not been provided. ' +
            'Please include text within the mdTooltip element.');
      }

      if (!panelRef) {
        var attachTo = angular.element(document.body);
        var panelAnimation = $mdPanel.newPanelAnimation()
            .openFrom(parent)
            .closeTo(parent)
            .withAnimation({
              open: 'md-show',
              close: 'md-hide'
            });

        var panelConfig = {
          id: tooltipId,
          attachTo: attachTo,
          contentElement: element,
          propagateContainerEvents: true,
          panelClass: 'md-tooltip',
          animation: panelAnimation,
          position: panelPosition,
          zIndex: scope.mdZIndex,
          focusOnOpen: false,
          onDomAdded: function() {
            panelRef.panelEl.addClass(origin);
          }
        };

        panelRef = $mdPanel.create(panelConfig);
      }

      panelRef.open().then(function() {
        panelRef.panelEl.attr('role', 'tooltip');
      });
    }

    function hideTooltip() {
      panelRef && panelRef.close();
    }
  }

}


/**
 * Service that is used to reduce the amount of listeners that are being
 * registered on the `window` by the tooltip component. Works by collecting
 * the individual event handlers and dispatching them from a global handler.
 *
 * @ngInject
 */
function MdTooltipRegistry() {
  var listeners = {};
  var ngWindow = angular.element(window);

  return {
    register: register,
    deregister: deregister
  };

  /**
   * Global event handler that dispatches the registered handlers in the
   * service.
   * @param {!Event} event Event object passed in by the browser
   */
  function globalEventHandler(event) {
    if (listeners[event.type]) {
      listeners[event.type].forEach(function(currentHandler) {
        currentHandler.call(this, event);
      }, this);
    }
  }

  /**
   * Registers a new handler with the service.
   * @param {string} type Type of event to be registered.
   * @param {!Function} handler Event handler.
   * @param {boolean} useCapture Whether to use event capturing.
   */
  function register(type, handler, useCapture) {
    var handlers = listeners[type] = listeners[type] || [];

    if (!handlers.length) {
      useCapture ? window.addEventListener(type, globalEventHandler, true) :
          ngWindow.on(type, globalEventHandler);
    }

    if (handlers.indexOf(handler) === -1) {
      handlers.push(handler);
    }
  }

  /**
   * Removes an event handler from the service.
   * @param {string} type Type of event handler.
   * @param {!Function} handler The event handler itself.
   * @param {boolean} useCapture Whether the event handler used event capturing.
   */
  function deregister(type, handler, useCapture) {
    var handlers = listeners[type];
    var index = handlers ? handlers.indexOf(handler) : -1;

    if (index > -1) {
      handlers.splice(index, 1);

      if (handlers.length === 0) {
        useCapture ? window.removeEventListener(type, globalEventHandler, true) :
            ngWindow.off(type, globalEventHandler);
      }
    }
  }
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.truncate
 */
MdTruncateController.$inject = ["$element"];
angular.module('material.components.truncate', ['material.core'])
  .directive('mdTruncate', MdTruncateDirective);

/**
 * @ngdoc directive
 * @name mdTruncate
 * @module material.components.truncate
 * @restrict AE
 * @description
 *
 * The `md-truncate` component displays a label that will automatically clip text which is wider
 * than the component. By default, it displays an ellipsis, but you may apply the `md-clip` CSS
 * class to override this default and use a standard "clipping" approach.
 *
 * <i><b>Note:</b> The `md-truncate` component does not automatically adjust it's width. You must
 * provide the `flex` attribute, or some other CSS-based width management. See the
 * <a ng-href="./demo/truncate">demos</a> for examples.</i>
 *
 * @usage
 *
 * ### As an Element
 *
 * <hljs lang="html">
 *   <div layout="row">
 *     <md-button>Back</md-button>
 *
 *     <md-truncate flex>Chapter 1 - The Way of the Old West</md-truncate>
 *
 *     <md-button>Forward</md-button>
 *   </div>
 * </hljs>
 *
 * ### As an Attribute
 *
 * <hljs lang="html">
 *   <h2 md-truncate style="max-width: 100px;">Some Title With a Lot of Text</h2>
 * </hljs>
 *
 * ## CSS & Styles
 *
 * `<md-truncate>` provides two CSS classes that you may use to control the type of clipping.
 *
 * <i><b>Note:</b> The `md-truncate` also applies a setting of `width: 0;` when used with the `flex`
 * attribute to fix an issue with the flex element not shrinking properly.</i>
 *
 * <div>
 * <docs-css-api-table>
 *
 *   <docs-css-selector code=".md-ellipsis">
 *     Assigns the "ellipsis" behavior (default) which will cut off mid-word and append an ellipsis
 *     (&hellip;) to the end of the text.
 *   </docs-css-selector>
 *
 *   <docs-css-selector code=".md-clip">
 *     Assigns the "clipping" behavior which will simply chop off the text. This may happen
 *     mid-word or even mid-character.
 *   </docs-css-selector>
 *
 * </docs-css-api-table>
 * </div>
 */
function MdTruncateDirective() {
  return {
    restrict: 'AE',

    controller: MdTruncateController
  };
}

/**
 * Controller for the <md-truncate> component.
 *
 * @param $element The md-truncate element.
 *
 * @constructor
 * @ngInject
 */
function MdTruncateController($element) {
  $element.addClass('md-truncate');
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.whiteframe
 */
MdWhiteframeDirective.$inject = ["$log"];
angular
  .module('material.components.whiteframe', ['material.core'])
  .directive('mdWhiteframe', MdWhiteframeDirective);

/**
 * @ngdoc directive
 * @module material.components.whiteframe
 * @name mdWhiteframe
 *
 * @description
 * The md-whiteframe directive allows you to apply an elevation shadow to an element.
 *
 * The attribute values needs to be a number between 1 and 24 or -1.
 * When set to -1 no style is applied.
 *
 * ### Notes
 * - If there is no value specified it defaults to 4dp.
 * - If the value is not valid it defaults to 4dp.

 * @usage
 * <hljs lang="html">
 * <div md-whiteframe="3">
 *   <span>Elevation of 3dp</span>
 * </div>
 * </hljs>
 *
 * <hljs lang="html">
 * <div md-whiteframe="-1">
 *   <span>No elevation shadow applied</span>
 * </div>
 * </hljs>
 *
 * <hljs lang="html">
 * <div ng-init="elevation = 5" md-whiteframe="{{elevation}}">
 *   <span>Elevation of 5dp with an interpolated value</span>
 * </div>
 * </hljs>
 */
function MdWhiteframeDirective($log) {
  var DISABLE_DP = -1;
  var MIN_DP = 1;
  var MAX_DP = 24;
  var DEFAULT_DP = 4;

  return {
    link: postLink
  };

  function postLink(scope, element, attr) {
    var oldClass = '';

    attr.$observe('mdWhiteframe', function(elevation) {
      elevation = parseInt(elevation, 10) || DEFAULT_DP;

      if (elevation != DISABLE_DP && (elevation > MAX_DP || elevation < MIN_DP)) {
        $log.warn('md-whiteframe attribute value is invalid. It should be a number between ' + MIN_DP + ' and ' + MAX_DP, element[0]);
        elevation = DEFAULT_DP;
      }

      var newClass = elevation == DISABLE_DP ? '' : 'md-whiteframe-' + elevation + 'dp';
      attr.$updateClass(newClass, oldClass);
      oldClass = newClass;
    });
  }
}


})();
(function(){
"use strict";

angular
  .module('material.components.icon')
  .directive('mdIcon', ['$mdIcon', '$mdTheming', '$mdAria', '$sce', mdIconDirective]);

/**
 * @ngdoc directive
 * @name mdIcon
 * @module material.components.icon
 *
 * @restrict E
 *
 * @description
 * The `md-icon` directive makes it easier to use vector-based icons in your app (as opposed to
 * raster-based icons types like PNG). The directive supports both icon fonts and SVG icons.
 *
 * Icons should be considered view-only elements that should not be used directly as buttons; instead nest a `<md-icon>`
 * inside a `md-button` to add hover and click features.
 *
 * ### Icon fonts
 * Icon fonts are a technique in which you use a font where the glyphs in the font are
 * your icons instead of text. Benefits include a straightforward way to bundle everything into a
 * single HTTP request, simple scaling, easy color changing, and more.
 *
 * `md-icon` lets you consume an icon font by letting you reference specific icons in that font
 * by name rather than character code.
 *
 * ### SVG
 * For SVGs, the problem with using `<img>` or a CSS `background-image` is that you can't take
 * advantage of some SVG features, such as styling specific parts of the icon with CSS or SVG
 * animation.
 *
 * `md-icon` makes it easier to use SVG icons by *inlining* the SVG into an `<svg>` element in the
 * document. The most straightforward way of referencing an SVG icon is via URL, just like a
 * traditional `<img>`. `$mdIconProvider`, as a convenience, lets you _name_ an icon so you can
 * reference it by name instead of URL throughout your templates.
 *
 * Additionally, you may not want to make separate HTTP requests for every icon, so you can bundle
 * your SVG icons together and pre-load them with $mdIconProvider as an icon set. An icon set can
 * also be given a name, which acts as a namespace for individual icons, so you can reference them
 * like `"social:cake"`.
 *
 * When using SVGs, both external SVGs (via URLs) or sets of SVGs [from icon sets] can be
 * easily loaded and used. When using font-icons, developers must follow three (3) simple steps:
 *
 * <ol>
 * <li>Load the font library. e.g.<br/>
 *    `<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
 *    rel="stylesheet">`
 * </li>
 * <li>
 *   Use either (a) font-icon class names or (b) a fontset and a font ligature to render the font glyph by
 *   using its textual name _or_ numerical character reference. Note that `material-icons` is the default fontset when
 *   none is specified.
 * </li>
 * <li> Use any of the following templates: <br/>
 *   <ul>
 *     <li>`<md-icon md-font-icon="classname"></md-icon>`</li>
 *     <li>`<md-icon md-font-set="font library classname or alias">textual_name</md-icon>`</li>
 *     <li>`<md-icon> numerical_character_reference </md-icon>`</li>
 *     <li>`<md-icon ng_bind="'textual_name'"></md-icon>`</li>
 *     <li>`<md-icon ng-bind="scopeVariable"></md-icon>`</li>
 *   </ul>
 * </li>
 * </ol>
 *
 * Full details for these steps can be found:
 *
 * <ul>
 * <li>http://google.github.io/material-design-icons/</li>
 * <li>http://google.github.io/material-design-icons/#icon-font-for-the-web</li>
 * </ul>
 *
 * The Material Design icon style <code>.material-icons</code> and the icon font references are published in
 * Material Design Icons:
 *
 * <ul>
 * <li>https://design.google.com/icons/</li>
 * <li>https://design.google.com/icons/#ic_accessibility</li>
 * </ul>
 *
 * ### Localization
 *
 * Because an `md-icon` element's text content is not intended to be translated, it is recommended to declare the text
 * content for an `md-icon` element in its start tag. Instead of using the HTML text content, consider using `ng-bind`
 * with a scope variable or literal string.
 *
 * Examples:
 *
 * <ul>
 *   <li>`<md-icon ng-bind="myIconVariable"></md-icon>`</li>
 *   <li>`<md-icon ng-bind="'menu'"></md-icon>`
 * </ul>
 *
 * <h2 id="material_design_icons">Material Design Icons</h2>
 * Using the Material Design Icon-Selector, developers can easily and quickly search for a Material Design font-icon and
 * determine its textual name and character reference code. Click on any icon to see the slide-up information
 * panel with details regarding a SVG download or information on the font-icon usage.
 *
 * <a href="https://www.google.com/design/icons/#ic_accessibility" target="_blank" style="border-bottom:none;">
 * <img src="https://cloud.githubusercontent.com/assets/210413/7902490/fe8dd14c-0780-11e5-98fb-c821cc6475e6.png"
 *      aria-label="Material Design Icon-Selector" style="max-width:75%;padding-left:10%">
 * </a>
 *
 * <span class="image_caption">
 *  Click on the image above to link to the
 *  <a href="https://design.google.com/icons/#ic_accessibility" target="_blank">Material Design Icon-Selector</a>.
 * </span>
 *
 * @param {string} md-font-icon String name of CSS icon associated with the font-face will be used
 * to render the icon. Requires the fonts and the named CSS styles to be preloaded.
 * @param {string} md-font-set CSS style name associated with the font library; which will be assigned as
 * the class for the font-icon ligature. This value may also be an alias that is used to lookup the classname;
 * internally use `$mdIconProvider.fontSet(<alias>)` to determine the style name.
 * @param {string} md-svg-src String URL (or expression) used to load, cache, and display an
 *     external SVG.
 * @param {string} md-svg-icon md-svg-icon String name used for lookup of the icon from the internal cache;
 *     interpolated strings or expressions may also be used. Specific set names can be used with
 *     the syntax `<set name>:<icon name>`.<br/><br/>
 * To use icon sets, developers are required to pre-register the sets using the `$mdIconProvider` service.
 * @param {string=} aria-label Labels icon for accessibility. If an empty string is provided, icon
 * will be hidden from accessibility layer with `aria-hidden="true"`. If there's no aria-label on the icon
 * nor a label on the parent element, a warning will be logged to the console.
 * @param {string=} alt Labels icon for accessibility. If an empty string is provided, icon
 * will be hidden from accessibility layer with `aria-hidden="true"`. If there's no alt on the icon
 * nor a label on the parent element, a warning will be logged to the console.
 *
 * @usage
 * When using SVGs:
 * <hljs lang="html">
 *
 *  <!-- Icon ID; may contain optional icon set prefix; icons must registered using $mdIconProvider -->
 *  <md-icon md-svg-icon="social:android"    aria-label="android " ></md-icon>
 *
 *  <!-- Icon urls; may be preloaded in templateCache -->
 *  <md-icon md-svg-src="/android.svg"       aria-label="android " ></md-icon>
 *  <md-icon md-svg-src="{{ getAndroid() }}" aria-label="android " ></md-icon>
 *
 * </hljs>
 *
 * Use the <code>$mdIconProvider</code> to configure your application with
 * svg iconsets.
 *
 * <hljs lang="js">
 *  angular.module('appSvgIconSets', ['ngMaterial'])
 *    .controller('DemoCtrl', function($scope) {})
 *    .config(function($mdIconProvider) {
 *      $mdIconProvider
 *         .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
 *         .defaultIconSet('img/icons/sets/core-icons.svg', 24);
 *     });
 * </hljs>
 *
 *
 * When using Font Icons with classnames:
 * <hljs lang="html">
 *
 *  <md-icon md-font-icon="android" aria-label="android" ></md-icon>
 *  <md-icon class="icon_home"      aria-label="Home"    ></md-icon>
 *
 * </hljs>
 *
 * When using Material Font Icons with ligatures:
 * <hljs lang="html">
 *  <!--
 *  For Material Design Icons
 *  The class '.material-icons' is auto-added if a style has NOT been specified
 *  since `material-icons` is the default fontset. So your markup:
 *  -->
 *  <md-icon> face </md-icon>
 *  <!-- becomes this at runtime: -->
 *  <md-icon md-font-set="material-icons"> face </md-icon>
 *  <!-- If the fontset does not support ligature names, then we need to use the ligature unicode.-->
 *  <md-icon> &#xE87C; </md-icon>
 *  <!-- The class '.material-icons' must be manually added if other styles are also specified-->
 *  <md-icon class="material-icons md-light md-48"> face </md-icon>
 * </hljs>
 *
 * When using other Font-Icon libraries:
 *
 * <hljs lang="js">
 *  // Specify a font-icon style alias
 *  angular.config(function($mdIconProvider) {
 *    $mdIconProvider.fontSet('md', 'material-icons');
 *  });
 * </hljs>
 *
 * <hljs lang="html">
 *  <md-icon md-font-set="md">favorite</md-icon>
 * </hljs>
 *
 */
function mdIconDirective($mdIcon, $mdTheming, $mdAria, $sce) {

  return {
    restrict: 'E',
    link : postLink
  };


  /**
   * Directive postLink
   * Supports embedded SVGs, font-icons, & external SVGs
   */
  function postLink(scope, element, attr) {
    $mdTheming(element);
    var lastFontIcon = attr.mdFontIcon;
    var lastFontSet = $mdIcon.fontSet(attr.mdFontSet);

    prepareForFontIcon();

    attr.$observe('mdFontIcon', fontIconChanged);
    attr.$observe('mdFontSet', fontIconChanged);

    // Keep track of the content of the svg src so we can compare against it later to see if the
    // attribute is static (and thus safe).
    var originalSvgSrc = element[0].getAttribute(attr.$attr.mdSvgSrc);

    // If using a font-icon, then the textual name of the icon itself
    // provides the aria-label.

    var attrName = attr.$normalize(attr.$attr.mdSvgIcon || attr.$attr.mdSvgSrc || '');

    /* Provide a default accessibility role of img */
    if (!attr.role) {
      $mdAria.expect(element, 'role', 'img');
      /* manually update attr variable */
      attr.role = 'img';
    }

    /* Don't process ARIA if already valid */
    if ( attr.role === "img" && !attr.ariaHidden && !$mdAria.hasAriaLabel(element) ) {
      var iconName;
      if (attr.alt) {
        /* Use alt text by default if available */
        $mdAria.expect(element, 'aria-label', attr.alt);
      } else if ($mdAria.parentHasAriaLabel(element, 2)) {
        /* Parent has ARIA so we will assume it will describe the image */
        $mdAria.expect(element, 'aria-hidden', 'true');
      } else if (iconName = (attr.mdFontIcon || attr.mdSvgIcon || element.text())) {
        /* Use icon name as aria-label */
        $mdAria.expect(element, 'aria-label', iconName);
      } else {
        /* No label found */
        $mdAria.expect(element, 'aria-hidden', 'true');
      }
    }

    if (attrName) {
      // Use either pre-configured SVG or URL source, respectively.
      attr.$observe(attrName, function(attrVal) {
        element.empty();
        if (attrVal) {
          $mdIcon(attrVal)
            .then(function(svg) {
            element.empty();
            element.append(svg);
          });
        }
      });
    }

    function prepareForFontIcon() {
      if (!attr.mdSvgIcon && !attr.mdSvgSrc) {
        if (attr.mdFontIcon) {
          element.addClass('md-font ' + attr.mdFontIcon);
        }

        element.addClass(lastFontSet);
      }
    }

    function fontIconChanged() {
      if (!attr.mdSvgIcon && !attr.mdSvgSrc) {
        if (attr.mdFontIcon) {
          element.removeClass(lastFontIcon);
          element.addClass(attr.mdFontIcon);

          lastFontIcon = attr.mdFontIcon;
        }

        var fontSet = $mdIcon.fontSet(attr.mdFontSet);

        if (lastFontSet !== fontSet) {
          element.removeClass(lastFontSet);
          element.addClass(fontSet);

          lastFontSet = fontSet;
        }
      }
    }
  }
}

})();
(function(){
"use strict";

  
MdIconService.$inject = ["config", "$templateRequest", "$q", "$log", "$mdUtil", "$sce"];angular
    .module('material.components.icon')
    .constant('$$mdSvgRegistry', {
        'mdTabsArrow':   'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4=',
        'mdClose':       'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik0xOSA2LjQxbC0xLjQxLTEuNDEtNS41OSA1LjU5LTUuNTktNS41OS0xLjQxIDEuNDEgNS41OSA1LjU5LTUuNTkgNS41OSAxLjQxIDEuNDEgNS41OS01LjU5IDUuNTkgNS41OSAxLjQxLTEuNDEtNS41OS01LjU5eiIvPjwvZz48L3N2Zz4=',
        'mdCancel':      'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik0xMiAyYy01LjUzIDAtMTAgNC40Ny0xMCAxMHM0LjQ3IDEwIDEwIDEwIDEwLTQuNDcgMTAtMTAtNC40Ny0xMC0xMC0xMHptNSAxMy41OWwtMS40MSAxLjQxLTMuNTktMy41OS0zLjU5IDMuNTktMS40MS0xLjQxIDMuNTktMy41OS0zLjU5LTMuNTkgMS40MS0xLjQxIDMuNTkgMy41OSAzLjU5LTMuNTkgMS40MSAxLjQxLTMuNTkgMy41OSAzLjU5IDMuNTl6Ii8+PC9nPjwvc3ZnPg==',
        'mdMenu':        'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0zLDZIMjFWOEgzVjZNMywxMUgyMVYxM0gzVjExTTMsMTZIMjFWMThIM1YxNloiIC8+PC9zdmc+',
        'mdToggleArrow': 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiPjxwYXRoIGQ9Ik0yNCAxNmwtMTIgMTIgMi44MyAyLjgzIDkuMTctOS4xNyA5LjE3IDkuMTcgMi44My0yLjgzeiIvPjxwYXRoIGQ9Ik0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==',
        'mdCalendar':    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgM2gtMVYxaC0ydjJIOFYxSDZ2Mkg1Yy0xLjExIDAtMS45OS45LTEuOTkgMkwzIDE5YzAgMS4xLjg5IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY4aDE0djExek03IDEwaDV2NUg3eiIvPjwvc3ZnPg==',
        'mdChecked':     'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik05IDE2LjE3TDQuODMgMTJsLTEuNDIgMS40MUw5IDE5IDIxIDdsLTEuNDEtMS40MXoiLz48L2c+PC9zdmc+'
    })
    .provider('$mdIcon', MdIconProvider);

/**
 * @ngdoc service
 * @name $mdIconProvider
 * @module material.components.icon
 *
 * @description
 * `$mdIconProvider` is used only to register icon IDs with URLs. These configuration features allow
 * icons and icon sets to be pre-registered and associated with source URLs **before** the `<md-icon />`
 * directives are compiled.
 *
 * If using font-icons, the developer is responsible for loading the fonts.
 *
 * If using SVGs, loading of the actual svg files are deferred to on-demand requests and are loaded
 * internally by the `$mdIcon` service using the `$templateRequest` service. When an SVG is
 * requested by name/ID, the `$mdIcon` service searches its registry for the associated source URL;
 * that URL is used to on-demand load and parse the SVG dynamically.
 *
 * The `$templateRequest` service expects the icons source to be loaded over trusted URLs.<br/>
 * This means, when loading icons from an external URL, you have to trust the URL in the `$sceDelegateProvider`.
 *
 * <hljs lang="js">
 *   app.config(function($sceDelegateProvider) {
 *     $sceDelegateProvider.resourceUrlWhitelist([
 *       // Adding 'self' to the whitelist, will allow requests from the current origin.
 *       'self',
 *       // Using double asterisks here, will allow all URLs to load.
 *       // We recommend to only specify the given domain you want to allow.
 *       '**'
 *     ]);
 *   });
 * </hljs>
 *
 * Read more about the [$sceDelegateProvider](https://docs.angularjs.org/api/ng/provider/$sceDelegateProvider).
 *
 * **Notice:** Most font-icons libraries do not support ligatures (for example `fontawesome`).<br/>
 *  In such cases you are not able to use the icon's ligature name - Like so:
 *
 *  <hljs lang="html">
 *    <md-icon md-font-set="fa">fa-bell</md-icon>
 *  </hljs>
 *
 * You should instead use the given unicode, instead of the ligature name.
 *
 * <p ng-hide="true"> ##// Notice we can't use a hljs element here, because the characters will be escaped.</p>
 *  ```html
 *    <md-icon md-font-set="fa">&#xf0f3</md-icon>
 *  ```
 *
 * All unicode ligatures are prefixed with the `&#x` string.
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .defaultFontSet( 'fa' )                   // This sets our default fontset className.
    *          .defaultIconSet('my/app/icons.svg')       // Register a default set of SVG icons
    *          .iconSet('social', 'my/app/social.svg')   // Register a named icon set of SVGs
    *          .icon('android', 'my/app/android.svg')    // Register a specific icon (by name)
    *          .icon('work:chair', 'my/app/chair.svg');  // Register icon in a specific set
    *   });
 * </hljs>
 *
 * SVG icons and icon sets can be easily pre-loaded and cached using either (a) a build process or (b) a runtime
 * **startup** process (shown below):
 *
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
    *
    *     // Register a default set of SVG icon definitions
    *     $mdIconProvider.defaultIconSet('my/app/icons.svg')
    *
    *   })
 *   .run(function($templateRequest){
    *
    *     // Pre-fetch icons sources by URL and cache in the $templateCache...
    *     // subsequent $templateRequest calls will look there first.
    *
    *     var urls = [ 'imy/app/icons.svg', 'img/icons/android.svg'];
    *
    *     angular.forEach(urls, function(url) {
    *       $templateRequest(url);
    *     });
    *
    *   });
 *
 * </hljs>
 *
 * > <b>Note:</b> The loaded SVG data is subsequently cached internally for future requests.
 *
 */

/**
 * @ngdoc method
 * @name $mdIconProvider#icon
 *
 * @description
 * Register a source URL for a specific icon name; the name may include optional 'icon set' name prefix.
 * These icons  will later be retrieved from the cache using `$mdIcon( <icon name> )`
 *
 * @param {string} id Icon name/id used to register the icon
 * @param {string} url specifies the external location for the data file. Used internally by
 * `$templateRequest` to load the data or as part of the lookup in `$templateCache` if pre-loading
 * was configured.
 * @param {number=} viewBoxSize Sets the width and height the icon's viewBox.
 * It is ignored for icons with an existing viewBox. Default size is 24.
 *
 * @returns {obj} an `$mdIconProvider` reference; used to support method call chains for the API
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .icon('android', 'my/app/android.svg')    // Register a specific icon (by name)
    *          .icon('work:chair', 'my/app/chair.svg');  // Register icon in a specific set
    *   });
 * </hljs>
 *
 */
/**
 * @ngdoc method
 * @name $mdIconProvider#iconSet
 *
 * @description
 * Register a source URL for a 'named' set of icons; group of SVG definitions where each definition
 * has an icon id. Individual icons can be subsequently retrieved from this cached set using
 * `$mdIcon(<icon set name>:<icon name>)`
 *
 * @param {string} id Icon name/id used to register the iconset
 * @param {string} url specifies the external location for the data file. Used internally by
 * `$templateRequest` to load the data or as part of the lookup in `$templateCache` if pre-loading
 * was configured.
 * @param {number=} viewBoxSize Sets the width and height of the viewBox of all icons in the set.
 * It is ignored for icons with an existing viewBox. All icons in the icon set should be the same size.
 * Default value is 24.
 *
 * @returns {obj} an `$mdIconProvider` reference; used to support method call chains for the API
 *
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .iconSet('social', 'my/app/social.svg')   // Register a named icon set
    *   });
 * </hljs>
 *
 */
/**
 * @ngdoc method
 * @name $mdIconProvider#defaultIconSet
 *
 * @description
 * Register a source URL for the default 'named' set of icons. Unless explicitly registered,
 * subsequent lookups of icons will failover to search this 'default' icon set.
 * Icon can be retrieved from this cached, default set using `$mdIcon(<name>)`
 *
 * @param {string} url specifies the external location for the data file. Used internally by
 * `$templateRequest` to load the data or as part of the lookup in `$templateCache` if pre-loading
 * was configured.
 * @param {number=} viewBoxSize Sets the width and height of the viewBox of all icons in the set.
 * It is ignored for icons with an existing viewBox. All icons in the icon set should be the same size.
 * Default value is 24.
 *
 * @returns {obj} an `$mdIconProvider` reference; used to support method call chains for the API
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .defaultIconSet( 'my/app/social.svg' )   // Register a default icon set
    *   });
 * </hljs>
 *
 */
/**
 * @ngdoc method
 * @name $mdIconProvider#defaultFontSet
 *
 * @description
 * When using Font-Icons, AngularJS Material assumes the the Material Design icons will be used and automatically
 * configures the default font-set == 'material-icons'. Note that the font-set references the font-icon library
 * class style that should be applied to the `<md-icon>`.
 *
 * Configuring the default means that the attributes
 * `md-font-set="material-icons"` or `class="material-icons"` do not need to be explicitly declared on the
 * `<md-icon>` markup. For example:
 *
 *  `<md-icon> face </md-icon>`
 *  will render as
 *  `<span class="material-icons"> face </span>`, and
 *
 *  `<md-icon md-font-set="fa"> face </md-icon>`
 *  will render as
 *  `<span class="fa"> face </span>`
 *
 * @param {string} name of the font-library style that should be applied to the md-icon DOM element
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
   *     $mdIconProvider.defaultFontSet( 'fa' );
   *   });
 * </hljs>
 *
 */

/**
 * @ngdoc method
 * @name $mdIconProvider#fontSet
 *
 * @description
 * When using a font set for `<md-icon>` you must specify the correct font classname in the `md-font-set`
 * attribute. If the fonset className is really long, your markup may become cluttered... an easy
 * solution is to define an `alias` for your fontset:
 *
 * @param {string} alias of the specified fontset.
 * @param {string} className of the fontset.
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
   *     // In this case, we set an alias for the `material-icons` fontset.
   *     $mdIconProvider.fontSet('md', 'material-icons');
   *   });
 * </hljs>
 *
 */

/**
 * @ngdoc method
 * @name $mdIconProvider#defaultViewBoxSize
 *
 * @description
 * While `<md-icon />` markup can also be style with sizing CSS, this method configures
 * the default width **and** height used for all icons; unless overridden by specific CSS.
 * The default sizing is (24px, 24px).
 * @param {number=} viewBoxSize Sets the width and height of the viewBox for an icon or an icon set.
 * All icons in a set should be the same size. The default value is 24.
 *
 * @returns {obj} an `$mdIconProvider` reference; used to support method call chains for the API
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .defaultViewBoxSize(36)   // Register a default icon size (width == height)
    *   });
 * </hljs>
 *
 */

var config = {
  defaultViewBoxSize: 24,
  defaultFontSet: 'material-icons',
  fontSets: []
};

function MdIconProvider() {
}

MdIconProvider.prototype = {
  icon: function(id, url, viewBoxSize) {
    if (id.indexOf(':') == -1) id = '$default:' + id;

    config[id] = new ConfigurationItem(url, viewBoxSize);
    return this;
  },

  iconSet: function(id, url, viewBoxSize) {
    config[id] = new ConfigurationItem(url, viewBoxSize);
    return this;
  },

  defaultIconSet: function(url, viewBoxSize) {
    var setName = '$default';

    if (!config[setName]) {
      config[setName] = new ConfigurationItem(url, viewBoxSize);
    }

    config[setName].viewBoxSize = viewBoxSize || config.defaultViewBoxSize;

    return this;
  },

  defaultViewBoxSize: function(viewBoxSize) {
    config.defaultViewBoxSize = viewBoxSize;
    return this;
  },

  /**
   * Register an alias name associated with a font-icon library style ;
   */
  fontSet: function fontSet(alias, className) {
    config.fontSets.push({
      alias: alias,
      fontSet: className || alias
    });
    return this;
  },

  /**
   * Specify a default style name associated with a font-icon library
   * fallback to Material Icons.
   *
   */
  defaultFontSet: function defaultFontSet(className) {
    config.defaultFontSet = !className ? '' : className;
    return this;
  },

  defaultIconSize: function defaultIconSize(iconSize) {
    config.defaultIconSize = iconSize;
    return this;
  },

  $get: ['$templateRequest', '$q', '$log', '$mdUtil', '$sce', function($templateRequest, $q, $log, $mdUtil, $sce) {
    return MdIconService(config, $templateRequest, $q, $log, $mdUtil, $sce);
  }]
};

/**
 *  Configuration item stored in the Icon registry; used for lookups
 *  to load if not already cached in the `loaded` cache
 */
function ConfigurationItem(url, viewBoxSize) {
  this.url = url;
  this.viewBoxSize = viewBoxSize || config.defaultViewBoxSize;
}

/**
 * @ngdoc service
 * @name $mdIcon
 * @module material.components.icon
 *
 * @description
 * The `$mdIcon` service is a function used to lookup SVG icons.
 *
 * @param {string} id Query value for a unique Id or URL. If the argument is a URL, then the service will retrieve the icon element
 * from its internal cache or load the icon and cache it first. If the value is not a URL-type string, then an ID lookup is
 * performed. The Id may be a unique icon ID or may include an iconSet ID prefix.
 *
 * For the **id** query to work properly, this means that all id-to-URL mappings must have been previously configured
 * using the `$mdIconProvider`.
 *
 * @returns {angular.$q.Promise} A promise that gets resolved to a clone of the initial SVG DOM element; which was
 * created from the SVG markup in the SVG data file. If an error occurs (e.g. the icon cannot be found) the promise
 * will get rejected.
 *
 * @usage
 * <hljs lang="js">
 * function SomeDirective($mdIcon) {
  *
  *   // See if the icon has already been loaded, if not
  *   // then lookup the icon from the registry cache, load and cache
  *   // it for future requests.
  *   // NOTE: ID queries require configuration with $mdIconProvider
  *
  *   $mdIcon('android').then(function(iconEl)    { element.append(iconEl); });
  *   $mdIcon('work:chair').then(function(iconEl) { element.append(iconEl); });
  *
  *   // Load and cache the external SVG using a URL
  *
  *   $mdIcon('img/icons/android.svg').then(function(iconEl) {
  *     element.append(iconEl);
  *   });
  * };
 * </hljs>
 *
 * > <b>Note:</b> The `<md-icon>` directive internally uses the `$mdIcon` service to query, loaded,
 *   and instantiate SVG DOM elements.
 */

/* @ngInject */
function MdIconService(config, $templateRequest, $q, $log, $mdUtil, $sce) {
  var iconCache = {};
  var svgCache = {};
  var urlRegex = /[-\w@:%+.~#?&//=]{2,}\.[a-z]{2,4}\b(\/[-\w@:%+.~#?&//=]*)?/i;
  var dataUrlRegex = /^data:image\/svg\+xml[\s*;\w\-=]*?(base64)?,(.*)$/i;

  Icon.prototype = {clone: cloneSVG, prepare: prepareAndStyle};
  getIcon.fontSet = findRegisteredFontSet;

  // Publish service...
  return getIcon;

  /**
   * Actual $mdIcon service is essentially a lookup function
   */
  function getIcon(id) {
    id = id || '';

    // If the "id" provided is not a string, the only other valid value is a $sce trust wrapper
    // over a URL string. If the value is not trusted, this will intentionally throw an error
    // because the user is attempted to use an unsafe URL, potentially opening themselves up
    // to an XSS attack.
    if (!angular.isString(id)) {
      id = $sce.getTrustedUrl(id);
    }

    // If already loaded and cached, use a clone of the cached icon.
    // Otherwise either load by URL, or lookup in the registry and then load by URL, and cache.

    if (iconCache[id]) {
      return $q.when(transformClone(iconCache[id]));
    }

    if (urlRegex.test(id) || dataUrlRegex.test(id)) {
      return loadByURL(id).then(cacheIcon(id));
    }

    if (id.indexOf(':') == -1) {
      id = '$default:' + id;
    }

    var load = config[id] ? loadByID : loadFromIconSet;
    return load(id)
      .then(cacheIcon(id));
  }

  /**
   * Lookup registered fontSet style using its alias...
   * If not found,
   */
  function findRegisteredFontSet(alias) {
    var useDefault = angular.isUndefined(alias) || !(alias && alias.length);
    if (useDefault) return config.defaultFontSet;

    var result = alias;
    angular.forEach(config.fontSets, function(it) {
      if (it.alias == alias) result = it.fontSet || result;
    });

    return result;
  }

  function transformClone(cacheElement) {
    var clone = cacheElement.clone();
    var cacheSuffix = '_cache' + $mdUtil.nextUid();

    // We need to modify for each cached icon the id attributes.
    // This is needed because SVG id's are treated as normal DOM ids
    // and should not have a duplicated id.
    if (clone.id) clone.id += cacheSuffix;
    angular.forEach(clone.querySelectorAll('[id]'), function(item) {
      item.id += cacheSuffix;
    });

    return clone;
  }

  /**
   * Prepare and cache the loaded icon for the specified `id`
   */
  function cacheIcon(id) {

    return function updateCache(icon) {
      iconCache[id] = isIcon(icon) ? icon : new Icon(icon, config[id]);

      return iconCache[id].clone();
    };
  }

  /**
   * Lookup the configuration in the registry, if !registered throw an error
   * otherwise load the icon [on-demand] using the registered URL.
   *
   */
  function loadByID(id) {
    var iconConfig = config[id];
    return loadByURL(iconConfig.url).then(function(icon) {
      return new Icon(icon, iconConfig);
    });
  }

  /**
   *    Loads the file as XML and uses querySelector( <id> ) to find
   *    the desired node...
   */
  function loadFromIconSet(id) {
    var setName = id.substring(0, id.lastIndexOf(':')) || '$default';
    var iconSetConfig = config[setName];

    return !iconSetConfig ? announceIdNotFound(id) : loadByURL(iconSetConfig.url).then(extractFromSet);

    function extractFromSet(set) {
      var iconName = id.slice(id.lastIndexOf(':') + 1);
      var icon = set.querySelector('#' + iconName);
      return icon ? new Icon(icon, iconSetConfig) : announceIdNotFound(id);
    }

    function announceIdNotFound(id) {
      var msg = 'icon ' + id + ' not found';
      $log.warn(msg);

      return $q.reject(msg || id);
    }
  }

  /**
   * Load the icon by URL (may use the $templateCache).
   * Extract the data for later conversion to Icon
   */
  function loadByURL(url) {
    /* Load the icon from embedded data URL. */
    function loadByDataUrl(url) {
      var results = dataUrlRegex.exec(url);
      var isBase64 = /base64/i.test(url);
      var data = isBase64 ? window.atob(results[2]) : results[2];

      return $q.when(angular.element(data)[0]);
    }

    /* Load the icon by URL using HTTP. */
    function loadByHttpUrl(url) {
      return $q(function(resolve, reject) {
        // Catch HTTP or generic errors not related to incorrect icon IDs.
        var announceAndReject = function(err) {
            var msg = angular.isString(err) ? err : (err.message || err.data || err.statusText);
            $log.warn(msg);
            reject(err);
          },
          extractSvg = function(response) {
            if (!svgCache[url]) {
              svgCache[url] = angular.element('<div>').append(response)[0].querySelector('svg');
            }
            resolve(svgCache[url]);
          };

        $templateRequest(url, true).then(extractSvg, announceAndReject);
      });
    }

    return dataUrlRegex.test(url)
      ? loadByDataUrl(url)
      : loadByHttpUrl(url);
  }

  /**
   * Check target signature to see if it is an Icon instance.
   */
  function isIcon(target) {
    return angular.isDefined(target.element) && angular.isDefined(target.config);
  }

  /**
   *  Define the Icon class
   */
  function Icon(el, config) {
    // If the node is a <symbol>, it won't be rendered so we have to convert it into <svg>.
    if (el && el.tagName.toLowerCase() === 'symbol') {
      var viewbox = el.getAttribute('viewBox');
      el = angular.element('<svg xmlns="http://www.w3.org/2000/svg">').html(el.innerHTML)[0];
      if (viewbox) el.setAttribute('viewBox', viewbox);
    }

    if (el && el.tagName.toLowerCase() !== 'svg') {
      el = angular.element('<svg xmlns="http://www.w3.org/2000/svg">').append(el.cloneNode(true))[0];
    }

    // Inject the namespace if not available...
    if (!el.getAttribute('xmlns')) {
      el.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    }

    this.element = el;
    this.config = config;
    this.prepare();
  }

  /**
   *  Prepare the DOM element that will be cached in the
   *  loaded iconCache store.
   */
  function prepareAndStyle() {
    var viewBoxSize = this.config ? this.config.viewBoxSize : config.defaultViewBoxSize;
    angular.forEach({
      'fit': '',
      'height': '100%',
      'width': '100%',
      'preserveAspectRatio': 'xMidYMid meet',
      'viewBox': this.element.getAttribute('viewBox') || ('0 0 ' + viewBoxSize + ' ' + viewBoxSize),
      'focusable': false // Disable IE11s default behavior to make SVGs focusable
    }, function(val, attr) {
      this.element.setAttribute(attr, val);
    }, this);
  }

  /**
   * Clone the Icon DOM element.
   */
  function cloneSVG() {
    // If the element or any of its children have a style attribute, then a CSP policy without
    // 'unsafe-inline' in the style-src directive, will result in a violation.
    return this.element.cloneNode(true);
  }

}

})();
(function(){ 
angular.module("material.core").constant("$MD_THEME_CSS", "md-backdrop{background-color:\"{{background-900-0.0}}\"}md-backdrop.md-opaque.md-THEME_NAME-theme{background-color:\"{{background-900-1.0}}\"}.md-button.md-THEME_NAME-theme:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme:not([disabled]):hover{background-color:\"{{background-500-0.2}}\"}.md-button.md-THEME_NAME-theme:not([disabled]).md-icon-button:hover{background-color:transparent}.md-button.md-THEME_NAME-theme.md-fab md-icon{color:\"{{accent-contrast}}\"}.md-button.md-THEME_NAME-theme.md-primary{color:\"{{primary-color}}\"}.md-button.md-THEME_NAME-theme.md-primary.md-fab,.md-button.md-THEME_NAME-theme.md-primary.md-raised{color:\"{{primary-contrast}}\";background-color:\"{{primary-color}}\"}.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]) md-icon,.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]) md-icon{color:\"{{primary-contrast}}\"}.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]):hover,.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]):hover{background-color:\"{{primary-600}}\"}.md-button.md-THEME_NAME-theme.md-primary:not([disabled]) md-icon{color:\"{{primary-color}}\"}.md-button.md-THEME_NAME-theme.md-fab{background-color:\"{{accent-color}}\";color:\"{{accent-contrast}}\"}.md-button.md-THEME_NAME-theme.md-fab:not([disabled]) .md-icon{color:\"{{accent-contrast}}\"}.md-button.md-THEME_NAME-theme.md-fab:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover{background-color:\"{{accent-A700}}\"}.md-button.md-THEME_NAME-theme.md-raised{color:\"{{background-900}}\";background-color:\"{{background-50}}\"}.md-button.md-THEME_NAME-theme.md-raised:not([disabled]) md-icon{color:\"{{background-900}}\"}.md-button.md-THEME_NAME-theme.md-raised:not([disabled]):hover{background-color:\"{{background-50}}\"}.md-button.md-THEME_NAME-theme.md-raised:not([disabled]).md-focused{background-color:\"{{background-200}}\"}.md-button.md-THEME_NAME-theme.md-warn{color:\"{{warn-color}}\"}.md-button.md-THEME_NAME-theme.md-warn.md-fab,.md-button.md-THEME_NAME-theme.md-warn.md-raised{color:\"{{warn-contrast}}\";background-color:\"{{warn-color}}\"}.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]) md-icon,.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]) md-icon{color:\"{{warn-contrast}}\"}.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]):hover,.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]):hover{background-color:\"{{warn-600}}\"}.md-button.md-THEME_NAME-theme.md-warn:not([disabled]) md-icon{color:\"{{warn-color}}\"}.md-button.md-THEME_NAME-theme.md-accent{color:\"{{accent-color}}\"}.md-button.md-THEME_NAME-theme.md-accent.md-fab,.md-button.md-THEME_NAME-theme.md-accent.md-raised{color:\"{{accent-contrast}}\";background-color:\"{{accent-color}}\"}.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]) md-icon,.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]) md-icon{color:\"{{accent-contrast}}\"}.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]):hover,.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]):hover{background-color:\"{{accent-A700}}\"}.md-button.md-THEME_NAME-theme.md-accent:not([disabled]) md-icon{color:\"{{accent-color}}\"}.md-button.md-THEME_NAME-theme.md-accent[disabled],.md-button.md-THEME_NAME-theme.md-fab[disabled],.md-button.md-THEME_NAME-theme.md-raised[disabled],.md-button.md-THEME_NAME-theme.md-warn[disabled],.md-button.md-THEME_NAME-theme[disabled]{color:\"{{foreground-3}}\";cursor:default}.md-button.md-THEME_NAME-theme.md-accent[disabled] md-icon,.md-button.md-THEME_NAME-theme.md-fab[disabled] md-icon,.md-button.md-THEME_NAME-theme.md-raised[disabled] md-icon,.md-button.md-THEME_NAME-theme.md-warn[disabled] md-icon,.md-button.md-THEME_NAME-theme[disabled] md-icon{color:\"{{foreground-3}}\"}.md-button.md-THEME_NAME-theme.md-fab[disabled],.md-button.md-THEME_NAME-theme.md-raised[disabled]{background-color:\"{{foreground-4}}\"}.md-button.md-THEME_NAME-theme[disabled]{background-color:transparent}._md a.md-THEME_NAME-theme:not(.md-button).md-primary{color:\"{{primary-color}}\"}._md a.md-THEME_NAME-theme:not(.md-button).md-primary:hover{color:\"{{primary-700}}\"}._md a.md-THEME_NAME-theme:not(.md-button).md-accent{color:\"{{accent-color}}\"}._md a.md-THEME_NAME-theme:not(.md-button).md-accent:hover{color:\"{{accent-A700}}\"}._md a.md-THEME_NAME-theme:not(.md-button).md-warn{color:\"{{warn-color}}\"}._md a.md-THEME_NAME-theme:not(.md-button).md-warn:hover{color:\"{{warn-700}}\"}md-card.md-THEME_NAME-theme{color:\"{{foreground-1}}\";background-color:\"{{background-hue-1}}\";border-radius:2px}md-card.md-THEME_NAME-theme .md-card-image{border-radius:2px 2px 0 0}md-card.md-THEME_NAME-theme md-card-header md-card-avatar md-icon{color:\"{{background-color}}\";background-color:\"{{foreground-3}}\"}md-card.md-THEME_NAME-theme md-card-header md-card-header-text .md-subhead,md-card.md-THEME_NAME-theme md-card-title md-card-title-text:not(:only-child) .md-subhead{color:\"{{foreground-2}}\"}md-content.md-THEME_NAME-theme{color:\"{{foreground-1}}\";background-color:\"{{background-default}}\"}md-dialog.md-THEME_NAME-theme{border-radius:4px;background-color:\"{{background-hue-1}}\";color:\"{{foreground-1}}\"}md-dialog.md-THEME_NAME-theme.md-content-overflow .md-actions,md-dialog.md-THEME_NAME-theme.md-content-overflow md-dialog-actions,md-divider.md-THEME_NAME-theme{border-top-color:\"{{foreground-4}}\"}.layout-gt-lg-row>md-divider.md-THEME_NAME-theme,.layout-gt-md-row>md-divider.md-THEME_NAME-theme,.layout-gt-sm-row>md-divider.md-THEME_NAME-theme,.layout-gt-xs-row>md-divider.md-THEME_NAME-theme,.layout-lg-row>md-divider.md-THEME_NAME-theme,.layout-md-row>md-divider.md-THEME_NAME-theme,.layout-row>md-divider.md-THEME_NAME-theme,.layout-sm-row>md-divider.md-THEME_NAME-theme,.layout-xl-row>md-divider.md-THEME_NAME-theme,.layout-xs-row>md-divider.md-THEME_NAME-theme{border-right-color:\"{{foreground-4}}\"}md-icon.md-THEME_NAME-theme{color:\"{{foreground-2}}\"}md-icon.md-THEME_NAME-theme.md-primary{color:\"{{primary-color}}\"}md-icon.md-THEME_NAME-theme.md-accent{color:\"{{accent-color}}\"}md-icon.md-THEME_NAME-theme.md-warn{color:\"{{warn-color}}\"}md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text h3,md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text h4,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text h3,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text h4{color:\"{{foreground-1}}\"}md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text p,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text p{color:\"{{foreground-2}}\"}md-list.md-THEME_NAME-theme .md-proxy-focus.md-focused div.md-no-style{background-color:\"{{background-100}}\"}md-list.md-THEME_NAME-theme md-list-item .md-avatar-icon{background-color:\"{{foreground-3}}\";color:\"{{background-color}}\"}md-list.md-THEME_NAME-theme md-list-item>md-icon{color:\"{{foreground-2}}\"}md-list.md-THEME_NAME-theme md-list-item>md-icon.md-highlight{color:\"{{primary-color}}\"}md-list.md-THEME_NAME-theme md-list-item>md-icon.md-highlight.md-accent{color:\"{{accent-color}}\"}._md-panel-backdrop.md-THEME_NAME-theme{background-color:\"{{background-900-1.0}}\"}md-progress-linear.md-THEME_NAME-theme .md-container{background-color:\"{{primary-100}}\"}md-progress-linear.md-THEME_NAME-theme .md-bar{background-color:\"{{primary-color}}\"}md-progress-linear.md-THEME_NAME-theme.md-warn .md-container{background-color:\"{{warn-100}}\"}md-progress-linear.md-THEME_NAME-theme.md-warn .md-bar{background-color:\"{{warn-color}}\"}md-progress-linear.md-THEME_NAME-theme.md-accent .md-container{background-color:\"{{accent-100}}\"}md-progress-linear.md-THEME_NAME-theme.md-accent .md-bar{background-color:\"{{accent-color}}\"}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-primary .md-bar1{background-color:\"{{primary-100}}\"}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-primary .md-dashed:before{background:radial-gradient(\"{{primary-100}}\" 0,\"{{primary-100}}\" 16%,transparent 42%)}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-bar1{background-color:\"{{warn-100}}\"}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-dashed:before{background:radial-gradient(\"{{warn-100}}\" 0,\"{{warn-100}}\" 16%,transparent 42%)}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-bar1{background-color:\"{{accent-100}}\"}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-dashed:before{background:radial-gradient(\"{{accent-100}}\" 0,\"{{accent-100}}\" 16%,transparent 42%)}md-sidenav.md-THEME_NAME-theme,md-sidenav.md-THEME_NAME-theme md-content{background-color:\"{{background-hue-1}}\"}md-slider.md-THEME_NAME-theme .md-track{background-color:\"{{foreground-3}}\"}md-slider.md-THEME_NAME-theme .md-track-ticks{color:\"{{background-contrast}}\"}md-slider.md-THEME_NAME-theme .md-focus-ring{background-color:\"{{accent-A200-0.2}}\"}md-slider.md-THEME_NAME-theme .md-disabled-thumb{border-color:\"{{background-color}}\";background-color:\"{{background-color}}\"}md-slider.md-THEME_NAME-theme.md-min .md-thumb:after{background-color:\"{{background-color}}\";border-color:\"{{foreground-3}}\"}md-slider.md-THEME_NAME-theme.md-min .md-focus-ring{background-color:\"{{foreground-3-0.38}}\"}md-slider.md-THEME_NAME-theme.md-min[md-discrete] .md-thumb:after{background-color:\"{{background-contrast}}\";border-color:transparent}md-slider.md-THEME_NAME-theme.md-min[md-discrete] .md-sign{background-color:\"{{background-400}}\"}md-slider.md-THEME_NAME-theme.md-min[md-discrete] .md-sign:after{border-top-color:\"{{background-400}}\"}md-slider.md-THEME_NAME-theme.md-min[md-discrete][md-vertical] .md-sign:after{border-top-color:transparent;border-left-color:\"{{background-400}}\"}md-slider.md-THEME_NAME-theme .md-track.md-track-fill{background-color:\"{{accent-color}}\"}md-slider.md-THEME_NAME-theme .md-thumb:after{border-color:\"{{accent-color}}\";background-color:\"{{accent-color}}\"}md-slider.md-THEME_NAME-theme .md-sign{background-color:\"{{accent-color}}\"}md-slider.md-THEME_NAME-theme .md-sign:after{border-top-color:\"{{accent-color}}\"}md-slider.md-THEME_NAME-theme[md-vertical] .md-sign:after{border-top-color:transparent;border-left-color:\"{{accent-color}}\"}md-slider.md-THEME_NAME-theme .md-thumb-text{color:\"{{accent-contrast}}\"}md-slider.md-THEME_NAME-theme.md-warn .md-focus-ring{background-color:\"{{warn-200-0.38}}\"}md-slider.md-THEME_NAME-theme.md-warn .md-track.md-track-fill{background-color:\"{{warn-color}}\"}md-slider.md-THEME_NAME-theme.md-warn .md-thumb:after{border-color:\"{{warn-color}}\";background-color:\"{{warn-color}}\"}md-slider.md-THEME_NAME-theme.md-warn .md-sign{background-color:\"{{warn-color}}\"}md-slider.md-THEME_NAME-theme.md-warn .md-sign:after{border-top-color:\"{{warn-color}}\"}md-slider.md-THEME_NAME-theme.md-warn[md-vertical] .md-sign:after{border-top-color:transparent;border-left-color:\"{{warn-color}}\"}md-slider.md-THEME_NAME-theme.md-warn .md-thumb-text{color:\"{{warn-contrast}}\"}md-slider.md-THEME_NAME-theme.md-primary .md-focus-ring{background-color:\"{{primary-200-0.38}}\"}md-slider.md-THEME_NAME-theme.md-primary .md-track.md-track-fill{background-color:\"{{primary-color}}\"}md-slider.md-THEME_NAME-theme.md-primary .md-thumb:after{border-color:\"{{primary-color}}\";background-color:\"{{primary-color}}\"}md-slider.md-THEME_NAME-theme.md-primary .md-sign{background-color:\"{{primary-color}}\"}md-slider.md-THEME_NAME-theme.md-primary .md-sign:after{border-top-color:\"{{primary-color}}\"}md-slider.md-THEME_NAME-theme.md-primary[md-vertical] .md-sign:after{border-top-color:transparent;border-left-color:\"{{primary-color}}\"}md-slider.md-THEME_NAME-theme.md-primary .md-thumb-text{color:\"{{primary-contrast}}\"}md-slider.md-THEME_NAME-theme[disabled] .md-thumb:after{border-color:transparent}md-slider.md-THEME_NAME-theme[disabled]:not(.md-min) .md-thumb:after,md-slider.md-THEME_NAME-theme[disabled][md-discrete] .md-thumb:after{background-color:\"{{foreground-3}}\";border-color:transparent}md-slider.md-THEME_NAME-theme[disabled][readonly] .md-sign{background-color:\"{{background-400}}\"}md-slider.md-THEME_NAME-theme[disabled][readonly] .md-sign:after{border-top-color:\"{{background-400}}\"}md-slider.md-THEME_NAME-theme[disabled][readonly][md-vertical] .md-sign:after{border-top-color:transparent;border-left-color:\"{{background-400}}\"}md-slider.md-THEME_NAME-theme[disabled][readonly] .md-disabled-thumb{border-color:transparent;background-color:transparent}md-slider-container[disabled]>:first-child:not(md-slider),md-slider-container[disabled]>:last-child:not(md-slider){color:\"{{foreground-3}}\"}.md-subheader.md-THEME_NAME-theme{color:\"{{ foreground-2-0.23 }}\";background-color:\"{{background-default}}\"}.md-subheader.md-THEME_NAME-theme.md-primary{color:\"{{primary-color}}\"}.md-subheader.md-THEME_NAME-theme.md-accent{color:\"{{accent-color}}\"}.md-subheader.md-THEME_NAME-theme.md-warn{color:\"{{warn-color}}\"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar){background-color:\"{{primary-color}}\";color:\"{{primary-contrast}}\"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-icon{color:\"{{primary-contrast}}\";fill:\"{{primary-contrast}}\"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) .md-button[disabled] md-icon{color:\"{{primary-contrast-0.26}}\";fill:\"{{primary-contrast-0.26}}\"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent{background-color:\"{{accent-color}}\";color:\"{{accent-contrast}}\"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent .md-ink-ripple{color:\"{{accent-contrast}}\"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-icon{color:\"{{accent-contrast}}\";fill:\"{{accent-contrast}}\"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent .md-button[disabled] md-icon{color:\"{{accent-contrast-0.26}}\";fill:\"{{accent-contrast-0.26}}\"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn{background-color:\"{{warn-color}}\";color:\"{{warn-contrast}}\"}.md-panel.md-tooltip.md-THEME_NAME-theme{color:\"{{background-700-contrast}}\";background-color:\"{{background-700}}\"}body.md-THEME_NAME-theme,html.md-THEME_NAME-theme{color:\"{{foreground-1}}\";background-color:\"{{background-color}}\"}"); 
})();


})(window, window.angular);;window.ngMaterial={version:{full: "1.1.10"}};