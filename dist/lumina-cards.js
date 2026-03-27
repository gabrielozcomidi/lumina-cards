function t(t,e){if(e&&t?.states)return t.states[e]}function e(t){return!!t&&("unavailable"!==t.state&&"unknown"!==t.state)}function i(t){return t?t.attributes.friendly_name||t.entity_id:""}function a(t,e,i,a){t.callService(e,i,a)}function n(e,i){return i.filter(i=>{const a=t(e,i);return a&&"on"===a.state}).length}function s(e,i){const a=i.map(i=>t(e,i)).filter(t=>t&&"on"===t.state);if(!a.length)return 0;const n=a.reduce((t,e)=>{const i=e.attributes.brightness||0;return t+Math.round(i/255*100)},0);return Math.round(n/a.length)}function o(t,e="°"){return null==t?"--":`${Math.round(t)}${e}`}function r(t){if(!t)return 0;const e=t.attributes.volume_level;return void 0!==e?Math.round(100*e):0}function l(t){if(null==t||t<0)return"0:00";return`${Math.floor(t/60)}:${Math.floor(t%60).toString().padStart(2,"0")}`}let c=!1;function d(t,e,i,a){var n,s=arguments.length,o=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s<3?n(o):s>3?n(e,i,o):n(e,i))||o);return s>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const h=globalThis,u=h.ShadowRoot&&(void 0===h.ShadyCSS||h.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,p=Symbol(),m=new WeakMap;let g=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==p)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(u&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=m.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&m.set(e,t))}return t}toString(){return this.cssText}};const v=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new g(i,t,p)},f=u?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new g("string"==typeof t?t:t+"",void 0,p))(e)})(t):t,{is:_,defineProperty:b,getOwnPropertyDescriptor:y,getOwnPropertyNames:x,getOwnPropertySymbols:$,getPrototypeOf:w}=Object,k=globalThis,C=k.trustedTypes,S=C?C.emptyScript:"",A=k.reactiveElementPolyfillSupport,E=(t,e)=>t,z={toAttribute(t,e){switch(e){case Boolean:t=t?S:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},P=(t,e)=>!_(t,e),M={attribute:!0,type:String,converter:z,reflect:!1,useDefault:!1,hasChanged:P};Symbol.metadata??=Symbol("metadata"),k.litPropertyMetadata??=new WeakMap;let L=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=M){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(t,i,e);void 0!==a&&b(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){const{get:a,set:n}=y(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:a,set(e){const s=a?.call(this);n?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??M}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const t=w(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const t=this.properties,e=[...x(t),...$(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(f(t))}else void 0!==t&&e.push(f(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(u)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),a=h.litNonce;void 0!==a&&e.setAttribute("nonce",a),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,i);if(void 0!==a&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:z).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(a):this.setAttribute(a,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,a=i._$Eh.get(t);if(void 0!==a&&this._$Em!==a){const t=i.getPropertyOptions(a),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:z;this._$Em=a;const s=n.fromAttribute(e,t.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(t,e,i,a=!1,n){if(void 0!==t){const s=this.constructor;if(!1===a&&(n=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??P)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:a,wrapped:n},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==n||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===a&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,a=this[e];!0!==t||this._$AL.has(e)||void 0===a||this.C(e,void 0,i,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};L.elementStyles=[],L.shadowRootOptions={mode:"open"},L[E("elementProperties")]=new Map,L[E("finalized")]=new Map,A?.({ReactiveElement:L}),(k.reactiveElementVersions??=[]).push("2.1.2");const I=globalThis,T=t=>t,j=I.trustedTypes,N=j?j.createPolicy("lit-html",{createHTML:t=>t}):void 0,O="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,R="?"+D,B=`<${R}>`,U=document,H=()=>U.createComment(""),V=t=>null===t||"object"!=typeof t&&"function"!=typeof t,G=Array.isArray,W="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,X=/>/g,q=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),J=/'/g,Z=/"/g,K=/^(?:script|style|textarea|title)$/i,Q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),tt=Q(1),et=Q(2),it=Symbol.for("lit-noChange"),at=Symbol.for("lit-nothing"),nt=new WeakMap,st=U.createTreeWalker(U,129);function ot(t,e){if(!G(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==N?N.createHTML(e):e}const rt=(t,e)=>{const i=t.length-1,a=[];let n,s=2===e?"<svg>":3===e?"<math>":"",o=F;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===F?"!--"===l[1]?o=Y:void 0!==l[1]?o=X:void 0!==l[2]?(K.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=q):void 0!==l[3]&&(o=q):o===q?">"===l[0]?(o=n??F,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?q:'"'===l[3]?Z:J):o===Z||o===J?o=q:o===Y||o===X?o=F:(o=q,n=void 0);const h=o===q&&t[e+1].startsWith("/>")?" ":"";s+=o===F?i+B:c>=0?(a.push(r),i.slice(0,c)+O+i.slice(c)+D+h):i+D+(-2===c?e:h)}return[ot(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),a]};class lt{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let n=0,s=0;const o=t.length-1,r=this.parts,[l,c]=rt(t,e);if(this.el=lt.createElement(l,i),st.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(a=st.nextNode())&&r.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const t of a.getAttributeNames())if(t.endsWith(O)){const e=c[s++],i=a.getAttribute(t).split(D),o=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?pt:"?"===o[1]?mt:"@"===o[1]?gt:ut}),a.removeAttribute(t)}else t.startsWith(D)&&(r.push({type:6,index:n}),a.removeAttribute(t));if(K.test(a.tagName)){const t=a.textContent.split(D),e=t.length-1;if(e>0){a.textContent=j?j.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],H()),st.nextNode(),r.push({type:2,index:++n});a.append(t[e],H())}}}else if(8===a.nodeType)if(a.data===R)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=a.data.indexOf(D,t+1));)r.push({type:7,index:n}),t+=D.length-1}n++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function ct(t,e,i=t,a){if(e===it)return e;let n=void 0!==a?i._$Co?.[a]:i._$Cl;const s=V(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(t),n._$AT(t,i,a)),void 0!==a?(i._$Co??=[])[a]=n:i._$Cl=n),void 0!==n&&(e=ct(t,n._$AS(t,e.values),n,a)),e}class dt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,a=(t?.creationScope??U).importNode(e,!0);st.currentNode=a;let n=st.nextNode(),s=0,o=0,r=i[0];for(;void 0!==r;){if(s===r.index){let e;2===r.type?e=new ht(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new vt(n,this,t)),this._$AV.push(e),r=i[++o]}s!==r?.index&&(n=st.nextNode(),s++)}return st.currentNode=U,a}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class ht{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,a){this.type=2,this._$AH=at,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ct(this,t,e),V(t)?t===at||null==t||""===t?(this._$AH!==at&&this._$AR(),this._$AH=at):t!==this._$AH&&t!==it&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>G(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==at&&V(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,a="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=lt.createElement(ot(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(e);else{const t=new dt(a,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=nt.get(t.strings);return void 0===e&&nt.set(t.strings,e=new lt(t)),e}k(t){G(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const n of t)a===e.length?e.push(i=new ht(this.O(H()),this.O(H()),this,this.options)):i=e[a],i._$AI(n),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=T(t).nextSibling;T(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ut{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,a,n){this.type=1,this._$AH=at,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=at}_$AI(t,e=this,i,a){const n=this.strings;let s=!1;if(void 0===n)t=ct(this,t,e,0),s=!V(t)||t!==this._$AH&&t!==it,s&&(this._$AH=t);else{const a=t;let o,r;for(t=n[0],o=0;o<n.length-1;o++)r=ct(this,a[i+o],e,o),r===it&&(r=this._$AH[o]),s||=!V(r)||r!==this._$AH[o],r===at?t=at:t!==at&&(t+=(r??"")+n[o+1]),this._$AH[o]=r}s&&!a&&this.j(t)}j(t){t===at?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class pt extends ut{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===at?void 0:t}}class mt extends ut{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==at)}}class gt extends ut{constructor(t,e,i,a,n){super(t,e,i,a,n),this.type=5}_$AI(t,e=this){if((t=ct(this,t,e,0)??at)===it)return;const i=this._$AH,a=t===at&&i!==at||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==at&&(i===at||a);a&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class vt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ct(this,t)}}const ft=I.litHtmlPolyfillSupport;ft?.(lt,ht),(I.litHtmlVersions??=[]).push("3.3.2");const _t=globalThis;class bt extends L{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const a=i?.renderBefore??e;let n=a._$litPart$;if(void 0===n){const t=i?.renderBefore??null;a._$litPart$=n=new ht(e.insertBefore(H(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return it}}bt._$litElement$=!0,bt.finalized=!0,_t.litElementHydrateSupport?.({LitElement:bt});const yt=_t.litElementPolyfillSupport;yt?.({LitElement:bt}),(_t.litElementVersions??=[]).push("4.2.2");const xt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},$t={attribute:!0,type:String,converter:z,reflect:!1,hasChanged:P},wt=(t=$t,e,i)=>{const{kind:a,metadata:n}=i;let s=globalThis.litPropertyMetadata.get(n);if(void 0===s&&globalThis.litPropertyMetadata.set(n,s=new Map),"setter"===a&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===a){const{name:a}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(a,n,t,!0,i)},init(e){return void 0!==e&&this.C(a,void 0,t,e),e}}}if("setter"===a){const{name:a}=i;return function(i){const n=this[a];e.call(this,i),this.requestUpdate(a,n,t,!0,i)}}throw Error("Unsupported decorator location: "+a)};function kt(t){return(e,i)=>"object"==typeof i?wt(t,e,i):((t,e,i)=>{const a=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),a?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function Ct(t){return kt({...t,state:!0,attribute:!1})}const St=v`
  :host {
    /* ─── Surfaces ─────────────────────────────────── */
    --lumina-surface: #0e0e10;
    --lumina-surface-dim: #0e0e10;
    --lumina-surface-bright: #2c2c2f;
    --lumina-surface-container-lowest: #000000;
    --lumina-surface-container-low: #131315;
    --lumina-surface-container: #19191c;
    --lumina-surface-container-high: #1f1f22;
    --lumina-surface-container-highest: #252528;
    --lumina-surface-variant: #252528;
    --lumina-surface-tint: #85adff;

    /* ─── On Surface ───────────────────────────────── */
    --lumina-on-surface: #fefbfe;
    --lumina-on-surface-variant: #acaaad;
    --lumina-on-background: #fefbfe;
    --lumina-inverse-surface: #fcf8fb;
    --lumina-inverse-on-surface: #555557;

    /* ─── Primary (Cool / AC) ──────────────────────── */
    --lumina-primary: #85adff;
    --lumina-primary-dim: #0070eb;
    --lumina-primary-container: #6c9fff;
    --lumina-on-primary: #002c65;
    --lumina-on-primary-container: #00214f;
    --lumina-inverse-primary: #005bc2;

    /* ─── Secondary (Warm / Light) ─────────────────── */
    --lumina-secondary: #fecb00;
    --lumina-secondary-dim: #eebe00;
    --lumina-secondary-container: #745b00;
    --lumina-on-secondary: #584500;
    --lumina-on-secondary-container: #fff7ea;

    /* ─── Tertiary (Eco / Clean) ───────────────────── */
    --lumina-tertiary: #b8ffb9;
    --lumina-tertiary-dim: #60ec79;
    --lumina-tertiary-container: #6ffb85;
    --lumina-on-tertiary: #006725;
    --lumina-on-tertiary-container: #005d21;

    /* ─── Error ────────────────────────────────────── */
    --lumina-error: #ff716c;
    --lumina-error-dim: #d7383b;
    --lumina-error-container: #9f0519;
    --lumina-on-error: #490006;
    --lumina-on-error-container: #ffa8a3;

    /* ─── Outline ──────────────────────────────────── */
    --lumina-outline: #767577;
    --lumina-outline-variant: #48474a;

    /* ─── Effects ──────────────────────────────────── */
    --lumina-glass-bg: rgba(37, 37, 40, 0.4);
    --lumina-glass-blur: 24px;
    --lumina-ghost-border: rgba(72, 71, 74, 0.15);
    --lumina-ambient-shadow: 0 0 40px 0 rgba(254, 251, 254, 0.06);

    /* ─── Radii ────────────────────────────────────── */
    --lumina-radius-xs: 0.25rem;
    --lumina-radius-sm: 0.5rem;
    --lumina-radius-md: 0.75rem;
    --lumina-radius-lg: 1rem;
    --lumina-radius-xl: 1.5rem;
    --lumina-radius-full: 9999px;

    /* ─── Spacing ──────────────────────────────────── */
    --lumina-space-1: 0.25rem;
    --lumina-space-2: 0.5rem;
    --lumina-space-3: 0.75rem;
    --lumina-space-4: 1rem;
    --lumina-space-5: 1.25rem;
    --lumina-space-6: 1.5rem;
    --lumina-space-8: 2rem;
    --lumina-space-10: 2.5rem;
    --lumina-space-12: 3rem;

    /* ─── Typography ───────────────────────────────── */
    --lumina-font-headline: 'Manrope', sans-serif;
    --lumina-font-body: 'Inter', sans-serif;

    /* ─── Transitions ──────────────────────────────── */
    --lumina-transition-fast: 150ms ease;
    --lumina-transition-normal: 250ms ease;
    --lumina-transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;function At(t,e,i,a,n=270){const s=2*Math.PI*t,o=n/360*s,r=Math.min(Math.max(e,i),a),l=a-i;return{circumference:s,dashArray:`${o} ${s-o}`,dashOffset:o-(0===l?0:(r-i)/l)*o}}let Et=class extends bt{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.color="var(--lumina-primary)",this.trackColor="var(--lumina-outline-variant)",this.size=120,this.strokeWidth=3,this.arcSpan=270,this.showGlow=!0,this.inactive=!1}get radius(){return(this.size-2*this.strokeWidth)/2}get center(){return this.size/2}get rotationDeg(){return(360-this.arcSpan)/2+90}render(){const{radius:t,center:e}=this,{dashArray:i,dashOffset:a}=At(t,this.value,this.min,this.max,this.arcSpan),{dashArray:n}=At(t,this.max,this.min,this.max,this.arcSpan);return tt`
      <div class="ring-container" style="width:${this.size}px;height:${this.size}px;">
        <svg
          width="${this.size}"
          height="${this.size}"
          viewBox="0 0 ${this.size} ${this.size}"
          style="--ring-rotation: ${this.rotationDeg}deg"
        >
          <defs>
            <filter id="lumina-ring-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Track Arc -->
          <circle
            class="track"
            cx="${e}"
            cy="${e}"
            r="${t}"
            stroke="${this.trackColor}"
            stroke-width="${this.strokeWidth}"
            stroke-dasharray="${n}"
            stroke-dashoffset="0"
          />

          <!-- Value Arc -->
          <circle
            class="value-arc ${this.showGlow&&this.value>this.min?"with-glow":""}"
            cx="${e}"
            cy="${e}"
            r="${t}"
            stroke="${this.inactive?"var(--lumina-outline)":this.color}"
            stroke-width="${this.strokeWidth}"
            stroke-dasharray="${i}"
            stroke-dashoffset="${a}"
          />
        </svg>

        <!-- Center Slot -->
        <div class="center-content">
          <slot></slot>
        </div>
      </div>
    `}};var zt;Et.styles=[St,v`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .ring-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      svg {
        overflow: visible;
        transform: rotate(var(--ring-rotation));
      }

      .track {
        fill: none;
        stroke-linecap: round;
        opacity: 0.4;
      }

      .value-arc {
        fill: none;
        stroke-linecap: round;
        transition: stroke-dashoffset 400ms cubic-bezier(0.4, 0, 0.2, 1),
                    stroke 250ms ease;
      }

      .value-arc.with-glow {
        filter: url(#lumina-ring-glow);
      }

      .center-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        text-align: center;
      }

      :host([inactive]) .value-arc {
        opacity: 0.2;
      }

      :host([inactive]) .track {
        opacity: 0.2;
      }
    `],d([kt({type:Number})],Et.prototype,"value",void 0),d([kt({type:Number})],Et.prototype,"min",void 0),d([kt({type:Number})],Et.prototype,"max",void 0),d([kt({type:String})],Et.prototype,"color",void 0),d([kt({type:String,attribute:"track-color"})],Et.prototype,"trackColor",void 0),d([kt({type:Number})],Et.prototype,"size",void 0),d([kt({type:Number,attribute:"stroke-width"})],Et.prototype,"strokeWidth",void 0),d([kt({type:Number,attribute:"arc-span"})],Et.prototype,"arcSpan",void 0),d([kt({type:Boolean,attribute:"show-glow"})],Et.prototype,"showGlow",void 0),d([kt({type:Boolean})],Et.prototype,"inactive",void 0),Et=d([xt("lumina-ring")],Et);let Pt=zt=class extends bt{constructor(){super(...arguments),this.open=!1,this.title="",this._closing=!1,this._portal=null,this._dragging=!1,this._startY=0,this._dragOffset=0,this._velocity=0,this._lastMoveTime=0,this._lastMoveY=0,this._panel=null}static _injectStyles(){if(zt._stylesInjected)return;zt._stylesInjected=!0;const t=document.createElement("style");t.textContent=zt._sheetStyles,document.head.appendChild(t)}updated(t){t.has("open")&&(this.open?this._show():this._portal&&this._close()),this._portal&&this.open&&!this._closing&&this._syncPortalChildren()}disconnectedCallback(){super.disconnectedCallback(),this._removePortal()}_show(){zt._injectStyles(),this._closing=!1,this._removePortal(),this._portal=document.createElement("div"),this._portal.className="lumina-bottom-sheet-portal";const t=document.createElement("div");t.className="lumina-sheet-backdrop",t.addEventListener("click",()=>this._close());const e=document.createElement("div");e.className="lumina-sheet-panel",this._panel=e;const i=document.createElement("div");i.className="lbs-drag-area";const a=document.createElement("div");if(a.className="lbs-drag-handle",i.appendChild(a),e.appendChild(i),i.addEventListener("pointerdown",t=>this._onPointerDown(t)),i.addEventListener("pointermove",t=>this._onPointerMove(t)),i.addEventListener("pointerup",t=>this._onPointerUp(t)),this.title){const t=document.createElement("div");t.className="lbs-header";const i=document.createElement("span");i.className="lbs-title",i.textContent=this.title;const a=document.createElement("button");a.className="lbs-close",a.textContent="✕",a.addEventListener("click",()=>this._close()),t.appendChild(i),t.appendChild(a),e.appendChild(t)}const n=document.createElement("div");n.className="lbs-content";const s=this.renderRoot.querySelector("slot");if(s){s.assignedElements({flatten:!0}).forEach(t=>{n.appendChild(t)})}else Array.from(this.children).forEach(t=>{n.appendChild(t)});e.appendChild(n),this._portal.appendChild(t),this._portal.appendChild(e),document.body.appendChild(this._portal),document.body.style.overflow="hidden"}_syncPortalChildren(){if(!this._portal)return;this._portal.querySelector(".lbs-content")}_close(){if(!this._portal||this._closing)return;this._closing=!0;const t=this._portal.querySelector(".lumina-sheet-backdrop"),e=this._portal.querySelector(".lumina-sheet-panel");t&&t.classList.add("closing"),e&&e.classList.add("closing"),document.body.style.overflow="",setTimeout(()=>{this._returnChildren(),this._removePortal(),this._closing=!1,this.open=!1,this.dispatchEvent(new CustomEvent("sheet-closed",{bubbles:!0,composed:!0}))},200)}_returnChildren(){if(!this._portal)return;const t=this._portal.querySelector(".lbs-content");t&&Array.from(t.children).forEach(t=>{this.appendChild(t)})}_removePortal(){this._portal&&(this._returnChildren(),this._portal.remove(),this._portal=null,this._panel=null)}_onPointerDown(t){this._dragging=!0,this._startY=t.clientY,this._lastMoveTime=Date.now(),this._lastMoveY=t.clientY,this._dragOffset=0,t.currentTarget.setPointerCapture(t.pointerId)}_onPointerMove(t){if(!this._dragging||!this._panel)return;const e=Date.now(),i=t.clientY-this._lastMoveY,a=e-this._lastMoveTime;a>0&&(this._velocity=i/a),this._lastMoveTime=e,this._lastMoveY=t.clientY,this._dragOffset=Math.max(0,t.clientY-this._startY),this._panel.classList.add("dragging"),this._panel.style.transform=`translateY(${this._dragOffset}px)`}_onPointerUp(t){if(!this._dragging||!this._panel)return;this._dragging=!1,this._panel.classList.remove("dragging"),this._panel.style.transform="";const e=this._panel.offsetHeight||400;(this._dragOffset>.3*e||this._velocity>.5)&&this._close(),this._dragOffset=0,this._velocity=0}render(){return tt`<slot></slot>`}};Pt.styles=v`
    :host { display: none; }
  `,Pt._sheetStyles="\n    .lumina-sheet-backdrop {\n      position: fixed;\n      inset: 0;\n      background: rgba(0, 0, 0, 0.6);\n      z-index: 9998;\n      animation: lbs-backdrop-in 250ms ease forwards;\n      -webkit-tap-highlight-color: transparent;\n    }\n    .lumina-sheet-backdrop.closing {\n      animation: lbs-backdrop-out 200ms ease forwards;\n    }\n\n    .lumina-sheet-panel {\n      position: fixed;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      max-height: 92vh;\n      z-index: 9999;\n      background: #19191c;\n      border-radius: 1.5rem 1.5rem 0 0;\n      display: flex;\n      flex-direction: column;\n      overflow: hidden;\n      animation: lbs-sheet-up 300ms cubic-bezier(0.32, 0.72, 0, 1) forwards;\n      touch-action: none;\n      will-change: transform;\n      font-family: 'Inter', 'Roboto', sans-serif;\n      color: #fefbfe;\n      border-top: 1px solid rgba(72, 71, 74, 0.15);\n    }\n    .lumina-sheet-panel.closing {\n      animation: lbs-sheet-down 200ms ease forwards;\n    }\n    .lumina-sheet-panel.dragging {\n      animation: none !important;\n      transition: none !important;\n    }\n\n    .lbs-drag-area {\n      display: flex;\n      justify-content: center;\n      padding: 12px 0 4px;\n      cursor: grab;\n      flex-shrink: 0;\n    }\n    .lbs-drag-handle {\n      width: 36px;\n      height: 4px;\n      border-radius: 9999px;\n      background: #48474a;\n      opacity: 0.6;\n    }\n\n    .lbs-header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 0 24px 16px;\n      flex-shrink: 0;\n    }\n    .lbs-title {\n      font-family: 'Manrope', 'Inter', sans-serif;\n      font-size: 1.25rem;\n      font-weight: 600;\n      color: #fefbfe;\n    }\n    .lbs-close {\n      width: 32px;\n      height: 32px;\n      border-radius: 9999px;\n      border: none;\n      background: #1f1f22;\n      color: #acaaad;\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 18px;\n      line-height: 1;\n      transition: background 150ms ease;\n    }\n    .lbs-close:hover { background: #2c2c2f; }\n\n    .lbs-content {\n      flex: 1;\n      overflow-y: auto;\n      overflow-x: hidden;\n      padding: 0 24px 32px;\n      overscroll-behavior: contain;\n    }\n    .lbs-content::-webkit-scrollbar { width: 4px; }\n    .lbs-content::-webkit-scrollbar-track { background: transparent; }\n    .lbs-content::-webkit-scrollbar-thumb { background: #48474a; border-radius: 9999px; }\n\n    @keyframes lbs-sheet-up { from { transform: translateY(100%); } to { transform: translateY(0); } }\n    @keyframes lbs-sheet-down { from { transform: translateY(0); } to { transform: translateY(100%); } }\n    @keyframes lbs-backdrop-in { from { opacity: 0; } to { opacity: 1; } }\n    @keyframes lbs-backdrop-out { from { opacity: 1; } to { opacity: 0; } }\n  ",Pt._stylesInjected=!1,d([kt({type:Boolean,reflect:!0})],Pt.prototype,"open",void 0),d([kt({type:String})],Pt.prototype,"title",void 0),d([Ct()],Pt.prototype,"_closing",void 0),Pt=zt=d([xt("lumina-bottom-sheet")],Pt);let Mt=class extends bt{constructor(){super(...arguments),this.label="",this.icon="",this.active=!1,this.disabled=!1,this.variant="default",this.size="md"}render(){return tt`
      <button ?disabled=${this.disabled} part="button">
        ${this.icon?tt`<span class="chip-icon"><ha-icon .icon=${this.icon}></ha-icon></span>`:""}
        ${this.label?tt`<span class="chip-label">${this.label}</span>`:""}
      </button>
    `}};Mt.styles=[St,v`
      :host {
        display: inline-flex;
      }

      button {
        display: inline-flex;
        align-items: center;
        gap: var(--lumina-space-2);
        border: 1px solid var(--lumina-ghost-border);
        border-radius: var(--lumina-radius-full);
        font-family: var(--lumina-font-body);
        font-weight: 500;
        cursor: pointer;
        transition: all var(--lumina-transition-fast);
        background: var(--lumina-surface-container-high);
        color: var(--lumina-on-surface);
        white-space: nowrap;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
      }

      :host([size='md']) button {
        padding: var(--lumina-space-2) var(--lumina-space-4);
        font-size: 0.8125rem;
        height: 36px;
      }

      :host([size='sm']) button {
        padding: var(--lumina-space-1) var(--lumina-space-3);
        font-size: 0.75rem;
        height: 28px;
      }

      button:hover {
        background: var(--lumina-surface-bright);
        border-color: var(--lumina-outline-variant);
      }

      button:active {
        transform: scale(0.96);
      }

      /* ─── Active States ─────────────────────────── */
      :host([active]) button {
        background: rgba(133, 173, 255, 0.15);
        border-color: rgba(133, 173, 255, 0.3);
        color: var(--lumina-primary);
      }

      :host([active][variant='secondary']) button {
        background: rgba(254, 203, 0, 0.12);
        border-color: rgba(254, 203, 0, 0.25);
        color: var(--lumina-secondary);
      }

      :host([active][variant='tertiary']) button {
        background: rgba(111, 251, 133, 0.12);
        border-color: rgba(111, 251, 133, 0.25);
        color: var(--lumina-tertiary);
      }

      :host([active][variant='error']) button {
        background: rgba(255, 113, 108, 0.12);
        border-color: rgba(255, 113, 108, 0.25);
        color: var(--lumina-error);
      }

      /* ─── Disabled ──────────────────────────────── */
      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
        cursor: default;
      }

      /* ─── Icon ──────────────────────────────────── */
      .chip-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        line-height: 1;
      }

      :host([size='sm']) .chip-icon {
        font-size: 16px;
      }

      ha-icon {
        --mdc-icon-size: 18px;
      }

      :host([size='sm']) ha-icon {
        --mdc-icon-size: 16px;
      }
    `],d([kt({type:String})],Mt.prototype,"label",void 0),d([kt({type:String})],Mt.prototype,"icon",void 0),d([kt({type:Boolean,reflect:!0})],Mt.prototype,"active",void 0),d([kt({type:Boolean,reflect:!0})],Mt.prototype,"disabled",void 0),d([kt({type:String})],Mt.prototype,"variant",void 0),d([kt({type:String})],Mt.prototype,"size",void 0),Mt=d([xt("lumina-chip")],Mt);let Lt=class extends bt{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=1,this.color="var(--lumina-primary)",this.disabled=!1,this.variant="default",this.showValue=!1}_getPercent(){const t=this.max-this.min;return 0===t?0:(this.value-this.min)/t*100}_onInput(t){const e=t.target;this.value=Number(e.value),this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:this.value},bubbles:!0,composed:!0}))}render(){const t=this._getPercent(),e="gradient"===this.variant;return tt`
      <div class="slider-track" style="--slider-color: ${this.color}">
        <div class="track-bg">
          <div
            class="track-fill ${e?"gradient-fill":"default-fill"}"
            style="width: ${e?"100%":`${t}%`}"
          ></div>
        </div>
        <div
          class="thumb ${e?"gradient-thumb":""}"
          style="left: ${t}%"
        ></div>
        <input
          type="range"
          .value=${String(this.value)}
          min=${this.min}
          max=${this.max}
          step=${this.step}
          ?disabled=${this.disabled}
          @input=${this._onInput}
        />
      </div>
      ${this.showValue?tt`<span class="value-label">${Math.round(this.value)}</span>`:""}
    `}};Lt.styles=[St,v`
      :host {
        display: flex;
        align-items: center;
        gap: var(--lumina-space-3);
        width: 100%;
      }

      .slider-track {
        flex: 1;
        position: relative;
        height: 36px;
        display: flex;
        align-items: center;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }

      .track-bg {
        width: 100%;
        height: var(--lumina-slider-height, 6px);
        border-radius: var(--lumina-radius-full);
        background: var(--lumina-surface-container-highest);
        position: relative;
        overflow: hidden;
      }

      .track-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: var(--lumina-radius-full);
        transition: width 50ms linear;
      }

      .track-fill.default-fill {
        background: var(--slider-color);
      }

      .track-fill.gradient-fill {
        background: linear-gradient(
          90deg,
          #ffb347 0%,
          #fff4e0 30%,
          #e0ecff 70%,
          #85adff 100%
        );
      }

      input[type='range'] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        margin: 0;
        -webkit-appearance: none;
      }

      .thumb {
        position: absolute;
        top: 50%;
        width: var(--lumina-slider-thumb, 18px);
        height: var(--lumina-slider-thumb, 18px);
        border-radius: var(--lumina-radius-full);
        background: var(--slider-color);
        transform: translate(-50%, -50%);
        pointer-events: none;
        transition: left 50ms linear, box-shadow var(--lumina-transition-fast);
        box-shadow: 0 0 8px rgba(133, 173, 255, 0.3);
      }

      .thumb.gradient-thumb {
        background: var(--lumina-on-surface);
        box-shadow: 0 0 8px rgba(254, 251, 254, 0.3);
      }

      .slider-track:hover .thumb {
        box-shadow: 0 0 14px rgba(133, 173, 255, 0.5);
      }

      .slider-track:active .thumb {
        transform: translate(-50%, -50%) scale(1.15);
      }

      .value-label {
        font-family: var(--lumina-font-body);
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--lumina-on-surface);
        min-width: 36px;
        text-align: right;
      }

      :host([disabled]) {
        opacity: 0.4;
        pointer-events: none;
      }
    `],d([kt({type:Number})],Lt.prototype,"value",void 0),d([kt({type:Number})],Lt.prototype,"min",void 0),d([kt({type:Number})],Lt.prototype,"max",void 0),d([kt({type:Number})],Lt.prototype,"step",void 0),d([kt({type:String})],Lt.prototype,"color",void 0),d([kt({type:Boolean,reflect:!0})],Lt.prototype,"disabled",void 0),d([kt({type:String})],Lt.prototype,"variant",void 0),d([kt({type:Boolean,attribute:"show-value"})],Lt.prototype,"showValue",void 0),Lt=d([xt("lumina-slider")],Lt);let It=class extends bt{constructor(){super(...arguments),this.icon="",this.active=!1,this.disabled=!1,this.size="md",this.variant="default"}render(){return tt`
      <button ?disabled=${this.disabled} part="button">
        <ha-icon .icon=${this.icon}></ha-icon>
      </button>
    `}};It.styles=[St,v`
      :host {
        display: inline-flex;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--lumina-ghost-border);
        border-radius: var(--lumina-radius-full);
        background: var(--lumina-surface-container-high);
        color: var(--lumina-on-surface);
        cursor: pointer;
        transition: all var(--lumina-transition-fast);
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        padding: 0;
      }

      /* ─── Sizes ─────────────────────────────────── */
      :host([size='sm']) button {
        width: 32px;
        height: 32px;
      }

      button,
      :host([size='md']) button {
        width: 40px;
        height: 40px;
      }

      :host([size='lg']) button {
        width: 56px;
        height: 56px;
      }

      /* ─── Variants ──────────────────────────────── */
      :host([variant='filled']) button {
        background: var(--lumina-primary);
        color: var(--lumina-on-primary);
        border-color: transparent;
      }

      :host([variant='filled']) button:hover {
        box-shadow: 0 0 20px rgba(133, 173, 255, 0.5);
      }

      /* ─── States ────────────────────────────────── */
      button:hover {
        background: var(--lumina-surface-bright);
        border-color: var(--lumina-outline-variant);
      }

      button:active {
        transform: scale(0.92);
      }

      :host([active]) button {
        background: rgba(133, 173, 255, 0.15);
        border-color: rgba(133, 173, 255, 0.3);
        color: var(--lumina-primary);
      }

      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
      }

      /* ─── Icon ──────────────────────────────────── */
      ha-icon {
        --mdc-icon-size: 22px;
        display: flex;
      }

      :host([size='sm']) ha-icon {
        --mdc-icon-size: 18px;
      }

      :host([size='lg']) ha-icon {
        --mdc-icon-size: 28px;
      }
    `],d([kt({type:String})],It.prototype,"icon",void 0),d([kt({type:Boolean,reflect:!0})],It.prototype,"active",void 0),d([kt({type:Boolean,reflect:!0})],It.prototype,"disabled",void 0),d([kt({type:String})],It.prototype,"size",void 0),d([kt({type:String})],It.prototype,"variant",void 0),It=d([xt("lumina-icon-button")],It);const Tt=v`
  /* ─── 3D Background (reusable across all cards) ──── */
  .lumina-3d-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
    border-radius: inherit;
  }

  .lumina-3d-bg img {
    position: absolute;
    right: -5%;
    top: 50%;
    transform: translateY(-50%);
    width: 60%;
    height: 95%;
    object-fit: contain;
    object-position: center right;
    filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.6));
    opacity: 0.6;
  }

  .lumina-3d-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      /* Left fade — protects text area */
      linear-gradient(
        to right,
        var(--lumina-3d-bg-color, var(--lumina-surface-container)) 0%,
        var(--lumina-3d-bg-color, var(--lumina-surface-container)) 20%,
        rgba(25, 25, 28, 0.97) 35%,
        rgba(25, 25, 28, 0.8) 48%,
        rgba(25, 25, 28, 0.35) 65%,
        transparent 85%
      ),
      /* Bottom fade */
      linear-gradient(
        to top,
        var(--lumina-3d-bg-color, var(--lumina-surface-container)) 0%,
        rgba(25, 25, 28, 0.95) 12%,
        rgba(25, 25, 28, 0.6) 28%,
        transparent 50%
      ),
      /* Top fade */
      linear-gradient(
        to bottom,
        rgba(25, 25, 28, 0.6) 0%,
        transparent 25%
      );
    pointer-events: none;
  }

  /* Popup variant — hidden (no 3D in popups) */
  .lumina-3d-bg.popup {
    display: none;
  }

  /* Card content sits above the 3D bg */
  .lumina-3d-content {
    position: relative;
    z-index: 1;
  }

  /* ─── Glass Card ─────────────────────────────────── */
  .lumina-glass {
    background: var(--lumina-glass-bg);
    backdrop-filter: blur(var(--lumina-glass-blur));
    -webkit-backdrop-filter: blur(var(--lumina-glass-blur));
    border: 1px solid var(--lumina-ghost-border);
    border-radius: var(--lumina-radius-xl);
  }

  .lumina-glass-sm {
    background: var(--lumina-glass-bg);
    backdrop-filter: blur(var(--lumina-glass-blur));
    -webkit-backdrop-filter: blur(var(--lumina-glass-blur));
    border: 1px solid var(--lumina-ghost-border);
    border-radius: var(--lumina-radius-md);
  }

  /* ─── Surfaces ───────────────────────────────────── */
  .lumina-card {
    background: var(--lumina-surface-container);
    border-radius: var(--lumina-radius-xl);
    padding: var(--lumina-space-6);
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
  }

  .lumina-card-elevated {
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    padding: var(--lumina-space-4);
    color: var(--lumina-on-surface);
  }

  /* ─── Glow Effects ──────────────────────────────── */
  .glow-primary {
    box-shadow: 0 0 15px -3px rgba(133, 173, 255, 0.3);
  }

  .glow-secondary {
    box-shadow: 0 0 15px -3px rgba(254, 203, 0, 0.3);
  }

  .glow-tertiary {
    box-shadow: 0 0 15px -3px rgba(111, 251, 133, 0.3);
  }

  .glow-error {
    box-shadow: 0 0 15px -3px rgba(255, 113, 108, 0.3);
  }

  /* ─── Typography ─────────────────────────────────── */
  .display-lg {
    font-family: var(--lumina-font-headline);
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--lumina-on-surface);
  }

  .display-md {
    font-family: var(--lumina-font-headline);
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--lumina-on-surface);
  }

  .display-sm {
    font-family: var(--lumina-font-headline);
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.15;
    color: var(--lumina-on-surface);
  }

  .headline-lg {
    font-family: var(--lumina-font-headline);
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--lumina-on-surface);
  }

  .headline-sm {
    font-family: var(--lumina-font-headline);
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.3;
    color: var(--lumina-on-surface);
  }

  .title-md {
    font-family: var(--lumina-font-body);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
    color: var(--lumina-on-surface);
  }

  .body-md {
    font-family: var(--lumina-font-body);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--lumina-on-surface);
  }

  .body-sm {
    font-family: var(--lumina-font-body);
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--lumina-on-surface-variant);
  }

  .label-lg {
    font-family: var(--lumina-font-body);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.4;
    color: var(--lumina-on-surface-variant);
  }

  .label-sm {
    font-family: var(--lumina-font-body);
    font-size: 0.6875rem;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--lumina-on-surface-variant);
  }

  /* ─── Utility ────────────────────────────────────── */
  .text-primary { color: var(--lumina-primary); }
  .text-secondary { color: var(--lumina-secondary); }
  .text-tertiary { color: var(--lumina-tertiary); }
  .text-error { color: var(--lumina-error); }
  .text-muted { color: var(--lumina-on-surface-variant); }

  .flex { display: flex; }
  .flex-col { display: flex; flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .gap-1 { gap: var(--lumina-space-1); }
  .gap-2 { gap: var(--lumina-space-2); }
  .gap-3 { gap: var(--lumina-space-3); }
  .gap-4 { gap: var(--lumina-space-4); }
  .gap-6 { gap: var(--lumina-space-6); }

  /* ─── Scrollbar ──────────────────────────────────── */
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--lumina-outline-variant);
    border-radius: var(--lumina-radius-full);
  }
