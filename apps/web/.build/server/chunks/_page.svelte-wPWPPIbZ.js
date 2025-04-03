import { c as create_ssr_component, v as validate_component, a as subscribe, b as add_attribute, d as add_styles, e as escape, f as createEventDispatcher, h as each, i as get_store_value, j as compute_rest_props, k as spread, l as escape_object } from './ssr-DP2T01FX.js';
import { w as writable } from './index-DwG6z3Ac.js';

var c=(t,e,r)=>{if(t.endsWith("/")||(t+="/"),e==="index"&&(e=""),!r||!Object.keys(r).length)return `${t}${e}`;let s="";for(let[i,u]of Object.entries(r))s+=`${i}=${u}&`;return `${t}${e}?${s.slice(0,-1)}`},o=t=>t.trim().length!==0&&!Number.isNaN(Number(t));var n=class extends Error{constructor(r,s){super(s+"");this.status=r;this.value=s;}};

var R=typeof FileList>"u",$=n=>R?n instanceof Blob:n instanceof FileList||n instanceof File,J=n=>{if(!n)return  false;for(let e in n){if($(n[e]))return  true;if(Array.isArray(n[e])&&n[e].find(t=>$(t)))return  true}return  false},T=n=>R?n:new Promise(e=>{let t=new FileReader;t.onload=()=>{let s=new File([t.result],n.name,{lastModified:n.lastModified,type:n.type});e(s);},t.readAsArrayBuffer(n);}),F=class{ws;url;constructor(e){this.ws=new WebSocket(e),this.url=e;}send(e){return Array.isArray(e)?(e.forEach(t=>this.send(t)),this):(this.ws.send(typeof e=="object"?JSON.stringify(e):e.toString()),this)}on(e,t,s){return this.addEventListener(e,t,s)}off(e,t,s){return this.ws.removeEventListener(e,t,s),this}subscribe(e,t){return this.addEventListener("message",e,t)}addEventListener(e,t,s){return this.ws.addEventListener(e,l=>{if(e==="message"){let r=l.data.toString(),u=r.charCodeAt(0);if(u===47||u===123)try{r=JSON.parse(r);}catch{}else o(r)?r=+r:r==="true"?r=true:r==="false"&&(r=false);t({...l,data:r});}else t(l);},s),this}removeEventListener(e,t,s){return this.off(e,t,s),this}close(){return this.ws.close(),this}},M=(n$1,e="",t)=>new Proxy(()=>{},{get(s,l,r){return M(n$1,`${e}/${l.toString()}`,t)},apply(s,l,[r,u={}]=[{},{}]){let y=r!==void 0&&(typeof r!="object"||Array.isArray(r))?r:void 0,{$query:I,$fetch:O,$headers:j,$transform:E,getRaw:C,...P}=r??{};y??=P;let b=e.lastIndexOf("/"),g=e.slice(b+1).toUpperCase(),S=c(n$1,b===-1?"/":e.slice(0,b),Object.assign(u.query??{},I)),q=t.fetcher??fetch,p=t.transform?Array.isArray(t.transform)?t.transform:[t.transform]:void 0,v=E?Array.isArray(E)?E:[E]:void 0;return v&&(p?p=v.concat(p):p=v),g==="SUBSCRIBE"?new F(S.replace(/^([^]+):\/\//,S.startsWith("https://")?"wss://":"ws://")):(async N=>{let a,L={...t.$fetch?.headers,...O?.headers,...u.headers,...j};if(g!=="GET"&&g!=="HEAD"){a=Object.keys(y).length||Array.isArray(y)?y:void 0;let i=a&&(typeof a=="object"||Array.isArray(y));if(i&&J(a)){let h=new FormData;for(let[m,f]of Object.entries(a))if(R)h.append(m,f);else if(f instanceof File)h.append(m,await T(f));else if(f instanceof FileList)for(let d=0;d<f.length;d++)h.append(m,await T(f[d]));else if(Array.isArray(f))for(let d=0;d<f.length;d++){let k=f[d];h.append(m,k instanceof File?await T(k):k);}else h.append(m,f);a=h;}else a!=null&&(L["content-type"]=i?"application/json":"text/plain",a=i?JSON.stringify(a):y);}let o$1=await q(S,{method:g,body:a,...t.$fetch,...u.fetch,...O,headers:L}),w;if(N.getRaw)return o$1;switch(o$1.headers.get("Content-Type")?.split(";")[0]){case "application/json":w=await o$1.json();break;default:w=await o$1.text().then(i=>o(i)?+i:i==="true"?true:i==="false"?false:i);}let D=o$1.status>=300||o$1.status<200?new n(o$1.status,w):null,A={data:w,error:D,response:o$1,status:o$1.status,headers:o$1.headers};if(p)for(let i of p){let c=i(A);c instanceof Promise&&(c=await c),c!=null&&(A=c);}return A})({getRaw:C})}}),G=(n,e={fetcher:fetch})=>new Proxy({},{get(t,s){return M(n,s,e)}});

const api = G("http://localhost:5002", {
  $fetch: {
    credentials: "include"
  }
});
const createFeedStore = () => {
  const feedStore = writable({
    isLoading: true,
    page: 0,
    properties: [],
    hasMore: true
  });
  const { subscribe: subscribe2, update } = feedStore;
  const loadProperties = async () => {
    const { page, hasMore } = get_store_value(feedStore);
    if (!hasMore)
      return;
    const { data, error } = await api.feed.properties.post({
      page
    });
    if (!data || error || data.status === "error")
      return;
    update((store) => {
      const { hasMore: hasMore2, properties } = data.payload;
      store.properties = [...store.properties, ...properties];
      store.hasMore = hasMore2;
      store.page = page + 1;
      return store;
    });
  };
  return {
    subscribe: subscribe2,
    reload: async () => {
      update((store) => ({ ...store, isLoading: true }));
      await loadProperties();
      update((store) => ({ ...store, isLoading: false }));
    },
    loadMore: loadProperties
  };
};
const feed = createFeedStore();
const css$1 = {
  code: ".spinner.svelte-uetbol>circle.svelte-uetbol:nth-child(2){stroke-dasharray:54px;stroke-dashoffset:54px}@keyframes svelte-uetbol-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}.spin.svelte-uetbol.svelte-uetbol{animation:svelte-uetbol-spin 1s linear infinite}",
  map: '{"version":3,"file":"loading-spinner-svg.svelte","sources":["loading-spinner-svg.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let className = void 0, strokeDashoffset = void 0, strokeDasharray = void 0, spin = true;\\nexport { className as class };\\n<\/script>\\n\\n<svg\\n  class=\\"spinner {className}\\"\\n  class:spin\\n  viewBox=\\"0 0 28 28\\"\\n  fill=\\"none\\"\\n  stroke=\\"currentColor\\"\\n  height=\\"1.1em\\"\\n  width=\\"1.1em\\"\\n>\\n  <circle cx=\\"14\\" cy=\\"14\\" r=\\"11.5\\" stroke-opacity=\\"0.3\\" stroke-width=\\"5\\" />\\n  <circle\\n    cx=\\"14\\"\\n    cy=\\"14\\"\\n    r=\\"11.5\\"\\n    stroke-width=\\"5\\"\\n    style:stroke-dashoffset={strokeDashoffset}\\n    style:stroke-dasharray={strokeDasharray}\\n  />\\n</svg>\\n\\n<style lang=\\"scss\\">.spinner > circle:nth-child(2) {\\n  stroke-dasharray: 54px;\\n  stroke-dashoffset: 54px;\\n}\\n\\n@keyframes spin {\\n  from {\\n    transform: rotate(0);\\n  }\\n  to {\\n    transform: rotate(360deg);\\n  }\\n}\\n.spin {\\n  animation: spin 1s linear infinite;\\n}</style>\\n"],"names":[],"mappings":"AAwBmB,sBAAQ,CAAG,oBAAM,WAAW,CAAC,CAAE,CAChD,gBAAgB,CAAE,IAAI,CACtB,iBAAiB,CAAE,IACrB,CAEA,WAAW,kBAAK,CACd,IAAK,CACH,SAAS,CAAE,OAAO,CAAC,CACrB,CACA,EAAG,CACD,SAAS,CAAE,OAAO,MAAM,CAC1B,CACF,CACA,iCAAM,CACJ,SAAS,CAAE,kBAAI,CAAC,EAAE,CAAC,MAAM,CAAC,QAC5B"}'
};
const Loading_spinner_svg = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: className = void 0, strokeDashoffset = void 0, strokeDasharray = void 0, spin = true } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.strokeDashoffset === void 0 && $$bindings.strokeDashoffset && strokeDashoffset !== void 0)
    $$bindings.strokeDashoffset(strokeDashoffset);
  if ($$props.strokeDasharray === void 0 && $$bindings.strokeDasharray && strokeDasharray !== void 0)
    $$bindings.strokeDasharray(strokeDasharray);
  if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0)
    $$bindings.spin(spin);
  $$result.css.add(css$1);
  return `<svg class="${["spinner " + escape(className, true) + " svelte-uetbol", spin ? "spin" : ""].join(" ").trim()}" viewBox="0 0 28 28" fill="none" stroke="currentColor" height="1.1em" width="1.1em"><circle cx="14" cy="14" r="11.5" stroke-opacity="0.3" stroke-width="5" class="svelte-uetbol"></circle><circle cx="14" cy="14" r="11.5" stroke-width="5" class="svelte-uetbol"${add_styles({
    "stroke-dashoffset": strokeDashoffset,
    "stroke-dasharray": strokeDasharray
  })}></circle></svg>`;
});
const css = {
  code: "button.svelte-1uanidq>svg{height:1.15em;stroke-width:2}button.svelte-1uanidq>*{position:relative}",
  map: '{"version":3,"file":"button.svelte","sources":["button.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { LoadingSpinnerSVG } from \\"~ui/assets\\";\\nimport Animated from \\"./animated.svelte\\";\\nexport let className = \\"\\", loading = false, primary = false, subtle = false, disabled = false, onClick = void 0;\\nexport { className as class };\\n$:\\n  loadingClass = `${primary ? \\"!.bg-primary-300\\" : \\"!.bg-black-300\\"} !.cursor-wait`;\\n$:\\n  loadingClassSubtle = `${primary ? \\"!.bg-primary-100\\" : \\"!.bg-black-100\\"} !.cursor-wait`;\\n$:\\n  disabledClass = `${primary ? \\"!.bg-primary-300\\" : \\"!.bg-black-300\\"} !.cursor-not-allowed`;\\n$:\\n  disabledClassSubtle = `${primary ? \\"!.bg-primary-100\\" : \\"!.bg-black-100\\"} !.cursor-not-allowed`;\\n$:\\n  filledClass = `${primary ? \\".bg-primary-950 hover:.bg-primary focus:.bg-primary active:.bg-primary\\" : \\".bg-black-950 hover:.bg-black focus:.bg-black active:.bg-black\\"} .text-white`;\\n$:\\n  subtleClass = `${primary ? \\".bg-primary-100 hover:.bg-primary-200 focus:.bg-primary-200 active:.bg-primary-200\\" : \\".bg-black-100 hover:.bg-black-200 focus:.bg-black-200 active:.bg-black-200\\"}\\n    ${primary ? \\".text-primary\\" : \\".text-black\\"}`;\\n<\/script>\\n\\n<button\\n  class=\\"{className}\\n    {loading && (subtle ? loadingClassSubtle : loadingClass)}\\n    {disabled && (subtle ? disabledClassSubtle : disabledClass)}\\n    {subtle ? subtleClass : filledClass}\\n    uprent .flex .h-9 .items-center .justify-center .gap-1.5 .whitespace-nowrap .rounded-md .border-0 .px-4 .text-sm .font-medium .tracking-wide\\"\\n  {disabled}\\n  on:click={e => !disabled && !loading && onClick?.(e)}\\n  {...$$restProps}\\n>\\n  {#if loading}\\n    <LoadingSpinnerSVG />\\n  {:else}\\n    <slot name=\\"icon\\" />\\n  {/if}\\n  <slot />\\n</button>\\n\\n<style lang=\\"postcss\\">\\n  button > :global(svg) {\\n    height: 1.15em;\\n    stroke-width: 2;\\n  }\\n  button > :global(*) {\\n    position: relative;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAsCE,qBAAM,CAAW,GAAK,CACpB,MAAM,CAAE,MAAM,CACd,YAAY,CAAE,CAChB,CACA,qBAAM,CAAW,CAAG,CAClB,QAAQ,CAAE,QACZ"}'
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let loadingClass;
  let loadingClassSubtle;
  let disabledClass;
  let disabledClassSubtle;
  let filledClass;
  let subtleClass;
  let $$restProps = compute_rest_props($$props, ["class", "loading", "primary", "subtle", "disabled", "onClick"]);
  let { class: className = "", loading = false, primary = false, subtle = false, disabled = false, onClick = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0)
    $$bindings.primary(primary);
  if ($$props.subtle === void 0 && $$bindings.subtle && subtle !== void 0)
    $$bindings.subtle(subtle);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  $$result.css.add(css);
  loadingClass = `${primary ? "!.bg-primary-300" : "!.bg-black-300"} !.cursor-wait`;
  loadingClassSubtle = `${primary ? "!.bg-primary-100" : "!.bg-black-100"} !.cursor-wait`;
  disabledClass = `${primary ? "!.bg-primary-300" : "!.bg-black-300"} !.cursor-not-allowed`;
  disabledClassSubtle = `${primary ? "!.bg-primary-100" : "!.bg-black-100"} !.cursor-not-allowed`;
  filledClass = `${primary ? ".bg-primary-950 hover:.bg-primary focus:.bg-primary active:.bg-primary" : ".bg-black-950 hover:.bg-black focus:.bg-black active:.bg-black"} .text-white`;
  subtleClass = `${primary ? ".bg-primary-100 hover:.bg-primary-200 focus:.bg-primary-200 active:.bg-primary-200" : ".bg-black-100 hover:.bg-black-200 focus:.bg-black-200 active:.bg-black-200"}
    ${primary ? ".text-primary" : ".text-black"}`;
  return `<button${spread(
    [
      {
        class: escape(className, true) + " " + escape(loading && (subtle ? loadingClassSubtle : loadingClass), true) + " " + escape(disabled && (subtle ? disabledClassSubtle : disabledClass), true) + " " + escape(subtle ? subtleClass : filledClass, true) + " uprent .flex .h-9 .items-center .justify-center .gap-1.5 .whitespace-nowrap .rounded-md .border-0 .px-4 .text-sm .font-medium .tracking-wide"
      },
      { disabled: disabled || null },
      escape_object($$restProps)
    ],
    { classes: "svelte-1uanidq" }
  )}>${loading ? `${validate_component(Loading_spinner_svg, "LoadingSpinnerSVG").$$render($$result, {}, {}, {})}` : `${slots.icon ? slots.icon({}) : ``}`} ${slots.default ? slots.default({}) : ``} </button>`;
});
const addresses = writable([]);
function checkExtensionEnvironment() {
  const isChrome = typeof chrome !== "undefined" && chrome.runtime;
  const extensionId = "YOUR_EXTENSION_ID";
  const isExtensionInstalled = isChrome && chrome.runtime.id === extensionId;
  console.log("Environment check:");
  console.log("- Is Chrome:", isChrome);
  console.log("- Extension installed:", isExtensionInstalled);
  console.log("- Extension ID:", chrome.runtime?.id);
  return {
    isChrome,
    isExtensionInstalled
  };
}
if (typeof window !== "undefined") {
  checkExtensionEnvironment();
}
if (typeof window !== "undefined") {
  const storedAddresses = localStorage.getItem("addresses");
  if (storedAddresses) {
    try {
      const parsedAddresses = JSON.parse(storedAddresses);
      addresses.set(parsedAddresses);
    } catch (e) {
      console.error("Failed to parse stored addresses:", e);
    }
  }
}
addresses.subscribe((value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("addresses", JSON.stringify(value));
  }
});
const Address_modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $addresses, $$unsubscribe_addresses;
  $$unsubscribe_addresses = subscribe(addresses, (value) => $addresses = value);
  let { isOpen = false } = $$props;
  const dispatch = createEventDispatcher();
  let newAddress = "";
  let filteredSuggestions = [];
  let showSuggestions = false;
  function addAddress() {
    if (newAddress && $addresses.length < 2) {
      addresses.update((addr) => [...addr, newAddress]);
      newAddress = "";
      showSuggestions = false;
    }
  }
  function closeModal() {
    dispatch("close");
    newAddress = "";
    showSuggestions = false;
  }
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  $$unsubscribe_addresses();
  return `${isOpen ? `<div class=".fixed .inset-0 .bg-black/50 .flex .items-center .justify-center .z-50"><div class=".bg-white .rounded-lg .p-4 .w-[400px] .max-w-[90vw]"><h3 class=".text-lg .font-semibold .mb-4" data-svelte-h="svelte-1yq45eg">Manage Addresses</h3> <div class=".space-y-4"> ${$addresses.length > 0 ? `<div class=".space-y-2">${each($addresses, (address) => {
    return `<div class=".flex .items-center .justify-between .p-2 .bg-gray-50 .rounded"><span class=".text-sm .text-gray-900">${escape(address)}</span> <button class=".text-red-500 .hover:text-red-700" data-svelte-h="svelte-1jausmz">×</button> </div>`;
  })}</div>` : ``}  ${$addresses.length < 2 ? `<div class=".relative"><input type="text" placeholder="Enter an address" class=".w-full .p-2 .border .rounded .text-sm .text-gray-900 .bg-white"${add_attribute("value", newAddress, 0)}> ${showSuggestions && filteredSuggestions.length > 0 ? `<div class=".absolute .left-0 .right-0 .mt-1 .bg-white .border .rounded .shadow-lg .z-10">${each(filteredSuggestions, (suggestion) => {
    return `<button class=".w-full .text-left .p-2 .text-sm .text-gray-900 .hover:bg-gray-50">${escape(suggestion)} </button>`;
  })}</div>` : ``} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      primary: true,
      onClick: addAddress,
      disabled: !newAddress || $addresses.length >= 2,
      class: ".mt-2"
    },
    {},
    {
      default: () => {
        return `Add Address`;
      }
    }
  )}</div>` : ``} <div class=".flex .justify-end .gap-2 .mt-4">${validate_component(Button, "Button").$$render($$result, { onClick: closeModal }, {}, {
    default: () => {
      return `Close`;
    }
  })}</div></div></div></div>` : ``}`;
});
const Address_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let showModal = false;
  return `<button class=".bg-black .text-white .px-4 .py-2 .rounded-md .hover:bg-gray-800 .transition-colors" data-svelte-h="svelte-edtwm3">Manage addresses</button> ${validate_component(Address_modal, "AddressModal").$$render($$result, { isOpen: showModal }, {}, {})}`;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class=".bg-[#bd2e4f] .text-white .px-10 .py-[5px] .h-[50px] .flex .items-center .justify-between .fixed .top-0 .left-0 .right-0 .z-50"><img src="https://cdn.prod.website-files.com/67053ca02c9605b542296d0f/671389353d1aca320568d70b_logo-light.png" alt="Uprent" class=".w-[103px] .h-auto"> ${validate_component(Address_button, "AddressButton").$$render($$result, {}, {}, {})}</div>`;
});
const Feed_properties = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_feed;
  $$unsubscribe_feed = subscribe(feed, (value) => value);
  let scrollContainer;
  $$unsubscribe_feed();
  return `<div class=".flex .max-w-[1280px] .flex-1 .flex-col .gap-4 .overflow-y-auto .pb-4 .pl-2 .pr-4 .pt-2 xs:.-ml-4 xs:.w-screen"${add_attribute("this", scrollContainer, 0)}>${`<div class=".flex .items-center .gap-2 .text-gray-500">${validate_component(Loading_spinner_svg, "LoadingSpinnerSVG").$$render($$result, { class: ".h-6 .w-6 .stroke-gray-400" }, {}, {})}
      Loading properties...</div>`}</div>`;
});
const Feed = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class=".flex .flex-col .h-full">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <div class=".flex .max-h-screen .flex-col .bg-gray-50 .pt-[50px]">${validate_component(Feed_properties, "FeedProperties").$$render($$result, {}, {}, {})}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-h1h6u_START -->${$$result.title = `<title>Feed | Uprent mini</title>`, ""}<!-- HEAD_svelte-h1h6u_END -->`, ""} ${validate_component(Feed, "Feed").$$render($$result, {}, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-wPWPPIbZ.js.map
