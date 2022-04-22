'use strict';var Vue=require('vue');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var Vue__default=/*#__PURE__*/_interopDefaultLegacy(Vue);function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}var script$1 = Vue__default["default"].extend({
  name: "TimetableCard",
  props: {
    card: {
      type: Object
    },
    period: {
      type: Object
    },
    day: {
      type: Object
    }
  },
  methods: {
    clicked: function clicked() {
      this.$emit("clicked", this.card, this.day, this.period);
    },
    increase_brightness: function increase_brightness(hex, percent) {
      // strip the leading # if it's there
      hex = hex.replace(/^\s*#|\s*$/g, ""); // convert 3 char codes --> 6, e.g. E0F --> EE00FF

      if (hex.length == 3) {
        hex = hex.replace(/(.)/g, "$1$1");
      }

      var r = parseInt(hex.substr(0, 2), 16),
          g = parseInt(hex.substr(2, 2), 16),
          b = parseInt(hex.substr(4, 2), 16);
      return "#" + (0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16).substr(1) + (0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16).substr(1) + (0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16).substr(1);
    }
  }
});function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.card != null ? _c('div', {
    staticClass: "d-flex flex-column card-div justify-content-between",
    style: {
      'background-color': _vm.card.lesson.teacher.color || '#ffffff',
      'outline-color': _vm.increase_brightness(_vm.card.lesson.teacher.color, 50) + " !important"
    },
    on: {
      "click": _vm.clicked
    }
  }, [_vm._ssrNode("<div class=\"pt-2\">" + _vm._ssrEscape(_vm._s(_vm.card.lesson.subject.name)) + "</div> " + (_vm.card.lesson.room_id != null ? "<div><b>" + _vm._ssrEscape("\n      " + _vm._s(_vm.card.lesson.room.name) + "\n    ") + "</b></div>" : "<!---->") + " " + (_vm.card.lesson.teacher_id != null ? "<div class=\"pb-2\">" + _vm._ssrEscape("\n    " + _vm._s(_vm.card.lesson.teacher.name) + "\n  ") + "</div>" : "<!---->"))]) : _vm._e();
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-4017e4a0_0", {
    source: ".card-div{height:100%;cursor:pointer}.card-div:hover{height:100%;outline:10px solid!important;border-radius:4px}.justify-content-between{justify-content:space-between!important}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-4017e4a0";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);

var TimetableCard = __vue_component__$1;var script = Vue__default["default"].extend({
  name: "PureTimetable",
  components: {
    TimetableCard: TimetableCard
  },
  data: function data() {
    return {
      selectedCard: null,
      selectedDay: null,
      selectedPeriod: null
    };
  },
  methods: {
    getCard: function getCard(period_id, day_id) {
      var _iterator = _createForOfIteratorHelper(this.schedule.cards),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var card = _step.value;
          if (card.period_id === period_id && card.day_id === day_id) return card;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    onCardClick: function onCardClick(card, day, period) {
      this.$emit("onCardClick", card, day, period);
      this.selectedCard = card;
      this.selectedDay = day;
      this.selectedPeriod = period;
    },
    formatPeriod: function formatPeriod(value) {
      var parts = value.split(":");
      return parts[0] + ":" + parts[1];
    }
  },
  props: {
    schedule: {
      type: Object,
      required: true
    }
  }
});/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "table-responsive"
  }, [_vm._ssrNode("<table class=\"table-bordered rounded\">", "</table>", [_vm._ssrNode("<thead><tr class=\"bottom-bordered\"><th style=\"border-top: 0px !important; border-right: 0px !important\"></th> " + _vm._ssrList(_vm.schedule.periods, function (period) {
    return "<th scope=\"col\" style=\"border-top: 0px !important\">" + _vm._ssrEscape("\n          " + _vm._s(_vm.formatPeriod(period.start_time)) + " -\n          " + _vm._s(_vm.formatPeriod(period.end_time)) + "\n        ") + "</th>";
  }) + "</tr></thead> "), _vm._ssrNode("<tbody>", "</tbody>", _vm._l(_vm.schedule.days, function (day) {
    return _vm._ssrNode("<tr>", "</tr>", [_vm._ssrNode("<td width=\"12.5%\" class=\"td-width bordered\" style=\"border-right: 0px !important\"><h2>" + _vm._ssrEscape(_vm._s(day.name)) + "</h2></td> "), _vm._l(_vm.schedule.periods, function (period) {
      return _vm._ssrNode("<td width=\"12.5%\" class=\"td-width\">", "</td>", [_c('TimetableCard', {
        attrs: {
          "card": _vm.getCard(period.id, day.id),
          "period": period,
          "day": day
        },
        on: {
          "clicked": _vm.onCardClick
        }
      })], 1);
    })], 2);
  }), 0)], 2)]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-2c3fe61a_0", {
    source: ".table-responsive{overflow-x:auto;-webkit-overflow-scrolling:touch}.table-bordered{width:100%;max-width:100%;border:1px solid #ddd!important;background-color:transparent;border-collapse:collapse;border-spacing:0;display:table;border-collapse:separate;box-sizing:border-box;text-indent:initial;border-spacing:0}.table-bordered>:not(caption):not(.bottom-bordered)>*>*{padding:.5rem .5rem;border-top:1px solid #ddd!important;border-right:1px solid #ddd!important;border-left:1px solid #ddd!important}.bottom-bordered{border-top:0!important}tr{border-width:0 1px;border:1px solid #ddd!important;line-height:20px;min-height:20px;height:20px}tr td{padding:0!important;margin:0!important;text-align:center}td{height:110px}@media (max-width:900px){.td-width{min-width:150px!important}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-2c3fe61a";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);

var component$1 = __vue_component__;// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(function () {
  // Assign InstallableComponent type
  var installable = component$1; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('PureTimetable', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;