`,jt=v`
  :host {
    display: block;
  }

  ha-card {
    background: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  .room-card {
    position: relative;
    background: var(--lumina-surface-container);
    border-radius: var(--lumina-radius-xl);
    padding: var(--lumina-space-6);
    font-family: var(--lumina-font-body);
    color: var(--lumina-on-surface);
    overflow: hidden;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .room-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--lumina-radius-xl);
    border: 1px solid var(--lumina-ghost-border);
    pointer-events: none;
    z-index: 2;
  }

  /* ─── 3D Background Image — Full Height ──────────── */
  .room-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
    border-radius: var(--lumina-radius-xl);
  }

  .room-bg img {
    position: absolute;
    right: -5%;
    top: 50%;
    transform: translateY(-50%);
    width: 65%;
    height: 90%;
    object-fit: contain;
    object-position: center right;
    filter: drop-shadow(0 0 50px rgba(0, 0, 0, 0.7));
    opacity: 0.75;
    mask-image: radial-gradient(
      ellipse 80% 80% at 60% 50%,
      black 30%,
      rgba(0, 0, 0, 0.4) 60%,
      transparent 100%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 80% 80% at 60% 50%,
      black 30%,
      rgba(0, 0, 0, 0.4) 60%,
      transparent 100%
    );
  }

  /* Multi-directional gradient dissolve */
  .room-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      /* Left fade — protects the text area */
      linear-gradient(
        to right,
        var(--lumina-surface-container) 0%,
        var(--lumina-surface-container) 20%,
        rgba(25, 25, 28, 0.97) 36%,
        rgba(25, 25, 28, 0.75) 50%,
        rgba(25, 25, 28, 0.3) 68%,
        transparent 85%
      ),
      /* Bottom fade — protects action buttons */
      linear-gradient(
        to top,
        var(--lumina-surface-container) 0%,
        rgba(25, 25, 28, 0.95) 15%,
        rgba(25, 25, 28, 0.6) 30%,
        transparent 50%
      ),
      /* Top fade */
      linear-gradient(
        to bottom,
        rgba(25, 25, 28, 0.55) 0%,
        transparent 25%
      );
    pointer-events: none;
  }

  /* ─── Header ────────────────────────────────────── */
  .room-header {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-1);
  }

  .room-name {
    font-family: var(--lumina-font-headline);
    font-size: 1.375rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    line-height: 1.2;
  }

  .room-sensors {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-4);
    margin-top: var(--lumina-space-1);
  }

  .sensor-item {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
  }

  .sensor-item ha-icon {
    --mdc-icon-size: 15px;
    color: var(--lumina-outline);
  }

  .device-count {
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
  }

  /* ─── Action Buttons Row ────────────────────────── */
  .action-buttons {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-end;
    gap: var(--lumina-space-4);
    padding-top: var(--lumina-space-6);
  }

  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-2);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    transition: transform var(--lumina-transition-fast);
  }

  .action-btn:active {
    transform: scale(0.92);
  }

  /* ─── Circular Icon with Ring ───────────────────── */
  .action-ring-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action-icon-circle {
    width: 52px;
    height: 52px;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-surface-container-high);
    border: 1.5px solid var(--lumina-outline-variant);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--lumina-transition-normal);
    position: relative;
    z-index: 1;
  }

  .action-icon-circle ha-icon {
    --mdc-icon-size: 22px;
    color: var(--lumina-on-surface-variant);
    transition: color var(--lumina-transition-normal);
  }

  /* Active state: glowing ring */
  .action-btn.active .action-icon-circle {
    border-color: var(--lumina-primary);
    background: rgba(133, 173, 255, 0.08);
    box-shadow: 0 0 16px rgba(133, 173, 255, 0.25),
                0 0 4px rgba(133, 173, 255, 0.4);
  }

  .action-btn.active .action-icon-circle ha-icon {
    color: var(--lumina-primary);
  }

  /* Per-domain active colors */
  .action-btn.lights-active .action-icon-circle {
    border-color: var(--lumina-secondary);
    background: rgba(254, 203, 0, 0.08);
    box-shadow: 0 0 16px rgba(254, 203, 0, 0.2),
                0 0 4px rgba(254, 203, 0, 0.35);
  }

  .action-btn.lights-active .action-icon-circle ha-icon {
    color: var(--lumina-secondary);
  }

  /* Climate — default (cool / fan_only) */
  .action-btn.climate-active .action-icon-circle {
    border-color: var(--lumina-primary);
    background: rgba(133, 173, 255, 0.08);
    box-shadow: 0 0 16px rgba(133, 173, 255, 0.25),
                0 0 4px rgba(133, 173, 255, 0.4);
  }

  .action-btn.climate-active .action-icon-circle ha-icon {
    color: var(--lumina-primary);
  }

  /* Climate — heat mode (yellow) */
  .action-btn.climate-heat .action-icon-circle {
    border-color: var(--lumina-secondary);
    background: rgba(254, 203, 0, 0.08);
    box-shadow: 0 0 16px rgba(254, 203, 0, 0.2),
                0 0 4px rgba(254, 203, 0, 0.35);
  }

  .action-btn.climate-heat .action-icon-circle ha-icon {
    color: var(--lumina-secondary);
  }

  /* Climate — heat_cool / auto mode (green) */
  .action-btn.climate-heat_cool .action-icon-circle,
  .action-btn.climate-auto .action-icon-circle {
    border-color: var(--lumina-tertiary);
    background: rgba(111, 251, 133, 0.08);
    box-shadow: 0 0 16px rgba(111, 251, 133, 0.2),
                0 0 4px rgba(111, 251, 133, 0.35);
  }

  .action-btn.climate-heat_cool .action-icon-circle ha-icon,
  .action-btn.climate-auto .action-icon-circle ha-icon {
    color: var(--lumina-tertiary);
  }

  .action-btn.media-active .action-icon-circle {
    border-color: var(--lumina-primary);
    background: rgba(133, 173, 255, 0.08);
    box-shadow: 0 0 16px rgba(133, 173, 255, 0.25),
                0 0 4px rgba(133, 173, 255, 0.4);
  }

  .action-btn.media-active .action-icon-circle ha-icon {
    color: var(--lumina-primary);
  }

  .action-btn.vacuum-active .action-icon-circle {
    border-color: var(--lumina-tertiary);
    background: rgba(111, 251, 133, 0.08);
    box-shadow: 0 0 16px rgba(111, 251, 133, 0.2),
                0 0 4px rgba(111, 251, 133, 0.35);
  }

  .action-btn.vacuum-active .action-icon-circle ha-icon {
    color: var(--lumina-tertiary);
  }

  /* ─── SVG Ring Overlay ──────────────────────────── */
  .action-ring-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    pointer-events: none;
  }

  .action-ring-svg .track {
    fill: none;
    stroke-linecap: round;
    opacity: 0;
  }

  .action-btn.active .action-ring-svg .track,
  .action-btn.lights-active .action-ring-svg .track,
  .action-btn.climate-active .action-ring-svg .track,
  .action-btn.media-active .action-ring-svg .track,
  .action-btn.vacuum-active .action-ring-svg .track {
    opacity: 0.15;
  }

  .action-ring-svg .value-arc {
    fill: none;
    stroke-linecap: round;
    transition: stroke-dashoffset 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ─── Action Label ──────────────────────────────── */
  .action-label {
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--lumina-outline);
    transition: color var(--lumina-transition-normal);
  }

  /* All active states → white label */
  .action-btn.active .action-label,
  .action-btn.lights-active .action-label,
  .action-btn.climate-active .action-label,
  .action-btn.media-active .action-label,
  .action-btn.vacuum-active .action-label {
    color: var(--lumina-on-surface);
  }

  /* ─── Hidden ────────────────────────────────────── */
  .action-btn.hidden {
    display: none;
  }
