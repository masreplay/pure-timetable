import Vue from 'vue';

var script$1 = Vue.extend({
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
    clicked() {
      this.$emit("clicked", this.card, this.day, this.period);
    },

    increase_brightness(hex, percent) {
      // strip the leading # if it's there
      hex = hex.replace(/^\s*#|\s*$/g, ""); // convert 3 char codes --> 6, e.g. E0F --> EE00FF

      if (hex.length == 3) {
        hex = hex.replace(/(.)/g, "$1$1");
      }

      const r = parseInt(hex.substr(0, 2), 16),
            g = parseInt(hex.substr(2, 2), 16),
            b = parseInt(hex.substr(4, 2), 16);
      return "#" + (0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16).substr(1) + (0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16).substr(1) + (0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16).substr(1);
    }

  }
});

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
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
  }, [_c('div', {
    staticClass: "pt-2"
  }, [_vm._v(_vm._s(_vm.card.lesson.subject.name))]), _vm._v(" "), _vm.card.lesson.room_id != null ? _c('div', [_c('b', [_vm._v("\n      " + _vm._s(_vm.card.lesson.room.name) + "\n    ")])]) : _vm._e(), _vm._v(" "), _vm.card.lesson.teacher_id != null ? _c('div', {
    staticClass: "pb-2"
  }, [_vm._v("\n    " + _vm._s(_vm.card.lesson.teacher.name) + "\n  ")]) : _vm._e()]) : _vm._e();
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-4017e4a0_0", {
    source: ".card-div{height:100%;cursor:pointer}.card-div:hover{height:100%;outline:10px solid!important;border-radius:4px}.justify-content-between{justify-content:space-between!important}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

var TimetableCard = __vue_component__$1;

var script = Vue.extend({
  name: "PureTimetable",
  components: {
    TimetableCard
  },

  data() {
    return {
      selectedCard: null,
      selectedDay: null,
      selectedPeriod: null
    };
  },

  methods: {
    getCard(period_id, day_id) {
      for (let card of this.schedule.cards) {
        if (card.period_id === period_id && card.day_id === day_id) return card;
      }
    },

    onCardClick(card, day, period) {
      this.$emit("onCardClick", card, day, period);
      this.selectedCard = card;
      this.selectedDay = day;
      this.selectedPeriod = period;
    },

    formatPeriod(value) {
      const parts = value.split(":");
      return parts[0] + ":" + parts[1];
    }

  },
  props: {
    schedule: {
      type: Object,
      required: true
    }
  }
});

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "table-responsive"
  }, [_c('table', {
    staticClass: "table-bordered rounded"
  }, [_c('thead', [_c('tr', {
    staticClass: "bottom-bordered"
  }, [_c('th', {
    staticStyle: {
      "border-top": "0px !important",
      "border-right": "0px !important"
    }
  }), _vm._v(" "), _vm._l(_vm.schedule.periods, function (period) {
    return _c('th', {
      key: period.id,
      staticStyle: {
        "border-top": "0px !important"
      },
      attrs: {
        "scope": "col"
      }
    }, [_vm._v("\n          " + _vm._s(_vm.formatPeriod(period.start_time)) + " -\n          " + _vm._s(_vm.formatPeriod(period.end_time)) + "\n        ")]);
  })], 2)]), _vm._v(" "), _c('tbody', _vm._l(_vm.schedule.days, function (day) {
    return _c('tr', {
      key: day.id
    }, [_c('td', {
      staticClass: "td-width bordered",
      staticStyle: {
        "border-right": "0px !important"
      },
      attrs: {
        "width": "12.5%"
      }
    }, [_c('h2', [_vm._v(_vm._s(day.name))])]), _vm._v(" "), _vm._l(_vm.schedule.periods, function (period) {
      return _c('td', {
        key: period.id,
        staticClass: "td-width",
        attrs: {
          "width": "12.5%"
        }
      }, [_c('TimetableCard', {
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
  }), 0)])]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-2c3fe61a_0", {
    source: ".table-responsive{overflow-x:auto;-webkit-overflow-scrolling:touch}.table-bordered{width:100%;max-width:100%;border:1px solid #ddd!important;background-color:transparent;border-collapse:collapse;border-spacing:0;display:table;border-collapse:separate;box-sizing:border-box;text-indent:initial;border-spacing:0}.table-bordered>:not(caption):not(.bottom-bordered)>*>*{padding:.5rem .5rem;border-top:1px solid #ddd!important;border-right:1px solid #ddd!important;border-left:1px solid #ddd!important}.bottom-bordered{border-top:0!important}tr{border-width:0 1px;border:1px solid #ddd!important;line-height:20px;min-height:20px;height:20px}tr td{padding:0!important;margin:0!important;text-align:center}td{height:110px}@media (max-width:900px){.td-width{min-width:150px!important}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var component = __vue_component__;

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Assign InstallableComponent type
  const installable = component; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('PureTimetable', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
