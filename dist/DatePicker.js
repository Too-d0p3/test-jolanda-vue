import { ref as _s, onMounted as zr, onUnmounted as Zr, watch as Ds, openBlock as qe, createElementBlock as Je, toDisplayString as bs, createCommentVNode as vs, createElementVNode as C } from "vue";
function se(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function $t(e) {
  return e[e.length - 1];
}
function ye(e, ...t) {
  return t.forEach((s) => {
    e.includes(s) || e.push(s);
  }), e;
}
function Ot(e, t) {
  return e ? e.split(t) : [];
}
function zt(e, t, s) {
  const r = t === void 0 || e >= t, a = s === void 0 || e <= s;
  return r && a;
}
function Bs(e, t, s) {
  return e < t ? t : e > s ? s : e;
}
function Ye(e, t, s = {}, r = 0, a = "") {
  const i = Object.keys(s).reduce((o, l) => {
    let u = s[l];
    return typeof u == "function" && (u = u(r)), `${o} ${l}="${u}"`;
  }, e);
  a += `<${i}></${e}>`;
  const n = r + 1;
  return n < t ? Ye(e, t, s, n, a) : a;
}
function Zt(e) {
  return e.replace(/>\s+/g, ">").replace(/\s+</, "<");
}
function Vt(e) {
  return new Date(e).setHours(0, 0, 0, 0);
}
function we() {
  return (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
}
function ue(...e) {
  switch (e.length) {
    case 0:
      return we();
    case 1:
      return Vt(e[0]);
  }
  const t = /* @__PURE__ */ new Date(0);
  return t.setFullYear(...e), t.setHours(0, 0, 0, 0);
}
function be(e, t) {
  const s = new Date(e);
  return s.setDate(s.getDate() + t);
}
function Kr(e, t) {
  return be(e, t * 7);
}
function it(e, t) {
  const s = new Date(e), r = s.getMonth() + t;
  let a = r % 12;
  a < 0 && (a += 12);
  const i = s.setMonth(r);
  return s.getMonth() !== a ? s.setDate(0) : i;
}
function ve(e, t) {
  const s = new Date(e), r = s.getMonth(), a = s.setFullYear(s.getFullYear() + t);
  return r === 1 && s.getMonth() === 2 ? s.setDate(0) : a;
}
function Ms(e, t) {
  return (e - t + 7) % 7;
}
function nt(e, t, s = 0) {
  const r = new Date(e).getDay();
  return be(e, Ms(t, s) - Ms(r, s));
}
function qr(e) {
  const t = nt(e, 4, 1), s = nt(new Date(t).setMonth(0, 4), 4, 1);
  return Math.round((t - s) / 6048e5) + 1;
}
function fe(e, t) {
  const s = new Date(e).getFullYear();
  return Math.floor(s / t) * t;
}
const Rt = /dd?|DD?|mm?|MM?|yy?(?:yy)?/, Jr = /[\s!-/:-@[-`{-~年月日]+/;
let Yt = {};
const Ss = {
  y(e, t) {
    return new Date(e).setFullYear(parseInt(t, 10));
  },
  m(e, t, s) {
    const r = new Date(e);
    let a = parseInt(t, 10) - 1;
    if (isNaN(a)) {
      if (!t)
        return NaN;
      const i = t.toLowerCase(), n = (o) => o.toLowerCase().startsWith(i);
      if (a = s.monthsShort.findIndex(n), a < 0 && (a = s.months.findIndex(n)), a < 0)
        return NaN;
    }
    return r.setMonth(a), r.getMonth() !== Gs(a) ? r.setDate(0) : r.getTime();
  },
  d(e, t) {
    return new Date(e).setDate(parseInt(t, 10));
  }
}, Qr = {
  d(e) {
    return e.getDate();
  },
  dd(e) {
    return Qe(e.getDate(), 2);
  },
  D(e, t) {
    return t.daysShort[e.getDay()];
  },
  DD(e, t) {
    return t.days[e.getDay()];
  },
  m(e) {
    return e.getMonth() + 1;
  },
  mm(e) {
    return Qe(e.getMonth() + 1, 2);
  },
  M(e, t) {
    return t.monthsShort[e.getMonth()];
  },
  MM(e, t) {
    return t.months[e.getMonth()];
  },
  y(e) {
    return e.getFullYear();
  },
  yy(e) {
    return Qe(e.getFullYear(), 2).slice(-2);
  },
  yyyy(e) {
    return Qe(e.getFullYear(), 4);
  }
};
function Gs(e) {
  return e > -1 ? e % 12 : Gs(e + 12);
}
function Qe(e, t) {
  return e.toString().padStart(t, "0");
}
function $s(e) {
  if (typeof e != "string")
    throw new Error("Invalid date format.");
  if (e in Yt)
    return Yt[e];
  const t = e.split(Rt), s = e.match(new RegExp(Rt, "g"));
  if (t.length === 0 || !s)
    throw new Error("Invalid date format.");
  const r = s.map((i) => Qr[i]), a = Object.keys(Ss).reduce((i, n) => (s.find((l) => l[0] !== "D" && l[0].toLowerCase() === n) && i.push(n), i), []);
  return Yt[e] = {
    parser(i, n) {
      const o = i.split(Jr).reduce((l, u, f) => {
        if (u.length > 0 && s[f]) {
          const y = s[f][0];
          y === "M" ? l.m = u : y !== "D" && (l[y] = u);
        }
        return l;
      }, {});
      return a.reduce((l, u) => {
        const f = Ss[u](l, o[u], n);
        return isNaN(f) ? l : f;
      }, we());
    },
    formatter(i, n) {
      let o = r.reduce((l, u, f) => l += `${t[f]}${u(i, n)}`, "");
      return o += $t(t);
    }
  };
}
function Ae(e, t, s) {
  if (e instanceof Date || typeof e == "number") {
    const r = Vt(e);
    return isNaN(r) ? void 0 : r;
  }
  if (e) {
    if (e === "today")
      return we();
    if (t && t.toValue) {
      const r = t.toValue(e, t, s);
      return isNaN(r) ? void 0 : Vt(r);
    }
    return $s(t).parser(e, s);
  }
}
function He(e, t, s) {
  if (isNaN(e) || !e && e !== 0)
    return "";
  const r = typeof e == "number" ? new Date(e) : e;
  return t.toDisplay ? t.toDisplay(r, t, s) : $s(t).formatter(r, s);
}
const ot = /* @__PURE__ */ new WeakMap(), { addEventListener: Xr, removeEventListener: ea } = EventTarget.prototype;
function Kt(e, t) {
  let s = ot.get(e);
  s || (s = [], ot.set(e, s)), t.forEach((r) => {
    Xr.call(...r), s.push(r);
  });
}
function zs(e) {
  let t = ot.get(e);
  t && (t.forEach((s) => {
    ea.call(...s);
  }), ot.delete(e));
}
if (!Event.prototype.composedPath) {
  const e = (t, s = []) => {
    s.push(t);
    let r;
    return t.parentNode ? r = t.parentNode : t.host ? r = t.host : t.defaultView && (r = t.defaultView), r ? e(r, s) : s;
  };
  Event.prototype.composedPath = function() {
    return e(this.target);
  };
}
function Zs(e, t, s, r = 0) {
  const a = e[r];
  return t(a) ? a : a === s || !a.parentElement ? void 0 : Zs(e, t, s, r + 1);
}
function Ks(e, t) {
  const s = typeof t == "function" ? t : (r) => r.matches(t);
  return Zs(e.composedPath(), s, e.currentTarget);
}
const Fe = {
  en: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Today",
    clear: "Clear",
    titleFormat: "MM y"
  }
}, qt = {
  autohide: !1,
  beforeShowDay: null,
  beforeShowDecade: null,
  beforeShowMonth: null,
  beforeShowYear: null,
  calendarWeeks: !1,
  clearBtn: !1,
  dateDelimiter: ",",
  datesDisabled: [],
  daysOfWeekDisabled: [],
  daysOfWeekHighlighted: [],
  defaultViewDate: void 0,
  // placeholder, defaults to today() by the program
  disableTouchKeyboard: !1,
  format: "mm/dd/yyyy",
  language: "en",
  maxDate: null,
  maxNumberOfDates: 1,
  maxView: 3,
  minDate: null,
  nextArrow: '<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>',
  orientation: "auto",
  pickLevel: 0,
  prevArrow: '<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/></svg>',
  showDaysOfWeek: !0,
  showOnClick: !0,
  showOnFocus: !0,
  startView: 0,
  title: "",
  todayBtn: !1,
  todayBtnMode: 0,
  todayHighlight: !1,
  updateOnBlur: !0,
  weekStart: 0
}, ta = document.createRange();
function re(e) {
  return ta.createContextualFragment(e);
}
function Pe(e) {
  e.style.display !== "none" && (e.style.display && (e.dataset.styleDisplay = e.style.display), e.style.display = "none");
}
function Ve(e) {
  e.style.display === "none" && (e.dataset.styleDisplay ? (e.style.display = e.dataset.styleDisplay, delete e.dataset.styleDisplay) : e.style.display = "");
}
function lt(e) {
  e.firstChild && (e.removeChild(e.firstChild), lt(e));
}
function sa(e, t) {
  lt(e), t instanceof DocumentFragment ? e.appendChild(t) : typeof t == "string" ? e.appendChild(re(t)) : typeof t.forEach == "function" && t.forEach((s) => {
    e.appendChild(s);
  });
}
const {
  language: Tt,
  format: ra,
  weekStart: aa
} = qt;
function xs(e, t) {
  return e.length < 6 && t >= 0 && t < 7 ? ye(e, t) : e;
}
function Os(e) {
  return (e + 6) % 7;
}
function Ys(e, t, s, r) {
  const a = Ae(e, t, s);
  return a !== void 0 ? a : r;
}
function Nt(e, t, s = 3) {
  const r = parseInt(e, 10);
  return r >= 0 && r <= s ? r : t;
}
function Wt(e, t) {
  const s = Object.assign({}, e), r = {}, a = t.constructor.locales;
  let {
    format: i,
    language: n,
    locale: o,
    maxDate: l,
    maxView: u,
    minDate: f,
    pickLevel: y,
    startView: g,
    weekStart: k
  } = t.config || {};
  if (s.language) {
    let w;
    if (s.language !== n && (a[s.language] ? w = s.language : (w = s.language.split("-")[0], a[w] === void 0 && (w = !1))), delete s.language, w) {
      n = r.language = w;
      const R = o || a[Tt];
      o = Object.assign({
        format: ra,
        weekStart: aa
      }, a[Tt]), n !== Tt && Object.assign(o, a[n]), r.locale = o, i === R.format && (i = r.format = o.format), k === R.weekStart && (k = r.weekStart = o.weekStart, r.weekEnd = Os(o.weekStart));
    }
  }
  if (s.format) {
    const w = typeof s.format.toDisplay == "function", R = typeof s.format.toValue == "function", Ke = Rt.test(s.format);
    (w && R || Ke) && (i = r.format = s.format), delete s.format;
  }
  let Y = f, T = l;
  if (s.minDate !== void 0 && (Y = s.minDate === null ? ue(0, 0, 1) : Ys(s.minDate, i, o, Y), delete s.minDate), s.maxDate !== void 0 && (T = s.maxDate === null ? void 0 : Ys(s.maxDate, i, o, T), delete s.maxDate), T < Y ? (f = r.minDate = T, l = r.maxDate = Y) : (f !== Y && (f = r.minDate = Y), l !== T && (l = r.maxDate = T)), s.datesDisabled && (r.datesDisabled = s.datesDisabled.reduce((w, R) => {
    const Ke = Ae(R, i, o);
    return Ke !== void 0 ? ye(w, Ke) : w;
  }, []), delete s.datesDisabled), s.defaultViewDate !== void 0) {
    const w = Ae(s.defaultViewDate, i, o);
    w !== void 0 && (r.defaultViewDate = w), delete s.defaultViewDate;
  }
  if (s.weekStart !== void 0) {
    const w = Number(s.weekStart) % 7;
    isNaN(w) || (k = r.weekStart = w, r.weekEnd = Os(w)), delete s.weekStart;
  }
  if (s.daysOfWeekDisabled && (r.daysOfWeekDisabled = s.daysOfWeekDisabled.reduce(xs, []), delete s.daysOfWeekDisabled), s.daysOfWeekHighlighted && (r.daysOfWeekHighlighted = s.daysOfWeekHighlighted.reduce(xs, []), delete s.daysOfWeekHighlighted), s.maxNumberOfDates !== void 0) {
    const w = parseInt(s.maxNumberOfDates, 10);
    w >= 0 && (r.maxNumberOfDates = w, r.multidate = w !== 1), delete s.maxNumberOfDates;
  }
  s.dateDelimiter && (r.dateDelimiter = String(s.dateDelimiter), delete s.dateDelimiter);
  let oe = y;
  s.pickLevel !== void 0 && (oe = Nt(s.pickLevel, 2), delete s.pickLevel), oe !== y && (y = r.pickLevel = oe);
  let V = u;
  s.maxView !== void 0 && (V = Nt(s.maxView, u), delete s.maxView), V = y > V ? y : V, V !== u && (u = r.maxView = V);
  let F = g;
  if (s.startView !== void 0 && (F = Nt(s.startView, F), delete s.startView), F < y ? F = y : F > u && (F = u), F !== g && (r.startView = F), s.prevArrow) {
    const w = re(s.prevArrow);
    w.childNodes.length > 0 && (r.prevArrow = w.childNodes), delete s.prevArrow;
  }
  if (s.nextArrow) {
    const w = re(s.nextArrow);
    w.childNodes.length > 0 && (r.nextArrow = w.childNodes), delete s.nextArrow;
  }
  if (s.disableTouchKeyboard !== void 0 && (r.disableTouchKeyboard = "ontouchstart" in document && !!s.disableTouchKeyboard, delete s.disableTouchKeyboard), s.orientation) {
    const w = s.orientation.toLowerCase().split(/\s+/g);
    r.orientation = {
      x: w.find((R) => R === "left" || R === "right") || "auto",
      y: w.find((R) => R === "top" || R === "bottom") || "auto"
    }, delete s.orientation;
  }
  if (s.todayBtnMode !== void 0) {
    switch (s.todayBtnMode) {
      case 0:
      case 1:
        r.todayBtnMode = s.todayBtnMode;
    }
    delete s.todayBtnMode;
  }
  return Object.keys(s).forEach((w) => {
    s[w] !== void 0 && se(qt, w) && (r[w] = s[w]);
  }), r;
}
const ia = Zt(`<div class="datepicker hidden">
  <div class="datepicker-picker inline-block rounded-lg bg-white dark:bg-gray-700 shadow-lg p-4">
    <div class="datepicker-header">
      <div class="datepicker-title bg-white dark:bg-gray-700 dark:text-white px-2 py-3 text-center font-semibold"></div>
      <div class="datepicker-controls flex justify-between mb-2">
        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 prev-btn"></button>
        <button type="button" class="text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch"></button>
        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 next-btn"></button>
      </div>
    </div>
    <div class="datepicker-main p-1"></div>
    <div class="datepicker-footer">
      <div class="datepicker-controls flex space-x-2 rtl:space-x-reverse mt-2">
        <button type="button" class="%buttonClass% today-btn text-white bg-blue-700 !bg-primary-700 dark:bg-blue-600 dark:!bg-primary-600 hover:bg-blue-800 hover:!bg-primary-800 dark:hover:bg-blue-700 dark:hover:!bg-primary-700 focus:ring-4 focus:ring-blue-300 focus:!ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>
        <button type="button" class="%buttonClass% clear-btn text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 focus:!ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>
      </div>
    </div>
  </div>
</div>`), na = Zt(`<div class="days">
  <div class="days-of-week grid grid-cols-7 mb-1">${Ye("span", 7, { class: "dow block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm" })}</div>
  <div class="datepicker-grid w-64 grid grid-cols-7">${Ye("span", 42, { class: "block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400" })}</div>
</div>`), oa = Zt(`<div class="calendar-weeks">
  <div class="days-of-week flex"><span class="dow h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"></span></div>
  <div class="weeks">${Ye("span", 6, { class: "week block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm" })}</div>
</div>`);
class Jt {
  constructor(t, s) {
    Object.assign(this, s, {
      picker: t,
      element: re('<div class="datepicker-view flex"></div>').firstChild,
      selected: []
    }), this.init(this.picker.datepicker.config);
  }
  init(t) {
    t.pickLevel !== void 0 && (this.isMinView = this.id === t.pickLevel), this.setOptions(t), this.updateFocus(), this.updateSelection();
  }
  // Execute beforeShow() callback and apply the result to the element
  // args:
  // - current - current value on the iteration on view rendering
  // - timeValue - time value of the date to pass to beforeShow()
  performBeforeHook(t, s, r) {
    let a = this.beforeShow(new Date(r));
    switch (typeof a) {
      case "boolean":
        a = { enabled: a };
        break;
      case "string":
        a = { classes: a };
    }
    if (a) {
      if (a.enabled === !1 && (t.classList.add("disabled"), ye(this.disabled, s)), a.classes) {
        const i = a.classes.split(/\s+/);
        t.classList.add(...i), i.includes("disabled") && ye(this.disabled, s);
      }
      a.content && sa(t, a.content);
    }
  }
}
class la extends Jt {
  constructor(t) {
    super(t, {
      id: 0,
      name: "days",
      cellClass: "day"
    });
  }
  init(t, s = !0) {
    if (s) {
      const r = re(na).firstChild;
      this.dow = r.firstChild, this.grid = r.lastChild, this.element.appendChild(r);
    }
    super.init(t);
  }
  setOptions(t) {
    let s;
    if (se(t, "minDate") && (this.minDate = t.minDate), se(t, "maxDate") && (this.maxDate = t.maxDate), t.datesDisabled && (this.datesDisabled = t.datesDisabled), t.daysOfWeekDisabled && (this.daysOfWeekDisabled = t.daysOfWeekDisabled, s = !0), t.daysOfWeekHighlighted && (this.daysOfWeekHighlighted = t.daysOfWeekHighlighted), t.todayHighlight !== void 0 && (this.todayHighlight = t.todayHighlight), t.weekStart !== void 0 && (this.weekStart = t.weekStart, this.weekEnd = t.weekEnd, s = !0), t.locale) {
      const r = this.locale = t.locale;
      this.dayNames = r.daysMin, this.switchLabelFormat = r.titleFormat, s = !0;
    }
    if (t.beforeShowDay !== void 0 && (this.beforeShow = typeof t.beforeShowDay == "function" ? t.beforeShowDay : void 0), t.calendarWeeks !== void 0)
      if (t.calendarWeeks && !this.calendarWeeks) {
        const r = re(oa).firstChild;
        this.calendarWeeks = {
          element: r,
          dow: r.firstChild,
          weeks: r.lastChild
        }, this.element.insertBefore(r, this.element.firstChild);
      } else
        this.calendarWeeks && !t.calendarWeeks && (this.element.removeChild(this.calendarWeeks.element), this.calendarWeeks = null);
    t.showDaysOfWeek !== void 0 && (t.showDaysOfWeek ? (Ve(this.dow), this.calendarWeeks && Ve(this.calendarWeeks.dow)) : (Pe(this.dow), this.calendarWeeks && Pe(this.calendarWeeks.dow))), s && Array.from(this.dow.children).forEach((r, a) => {
      const i = (this.weekStart + a) % 7;
      r.textContent = this.dayNames[i], r.className = this.daysOfWeekDisabled.includes(i) ? "dow disabled text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed" : "dow text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400";
    });
  }
  // Apply update on the focused date to view's settings
  updateFocus() {
    const t = new Date(this.picker.viewDate), s = t.getFullYear(), r = t.getMonth(), a = ue(s, r, 1), i = nt(a, this.weekStart, this.weekStart);
    this.first = a, this.last = ue(s, r + 1, 0), this.start = i, this.focused = this.picker.viewDate;
  }
  // Apply update on the selected dates to view's settings
  updateSelection() {
    const { dates: t, rangepicker: s } = this.picker.datepicker;
    this.selected = t, s && (this.range = s.dates);
  }
  // Update the entire view UI
  render() {
    this.today = this.todayHighlight ? we() : void 0, this.disabled = [...this.datesDisabled];
    const t = He(this.focused, this.switchLabelFormat, this.locale);
    if (this.picker.setViewSwitchLabel(t), this.picker.setPrevBtnDisabled(this.first <= this.minDate), this.picker.setNextBtnDisabled(this.last >= this.maxDate), this.calendarWeeks) {
      const s = nt(this.first, 1, 1);
      Array.from(this.calendarWeeks.weeks.children).forEach((r, a) => {
        r.textContent = qr(Kr(s, a));
      });
    }
    Array.from(this.grid.children).forEach((s, r) => {
      const a = s.classList, i = be(this.start, r), n = new Date(i), o = n.getDay();
      if (s.className = `datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ${this.cellClass}`, s.dataset.date = i, s.textContent = n.getDate(), i < this.first ? a.add("prev", "text-gray-500", "dark:text-white") : i > this.last && a.add("next", "text-gray-500", "dark:text-white"), this.today === i && a.add("today", "bg-gray-100", "dark:bg-gray-600"), (i < this.minDate || i > this.maxDate || this.disabled.includes(i)) && a.add("disabled", "cursor-not-allowed"), this.daysOfWeekDisabled.includes(o) && (a.add("disabled", "cursor-not-allowed"), ye(this.disabled, i)), this.daysOfWeekHighlighted.includes(o) && a.add("highlighted"), this.range) {
        const [l, u] = this.range;
        i > l && i < u && (a.add("range", "bg-gray-200", "dark:bg-gray-600"), a.remove("rounded-lg", "rounded-l-lg", "rounded-r-lg")), i === l && (a.add("range-start", "bg-gray-100", "dark:bg-gray-600", "rounded-l-lg"), a.remove("rounded-lg", "rounded-r-lg")), i === u && (a.add("range-end", "bg-gray-100", "dark:bg-gray-600", "rounded-r-lg"), a.remove("rounded-lg", "rounded-l-lg"));
      }
      this.selected.includes(i) && (a.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white"), a.remove("text-gray-900", "text-gray-500", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600", "dark:bg-gray-600", "bg-gray-100", "bg-gray-200")), i === this.focused && a.add("focused"), this.beforeShow && this.performBeforeHook(s, i, i);
    });
  }
  // Update the view UI by applying the changes of selected and focused items
  refresh() {
    const [t, s] = this.range || [];
    this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach((r) => {
      r.classList.remove("range", "range-start", "range-end", "selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white", "focused"), r.classList.add("text-gray-900", "rounded-lg", "dark:text-white");
    }), Array.from(this.grid.children).forEach((r) => {
      const a = Number(r.dataset.date), i = r.classList;
      i.remove("bg-gray-200", "dark:bg-gray-600", "rounded-l-lg", "rounded-r-lg"), a > t && a < s && (i.add("range", "bg-gray-200", "dark:bg-gray-600"), i.remove("rounded-lg")), a === t && (i.add("range-start", "bg-gray-200", "dark:bg-gray-600", "rounded-l-lg"), i.remove("rounded-lg", "rounded-r-lg")), a === s && (i.add("range-end", "bg-gray-200", "dark:bg-gray-600", "rounded-r-lg"), i.remove("rounded-lg", "rounded-l-lg")), this.selected.includes(a) && (i.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white"), i.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600", "bg-gray-100", "bg-gray-200", "dark:bg-gray-600")), a === this.focused && i.add("focused");
    });
  }
  // Update the view UI by applying the change of focused item
  refreshFocus() {
    const t = Math.round((this.focused - this.start) / 864e5);
    this.grid.querySelectorAll(".focused").forEach((s) => {
      s.classList.remove("focused");
    }), this.grid.children[t].classList.add("focused");
  }
}
function Ts(e, t) {
  if (!e || !e[0] || !e[1])
    return;
  const [[s, r], [a, i]] = e;
  if (!(s > t || a < t))
    return [
      s === t ? r : -1,
      a === t ? i : 12
    ];
}
class da extends Jt {
  constructor(t) {
    super(t, {
      id: 1,
      name: "months",
      cellClass: "month"
    });
  }
  init(t, s = !0) {
    s && (this.grid = this.element, this.element.classList.add("months", "datepicker-grid", "w-64", "grid", "grid-cols-4"), this.grid.appendChild(re(Ye("span", 12, { "data-month": (r) => r })))), super.init(t);
  }
  setOptions(t) {
    if (t.locale && (this.monthNames = t.locale.monthsShort), se(t, "minDate"))
      if (t.minDate === void 0)
        this.minYear = this.minMonth = this.minDate = void 0;
      else {
        const s = new Date(t.minDate);
        this.minYear = s.getFullYear(), this.minMonth = s.getMonth(), this.minDate = s.setDate(1);
      }
    if (se(t, "maxDate"))
      if (t.maxDate === void 0)
        this.maxYear = this.maxMonth = this.maxDate = void 0;
      else {
        const s = new Date(t.maxDate);
        this.maxYear = s.getFullYear(), this.maxMonth = s.getMonth(), this.maxDate = ue(this.maxYear, this.maxMonth + 1, 0);
      }
    t.beforeShowMonth !== void 0 && (this.beforeShow = typeof t.beforeShowMonth == "function" ? t.beforeShowMonth : void 0);
  }
  // Update view's settings to reflect the viewDate set on the picker
  updateFocus() {
    const t = new Date(this.picker.viewDate);
    this.year = t.getFullYear(), this.focused = t.getMonth();
  }
  // Update view's settings to reflect the selected dates
  updateSelection() {
    const { dates: t, rangepicker: s } = this.picker.datepicker;
    this.selected = t.reduce((r, a) => {
      const i = new Date(a), n = i.getFullYear(), o = i.getMonth();
      return r[n] === void 0 ? r[n] = [o] : ye(r[n], o), r;
    }, {}), s && s.dates && (this.range = s.dates.map((r) => {
      const a = new Date(r);
      return isNaN(a) ? void 0 : [a.getFullYear(), a.getMonth()];
    }));
  }
  // Update the entire view UI
  render() {
    this.disabled = [], this.picker.setViewSwitchLabel(this.year), this.picker.setPrevBtnDisabled(this.year <= this.minYear), this.picker.setNextBtnDisabled(this.year >= this.maxYear);
    const t = this.selected[this.year] || [], s = this.year < this.minYear || this.year > this.maxYear, r = this.year === this.minYear, a = this.year === this.maxYear, i = Ts(this.range, this.year);
    Array.from(this.grid.children).forEach((n, o) => {
      const l = n.classList, u = ue(this.year, o, 1);
      if (n.className = `datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ${this.cellClass}`, this.isMinView && (n.dataset.date = u), n.textContent = this.monthNames[o], (s || r && o < this.minMonth || a && o > this.maxMonth) && l.add("disabled"), i) {
        const [f, y] = i;
        o > f && o < y && l.add("range"), o === f && l.add("range-start"), o === y && l.add("range-end");
      }
      t.includes(o) && (l.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white"), l.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600")), o === this.focused && l.add("focused"), this.beforeShow && this.performBeforeHook(n, o, u);
    });
  }
  // Update the view UI by applying the changes of selected and focused items
  refresh() {
    const t = this.selected[this.year] || [], [s, r] = Ts(this.range, this.year) || [];
    this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach((a) => {
      a.classList.remove("range", "range-start", "range-end", "selected", "bg-blue-700", "!bg-primary-700", "dark:bg-blue-600", "dark:!bg-primary-700", "dark:text-white", "text-white", "focused"), a.classList.add("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
    }), Array.from(this.grid.children).forEach((a, i) => {
      const n = a.classList;
      i > s && i < r && n.add("range"), i === s && n.add("range-start"), i === r && n.add("range-end"), t.includes(i) && (n.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white"), n.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600")), i === this.focused && n.add("focused");
    });
  }
  // Update the view UI by applying the change of focused item
  refreshFocus() {
    this.grid.querySelectorAll(".focused").forEach((t) => {
      t.classList.remove("focused");
    }), this.grid.children[this.focused].classList.add("focused");
  }
}
function ua(e) {
  return [...e].reduce((t, s, r) => t += r ? s : s.toUpperCase(), "");
}
class Ns extends Jt {
  constructor(t, s) {
    super(t, s);
  }
  init(t, s = !0) {
    s && (this.navStep = this.step * 10, this.beforeShowOption = `beforeShow${ua(this.cellClass)}`, this.grid = this.element, this.element.classList.add(this.name, "datepicker-grid", "w-64", "grid", "grid-cols-4"), this.grid.appendChild(re(Ye("span", 12)))), super.init(t);
  }
  setOptions(t) {
    if (se(t, "minDate") && (t.minDate === void 0 ? this.minYear = this.minDate = void 0 : (this.minYear = fe(t.minDate, this.step), this.minDate = ue(this.minYear, 0, 1))), se(t, "maxDate") && (t.maxDate === void 0 ? this.maxYear = this.maxDate = void 0 : (this.maxYear = fe(t.maxDate, this.step), this.maxDate = ue(this.maxYear, 11, 31))), t[this.beforeShowOption] !== void 0) {
      const s = t[this.beforeShowOption];
      this.beforeShow = typeof s == "function" ? s : void 0;
    }
  }
  // Update view's settings to reflect the viewDate set on the picker
  updateFocus() {
    const t = new Date(this.picker.viewDate), s = fe(t, this.navStep), r = s + 9 * this.step;
    this.first = s, this.last = r, this.start = s - this.step, this.focused = fe(t, this.step);
  }
  // Update view's settings to reflect the selected dates
  updateSelection() {
    const { dates: t, rangepicker: s } = this.picker.datepicker;
    this.selected = t.reduce((r, a) => ye(r, fe(a, this.step)), []), s && s.dates && (this.range = s.dates.map((r) => {
      if (r !== void 0)
        return fe(r, this.step);
    }));
  }
  // Update the entire view UI
  render() {
    this.disabled = [], this.picker.setViewSwitchLabel(`${this.first}-${this.last}`), this.picker.setPrevBtnDisabled(this.first <= this.minYear), this.picker.setNextBtnDisabled(this.last >= this.maxYear), Array.from(this.grid.children).forEach((t, s) => {
      const r = t.classList, a = this.start + s * this.step, i = ue(a, 0, 1);
      if (t.className = `datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ${this.cellClass}`, this.isMinView && (t.dataset.date = i), t.textContent = t.dataset.year = a, s === 0 ? r.add("prev") : s === 11 && r.add("next"), (a < this.minYear || a > this.maxYear) && r.add("disabled"), this.range) {
        const [n, o] = this.range;
        a > n && a < o && r.add("range"), a === n && r.add("range-start"), a === o && r.add("range-end");
      }
      this.selected.includes(a) && (r.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white"), r.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600")), a === this.focused && r.add("focused"), this.beforeShow && this.performBeforeHook(t, a, i);
    });
  }
  // Update the view UI by applying the changes of selected and focused items
  refresh() {
    const [t, s] = this.range || [];
    this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach((r) => {
      r.classList.remove("range", "range-start", "range-end", "selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark!bg-primary-600", "dark:text-white", "focused");
    }), Array.from(this.grid.children).forEach((r) => {
      const a = Number(r.textContent), i = r.classList;
      a > t && a < s && i.add("range"), a === t && i.add("range-start"), a === s && i.add("range-end"), this.selected.includes(a) && (i.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white"), i.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600")), a === this.focused && i.add("focused");
    });
  }
  // Update the view UI by applying the change of focused item
  refreshFocus() {
    const t = Math.round((this.focused - this.start) / this.step);
    this.grid.querySelectorAll(".focused").forEach((s) => {
      s.classList.remove("focused");
    }), this.grid.children[t].classList.add("focused");
  }
}
function Me(e, t) {
  const s = {
    date: e.getDate(),
    viewDate: new Date(e.picker.viewDate),
    viewId: e.picker.currentView.id,
    datepicker: e
  };
  e.element.dispatchEvent(new CustomEvent(t, { detail: s }));
}
function dt(e, t) {
  const { minDate: s, maxDate: r } = e.config, { currentView: a, viewDate: i } = e.picker;
  let n;
  switch (a.id) {
    case 0:
      n = it(i, t);
      break;
    case 1:
      n = ve(i, t);
      break;
    default:
      n = ve(i, t * a.navStep);
  }
  n = Bs(n, s, r), e.picker.changeFocus(n).render();
}
function qs(e) {
  const t = e.picker.currentView.id;
  t !== e.config.maxView && e.picker.changeView(t + 1).render();
}
function Js(e) {
  e.config.updateOnBlur ? e.update({ autohide: !0 }) : (e.refresh("input"), e.hide());
}
function Ws(e, t) {
  const s = e.picker, r = new Date(s.viewDate), a = s.currentView.id, i = a === 1 ? it(r, t - r.getMonth()) : ve(r, t - r.getFullYear());
  s.changeFocus(i).changeView(a - 1).render();
}
function ca(e) {
  const t = e.picker, s = we();
  if (e.config.todayBtnMode === 1) {
    if (e.config.autohide) {
      e.setDate(s);
      return;
    }
    e.setDate(s, { render: !1 }), t.update();
  }
  t.viewDate !== s && t.changeFocus(s), t.changeView(0).render();
}
function ha(e) {
  e.setDate({ clear: !0 });
}
function fa(e) {
  qs(e);
}
function ma(e) {
  dt(e, -1);
}
function ga(e) {
  dt(e, 1);
}
function ya(e, t) {
  const s = Ks(t, ".datepicker-cell");
  if (!s || s.classList.contains("disabled"))
    return;
  const { id: r, isMinView: a } = e.picker.currentView;
  a ? e.setDate(Number(s.dataset.date)) : r === 1 ? Ws(e, Number(s.dataset.month)) : Ws(e, Number(s.dataset.year));
}
function wa(e) {
  !e.inline && !e.config.disableTouchKeyboard && e.inputField.focus();
}
function Fs(e, t) {
  if (t.title !== void 0 && (t.title ? (e.controls.title.textContent = t.title, Ve(e.controls.title)) : (e.controls.title.textContent = "", Pe(e.controls.title))), t.prevArrow) {
    const s = e.controls.prevBtn;
    lt(s), t.prevArrow.forEach((r) => {
      s.appendChild(r.cloneNode(!0));
    });
  }
  if (t.nextArrow) {
    const s = e.controls.nextBtn;
    lt(s), t.nextArrow.forEach((r) => {
      s.appendChild(r.cloneNode(!0));
    });
  }
  if (t.locale && (e.controls.todayBtn.textContent = t.locale.today, e.controls.clearBtn.textContent = t.locale.clear), t.todayBtn !== void 0 && (t.todayBtn ? Ve(e.controls.todayBtn) : Pe(e.controls.todayBtn)), se(t, "minDate") || se(t, "maxDate")) {
    const { minDate: s, maxDate: r } = e.datepicker.config;
    e.controls.todayBtn.disabled = !zt(we(), s, r);
  }
  t.clearBtn !== void 0 && (t.clearBtn ? Ve(e.controls.clearBtn) : Pe(e.controls.clearBtn));
}
function Cs(e) {
  const { dates: t, config: s } = e, r = t.length > 0 ? $t(t) : s.defaultViewDate;
  return Bs(r, s.minDate, s.maxDate);
}
function Ls(e, t) {
  const s = new Date(e.viewDate), r = new Date(t), { id: a, year: i, first: n, last: o } = e.currentView, l = r.getFullYear();
  switch (e.viewDate = t, l !== s.getFullYear() && Me(e.datepicker, "changeYear"), r.getMonth() !== s.getMonth() && Me(e.datepicker, "changeMonth"), a) {
    case 0:
      return t < n || t > o;
    case 1:
      return l !== i;
    default:
      return l < n || l > o;
  }
}
function Ft(e) {
  return window.getComputedStyle(e).direction;
}
class pa {
  constructor(t) {
    this.datepicker = t;
    const s = ia.replace(/%buttonClass%/g, t.config.buttonClass), r = this.element = re(s).firstChild, [a, i, n] = r.firstChild.children, o = a.firstElementChild, [l, u, f] = a.lastElementChild.children, [y, g] = n.firstChild.children, k = {
      title: o,
      prevBtn: l,
      viewSwitch: u,
      nextBtn: f,
      todayBtn: y,
      clearBtn: g
    };
    this.main = i, this.controls = k;
    const Y = t.inline ? "inline" : "dropdown";
    r.classList.add(`datepicker-${Y}`), Y === "dropdown" && r.classList.add("dropdown", "absolute", "top-0", "left-0", "z-50", "pt-2"), Fs(this, t.config), this.viewDate = Cs(t), Kt(t, [
      [r, "click", wa.bind(null, t), { capture: !0 }],
      [i, "click", ya.bind(null, t)],
      [k.viewSwitch, "click", fa.bind(null, t)],
      [k.prevBtn, "click", ma.bind(null, t)],
      [k.nextBtn, "click", ga.bind(null, t)],
      [k.todayBtn, "click", ca.bind(null, t)],
      [k.clearBtn, "click", ha.bind(null, t)]
    ]), this.views = [
      new la(this),
      new da(this),
      new Ns(this, { id: 2, name: "years", cellClass: "year", step: 1 }),
      new Ns(this, { id: 3, name: "decades", cellClass: "decade", step: 10 })
    ], this.currentView = this.views[t.config.startView], this.currentView.render(), this.main.appendChild(this.currentView.element), t.config.container.appendChild(this.element);
  }
  setOptions(t) {
    Fs(this, t), this.views.forEach((s) => {
      s.init(t, !1);
    }), this.currentView.render();
  }
  detach() {
    this.datepicker.config.container.removeChild(this.element);
  }
  show() {
    if (this.active)
      return;
    this.element.classList.add("active", "block"), this.element.classList.remove("hidden"), this.active = !0;
    const t = this.datepicker;
    if (!t.inline) {
      const s = Ft(t.inputField);
      s !== Ft(t.config.container) ? this.element.dir = s : this.element.dir && this.element.removeAttribute("dir"), this.place(), t.config.disableTouchKeyboard && t.inputField.blur();
    }
    Me(t, "show");
  }
  hide() {
    this.active && (this.datepicker.exitEditMode(), this.element.classList.remove("active", "block"), this.element.classList.add("active", "block", "hidden"), this.active = !1, Me(this.datepicker, "hide"));
  }
  place() {
    const { classList: t, style: s } = this.element, { config: r, inputField: a } = this.datepicker, i = r.container, {
      width: n,
      height: o
    } = this.element.getBoundingClientRect(), {
      left: l,
      top: u,
      width: f
    } = i.getBoundingClientRect(), {
      left: y,
      top: g,
      width: k,
      height: Y
    } = a.getBoundingClientRect();
    let { x: T, y: oe } = r.orientation, V, F, w;
    i === document.body ? (V = window.scrollY, F = y + window.scrollX, w = g + V) : (V = i.scrollTop, F = y - l, w = g - u + V), T === "auto" && (F < 0 ? (T = "left", F = 10) : F + n > f ? T = "right" : T = Ft(a) === "rtl" ? "right" : "left"), T === "right" && (F -= n - k), oe === "auto" && (oe = w - o < V ? "bottom" : "top"), oe === "top" ? w -= o : w += Y, t.remove(
      "datepicker-orient-top",
      "datepicker-orient-bottom",
      "datepicker-orient-right",
      "datepicker-orient-left"
    ), t.add(`datepicker-orient-${oe}`, `datepicker-orient-${T}`), s.top = w && `${w}px`, s.left = F && `${F}px`;
  }
  setViewSwitchLabel(t) {
    this.controls.viewSwitch.textContent = t;
  }
  setPrevBtnDisabled(t) {
    this.controls.prevBtn.disabled = t;
  }
  setNextBtnDisabled(t) {
    this.controls.nextBtn.disabled = t;
  }
  changeView(t) {
    const s = this.currentView, r = this.views[t];
    return r.id !== s.id && (this.currentView = r, this._renderMethod = "render", Me(this.datepicker, "changeView"), this.main.replaceChild(r.element, s.element)), this;
  }
  // Change the focused date (view date)
  changeFocus(t) {
    return this._renderMethod = Ls(this, t) ? "render" : "refreshFocus", this.views.forEach((s) => {
      s.updateFocus();
    }), this;
  }
  // Apply the change of the selected dates
  update() {
    const t = Cs(this.datepicker);
    return this._renderMethod = Ls(this, t) ? "render" : "refresh", this.views.forEach((s) => {
      s.updateFocus(), s.updateSelection();
    }), this;
  }
  // Refresh the picker UI
  render(t = !0) {
    const s = t && this._renderMethod || "render";
    delete this._renderMethod, this.currentView[s]();
  }
}
function Qs(e, t, s, r, a, i) {
  if (zt(e, a, i)) {
    if (r(e)) {
      const n = t(e, s);
      return Qs(n, t, s, r, a, i);
    }
    return e;
  }
}
function Xe(e, t, s, r) {
  const a = e.picker, i = a.currentView, n = i.step || 1;
  let o = a.viewDate, l, u;
  switch (i.id) {
    case 0:
      r ? o = be(o, s * 7) : t.ctrlKey || t.metaKey ? o = ve(o, s) : o = be(o, s), l = be, u = (f) => i.disabled.includes(f);
      break;
    case 1:
      o = it(o, r ? s * 4 : s), l = it, u = (f) => {
        const y = new Date(f), { year: g, disabled: k } = i;
        return y.getFullYear() === g && k.includes(y.getMonth());
      };
      break;
    default:
      o = ve(o, s * (r ? 4 : 1) * n), l = ve, u = (f) => i.disabled.includes(fe(f, n));
  }
  o = Qs(
    o,
    l,
    s < 0 ? -n : n,
    u,
    i.minDate,
    i.maxDate
  ), o !== void 0 && a.changeFocus(o).render();
}
function ka(e, t) {
  if (t.key === "Tab") {
    Js(e);
    return;
  }
  const s = e.picker, { id: r, isMinView: a } = s.currentView;
  if (s.active)
    if (e.editMode)
      switch (t.key) {
        case "Escape":
          s.hide();
          break;
        case "Enter":
          e.exitEditMode({ update: !0, autohide: e.config.autohide });
          break;
        default:
          return;
      }
    else
      switch (t.key) {
        case "Escape":
          s.hide();
          break;
        case "ArrowLeft":
          if (t.ctrlKey || t.metaKey)
            dt(e, -1);
          else if (t.shiftKey) {
            e.enterEditMode();
            return;
          } else
            Xe(e, t, -1, !1);
          break;
        case "ArrowRight":
          if (t.ctrlKey || t.metaKey)
            dt(e, 1);
          else if (t.shiftKey) {
            e.enterEditMode();
            return;
          } else
            Xe(e, t, 1, !1);
          break;
        case "ArrowUp":
          if (t.ctrlKey || t.metaKey)
            qs(e);
          else if (t.shiftKey) {
            e.enterEditMode();
            return;
          } else
            Xe(e, t, -1, !0);
          break;
        case "ArrowDown":
          if (t.shiftKey && !t.ctrlKey && !t.metaKey) {
            e.enterEditMode();
            return;
          }
          Xe(e, t, 1, !0);
          break;
        case "Enter":
          a ? e.setDate(s.viewDate) : s.changeView(r - 1).render();
          break;
        case "Backspace":
        case "Delete":
          e.enterEditMode();
          return;
        default:
          t.key.length === 1 && !t.ctrlKey && !t.metaKey && e.enterEditMode();
          return;
      }
  else
    switch (t.key) {
      case "ArrowDown":
      case "Escape":
        s.show();
        break;
      case "Enter":
        e.update();
        break;
      default:
        return;
    }
  t.preventDefault(), t.stopPropagation();
}
function _a(e) {
  e.config.showOnFocus && !e._showing && e.show();
}
function Da(e, t) {
  const s = t.target;
  (e.picker.active || e.config.showOnClick) && (s._active = s === document.activeElement, s._clicking = setTimeout(() => {
    delete s._active, delete s._clicking;
  }, 2e3));
}
function ba(e, t) {
  const s = t.target;
  s._clicking && (clearTimeout(s._clicking), delete s._clicking, s._active && e.enterEditMode(), delete s._active, e.config.showOnClick && e.show());
}
function va(e, t) {
  t.clipboardData.types.includes("text/plain") && e.enterEditMode();
}
function Ma(e, t) {
  const s = e.element;
  if (s !== document.activeElement)
    return;
  const r = e.picker.element;
  Ks(t, (a) => a === s || a === r) || Js(e);
}
function Xs(e, t) {
  return e.map((s) => He(s, t.format, t.locale)).join(t.dateDelimiter);
}
function er(e, t, s = !1) {
  const { config: r, dates: a, rangepicker: i } = e;
  if (t.length === 0)
    return s ? [] : void 0;
  const n = i && e === i.datepickers[1];
  let o = t.reduce((l, u) => {
    let f = Ae(u, r.format, r.locale);
    if (f === void 0)
      return l;
    if (r.pickLevel > 0) {
      const y = new Date(f);
      r.pickLevel === 1 ? f = n ? y.setMonth(y.getMonth() + 1, 0) : y.setDate(1) : f = n ? y.setFullYear(y.getFullYear() + 1, 0, 0) : y.setMonth(0, 1);
    }
    return zt(f, r.minDate, r.maxDate) && !l.includes(f) && !r.datesDisabled.includes(f) && !r.daysOfWeekDisabled.includes(new Date(f).getDay()) && l.push(f), l;
  }, []);
  if (o.length !== 0)
    return r.multidate && !s && (o = o.reduce((l, u) => (a.includes(u) || l.push(u), l), a.filter((l) => !o.includes(l)))), r.maxNumberOfDates && o.length > r.maxNumberOfDates ? o.slice(r.maxNumberOfDates * -1) : o;
}
function ut(e, t = 3, s = !0) {
  const { config: r, picker: a, inputField: i } = e;
  if (t & 2) {
    const n = a.active ? r.pickLevel : r.startView;
    a.update().changeView(n).render(s);
  }
  t & 1 && i && (i.value = Xs(e.dates, r));
}
function Es(e, t, s) {
  let { clear: r, render: a, autohide: i } = s;
  a === void 0 && (a = !0), a ? i === void 0 && (i = e.config.autohide) : i = !1;
  const n = er(e, t, r);
  n && (n.toString() !== e.dates.toString() ? (e.dates = n, ut(e, a ? 3 : 1), Me(e, "changeDate")) : ut(e, 1), i && e.hide());
}
class tr {
  /**
   * Create a date picker
   * @param  {Element} element - element to bind a date picker
   * @param  {Object} [options] - config options
   * @param  {DateRangePicker} [rangepicker] - DateRangePicker instance the
   * date picker belongs to. Use this only when creating date picker as a part
   * of date range picker
   */
  constructor(t, s = {}, r = void 0) {
    t.datepicker = this, this.element = t;
    const a = this.config = Object.assign({
      buttonClass: s.buttonClass && String(s.buttonClass) || "button",
      container: document.body,
      defaultViewDate: we(),
      maxDate: void 0,
      minDate: void 0
    }, Wt(qt, this));
    this._options = s, Object.assign(a, Wt(s, this));
    const i = this.inline = t.tagName !== "INPUT";
    let n, o;
    if (i)
      a.container = t, o = Ot(t.dataset.date, a.dateDelimiter), delete t.dataset.date;
    else {
      const f = s.container ? document.querySelector(s.container) : null;
      f && (a.container = f), n = this.inputField = t, n.classList.add("datepicker-input"), o = Ot(n.value, a.dateDelimiter);
    }
    if (r) {
      const f = r.inputs.indexOf(n), y = r.datepickers;
      if (f < 0 || f > 1 || !Array.isArray(y))
        throw Error("Invalid rangepicker object.");
      y[f] = this, Object.defineProperty(this, "rangepicker", {
        get() {
          return r;
        }
      });
    }
    this.dates = [];
    const l = er(this, o);
    l && l.length > 0 && (this.dates = l), n && (n.value = Xs(this.dates, a));
    const u = this.picker = new pa(this);
    if (i)
      this.show();
    else {
      const f = Ma.bind(null, this), y = [
        [n, "keydown", ka.bind(null, this)],
        [n, "focus", _a.bind(null, this)],
        [n, "mousedown", Da.bind(null, this)],
        [n, "click", ba.bind(null, this)],
        [n, "paste", va.bind(null, this)],
        [document, "mousedown", f],
        [document, "touchstart", f],
        [window, "resize", u.place.bind(u)]
      ];
      Kt(this, y);
    }
  }
  /**
   * Format Date object or time value in given format and language
   * @param  {Date|Number} date - date or time value to format
   * @param  {String|Object} format - format string or object that contains
   * toDisplay() custom formatter, whose signature is
   * - args:
   *   - date: {Date} - Date instance of the date passed to the method
   *   - format: {Object} - the format object passed to the method
   *   - locale: {Object} - locale for the language specified by `lang`
   * - return:
   *     {String} formatted date
   * @param  {String} [lang=en] - language code for the locale to use
   * @return {String} formatted date
   */
  static formatDate(t, s, r) {
    return He(t, s, r && Fe[r] || Fe.en);
  }
  /**
   * Parse date string
   * @param  {String|Date|Number} dateStr - date string, Date object or time
   * value to parse
   * @param  {String|Object} format - format string or object that contains
   * toValue() custom parser, whose signature is
   * - args:
   *   - dateStr: {String|Date|Number} - the dateStr passed to the method
   *   - format: {Object} - the format object passed to the method
   *   - locale: {Object} - locale for the language specified by `lang`
   * - return:
   *     {Date|Number} parsed date or its time value
   * @param  {String} [lang=en] - language code for the locale to use
   * @return {Number} time value of parsed date
   */
  static parseDate(t, s, r) {
    return Ae(t, s, r && Fe[r] || Fe.en);
  }
  /**
   * @type {Object} - Installed locales in `[languageCode]: localeObject` format
   * en`:_English (US)_ is pre-installed.
   */
  static get locales() {
    return Fe;
  }
  /**
   * @type {Boolean} - Whether the picker element is shown. `true` whne shown
   */
  get active() {
    return !!(this.picker && this.picker.active);
  }
  /**
   * @type {HTMLDivElement} - DOM object of picker element
   */
  get pickerElement() {
    return this.picker ? this.picker.element : void 0;
  }
  /**
   * Set new values to the config options
   * @param {Object} options - config options to update
   */
  setOptions(t) {
    const s = this.picker, r = Wt(t, this);
    Object.assign(this._options, t), Object.assign(this.config, r), s.setOptions(r), ut(this, 3);
  }
  /**
   * Show the picker element
   */
  show() {
    if (this.inputField) {
      if (this.inputField.disabled)
        return;
      this.inputField !== document.activeElement && (this._showing = !0, this.inputField.focus(), delete this._showing);
    }
    this.picker.show();
  }
  /**
   * Hide the picker element
   * Not available on inline picker
   */
  hide() {
    this.inline || (this.picker.hide(), this.picker.update().changeView(this.config.startView).render());
  }
  /**
   * Destroy the Datepicker instance
   * @return {Detepicker} - the instance destroyed
   */
  destroy() {
    return this.hide(), zs(this), this.picker.detach(), this.inline || this.inputField.classList.remove("datepicker-input"), delete this.element.datepicker, this;
  }
  /**
   * Get the selected date(s)
   *
   * The method returns a Date object of selected date by default, and returns
   * an array of selected dates in multidate mode. If format string is passed,
   * it returns date string(s) formatted in given format.
   *
   * @param  {String} [format] - Format string to stringify the date(s)
   * @return {Date|String|Date[]|String[]} - selected date(s), or if none is
   * selected, empty array in multidate mode and untitled in sigledate mode
   */
  getDate(t = void 0) {
    const s = t ? (r) => He(r, t, this.config.locale) : (r) => new Date(r);
    if (this.config.multidate)
      return this.dates.map(s);
    if (this.dates.length > 0)
      return s(this.dates[0]);
  }
  /**
   * Set selected date(s)
   *
   * In multidate mode, you can pass multiple dates as a series of arguments
   * or an array. (Since each date is parsed individually, the type of the
   * dates doesn't have to be the same.)
   * The given dates are used to toggle the select status of each date. The
   * number of selected dates is kept from exceeding the length set to
   * maxNumberOfDates.
   *
   * With clear: true option, the method can be used to clear the selection
   * and to replace the selection instead of toggling in multidate mode.
   * If the option is passed with no date arguments or an empty dates array,
   * it works as "clear" (clear the selection then set nothing), and if the
   * option is passed with new dates to select, it works as "replace" (clear
   * the selection then set the given dates)
   *
   * When render: false option is used, the method omits re-rendering the
   * picker element. In this case, you need to call refresh() method later in
   * order for the picker element to reflect the changes. The input field is
   * refreshed always regardless of this option.
   *
   * When invalid (unparsable, repeated, disabled or out-of-range) dates are
   * passed, the method ignores them and applies only valid ones. In the case
   * that all the given dates are invalid, which is distinguished from passing
   * no dates, the method considers it as an error and leaves the selection
   * untouched.
   *
   * @param {...(Date|Number|String)|Array} [dates] - Date strings, Date
   * objects, time values or mix of those for new selection
   * @param {Object} [options] - function options
   * - clear: {boolean} - Whether to clear the existing selection
   *     defualt: false
   * - render: {boolean} - Whether to re-render the picker element
   *     default: true
   * - autohide: {boolean} - Whether to hide the picker element after re-render
   *     Ignored when used with render: false
   *     default: config.autohide
   */
  setDate(...t) {
    const s = [...t], r = {}, a = $t(t);
    typeof a == "object" && !Array.isArray(a) && !(a instanceof Date) && a && Object.assign(r, s.pop());
    const i = Array.isArray(s[0]) ? s[0] : s;
    Es(this, i, r);
  }
  /**
   * Update the selected date(s) with input field's value
   * Not available on inline picker
   *
   * The input field will be refreshed with properly formatted date string.
   *
   * @param  {Object} [options] - function options
   * - autohide: {boolean} - whether to hide the picker element after refresh
   *     default: false
   */
  update(t = void 0) {
    if (this.inline)
      return;
    const s = { clear: !0, autohide: !!(t && t.autohide) }, r = Ot(this.inputField.value, this.config.dateDelimiter);
    Es(this, r, s);
  }
  /**
   * Refresh the picker element and the associated input field
   * @param {String} [target] - target item when refreshing one item only
   * 'picker' or 'input'
   * @param {Boolean} [forceRender] - whether to re-render the picker element
   * regardless of its state instead of optimized refresh
   */
  refresh(t = void 0, s = !1) {
    t && typeof t != "string" && (s = t, t = void 0);
    let r;
    t === "picker" ? r = 2 : t === "input" ? r = 1 : r = 3, ut(this, r, !s);
  }
  /**
   * Enter edit mode
   * Not available on inline picker or when the picker element is hidden
   */
  enterEditMode() {
    this.inline || !this.picker.active || this.editMode || (this.editMode = !0, this.inputField.classList.add("in-edit", "border-blue-700", "!border-primary-700"));
  }
  /**
   * Exit from edit mode
   * Not available on inline picker
   * @param  {Object} [options] - function options
   * - update: {boolean} - whether to call update() after exiting
   *     If false, input field is revert to the existing selection
   *     default: false
   */
  exitEditMode(t = void 0) {
    if (this.inline || !this.editMode)
      return;
    const s = Object.assign({ update: !1 }, t);
    delete this.editMode, this.inputField.classList.remove("in-edit", "border-blue-700", "!border-primary-700"), s.update && this.update(s);
  }
}
function Ps(e) {
  const t = Object.assign({}, e);
  return delete t.inputs, delete t.allowOneSidedRange, delete t.maxNumberOfDates, t;
}
function Vs(e, t, s, r) {
  Kt(e, [
    [s, "changeDate", t]
  ]), new tr(s, r, e);
}
function Ce(e, t) {
  if (e._updating)
    return;
  e._updating = !0;
  const s = t.target;
  if (s.datepicker === void 0)
    return;
  const r = e.datepickers, a = { render: !1 }, i = e.inputs.indexOf(s), n = i === 0 ? 1 : 0, o = r[i].dates[0], l = r[n].dates[0];
  o !== void 0 && l !== void 0 ? i === 0 && o > l ? (r[0].setDate(l, a), r[1].setDate(o, a)) : i === 1 && o < l && (r[0].setDate(o, a), r[1].setDate(l, a)) : e.allowOneSidedRange || (o !== void 0 || l !== void 0) && (a.clear = !0, r[n].setDate(r[i].dates, a)), r[0].picker.update().render(), r[1].picker.update().render(), delete e._updating;
}
class Sa {
  /**
   * Create a date range picker
   * @param  {Element} element - element to bind a date range picker
   * @param  {Object} [options] - config options
   */
  constructor(t, s = {}) {
    const r = Array.isArray(s.inputs) ? s.inputs : Array.from(t.querySelectorAll("input"));
    if (r.length < 2)
      return;
    t.rangepicker = this, this.element = t, this.inputs = r.slice(0, 2), this.allowOneSidedRange = !!s.allowOneSidedRange;
    const a = Ce.bind(null, this), i = Ps(s), n = [];
    Object.defineProperty(this, "datepickers", {
      get() {
        return n;
      }
    }), Vs(this, a, this.inputs[0], i), Vs(this, a, this.inputs[1], i), Object.freeze(n), n[0].dates.length > 0 ? Ce(this, { target: this.inputs[0] }) : n[1].dates.length > 0 && Ce(this, { target: this.inputs[1] });
  }
  /**
   * @type {Array} - selected date of the linked date pickers
   */
  get dates() {
    return this.datepickers.length === 2 ? [
      this.datepickers[0].dates[0],
      this.datepickers[1].dates[0]
    ] : void 0;
  }
  /**
   * Set new values to the config options
   * @param {Object} options - config options to update
   */
  setOptions(t) {
    this.allowOneSidedRange = !!t.allowOneSidedRange;
    const s = Ps(t);
    this.datepickers[0].setOptions(s), this.datepickers[1].setOptions(s);
  }
  /**
   * Destroy the DateRangePicker instance
   * @return {DateRangePicker} - the instance destroyed
   */
  destroy() {
    this.datepickers[0].destroy(), this.datepickers[1].destroy(), zs(this), delete this.element.rangepicker;
  }
  /**
   * Get the start and end dates of the date range
   *
   * The method returns Date objects by default. If format string is passed,
   * it returns date strings formatted in given format.
   * The result array always contains 2 items (start date/end date) and
   * undefined is used for unselected side. (e.g. If none is selected,
   * the result will be [undefined, undefined]. If only the end date is set
   * when allowOneSidedRange config option is true, [undefined, endDate] will
   * be returned.)
   *
   * @param  {String} [format] - Format string to stringify the dates
   * @return {Array} - Start and end dates
   */
  getDates(t = void 0) {
    const s = t ? (r) => He(r, t, this.datepickers[0].config.locale) : (r) => new Date(r);
    return this.dates.map((r) => r === void 0 ? r : s(r));
  }
  /**
   * Set the start and end dates of the date range
   *
   * The method calls datepicker.setDate() internally using each of the
   * arguments in start→end order.
   *
   * When a clear: true option object is passed instead of a date, the method
   * clears the date.
   *
   * If an invalid date, the same date as the current one or an option object
   * without clear: true is passed, the method considers that argument as an
   * "ineffective" argument because calling datepicker.setDate() with those
   * values makes no changes to the date selection.
   *
   * When the allowOneSidedRange config option is false, passing {clear: true}
   * to clear the range works only when it is done to the last effective
   * argument (in other words, passed to rangeEnd or to rangeStart along with
   * ineffective rangeEnd). This is because when the date range is changed,
   * it gets normalized based on the last change at the end of the changing
   * process.
   *
   * @param {Date|Number|String|Object} rangeStart - Start date of the range
   * or {clear: true} to clear the date
   * @param {Date|Number|String|Object} rangeEnd - End date of the range
   * or {clear: true} to clear the date
   */
  setDates(t, s) {
    const [r, a] = this.datepickers, i = this.dates;
    this._updating = !0, r.setDate(t), a.setDate(s), delete this._updating, a.dates[0] !== i[1] ? Ce(this, { target: this.inputs[1] }) : r.dates[0] !== i[0] && Ce(this, { target: this.inputs[0] });
  }
}
//! moment.js
//! version : 2.30.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var sr;
function c() {
  return sr.apply(null, arguments);
}
function xa(e) {
  sr = e;
}
function j(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function ge(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function b(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Qt(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (b(e, t))
      return !1;
  return !0;
}
function E(e) {
  return e === void 0;
}
function ae(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function Ge(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function rr(e, t) {
  var s = [], r, a = e.length;
  for (r = 0; r < a; ++r)
    s.push(t(e[r], r));
  return s;
}
function le(e, t) {
  for (var s in t)
    b(t, s) && (e[s] = t[s]);
  return b(t, "toString") && (e.toString = t.toString), b(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function Z(e, t, s, r) {
  return xr(e, t, s, r, !0).utc();
}
function Oa() {
  return {
    empty: !1,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: !1,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: !1,
    userInvalidated: !1,
    iso: !1,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: !1,
    weekdayMismatch: !1
  };
}
function p(e) {
  return e._pf == null && (e._pf = Oa()), e._pf;
}
var At;
Array.prototype.some ? At = Array.prototype.some : At = function(e) {
  var t = Object(this), s = t.length >>> 0, r;
  for (r = 0; r < s; r++)
    if (r in t && e.call(this, t[r], r, t))
      return !0;
  return !1;
};
function Xt(e) {
  var t = null, s = !1, r = e._d && !isNaN(e._d.getTime());
  if (r && (t = p(e), s = At.call(t.parsedDateParts, function(a) {
    return a != null;
  }), r = t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && s), e._strict && (r = r && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0)), Object.isFrozen == null || !Object.isFrozen(e))
    e._isValid = r;
  else
    return r;
  return e._isValid;
}
function yt(e) {
  var t = Z(NaN);
  return e != null ? le(p(t), e) : p(t).userInvalidated = !0, t;
}
var Rs = c.momentProperties = [], Ct = !1;
function es(e, t) {
  var s, r, a, i = Rs.length;
  if (E(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), E(t._i) || (e._i = t._i), E(t._f) || (e._f = t._f), E(t._l) || (e._l = t._l), E(t._strict) || (e._strict = t._strict), E(t._tzm) || (e._tzm = t._tzm), E(t._isUTC) || (e._isUTC = t._isUTC), E(t._offset) || (e._offset = t._offset), E(t._pf) || (e._pf = p(t)), E(t._locale) || (e._locale = t._locale), i > 0)
    for (s = 0; s < i; s++)
      r = Rs[s], a = t[r], E(a) || (e[r] = a);
  return e;
}
function $e(e) {
  es(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), Ct === !1 && (Ct = !0, c.updateOffset(this), Ct = !1);
}
function B(e) {
  return e instanceof $e || e != null && e._isAMomentObject != null;
}
function ar(e) {
  c.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function H(e, t) {
  var s = !0;
  return le(function() {
    if (c.deprecationHandler != null && c.deprecationHandler(null, e), s) {
      var r = [], a, i, n, o = arguments.length;
      for (i = 0; i < o; i++) {
        if (a = "", typeof arguments[i] == "object") {
          a += `
[` + i + "] ";
          for (n in arguments[0])
            b(arguments[0], n) && (a += n + ": " + arguments[0][n] + ", ");
          a = a.slice(0, -2);
        } else
          a = arguments[i];
        r.push(a);
      }
      ar(
        e + `
Arguments: ` + Array.prototype.slice.call(r).join("") + `
` + new Error().stack
      ), s = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var As = {};
function ir(e, t) {
  c.deprecationHandler != null && c.deprecationHandler(e, t), As[e] || (ar(t), As[e] = !0);
}
c.suppressDeprecationWarnings = !1;
c.deprecationHandler = null;
function K(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Ya(e) {
  var t, s;
  for (s in e)
    b(e, s) && (t = e[s], K(t) ? this[s] = t : this["_" + s] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function Ht(e, t) {
  var s = le({}, e), r;
  for (r in t)
    b(t, r) && (ge(e[r]) && ge(t[r]) ? (s[r] = {}, le(s[r], e[r]), le(s[r], t[r])) : t[r] != null ? s[r] = t[r] : delete s[r]);
  for (r in e)
    b(e, r) && !b(t, r) && ge(e[r]) && (s[r] = le({}, s[r]));
  return s;
}
function ts(e) {
  e != null && this.set(e);
}
var It;
Object.keys ? It = Object.keys : It = function(e) {
  var t, s = [];
  for (t in e)
    b(e, t) && s.push(t);
  return s;
};
var Ta = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Na(e, t, s) {
  var r = this._calendar[e] || this._calendar.sameElse;
  return K(r) ? r.call(t, s) : r;
}
function z(e, t, s) {
  var r = "" + Math.abs(e), a = t - r.length, i = e >= 0;
  return (i ? s ? "+" : "" : "-") + Math.pow(10, Math.max(0, a)).toString().substr(1) + r;
}
var ss = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, et = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Lt = {}, Se = {};
function m(e, t, s, r) {
  var a = r;
  typeof r == "string" && (a = function() {
    return this[r]();
  }), e && (Se[e] = a), t && (Se[t[0]] = function() {
    return z(a.apply(this, arguments), t[1], t[2]);
  }), s && (Se[s] = function() {
    return this.localeData().ordinal(
      a.apply(this, arguments),
      e
    );
  });
}
function Wa(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function Fa(e) {
  var t = e.match(ss), s, r;
  for (s = 0, r = t.length; s < r; s++)
    Se[t[s]] ? t[s] = Se[t[s]] : t[s] = Wa(t[s]);
  return function(a) {
    var i = "", n;
    for (n = 0; n < r; n++)
      i += K(t[n]) ? t[n].call(a, e) : t[n];
    return i;
  };
}
function st(e, t) {
  return e.isValid() ? (t = nr(t, e.localeData()), Lt[t] = Lt[t] || Fa(t), Lt[t](e)) : e.localeData().invalidDate();
}
function nr(e, t) {
  var s = 5;
  function r(a) {
    return t.longDateFormat(a) || a;
  }
  for (et.lastIndex = 0; s >= 0 && et.test(e); )
    e = e.replace(
      et,
      r
    ), et.lastIndex = 0, s -= 1;
  return e;
}
var Ca = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function La(e) {
  var t = this._longDateFormat[e], s = this._longDateFormat[e.toUpperCase()];
  return t || !s ? t : (this._longDateFormat[e] = s.match(ss).map(function(r) {
    return r === "MMMM" || r === "MM" || r === "DD" || r === "dddd" ? r.slice(1) : r;
  }).join(""), this._longDateFormat[e]);
}
var Ea = "Invalid date";
function Pa() {
  return this._invalidDate;
}
var Va = "%d", Ra = /\d{1,2}/;
function Aa(e) {
  return this._ordinal.replace("%d", e);
}
var Ha = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function Ia(e, t, s, r) {
  var a = this._relativeTime[s];
  return K(a) ? a(e, t, s, r) : a.replace(/%d/i, e);
}
function Ua(e, t) {
  var s = this._relativeTime[e > 0 ? "future" : "past"];
  return K(s) ? s(t) : s.replace(/%s/i, t);
}
var Hs = {
  D: "date",
  dates: "date",
  date: "date",
  d: "day",
  days: "day",
  day: "day",
  e: "weekday",
  weekdays: "weekday",
  weekday: "weekday",
  E: "isoWeekday",
  isoweekdays: "isoWeekday",
  isoweekday: "isoWeekday",
  DDD: "dayOfYear",
  dayofyears: "dayOfYear",
  dayofyear: "dayOfYear",
  h: "hour",
  hours: "hour",
  hour: "hour",
  ms: "millisecond",
  milliseconds: "millisecond",
  millisecond: "millisecond",
  m: "minute",
  minutes: "minute",
  minute: "minute",
  M: "month",
  months: "month",
  month: "month",
  Q: "quarter",
  quarters: "quarter",
  quarter: "quarter",
  s: "second",
  seconds: "second",
  second: "second",
  gg: "weekYear",
  weekyears: "weekYear",
  weekyear: "weekYear",
  GG: "isoWeekYear",
  isoweekyears: "isoWeekYear",
  isoweekyear: "isoWeekYear",
  w: "week",
  weeks: "week",
  week: "week",
  W: "isoWeek",
  isoweeks: "isoWeek",
  isoweek: "isoWeek",
  y: "year",
  years: "year",
  year: "year"
};
function I(e) {
  return typeof e == "string" ? Hs[e] || Hs[e.toLowerCase()] : void 0;
}
function rs(e) {
  var t = {}, s, r;
  for (r in e)
    b(e, r) && (s = I(r), s && (t[s] = e[r]));
  return t;
}
var ja = {
  date: 9,
  day: 11,
  weekday: 11,
  isoWeekday: 11,
  dayOfYear: 4,
  hour: 13,
  millisecond: 16,
  minute: 14,
  month: 8,
  quarter: 7,
  second: 15,
  weekYear: 1,
  isoWeekYear: 1,
  week: 5,
  isoWeek: 5,
  year: 1
};
function Ba(e) {
  var t = [], s;
  for (s in e)
    b(e, s) && t.push({ unit: s, priority: ja[s] });
  return t.sort(function(r, a) {
    return r.priority - a.priority;
  }), t;
}
var or = /\d/, P = /\d\d/, lr = /\d{3}/, as = /\d{4}/, wt = /[+-]?\d{6}/, x = /\d\d?/, dr = /\d\d\d\d?/, ur = /\d\d\d\d\d\d?/, pt = /\d{1,3}/, is = /\d{1,4}/, kt = /[+-]?\d{1,6}/, Te = /\d+/, _t = /[+-]?\d+/, Ga = /Z|[+-]\d\d:?\d\d/gi, Dt = /Z|[+-]\d\d(?::?\d\d)?/gi, $a = /[+-]?\d+(\.\d{1,3})?/, ze = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, Ne = /^[1-9]\d?/, ns = /^([1-9]\d|\d)/, ct;
ct = {};
function h(e, t, s) {
  ct[e] = K(t) ? t : function(r, a) {
    return r && s ? s : t;
  };
}
function za(e, t) {
  return b(ct, e) ? ct[e](t._strict, t._locale) : new RegExp(Za(e));
}
function Za(e) {
  return ee(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, s, r, a, i) {
        return s || r || a || i;
      }
    )
  );
}
function ee(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function A(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function _(e) {
  var t = +e, s = 0;
  return t !== 0 && isFinite(t) && (s = A(t)), s;
}
var Ut = {};
function M(e, t) {
  var s, r = t, a;
  for (typeof e == "string" && (e = [e]), ae(t) && (r = function(i, n) {
    n[t] = _(i);
  }), a = e.length, s = 0; s < a; s++)
    Ut[e[s]] = r;
}
function Ze(e, t) {
  M(e, function(s, r, a, i) {
    a._w = a._w || {}, t(s, a._w, a, i);
  });
}
function Ka(e, t, s) {
  t != null && b(Ut, e) && Ut[e](t, s._a, s, e);
}
function bt(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
var L = 0, Q = 1, $ = 2, W = 3, U = 4, X = 5, me = 6, qa = 7, Ja = 8;
m("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? z(e, 4) : "+" + e;
});
m(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
m(0, ["YYYY", 4], 0, "year");
m(0, ["YYYYY", 5], 0, "year");
m(0, ["YYYYYY", 6, !0], 0, "year");
h("Y", _t);
h("YY", x, P);
h("YYYY", is, as);
h("YYYYY", kt, wt);
h("YYYYYY", kt, wt);
M(["YYYYY", "YYYYYY"], L);
M("YYYY", function(e, t) {
  t[L] = e.length === 2 ? c.parseTwoDigitYear(e) : _(e);
});
M("YY", function(e, t) {
  t[L] = c.parseTwoDigitYear(e);
});
M("Y", function(e, t) {
  t[L] = parseInt(e, 10);
});
function Re(e) {
  return bt(e) ? 366 : 365;
}
c.parseTwoDigitYear = function(e) {
  return _(e) + (_(e) > 68 ? 1900 : 2e3);
};
var cr = We("FullYear", !0);
function Qa() {
  return bt(this.year());
}
function We(e, t) {
  return function(s) {
    return s != null ? (hr(this, e, s), c.updateOffset(this, t), this) : Ie(this, e);
  };
}
function Ie(e, t) {
  if (!e.isValid())
    return NaN;
  var s = e._d, r = e._isUTC;
  switch (t) {
    case "Milliseconds":
      return r ? s.getUTCMilliseconds() : s.getMilliseconds();
    case "Seconds":
      return r ? s.getUTCSeconds() : s.getSeconds();
    case "Minutes":
      return r ? s.getUTCMinutes() : s.getMinutes();
    case "Hours":
      return r ? s.getUTCHours() : s.getHours();
    case "Date":
      return r ? s.getUTCDate() : s.getDate();
    case "Day":
      return r ? s.getUTCDay() : s.getDay();
    case "Month":
      return r ? s.getUTCMonth() : s.getMonth();
    case "FullYear":
      return r ? s.getUTCFullYear() : s.getFullYear();
    default:
      return NaN;
  }
}
function hr(e, t, s) {
  var r, a, i, n, o;
  if (!(!e.isValid() || isNaN(s))) {
    switch (r = e._d, a = e._isUTC, t) {
      case "Milliseconds":
        return void (a ? r.setUTCMilliseconds(s) : r.setMilliseconds(s));
      case "Seconds":
        return void (a ? r.setUTCSeconds(s) : r.setSeconds(s));
      case "Minutes":
        return void (a ? r.setUTCMinutes(s) : r.setMinutes(s));
      case "Hours":
        return void (a ? r.setUTCHours(s) : r.setHours(s));
      case "Date":
        return void (a ? r.setUTCDate(s) : r.setDate(s));
      case "FullYear":
        break;
      default:
        return;
    }
    i = s, n = e.month(), o = e.date(), o = o === 29 && n === 1 && !bt(i) ? 28 : o, a ? r.setUTCFullYear(i, n, o) : r.setFullYear(i, n, o);
  }
}
function Xa(e) {
  return e = I(e), K(this[e]) ? this[e]() : this;
}
function ei(e, t) {
  if (typeof e == "object") {
    e = rs(e);
    var s = Ba(e), r, a = s.length;
    for (r = 0; r < a; r++)
      this[s[r].unit](e[s[r].unit]);
  } else if (e = I(e), K(this[e]))
    return this[e](t);
  return this;
}
function ti(e, t) {
  return (e % t + t) % t;
}
var N;
Array.prototype.indexOf ? N = Array.prototype.indexOf : N = function(e) {
  var t;
  for (t = 0; t < this.length; ++t)
    if (this[t] === e)
      return t;
  return -1;
};
function os(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var s = ti(t, 12);
  return e += (t - s) / 12, s === 1 ? bt(e) ? 29 : 28 : 31 - s % 7 % 2;
}
m("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
m("MMM", 0, 0, function(e) {
  return this.localeData().monthsShort(this, e);
});
m("MMMM", 0, 0, function(e) {
  return this.localeData().months(this, e);
});
h("M", x, Ne);
h("MM", x, P);
h("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
h("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
M(["M", "MM"], function(e, t) {
  t[Q] = _(e) - 1;
});
M(["MMM", "MMMM"], function(e, t, s, r) {
  var a = s._locale.monthsParse(e, r, s._strict);
  a != null ? t[Q] = a : p(s).invalidMonth = e;
});
var si = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), fr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), mr = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, ri = ze, ai = ze;
function ii(e, t) {
  return e ? j(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || mr).test(t) ? "format" : "standalone"][e.month()] : j(this._months) ? this._months : this._months.standalone;
}
function ni(e, t) {
  return e ? j(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[mr.test(t) ? "format" : "standalone"][e.month()] : j(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function oi(e, t, s) {
  var r, a, i, n = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], r = 0; r < 12; ++r)
      i = Z([2e3, r]), this._shortMonthsParse[r] = this.monthsShort(
        i,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[r] = this.months(i, "").toLocaleLowerCase();
  return s ? t === "MMM" ? (a = N.call(this._shortMonthsParse, n), a !== -1 ? a : null) : (a = N.call(this._longMonthsParse, n), a !== -1 ? a : null) : t === "MMM" ? (a = N.call(this._shortMonthsParse, n), a !== -1 ? a : (a = N.call(this._longMonthsParse, n), a !== -1 ? a : null)) : (a = N.call(this._longMonthsParse, n), a !== -1 ? a : (a = N.call(this._shortMonthsParse, n), a !== -1 ? a : null));
}
function li(e, t, s) {
  var r, a, i;
  if (this._monthsParseExact)
    return oi.call(this, e, t, s);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), r = 0; r < 12; r++) {
    if (a = Z([2e3, r]), s && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp(
      "^" + this.months(a, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[r] = new RegExp(
      "^" + this.monthsShort(a, "").replace(".", "") + "$",
      "i"
    )), !s && !this._monthsParse[r] && (i = "^" + this.months(a, "") + "|^" + this.monthsShort(a, ""), this._monthsParse[r] = new RegExp(i.replace(".", ""), "i")), s && t === "MMMM" && this._longMonthsParse[r].test(e))
      return r;
    if (s && t === "MMM" && this._shortMonthsParse[r].test(e))
      return r;
    if (!s && this._monthsParse[r].test(e))
      return r;
  }
}
function gr(e, t) {
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = _(t);
    else if (t = e.localeData().monthsParse(t), !ae(t))
      return e;
  }
  var s = t, r = e.date();
  return r = r < 29 ? r : Math.min(r, os(e.year(), s)), e._isUTC ? e._d.setUTCMonth(s, r) : e._d.setMonth(s, r), e;
}
function yr(e) {
  return e != null ? (gr(this, e), c.updateOffset(this, !0), this) : Ie(this, "Month");
}
function di() {
  return os(this.year(), this.month());
}
function ui(e) {
  return this._monthsParseExact ? (b(this, "_monthsRegex") || wr.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (b(this, "_monthsShortRegex") || (this._monthsShortRegex = ri), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function ci(e) {
  return this._monthsParseExact ? (b(this, "_monthsRegex") || wr.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (b(this, "_monthsRegex") || (this._monthsRegex = ai), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function wr() {
  function e(l, u) {
    return u.length - l.length;
  }
  var t = [], s = [], r = [], a, i, n, o;
  for (a = 0; a < 12; a++)
    i = Z([2e3, a]), n = ee(this.monthsShort(i, "")), o = ee(this.months(i, "")), t.push(n), s.push(o), r.push(o), r.push(n);
  t.sort(e), s.sort(e), r.sort(e), this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
function hi(e, t, s, r, a, i, n) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, s, r, a, i, n), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, s, r, a, i, n), o;
}
function Ue(e) {
  var t, s;
  return e < 100 && e >= 0 ? (s = Array.prototype.slice.call(arguments), s[0] = e + 400, t = new Date(Date.UTC.apply(null, s)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function ht(e, t, s) {
  var r = 7 + t - s, a = (7 + Ue(e, 0, r).getUTCDay() - t) % 7;
  return -a + r - 1;
}
function pr(e, t, s, r, a) {
  var i = (7 + s - r) % 7, n = ht(e, r, a), o = 1 + 7 * (t - 1) + i + n, l, u;
  return o <= 0 ? (l = e - 1, u = Re(l) + o) : o > Re(e) ? (l = e + 1, u = o - Re(e)) : (l = e, u = o), {
    year: l,
    dayOfYear: u
  };
}
function je(e, t, s) {
  var r = ht(e.year(), t, s), a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1, i, n;
  return a < 1 ? (n = e.year() - 1, i = a + te(n, t, s)) : a > te(e.year(), t, s) ? (i = a - te(e.year(), t, s), n = e.year() + 1) : (n = e.year(), i = a), {
    week: i,
    year: n
  };
}
function te(e, t, s) {
  var r = ht(e, t, s), a = ht(e + 1, t, s);
  return (Re(e) - r + a) / 7;
}
m("w", ["ww", 2], "wo", "week");
m("W", ["WW", 2], "Wo", "isoWeek");
h("w", x, Ne);
h("ww", x, P);
h("W", x, Ne);
h("WW", x, P);
Ze(
  ["w", "ww", "W", "WW"],
  function(e, t, s, r) {
    t[r.substr(0, 1)] = _(e);
  }
);
function fi(e) {
  return je(e, this._week.dow, this._week.doy).week;
}
var mi = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function gi() {
  return this._week.dow;
}
function yi() {
  return this._week.doy;
}
function wi(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function pi(e) {
  var t = je(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
m("d", 0, "do", "day");
m("dd", 0, 0, function(e) {
  return this.localeData().weekdaysMin(this, e);
});
m("ddd", 0, 0, function(e) {
  return this.localeData().weekdaysShort(this, e);
});
m("dddd", 0, 0, function(e) {
  return this.localeData().weekdays(this, e);
});
m("e", 0, 0, "weekday");
m("E", 0, 0, "isoWeekday");
h("d", x);
h("e", x);
h("E", x);
h("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
h("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
h("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
Ze(["dd", "ddd", "dddd"], function(e, t, s, r) {
  var a = s._locale.weekdaysParse(e, r, s._strict);
  a != null ? t.d = a : p(s).invalidWeekday = e;
});
Ze(["d", "e", "E"], function(e, t, s, r) {
  t[r] = _(e);
});
function ki(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function _i(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function ls(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var Di = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), kr = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), bi = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), vi = ze, Mi = ze, Si = ze;
function xi(e, t) {
  var s = j(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? ls(s, this._week.dow) : e ? s[e.day()] : s;
}
function Oi(e) {
  return e === !0 ? ls(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function Yi(e) {
  return e === !0 ? ls(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Ti(e, t, s) {
  var r, a, i, n = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], r = 0; r < 7; ++r)
      i = Z([2e3, 1]).day(r), this._minWeekdaysParse[r] = this.weekdaysMin(
        i,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[r] = this.weekdaysShort(
        i,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[r] = this.weekdays(i, "").toLocaleLowerCase();
  return s ? t === "dddd" ? (a = N.call(this._weekdaysParse, n), a !== -1 ? a : null) : t === "ddd" ? (a = N.call(this._shortWeekdaysParse, n), a !== -1 ? a : null) : (a = N.call(this._minWeekdaysParse, n), a !== -1 ? a : null) : t === "dddd" ? (a = N.call(this._weekdaysParse, n), a !== -1 || (a = N.call(this._shortWeekdaysParse, n), a !== -1) ? a : (a = N.call(this._minWeekdaysParse, n), a !== -1 ? a : null)) : t === "ddd" ? (a = N.call(this._shortWeekdaysParse, n), a !== -1 || (a = N.call(this._weekdaysParse, n), a !== -1) ? a : (a = N.call(this._minWeekdaysParse, n), a !== -1 ? a : null)) : (a = N.call(this._minWeekdaysParse, n), a !== -1 || (a = N.call(this._weekdaysParse, n), a !== -1) ? a : (a = N.call(this._shortWeekdaysParse, n), a !== -1 ? a : null));
}
function Ni(e, t, s) {
  var r, a, i;
  if (this._weekdaysParseExact)
    return Ti.call(this, e, t, s);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), r = 0; r < 7; r++) {
    if (a = Z([2e3, 1]).day(r), s && !this._fullWeekdaysParse[r] && (this._fullWeekdaysParse[r] = new RegExp(
      "^" + this.weekdays(a, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[r] = new RegExp(
      "^" + this.weekdaysShort(a, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[r] = new RegExp(
      "^" + this.weekdaysMin(a, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[r] || (i = "^" + this.weekdays(a, "") + "|^" + this.weekdaysShort(a, "") + "|^" + this.weekdaysMin(a, ""), this._weekdaysParse[r] = new RegExp(i.replace(".", ""), "i")), s && t === "dddd" && this._fullWeekdaysParse[r].test(e))
      return r;
    if (s && t === "ddd" && this._shortWeekdaysParse[r].test(e))
      return r;
    if (s && t === "dd" && this._minWeekdaysParse[r].test(e))
      return r;
    if (!s && this._weekdaysParse[r].test(e))
      return r;
  }
}
function Wi(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = Ie(this, "Day");
  return e != null ? (e = ki(e, this.localeData()), this.add(e - t, "d")) : t;
}
function Fi(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function Ci(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = _i(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function Li(e) {
  return this._weekdaysParseExact ? (b(this, "_weekdaysRegex") || ds.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (b(this, "_weekdaysRegex") || (this._weekdaysRegex = vi), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function Ei(e) {
  return this._weekdaysParseExact ? (b(this, "_weekdaysRegex") || ds.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (b(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Mi), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function Pi(e) {
  return this._weekdaysParseExact ? (b(this, "_weekdaysRegex") || ds.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (b(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Si), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function ds() {
  function e(f, y) {
    return y.length - f.length;
  }
  var t = [], s = [], r = [], a = [], i, n, o, l, u;
  for (i = 0; i < 7; i++)
    n = Z([2e3, 1]).day(i), o = ee(this.weekdaysMin(n, "")), l = ee(this.weekdaysShort(n, "")), u = ee(this.weekdays(n, "")), t.push(o), s.push(l), r.push(u), a.push(o), a.push(l), a.push(u);
  t.sort(e), s.sort(e), r.sort(e), a.sort(e), this._weekdaysRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._weekdaysShortStrictRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  ), this._weekdaysMinStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
function us() {
  return this.hours() % 12 || 12;
}
function Vi() {
  return this.hours() || 24;
}
m("H", ["HH", 2], 0, "hour");
m("h", ["hh", 2], 0, us);
m("k", ["kk", 2], 0, Vi);
m("hmm", 0, 0, function() {
  return "" + us.apply(this) + z(this.minutes(), 2);
});
m("hmmss", 0, 0, function() {
  return "" + us.apply(this) + z(this.minutes(), 2) + z(this.seconds(), 2);
});
m("Hmm", 0, 0, function() {
  return "" + this.hours() + z(this.minutes(), 2);
});
m("Hmmss", 0, 0, function() {
  return "" + this.hours() + z(this.minutes(), 2) + z(this.seconds(), 2);
});
function _r(e, t) {
  m(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
_r("a", !0);
_r("A", !1);
function Dr(e, t) {
  return t._meridiemParse;
}
h("a", Dr);
h("A", Dr);
h("H", x, ns);
h("h", x, Ne);
h("k", x, Ne);
h("HH", x, P);
h("hh", x, P);
h("kk", x, P);
h("hmm", dr);
h("hmmss", ur);
h("Hmm", dr);
h("Hmmss", ur);
M(["H", "HH"], W);
M(["k", "kk"], function(e, t, s) {
  var r = _(e);
  t[W] = r === 24 ? 0 : r;
});
M(["a", "A"], function(e, t, s) {
  s._isPm = s._locale.isPM(e), s._meridiem = e;
});
M(["h", "hh"], function(e, t, s) {
  t[W] = _(e), p(s).bigHour = !0;
});
M("hmm", function(e, t, s) {
  var r = e.length - 2;
  t[W] = _(e.substr(0, r)), t[U] = _(e.substr(r)), p(s).bigHour = !0;
});
M("hmmss", function(e, t, s) {
  var r = e.length - 4, a = e.length - 2;
  t[W] = _(e.substr(0, r)), t[U] = _(e.substr(r, 2)), t[X] = _(e.substr(a)), p(s).bigHour = !0;
});
M("Hmm", function(e, t, s) {
  var r = e.length - 2;
  t[W] = _(e.substr(0, r)), t[U] = _(e.substr(r));
});
M("Hmmss", function(e, t, s) {
  var r = e.length - 4, a = e.length - 2;
  t[W] = _(e.substr(0, r)), t[U] = _(e.substr(r, 2)), t[X] = _(e.substr(a));
});
function Ri(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var Ai = /[ap]\.?m?\.?/i, Hi = We("Hours", !0);
function Ii(e, t, s) {
  return e > 11 ? s ? "pm" : "PM" : s ? "am" : "AM";
}
var br = {
  calendar: Ta,
  longDateFormat: Ca,
  invalidDate: Ea,
  ordinal: Va,
  dayOfMonthOrdinalParse: Ra,
  relativeTime: Ha,
  months: si,
  monthsShort: fr,
  week: mi,
  weekdays: Di,
  weekdaysMin: bi,
  weekdaysShort: kr,
  meridiemParse: Ai
}, O = {}, Le = {}, Be;
function Ui(e, t) {
  var s, r = Math.min(e.length, t.length);
  for (s = 0; s < r; s += 1)
    if (e[s] !== t[s])
      return s;
  return r;
}
function Is(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function ji(e) {
  for (var t = 0, s, r, a, i; t < e.length; ) {
    for (i = Is(e[t]).split("-"), s = i.length, r = Is(e[t + 1]), r = r ? r.split("-") : null; s > 0; ) {
      if (a = vt(i.slice(0, s).join("-")), a)
        return a;
      if (r && r.length >= s && Ui(i, r) >= s - 1)
        break;
      s--;
    }
    t++;
  }
  return Be;
}
function Bi(e) {
  return !!(e && e.match("^[^/\\\\]*$"));
}
function vt(e) {
  var t = null, s;
  if (O[e] === void 0 && typeof module < "u" && module && module.exports && Bi(e))
    try {
      t = Be._abbr, s = require, s("./locale/" + e), ce(t);
    } catch {
      O[e] = null;
    }
  return O[e];
}
function ce(e, t) {
  var s;
  return e && (E(t) ? s = ie(e) : s = cs(e, t), s ? Be = s : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), Be._abbr;
}
function cs(e, t) {
  if (t !== null) {
    var s, r = br;
    if (t.abbr = e, O[e] != null)
      ir(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), r = O[e]._config;
    else if (t.parentLocale != null)
      if (O[t.parentLocale] != null)
        r = O[t.parentLocale]._config;
      else if (s = vt(t.parentLocale), s != null)
        r = s._config;
      else
        return Le[t.parentLocale] || (Le[t.parentLocale] = []), Le[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return O[e] = new ts(Ht(r, t)), Le[e] && Le[e].forEach(function(a) {
      cs(a.name, a.config);
    }), ce(e), O[e];
  } else
    return delete O[e], null;
}
function Gi(e, t) {
  if (t != null) {
    var s, r, a = br;
    O[e] != null && O[e].parentLocale != null ? O[e].set(Ht(O[e]._config, t)) : (r = vt(e), r != null && (a = r._config), t = Ht(a, t), r == null && (t.abbr = e), s = new ts(t), s.parentLocale = O[e], O[e] = s), ce(e);
  } else
    O[e] != null && (O[e].parentLocale != null ? (O[e] = O[e].parentLocale, e === ce() && ce(e)) : O[e] != null && delete O[e]);
  return O[e];
}
function ie(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return Be;
  if (!j(e)) {
    if (t = vt(e), t)
      return t;
    e = [e];
  }
  return ji(e);
}
function $i() {
  return It(O);
}
function hs(e) {
  var t, s = e._a;
  return s && p(e).overflow === -2 && (t = s[Q] < 0 || s[Q] > 11 ? Q : s[$] < 1 || s[$] > os(s[L], s[Q]) ? $ : s[W] < 0 || s[W] > 24 || s[W] === 24 && (s[U] !== 0 || s[X] !== 0 || s[me] !== 0) ? W : s[U] < 0 || s[U] > 59 ? U : s[X] < 0 || s[X] > 59 ? X : s[me] < 0 || s[me] > 999 ? me : -1, p(e)._overflowDayOfYear && (t < L || t > $) && (t = $), p(e)._overflowWeeks && t === -1 && (t = qa), p(e)._overflowWeekday && t === -1 && (t = Ja), p(e).overflow = t), e;
}
var zi = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Zi = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ki = /Z|[+-]\d\d(?::?\d\d)?/, tt = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, !1],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, !1],
  ["YYYY", /\d{4}/, !1]
], Et = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], qi = /^\/?Date\((-?\d+)/i, Ji = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, Qi = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function vr(e) {
  var t, s, r = e._i, a = zi.exec(r) || Zi.exec(r), i, n, o, l, u = tt.length, f = Et.length;
  if (a) {
    for (p(e).iso = !0, t = 0, s = u; t < s; t++)
      if (tt[t][1].exec(a[1])) {
        n = tt[t][0], i = tt[t][2] !== !1;
        break;
      }
    if (n == null) {
      e._isValid = !1;
      return;
    }
    if (a[3]) {
      for (t = 0, s = f; t < s; t++)
        if (Et[t][1].exec(a[3])) {
          o = (a[2] || " ") + Et[t][0];
          break;
        }
      if (o == null) {
        e._isValid = !1;
        return;
      }
    }
    if (!i && o != null) {
      e._isValid = !1;
      return;
    }
    if (a[4])
      if (Ki.exec(a[4]))
        l = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = n + (o || "") + (l || ""), ms(e);
  } else
    e._isValid = !1;
}
function Xi(e, t, s, r, a, i) {
  var n = [
    en(e),
    fr.indexOf(t),
    parseInt(s, 10),
    parseInt(r, 10),
    parseInt(a, 10)
  ];
  return i && n.push(parseInt(i, 10)), n;
}
function en(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function tn(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function sn(e, t, s) {
  if (e) {
    var r = kr.indexOf(e), a = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (r !== a)
      return p(s).weekdayMismatch = !0, s._isValid = !1, !1;
  }
  return !0;
}
function rn(e, t, s) {
  if (e)
    return Qi[e];
  if (t)
    return 0;
  var r = parseInt(s, 10), a = r % 100, i = (r - a) / 100;
  return i * 60 + a;
}
function Mr(e) {
  var t = Ji.exec(tn(e._i)), s;
  if (t) {
    if (s = Xi(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !sn(t[1], s, e))
      return;
    e._a = s, e._tzm = rn(t[8], t[9], t[10]), e._d = Ue.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), p(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function an(e) {
  var t = qi.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (vr(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (Mr(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : c.createFromInputFallback(e);
}
c.createFromInputFallback = H(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function _e(e, t, s) {
  return e ?? t ?? s;
}
function nn(e) {
  var t = new Date(c.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function fs(e) {
  var t, s, r = [], a, i, n;
  if (!e._d) {
    for (a = nn(e), e._w && e._a[$] == null && e._a[Q] == null && on(e), e._dayOfYear != null && (n = _e(e._a[L], a[L]), (e._dayOfYear > Re(n) || e._dayOfYear === 0) && (p(e)._overflowDayOfYear = !0), s = Ue(n, 0, e._dayOfYear), e._a[Q] = s.getUTCMonth(), e._a[$] = s.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = r[t] = a[t];
    for (; t < 7; t++)
      e._a[t] = r[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[W] === 24 && e._a[U] === 0 && e._a[X] === 0 && e._a[me] === 0 && (e._nextDay = !0, e._a[W] = 0), e._d = (e._useUTC ? Ue : hi).apply(
      null,
      r
    ), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[W] = 24), e._w && typeof e._w.d < "u" && e._w.d !== i && (p(e).weekdayMismatch = !0);
  }
}
function on(e) {
  var t, s, r, a, i, n, o, l, u;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (i = 1, n = 4, s = _e(
    t.GG,
    e._a[L],
    je(S(), 1, 4).year
  ), r = _e(t.W, 1), a = _e(t.E, 1), (a < 1 || a > 7) && (l = !0)) : (i = e._locale._week.dow, n = e._locale._week.doy, u = je(S(), i, n), s = _e(t.gg, e._a[L], u.year), r = _e(t.w, u.week), t.d != null ? (a = t.d, (a < 0 || a > 6) && (l = !0)) : t.e != null ? (a = t.e + i, (t.e < 0 || t.e > 6) && (l = !0)) : a = i), r < 1 || r > te(s, i, n) ? p(e)._overflowWeeks = !0 : l != null ? p(e)._overflowWeekday = !0 : (o = pr(s, r, a, i, n), e._a[L] = o.year, e._dayOfYear = o.dayOfYear);
}
c.ISO_8601 = function() {
};
c.RFC_2822 = function() {
};
function ms(e) {
  if (e._f === c.ISO_8601) {
    vr(e);
    return;
  }
  if (e._f === c.RFC_2822) {
    Mr(e);
    return;
  }
  e._a = [], p(e).empty = !0;
  var t = "" + e._i, s, r, a, i, n, o = t.length, l = 0, u, f;
  for (a = nr(e._f, e._locale).match(ss) || [], f = a.length, s = 0; s < f; s++)
    i = a[s], r = (t.match(za(i, e)) || [])[0], r && (n = t.substr(0, t.indexOf(r)), n.length > 0 && p(e).unusedInput.push(n), t = t.slice(
      t.indexOf(r) + r.length
    ), l += r.length), Se[i] ? (r ? p(e).empty = !1 : p(e).unusedTokens.push(i), Ka(i, r, e)) : e._strict && !r && p(e).unusedTokens.push(i);
  p(e).charsLeftOver = o - l, t.length > 0 && p(e).unusedInput.push(t), e._a[W] <= 12 && p(e).bigHour === !0 && e._a[W] > 0 && (p(e).bigHour = void 0), p(e).parsedDateParts = e._a.slice(0), p(e).meridiem = e._meridiem, e._a[W] = ln(
    e._locale,
    e._a[W],
    e._meridiem
  ), u = p(e).era, u !== null && (e._a[L] = e._locale.erasConvertYear(u, e._a[L])), fs(e), hs(e);
}
function ln(e, t, s) {
  var r;
  return s == null ? t : e.meridiemHour != null ? e.meridiemHour(t, s) : (e.isPM != null && (r = e.isPM(s), r && t < 12 && (t += 12), !r && t === 12 && (t = 0)), t);
}
function dn(e) {
  var t, s, r, a, i, n, o = !1, l = e._f.length;
  if (l === 0) {
    p(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (a = 0; a < l; a++)
    i = 0, n = !1, t = es({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[a], ms(t), Xt(t) && (n = !0), i += p(t).charsLeftOver, i += p(t).unusedTokens.length * 10, p(t).score = i, o ? i < r && (r = i, s = t) : (r == null || i < r || n) && (r = i, s = t, n && (o = !0));
  le(e, s || t);
}
function un(e) {
  if (!e._d) {
    var t = rs(e._i), s = t.day === void 0 ? t.date : t.day;
    e._a = rr(
      [t.year, t.month, s, t.hour, t.minute, t.second, t.millisecond],
      function(r) {
        return r && parseInt(r, 10);
      }
    ), fs(e);
  }
}
function cn(e) {
  var t = new $e(hs(Sr(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function Sr(e) {
  var t = e._i, s = e._f;
  return e._locale = e._locale || ie(e._l), t === null || s === void 0 && t === "" ? yt({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), B(t) ? new $e(hs(t)) : (Ge(t) ? e._d = t : j(s) ? dn(e) : s ? ms(e) : hn(e), Xt(e) || (e._d = null), e));
}
function hn(e) {
  var t = e._i;
  E(t) ? e._d = new Date(c.now()) : Ge(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? an(e) : j(t) ? (e._a = rr(t.slice(0), function(s) {
    return parseInt(s, 10);
  }), fs(e)) : ge(t) ? un(e) : ae(t) ? e._d = new Date(t) : c.createFromInputFallback(e);
}
function xr(e, t, s, r, a) {
  var i = {};
  return (t === !0 || t === !1) && (r = t, t = void 0), (s === !0 || s === !1) && (r = s, s = void 0), (ge(e) && Qt(e) || j(e) && e.length === 0) && (e = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = a, i._l = s, i._i = e, i._f = t, i._strict = r, cn(i);
}
function S(e, t, s, r) {
  return xr(e, t, s, r, !1);
}
var fn = H(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = S.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : yt();
  }
), mn = H(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = S.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : yt();
  }
);
function Or(e, t) {
  var s, r;
  if (t.length === 1 && j(t[0]) && (t = t[0]), !t.length)
    return S();
  for (s = t[0], r = 1; r < t.length; ++r)
    (!t[r].isValid() || t[r][e](s)) && (s = t[r]);
  return s;
}
function gn() {
  var e = [].slice.call(arguments, 0);
  return Or("isBefore", e);
}
function yn() {
  var e = [].slice.call(arguments, 0);
  return Or("isAfter", e);
}
var wn = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, Ee = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function pn(e) {
  var t, s = !1, r, a = Ee.length;
  for (t in e)
    if (b(e, t) && !(N.call(Ee, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (r = 0; r < a; ++r)
    if (e[Ee[r]]) {
      if (s)
        return !1;
      parseFloat(e[Ee[r]]) !== _(e[Ee[r]]) && (s = !0);
    }
  return !0;
}
function kn() {
  return this._isValid;
}
function _n() {
  return G(NaN);
}
function Mt(e) {
  var t = rs(e), s = t.year || 0, r = t.quarter || 0, a = t.month || 0, i = t.week || t.isoWeek || 0, n = t.day || 0, o = t.hour || 0, l = t.minute || 0, u = t.second || 0, f = t.millisecond || 0;
  this._isValid = pn(t), this._milliseconds = +f + u * 1e3 + // 1000
  l * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +n + i * 7, this._months = +a + r * 3 + s * 12, this._data = {}, this._locale = ie(), this._bubble();
}
function rt(e) {
  return e instanceof Mt;
}
function jt(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function Dn(e, t, s) {
  var r = Math.min(e.length, t.length), a = Math.abs(e.length - t.length), i = 0, n;
  for (n = 0; n < r; n++)
    _(e[n]) !== _(t[n]) && i++;
  return i + a;
}
function Yr(e, t) {
  m(e, 0, 0, function() {
    var s = this.utcOffset(), r = "+";
    return s < 0 && (s = -s, r = "-"), r + z(~~(s / 60), 2) + t + z(~~s % 60, 2);
  });
}
Yr("Z", ":");
Yr("ZZ", "");
h("Z", Dt);
h("ZZ", Dt);
M(["Z", "ZZ"], function(e, t, s) {
  s._useUTC = !0, s._tzm = gs(Dt, e);
});
var bn = /([\+\-]|\d\d)/gi;
function gs(e, t) {
  var s = (t || "").match(e), r, a, i;
  return s === null ? null : (r = s[s.length - 1] || [], a = (r + "").match(bn) || ["-", 0, 0], i = +(a[1] * 60) + _(a[2]), i === 0 ? 0 : a[0] === "+" ? i : -i);
}
function ys(e, t) {
  var s, r;
  return t._isUTC ? (s = t.clone(), r = (B(e) || Ge(e) ? e.valueOf() : S(e).valueOf()) - s.valueOf(), s._d.setTime(s._d.valueOf() + r), c.updateOffset(s, !1), s) : S(e).local();
}
function Bt(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
c.updateOffset = function() {
};
function vn(e, t, s) {
  var r = this._offset || 0, a;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = gs(Dt, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !s && (e = e * 60);
    return !this._isUTC && t && (a = Bt(this)), this._offset = e, this._isUTC = !0, a != null && this.add(a, "m"), r !== e && (!t || this._changeInProgress ? Wr(
      this,
      G(e - r, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, c.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? r : Bt(this);
}
function Mn(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function Sn(e) {
  return this.utcOffset(0, e);
}
function xn(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Bt(this), "m")), this;
}
function On() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = gs(Ga, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function Yn(e) {
  return this.isValid() ? (e = e ? S(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function Tn() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Nn() {
  if (!E(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return es(e, this), e = Sr(e), e._a ? (t = e._isUTC ? Z(e._a) : S(e._a), this._isDSTShifted = this.isValid() && Dn(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function Wn() {
  return this.isValid() ? !this._isUTC : !1;
}
function Fn() {
  return this.isValid() ? this._isUTC : !1;
}
function Tr() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var Cn = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, Ln = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function G(e, t) {
  var s = e, r = null, a, i, n;
  return rt(e) ? s = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : ae(e) || !isNaN(+e) ? (s = {}, t ? s[t] = +e : s.milliseconds = +e) : (r = Cn.exec(e)) ? (a = r[1] === "-" ? -1 : 1, s = {
    y: 0,
    d: _(r[$]) * a,
    h: _(r[W]) * a,
    m: _(r[U]) * a,
    s: _(r[X]) * a,
    ms: _(jt(r[me] * 1e3)) * a
    // the millisecond decimal point is included in the match
  }) : (r = Ln.exec(e)) ? (a = r[1] === "-" ? -1 : 1, s = {
    y: he(r[2], a),
    M: he(r[3], a),
    w: he(r[4], a),
    d: he(r[5], a),
    h: he(r[6], a),
    m: he(r[7], a),
    s: he(r[8], a)
  }) : s == null ? s = {} : typeof s == "object" && ("from" in s || "to" in s) && (n = En(
    S(s.from),
    S(s.to)
  ), s = {}, s.ms = n.milliseconds, s.M = n.months), i = new Mt(s), rt(e) && b(e, "_locale") && (i._locale = e._locale), rt(e) && b(e, "_isValid") && (i._isValid = e._isValid), i;
}
G.fn = Mt.prototype;
G.invalid = _n;
function he(e, t) {
  var s = e && parseFloat(e.replace(",", "."));
  return (isNaN(s) ? 0 : s) * t;
}
function Us(e, t) {
  var s = {};
  return s.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(s.months, "M").isAfter(t) && --s.months, s.milliseconds = +t - +e.clone().add(s.months, "M"), s;
}
function En(e, t) {
  var s;
  return e.isValid() && t.isValid() ? (t = ys(t, e), e.isBefore(t) ? s = Us(e, t) : (s = Us(t, e), s.milliseconds = -s.milliseconds, s.months = -s.months), s) : { milliseconds: 0, months: 0 };
}
function Nr(e, t) {
  return function(s, r) {
    var a, i;
    return r !== null && !isNaN(+r) && (ir(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), i = s, s = r, r = i), a = G(s, r), Wr(this, a, e), this;
  };
}
function Wr(e, t, s, r) {
  var a = t._milliseconds, i = jt(t._days), n = jt(t._months);
  e.isValid() && (r = r ?? !0, n && gr(e, Ie(e, "Month") + n * s), i && hr(e, "Date", Ie(e, "Date") + i * s), a && e._d.setTime(e._d.valueOf() + a * s), r && c.updateOffset(e, i || n));
}
var Pn = Nr(1, "add"), Vn = Nr(-1, "subtract");
function Fr(e) {
  return typeof e == "string" || e instanceof String;
}
function Rn(e) {
  return B(e) || Ge(e) || Fr(e) || ae(e) || Hn(e) || An(e) || e === null || e === void 0;
}
function An(e) {
  var t = ge(e) && !Qt(e), s = !1, r = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], a, i, n = r.length;
  for (a = 0; a < n; a += 1)
    i = r[a], s = s || b(e, i);
  return t && s;
}
function Hn(e) {
  var t = j(e), s = !1;
  return t && (s = e.filter(function(r) {
    return !ae(r) && Fr(e);
  }).length === 0), t && s;
}
function In(e) {
  var t = ge(e) && !Qt(e), s = !1, r = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], a, i;
  for (a = 0; a < r.length; a += 1)
    i = r[a], s = s || b(e, i);
  return t && s;
}
function Un(e, t) {
  var s = e.diff(t, "days", !0);
  return s < -6 ? "sameElse" : s < -1 ? "lastWeek" : s < 0 ? "lastDay" : s < 1 ? "sameDay" : s < 2 ? "nextDay" : s < 7 ? "nextWeek" : "sameElse";
}
function jn(e, t) {
  arguments.length === 1 && (arguments[0] ? Rn(arguments[0]) ? (e = arguments[0], t = void 0) : In(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var s = e || S(), r = ys(s, this).startOf("day"), a = c.calendarFormat(this, r) || "sameElse", i = t && (K(t[a]) ? t[a].call(this, s) : t[a]);
  return this.format(
    i || this.localeData().calendar(a, this, S(s))
  );
}
function Bn() {
  return new $e(this);
}
function Gn(e, t) {
  var s = B(e) ? e : S(e);
  return this.isValid() && s.isValid() ? (t = I(t) || "millisecond", t === "millisecond" ? this.valueOf() > s.valueOf() : s.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function $n(e, t) {
  var s = B(e) ? e : S(e);
  return this.isValid() && s.isValid() ? (t = I(t) || "millisecond", t === "millisecond" ? this.valueOf() < s.valueOf() : this.clone().endOf(t).valueOf() < s.valueOf()) : !1;
}
function zn(e, t, s, r) {
  var a = B(e) ? e : S(e), i = B(t) ? t : S(t);
  return this.isValid() && a.isValid() && i.isValid() ? (r = r || "()", (r[0] === "(" ? this.isAfter(a, s) : !this.isBefore(a, s)) && (r[1] === ")" ? this.isBefore(i, s) : !this.isAfter(i, s))) : !1;
}
function Zn(e, t) {
  var s = B(e) ? e : S(e), r;
  return this.isValid() && s.isValid() ? (t = I(t) || "millisecond", t === "millisecond" ? this.valueOf() === s.valueOf() : (r = s.valueOf(), this.clone().startOf(t).valueOf() <= r && r <= this.clone().endOf(t).valueOf())) : !1;
}
function Kn(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function qn(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function Jn(e, t, s) {
  var r, a, i;
  if (!this.isValid())
    return NaN;
  if (r = ys(e, this), !r.isValid())
    return NaN;
  switch (a = (r.utcOffset() - this.utcOffset()) * 6e4, t = I(t), t) {
    case "year":
      i = at(this, r) / 12;
      break;
    case "month":
      i = at(this, r);
      break;
    case "quarter":
      i = at(this, r) / 3;
      break;
    case "second":
      i = (this - r) / 1e3;
      break;
    case "minute":
      i = (this - r) / 6e4;
      break;
    case "hour":
      i = (this - r) / 36e5;
      break;
    case "day":
      i = (this - r - a) / 864e5;
      break;
    case "week":
      i = (this - r - a) / 6048e5;
      break;
    default:
      i = this - r;
  }
  return s ? i : A(i);
}
function at(e, t) {
  if (e.date() < t.date())
    return -at(t, e);
  var s = (t.year() - e.year()) * 12 + (t.month() - e.month()), r = e.clone().add(s, "months"), a, i;
  return t - r < 0 ? (a = e.clone().add(s - 1, "months"), i = (t - r) / (r - a)) : (a = e.clone().add(s + 1, "months"), i = (t - r) / (a - r)), -(s + i) || 0;
}
c.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
c.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function Qn() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function Xn(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, s = t ? this.clone().utc() : this;
  return s.year() < 0 || s.year() > 9999 ? st(
    s,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : K(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", st(s, "Z")) : st(
    s,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function eo() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", s, r, a, i;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), s = "[" + e + '("]', r = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", a = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]', this.format(s + r + a + i);
}
function to(e) {
  e || (e = this.isUtc() ? c.defaultFormatUtc : c.defaultFormat);
  var t = st(this, e);
  return this.localeData().postformat(t);
}
function so(e, t) {
  return this.isValid() && (B(e) && e.isValid() || S(e).isValid()) ? G({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function ro(e) {
  return this.from(S(), e);
}
function ao(e, t) {
  return this.isValid() && (B(e) && e.isValid() || S(e).isValid()) ? G({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function io(e) {
  return this.to(S(), e);
}
function Cr(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = ie(e), t != null && (this._locale = t), this);
}
var Lr = H(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function Er() {
  return this._locale;
}
var ft = 1e3, xe = 60 * ft, mt = 60 * xe, Pr = (365 * 400 + 97) * 24 * mt;
function Oe(e, t) {
  return (e % t + t) % t;
}
function Vr(e, t, s) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, s) - Pr : new Date(e, t, s).valueOf();
}
function Rr(e, t, s) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, s) - Pr : Date.UTC(e, t, s);
}
function no(e) {
  var t, s;
  if (e = I(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (s = this._isUTC ? Rr : Vr, e) {
    case "year":
      t = s(this.year(), 0, 1);
      break;
    case "quarter":
      t = s(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      t = s(this.year(), this.month(), 1);
      break;
    case "week":
      t = s(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      t = s(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      t = s(this.year(), this.month(), this.date());
      break;
    case "hour":
      t = this._d.valueOf(), t -= Oe(
        t + (this._isUTC ? 0 : this.utcOffset() * xe),
        mt
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= Oe(t, xe);
      break;
    case "second":
      t = this._d.valueOf(), t -= Oe(t, ft);
      break;
  }
  return this._d.setTime(t), c.updateOffset(this, !0), this;
}
function oo(e) {
  var t, s;
  if (e = I(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (s = this._isUTC ? Rr : Vr, e) {
    case "year":
      t = s(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      t = s(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      t = s(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      t = s(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      t = s(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      t = s(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      t = this._d.valueOf(), t += mt - Oe(
        t + (this._isUTC ? 0 : this.utcOffset() * xe),
        mt
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += xe - Oe(t, xe) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += ft - Oe(t, ft) - 1;
      break;
  }
  return this._d.setTime(t), c.updateOffset(this, !0), this;
}
function lo() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function uo() {
  return Math.floor(this.valueOf() / 1e3);
}
function co() {
  return new Date(this.valueOf());
}
function ho() {
  var e = this;
  return [
    e.year(),
    e.month(),
    e.date(),
    e.hour(),
    e.minute(),
    e.second(),
    e.millisecond()
  ];
}
function fo() {
  var e = this;
  return {
    years: e.year(),
    months: e.month(),
    date: e.date(),
    hours: e.hours(),
    minutes: e.minutes(),
    seconds: e.seconds(),
    milliseconds: e.milliseconds()
  };
}
function mo() {
  return this.isValid() ? this.toISOString() : null;
}
function go() {
  return Xt(this);
}
function yo() {
  return le({}, p(this));
}
function wo() {
  return p(this).overflow;
}
function po() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
m("N", 0, 0, "eraAbbr");
m("NN", 0, 0, "eraAbbr");
m("NNN", 0, 0, "eraAbbr");
m("NNNN", 0, 0, "eraName");
m("NNNNN", 0, 0, "eraNarrow");
m("y", ["y", 1], "yo", "eraYear");
m("y", ["yy", 2], 0, "eraYear");
m("y", ["yyy", 3], 0, "eraYear");
m("y", ["yyyy", 4], 0, "eraYear");
h("N", ws);
h("NN", ws);
h("NNN", ws);
h("NNNN", To);
h("NNNNN", No);
M(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, s, r) {
    var a = s._locale.erasParse(e, r, s._strict);
    a ? p(s).era = a : p(s).invalidEra = e;
  }
);
h("y", Te);
h("yy", Te);
h("yyy", Te);
h("yyyy", Te);
h("yo", Wo);
M(["y", "yy", "yyy", "yyyy"], L);
M(["yo"], function(e, t, s, r) {
  var a;
  s._locale._eraYearOrdinalRegex && (a = e.match(s._locale._eraYearOrdinalRegex)), s._locale.eraYearOrdinalParse ? t[L] = s._locale.eraYearOrdinalParse(e, a) : t[L] = parseInt(e, 10);
});
function ko(e, t) {
  var s, r, a, i = this._eras || ie("en")._eras;
  for (s = 0, r = i.length; s < r; ++s) {
    switch (typeof i[s].since) {
      case "string":
        a = c(i[s].since).startOf("day"), i[s].since = a.valueOf();
        break;
    }
    switch (typeof i[s].until) {
      case "undefined":
        i[s].until = 1 / 0;
        break;
      case "string":
        a = c(i[s].until).startOf("day").valueOf(), i[s].until = a.valueOf();
        break;
    }
  }
  return i;
}
function _o(e, t, s) {
  var r, a, i = this.eras(), n, o, l;
  for (e = e.toUpperCase(), r = 0, a = i.length; r < a; ++r)
    if (n = i[r].name.toUpperCase(), o = i[r].abbr.toUpperCase(), l = i[r].narrow.toUpperCase(), s)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (o === e)
            return i[r];
          break;
        case "NNNN":
          if (n === e)
            return i[r];
          break;
        case "NNNNN":
          if (l === e)
            return i[r];
          break;
      }
    else if ([n, o, l].indexOf(e) >= 0)
      return i[r];
}
function Do(e, t) {
  var s = e.since <= e.until ? 1 : -1;
  return t === void 0 ? c(e.since).year() : c(e.since).year() + (t - e.offset) * s;
}
function bo() {
  var e, t, s, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), r[e].since <= s && s <= r[e].until || r[e].until <= s && s <= r[e].since)
      return r[e].name;
  return "";
}
function vo() {
  var e, t, s, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), r[e].since <= s && s <= r[e].until || r[e].until <= s && s <= r[e].since)
      return r[e].narrow;
  return "";
}
function Mo() {
  var e, t, s, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), r[e].since <= s && s <= r[e].until || r[e].until <= s && s <= r[e].since)
      return r[e].abbr;
  return "";
}
function So() {
  var e, t, s, r, a = this.localeData().eras();
  for (e = 0, t = a.length; e < t; ++e)
    if (s = a[e].since <= a[e].until ? 1 : -1, r = this.clone().startOf("day").valueOf(), a[e].since <= r && r <= a[e].until || a[e].until <= r && r <= a[e].since)
      return (this.year() - c(a[e].since).year()) * s + a[e].offset;
  return this.year();
}
function xo(e) {
  return b(this, "_erasNameRegex") || ps.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function Oo(e) {
  return b(this, "_erasAbbrRegex") || ps.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function Yo(e) {
  return b(this, "_erasNarrowRegex") || ps.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function ws(e, t) {
  return t.erasAbbrRegex(e);
}
function To(e, t) {
  return t.erasNameRegex(e);
}
function No(e, t) {
  return t.erasNarrowRegex(e);
}
function Wo(e, t) {
  return t._eraYearOrdinalRegex || Te;
}
function ps() {
  var e = [], t = [], s = [], r = [], a, i, n, o, l, u = this.eras();
  for (a = 0, i = u.length; a < i; ++a)
    n = ee(u[a].name), o = ee(u[a].abbr), l = ee(u[a].narrow), t.push(n), e.push(o), s.push(l), r.push(n), r.push(o), r.push(l);
  this._erasRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  );
}
m(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
m(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function St(e, t) {
  m(0, [e, e.length], 0, t);
}
St("gggg", "weekYear");
St("ggggg", "weekYear");
St("GGGG", "isoWeekYear");
St("GGGGG", "isoWeekYear");
h("G", _t);
h("g", _t);
h("GG", x, P);
h("gg", x, P);
h("GGGG", is, as);
h("gggg", is, as);
h("GGGGG", kt, wt);
h("ggggg", kt, wt);
Ze(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, s, r) {
    t[r.substr(0, 2)] = _(e);
  }
);
Ze(["gg", "GG"], function(e, t, s, r) {
  t[r] = c.parseTwoDigitYear(e);
});
function Fo(e) {
  return Ar.call(
    this,
    e,
    this.week(),
    this.weekday() + this.localeData()._week.dow,
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Co(e) {
  return Ar.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Lo() {
  return te(this.year(), 1, 4);
}
function Eo() {
  return te(this.isoWeekYear(), 1, 4);
}
function Po() {
  var e = this.localeData()._week;
  return te(this.year(), e.dow, e.doy);
}
function Vo() {
  var e = this.localeData()._week;
  return te(this.weekYear(), e.dow, e.doy);
}
function Ar(e, t, s, r, a) {
  var i;
  return e == null ? je(this, r, a).year : (i = te(e, r, a), t > i && (t = i), Ro.call(this, e, t, s, r, a));
}
function Ro(e, t, s, r, a) {
  var i = pr(e, t, s, r, a), n = Ue(i.year, 0, i.dayOfYear);
  return this.year(n.getUTCFullYear()), this.month(n.getUTCMonth()), this.date(n.getUTCDate()), this;
}
m("Q", 0, "Qo", "quarter");
h("Q", or);
M("Q", function(e, t) {
  t[Q] = (_(e) - 1) * 3;
});
function Ao(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
m("D", ["DD", 2], "Do", "date");
h("D", x, Ne);
h("DD", x, P);
h("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
M(["D", "DD"], $);
M("Do", function(e, t) {
  t[$] = _(e.match(x)[0]);
});
var Hr = We("Date", !0);
m("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
h("DDD", pt);
h("DDDD", lr);
M(["DDD", "DDDD"], function(e, t, s) {
  s._dayOfYear = _(e);
});
function Ho(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
m("m", ["mm", 2], 0, "minute");
h("m", x, ns);
h("mm", x, P);
M(["m", "mm"], U);
var Io = We("Minutes", !1);
m("s", ["ss", 2], 0, "second");
h("s", x, ns);
h("ss", x, P);
M(["s", "ss"], X);
var Uo = We("Seconds", !1);
m("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
m(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
m(0, ["SSS", 3], 0, "millisecond");
m(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
m(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
m(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
m(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
m(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
m(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
h("S", pt, or);
h("SS", pt, P);
h("SSS", pt, lr);
var de, Ir;
for (de = "SSSS"; de.length <= 9; de += "S")
  h(de, Te);
function jo(e, t) {
  t[me] = _(("0." + e) * 1e3);
}
for (de = "S"; de.length <= 9; de += "S")
  M(de, jo);
Ir = We("Milliseconds", !1);
m("z", 0, 0, "zoneAbbr");
m("zz", 0, 0, "zoneName");
function Bo() {
  return this._isUTC ? "UTC" : "";
}
function Go() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var d = $e.prototype;
d.add = Pn;
d.calendar = jn;
d.clone = Bn;
d.diff = Jn;
d.endOf = oo;
d.format = to;
d.from = so;
d.fromNow = ro;
d.to = ao;
d.toNow = io;
d.get = Xa;
d.invalidAt = wo;
d.isAfter = Gn;
d.isBefore = $n;
d.isBetween = zn;
d.isSame = Zn;
d.isSameOrAfter = Kn;
d.isSameOrBefore = qn;
d.isValid = go;
d.lang = Lr;
d.locale = Cr;
d.localeData = Er;
d.max = mn;
d.min = fn;
d.parsingFlags = yo;
d.set = ei;
d.startOf = no;
d.subtract = Vn;
d.toArray = ho;
d.toObject = fo;
d.toDate = co;
d.toISOString = Xn;
d.inspect = eo;
typeof Symbol < "u" && Symbol.for != null && (d[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
d.toJSON = mo;
d.toString = Qn;
d.unix = uo;
d.valueOf = lo;
d.creationData = po;
d.eraName = bo;
d.eraNarrow = vo;
d.eraAbbr = Mo;
d.eraYear = So;
d.year = cr;
d.isLeapYear = Qa;
d.weekYear = Fo;
d.isoWeekYear = Co;
d.quarter = d.quarters = Ao;
d.month = yr;
d.daysInMonth = di;
d.week = d.weeks = wi;
d.isoWeek = d.isoWeeks = pi;
d.weeksInYear = Po;
d.weeksInWeekYear = Vo;
d.isoWeeksInYear = Lo;
d.isoWeeksInISOWeekYear = Eo;
d.date = Hr;
d.day = d.days = Wi;
d.weekday = Fi;
d.isoWeekday = Ci;
d.dayOfYear = Ho;
d.hour = d.hours = Hi;
d.minute = d.minutes = Io;
d.second = d.seconds = Uo;
d.millisecond = d.milliseconds = Ir;
d.utcOffset = vn;
d.utc = Sn;
d.local = xn;
d.parseZone = On;
d.hasAlignedHourOffset = Yn;
d.isDST = Tn;
d.isLocal = Wn;
d.isUtcOffset = Fn;
d.isUtc = Tr;
d.isUTC = Tr;
d.zoneAbbr = Bo;
d.zoneName = Go;
d.dates = H(
  "dates accessor is deprecated. Use date instead.",
  Hr
);
d.months = H(
  "months accessor is deprecated. Use month instead",
  yr
);
d.years = H(
  "years accessor is deprecated. Use year instead",
  cr
);
d.zone = H(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  Mn
);
d.isDSTShifted = H(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Nn
);
function $o(e) {
  return S(e * 1e3);
}
function zo() {
  return S.apply(null, arguments).parseZone();
}
function Ur(e) {
  return e;
}
var v = ts.prototype;
v.calendar = Na;
v.longDateFormat = La;
v.invalidDate = Pa;
v.ordinal = Aa;
v.preparse = Ur;
v.postformat = Ur;
v.relativeTime = Ia;
v.pastFuture = Ua;
v.set = Ya;
v.eras = ko;
v.erasParse = _o;
v.erasConvertYear = Do;
v.erasAbbrRegex = Oo;
v.erasNameRegex = xo;
v.erasNarrowRegex = Yo;
v.months = ii;
v.monthsShort = ni;
v.monthsParse = li;
v.monthsRegex = ci;
v.monthsShortRegex = ui;
v.week = fi;
v.firstDayOfYear = yi;
v.firstDayOfWeek = gi;
v.weekdays = xi;
v.weekdaysMin = Yi;
v.weekdaysShort = Oi;
v.weekdaysParse = Ni;
v.weekdaysRegex = Li;
v.weekdaysShortRegex = Ei;
v.weekdaysMinRegex = Pi;
v.isPM = Ri;
v.meridiem = Ii;
function gt(e, t, s, r) {
  var a = ie(), i = Z().set(r, t);
  return a[s](i, e);
}
function jr(e, t, s) {
  if (ae(e) && (t = e, e = void 0), e = e || "", t != null)
    return gt(e, t, s, "month");
  var r, a = [];
  for (r = 0; r < 12; r++)
    a[r] = gt(e, r, s, "month");
  return a;
}
function ks(e, t, s, r) {
  typeof e == "boolean" ? (ae(t) && (s = t, t = void 0), t = t || "") : (t = e, s = t, e = !1, ae(t) && (s = t, t = void 0), t = t || "");
  var a = ie(), i = e ? a._week.dow : 0, n, o = [];
  if (s != null)
    return gt(t, (s + i) % 7, r, "day");
  for (n = 0; n < 7; n++)
    o[n] = gt(t, (n + i) % 7, r, "day");
  return o;
}
function Zo(e, t) {
  return jr(e, t, "months");
}
function Ko(e, t) {
  return jr(e, t, "monthsShort");
}
function qo(e, t, s) {
  return ks(e, t, s, "weekdays");
}
function Jo(e, t, s) {
  return ks(e, t, s, "weekdaysShort");
}
function Qo(e, t, s) {
  return ks(e, t, s, "weekdaysMin");
}
ce("en", {
  eras: [
    {
      since: "0001-01-01",
      until: 1 / 0,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -1 / 0,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(e) {
    var t = e % 10, s = _(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + s;
  }
});
c.lang = H(
  "moment.lang is deprecated. Use moment.locale instead.",
  ce
);
c.langData = H(
  "moment.langData is deprecated. Use moment.localeData instead.",
  ie
);
var q = Math.abs;
function Xo() {
  var e = this._data;
  return this._milliseconds = q(this._milliseconds), this._days = q(this._days), this._months = q(this._months), e.milliseconds = q(e.milliseconds), e.seconds = q(e.seconds), e.minutes = q(e.minutes), e.hours = q(e.hours), e.months = q(e.months), e.years = q(e.years), this;
}
function Br(e, t, s, r) {
  var a = G(t, s);
  return e._milliseconds += r * a._milliseconds, e._days += r * a._days, e._months += r * a._months, e._bubble();
}
function el(e, t) {
  return Br(this, e, t, 1);
}
function tl(e, t) {
  return Br(this, e, t, -1);
}
function js(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function sl() {
  var e = this._milliseconds, t = this._days, s = this._months, r = this._data, a, i, n, o, l;
  return e >= 0 && t >= 0 && s >= 0 || e <= 0 && t <= 0 && s <= 0 || (e += js(Gt(s) + t) * 864e5, t = 0, s = 0), r.milliseconds = e % 1e3, a = A(e / 1e3), r.seconds = a % 60, i = A(a / 60), r.minutes = i % 60, n = A(i / 60), r.hours = n % 24, t += A(n / 24), l = A(Gr(t)), s += l, t -= js(Gt(l)), o = A(s / 12), s %= 12, r.days = t, r.months = s, r.years = o, this;
}
function Gr(e) {
  return e * 4800 / 146097;
}
function Gt(e) {
  return e * 146097 / 4800;
}
function rl(e) {
  if (!this.isValid())
    return NaN;
  var t, s, r = this._milliseconds;
  if (e = I(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + r / 864e5, s = this._months + Gr(t), e) {
      case "month":
        return s;
      case "quarter":
        return s / 3;
      case "year":
        return s / 12;
    }
  else
    switch (t = this._days + Math.round(Gt(this._months)), e) {
      case "week":
        return t / 7 + r / 6048e5;
      case "day":
        return t + r / 864e5;
      case "hour":
        return t * 24 + r / 36e5;
      case "minute":
        return t * 1440 + r / 6e4;
      case "second":
        return t * 86400 + r / 1e3;
      case "millisecond":
        return Math.floor(t * 864e5) + r;
      default:
        throw new Error("Unknown unit " + e);
    }
}
function ne(e) {
  return function() {
    return this.as(e);
  };
}
var $r = ne("ms"), al = ne("s"), il = ne("m"), nl = ne("h"), ol = ne("d"), ll = ne("w"), dl = ne("M"), ul = ne("Q"), cl = ne("y"), hl = $r;
function fl() {
  return G(this);
}
function ml(e) {
  return e = I(e), this.isValid() ? this[e + "s"]() : NaN;
}
function pe(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var gl = pe("milliseconds"), yl = pe("seconds"), wl = pe("minutes"), pl = pe("hours"), kl = pe("days"), _l = pe("months"), Dl = pe("years");
function bl() {
  return A(this.days() / 7);
}
var J = Math.round, De = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function vl(e, t, s, r, a) {
  return a.relativeTime(t || 1, !!s, e, r);
}
function Ml(e, t, s, r) {
  var a = G(e).abs(), i = J(a.as("s")), n = J(a.as("m")), o = J(a.as("h")), l = J(a.as("d")), u = J(a.as("M")), f = J(a.as("w")), y = J(a.as("y")), g = i <= s.ss && ["s", i] || i < s.s && ["ss", i] || n <= 1 && ["m"] || n < s.m && ["mm", n] || o <= 1 && ["h"] || o < s.h && ["hh", o] || l <= 1 && ["d"] || l < s.d && ["dd", l];
  return s.w != null && (g = g || f <= 1 && ["w"] || f < s.w && ["ww", f]), g = g || u <= 1 && ["M"] || u < s.M && ["MM", u] || y <= 1 && ["y"] || ["yy", y], g[2] = t, g[3] = +e > 0, g[4] = r, vl.apply(null, g);
}
function Sl(e) {
  return e === void 0 ? J : typeof e == "function" ? (J = e, !0) : !1;
}
function xl(e, t) {
  return De[e] === void 0 ? !1 : t === void 0 ? De[e] : (De[e] = t, e === "s" && (De.ss = t - 1), !0);
}
function Ol(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var s = !1, r = De, a, i;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (s = e), typeof t == "object" && (r = Object.assign({}, De, t), t.s != null && t.ss == null && (r.ss = t.s - 1)), a = this.localeData(), i = Ml(this, !s, r, a), s && (i = a.pastFuture(+this, i)), a.postformat(i);
}
var Pt = Math.abs;
function ke(e) {
  return (e > 0) - (e < 0) || +e;
}
function xt() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = Pt(this._milliseconds) / 1e3, t = Pt(this._days), s = Pt(this._months), r, a, i, n, o = this.asSeconds(), l, u, f, y;
  return o ? (r = A(e / 60), a = A(r / 60), e %= 60, r %= 60, i = A(s / 12), s %= 12, n = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", l = o < 0 ? "-" : "", u = ke(this._months) !== ke(o) ? "-" : "", f = ke(this._days) !== ke(o) ? "-" : "", y = ke(this._milliseconds) !== ke(o) ? "-" : "", l + "P" + (i ? u + i + "Y" : "") + (s ? u + s + "M" : "") + (t ? f + t + "D" : "") + (a || r || e ? "T" : "") + (a ? y + a + "H" : "") + (r ? y + r + "M" : "") + (e ? y + n + "S" : "")) : "P0D";
}
var D = Mt.prototype;
D.isValid = kn;
D.abs = Xo;
D.add = el;
D.subtract = tl;
D.as = rl;
D.asMilliseconds = $r;
D.asSeconds = al;
D.asMinutes = il;
D.asHours = nl;
D.asDays = ol;
D.asWeeks = ll;
D.asMonths = dl;
D.asQuarters = ul;
D.asYears = cl;
D.valueOf = hl;
D._bubble = sl;
D.clone = fl;
D.get = ml;
D.milliseconds = gl;
D.seconds = yl;
D.minutes = wl;
D.hours = pl;
D.days = kl;
D.weeks = bl;
D.months = _l;
D.years = Dl;
D.humanize = Ol;
D.toISOString = xt;
D.toString = xt;
D.toJSON = xt;
D.locale = Cr;
D.localeData = Er;
D.toIsoString = H(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  xt
);
D.lang = Lr;
m("X", 0, 0, "unix");
m("x", 0, 0, "valueOf");
h("x", _t);
h("X", $a);
M("X", function(e, t, s) {
  s._d = new Date(parseFloat(e) * 1e3);
});
M("x", function(e, t, s) {
  s._d = new Date(_(e));
});
//! moment.js
c.version = "2.30.1";
xa(S);
c.fn = d;
c.min = gn;
c.max = yn;
c.now = wn;
c.utc = Z;
c.unix = $o;
c.months = Zo;
c.isDate = Ge;
c.locale = ce;
c.invalid = yt;
c.duration = G;
c.isMoment = B;
c.weekdays = qo;
c.parseZone = zo;
c.localeData = ie;
c.isDuration = rt;
c.monthsShort = Ko;
c.weekdaysMin = Qo;
c.defineLocale = cs;
c.updateLocale = Gi;
c.locales = $i;
c.weekdaysShort = Jo;
c.normalizeUnits = I;
c.relativeTimeRounding = Sl;
c.relativeTimeThreshold = xl;
c.calendarFormat = Un;
c.prototype = d;
c.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
const Yl = { key: 0 }, Tl = { class: "relative" }, Nl = /* @__PURE__ */ C("div", { class: "absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none" }, [
  /* @__PURE__ */ C("svg", {
    class: "w-4 h-4 text-gray-500 dark:text-gray-400",
    "aria-hidden": "true",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  }, [
    /* @__PURE__ */ C("path", { d: "M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" })
  ])
], -1), Wl = { key: 1 }, Fl = {
  key: 0,
  class: "block mb-2 text-sm font-medium text-gray-900"
}, Cl = /* @__PURE__ */ C("div", { class: "relative mr-4" }, [
  /* @__PURE__ */ C("div", { class: "absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none" }, [
    /* @__PURE__ */ C("svg", {
      class: "w-4 h-4 text-gray-500 dark:text-gray-400",
      "aria-hidden": "true",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "currentColor",
      viewBox: "0 0 20 20"
    }, [
      /* @__PURE__ */ C("path", { d: "M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" })
    ])
  ]),
  /* @__PURE__ */ C("input", {
    datepicker: "",
    type: "text",
    class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    placeholder: "Select date"
  })
], -1), Ll = /* @__PURE__ */ C("div", null, " - ", -1), El = /* @__PURE__ */ C("div", { class: "relative ml-4" }, [
  /* @__PURE__ */ C("div", { class: "absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none" }, [
    /* @__PURE__ */ C("svg", {
      class: "w-4 h-4 text-gray-500 dark:text-gray-400",
      "aria-hidden": "true",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "currentColor",
      viewBox: "0 0 20 20"
    }, [
      /* @__PURE__ */ C("path", { d: "M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" })
    ])
  ]),
  /* @__PURE__ */ C("input", {
    datepicker: "",
    type: "text",
    class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    placeholder: "Select date"
  })
], -1), Pl = [
  Cl,
  Ll,
  El
], Rl = {
  __name: "DatePicker",
  props: {
    modelValue: {
      type: [String, Object],
      default: ""
    },
    returnObject: {
      type: Boolean,
      default: !1
    },
    returnFormat: {
      type: String,
      default: "YYYY-MM-DD"
    },
    inputFormat: {
      type: String,
      default: "YYYY-MM-DD"
    },
    range: {
      type: Boolean,
      default: !1
    },
    label: String
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e;
    function r(g) {
      return g ? typeof g == "object" ? g : c(g, s.inputFormat).toDate() : null;
    }
    function a(g) {
      if (s.range) {
        let k = {
          from: null,
          to: null
        };
        return g && Object.entries(g).forEach(([Y, T]) => {
          k[Y] = r(T);
        }), k;
      } else
        return r(g);
    }
    const i = t, n = _s(null), o = _s(a(s.modelValue));
    function l(g) {
      g && (s.range ? n.value.rangepicker.inputs.forEach((k, Y) => {
        Y === 0 ? k.datepicker.setDate(r(g.from ?? null)) : k.datepicker.setDate(r(g.to ?? null));
      }) : n.value.datepicker.setDate(r(g)));
    }
    const u = (g) => {
      y(g, "from");
    }, f = (g) => {
      y(g, "to");
    }, y = (g, k = null) => {
      if (g.detail)
        if (s.range || (o.value = g.detail.date), s.returnObject)
          s.range && (k === "from" ? o.value = {
            ...o.value ?? {},
            from: g.detail.date
          } : k === "to" && (o.value = {
            ...o.value ?? {},
            to: g.detail.date
          })), i("update:modelValue", o.value);
        else {
          const Y = g.detail.date, T = c(Y).format(s.returnFormat);
          s.range ? (k === "from" ? o.value = {
            ...o.value ?? {},
            from: T
          } : k === "to" && (o.value = {
            ...o.value ?? {},
            to: T
          }), i("update:modelValue", o.value)) : i("update:modelValue", T);
        }
    };
    return zr(() => {
      s.range ? new Sa(n.value, {}) : new tr(n.value, {}), l(o.value), s.range ? n.value.rangepicker.inputs.forEach((g, k) => {
        k === 0 ? g.addEventListener("changeDate", u) : g.addEventListener("changeDate", f);
      }) : n.value.addEventListener("changeDate", y);
    }), Zr(() => {
      n.value && (s.range ? n.value.rangepicker.inputs.forEach((g, k) => {
        k === 0 ? g.removeEventListener("changeDate", u) : g.removeEventListener("changeDate", f);
      }) : n.value.removeEventListener("changeDate", y));
    }), Ds(n, (g, k) => {
      !g && k && (s.range ? k.rangepicker.inputs.forEach((Y, T) => {
        T === 0 ? Y.removeEventListener("changeDate", u) : Y.removeEventListener("changeDate", f);
      }) : k.removeEventListener("changeDate", y));
    }), Ds(s.modelValue, (g) => {
      o.value = a(g), l(g);
    }), (g, k) => s.range ? (qe(), Je("div", Wl, [
      typeof s.label < "u" ? (qe(), Je("label", Fl, bs(e.label), 1)) : vs("", !0),
      C("div", {
        ref_key: "elInput",
        ref: n,
        class: "flex items-center"
      }, Pl, 512)
    ])) : (qe(), Je("div", Yl, [
      typeof s.label < "u" ? (qe(), Je("label", {
        key: 0,
        class: "block mb-2 text-sm font-medium text-gray-900",
        onClick: k[0] || (k[0] = (Y) => n.value.focus())
      }, bs(e.label), 1)) : vs("", !0),
      C("div", Tl, [
        Nl,
        C("input", {
          ref_key: "elInput",
          ref: n,
          datepicker: "",
          type: "text",
          class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          placeholder: "Select date"
        }, null, 512)
      ])
    ]));
  }
};
export {
  Rl as default
};