`,Nt=[{key:"sofa",label:"Minimalist Sofa",category:"room",url:"https://lh3.googleusercontent.com/aida-public/AB6AXuCGNjuZJvM-mZ4rCjVsla--bThUY_kW34OGkw6gXeY9gThJbWd4BNujeJkYVJA8bFVaeuPnk6EAlkal6_dvrLYt7l0OcEciVOg0D4lSpy8nrsXwXk1zvqwBSqIDEBByxDpNnHrjtjtHuzFE__U6MURu8NUi2FzBk-9fjF_Pozk5XA9UtGAfZtzOq-EtSbpIbZ7Adj_pTGL_TdQOfdFadIvlTBBzFwmwRg3jP0nl0RHOa6X7Hm85fmzdld7LGpP8LrOpIwqnsLCz5fw"},{key:"bed",label:"Platform Bed",category:"room",url:"https://lh3.googleusercontent.com/aida-public/AB6AXuCtcKUME6_ghVRWaxNw-t28IiG2KVIzopEWdeHs8FKVlbbo5p94YqMydR6JPcJqi_IpfJYlHDHtDZpIr1UyXQfl-DjJf7MGgrZ-hXBlMM0SQMOza6UOlre6RWqnF_AHH7Jhx-RmIysdHDe-8_Y5sfuEHbDSpVl6sXyFCNlR7YmPnRJuJHgxnjOj6eM6pqDb_uAUnmdxox-04zjYExaU6o17a9Cx5w8QZLmZIjz8Ybe0nYPRtVnN_Sx9pdJ8nEzkRWG4MHRZKNbLrAc"},{key:"kitchen",label:"Kitchen Island",category:"room",url:"https://lh3.googleusercontent.com/aida-public/AB6AXuBGRhzKMt9xKB7c5PVu0m4Fljz3_4Thd8GIJhflPI48CAe3SmGBgmWi8y1L60IWJfj6ksPR26PIDyFWENMxwLLe2UxhKev18w4_eDBQ86fxpQ5QgJWpUn5TOWArzz7vPKd2FiBKVLjwsJNLfgT4RicuU9FWwHnJNNjVK6UUnP4ITEWV7YdIUSXgwuKts9R9ys5F1GKhLgfL2Fws6LEPQS5qdChagyoAOP37ocwo1HS5OPavJB1IydiTovk_DThtmecq-g08J1H6zMc"},{key:"bathtub",label:"Freestanding Tub",category:"room",url:"https://lh3.googleusercontent.com/aida-public/AB6AXuB-ZBxzApvXL2fpaHkcgOec2An0dyq0mAEG4Vv0cxxXXuraipatWxsmW0Wm0g0qbPQXsIDmKXoqUfVQooltAdCi7tY87wFWACFvytlHOIxWk69ra9VB5XavDIXaUCpXeXwdcXO3VEmY6KrublxTNry4Qi4jMjEc6NPGrja2UXuxk7OkCG_A_V-VdrPOG1qJG0xi_u0zE3lDLNXX3TUyDxlU852tNDo6apfPpQkVeGPhDqqF3UuAePtimzxcqSeK7L21WSIq7_x_0c8"},{key:"office",label:"Home Office",category:"room",url:"https://lh3.googleusercontent.com/aida-public/AB6AXuD5sEGFPCMqITSl6mhBRsCUYNIcYcm2aGM968YwBkP3fL3NanGn5o2RJgWWNII-vZS45id4PveVQMKhbmt1sXtEWiput9rRJGBCG0c4ZOUO8JwsnhNsYrRbCMgD9J8pRITvHf4lA0RfxWIE9rZw2wx161uUWTb0SWfM5EFxk9R7sIXvQKI8Bl7CzDQEcLJXsxNmuECN3Ujk2Zk4_EUIaYOPNSa6x78vB7uQnB7l6SSGfKxZ_4uPU-JgMTGDpick_jKgbij2qlpfBRc"},{key:"vacuum",label:"Vacuum Robot",category:"device",url:"https://lh3.googleusercontent.com/aida-public/AB6AXuDKfDaBzhKhg_IQKoTyXhELsfrbBEf7BzcKRsyCWbWpNRNJHhyE21ZsKeEPxYd6NustgiPiWSHgZHr2eBZL8j9rKO0_s0STMZB8g6R-ttceaMYD5fXo05hzDPeVxzMjxWGTogEGC6XLC2czH0eQMAqTBFFYDsC_CvEVWXamSGzwTZjiXBZfVe44QQyplHZhXOGpzuDMTrXT4iPxkb0ZuozFWWY4R1qnqoJ57JrDnxlq6--lLJywAmXQ7D910vzB3Kiqtge9zIk5Nos"},{key:"purifier",label:"Air Purifier",category:"device",url:"https://lh3.googleusercontent.com/aida-public/AB6AXuB_Nlv2zn68RXC4nfuZaqmE2myKebfe6dTsR9NDArtUFuqpUE9ZUOQ2WM2SZpkPUkwL0wfi5VnzFw3eJId3ue_EhR95uJN-jo-Xz7z5dNQEwTTBc2s9Ub_nqDjNVCOzMmfhD9bbH-qTIN1AzJ1xu0OiCA5yXgx7-GkUaaE-bqgzwGDArJtwEkQ93jrACrgGKBO27rVT2OWTaj3VNCWOn3cnJnB2h-GFIO8gk8tqTeoTS4nbDagY6R2o5bNWUZDFnFPuqfOsc-wbhz4"},{key:"garden",label:"Garden Irrigation",category:"device",url:"https://lh3.googleusercontent.com/aida-public/AB6AXuBPeHUVckOIk2iGkfkzeH65C9B7h8FnWh7QE8QjJ9YdkXEYBfYWyDKKcZwMjhyXxiNExHttYOwvIcnIvvGk78uZFC_U62cndDqfqDNxS782k-H3VjoRY7Gm88OqrQc8drc8gJKcluk5AoSYGcNsYFW2YkRYPqV5mQaHp_-fJJth2IkVPhsuROmOK0yhwYQNoZvGiZ2zJgkacLqwRbbUJbYF1UjiR_K0z2uD-kLFn8SMjkFsDiM8nokdZZE9puMSP1Fjl-0sA5LZK9Y"},{key:"gym",label:"Smart Home Gym",category:"room",url:"https://lh3.googleusercontent.com/aida-public/AB6AXuD7TWkvjhfV3TFh59u8v8pNbuenxwwgi_K89mM-LZ19MMplhEJZvh91E_RxnZ0Hip1JJNTW7r75ZFRI7rgbiQGhL6SIse23TYbacO9ocDzTPqxFJigvlUheGHAjWxMs_yZachQaf0QO2XhN9pm3og0r2Sehwnie0-2BpBhVIqX0I2hJtzoqtIxjGVp0XFl-i4hWMJk5YfY0_LFF8Wda0MeCIpwIw22_jaLbWKOq7VswT6tgAlG5vJR2iwbO_0XjuTuASqqVcMqtSEY"},{key:"laundry",label:"Laundry Station",category:"room",url:"https://lh3.googleusercontent.com/aida-public/AB6AXuCsioEPWsKXG7P7NPWjon-bqRNaaUTeQAo6snI597ohAIrhSaWiJDDWcyMciLJWC1MKnH1aMcQTvbwQZjPA3oM-FEAdEXeBHMl5cPPprFDcZyECla8nALvtmUVy2-gecMFdkPrL_ILhh6AF7oain77C9Zfaa5ZOpyzUrry5cRtQPzt8hd8l6h7FTvuVr_5Eo7EHPMMn35FH9IIdRAZ7PlMdeZDMRWmf9-wErbvBGsmIA-sYl4-2MmNAdmCQqU0lFTrRjcLZkVjMdRE"},{key:"garage",label:"Garage Setup",category:"room",url:"https://lh3.googleusercontent.com/aida-public/AB6AXuBtRgwm0K8G3ioZRt6-rHFqzfiNDRk83VWl0HdqT317-dP4BmpkDFIH3YctnJhM3Nj3ddifXhjLSNsm4UtTmb7eotN0ZCSS6mSMVWfoHg6GiLNQhHovxBQKrpEostVAjt50ks3PA7NGhui1bJjP-el4553WOpnuaX7KgG680MAaX4iGUI8P2xyDO5Ja_LeIVcXjuCjWoISswoaRjpk6Qvl8CX_-iMpMFa7HCoTZPKSOVX6A-hEhDClPpH84GQNvRhQBxpgvdoRCMfk"}];function Ot(t){if(!t)return null;const e=Nt.find(e=>e.key===t);return e?e.url:t.startsWith("http")||t.startsWith("/")?t:null}const Dt={cool:"var(--lumina-primary)",heat:"var(--lumina-secondary)",heat_cool:"var(--lumina-tertiary)",auto:"var(--lumina-tertiary)",dry:"var(--lumina-on-surface-variant)",fan_only:"var(--lumina-primary)"};let Rt=class extends bt{constructor(){super(...arguments),this._activeSheet=null,this._lightConfig=null,this._climateConfig=null,this._mediaConfig=null,this._vacuumConfig=null,this._roomPopupConfig=null}setConfig(t){if(!t.name)throw new Error("Please define a name for the room card");this._config={show_climate:!0,show_media:!0,show_vacuum:!0,...t},this._rebuildSubConfigs()}_rebuildSubConfigs(){const t=this._config;this._lightConfig={type:"custom:ha-lumina-light-card",entities:t.light_entities||[],image:t.image,scenes:t.light_scenes},this._climateConfig={type:"custom:ha-lumina-climate-card",entity:t.climate_entity||"",image:t.image,show_fan_speed:!0,show_humidity:!0},this._mediaConfig={type:"custom:ha-lumina-media-card",entity:t.media_entity||"",image:t.image,show_source:!0,show_progress:!0},this._vacuumConfig={type:"custom:ha-lumina-vacuum-card",entity:t.vacuum_entity||"",image:t.image,show_fan_speed:!0},this._roomPopupConfig={type:"custom:ha-lumina-room-popup",name:t.name,image:t.image,temperature_entity:t.temperature_entity,light_entities:t.light_entities,climate_entity:t.climate_entity,media_entity:t.media_entity,vacuum_entity:t.vacuum_entity}}getCardSize(){return 4}static getConfigElement(){return document.createElement("ha-lumina-room-card-editor")}static getStubConfig(){return{type:"custom:ha-lumina-room-card",name:"Living Room",image:"",light_entities:[],show_climate:!0,show_media:!0,show_vacuum:!0}}shouldUpdate(t){if(t.has("_config")||t.has("_activeSheet"))return!0;if(!t.has("hass")||!this._config)return!1;const e=t.get("hass");if(!e)return!0;return[this._config.temperature_entity,this._config.humidity_entity,...this._lightEntityIds,this._config.climate_entity,this._config.media_entity,this._config.vacuum_entity].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}get _lightEntityIds(){return(this._config.light_entities||[]).map(t=>"string"==typeof t?t:t.entity)}get _lightsOn(){return n(this.hass,this._lightEntityIds)}get _lightsTotal(){return this._lightEntityIds.length}get _lightsPercent(){return t=this.hass,(e=this._lightEntityIds).length?Math.round(n(t,e)/e.length*100):0;var t,e}get _climateEntity(){return t(this.hass,this._config.climate_entity)}get _climateActive(){const t=this._climateEntity;return!!t&&"off"!==t.state&&e(t)}get _mediaEntity(){return t(this.hass,this._config.media_entity)}get _mediaActive(){const t=this._mediaEntity;return!!t&&("playing"===t.state||"paused"===t.state)}get _vacuumEntity(){return t(this.hass,this._config.vacuum_entity)}get _vacuumActive(){return"cleaning"===this._vacuumEntity?.state}get _batteryPercent(){const t=this._vacuumEntity;return t&&t.attributes.battery_level||0}get _activeDeviceCount(){let t=0;return t+=this._lightsOn,this._climateActive&&t++,this._mediaActive&&t++,this._vacuumActive&&t++,t}get _temperatureValue(){const i=t(this.hass,this._config.temperature_entity);if(!i||!e(i))return null;const a=parseFloat(i.state);if(isNaN(a))return null;const n=i.attributes.unit_of_measurement||"°";return`${Math.round(a)}${n}`}get _humidityValue(){const i=t(this.hass,this._config.humidity_entity);if(!i||!e(i))return null;const a=parseFloat(i.state);return isNaN(a)?null:`${Math.round(a)}%`}get _climateMode(){return this._climateEntity?.state||"off"}get _climateRingColor(){return Dt[this._climateMode]||"var(--lumina-primary)"}_renderActionRing(t,e){const{dashArray:i,dashOffset:a}=At(26,t,0,100,360),{dashArray:n}=At(26,100,0,100,360),s=30;return et`
      <svg class="action-ring-svg" width="${60}" height="${60}" viewBox="0 0 ${60} ${60}">
        <circle class="track" cx="${s}" cy="${s}" r="${26}"
          stroke="${e}" stroke-width="${2}"
          stroke-dasharray="${n}" stroke-dashoffset="0" />
        <circle class="value-arc" cx="${s}" cy="${s}" r="${26}"
          stroke="${e}" stroke-width="${2}"
          stroke-dasharray="${i}" stroke-dashoffset="${a}"
          stroke-linecap="round"
          transform="rotate(-90 ${s} ${s})" />
      </svg>
    `}_openSheet(t){this._activeSheet=t}_closeSheet(){this._activeSheet=null}render(){if(!this._config||!this.hass)return at;const t=this._lightsOn>0,e=this._climateActive,i=this._mediaActive,a=this._vacuumActive;return tt`
      <ha-card>
        <div class="room-card">
          <!-- 3D Background Element -->
          ${Ot(this._config.image)?tt`
                <div class="room-bg">
                  <img src="${Ot(this._config.image)}" alt="" loading="lazy" />
                </div>
              `:at}

          <!-- Header: Room Name + Device Count + Sensors -->
          <div class="room-header">
            <span class="room-name">${this._config.name}</span>
            ${this._temperatureValue||this._humidityValue?tt`
              <div class="room-sensors">
                ${this._temperatureValue?tt`
                  <span class="sensor-item">
                    <ha-icon icon="mdi:thermometer"></ha-icon>${this._temperatureValue}
                  </span>
                `:at}
                ${this._humidityValue?tt`
                  <span class="sensor-item">
                    <ha-icon icon="mdi:water-percent"></ha-icon>${this._humidityValue}
                  </span>
                `:at}
              </div>
            `:at}
            <span class="device-count">${this._activeDeviceCount} device${1!==this._activeDeviceCount?"s":""} active</span>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <!-- Lights -->
            <div
              class="action-btn ${t?"lights-active":""} ${this._lightsTotal?"":"hidden"}"
              @click=${()=>this._openSheet("lights")}
            >
              <div class="action-ring-wrapper">
                <div class="action-icon-circle">
                  <ha-icon icon="mdi:lightbulb"></ha-icon>
                </div>
                ${t?this._renderActionRing(this._lightsPercent,"var(--lumina-secondary)"):at}
              </div>
              <span class="action-label">${this._config.lights_label||"Lights"}</span>
            </div>

            <!-- Climate -->
            <div
              class="action-btn ${e?`climate-active climate-${this._climateMode}`:""} ${this._config.show_climate&&this._config.climate_entity?"":"hidden"}"
              @click=${()=>this._openSheet("climate")}
            >
              <div class="action-ring-wrapper">
                <div class="action-icon-circle">
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                </div>
                ${e?this._renderActionRing(50,this._climateRingColor):at}
              </div>
              <span class="action-label">${this._config.climate_label||"Climate"}</span>
            </div>

            <!-- Media (no ring — just shows active glow when playing) -->
            <div
              class="action-btn ${i?"media-active":""} ${this._config.show_media&&this._config.media_entity?"":"hidden"}"
              @click=${()=>this._openSheet("media")}
            >
              <div class="action-ring-wrapper">
                <div class="action-icon-circle">
                  <ha-icon icon="mdi:play-circle"></ha-icon>
                </div>
              </div>
              <span class="action-label">${this._config.media_label||"Media"}</span>
            </div>

            <!-- Clean -->
            <div
              class="action-btn ${a?"vacuum-active":""} ${this._config.show_vacuum&&this._config.vacuum_entity?"":"hidden"}"
              @click=${()=>this._openSheet("vacuum")}
            >
              <div class="action-ring-wrapper">
                <div class="action-icon-circle">
                  <ha-icon icon="mdi:robot-vacuum"></ha-icon>
                </div>
                ${a?this._renderActionRing(this._batteryPercent,"var(--lumina-tertiary)"):at}
              </div>
              <span class="action-label">${this._config.vacuum_label||"Clean"}</span>
            </div>
          </div>
        </div>

        <!-- Bottom Sheets -->
        <lumina-bottom-sheet
          .open=${"lights"===this._activeSheet}
          title="Lights"
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-light-card
            .hass=${this.hass}
            .config=${this._lightConfig}
          ></ha-lumina-light-card>
        </lumina-bottom-sheet>

        <lumina-bottom-sheet
          .open=${"climate"===this._activeSheet}
          title="Climate"
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-climate-card
            .hass=${this.hass}
            .config=${this._climateConfig}
          ></ha-lumina-climate-card>
        </lumina-bottom-sheet>

        <lumina-bottom-sheet
          .open=${"media"===this._activeSheet}
          title="Media"
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-media-card
            .hass=${this.hass}
            .config=${this._mediaConfig}
          ></ha-lumina-media-card>
        </lumina-bottom-sheet>

        <lumina-bottom-sheet
          .open=${"vacuum"===this._activeSheet}
          title="Cleaning"
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-vacuum-card
            .hass=${this.hass}
            .config=${this._vacuumConfig}
          ></ha-lumina-vacuum-card>
        </lumina-bottom-sheet>

        <lumina-bottom-sheet
          .open=${"room"===this._activeSheet}
          title=${this._config.name}
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-room-popup
            .hass=${this.hass}
            .config=${this._roomPopupConfig}
          ></ha-lumina-room-popup>
        </lumina-bottom-sheet>
      </ha-card>
    `}};Rt.styles=[St,Tt,jt],d([kt({attribute:!1})],Rt.prototype,"hass",void 0),d([Ct()],Rt.prototype,"_config",void 0),d([Ct()],Rt.prototype,"_activeSheet",void 0),Rt=d([xt("ha-lumina-room-card")],Rt);const Bt=v`
  :host {
    display: block;
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
  }

  .room-popup {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-6);
  }

  /* ─── Section ───────────────────────────────────── */
  .section {
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    padding: var(--lumina-space-4);
    position: relative;
  }

  .section::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--lumina-radius-lg);
    border: 1px solid var(--lumina-ghost-border);
    pointer-events: none;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--lumina-space-4);
  }

  .section-title-row {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
  }

  .section-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--lumina-on-surface-variant);
  }

  .section-icon ha-icon {
    --mdc-icon-size: 20px;
  }

  .section-title {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .section-action {
    font-size: 0.75rem;
    color: var(--lumina-primary);
    cursor: pointer;
    font-weight: 500;
    padding: var(--lumina-space-1) var(--lumina-space-2);
    border-radius: var(--lumina-radius-sm);
    transition: background var(--lumina-transition-fast);
  }

  .section-action:hover {
    background: rgba(133, 173, 255, 0.1);
  }

  /* ─── Lights Section ────────────────────────────── */
  .lights-summary {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-4);
    margin-bottom: var(--lumina-space-4);
  }

  .lights-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .lights-count {
    font-family: var(--lumina-font-headline);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
  }

  .lights-subtitle {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
  }

  .light-list {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }

  .light-item {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: var(--lumina-space-2) 0;
  }

  .light-name {
    flex: 1;
    font-size: 0.8125rem;
    color: var(--lumina-on-surface);
  }

  .light-state {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
  }

  .light-state.on {
    color: var(--lumina-secondary);
  }

  /* ─── Climate Section ───────────────────────────── */
  .climate-row {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-4);
  }

  .climate-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }

  .climate-temp {
    font-family: var(--lumina-font-headline);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
  }

  .climate-mode {
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
  }

  .climate-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
    margin-top: var(--lumina-space-3);
  }

  .climate-fan {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
    margin-top: var(--lumina-space-3);
    padding-top: var(--lumina-space-3);
    border-top: 1px solid var(--lumina-ghost-border);
  }

  .climate-fan-label {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-2);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--lumina-on-surface-variant);
  }

  .climate-fan-label ha-icon {
    --mdc-icon-size: 16px;
  }

  .climate-fan .climate-chips {
    margin-top: 0;
  }

  /* ─── Media Section ─────────────────────────────── */
  .media-row {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-4);
  }

  .media-art {
    width: 48px;
    height: 48px;
    border-radius: var(--lumina-radius-sm);
    object-fit: cover;
    background: var(--lumina-surface-container-highest);
    flex-shrink: 0;
  }

  .media-art-placeholder {
    width: 48px;
    height: 48px;
    border-radius: var(--lumina-radius-sm);
    background: var(--lumina-surface-container-highest);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--lumina-outline);
    flex-shrink: 0;
  }

  .media-art-placeholder ha-icon {
    --mdc-icon-size: 24px;
  }

  .media-info {
    flex: 1;
    min-width: 0;
  }

  .media-title {
    font-family: var(--lumina-font-headline);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .media-artist {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .media-controls {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-2);
    flex-shrink: 0;
  }

  .media-idle {
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
    padding: var(--lumina-space-2) 0;
  }

  /* ─── Vacuum Section ────────────────────────────── */
  .vacuum-row {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-4);
  }

  .vacuum-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .vacuum-state {
    font-family: var(--lumina-font-headline);
    font-size: 1rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .vacuum-battery {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
  }

  .vacuum-actions {
    display: flex;
    gap: var(--lumina-space-2);
    margin-top: var(--lumina-space-3);
  }
`;function Ut(t,e=!1){const i=Ot(t);return i?tt`
    <div class="lumina-3d-bg ${e?"popup":""}">
      <img src="${i}" alt="" loading="lazy" />
    </div>
  `:at}let Ht=class extends bt{setConfig(t){this.config={sections:["lights","climate","media","vacuum"],...t}}getCardSize(){return 6}_renderLightsSection(){const e=this.config.light_entities||[];if(!e.length)return at;const a=e.map(t=>"string"==typeof t?t:t.entity),o=n(this.hass,a),r=s(this.hass,a);return tt`
      <div class="section">
        <div class="section-header">
          <div class="section-title-row">
            <span class="section-icon"><ha-icon icon="mdi:lightbulb-outline"></ha-icon></span>
            <span class="section-title">Lighting</span>
          </div>
          <span class="section-action">Details →</span>
        </div>

        <div class="lights-summary">
          <lumina-ring
            .value=${a.length?Math.round(o/a.length*100):0}
            .size=${56}
            .strokeWidth=${3}
            color="var(--lumina-secondary)"
            ?inactive=${0===o}
          >
          </lumina-ring>
          <div class="lights-text">
            <span class="lights-count">${o}/${a.length}</span>
            <span class="lights-subtitle">${o>0?`Avg ${r}% brightness`:"All lights off"}</span>
          </div>
        </div>

        <div class="light-list">
          ${a.map(e=>{const a=t(this.hass,e);if(!a)return at;const n="on"===a.state,s=n?Math.round((a.attributes.brightness||0)/255*100):0;return tt`
              <div class="light-item">
                <lumina-ring
                  .value=${s}
                  .size=${24}
                  .strokeWidth=${2}
                  color="var(--lumina-secondary)"
                  ?inactive=${!n}
                ></lumina-ring>
                <span class="light-name">${i(a)}</span>
                <span class="light-state ${n?"on":""}">${n?`${s}%`:"Off"}</span>
              </div>
            `})}
        </div>
      </div>
    `}_renderClimateSection(){if(!this.config.climate_entity)return at;const i=t(this.hass,this.config.climate_entity);if(!i||!e(i))return at;const n=i.attributes.current_temperature,s=i.attributes.temperature,r=i.state,l=i.attributes.min_temp||16,c=i.attributes.max_temp||32,d=n?Math.round((n-l)/(c-l)*100):0,h="off"!==r,u=i.attributes.hvac_modes||[],p=i.attributes.fan_modes||[],m=i.attributes.fan_mode||"",g=r.charAt(0).toUpperCase()+r.slice(1).replaceAll("_"," ");return tt`
      <div class="section">
        <div class="section-header">
          <div class="section-title-row">
            <span class="section-icon"><ha-icon icon="mdi:thermostat"></ha-icon></span>
            <span class="section-title">Climate</span>
          </div>
          <span class="section-action">Details →</span>
        </div>

        <div class="climate-row">
          <lumina-ring
            .value=${d}
            .size=${72}
            .strokeWidth=${3}
            color="var(--lumina-primary)"
            ?inactive=${!h}
          >
          </lumina-ring>

          <div class="climate-info">
            <span class="climate-temp">
              ${n?o(n):"--°"}
            </span>
            <span class="climate-mode">
              ${h?`${g}${s?` · Target ${Math.round(s)}°`:""}`:"Off"}
            </span>
          </div>
        </div>

        <div class="climate-chips">
          ${u.map(t=>tt`
            <lumina-chip
              .label=${t.charAt(0).toUpperCase()+t.slice(1).replaceAll("_"," ")}
              ?active=${r===t}
              size="sm"
              @click=${()=>a(this.hass,"climate","set_hvac_mode",{entity_id:this.config.climate_entity,hvac_mode:t})}
            ></lumina-chip>
          `)}
        </div>

        ${p.length?tt`
          <div class="climate-fan">
            <span class="climate-fan-label"><ha-icon icon="mdi:fan"></ha-icon> Fan</span>
            <div class="climate-chips">
              ${p.map(t=>tt`
                <lumina-chip
                  .label=${t.charAt(0).toUpperCase()+t.slice(1)}
                  ?active=${m===t}
                  size="sm"
                  @click=${()=>a(this.hass,"climate","set_fan_mode",{entity_id:this.config.climate_entity,fan_mode:t})}
                ></lumina-chip>
              `)}
            </div>
          </div>
        `:at}
      </div>
    `}_renderMediaSection(){if(!this.config.media_entity)return at;const i=t(this.hass,this.config.media_entity);if(!i||!e(i))return at;const n="playing"===i.state,s="paused"===i.state,o=n||s,l=i.attributes.media_title,c=i.attributes.media_artist,d=i.attributes.entity_picture;r(i);const h=d?d.startsWith("/")?`${location.origin}${d}`:d:null;return tt`
      <div class="section">
        <div class="section-header">
          <div class="section-title-row">
            <span class="section-icon"><ha-icon icon="mdi:speaker"></ha-icon></span>
            <span class="section-title">Media</span>
          </div>
          <span class="section-action">Details →</span>
        </div>

        ${o?tt`
              <div class="media-row">
                ${h?tt`<img class="media-art" src=${h} alt="Album art" />`:tt`<div class="media-art-placeholder"><ha-icon icon="mdi:music"></ha-icon></div>`}
                <div class="media-info">
                  <div class="media-title">${l||"Unknown"}</div>
                  <div class="media-artist">${c||""}</div>
                </div>
                <div class="media-controls">
                  <lumina-icon-button
                    icon="mdi:skip-previous"
                    size="sm"
                    @click=${()=>a(this.hass,"media_player","media_previous_track",{entity_id:this.config.media_entity})}
                  ></lumina-icon-button>
                  <lumina-icon-button
                    icon=${n?"mdi:pause":"mdi:play"}
                    size="sm"
                    variant="filled"
                    @click=${()=>a(this.hass,"media_player","media_play_pause",{entity_id:this.config.media_entity})}
                  ></lumina-icon-button>
                  <lumina-icon-button
                    icon="mdi:skip-next"
                    size="sm"
                    @click=${()=>a(this.hass,"media_player","media_next_track",{entity_id:this.config.media_entity})}
                  ></lumina-icon-button>
                </div>
              </div>
            `:tt`<div class="media-idle">No media playing</div>`}
      </div>
    `}_renderVacuumSection(){if(!this.config.vacuum_entity)return at;const i=t(this.hass,this.config.vacuum_entity);if(!i||!e(i))return at;const n=i.state,s=i.attributes.battery_level||0,o=n.charAt(0).toUpperCase()+n.slice(1).replaceAll("_"," "),r="cleaning"===n;return tt`
      <div class="section">
        <div class="section-header">
          <div class="section-title-row">
            <span class="section-icon"><ha-icon icon="mdi:robot-vacuum"></ha-icon></span>
            <span class="section-title">Cleaning</span>
          </div>
          <span class="section-action">Details →</span>
        </div>

        <div class="vacuum-row">
          <lumina-ring
            .value=${s}
            .size=${56}
            .strokeWidth=${3}
            color=${s>20?"var(--lumina-tertiary)":"var(--lumina-error)"}
            ?inactive=${!r}
          >
          </lumina-ring>
          <div class="vacuum-info">
            <span class="vacuum-state">${o}</span>
            <span class="vacuum-battery">Battery ${s}%</span>
          </div>
        </div>

        <div class="vacuum-actions">
          <lumina-chip
            icon="mdi:play"
            label="Start"
            ?active=${r}
            variant="tertiary"
            @click=${()=>a(this.hass,"vacuum","start",{entity_id:this.config.vacuum_entity})}
          ></lumina-chip>
          <lumina-chip
            icon="mdi:pause"
            label="Pause"
            @click=${()=>a(this.hass,"vacuum","pause",{entity_id:this.config.vacuum_entity})}
          ></lumina-chip>
          <lumina-chip
            icon="mdi:home"
            label="Dock"
            @click=${()=>a(this.hass,"vacuum","return_to_base",{entity_id:this.config.vacuum_entity})}
          ></lumina-chip>
        </div>
      </div>
    `}render(){if(!this.config||!this.hass)return at;const t=this.config.sections||["lights","climate","media","vacuum"];return tt`
      <div class="room-popup" style="position:relative;">
        ${Ut(this.config.image,!0)}
        <div class="lumina-3d-content">
        ${t.map(t=>{switch(t){case"lights":return this._renderLightsSection();case"climate":return this._renderClimateSection();case"media":return this._renderMediaSection();case"vacuum":return this._renderVacuumSection();default:return at}})}
        </div>
      </div>
    `}};Ht.styles=[St,Tt,Bt],d([kt({attribute:!1})],Ht.prototype,"hass",void 0),d([kt({attribute:!1})],Ht.prototype,"config",void 0),Ht=d([xt("ha-lumina-room-popup")],Ht);let Vt=!1,Gt=null;async function Wt(){if(!Vt)return Gt||(Gt=(async()=>{try{const t=await(window.loadCardHelpers?.());if(t){const e=await t.createCardElement({type:"entities",entities:[]});e&&await(e.constructor?.getConfigElement?.())}Vt=!0}catch{throw Gt=null,new Error("Failed to load HA editor elements")}})(),Gt)}function Ft(t,e){t.dispatchEvent(new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:e}}))}let Yt=class extends bt{constructor(){super(...arguments),this._haLoaded=!1,this._openSections={}}setConfig(t){this._config={...t}}async connectedCallback(){super.connectedCallback(),await Wt(),this._haLoaded=!0}_dispatch(){Ft(this,this._config)}_toggleSection(t){this._openSections={...this._openSections,[t]:!this._openSections[t]}}_set(t,e){this._config={...this._config,[t]:e},this._dispatch()}_selectAsset(t){this._set("image",this._config.image===t?"":t)}_toLightObj(t){return"string"==typeof t?{entity:t}:{...t}}_getLightId(t){return"string"==typeof t?t:t.entity}_getLightName(t){return"string"==typeof t?"":t.name||""}_getLightIcon(t){return"string"==typeof t?"":t.icon||""}_lightChanged(t,e){const i=[...this._config.light_entities||[]],a=this._toLightObj(i[t]);a.entity=e,i[t]=a,this._set("light_entities",i)}_lightNameChanged(t,e){const i=[...this._config.light_entities||[]],a=this._toLightObj(i[t]);a.name=e||void 0,i[t]=a,this._set("light_entities",i)}_lightIconChanged(t,e){const i=[...this._config.light_entities||[]],a=this._toLightObj(i[t]);a.icon=e||void 0,i[t]=a,this._set("light_entities",i)}_addLight(){this._set("light_entities",[...this._config.light_entities||[],{entity:""}])}_removeLight(t){const e=[...this._config.light_entities||[]];e.splice(t,1),this._set("light_entities",e)}_addScene(){this._set("light_scenes",[...this._config.light_scenes||[],{name:"",icon:"mdi:palette",entity_id:""}])}_removeScene(t){const e=[...this._config.light_scenes||[]];e.splice(t,1),this._set("light_scenes",e)}_sceneChanged(t,e,i){const a=[...this._config.light_scenes||[]];a[t]={...a[t],[e]:i},this._set("light_scenes",a)}render(){if(!this._config||!this.hass)return tt``;if(!this._haLoaded)return tt`<div class="loading">Loading editor...</div>`;const t=this._config.image||"",e=t.startsWith("http")||t.startsWith("/");return tt`
      <div class="editor">
        <!-- ─── Room Name ──────────────────────────── -->
        <div class="editor-section">Room Info</div>
        <div class="editor-row">
          <ha-textfield
            label="Room Name"
            .value=${this._config.name||""}
            @input=${t=>this._set("name",t.target.value)}
          ></ha-textfield>
        </div>

        <!-- ─── 3D Asset List with Preview ─────────── -->
        <div class="editor-section">3D Room Element</div>
        <div class="editor-sublabel">Select a built-in 3D asset or enter a custom image URL</div>

        <div class="asset-list">
          ${Nt.map(e=>{const i=t===e.key;return tt`
              <div class="asset-item ${i?"selected":""}" @click=${()=>this._selectAsset(e.key)}>
                <div class="asset-preview">
                  <img src="${e.url}" alt="${e.label}" loading="lazy" />
                </div>
                <div class="asset-info">
                  <span class="asset-name">${e.label}</span>
                  <span class="asset-category">${e.category}</span>
                </div>
                ${i?tt`<ha-icon class="asset-check" icon="mdi:check-circle"></ha-icon>`:""}
              </div>
            `})}
        </div>

        <div class="editor-row">
          <ha-textfield
            label="Or custom image URL"
            .value=${e?t:""}
            @input=${t=>this._set("image",t.target.value)}
          ></ha-textfield>
          <span class="custom-url-note">Supports: /local/image.png or full URLs</span>
        </div>

        <!-- ─── Custom Button Labels ───────────────── -->
        <div class="editor-section">Button Labels</div>
        <div class="editor-sublabel">Custom names for the action buttons (leave empty for defaults)</div>
        <div class="label-row">
          <ha-textfield label="Lights" .value=${this._config.lights_label||""}
            @input=${t=>this._set("lights_label",t.target.value)}></ha-textfield>
          <ha-textfield label="Climate" .value=${this._config.climate_label||""}
            @input=${t=>this._set("climate_label",t.target.value)}></ha-textfield>
        </div>
        <div class="label-row">
          <ha-textfield label="Media" .value=${this._config.media_label||""}
            @input=${t=>this._set("media_label",t.target.value)}></ha-textfield>
          <ha-textfield label="Clean" .value=${this._config.vacuum_label||""}
            @input=${t=>this._set("vacuum_label",t.target.value)}></ha-textfield>
        </div>

        <!-- ─── Sensors ───────────────────────────── -->
        <div class="editor-section">Sensors</div>
        <div class="editor-row">
          <ha-entity-picker .hass=${this.hass} label="Temperature Entity"
            .value=${this._config.temperature_entity||""} .includeDomains=${["sensor"]}
            @value-changed=${t=>this._set("temperature_entity",t.detail.value)}
            allow-custom-entity></ha-entity-picker>
        </div>
        <div class="editor-row">
          <ha-entity-picker .hass=${this.hass} label="Humidity Entity"
            .value=${this._config.humidity_entity||""} .includeDomains=${["sensor"]}
            @value-changed=${t=>this._set("humidity_entity",t.detail.value)}
            allow-custom-entity></ha-entity-picker>
        </div>

        <!-- ─── Lights (Collapsible) ─────────────────── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${()=>this._toggleSection("lights")}>
            <div class="section-header-left">
              <ha-icon icon="mdi:lightbulb-group"></ha-icon>
              <span class="section-title">Lights</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections.lights?"open":""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections.lights?"open":""}">
            ${(this._config.light_entities||[]).map((t,e)=>tt`
              <div class="entity-block">
                <div class="entity-row">
                  <ha-entity-picker .hass=${this.hass} label="Light ${e+1}" .value=${this._getLightId(t)}
                    .includeDomains=${["light"]}
                    @value-changed=${t=>this._lightChanged(e,t.detail.value)}
                    allow-custom-entity></ha-entity-picker>
                  <ha-icon class="remove-btn" icon="mdi:close" @click=${()=>this._removeLight(e)}></ha-icon>
                </div>
                <div class="entity-extras">
                  <ha-textfield label="Custom Name" .value=${this._getLightName(t)}
                    @input=${t=>this._lightNameChanged(e,t.target.value)}></ha-textfield>
                  <ha-textfield label="Icon (e.g. mdi:desk-lamp)" .value=${this._getLightIcon(t)}
                    @input=${t=>this._lightIconChanged(e,t.target.value)}></ha-textfield>
                </div>
              </div>
            `)}
            <div class="add-btn" @click=${this._addLight}>+ Add Light Entity</div>

            <!-- Light Scenes -->
            <div class="editor-section" style="margin-top: 12px;">Light Scenes</div>
            ${(this._config.light_scenes||[]).map((t,e)=>tt`
              <div class="scene-row">
                <ha-textfield label="Name" .value=${t.name}
                  @input=${t=>this._sceneChanged(e,"name",t.target.value)}></ha-textfield>
                <ha-entity-picker .hass=${this.hass} label="Scene" .value=${t.entity_id}
                  .includeDomains=${["scene"]}
                  @value-changed=${t=>this._sceneChanged(e,"entity_id",t.detail.value)}
                  allow-custom-entity></ha-entity-picker>
                <ha-icon class="remove-btn" icon="mdi:close" @click=${()=>this._removeScene(e)}></ha-icon>
              </div>
            `)}
            <div class="add-btn" @click=${this._addScene}>+ Add Scene</div>
          </div>
        </div>

        <!-- ─── Climate (Collapsible) ────────────────── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${()=>this._toggleSection("climate")}>
            <div class="section-header-left">
              <ha-icon icon="mdi:thermometer"></ha-icon>
              <span class="section-title">Climate</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections.climate?"open":""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections.climate?"open":""}">
            <div class="toggle-row">
              <span class="editor-label">Show Climate</span>
              <ha-switch .checked=${!1!==this._config.show_climate}
                @change=${t=>this._set("show_climate",t.target.checked)}>
              </ha-switch>
            </div>
            ${!1!==this._config.show_climate?tt`
              <div class="editor-row">
                <ha-entity-picker .hass=${this.hass} label="Climate Entity"
                  .value=${this._config.climate_entity||""} .includeDomains=${["climate"]}
                  @value-changed=${t=>this._set("climate_entity",t.detail.value)}
                  allow-custom-entity></ha-entity-picker>
              </div>
            `:""}
          </div>
        </div>

        <!-- ─── Media (Collapsible) ──────────────────── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${()=>this._toggleSection("media")}>
            <div class="section-header-left">
              <ha-icon icon="mdi:play-circle"></ha-icon>
              <span class="section-title">Media</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections.media?"open":""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections.media?"open":""}">
            <div class="toggle-row">
              <span class="editor-label">Show Media</span>
              <ha-switch .checked=${!1!==this._config.show_media}
                @change=${t=>this._set("show_media",t.target.checked)}>
              </ha-switch>
            </div>
            ${!1!==this._config.show_media?tt`
              <div class="editor-row">
                <ha-entity-picker .hass=${this.hass} label="Media Player"
                  .value=${this._config.media_entity||""} .includeDomains=${["media_player"]}
                  @value-changed=${t=>this._set("media_entity",t.detail.value)}
                  allow-custom-entity></ha-entity-picker>
              </div>
            `:""}
          </div>
        </div>

        <!-- ─── Cleaning (Collapsible) ───────────────── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${()=>this._toggleSection("cleaning")}>
            <div class="section-header-left">
              <ha-icon icon="mdi:robot-vacuum"></ha-icon>
              <span class="section-title">Cleaning</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections.cleaning?"open":""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections.cleaning?"open":""}">
            <div class="toggle-row">
              <span class="editor-label">Show Vacuum</span>
              <ha-switch .checked=${!1!==this._config.show_vacuum}
                @change=${t=>this._set("show_vacuum",t.target.checked)}>
              </ha-switch>
            </div>
            ${!1!==this._config.show_vacuum?tt`
              <div class="editor-row">
                <ha-entity-picker .hass=${this.hass} label="Vacuum"
                  .value=${this._config.vacuum_entity||""} .includeDomains=${["vacuum"]}
                  @value-changed=${t=>this._set("vacuum_entity",t.detail.value)}
                  allow-custom-entity></ha-entity-picker>
              </div>
            `:""}
          </div>
        </div>
      </div>
    `}};Yt.styles=v`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-row { display: flex; flex-direction: column; gap: 4px; }
    .editor-label { font-size: 0.875rem; font-weight: 500; color: var(--primary-text-color); }
    .editor-sublabel { font-size: 0.75rem; color: var(--secondary-text-color); margin-bottom: 4px; }
    .editor-section {
      font-size: 1rem; font-weight: 600; color: var(--primary-text-color);
      margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color);
    }

    /* ─── Collapsible Sections ──────────────────────── */
    .section-collapsible {
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      overflow: hidden;
      margin-top: 8px;
    }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      cursor: pointer;
      user-select: none;
      background: var(--card-background-color, #1a1a1d);
      transition: background 0.2s;
    }
    .section-header:hover {
      background: var(--secondary-background-color, #222);
    }
    .section-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-header-left ha-icon {
      --mdc-icon-size: 20px;
      color: var(--primary-color);
    }
    .section-title {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .section-chevron {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
      transition: transform 0.25s ease;
    }
    .section-chevron.open {
      transform: rotate(180deg);
    }
    .section-body {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
      padding: 0 14px;
    }
    .section-body.open {
      max-height: 2000px;
      padding: 12px 14px 16px;
    }

    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .entity-row { display: flex; gap: 8px; align-items: center; }
    .entity-row ha-entity-picker { flex: 1; }
    .entity-block { background: var(--card-background-color, #1a1a1d); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
    .entity-extras { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .add-btn {
      cursor: pointer; color: var(--primary-color); font-size: 0.875rem;
      font-weight: 500; padding: 8px; display: flex; align-items: center; gap: 4px;
    }
    .remove-btn { cursor: pointer; color: var(--error-color, #db4437); --mdc-icon-size: 20px; }

    /* ─── 3D Asset List with Preview ──────────────── */
    .asset-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 8px;
      max-height: 280px;
      overflow-y: auto;
    }
    .asset-list::-webkit-scrollbar { width: 4px; }
    .asset-list::-webkit-scrollbar-track { background: transparent; }
    .asset-list::-webkit-scrollbar-thumb { background: var(--divider-color); border-radius: 9999px; }

    .asset-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 12px;
      border-radius: 10px;
      background: var(--card-background-color, #1a1a1d);
      border: 2px solid transparent;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }
    .asset-item:hover {
      border-color: rgba(133, 173, 255, 0.2);
      background: var(--secondary-background-color, #222);
    }
    .asset-item.selected {
      border-color: #85adff;
      background: rgba(133, 173, 255, 0.08);
    }
    .asset-preview {
      width: 56px;
      height: 56px;
      border-radius: 8px;
      background: #111;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .asset-preview img {
      width: 48px;
      height: 48px;
      object-fit: contain;
      filter: drop-shadow(0 0 6px rgba(0,0,0,0.4));
    }
    .asset-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    }
    .asset-name {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .asset-category {
      font-size: 0.6875rem;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .asset-check {
      color: #85adff;
      --mdc-icon-size: 20px;
      flex-shrink: 0;
    }

    .custom-url-note { font-size: 0.75rem; color: var(--secondary-text-color); margin-top: 4px; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
    .scene-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    .scene-row ha-textfield, .scene-row ha-entity-picker { flex: 1; }

    /* ─── Label Inputs Row ────────────────────────── */
    .label-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
  `,d([kt({attribute:!1})],Yt.prototype,"hass",void 0),d([Ct()],Yt.prototype,"_config",void 0),d([Ct()],Yt.prototype,"_haLoaded",void 0),d([Ct()],Yt.prototype,"_openSections",void 0),Yt=d([xt("ha-lumina-room-card-editor")],Yt);let Xt=class extends bt{constructor(){super(...arguments),this._haLoaded=!1}setConfig(t){this._config={...t}}async connectedCallback(){super.connectedCallback(),await Wt(),this._haLoaded=!0}_dispatch(){Ft(this,this._config)}_set(t,e){this._config={...this._config,[t]:e},this._dispatch()}_lightChanged(t,e){const i=[...this._config.light_entities||[]];i[t]=e,this._set("light_entities",i)}_addLight(){this._set("light_entities",[...this._config.light_entities||[],""])}_removeLight(t){const e=[...this._config.light_entities||[]];e.splice(t,1),this._set("light_entities",e)}render(){return this._config&&this.hass?this._haLoaded?tt`
      <div class="editor">
        <div class="editor-section">Room Info</div>
        <ha-textfield label="Room Name" .value=${this._config.name||""}
          @input=${t=>this._set("name",t.target.value)}></ha-textfield>

        <div class="editor-section">Temperature</div>
        <ha-entity-picker .hass=${this.hass} label="Temperature Sensor"
          .value=${this._config.temperature_entity||""} .includeDomains=${["sensor"]}
          @value-changed=${t=>this._set("temperature_entity",t.detail.value)}
          allow-custom-entity></ha-entity-picker>

        <div class="editor-section">Lights</div>
        ${(this._config.light_entities||[]).map((t,e)=>tt`
          <div class="entity-row">
            <ha-entity-picker .hass=${this.hass} label="Light ${e+1}" .value=${t}
              .includeDomains=${["light"]}
              @value-changed=${t=>this._lightChanged(e,t.detail.value)}
              allow-custom-entity></ha-entity-picker>
            <ha-icon class="remove-btn" icon="mdi:close" @click=${()=>this._removeLight(e)}></ha-icon>
          </div>
        `)}
        <div class="add-btn" @click=${this._addLight}>+ Add Light</div>

        <div class="editor-section">Climate</div>
        <ha-entity-picker .hass=${this.hass} label="Climate Entity"
          .value=${this._config.climate_entity||""} .includeDomains=${["climate"]}
          @value-changed=${t=>this._set("climate_entity",t.detail.value)}
          allow-custom-entity></ha-entity-picker>

        <div class="editor-section">Media</div>
        <ha-entity-picker .hass=${this.hass} label="Media Player"
          .value=${this._config.media_entity||""} .includeDomains=${["media_player"]}
          @value-changed=${t=>this._set("media_entity",t.detail.value)}
          allow-custom-entity></ha-entity-picker>

        <div class="editor-section">Vacuum</div>
        <ha-entity-picker .hass=${this.hass} label="Vacuum"
          .value=${this._config.vacuum_entity||""} .includeDomains=${["vacuum"]}
          @value-changed=${t=>this._set("vacuum_entity",t.detail.value)}
          allow-custom-entity></ha-entity-picker>
      </div>
    `:tt`<div class="loading">Loading editor...</div>`:tt``}};Xt.styles=v`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-section { font-size: 1rem; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color); }
    .entity-row { display: flex; gap: 8px; align-items: center; }
    .entity-row ha-entity-picker { flex: 1; }
    .remove-btn { cursor: pointer; color: var(--error-color, #db4437); --mdc-icon-size: 20px; }
    .add-btn { cursor: pointer; color: var(--primary-color); font-size: 0.875rem; font-weight: 500; padding: 8px; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
  `,d([kt({attribute:!1})],Xt.prototype,"hass",void 0),d([Ct()],Xt.prototype,"_config",void 0),d([Ct()],Xt.prototype,"_haLoaded",void 0),Xt=d([xt("ha-lumina-room-popup-editor")],Xt);const qt=v`
  :host {
    display: block;
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
  }

  .light-card {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-6);
  }

  /* ─── Hero Ring + All On/Off ────────────────────── */
  .hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-4);
    padding: var(--lumina-space-4) 0;
  }

  .hero-value {
    font-family: var(--lumina-font-headline);
    font-size: 2rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    line-height: 1;
  }

  .hero-label {
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--lumina-on-surface-variant);
    margin-top: 2px;
  }

  /* All On / All Off — directly under hero ring */
  .hero-actions {
    display: flex;
    gap: var(--lumina-space-3);
    margin-top: var(--lumina-space-1);
  }

  /* ─── Master Controls ───────────────────────────── */
  .master-controls {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-4);
  }

  .slider-row {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }

  .slider-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .slider-label-text {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
    display: flex;
    align-items: center;
    gap: var(--lumina-space-2);
  }

  .slider-label-text ha-icon {
    --mdc-icon-size: 18px;
  }

  .slider-value {
    font-family: var(--lumina-font-headline);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  /* ─── Individual Lights ─────────────────────────── */
  .lights-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }

  .lights-section-header {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
    margin-bottom: var(--lumina-space-1);
  }

  /* ─── Light Item ────────────────────────────────── */
  .light-item {
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    transition: background var(--lumina-transition-fast);
    overflow: hidden;
  }

  .light-item.on {
    background: rgba(254, 203, 0, 0.06);
  }

  .light-item-row {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: var(--lumina-space-2) var(--lumina-space-3);
  }

  /* ─── Circle Toggle ─────────────────────────────── */
  .light-circle {
    width: 32px;
    height: 32px;
    border-radius: var(--lumina-radius-full);
    border: 2px solid var(--lumina-outline-variant);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all var(--lumina-transition-normal);
    -webkit-tap-highlight-color: transparent;
    touch-action: none;
    position: relative;
    padding: 0;
  }

  .light-circle ha-icon {
    --mdc-icon-size: 14px;
    color: var(--lumina-outline);
    transition: color var(--lumina-transition-normal);
  }

  .light-circle.on {
    border-color: var(--lumina-secondary);
    background: rgba(254, 203, 0, 0.15);
    box-shadow: 0 0 10px rgba(254, 203, 0, 0.25);
  }

  .light-circle.on ha-icon {
    color: var(--lumina-secondary);
  }

  .light-circle:active {
    transform: scale(0.9);
  }

  .light-circle::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--lumina-radius-full);
    border: 1px solid transparent;
    transition: border-color 0.3s ease;
  }

  .light-circle.pressing::after {
    border-color: rgba(133, 173, 255, 0.4);
    animation: lp-pulse 0.6s ease-in-out;
  }

  @keyframes lp-pulse {
    0% { transform: scale(1); opacity: 0; }
    50% { transform: scale(1.15); opacity: 1; }
    100% { transform: scale(1.2); opacity: 0; }
  }

  /* ─── Light Info + Small Slider ─────────────────── */
  .light-item-info {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
  }

  .light-item-name {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--lumina-on-surface);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 60px;
    flex-shrink: 0;
  }

  .light-item-slider {
    flex: 1;
    min-width: 0;
  }

  /* Make the per-light slider smaller/thinner */
  .light-item-slider lumina-slider {
    --lumina-slider-height: 4px;
    --lumina-slider-thumb: 12px;
  }

  .light-item-pct {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--lumina-on-surface-variant);
    min-width: 28px;
    text-align: right;
    flex-shrink: 0;
  }

  .light-item-pct.on {
    color: var(--lumina-secondary);
  }

  /* ─── Toggle Switch (non-dimmable) ─────────────── */
  .light-item-switch {
    width: 36px;
    height: 20px;
    border-radius: 10px;
    border: none;
    background: var(--lumina-outline-variant);
    cursor: pointer;
    flex-shrink: 0;
    padding: 2px;
    transition: background var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
    position: relative;
    display: flex;
    align-items: center;
  }

  .light-item-switch .switch-thumb {
    width: 16px;
    height: 16px;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-surface);
    transition: transform var(--lumina-transition-fast);
    display: block;
  }

  .light-item-switch.on {
    background: var(--lumina-secondary);
  }

  .light-item-switch.on .switch-thumb {
    transform: translateX(16px);
  }

  /* ─── Expand Chevron Button ──────────────────────── */
  .light-expand-btn {
    width: 28px;
    height: 28px;
    border-radius: var(--lumina-radius-full);
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0;
    transition: transform var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
    color: var(--lumina-on-surface-variant);
  }

  .light-expand-btn ha-icon {
    --mdc-icon-size: 16px;
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .light-expand-btn.open ha-icon {
    transform: rotate(180deg);
  }

  .light-expand-btn:hover {
    background: var(--lumina-surface-container-highest);
  }

  /* ─── Light Groups ─────────────────────────────── */
  .light-group {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }

  .light-group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--lumina-space-2) var(--lumina-space-1);
    cursor: pointer;
    border: none;
    background: transparent;
    -webkit-tap-highlight-color: transparent;
  }

  .light-group-name {
    font-family: var(--lumina-font-headline);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--lumina-on-surface-variant);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .light-group-chevron {
    --mdc-icon-size: 18px;
    color: var(--lumina-on-surface-variant);
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .light-group-chevron.open {
    transform: rotate(180deg);
  }

  .light-group-items {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
    overflow: hidden;
    max-height: 1000px;
    opacity: 1;
    transition: max-height 300ms cubic-bezier(0.4, 0, 0.2, 1),
                opacity 200ms ease;
  }

  .light-group-items.collapsed {
    max-height: 0;
    opacity: 0;
  }

  /* ─── Inline Expand Panel ───────────────────────── */
  .light-expand {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 300ms cubic-bezier(0.4, 0, 0.2, 1),
                opacity 200ms ease,
                padding 200ms ease;
    padding: 0 var(--lumina-space-3);
  }

  .light-expand.open {
    max-height: 500px;
    opacity: 1;
    padding: 0 var(--lumina-space-3) var(--lumina-space-3);
  }

  .expand-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
    padding-top: var(--lumina-space-3);
    border-top: 1px solid var(--lumina-ghost-border);
  }

  .expand-label {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--lumina-on-surface-variant);
  }

  /* Color presets */
  .color-presets {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
  }

  .color-dot {
    width: 26px;
    height: 26px;
    border-radius: var(--lumina-radius-full);
    border: 2px solid transparent;
    cursor: pointer;
    transition: transform var(--lumina-transition-fast),
                border-color var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
  }

  .color-dot:hover { transform: scale(1.15); }

  .color-dot.selected {
    border-color: var(--lumina-on-surface);
    box-shadow: 0 0 8px rgba(254, 251, 254, 0.2);
  }

  /* Effects dropdown */
  .effect-select-wrapper {
    position: relative;
  }

  .effect-select {
    width: 100%;
    padding: var(--lumina-space-2) var(--lumina-space-3);
    padding-right: var(--lumina-space-8);
    background: var(--lumina-surface-container-highest);
    border: 1px solid var(--lumina-ghost-border);
    border-radius: var(--lumina-radius-sm);
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
    font-size: 0.8125rem;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    outline: none;
    transition: border-color var(--lumina-transition-fast);
  }

  .effect-select:focus {
    border-color: var(--lumina-primary);
  }

  .effect-select option {
    background: var(--lumina-surface-container-highest);
    color: var(--lumina-on-surface);
  }

  .effect-select-arrow {
    position: absolute;
    right: var(--lumina-space-3);
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--lumina-on-surface-variant);
  }

  .effect-select-arrow ha-icon {
    --mdc-icon-size: 18px;
  }

  /* Group members */
  .group-members {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-1);
  }

  .group-member {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-2);
    padding: var(--lumina-space-1) 0;
  }

  .group-member-dot {
    width: 6px;
    height: 6px;
    border-radius: var(--lumina-radius-full);
    flex-shrink: 0;
  }

  .group-member-dot.on {
    background: var(--lumina-secondary);
    box-shadow: 0 0 4px rgba(254, 203, 0, 0.4);
  }

  .group-member-dot.off {
    background: var(--lumina-outline-variant);
  }

  .group-member-name {
    font-size: 0.75rem;
    color: var(--lumina-on-surface);
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .group-member-slider {
    width: 70px;
    flex-shrink: 0;
  }

  /* ─── Scenes ────────────────────────────────────── */
  .scenes-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .scenes-header {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .scenes-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
  }
`;function Jt(t,e){let i;return(...a)=>{void 0!==i&&clearTimeout(i),i=setTimeout(()=>{i=void 0,t(...a)},e)}}const Zt=[{name:"Warm White",rgb:[255,180,107],css:"#ffb46b"},{name:"Cool White",rgb:[200,220,255],css:"#c8dcff"},{name:"Red",rgb:[255,50,50],css:"#ff3232"},{name:"Orange",rgb:[255,140,0],css:"#ff8c00"},{name:"Yellow",rgb:[255,220,0],css:"#ffdc00"},{name:"Green",rgb:[0,220,80],css:"#00dc50"},{name:"Cyan",rgb:[0,210,255],css:"#00d2ff"},{name:"Blue",rgb:[50,100,255],css:"#3264ff"},{name:"Purple",rgb:[160,50,255],css:"#a032ff"},{name:"Pink",rgb:[255,80,180],css:"#ff50b4"}];function Kt(t){return"string"==typeof t?{id:t}:{id:t.entity,customName:t.name,customIcon:t.icon,group:t.group}}let Qt=class extends bt{constructor(){super(...arguments),this._expandedId=null,this._collapsedGroups=new Set,this._pressedId=null,this._didLongPress=!1,this._debouncedBrightness=Jt((t,e)=>{a(this.hass,"light","turn_on",{entity_id:t,brightness_pct:e})},150),this._debouncedMasterBrightness=Jt(e=>{this._entityIds.forEach(i=>{const n=t(this.hass,i);n&&"on"===n.state&&a(this.hass,"light","turn_on",{entity_id:i,brightness_pct:e})})},150),this._debouncedColorTemp=Jt(e=>{this._entityIds.forEach(i=>{const n=t(this.hass,i);n&&"on"===n.state&&n.attributes.supported_color_modes?.includes("color_temp")&&a(this.hass,"light","turn_on",{entity_id:i,color_temp_kelvin:e})})},150),this._pressTarget=null}setConfig(t){if(!t.entities||!t.entities.length)throw new Error("Please define at least one light entity");this.config={show_color_temp:!0,show_individual_controls:!0,...t}}getCardSize(){return 5}static getConfigElement(){return document.createElement("ha-lumina-light-card-editor")}static getStubConfig(){return{type:"custom:ha-lumina-light-card",entities:[],show_color_temp:!0}}shouldUpdate(t){if(t.has("config")||t.has("_expandedId"))return!0;if(!t.has("hass")||!this.config)return!1;const e=t.get("hass");return!e||this._entityIds.some(t=>e.states[t]!==this.hass.states[t])}get _normalized(){return(this.config.entities||[]).map(Kt)}get _entityIds(){return this._normalized.map(t=>t.id)}_getEntity(e){return t(this.hass,e)}_getName(t,e){if(e)return e;const a=this._getEntity(t);return a?i(a):t}get _avgBrightness(){return s(this.hass,this._entityIds)}get _onCount(){return this._entityIds.filter(t=>"on"===this._getEntity(t)?.state).length}get _hasColorTemp(){return this._entityIds.some(t=>this._getEntity(t)?.attributes.supported_color_modes?.includes("color_temp"))}get _avgColorTemp(){const t=this._entityIds.map(t=>this._getEntity(t)).filter(t=>"on"===t?.state&&t?.attributes.color_temp_kelvin).map(t=>t.attributes.color_temp_kelvin||3500);return t.length?Math.round(t.reduce((t,e)=>t+e,0)/t.length):3500}_hasBrightness(t){const e=t.attributes.supported_color_modes||[];return e.length>0&&!e.every(t=>"onoff"===t)}_isGroup(t){return Array.isArray(t.attributes.entity_id)&&t.attributes.entity_id.length>0}_hasColor(t){return(t.attributes.supported_color_modes||[]).some(t=>["rgb","rgbw","rgbww","hs","xy"].includes(t))}_hasEffects(t){return Array.isArray(t.attributes.effect_list)&&t.attributes.effect_list.length>0}_toggleLight(t){a(this.hass,"light","toggle",{entity_id:t})}_turnAllOff(){a(this.hass,"light","turn_off",{entity_id:this._entityIds})}_turnAllOn(){a(this.hass,"light","turn_on",{entity_id:this._entityIds})}_activateScene(t){a(this.hass,"scene","turn_on",{entity_id:t})}_setColor(t,e){a(this.hass,"light","turn_on",{entity_id:t,rgb_color:e})}_setEffect(t,e){a(this.hass,"light","turn_on",{entity_id:t,effect:e})}_onPointerDown(t,e){this._didLongPress=!1,this._pressedId=t;const i=e.currentTarget;this._pressTarget=i,i.classList.add("pressing"),i.setPointerCapture(e.pointerId),this._pressTimer=setTimeout(()=>{this._didLongPress=!0,i.classList.remove("pressing"),this._expandedId=this._expandedId===t?null:t},500)}_onPointerUp(t,e){(this._pressTarget||e.currentTarget).classList.remove("pressing"),this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=void 0),this._didLongPress||this._pressedId!==t||this._toggleLight(t),this._pressedId=null,this._pressTarget=null,this._didLongPress=!1}_onPointerCancel(){this._pressTarget&&this._pressTarget.classList.remove("pressing"),this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=void 0),this._pressedId=null,this._pressTarget=null}_onPointerLeave(t){this._pressTarget&&this._pressTarget.classList.remove("pressing"),this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=void 0),this._pressedId=null,this._pressTarget=null}_toggleGroup(t){const e=new Set(this._collapsedGroups);e.has(t)?e.delete(t):e.add(t),this._collapsedGroups=e}_toggleExpand(t,e){e.stopPropagation(),this._expandedId=this._expandedId===t?null:t}_renderExpandPanel(t,e){const a=this._isGroup(e),n=this._hasColor(e),s=this._hasEffects(e),o=e.attributes.effect,r=e.attributes.rgb_color;return tt`
      <div class="light-expand ${this._expandedId===t?"open":""}">
        <div class="expand-section">

          ${n?tt`
            <span class="expand-label">Color</span>
            <div class="color-presets">
              ${Zt.map(e=>{const i=r&&Math.abs(r[0]-e.rgb[0])<30&&Math.abs(r[1]-e.rgb[1])<30&&Math.abs(r[2]-e.rgb[2])<30;return tt`
                  <div class="color-dot ${i?"selected":""}"
                    style="background: ${e.css}" title="${e.name}"
                    @click=${()=>this._setColor(t,e.rgb)}></div>
                `})}
            </div>
          `:at}

          ${s?tt`
            <span class="expand-label">Effect</span>
            <div class="effect-select-wrapper">
              <select class="effect-select"
                @change=${e=>this._setEffect(t,e.target.value)}>
                <option value="solid" ?selected=${!o||"solid"===o}>Solid</option>
                ${(e.attributes.effect_list||[]).map(t=>tt`
                  <option value="${t}" ?selected=${o===t}>${t}</option>
                `)}
              </select>
              <span class="effect-select-arrow"><ha-icon icon="mdi:chevron-down"></ha-icon></span>
            </div>
          `:at}

          ${a?tt`
            <span class="expand-label">Group Lights</span>
            <div class="group-members">
              ${(e.attributes.entity_id||[]).map(t=>{const e=this._getEntity(t);if(!e)return at;const a="on"===e.state,n=a?Math.round((e.attributes.brightness||0)/255*100):0;return tt`
                  <div class="group-member">
                    <div class="group-member-dot ${a?"on":"off"}"></div>
                    <span class="group-member-name">${i(e)}</span>
                    <div class="group-member-slider">
                      <lumina-slider .value=${n} .min=${0} .max=${100}
                        color="var(--lumina-secondary)"
                        @value-changed=${e=>this._debouncedBrightness(t,e.detail.value)}
                      ></lumina-slider>
                    </div>
                  </div>
                `})}
            </div>
          `:at}

          ${n||s||a?at:tt`
            <span class="expand-label" style="color: var(--lumina-outline)">No extra controls available</span>
          `}
        </div>
      </div>
    `}_renderLightItem(t,e,i){const a=this._getEntity(t);if(!a)return at;const n="on"===a.state,s=this._hasBrightness(a),o=n&&s?Math.round((a.attributes.brightness||0)/255*100):0,r=this._isGroup(a)||this._hasColor(a)||this._hasEffects(a),l=this._getName(t,e),c=i||"mdi:lightbulb";return tt`
      <div class="light-item ${n?"on":""}">
        <div class="light-item-row">
          <button class="light-circle ${n?"on":""}"
            @pointerdown=${e=>this._onPointerDown(t,e)}
            @pointerup=${e=>this._onPointerUp(t,e)}
            @pointercancel=${this._onPointerCancel}
            @pointerleave=${this._onPointerLeave}>
            <ha-icon icon="${c}"></ha-icon>
          </button>

          <div class="light-item-info">
            <span class="light-item-name">${l}</span>
            ${n&&s?tt`
              <div class="light-item-slider">
                <lumina-slider .value=${o} .min=${1} .max=${100}
                  color="var(--lumina-secondary)"
                  @value-changed=${e=>this._debouncedBrightness(t,e.detail.value)}
                ></lumina-slider>
              </div>
            `:at}
          </div>

          ${s?tt`<span class="light-item-pct ${n?"on":""}">${n?`${o}%`:"Off"}</span>`:tt`
              <button class="light-item-switch ${n?"on":""}"
                @click=${e=>{e.stopPropagation(),this._toggleLight(t)}}>
                <span class="switch-thumb"></span>
              </button>
            `}

          ${r?tt`
            <button class="light-expand-btn ${this._expandedId===t?"open":""}"
              @click=${e=>this._toggleExpand(t,e)}>
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </button>
          `:at}
        </div>

        ${r?this._renderExpandPanel(t,a):at}
      </div>
    `}_renderGroupedLights(){const t=this._normalized,e=new Map,i=[];for(const a of t)a.group?(e.has(a.group)||e.set(a.group,[]),e.get(a.group).push(a)):i.push(a);return tt`
      ${i.map(({id:t,customName:e,customIcon:i})=>this._renderLightItem(t,e,i))}

      ${[...e.entries()].map(([t,e])=>{const i=this._collapsedGroups.has(t);return tt`
          <div class="light-group">
            <button class="light-group-header" @click=${()=>this._toggleGroup(t)}>
              <span class="light-group-name">${t}</span>
              <ha-icon class="light-group-chevron ${i?"":"open"}" icon="mdi:chevron-down"></ha-icon>
            </button>
            <div class="light-group-items ${i?"collapsed":""}">
              ${e.map(({id:t,customName:e,customIcon:i})=>this._renderLightItem(t,e,i))}
            </div>
          </div>
        `})}
    `}render(){if(!this.config||!this.hass)return at;const t=this._avgBrightness,e=this._onCount,i=this._entityIds.length;return tt`
      <div class="light-card" style="position:relative;">
        ${Ut(this.config.image,!0)}
        <div class="lumina-3d-content">
        <!-- Hero Ring + All On/Off underneath -->
        <div class="hero-section">
          <lumina-ring .value=${t} .size=${160} .strokeWidth=${4}
            color="var(--lumina-secondary)" ?inactive=${0===e}>
            <span class="hero-value">${t}%</span>
            <span class="hero-label">Brightness</span>
          </lumina-ring>

          <div class="hero-actions">
            <lumina-chip icon="mdi:lightbulb-on" label="All On" variant="secondary" @click=${this._turnAllOn}></lumina-chip>
            <lumina-chip icon="mdi:lightbulb-off" label="All Off" variant="error" @click=${this._turnAllOff}></lumina-chip>
          </div>
        </div>

        <!-- Master Controls -->
        <div class="master-controls">
          <div class="slider-row">
            <div class="slider-label">
              <span class="slider-label-text"><ha-icon icon="mdi:brightness-6"></ha-icon> Master Brightness</span>
              <span class="slider-value">${t}%</span>
            </div>
            <lumina-slider .value=${t} .min=${0} .max=${100}
              color="var(--lumina-secondary)"
              @value-changed=${t=>this._debouncedMasterBrightness(t.detail.value)}
            ></lumina-slider>
          </div>

          ${this.config.show_color_temp&&this._hasColorTemp?tt`
            <div class="slider-row">
              <div class="slider-label">
                <span class="slider-label-text"><ha-icon icon="mdi:thermometer"></ha-icon> Color Temperature</span>
                <span class="slider-value">${this._avgColorTemp}K</span>
              </div>
              <lumina-slider .value=${this._avgColorTemp} .min=${2e3} .max=${6500}
                variant="gradient"
                @value-changed=${t=>this._debouncedColorTemp(t.detail.value)}
              ></lumina-slider>
            </div>
          `:at}
        </div>

        <!-- Individual Lights -->
        ${!1!==this.config.show_individual_controls?tt`
          <div class="lights-section">
            <span class="lights-section-header">${e}/${i} Lights On</span>
            ${this._renderGroupedLights()}
          </div>
        `:at}

        <!-- Scenes -->
        ${this.config.scenes?.length?tt`
          <div class="scenes-section">
            <span class="scenes-header">Scenes</span>
            <div class="scenes-row">
              ${this.config.scenes.map(t=>tt`
                <lumina-chip .icon=${t.icon} .label=${t.name}
                  @click=${()=>this._activateScene(t.entity_id)}></lumina-chip>
              `)}
            </div>
          </div>
        `:at}
      </div><!-- /lumina-3d-content -->
      </div>
    `}};Qt.styles=[St,Tt,qt],d([kt({attribute:!1})],Qt.prototype,"hass",void 0),d([kt({attribute:!1})],Qt.prototype,"config",void 0),d([Ct()],Qt.prototype,"_expandedId",void 0),d([Ct()],Qt.prototype,"_collapsedGroups",void 0),Qt=d([xt("ha-lumina-light-card")],Qt);const te=v`
  :host {
    display: block;
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
  }

  .climate-card {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-6);
  }

  /* ─── Header with Status Badge ───────────────────── */
  .climate-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .header-title {
    font-family: var(--lumina-font-headline);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
  }

  .header-humidity {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--lumina-on-surface-variant);
  }

  .header-humidity ha-icon {
    --mdc-icon-size: 16px;
    color: var(--lumina-primary);
  }

  .header-humidity-value {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
  }

  .header-humidity-label {
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--lumina-on-surface-variant);
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 100px;
    background: var(--lumina-surface-container-high);
    border: 1px solid var(--lumina-ghost-border);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--badge-color, var(--lumina-outline));
    box-shadow: 0 0 6px var(--badge-color, transparent);
  }

  .status-text {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--lumina-on-surface-variant);
  }

  /* ─── Hero Ring Section ─────────────────────────── */
  .hero-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--lumina-space-6);
    padding: var(--lumina-space-4) 0;
  }

  .hero-ring-wrapper {
    position: relative;
  }

  .hero-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .hero-temp {
    font-family: var(--lumina-font-headline);
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    line-height: 1;
  }

  .hero-label {
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--lumina-on-surface-variant);
  }

  /* ─── Target Temperature ────────────────────────── */
  .target-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }

  .target-value {
    font-family: var(--lumina-font-headline);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
  }

  .target-label {
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--lumina-on-surface-variant);
  }

  /* ─── HVAC Mode Buttons (Circular Icons) ─────────── */
  .mode-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .section-label {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .mode-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-4);
    justify-content: center;
  }

  .mode-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .mode-btn-circle {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 2px solid var(--lumina-outline-variant);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;
  }

  .mode-btn-circle ha-icon {
    --mdc-icon-size: 22px;
    color: var(--lumina-on-surface-variant);
    transition: color 0.25s ease;
  }

  .mode-btn-label {
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--lumina-outline);
    transition: color 0.25s ease;
  }

  /* Active mode button */
  .mode-btn.active .mode-btn-circle {
    border-color: var(--mode-color);
    background: color-mix(in srgb, var(--mode-color) 12%, transparent);
    box-shadow: 0 0 12px color-mix(in srgb, var(--mode-color) 25%, transparent);
  }

  .mode-btn.active .mode-btn-circle ha-icon {
    color: var(--mode-color);
  }

  .mode-btn.active .mode-btn-label {
    color: var(--mode-color);
  }

  /* ─── Fan Speed ─────────────────────────────────── */
  .fan-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .fan-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
  }

