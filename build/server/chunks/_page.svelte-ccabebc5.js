import { c as create_ssr_component, b as get_store_value, a as subscribe, v as validate_component, d as each, e as escape, f as add_attribute, s as setContext, h as createEventDispatcher, g as getContext, i as compute_slots, j as compute_rest_props, k as spread, l as escape_attribute_value, n as escape_object, o as assign, p as is_function } from './index2-52ce9210.js';
import { d as derived, w as writable } from './index-dfa6638e.js';

const Payers = writable([]);
const Cart = writable([]);
const Subtotal = derived(Cart, ($Cart) => {
  let subtotal = 0;
  $Cart.forEach((item) => {
    subtotal += item.discounted_price;
  });
  console.log(subtotal);
  return subtotal;
});
const Subtotal_Full = derived(Cart, ($Cart) => {
  let subtotal = 0;
  $Cart.forEach((item) => {
    subtotal += item.price;
  });
  console.log(subtotal);
  return subtotal;
});
const Discount = writable(15);
const Tax = writable(0);
const Tip = writable(0);
const Items = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_Cart;
  $$unsubscribe_Cart = subscribe(Cart, (value) => value);
  let { item } = $$props;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$unsubscribe_Cart();
  return `<div class="grid grid-cols-1 divide-y shadow-md bg-white/10 card"><div class="grid grid-cols-1"><div class="w-full truncate px-2 text-center">${escape(item.name)}</div></div>
  <div class="grid grid-cols-2 divide-x "><div class="w-full px-2 text-center">$${escape(item.price.toFixed(2))}</div>
    <div class="h-fit w-full px-2 text-center">${escape(item.can_discount ? String(item.discount) + "% off" : "Not Discounted")}</div></div>

  <div class="text-center">${escape(item.assigned_to)}</div>
  <div class="text-center py-2"><button type="button" class="btn btn-sm variant-filled-error rounded">Delete
      </button></div></div>`;
});
const toastDefaults = { message: "Missing Toast Message", autohide: true, timeout: 5e3 };
function randomUUID() {
  const random = Math.random();
  return Number(random).toString(32);
}
function handleAutoHide(toast) {
  if (toast.autohide === true) {
    return setTimeout(() => {
      toastStore.close(toast.id);
    }, toast.timeout);
  }
}
function toastService() {
  const { subscribe: subscribe2, set, update } = writable([]);
  return {
    subscribe: subscribe2,
    /** Add a new toast to the queue. */
    trigger: (toast) => {
      const id = randomUUID();
      update((tStore) => {
        if (toast && toast.callback)
          toast.callback({ id, status: "queued" });
        if (toast.hideDismiss)
          toast.autohide = true;
        const tMerged = { ...toastDefaults, ...toast, id };
        tMerged.timeoutId = handleAutoHide(tMerged);
        tStore.push(tMerged);
        return tStore;
      });
      return id;
    },
    /** Remove toast in queue*/
    close: (id) => update((tStore) => {
      if (tStore.length > 0) {
        const index = tStore.findIndex((t) => t.id === id);
        const selectedToast = tStore[index];
        if (selectedToast) {
          if (selectedToast.callback)
            selectedToast.callback({ id, status: "closed" });
          if (selectedToast.timeoutId)
            clearTimeout(selectedToast.timeoutId);
          tStore.splice(index, 1);
        }
      }
      return tStore;
    }),
    /** remain visible on hover */
    freeze: (index) => update((tStore) => {
      if (tStore.length > 0)
        clearTimeout(tStore[index].timeoutId);
      return tStore;
    }),
    /** cancel remain visible on leave */
    unfreeze: (index) => update((tStore) => {
      if (tStore.length > 0)
        tStore[index].timeoutId = handleAutoHide(tStore[index]);
      return tStore;
    }),
    /** Remove all toasts from queue */
    clear: () => set([])
  };
}
const toastStore = toastService();
const stores = {};
function localStorageStore(key, initialValue, options) {
  options?.serializer ?? JSON;
  options?.storage ?? "local";
  if (!stores[key]) {
    const store = writable(initialValue, (set2) => {
    });
    const { subscribe: subscribe2, set } = store;
    stores[key] = {
      set(value) {
        set(value);
      },
      update(updater) {
        const value = updater(get_store_value(store));
        set(value);
      },
      subscribe: subscribe2
    };
  }
  return stores[key];
}
localStorageStore("modeOsPrefers", false);
localStorageStore("modeUserPrefers", void 0);
localStorageStore("modeCurrent", false);
const Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let { autocollapse = false } = $$props;
  let { duration = 200 } = $$props;
  let { width = "w-full" } = $$props;
  let { spacing = "space-y-1" } = $$props;
  let { disabled = false } = $$props;
  let { padding = "py-2 px-4" } = $$props;
  let { hover = "hover:bg-primary-hover-token" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { caretOpen = "rotate-180" } = $$props;
  let { caretClosed = "" } = $$props;
  let { regionControl = "" } = $$props;
  let { regionPanel = "space-y-4" } = $$props;
  let { regionCaret = "" } = $$props;
  const active = writable(null);
  setContext("active", active);
  setContext("autocollapse", autocollapse);
  setContext("duration", duration);
  setContext("disabled", disabled);
  setContext("padding", padding);
  setContext("hover", hover);
  setContext("rounded", rounded);
  setContext("caretOpen", caretOpen);
  setContext("caretClosed", caretClosed);
  setContext("regionControl", regionControl);
  setContext("regionPanel", regionPanel);
  setContext("regionCaret", regionCaret);
  if ($$props.autocollapse === void 0 && $$bindings.autocollapse && autocollapse !== void 0)
    $$bindings.autocollapse(autocollapse);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.caretOpen === void 0 && $$bindings.caretOpen && caretOpen !== void 0)
    $$bindings.caretOpen(caretOpen);
  if ($$props.caretClosed === void 0 && $$bindings.caretClosed && caretClosed !== void 0)
    $$bindings.caretClosed(caretClosed);
  if ($$props.regionControl === void 0 && $$bindings.regionControl && regionControl !== void 0)
    $$bindings.regionControl(regionControl);
  if ($$props.regionPanel === void 0 && $$bindings.regionPanel && regionPanel !== void 0)
    $$bindings.regionPanel(regionPanel);
  if ($$props.regionCaret === void 0 && $$bindings.regionCaret && regionCaret !== void 0)
    $$bindings.regionCaret(regionCaret);
  classesBase = `${width} ${spacing} ${$$props.class ?? ""}`;
  return `

<div class="${"accordion " + escape(classesBase, true)}" data-testid="accordion">${slots.default ? slots.default({}) : ``}</div>`;
});
function cubicInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function crossfade(_a) {
  var { fallback } = _a, defaults = __rest(_a, ["fallback"]);
  const to_receive = /* @__PURE__ */ new Map();
  const to_send = /* @__PURE__ */ new Map();
  function crossfade2(from_node, node, params) {
    const { delay = 0, duration = (d2) => Math.sqrt(d2) * 30, easing = cubicOut } = assign(assign({}, defaults), params);
    const from = from_node.getBoundingClientRect();
    const to = node.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const dw = from.width / to.width;
    const dh = from.height / to.height;
    const d = Math.sqrt(dx * dx + dy * dy);
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    const opacity = +style.opacity;
    return {
      delay,
      duration: is_function(duration) ? duration(d) : duration,
      easing,
      css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
    };
  }
  function transition(items, counterparts, intro) {
    return (node, params) => {
      items.set(params.key, node);
      return () => {
        if (counterparts.has(params.key)) {
          const other_node = counterparts.get(params.key);
          counterparts.delete(params.key);
          return crossfade2(other_node, node, params);
        }
        items.delete(params.key);
        return fallback && fallback(node, params, intro);
      };
    };
  }
  return [
    transition(to_send, to_receive, false),
    transition(to_receive, to_send, true)
  ];
}
const cBase$1 = "";
const cControl = "text-left w-full flex items-center space-x-4";
const cControlCaret = "fill-current w-3 transition-transform duration-[200ms]";
const cPanel = "";
const AccordionItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let openState;
  let classesBase;
  let classesControl;
  let classesCaretState;
  let classesControlCaret;
  let classesPanel;
  let $$slots = compute_slots(slots);
  let $active, $$unsubscribe_active;
  const dispatch = createEventDispatcher();
  let { open = false } = $$props;
  let { id = String(Math.random()) } = $$props;
  let { autocollapse = getContext("autocollapse") } = $$props;
  let { active = getContext("active") } = $$props;
  $$unsubscribe_active = subscribe(active, (value) => $active = value);
  let { duration = getContext("duration") } = $$props;
  let { disabled = getContext("disabled") } = $$props;
  let { padding = getContext("padding") } = $$props;
  let { hover = getContext("hover") } = $$props;
  let { rounded = getContext("rounded") } = $$props;
  let { caretOpen = getContext("caretOpen") } = $$props;
  let { caretClosed = getContext("caretClosed") } = $$props;
  let { regionControl = getContext("regionControl") } = $$props;
  let { regionPanel = getContext("regionPanel") } = $$props;
  let { regionCaret = getContext("regionCaret") } = $$props;
  function setActive(event) {
    if (autocollapse === true) {
      active.set(id);
    } else {
      open = !open;
    }
    onToggle(event);
  }
  function onToggle(event) {
    const currentOpenState = autocollapse ? $active === id : open;
    dispatch("toggle", {
      event,
      id: `accordion-control-${id}`,
      open: currentOpenState,
      autocollapse
    });
  }
  if (autocollapse && open)
    setActive();
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.autocollapse === void 0 && $$bindings.autocollapse && autocollapse !== void 0)
    $$bindings.autocollapse(autocollapse);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.caretOpen === void 0 && $$bindings.caretOpen && caretOpen !== void 0)
    $$bindings.caretOpen(caretOpen);
  if ($$props.caretClosed === void 0 && $$bindings.caretClosed && caretClosed !== void 0)
    $$bindings.caretClosed(caretClosed);
  if ($$props.regionControl === void 0 && $$bindings.regionControl && regionControl !== void 0)
    $$bindings.regionControl(regionControl);
  if ($$props.regionPanel === void 0 && $$bindings.regionPanel && regionPanel !== void 0)
    $$bindings.regionPanel(regionPanel);
  if ($$props.regionCaret === void 0 && $$bindings.regionCaret && regionCaret !== void 0)
    $$bindings.regionCaret(regionCaret);
  {
    if (open && autocollapse)
      setActive();
  }
  openState = autocollapse ? $active === id : open;
  classesBase = `${cBase$1} ${$$props.class ?? ""}`;
  classesControl = `${cControl} ${padding} ${hover} ${rounded} ${regionControl}`;
  classesCaretState = openState ? caretOpen : caretClosed;
  classesControlCaret = `${cControlCaret} ${regionCaret} ${classesCaretState}`;
  classesPanel = `${cPanel} ${padding} ${rounded} ${regionPanel}`;
  $$unsubscribe_active();
  return `

<div class="${"accordion-item " + escape(classesBase, true)}" data-testid="accordion-item">
	<button type="button" class="${"accordion-control " + escape(classesControl, true)}" id="${"accordion-control-" + escape(id, true)}"${add_attribute("aria-expanded", openState, 0)} aria-controls="${"accordion-panel-" + escape(id, true)}" ${disabled ? "disabled" : ""}>
		${$$slots.lead ? `<div class="accordion-lead">${slots.lead ? slots.lead({}) : ``}</div>` : ``}
		
		<div class="accordion-summary flex-1">${slots.summary ? slots.summary({}) : `(summary)`}</div>
		
		<div class="${"accordion-summary-caret " + escape(classesControlCaret, true)}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg></div></button>
	
	${openState ? `<div class="${"accordion-panel " + escape(classesPanel, true)}" id="${"accordion-panel-" + escape(id, true)}" role="region"${add_attribute("aria-hidden", !openState, 0)} aria-labelledby="${"accordion-control-" + escape(id, true)}">${slots.content ? slots.content({}) : `(content)`}</div>` : ``}</div>`;
});
const cBase = "inline-block";
const cLabel = "unstyled flex items-center";
const cTrack = "flex transition-all duration-[200ms] cursor-pointer";
const cThumb = "w-[50%] h-full scale-[0.8] transition-all duration-[200ms] shadow";
const SlideToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cTrackActive;
  let cThumbBackground;
  let cThumbPos;
  let classesDisabled;
  let classesBase;
  let classesLabel;
  let classesTrack;
  let classesThumb;
  let $$restProps = compute_rest_props($$props, ["name", "checked", "size", "background", "active", "border", "rounded", "label"]);
  let $$slots = compute_slots(slots);
  createEventDispatcher();
  let { name } = $$props;
  let { checked = false } = $$props;
  let { size = "md" } = $$props;
  let { background = "bg-surface-400 dark:bg-surface-700" } = $$props;
  let { active = "bg-surface-900 dark:bg-surface-300" } = $$props;
  let { border = "" } = $$props;
  let { rounded = "rounded-full" } = $$props;
  let { label = "" } = $$props;
  let trackSize;
  switch (size) {
    case "sm":
      trackSize = "w-12 h-6";
      break;
    case "lg":
      trackSize = "w-20 h-10";
      break;
    default:
      trackSize = "w-16 h-8";
  }
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  cTrackActive = checked ? active : `${background} cursor-pointer`;
  cThumbBackground = checked ? "bg-white/75" : "bg-white";
  cThumbPos = checked ? "translate-x-full" : "";
  classesDisabled = $$props.disabled === true ? "opacity-50" : "hover:brightness-[105%] dark:hover:brightness-110 cursor-pointer";
  classesBase = `${cBase} ${rounded} ${classesDisabled} ${$$props.class ?? ""}`;
  classesLabel = `${cLabel}`;
  classesTrack = `${cTrack} ${border} ${rounded} ${trackSize} ${cTrackActive}`;
  classesThumb = `${cThumb} ${rounded} ${cThumbBackground} ${cThumbPos}`;
  return `<div${add_attribute("id", label, 0)} class="${"slide-toggle " + escape(classesBase, true)}" data-testid="slide-toggle" role="switch"${add_attribute("aria-label", label, 0)}${add_attribute("aria-checked", checked, 0)} tabindex="0"><label class="${"slide-toggle-label " + escape(classesLabel, true)}">
		<input${spread(
    [
      { type: "checkbox" },
      { class: "slide-toggle-input hidden" },
      { name: escape_attribute_value(name) },
      escape_object(prunedRestProps()),
      { disabled: $$props.disabled || null }
    ],
    {}
  )}${add_attribute("checked", checked, 1)}>
		
		<div class="${[
    "slide-toggle-track " + escape(classesTrack, true),
    $$props.disabled ? "cursor-not-allowed" : ""
  ].join(" ").trim()}"><div class="${[
    "slide-toggle-thumb " + escape(classesThumb, true),
    $$props.disabled ? "cursor-not-allowed" : ""
  ].join(" ").trim()}"></div></div>
		
		${$$slots.default ? `<div class="slide-toggle-text ml-3">${slots.default ? slots.default({}) : ``}</div>` : ``}</label></div>`;
});
const cWrapper = "flex fixed top-0 left-0 right-0 bottom-0 pointer-events-none";
const cSnackbar = "flex flex-col gap-y-2";
const cToast = "flex justify-between items-center pointer-events-auto";
const cToastActions = "flex items-center space-x-2";
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesWrapper;
  let classesSnackbar;
  let classesToast;
  let filteredToasts;
  let $toastStore, $$unsubscribe_toastStore;
  $$unsubscribe_toastStore = subscribe(toastStore, (value) => $toastStore = value);
  let { position = "b" } = $$props;
  let { max = 3 } = $$props;
  let { duration = 250 } = $$props;
  let { background = "variant-filled-secondary" } = $$props;
  let { width = "max-w-[640px]" } = $$props;
  let { color = "" } = $$props;
  let { padding = "p-4" } = $$props;
  let { spacing = "space-x-4" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { shadow = "shadow-lg" } = $$props;
  let { zIndex = "z-[888]" } = $$props;
  let { buttonAction = "btn variant-filled" } = $$props;
  let { buttonDismiss = "btn-icon btn-icon-sm variant-filled" } = $$props;
  let { buttonDismissLabel = "✕" } = $$props;
  let cPosition;
  let cAlign;
  let animAxis = { x: 0, y: 0 };
  switch (position) {
    case "t":
      cPosition = "justify-center items-start";
      cAlign = "items-center";
      animAxis = { x: 0, y: -100 };
      break;
    case "b":
      cPosition = "justify-center items-end";
      cAlign = "items-center";
      animAxis = { x: 0, y: 100 };
      break;
    case "l":
      cPosition = "justify-start items-center";
      cAlign = "items-start";
      animAxis = { x: -100, y: 0 };
      break;
    case "r":
      cPosition = "justify-end items-center";
      cAlign = "items-end";
      animAxis = { x: 100, y: 0 };
      break;
    case "tl":
      cPosition = "justify-start items-start";
      cAlign = "items-start";
      animAxis = { x: -100, y: 0 };
      break;
    case "tr":
      cPosition = "justify-end items-start";
      cAlign = "items-end";
      animAxis = { x: 100, y: 0 };
      break;
    case "bl":
      cPosition = "justify-start items-end";
      cAlign = "items-start";
      animAxis = { x: -100, y: 0 };
      break;
    case "br":
      cPosition = "justify-end items-end";
      cAlign = "items-end";
      animAxis = { x: 100, y: 0 };
      break;
  }
  crossfade({
    duration: (d) => Math.sqrt(d * duration),
    fallback(node) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;
      return {
        duration,
        easing: cubicInOut,
        css: (t, u) => `
					transform: ${transform} scale(${t}) translate(${u * animAxis.x}%, ${u * animAxis.y}%);
					opacity: ${t}
				`
      };
    }
  });
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  if ($$props.buttonAction === void 0 && $$bindings.buttonAction && buttonAction !== void 0)
    $$bindings.buttonAction(buttonAction);
  if ($$props.buttonDismiss === void 0 && $$bindings.buttonDismiss && buttonDismiss !== void 0)
    $$bindings.buttonDismiss(buttonDismiss);
  if ($$props.buttonDismissLabel === void 0 && $$bindings.buttonDismissLabel && buttonDismissLabel !== void 0)
    $$bindings.buttonDismissLabel(buttonDismissLabel);
  classesWrapper = `${cWrapper} ${cPosition} ${zIndex} ${$$props.class || ""}`;
  classesSnackbar = `${cSnackbar} ${cAlign} ${padding}`;
  classesToast = `${cToast} ${width} ${color} ${padding} ${spacing} ${rounded} ${shadow}`;
  filteredToasts = Array.from($toastStore).slice(0, max);
  $$unsubscribe_toastStore();
  return `${$toastStore.length ? `
	<div class="${"snackbar-wrapper " + escape(classesWrapper, true)}" data-testid="snackbar-wrapper">
		<div class="${"snackbar " + escape(classesSnackbar, true)}">${each(filteredToasts, (t, i) => {
    return `<div${add_attribute("role", t.hideDismiss ? "alert" : "alertdialog", 0)} aria-live="polite">
					<div class="${"toast " + escape(classesToast, true) + " " + escape(t.background ?? background, true) + " " + escape(t.classes ?? "", true)}" data-testid="toast"><div class="text-base"><!-- HTML_TAG_START -->${t.message}<!-- HTML_TAG_END --></div>
						${t.action || !t.hideDismiss ? `<div class="${"toast-actions " + escape(cToastActions, true)}">${t.action ? `<button${add_attribute("class", buttonAction, 0)}><!-- HTML_TAG_START -->${t.action.label}<!-- HTML_TAG_END --></button>` : ``}
								${!t.hideDismiss ? `<button${add_attribute("class", buttonDismiss, 0)} aria-label="Dismiss toast">${escape(buttonDismissLabel)}</button>` : ``}
							</div>` : ``}</div>
				</div>`;
  })}</div></div>` : ``}`;
});
const AddPayer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Payers, $$unsubscribe_Payers;
  $$unsubscribe_Payers = subscribe(Payers, (value) => $Payers = value);
  let payer = "";
  $$unsubscribe_Payers();
  return `<div class="grid grid-cols-1 justify-items-center gap-4 divide-y shadow-md"><div class="flex w-full flex-row items-center justify-items-center input-group input-group-divider rounded"><input class="input variant-form-material" type="text"${add_attribute("value", payer, 0)}>
      <button type="button" class="variant-filled h-full whitespace-nowrap"><div class="flex flex-row">Add Payer
	</div></button></div>
  <div class="grid auto-cols-auto grid-flow-col gap-x-4">${each($Payers, (payer2) => {
    return `<div class="p-2"><span class="text-sm">${escape(payer2)}</span>
      </div>`;
  })}</div></div>`;
});
const AddItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_Cart;
  let $Discount, $$unsubscribe_Discount;
  let $Payers, $$unsubscribe_Payers;
  $$unsubscribe_Cart = subscribe(Cart, (value) => value);
  $$unsubscribe_Discount = subscribe(Discount, (value) => $Discount = value);
  $$unsubscribe_Payers = subscribe(Payers, (value) => $Payers = value);
  let name = "";
  let price = "";
  let can_discount = true;
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="grid grid-cols-1 items-center gap-4"><div class="grid grid-cols-2 items-center text-center gap-x-2 "><div><input class="input variant-form-material" type="text" placeholder="Item Name"${add_attribute("value", name, 0)}></div>
    <div><input class="input variant-form-material" type="text" inputmode="decimal" placeholder="Item Price"${add_attribute("value", price, 0)}></div>
    <div class="flex flex-row items-center"><input class="input variant-form-material text-right" type="number"${add_attribute("value", $Discount, 0)}> %
    </div>
    
    <div>${validate_component(SlideToggle, "SlideToggle").$$render(
      $$result,
      {
        name: "slider-label",
        size: "sm",
        active: "bg-success-500",
        checked: can_discount
      },
      {
        checked: ($$value) => {
          can_discount = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `Discountable`;
        }
      }
    )}</div></div>
  <div><select class="select" multiple>${each($Payers, (payer) => {
      return `<option${add_attribute("value", payer, 0)}>${escape(payer)}</option>`;
    })}</select></div>
  <div class="text-center"><button type="button" class="btn btn-sm variant-filled rounded">Add Item
    </button></div></div>`;
  } while (!$$settled);
  $$unsubscribe_Cart();
  $$unsubscribe_Discount();
  $$unsubscribe_Payers();
  return $$rendered;
});
const Split = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Subtotal, $$unsubscribe_Subtotal;
  let $Cart, $$unsubscribe_Cart;
  let $Payers, $$unsubscribe_Payers;
  let $Tip, $$unsubscribe_Tip;
  let $Tax, $$unsubscribe_Tax;
  $$unsubscribe_Subtotal = subscribe(Subtotal, (value) => $Subtotal = value);
  $$unsubscribe_Cart = subscribe(Cart, (value) => $Cart = value);
  $$unsubscribe_Payers = subscribe(Payers, (value) => $Payers = value);
  $$unsubscribe_Tip = subscribe(Tip, (value) => $Tip = value);
  $$unsubscribe_Tax = subscribe(Tax, (value) => $Tax = value);
  function payerBill(payer, cart, tip, tax) {
    console.log("payerBill executed");
    let share = 0;
    for (let i = 0; i < $Cart.length; i++) {
      let item = cart[i];
      console.log(payer);
      console.log(item.assigned_to);
      if (item.assigned_to.includes(payer)) {
        console.log("added to payer");
        console.log(item.discounted_price / item.assigned_to.length);
        share += item.discounted_price / item.assigned_to.length;
      }
    }
    let share_ratio = Number($Subtotal) > 0 ? share / Number($Subtotal) : 0;
    console.log(share_ratio);
    share = share + share_ratio * (Number(tax) + Number(tip));
    return share;
  }
  $$unsubscribe_Subtotal();
  $$unsubscribe_Cart();
  $$unsubscribe_Payers();
  $$unsubscribe_Tip();
  $$unsubscribe_Tax();
  return `<div class="grid grid-cols-1 gap-4 text-center">${each($Payers, (payer) => {
    return `<div class="grid grid-cols-1 p-2"><span class="text-sm">${escape(payer)}</span>
      <div>$${escape(payerBill(payer, $Cart, $Tip, $Tax).toFixed(2))}</div>
    </div>`;
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let total;
  let subtotal;
  let $Subtotal, $$unsubscribe_Subtotal;
  let $Tip, $$unsubscribe_Tip;
  let $Tax, $$unsubscribe_Tax;
  let $Cart, $$unsubscribe_Cart;
  let $Subtotal_Full, $$unsubscribe_Subtotal_Full;
  $$unsubscribe_Subtotal = subscribe(Subtotal, (value) => $Subtotal = value);
  $$unsubscribe_Tip = subscribe(Tip, (value) => $Tip = value);
  $$unsubscribe_Tax = subscribe(Tax, (value) => $Tax = value);
  $$unsubscribe_Cart = subscribe(Cart, (value) => $Cart = value);
  $$unsubscribe_Subtotal_Full = subscribe(Subtotal_Full, (value) => $Subtotal_Full = value);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    subtotal = Number($Subtotal);
    total = Number($Tax) + Number($Tip) + Number(subtotal);
    $$rendered = `


${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}
<div class="place-items-center gap-8 divide-y"><div class="w-full"><h1 class="h1 text-center backdrop-brightness-125 shadow-lg py-2"><span class="bg-gradient-to-br from-blue-500 to-cyan-300 box-decoration-clone bg-clip-text text-transparent">Themepark Bill Splitter</span></h1>

    ${validate_component(Accordion, "Accordion").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(AccordionItem, "AccordionItem").$$render($$result, { open: true }, {}, {
          content: () => {
            return `<div class="align-center item-center justify-center">${validate_component(AddPayer, "AddPayer").$$render($$result, {}, {}, {})}</div>
        `;
          },
          summary: () => {
            return `Add Payers`;
          }
        })}
      ${validate_component(AccordionItem, "AccordionItem").$$render($$result, { open: true }, {}, {
          content: () => {
            return `<div class="align-center item-center justify-center">${validate_component(AddItem, "AddItem").$$render($$result, {}, {}, {})}</div>
        `;
          },
          summary: () => {
            return `Add Items`;
          }
        })}`;
      }
    })}</div>

  ${validate_component(Accordion, "Accordion").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(AccordionItem, "AccordionItem").$$render($$result, { open: true }, {}, {
          content: () => {
            return `<div class="grid auto-cols-max grid-cols-1 place-items-center gap-4">${each($Cart, (item) => {
              return `<div class="w-5/6">${validate_component(Items, "Items").$$render(
                $$result,
                { item },
                {
                  item: ($$value) => {
                    item = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}
            </div>`;
            })}</div>
      `;
          },
          summary: () => {
            return `Cart`;
          }
        })}
    ${validate_component(AccordionItem, "AccordionItem").$$render($$result, { open: true }, {}, {
          content: () => {
            return `<div class="grid grid-cols-1 place-items-center gap-4"><div class="grid grid-cols-1 items-center gap-x-4 text-center"><div class="grid grid-cols-1 text-center"><div>Subtotal</div>
              <div>$${escape(subtotal.toFixed(2))}</div></div>
            <div class="grid grid-cols-1 items-center gap-x-4 text-center"><div>Tax</div>
              <input class="input variant-form-material" type="text" inputmode="decimal" placeholder="Item Price"${add_attribute("value", $Tax, 0)}></div>
            <div class="grid grid-cols-1 items-center gap-x-4 text-center"><div>Tip</div>

              <input class="input variant-form-material" type="text" inputmode="decimal" placeholder="Tip"${add_attribute("value", $Tip, 0)}>
              ${escape($Subtotal > 0 ? ($Tip / $Subtotal_Full * 100).toFixed(2) : "0.00")}%
            </div>
            <div>Total: $${escape(total.toFixed(2))}</div></div></div>`;
          },
          summary: () => {
            return `Summary`;
          }
        })}
    ${validate_component(AccordionItem, "AccordionItem").$$render($$result, { open: true }, {}, {
          content: () => {
            return `${validate_component(Split, "Split").$$render($$result, {}, {}, {})}
      `;
          },
          summary: () => {
            return `Split`;
          }
        })}`;
      }
    })}</div>`;
  } while (!$$settled);
  $$unsubscribe_Subtotal();
  $$unsubscribe_Tip();
  $$unsubscribe_Tax();
  $$unsubscribe_Cart();
  $$unsubscribe_Subtotal_Full();
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-ccabebc5.js.map
