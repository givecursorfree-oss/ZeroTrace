export function resolveMaxWidth(canvasW,spec,fallback){if(spec==null)return fallback;if(typeof spec==="number")return spec;const m=String(spec).trim().match(/^(\d+(?:\.\d+)?)%$/);if(m){const pct=Math.max(0,parseFloat(m[1])/100);return Math.max(0,canvasW*pct);}return fallback;}function wrapUniform(v){if(v&&typeof v==="object"&&"value"in v)return v;return{value:v};}export function normalizeUniforms(defaults,overrides={}){const out={};for(const[k,v]of Object.entries(defaults))out[k]=wrapUniform(v);for(const[k,v]of Object.entries(overrides))out[k]=wrapUniform(v);return out;}export function setUniform(uniforms,key,value){const slot=uniforms[key];if(!slot||typeof slot!=="object"||!("value"in slot)){uniforms[key]={value};return;}const cur=slot.value;// 复用向量/颜色，避免频繁分配
if(cur&&value){if(cur.isVector2&&value.isVector2){cur.copy(value);return;}if(cur.isVector3&&value.isVector3){cur.copy(value);return;}if(cur.isVector4&&value.isVector4){cur.copy(value);return;}if(cur.isColor&&value.isColor){cur.copy(value);return;}}slot.value=value;}export const calculatePlaneSize=(mediaWidth,mediaHeight,containerWidth,containerHeight,fitMode)=>{const mediaAspect=mediaWidth/mediaHeight;const containerAspect=containerWidth/containerHeight;let planeWidth,planeHeight;if(fitMode==="cover"){if(mediaAspect>containerAspect){planeHeight=containerHeight;planeWidth=containerHeight*mediaAspect;}else{planeWidth=containerWidth;planeHeight=containerWidth/mediaAspect;}}else if(fitMode==="contain"){if(mediaAspect>containerAspect){planeWidth=containerWidth;planeHeight=containerWidth/mediaAspect;}else{planeHeight=containerHeight;planeWidth=containerHeight*mediaAspect;}}return{width:planeWidth,height:planeHeight};};export function degToRad(degrees){return degrees*(Math.PI/180);}export function colorToRGBA(color){let actualColor=color;if(color.startsWith("var(")){const varMatch=color.match(/var\([^,]+,\s*(.+)\)$/);if(varMatch){actualColor=varMatch[1].trim();}else{console.warn("无法解析 CSS 变量:",color);return"rgba(0,0,0,1)";}}actualColor=actualColor.replace(/\s/g,"");let r,g,b,a=1;// 处理 rgb() 和 rgba() 格式
const rgbaMatch=actualColor.match(/rgba?\((\d+),(\d+),(\d+)(?:,([0-9]*\.?[0-9]+))?\)/);if(rgbaMatch){r=parseInt(rgbaMatch[1]);g=parseInt(rgbaMatch[2]);b=parseInt(rgbaMatch[3]);if(rgbaMatch[4]!==undefined){a=parseFloat(rgbaMatch[4]);}return`rgba(${r},${g},${b},${a})`;}// 处理十六进制格式 (#RGB 或 #RRGGBB)
const hexMatch=actualColor.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);if(hexMatch){const hex=hexMatch[1];if(hex.length===3){// 处理 #RGB 格式，扩展为 #RRGGBB
r=parseInt(hex[0]+hex[0],16);g=parseInt(hex[1]+hex[1],16);b=parseInt(hex[2]+hex[2],16);}else{// 处理 #RRGGBB 格式
r=parseInt(hex.substr(0,2),16);g=parseInt(hex.substr(2,2),16);b=parseInt(hex.substr(4,2),16);}return`rgba(${r},${g},${b},${a})`;}console.warn("无法解析颜色格式:",color);return"rgba(0,0,0,1)";}export function colorToVec4(color){let actualColor=color;if(color.startsWith("var(")){const varMatch=color.match(/var\([^,]+,\s*(.+)\)$/);if(varMatch){actualColor=varMatch[1].trim();}else{console.warn("无法解析 CSS 变量:",color);return[0,0,0,1];}}actualColor=actualColor.replace(/\s/g,"");let r,g,b,a=1;// 处理 rgb() 和 rgba() 格式
const rgbaMatch=actualColor.match(/rgba?\((\d+),(\d+),(\d+)(?:,([0-9]*\.?[0-9]+))?\)/);if(rgbaMatch){r=parseInt(rgbaMatch[1]);g=parseInt(rgbaMatch[2]);b=parseInt(rgbaMatch[3]);if(rgbaMatch[4]!==undefined){a=parseFloat(rgbaMatch[4]);}return[r/255,g/255,b/255,a];}// 处理十六进制格式 (#RGB 或 #RRGGBB)
const hexMatch=actualColor.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);if(hexMatch){const hex=hexMatch[1];if(hex.length===3){// 处理 #RGB 格式，扩展为 #RRGGBB
r=parseInt(hex[0]+hex[0],16);g=parseInt(hex[1]+hex[1],16);b=parseInt(hex[2]+hex[2],16);}else{// 处理 #RRGGBB 格式
r=parseInt(hex.substr(0,2),16);g=parseInt(hex.substr(2,2),16);b=parseInt(hex.substr(4,2),16);}return[r/255,g/255,b/255,a];}console.warn("无法解析颜色格式:",color);return[0,0,0,1];}export function colorToVec3(color){let actualColor=color;if(color.startsWith("var(")){const varMatch=color.match(/var\([^,]+,\s*(.+)\)$/);if(varMatch){actualColor=varMatch[1].trim();}else{console.warn("无法解析 CSS 变量:",color);return[0,0,0];}}actualColor=actualColor.replace(/\s/g,"");let r,g,b;// 处理 rgb() 和 rgba() 格式
const rgbaMatch=actualColor.match(/rgba?\((\d+),(\d+),(\d+)(?:,([0-9]*\.?[0-9]+))?\)/);if(rgbaMatch){r=parseInt(rgbaMatch[1]);g=parseInt(rgbaMatch[2]);b=parseInt(rgbaMatch[3]);return[r/255,g/255,b/255];}// 处理十六进制格式 (#RGB 或 #RRGGBB)
const hexMatch=actualColor.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);if(hexMatch){const hex=hexMatch[1];if(hex.length===3){// 处理 #RGB 格式，扩展为 #RRGGBB
r=parseInt(hex[0]+hex[0],16);g=parseInt(hex[1]+hex[1],16);b=parseInt(hex[2]+hex[2],16);}else{// 处理 #RRGGBB 格式
r=parseInt(hex.substr(0,2),16);g=parseInt(hex.substr(2,2),16);b=parseInt(hex.substr(4,2),16);}return[r/255,g/255,b/255];}console.warn("无法解析颜色格式:",color);return[0,0,0];}export const defaultVS=`
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `;export const defaultFS=`
    uniform sampler2D uTexture;
    uniform vec2 uMediaSize;
    uniform vec2 uResolution;
    varying vec2 vUv;
    void main(){ gl_FragColor = texture2D(uTexture, vUv); }
  `;export const defaultPostVS=`
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = vec4(position.xy,0.0,1.0); }
  `;export const defaultPostFS=`
    uniform sampler2D tScene;
    uniform vec2 uResolution;
    varying vec2 vUv;
    void main(){
      vec2 uv = vUv;
      float px = 1.0 / uResolution.x;
      float r = texture2D(tScene, uv + vec2(px, 0.0)).r;
      float g = texture2D(tScene, uv).g;
      float b = texture2D(tScene, uv - vec2(px, 0.0)).b;
      vec3 col = vec3(r,g,b);
      float d = distance(uv, vec2(0.5));
      float vignette = smoothstep(0.9, 0.4, d);
      col *= vignette;
      gl_FragColor = vec4(col,1.0);
    }
  `;
export const __FramerMetadata__ = {"exports":{"setUniform":{"type":"function","annotations":{"framerContractVersion":"1"}},"defaultFS":{"type":"variable","annotations":{"framerContractVersion":"1"}},"defaultPostFS":{"type":"variable","annotations":{"framerContractVersion":"1"}},"resolveMaxWidth":{"type":"function","annotations":{"framerContractVersion":"1"}},"defaultVS":{"type":"variable","annotations":{"framerContractVersion":"1"}},"colorToVec4":{"type":"function","annotations":{"framerContractVersion":"1"}},"normalizeUniforms":{"type":"function","annotations":{"framerContractVersion":"1"}},"calculatePlaneSize":{"type":"variable","annotations":{"framerContractVersion":"1"}},"defaultPostVS":{"type":"variable","annotations":{"framerContractVersion":"1"}},"colorToVec3":{"type":"function","annotations":{"framerContractVersion":"1"}},"colorToRGBA":{"type":"function","annotations":{"framerContractVersion":"1"}},"degToRad":{"type":"function","annotations":{"framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./SceneUtils.map