`,ee={off:"mdi:power",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:autorenew",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan"},ie={cool:"var(--lumina-primary)",heat:"var(--lumina-secondary)",heat_cool:"var(--lumina-tertiary)",auto:"var(--lumina-tertiary)",dry:"var(--lumina-on-surface-variant)",fan_only:"var(--lumina-primary)",off:"var(--lumina-outline)"},ae={off:"Off",heat:"Heating",cool:"Cooling",heat_cool:"Heat/Cool",auto:"Auto",dry:"Drying",fan_only:"Fan"};let ne=class extends bt{setConfig(t){if(!t.entity)throw new Error("Please define a climate entity");this.config={show_humidity:!0,show_fan_speed:!0,...t}}getCardSize(){return 5}static getConfigElement(){return document.createElement("ha-lumina-climate-card-editor")}static getStubConfig(){return{type:"custom:ha-lumina-climate-card",entity:"",show_humidity:!0,show_fan_speed:!0}}get _entity(){return t(this.hass,this.config.entity)}get _isAvailable(){return e(this._entity)}get _currentTemp(){return this._entity?.attributes.current_temperature}get _targetTemp(){return this._entity?.attributes.temperature}get _mode(){return this._entity?.state||"off"}get _modeColor(){return ie[this._mode]||"var(--lumina-outline)"}get _minTemp(){return this._entity?.attributes.min_temp||16}get _maxTemp(){return this._entity?.attributes.max_temp||32}get _tempStep(){return this._entity?.attributes.target_temp_step||.5}get _tempPercent(){const t=this._currentTemp;if(void 0===t)return 0;const e=this._maxTemp-this._minTemp;return 0===e?0:Math.round((t-this._minTemp)/e*100)}get _targetTempPercent(){const t=this._targetTemp;if(void 0===t)return 0;const e=this._maxTemp-this._minTemp;return 0===e?0:Math.round((t-this._minTemp)/e*100)}get _hvacModes(){return this._entity?.attributes.hvac_modes||[]}get _fanModes(){return this._entity?.attributes.fan_modes||[]}get _currentFanMode(){return this._entity?.attributes.fan_mode||""}get _humidity(){return this._entity?.attributes.current_humidity}get _statusLabel(){return ae[this._mode]||this._mode.charAt(0).toUpperCase()+this._mode.slice(1).replaceAll("_"," ")}_setMode(t){a(this.hass,"climate","set_hvac_mode",{entity_id:this.config.entity,hvac_mode:t})}_setFanMode(t){a(this.hass,"climate","set_fan_mode",{entity_id:this.config.entity,fan_mode:t})}_adjustTemp(t){const e=this._targetTemp;if(void 0===e)return;const i=Math.min(this._maxTemp,Math.max(this._minTemp,e+t));a(this.hass,"climate","set_temperature",{entity_id:this.config.entity,temperature:i})}render(){if(!this.config||!this.hass)return at;if(!this._entity||!this._isAvailable)return tt`<div class="climate-card"><span class="body-md text-muted">Climate entity unavailable</span></div>`;const t="off"!==this._mode;return tt`
      <div class="climate-card" style="position:relative;">
        ${Ut(this.config.image,!0)}
        <div class="lumina-3d-content">

        <!-- Header with status badge + humidity -->
        <div class="climate-header">
          <div class="header-left">
            <span class="header-title">HVAC Control</span>
            ${this.config.show_humidity&&void 0!==this._humidity?tt`
                <div class="header-humidity">
                  <ha-icon icon="mdi:water-percent"></ha-icon>
                  <span class="header-humidity-value">${this._humidity}%</span>
                  <span class="header-humidity-label">Humidity</span>
                </div>
              `:at}
          </div>
          <div class="status-badge" style="--badge-color: ${this._modeColor}">
            <span class="status-dot"></span>
            <span class="status-text">${this._statusLabel.toUpperCase()}</span>
          </div>
        </div>

        <!-- Hero Ring — Target Temperature -->
        <div class="hero-section">
          <lumina-icon-button
            icon="mdi:minus"
            size="md"
            @click=${()=>this._adjustTemp(-this._tempStep)}
            ?disabled=${!t}
          ></lumina-icon-button>

          <div class="hero-ring-wrapper">
            <lumina-ring
              .value=${this._targetTempPercent}
              .size=${180}
              .strokeWidth=${4}
              color=${this._modeColor}
              ?inactive=${!t}
            >
              <div class="hero-center">
                <span class="hero-label">TARGET</span>
                <span class="hero-temp">${void 0!==this._targetTemp?o(this._targetTemp):"--°"}</span>
              </div>
            </lumina-ring>
          </div>

          <lumina-icon-button
            icon="mdi:plus"
            size="md"
            @click=${()=>this._adjustTemp(this._tempStep)}
            ?disabled=${!t}
          ></lumina-icon-button>
        </div>

        <!-- Current Temperature (below ring) -->
        <div class="target-section">
          <span class="target-label">Current</span>
          <span class="target-value">${void 0!==this._currentTemp?o(this._currentTemp):"--°"}</span>
        </div>

        <!-- HVAC Modes — Circular Icon Buttons -->
        <div class="mode-section">
          <span class="section-label">Mode</span>
          <div class="mode-buttons">
            ${this._hvacModes.map(t=>{const e=ee[t]||"mdi:thermostat",i=t.charAt(0).toUpperCase()+t.slice(1).replaceAll("_"," ");return tt`
                <div class="mode-btn ${this._mode===t?"active":""}"
                     style="--mode-color: ${ie[t]||"var(--lumina-outline)"}"
                     @click=${()=>this._setMode(t)}>
                  <div class="mode-btn-circle">
                    <ha-icon icon="${e}"></ha-icon>
                  </div>
                  <span class="mode-btn-label">${i}</span>
                </div>
              `})}
          </div>
        </div>

        <!-- Fan Speed -->
        ${this.config.show_fan_speed&&this._fanModes.length?tt`
              <div class="fan-section">
                <span class="section-label">Fan Speed</span>
                <div class="fan-chips">
                  ${this._fanModes.map(t=>tt`
                    <lumina-chip
                      .label=${t.charAt(0).toUpperCase()+t.slice(1)}
                      ?active=${this._currentFanMode===t}
                      size="sm"
                      @click=${()=>this._setFanMode(t)}
                    ></lumina-chip>
                  `)}
                </div>
              </div>
            `:at}

      </div><!-- /lumina-3d-content -->
      </div>
    `}};ne.styles=[St,Tt,te],d([kt({attribute:!1})],ne.prototype,"hass",void 0),d([kt({attribute:!1})],ne.prototype,"config",void 0),ne=d([xt("ha-lumina-climate-card")],ne);let se=class extends bt{constructor(){super(...arguments),this._haLoaded=!1}setConfig(t){this._config={...t}}async connectedCallback(){super.connectedCallback(),await Wt(),this._haLoaded=!0}_dispatch(){Ft(this,this._config)}_set(t,e){this._config={...this._config,[t]:e},this._dispatch()}_toObj(t){return"string"==typeof t?{entity:t}:{...t}}_getEntityId(t){return"string"==typeof t?t:t.entity}_getEntityName(t){return"string"==typeof t?"":t.name||""}_getEntityIcon(t){return"string"==typeof t?"":t.icon||""}_getEntityGroup(t){return"string"==typeof t?"":t.group||""}_entityChanged(t,e){const i=[...this._config.entities||[]],a=this._toObj(i[t]);a.entity=e,i[t]=a,this._set("entities",i)}_entityNameChanged(t,e){const i=[...this._config.entities||[]],a=this._toObj(i[t]);a.name=e||void 0,i[t]=a,this._set("entities",i)}_entityIconChanged(t,e){const i=[...this._config.entities||[]],a=this._toObj(i[t]);a.icon=e||void 0,i[t]=a,this._set("entities",i)}_entityGroupChanged(t,e){const i=[...this._config.entities||[]],a=this._toObj(i[t]);a.group=e||void 0,i[t]=a,this._set("entities",i)}_addEntity(){this._set("entities",[...this._config.entities||[],{entity:""}])}_removeEntity(t){const e=[...this._config.entities||[]];e.splice(t,1),this._set("entities",e)}_addScene(){this._set("scenes",[...this._config.scenes||[],{name:"",icon:"mdi:palette",entity_id:""}])}_removeScene(t){const e=[...this._config.scenes||[]];e.splice(t,1),this._set("scenes",e)}_sceneChanged(t,e,i){const a=[...this._config.scenes||[]];a[t]={...a[t],[e]:i},this._set("scenes",a)}render(){return this._config&&this.hass?this._haLoaded?tt`
      <div class="editor">
        <div class="editor-section">Light Entities</div>
        ${(this._config.entities||[]).map((t,e)=>tt`
          <div class="entity-block">
            <div class="entity-row">
              <ha-entity-picker .hass=${this.hass} label="Light ${e+1}" .value=${this._getEntityId(t)}
                .includeDomains=${["light"]}
                @value-changed=${t=>this._entityChanged(e,t.detail.value)}
                allow-custom-entity></ha-entity-picker>
              <ha-icon class="remove-btn" icon="mdi:close" @click=${()=>this._removeEntity(e)}></ha-icon>
            </div>
            <div class="entity-extras">
              <ha-textfield label="Custom Name" .value=${this._getEntityName(t)}
                @input=${t=>this._entityNameChanged(e,t.target.value)}></ha-textfield>
              <ha-icon-picker .hass=${this.hass} label="Icon" .value=${this._getEntityIcon(t)}
                @value-changed=${t=>this._entityIconChanged(e,t.detail.value||"")}></ha-icon-picker>
              <ha-textfield label="Group" .value=${this._getEntityGroup(t)}
                @input=${t=>this._entityGroupChanged(e,t.target.value)}></ha-textfield>
            </div>
          </div>
        `)}
        <div class="add-btn" @click=${this._addEntity}>+ Add Light</div>

        <div class="editor-section">Options</div>
        <div class="toggle-row">
          <span class="toggle-label">Show Color Temperature</span>
          <ha-switch .checked=${!1!==this._config.show_color_temp}
            @change=${t=>this._set("show_color_temp",t.target.checked)}></ha-switch>
        </div>
        <div class="toggle-row">
          <span class="toggle-label">Show Individual Controls</span>
          <ha-switch .checked=${!1!==this._config.show_individual_controls}
            @change=${t=>this._set("show_individual_controls",t.target.checked)}></ha-switch>
        </div>

        <div class="editor-section">Scenes</div>
        ${(this._config.scenes||[]).map((t,e)=>tt`
          <div class="scene-row">
            <ha-textfield label="Name" .value=${t.name}
              @input=${t=>this._sceneChanged(e,"name",t.target.value)}></ha-textfield>
            <ha-entity-picker .hass=${this.hass} label="Scene" .value=${t.entity_id}
              .includeDomains=${["scene"]}
              @value-changed=${t=>this._sceneChanged(e,"entity_id",t.detail.value)}
              allow-custom-entity></ha-entity-picker>
            <ha-icon class="remove-btn" icon="mdi:close" @click=${()=>this._removeScene(e)}></ha-icon>
          </div>
        `)}
        <div class="add-btn" @click=${this._addScene}>+ Add Scene</div>
      </div>
    `:tt`<div class="loading">Loading editor...</div>`:tt``}};se.styles=v`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-section { font-size: 1rem; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color); }
    .entity-block { background: var(--card-background-color, #1a1a1d); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
    .entity-row { display: flex; gap: 8px; align-items: center; }
    .entity-row ha-entity-picker { flex: 1; }
    .entity-extras { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; align-items: end; }
    .remove-btn { cursor: pointer; color: var(--error-color, #db4437); --mdc-icon-size: 20px; }
    .add-btn { cursor: pointer; color: var(--primary-color); font-size: 0.875rem; font-weight: 500; padding: 8px; }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .toggle-label { font-size: 0.875rem; font-weight: 500; }
    .scene-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    .scene-row ha-textfield, .scene-row ha-entity-picker { flex: 1; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
  `,d([kt({attribute:!1})],se.prototype,"hass",void 0),d([Ct()],se.prototype,"_config",void 0),d([Ct()],se.prototype,"_haLoaded",void 0),se=d([xt("ha-lumina-light-card-editor")],se);let oe=class extends bt{constructor(){super(...arguments),this._haLoaded=!1}setConfig(t){this._config={...t}}async connectedCallback(){super.connectedCallback(),await Wt(),this._haLoaded=!0}_dispatch(){Ft(this,this._config)}_set(t,e){this._config={...this._config,[t]:e},this._dispatch()}render(){return this._config&&this.hass?this._haLoaded?tt`
      <div class="editor">
        <div class="editor-section">Climate Entity</div>
        <ha-entity-picker .hass=${this.hass} label="Climate Entity"
          .value=${this._config.entity||""} .includeDomains=${["climate"]}
          @value-changed=${t=>this._set("entity",t.detail.value)}
          allow-custom-entity></ha-entity-picker>

        <div class="editor-section">Options</div>
        <div class="toggle-row">
          <span class="toggle-label">Show Humidity</span>
          <ha-switch .checked=${!1!==this._config.show_humidity}
            @change=${t=>this._set("show_humidity",t.target.checked)}></ha-switch>
        </div>
        <div class="toggle-row">
          <span class="toggle-label">Show Fan Speed</span>
          <ha-switch .checked=${!1!==this._config.show_fan_speed}
            @change=${t=>this._set("show_fan_speed",t.target.checked)}></ha-switch>
        </div>
      </div>
    `:tt`<div class="loading">Loading editor...</div>`:tt``}};oe.styles=v`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-section { font-size: 1rem; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color); }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .toggle-label { font-size: 0.875rem; font-weight: 500; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
  `,d([kt({attribute:!1})],oe.prototype,"hass",void 0),d([Ct()],oe.prototype,"_config",void 0),d([Ct()],oe.prototype,"_haLoaded",void 0),oe=d([xt("ha-lumina-climate-card-editor")],oe);const re=v`
  :host {
    display: block;
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
  }

  .media-card {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-6);
  }

  /* ─── Player Selector (multi-entity) ──────────────── */
  .player-selector {
    display: flex;
    gap: var(--lumina-space-2);
    overflow-x: auto;
    padding-bottom: var(--lumina-space-1);
    scrollbar-width: none;
  }

  .player-selector::-webkit-scrollbar {
    display: none;
  }

  .player-tab {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: var(--lumina-space-2) var(--lumina-space-4);
    border-radius: var(--lumina-radius-full);
    border: 1px solid var(--lumina-ghost-border);
    background: var(--lumina-surface-container-high);
    cursor: pointer;
    white-space: nowrap;
    transition: all var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
    font-family: var(--lumina-font-body);
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
  }

  .player-tab.active {
    background: rgba(133, 173, 255, 0.1);
    border-color: rgba(133, 173, 255, 0.3);
    color: var(--lumina-primary);
  }

  .player-tab-dot {
    width: 6px;
    height: 6px;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-outline-variant);
    flex-shrink: 0;
  }

  .player-tab-dot.playing {
    background: var(--lumina-primary);
    box-shadow: 0 0 4px rgba(133, 173, 255, 0.5);
  }

  .player-tab-name {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ─── Now Playing Header ────────────────────────── */
  .now-playing-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .now-playing-left {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
  }

  .now-playing-label {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--lumina-primary);
  }

  .audio-format-badge {
    font-size: 0.5625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 2px 8px;
    border-radius: var(--lumina-radius-sm);
    background: var(--lumina-surface-container-highest);
    border: 1px solid var(--lumina-ghost-border);
    color: var(--lumina-on-surface-variant);
  }

  .grouped-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--lumina-space-1);
    padding: var(--lumina-space-1) var(--lumina-space-3);
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-full);
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
  }

  .grouped-badge ha-icon {
    --mdc-icon-size: 14px;
  }

  /* ─── Room Title ────────────────────────────────── */
  .room-title {
    font-family: var(--lumina-font-headline);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    line-height: 1.3;
  }

  /* ─── Album Art ─────────────────────────────────── */
  .album-section {
    display: flex;
    justify-content: center;
    padding: var(--lumina-space-4) 0;
  }

  .album-art {
    width: 180px;
    height: 180px;
    border-radius: var(--lumina-radius-lg);
    object-fit: cover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }

  .album-art-placeholder {
    width: 180px;
    height: 180px;
    border-radius: var(--lumina-radius-lg);
    background: var(--lumina-surface-container-highest);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--lumina-outline);
  }

  .album-art-placeholder ha-icon {
    --mdc-icon-size: 64px;
  }

  /* ─── Track Info ────────────────────────────────── */
  .track-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-1);
    text-align: center;
  }

  .track-title {
    font-family: var(--lumina-font-headline);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
  }

  .track-artist {
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
  }

  /* ─── Progress Bar ─────────────────────────────── */
  .progress-section {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: 0 var(--lumina-space-2);
  }

  .progress-time {
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--lumina-outline);
    min-width: 32px;
    font-variant-numeric: tabular-nums;
  }

  .progress-time:last-child {
    text-align: right;
  }

  .progress-bar {
    flex: 1;
    height: 3px;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-surface-container-highest);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-primary);
    transition: width 1s linear;
  }

  /* ─── Playback Controls ─────────────────────────── */
  .playback-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--lumina-space-6);
  }

  /* ─── Volume ────────────────────────────────────── */
  .volume-section {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: 0 var(--lumina-space-2);
  }

  .volume-icon {
    display: flex;
    color: var(--lumina-outline);
  }

  .volume-icon ha-icon {
    --mdc-icon-size: 18px;
  }

  .volume-slider-wrapper {
    flex: 1;
  }

  /* ─── Sources Section ──────────────────────────── */
  .sources-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .sources-label {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .sources-list {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-1);
    max-height: 200px;
    overflow-y: auto;
  }

  .source-item {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: var(--lumina-space-3) var(--lumina-space-4);
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    cursor: pointer;
    transition: background var(--lumina-transition-fast);
  }

  .source-item:hover {
    background: var(--lumina-surface-container-highest);
  }

  .source-item.active {
    background: rgba(133, 173, 255, 0.1);
    border: 1px solid rgba(133, 173, 255, 0.2);
  }

  .source-item ha-icon {
    --mdc-icon-size: 20px;
    color: var(--lumina-on-surface-variant);
  }

  .source-item.active ha-icon {
    color: var(--lumina-primary);
  }

  .source-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--lumina-on-surface);
  }

  .source-item.active .source-name {
    color: var(--lumina-primary);
  }

  /* ─── Shortcuts Section ──────────────────────────── */
  .shortcuts-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .shortcuts-label {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .shortcuts-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
  }

  /* ─── Speaker Management ──────────────────────────── */
  .rooms-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }

  .rooms-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--lumina-space-1);
  }

  .rooms-title {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .rooms-subtitle {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--lumina-on-surface-variant);
    margin-top: var(--lumina-space-2);
  }

  .room-item {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: var(--lumina-space-3) var(--lumina-space-4);
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
  }

  .room-item.joinable {
    opacity: 0.7;
  }

  .room-item-dot {
    width: 8px;
    height: 8px;
    border-radius: var(--lumina-radius-full);
    flex-shrink: 0;
  }

  .room-item-dot.playing {
    background: var(--lumina-primary);
    box-shadow: 0 0 6px rgba(133, 173, 255, 0.5);
  }

  .room-item-dot.idle {
    background: var(--lumina-outline-variant);
  }

  .room-item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
  }

  .room-item-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--lumina-on-surface);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .room-item-state {
    font-size: 0.6875rem;
    color: var(--lumina-outline);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .room-item-action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    border-radius: var(--lumina-radius-full);
    cursor: pointer;
    flex-shrink: 0;
    padding: 0;
    transition: background var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
  }

  .room-item-action ha-icon {
    --mdc-icon-size: 18px;
  }

  .room-item-action.join {
    color: var(--lumina-primary);
  }

  .room-item-action.join:hover {
    background: rgba(133, 173, 255, 0.1);
  }

  .room-item-action.unjoin {
    color: var(--lumina-outline);
  }

  .room-item-action.unjoin:hover {
    color: var(--lumina-error, #f44336);
    background: rgba(244, 67, 54, 0.1);
  }

  /* ─── Idle State ────────────────────────────────── */
  .idle-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-4);
    padding: var(--lumina-space-8) 0;
  }

  .idle-state ha-icon {
    --mdc-icon-size: 48px;
    color: var(--lumina-outline);
  }

  .idle-text {
    font-size: 0.875rem;
    color: var(--lumina-on-surface-variant);
  }
`;function le(t){return"string"==typeof t?{id:t}:{id:t.entity,customName:t.name}}let ce=class extends bt{constructor(){super(...arguments),this._currentPosition=0,this._activeEntityId=null,this._debouncedVolume=Jt(t=>{a(this.hass,"media_player","volume_set",{entity_id:this._activeId,volume_level:t/100})},150)}setConfig(t){if(!(t.entity||t.entities&&t.entities.length))throw new Error("Please define at least one media_player entity");this.config={show_source:!0,show_progress:!0,show_speaker_management:!0,...t}}getCardSize(){return 6}static getConfigElement(){return document.createElement("ha-lumina-media-card-editor")}static getStubConfig(){return{type:"custom:ha-lumina-media-card",entities:[],show_source:!0,show_progress:!0}}connectedCallback(){super.connectedCallback(),this._startPositionTracking()}disconnectedCallback(){super.disconnectedCallback(),this._stopPositionTracking()}updated(t){t.has("hass")&&this._syncPosition()}get _allEntities(){return this.config.entities?.length?this.config.entities.map(le):this.config.entity?[{id:this.config.entity}]:[]}get _hasMultiple(){return this._allEntities.length>1}get _activeId(){if(this._activeEntityId&&this._allEntities.some(t=>t.id===this._activeEntityId))return this._activeEntityId;const e=this._allEntities.find(e=>{const i=t(this.hass,e.id);return"playing"===i?.state});return e?.id||this._allEntities[0]?.id||""}_getMediaEntity(e){return t(this.hass,e)}_getDisplayName(t,e){if(e)return e;const a=this._getMediaEntity(t);return a?i(a):t.split(".")[1]||t}_syncPosition(){const t=this._entity;if(!t)return;const e=t.attributes.media_position,i=t.attributes.media_position_updated_at;if(void 0!==e&&i&&"playing"===t.state){const t=(Date.now()-new Date(i).getTime())/1e3;this._currentPosition=e+t}else void 0!==e&&(this._currentPosition=e)}_startPositionTracking(){this._stopPositionTracking(),this._positionTimer=setInterval(()=>{"playing"===this._entity?.state&&this._duration>0&&(this._currentPosition+=1)},1e3)}_stopPositionTracking(){this._positionTimer&&(clearInterval(this._positionTimer),this._positionTimer=void 0)}get _entity(){return this._getMediaEntity(this._activeId)}get _isPlaying(){return"playing"===this._entity?.state}get _isPaused(){return"paused"===this._entity?.state}get _isActive(){return this._isPlaying||this._isPaused}get _artUrl(){const t=this._entity?.attributes.entity_picture;return t?t.startsWith("/")?`${location.origin}${t}`:t:null}get _duration(){return this._entity?.attributes.media_duration||0}get _groupMembers(){return this._entity?.attributes.group_members||[]}get _isGrouped(){return this._groupMembers.length>1}get _groupedRoomName(){const e=this._allEntities.find(t=>t.id===this._activeId);return this._isGrouped?this._groupMembers.map(e=>{const a=t(this.hass,e);return a?i(a):e.split(".")[1]}).join(" + "):this._getDisplayName(this._activeId,e?.customName)}get _audioFormat(){const t=this._entity;if(!t)return null;const e=t.attributes.media_content_type;return e?e.charAt(0).toUpperCase()+e.slice(1):null}get _availableSpeakers(){return this.hass?.states?Object.keys(this.hass.states).filter(t=>t.startsWith("media_player.")&&t!==this._activeId).map(t=>({id:t,name:i(this.hass.states[t])})).sort((t,e)=>t.name.localeCompare(e.name)):[]}_selectPlayer(t){this._activeEntityId=t}_playPause(){a(this.hass,"media_player","media_play_pause",{entity_id:this._activeId})}_prev(){a(this.hass,"media_player","media_previous_track",{entity_id:this._activeId})}_next(){a(this.hass,"media_player","media_next_track",{entity_id:this._activeId})}_onVolume(t){this._debouncedVolume(t.detail.value)}_selectSource(t){a(this.hass,"media_player","select_source",{entity_id:this._activeId,source:t})}_joinSpeaker(t){a(this.hass,"media_player","join",{entity_id:this._activeId,group_members:[t]})}_unjoinSpeaker(t){a(this.hass,"media_player","unjoin",{entity_id:t})}_playShortcut(t){a(this.hass,"media_player","play_media",{entity_id:this._activeId,media_content_id:t.media_content_id,media_content_type:t.media_content_type})}_getSourceIcon(t){const e=t.toLowerCase();return e.includes("spotify")?"mdi:spotify":e.includes("airplay")?"mdi:apple":e.includes("bluetooth")?"mdi:bluetooth":e.includes("tv")||e.includes("hdmi")?"mdi:television":e.includes("aux")||e.includes("line")?"mdi:audio-input-stereo-minijack":e.includes("radio")||e.includes("tunein")?"mdi:radio":e.includes("youtube")?"mdi:youtube":e.includes("amazon")||e.includes("alexa")?"mdi:amazon":e.includes("apple")||e.includes("music")?"mdi:music-box":"mdi:speaker"}render(){if(!this.config||!this.hass)return at;if(!this._allEntities.length)return tt`<div class="media-card"><span class="body-md text-muted">No media players configured</span></div>`;const t=this._entity;if(!t||!e(t))return tt`<div class="media-card">
        ${this._hasMultiple?this._renderPlayerSelector():at}
        <div class="idle-state">
          <ha-icon icon="mdi:speaker-off"></ha-icon>
          <span class="idle-text">Media player unavailable</span>
        </div>
      </div>`;if(!this._isActive)return tt`
        <div class="media-card">
          ${this._hasMultiple?this._renderPlayerSelector():at}
          <div class="idle-state">
            <ha-icon icon="mdi:speaker-off"></ha-icon>
            <span class="idle-text">No media playing</span>
          </div>
          ${this._renderShortcuts()}
        </div>
      `;const i=t.attributes.media_title||"Unknown",a=t.attributes.media_artist||"",n=t.attributes.media_album_name||"",s=r(t),o=t.attributes.source_list||[],c=t.attributes.source,d=this._duration?Math.min(100,this._currentPosition/this._duration*100):0;return tt`
      <div class="media-card" style="position:relative;">
        ${Ut(this.config.image,!0)}
        <div class="lumina-3d-content">

        <!-- Player Selector (multi-entity) -->
        ${this._hasMultiple?this._renderPlayerSelector():at}

        <!-- Now Playing Header -->
        <div class="now-playing-header">
          <div class="now-playing-left">
            <span class="now-playing-label">Now Playing</span>
            ${this._audioFormat?tt`
              <span class="audio-format-badge">${this._audioFormat}</span>
            `:at}
          </div>
          ${this._isGrouped?tt`<span class="grouped-badge"><ha-icon icon="mdi:speaker-multiple"></ha-icon> Grouped</span>`:at}
        </div>

        <!-- Room Title -->
        <div class="room-title">${this._groupedRoomName}</div>

        <!-- Album Art -->
        <div class="album-section">
          ${this._artUrl?tt`<img class="album-art" src=${this._artUrl} alt="Album art" />`:tt`<div class="album-art-placeholder"><ha-icon icon="mdi:music"></ha-icon></div>`}
        </div>

        <!-- Track Info -->
        <div class="track-info">
          <span class="track-title">${i}</span>
          <span class="track-artist">${a}${n?` — ${n}`:""}</span>
        </div>

        <!-- Progress Bar -->
        ${this.config.show_progress&&this._duration>0?tt`
          <div class="progress-section">
            <span class="progress-time">${l(this._currentPosition)}</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${d}%"></div>
            </div>
            <span class="progress-time">${l(this._duration)}</span>
          </div>
        `:at}

        <!-- Playback Controls -->
        <div class="playback-controls">
          <lumina-icon-button icon="mdi:skip-previous" @click=${this._prev}></lumina-icon-button>
          <lumina-icon-button
            icon=${this._isPlaying?"mdi:pause":"mdi:play"}
            size="lg"
            variant="filled"
            @click=${this._playPause}
          ></lumina-icon-button>
          <lumina-icon-button icon="mdi:skip-next" @click=${this._next}></lumina-icon-button>
        </div>

        <!-- Volume -->
        <div class="volume-section">
          <span class="volume-icon"><ha-icon icon="mdi:volume-low"></ha-icon></span>
          <div class="volume-slider-wrapper">
            <lumina-slider
              .value=${s}
              .min=${0}
              .max=${100}
              color="var(--lumina-primary)"
              @value-changed=${this._onVolume}
            ></lumina-slider>
          </div>
          <span class="volume-icon"><ha-icon icon="mdi:volume-high"></ha-icon></span>
        </div>

        <!-- Sources -->
        ${this.config.show_source&&o.length?tt`
          <div class="sources-section">
            <span class="sources-label">Sources</span>
            <div class="sources-list">
              ${o.map(t=>tt`
                <div class="source-item ${c===t?"active":""}"
                  @click=${()=>this._selectSource(t)}>
                  <ha-icon icon="${this._getSourceIcon(t)}"></ha-icon>
                  <span class="source-name">${t}</span>
                </div>
              `)}
            </div>
          </div>
        `:at}

        <!-- Shortcuts -->
        ${this._renderShortcuts()}

        <!-- Speaker Management -->
        ${!1!==this.config.show_speaker_management?this._renderSpeakerManagement():at}

      </div><!-- /lumina-3d-content -->
      </div>
    `}_renderPlayerSelector(){return tt`
      <div class="player-selector">
        ${this._allEntities.map(({id:t,customName:e})=>{const i=this._getMediaEntity(t),a=t===this._activeId,n="playing"===i?.state,s=this._getDisplayName(t,e);return tt`
            <button class="player-tab ${a?"active":""}"
              @click=${()=>this._selectPlayer(t)}>
              <span class="player-tab-dot ${n?"playing":""}"></span>
              <span class="player-tab-name">${s}</span>
            </button>
          `})}
      </div>
    `}_renderSpeakerManagement(){const e=this._groupMembers,a=this._availableSpeakers.filter(t=>!e.includes(t.id));return 0===e.length&&0===a.length?at:tt`
      <div class="rooms-section">
        <div class="rooms-header">
          <span class="rooms-title">Speakers</span>
        </div>

        <!-- Current group members -->
        ${e.map(e=>{const a=t(this.hass,e),n="playing"===a?.state,s=a?i(a):e.split(".")[1],o=e===this._activeId,l=a?r(a):0;return tt`
            <div class="room-item">
              <div class="room-item-dot ${n?"playing":"idle"}"></div>
              <div class="room-item-info">
                <span class="room-item-name">${s}${o?" (Host)":""}</span>
                <span class="room-item-state">${n?"Playing":"Idle"} · ${l}%</span>
              </div>
              ${o?at:tt`
                <button class="room-item-action unjoin" @click=${()=>this._unjoinSpeaker(e)}
                  title="Remove from group">
                  <ha-icon icon="mdi:minus-circle-outline"></ha-icon>
                </button>
              `}
            </div>
          `})}

        <!-- Joinable speakers -->
        ${a.length?tt`
          <span class="rooms-subtitle">Available</span>
          ${a.map(t=>tt`
            <div class="room-item joinable">
              <div class="room-item-dot idle"></div>
              <div class="room-item-info">
                <span class="room-item-name">${t.name}</span>
              </div>
              <button class="room-item-action join" @click=${()=>this._joinSpeaker(t.id)}
                title="Add to group">
                <ha-icon icon="mdi:plus-circle-outline"></ha-icon>
              </button>
            </div>
          `)}
        `:at}
      </div>
    `}_renderShortcuts(){return this.config.shortcuts?.length?tt`
      <div class="shortcuts-section">
        <span class="shortcuts-label">Shortcuts</span>
        <div class="shortcuts-list">
          ${this.config.shortcuts.map(t=>tt`
            <lumina-chip
              .icon=${t.icon||"mdi:play-circle"}
              .label=${t.name}
              @click=${()=>this._playShortcut(t)}
            ></lumina-chip>
          `)}
        </div>
      </div>
    `:at}};ce.styles=[St,Tt,re],d([kt({attribute:!1})],ce.prototype,"hass",void 0),d([kt({attribute:!1})],ce.prototype,"config",void 0),d([Ct()],ce.prototype,"_currentPosition",void 0),d([Ct()],ce.prototype,"_activeEntityId",void 0),ce=d([xt("ha-lumina-media-card")],ce);const de=v`
  :host {
    display: block;
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
  }

  .vacuum-card {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-6);
  }

  /* ─── Hero Battery Ring ─────────────────────────── */
  .hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-4);
    padding: var(--lumina-space-4) 0;
  }

  .hero-icon ha-icon {
    --mdc-icon-size: 36px;
    color: var(--lumina-tertiary);
  }

  .hero-battery {
    font-family: var(--lumina-font-headline);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    line-height: 1;
  }

  .hero-label {
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--lumina-on-surface-variant);
    margin-top: 2px;
  }

  /* ─── Status ────────────────────────────────────── */
  .status-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-1);
    text-align: center;
  }

  .status-text {
    font-family: var(--lumina-font-headline);
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .status-detail {
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--lumina-space-2);
    padding: var(--lumina-space-1) var(--lumina-space-3);
    border-radius: var(--lumina-radius-full);
    font-size: 0.75rem;
    font-weight: 500;
    margin-top: var(--lumina-space-2);
  }

  .status-badge.cleaning {
    background: rgba(111, 251, 133, 0.12);
    color: var(--lumina-tertiary);
  }

  .status-badge.docked {
    background: rgba(133, 173, 255, 0.12);
    color: var(--lumina-primary);
  }

  .status-badge.returning {
    background: rgba(254, 203, 0, 0.12);
    color: var(--lumina-secondary);
  }

  .status-badge.error {
    background: rgba(255, 113, 108, 0.12);
    color: var(--lumina-error);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: var(--lumina-radius-full);
    background: currentColor;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* ─── Action Buttons ────────────────────────────── */
  .actions-section {
    display: flex;
    gap: var(--lumina-space-3);
    justify-content: center;
  }

  .actions-section lumina-chip {
    flex: 1;
  }

  /* ─── Fan Speed ─────────────────────────────────── */
  .fan-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .section-label {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .fan-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
  }
`,he={cleaning:"mdi:robot-vacuum",docked:"mdi:battery-charging",paused:"mdi:pause-circle",idle:"mdi:robot-vacuum-off",returning:"mdi:home",error:"mdi:alert-circle"};let ue=class extends bt{setConfig(t){if(!t.entity)throw new Error("Please define a vacuum entity");this.config={show_fan_speed:!0,show_map:!1,...t}}getCardSize(){return 5}static getConfigElement(){return document.createElement("ha-lumina-vacuum-card-editor")}static getStubConfig(){return{type:"custom:ha-lumina-vacuum-card",entity:"",show_fan_speed:!0}}get _entity(){return t(this.hass,this.config.entity)}get _state(){return this._entity?.state||"unavailable"}get _battery(){return this._entity?.attributes.battery_level||0}get _batteryColor(){return this._battery<=20?"var(--lumina-error)":this._battery<=50?"var(--lumina-secondary)":"var(--lumina-tertiary)"}get _stateLabel(){return this._state.charAt(0).toUpperCase()+this._state.slice(1).replaceAll("_"," ")}get _stateIcon(){return he[this._state]||"mdi:robot-vacuum"}get _statusBadgeClass(){const t=this._state;return"cleaning"===t?"cleaning":"docked"===t||"idle"===t?"docked":"returning"===t?"returning":"error"===t?"error":"docked"}get _fanSpeeds(){return this._entity?.attributes.fan_speed_list||[]}get _currentFanSpeed(){return this._entity?.attributes.fan_speed||""}get _statusDetail(){const t=this._entity;if(!t)return"";return t.attributes.status||""}_start(){a(this.hass,"vacuum","start",{entity_id:this.config.entity})}_pause(){a(this.hass,"vacuum","pause",{entity_id:this.config.entity})}_dock(){a(this.hass,"vacuum","return_to_base",{entity_id:this.config.entity})}_setFanSpeed(t){a(this.hass,"vacuum","set_fan_speed",{entity_id:this.config.entity,fan_speed:t})}render(){if(!this.config||!this.hass)return at;const t=this._entity;if(!t||!e(t))return tt`<div class="vacuum-card"><span class="body-md text-muted">Vacuum unavailable</span></div>`;const i="cleaning"===this._state;return tt`
      <div class="vacuum-card" style="position:relative;">
        ${Ut(this.config.image,!0)}
        <div class="lumina-3d-content">
        <!-- Hero Battery Ring -->
        <div class="hero-section">
          <lumina-ring
            .value=${this._battery}
            .size=${160}
            .strokeWidth=${4}
            color=${this._batteryColor}
            ?inactive=${!i}
          >
            <div class="hero-icon">
              <ha-icon .icon=${this._stateIcon}></ha-icon>
            </div>
            <span class="hero-battery">${this._battery}%</span>
            <span class="hero-label">Battery</span>
          </lumina-ring>
        </div>

        <!-- Status -->
        <div class="status-section">
          <span class="status-text">${this._stateLabel}</span>
          ${this._statusDetail?tt`<span class="status-detail">${this._statusDetail}</span>`:at}
          <span class="status-badge ${this._statusBadgeClass}">
            <span class="status-dot"></span>
            ${this._stateLabel}
          </span>
        </div>

        <!-- Action Buttons -->
        <div class="actions-section">
          <lumina-chip
            icon="mdi:play"
            label="Start"
            variant="tertiary"
            ?active=${i}
            @click=${this._start}
          ></lumina-chip>
          <lumina-chip
            icon="mdi:pause"
            label="Pause"
            ?active=${"paused"===this._state}
            @click=${this._pause}
          ></lumina-chip>
          <lumina-chip
            icon="mdi:home"
            label="Dock"
            ?active=${"docked"===this._state}
            @click=${this._dock}
          ></lumina-chip>
        </div>

        <!-- Fan Speed -->
        ${this.config.show_fan_speed&&this._fanSpeeds.length?tt`
              <div class="fan-section">
                <span class="section-label">Suction Power</span>
                <div class="fan-chips">
                  ${this._fanSpeeds.map(t=>tt`
                      <lumina-chip
                        .label=${t.charAt(0).toUpperCase()+t.slice(1)}
                        ?active=${this._currentFanSpeed===t}
                        size="sm"
                        @click=${()=>this._setFanSpeed(t)}
                      ></lumina-chip>
                    `)}
                </div>
              </div>
            `:at}
      </div><!-- /lumina-3d-content -->
      </div>
    `}};ue.styles=[St,Tt,de],d([kt({attribute:!1})],ue.prototype,"hass",void 0),d([kt({attribute:!1})],ue.prototype,"config",void 0),ue=d([xt("ha-lumina-vacuum-card")],ue);let pe=class extends bt{constructor(){super(...arguments),this._haLoaded=!1}setConfig(t){this._config={...t}}async connectedCallback(){super.connectedCallback(),await Wt(),this._haLoaded=!0}_dispatch(){Ft(this,this._config)}_set(t,e){this._config={...this._config,[t]:e},this._dispatch()}_toObj(t){return"string"==typeof t?{entity:t}:{...t}}_getEntityId(t){return"string"==typeof t?t:t.entity}_getEntityName(t){return"string"==typeof t?"":t.name||""}_getEntities(){return this._config.entities?.length?this._config.entities:this._config.entity?[this._config.entity]:[]}_entityChanged(t,e){const i=[...this._getEntities()],a=this._toObj(i[t]);if(a.entity=e,i[t]=a,this._set("entities",i),this._config.entity){const t={...this._config,entities:i};delete t.entity,this._config=t,this._dispatch()}}_entityNameChanged(t,e){const i=[...this._getEntities()],a=this._toObj(i[t]);a.name=e||void 0,i[t]=a,this._set("entities",i)}_addEntity(){this._set("entities",[...this._getEntities(),{entity:""}])}_removeEntity(t){const e=[...this._getEntities()];e.splice(t,1),this._set("entities",e)}_addShortcut(){this._set("shortcuts",[...this._config.shortcuts||[],{name:"",media_content_id:"",media_content_type:"music",icon:"mdi:play-circle"}])}_removeShortcut(t){const e=[...this._config.shortcuts||[]];e.splice(t,1),this._set("shortcuts",e)}_shortcutChanged(t,e,i){const a=[...this._config.shortcuts||[]];a[t]={...a[t],[e]:i},this._set("shortcuts",a)}render(){if(!this._config||!this.hass)return tt``;if(!this._haLoaded)return tt`<div class="loading">Loading editor...</div>`;const t=this._getEntities();return tt`
      <div class="editor">
        <div class="editor-section">Media Players</div>
        ${t.map((t,e)=>tt`
          <div class="entity-block">
            <div class="entity-row">
              <ha-entity-picker .hass=${this.hass} label="Player ${e+1}" .value=${this._getEntityId(t)}
                .includeDomains=${["media_player"]}
                @value-changed=${t=>this._entityChanged(e,t.detail.value)}
                allow-custom-entity></ha-entity-picker>
              <ha-icon class="remove-btn" icon="mdi:close" @click=${()=>this._removeEntity(e)}></ha-icon>
            </div>
            <ha-textfield label="Custom Name" .value=${this._getEntityName(t)}
              @input=${t=>this._entityNameChanged(e,t.target.value)}></ha-textfield>
          </div>
        `)}
        <div class="add-btn" @click=${this._addEntity}>+ Add Media Player</div>

        <div class="editor-section">Options</div>
        <div class="toggle-row">
          <span class="toggle-label">Show Source Selector</span>
          <ha-switch .checked=${!1!==this._config.show_source}
            @change=${t=>this._set("show_source",t.target.checked)}></ha-switch>
        </div>
        <div class="toggle-row">
          <span class="toggle-label">Show Progress Bar</span>
          <ha-switch .checked=${!1!==this._config.show_progress}
            @change=${t=>this._set("show_progress",t.target.checked)}></ha-switch>
        </div>
        <div class="toggle-row">
          <span class="toggle-label">Show Speaker Management</span>
          <ha-switch .checked=${!1!==this._config.show_speaker_management}
            @change=${t=>this._set("show_speaker_management",t.target.checked)}></ha-switch>
        </div>

        <div class="editor-section">Media Shortcuts</div>
        ${(this._config.shortcuts||[]).map((t,e)=>tt`
          <div class="shortcut-block">
            <div class="shortcut-row">
              <ha-textfield label="Name" .value=${t.name}
                @input=${t=>this._shortcutChanged(e,"name",t.target.value)}></ha-textfield>
              <ha-icon class="remove-btn" icon="mdi:close" @click=${()=>this._removeShortcut(e)}></ha-icon>
            </div>
            <ha-textfield label="Content ID (URI or playlist ID)" .value=${t.media_content_id}
              @input=${t=>this._shortcutChanged(e,"media_content_id",t.target.value)}></ha-textfield>
            <div class="shortcut-row">
              <ha-textfield label="Content Type" .value=${t.media_content_type}
                @input=${t=>this._shortcutChanged(e,"media_content_type",t.target.value)}></ha-textfield>
              <ha-icon-picker .hass=${this.hass} label="Icon" .value=${t.icon||""}
                @value-changed=${t=>this._shortcutChanged(e,"icon",t.detail.value||"")}></ha-icon-picker>
            </div>
          </div>
        `)}
        <div class="add-btn" @click=${this._addShortcut}>+ Add Shortcut</div>
      </div>
    `}};pe.styles=v`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-section { font-size: 1rem; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color); }
    .entity-block { background: var(--card-background-color, #1a1a1d); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
    .entity-row { display: flex; gap: 8px; align-items: center; }
    .entity-row ha-entity-picker { flex: 1; }
    .remove-btn { cursor: pointer; color: var(--error-color, #db4437); --mdc-icon-size: 20px; }
    .add-btn { cursor: pointer; color: var(--primary-color); font-size: 0.875rem; font-weight: 500; padding: 8px; }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .toggle-label { font-size: 0.875rem; font-weight: 500; }
    .shortcut-block { background: var(--card-background-color, #1a1a1d); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
    .shortcut-row { display: flex; gap: 8px; align-items: center; }
    .shortcut-row ha-textfield { flex: 1; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
    .migrate-btn { cursor: pointer; color: var(--primary-color); font-size: 0.8125rem; font-weight: 500; padding: 8px; background: var(--card-background-color, #1a1a1d); border-radius: 8px; text-align: center; }
  `,d([kt({attribute:!1})],pe.prototype,"hass",void 0),d([Ct()],pe.prototype,"_config",void 0),d([Ct()],pe.prototype,"_haLoaded",void 0),pe=d([xt("ha-lumina-media-card-editor")],pe);let me=class extends bt{constructor(){super(...arguments),this._haLoaded=!1}setConfig(t){this._config={...t}}async connectedCallback(){super.connectedCallback(),await Wt(),this._haLoaded=!0}_dispatch(){Ft(this,this._config)}_set(t,e){this._config={...this._config,[t]:e},this._dispatch()}render(){return this._config&&this.hass?this._haLoaded?tt`
      <div class="editor">
        <div class="editor-section">Vacuum Entity</div>
        <ha-entity-picker .hass=${this.hass} label="Vacuum"
          .value=${this._config.entity||""} .includeDomains=${["vacuum"]}
          @value-changed=${t=>this._set("entity",t.detail.value)}
          allow-custom-entity></ha-entity-picker>

        <div class="editor-section">Options</div>
        <div class="toggle-row">
          <span class="toggle-label">Show Fan Speed</span>
          <ha-switch .checked=${!1!==this._config.show_fan_speed}
            @change=${t=>this._set("show_fan_speed",t.target.checked)}></ha-switch>
        </div>
      </div>
    `:tt`<div class="loading">Loading editor...</div>`:tt``}};me.styles=v`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-section { font-size: 1rem; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color); }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .toggle-label { font-size: 0.875rem; font-weight: 500; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
  `,d([kt({attribute:!1})],me.prototype,"hass",void 0),d([Ct()],me.prototype,"_config",void 0),d([Ct()],me.prototype,"_haLoaded",void 0),me=d([xt("ha-lumina-vacuum-card-editor")],me);!function(){if(c)return;c=!0;const t=document.createElement("link");t.rel="stylesheet",t.href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&family=Inter:wght@400;500;600&display=swap",document.head.appendChild(t);const e=document.createElement("link");e.rel="stylesheet",e.href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined",document.head.appendChild(e)}();const ge=window;ge.customCards=ge.customCards||[],[{type:"ha-lumina-room-card",name:"Lumina Room Card",description:"Premium room card with temperature display and control indicators",preview:!0},{type:"ha-lumina-room-popup",name:"Lumina Room Popup",description:"Full room control popup with all elements in one view",preview:!0},{type:"ha-lumina-light-card",name:"Lumina Light Card",description:"Full lighting control with individual light management and scenes",preview:!0},{type:"ha-lumina-climate-card",name:"Lumina Climate Card",description:"Climate control with environmental ring and HVAC mode selection",preview:!0},{type:"ha-lumina-media-card",name:"Lumina Media Card",description:"Media player control with album art, playback, and volume ring",preview:!0},{type:"ha-lumina-vacuum-card",name:"Lumina Vacuum Card",description:"Vacuum/cleaning robot control with battery ring and actions",preview:!0}].forEach(t=>{const e=ge.customCards.some(e=>e.type===t.type);e||ge.customCards.push(t)}),console.info("%c LUMINA CARDS %c v1.0.0 ","color: #fefbfe; background: #0070eb; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #85adff; background: #19191c; font-weight: 400; padding: 2px 6px; border-radius: 0 4px 4px 0;");
