export const vertexShader=`
    varying vec2 vUv;
    
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;export const fragmentShader=`
    uniform sampler2D uTexture;
    uniform float uDistortion;
    varying vec2 vUv;

    void main() {
        // 将纹理坐标转换到以中心为原点的坐标系统 (-1 到 1)
        vec2 centeredCoord = vUv * 2.0 - 1.0;

        // 计算到中心的距离
        float distance = length(centeredCoord);

        // 计算径向扭曲强度 - 现在完全基于 uDistortion
        float radialDistortion = uDistortion * 0.3 * distance;

        // 添加正弦波扭曲 - 现在也基于 uDistortion
        float waveFrequency = 3.0 + uDistortion * 2.0;  // 频率随distortion变化
        float waveAmplitude = 0.08 * abs(uDistortion); // 波浪强度基于distortion绝对值
        float sineDistortion = sin(centeredCoord.y * waveFrequency + centeredCoord.x * 1.5) *
                              waveAmplitude *
                              (1.0 - distance * 0.7);  // 距离衰减

        // 创建向外或向内的径向扭曲效果（取决于uDistortion的正负）
        vec2 distortionVector = normalize(centeredCoord) * radialDistortion;

        // 组合两种扭曲效果
        distortionVector.x += sineDistortion;
        distortionVector.y += sineDistortion * 0.5; // Y方向稍微减弱

        // 应用扭曲效果，转回0-1范围
        vec2 finalCoord = (centeredCoord + distortionVector) * 0.5 + 0.5;

        // 确保纹理坐标在有效范围内
        finalCoord = clamp(finalCoord, 0.0, 1.0);

        // 采样纹理并输出颜色
        vec4 color = texture2D(uTexture, finalCoord);

        gl_FragColor = color;
    }
`;export const passVertexShader=`
    varying vec2 vUv;
    
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;export const passFragmentShader=`
    precision highp float;

    uniform sampler2D tScene;
    uniform vec2 uResolution;
    varying vec2 vUv;

    uniform float uBurn;
    uniform float uDensity;
    uniform float uSoftness;  
    uniform float uDispersion; 
    uniform vec4 uEdgeColor; 
    uniform bool uInvertMask;
    uniform vec4 uMaskColor;
    uniform bool uTransparent;

    // Pseudo-random function
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    // 2D noise function
    vec2 hash(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }

    float noise(vec2 p) {
        const float K1 = 0.366025404;
        const float K2 = 0.211324865;
        
        vec2 i = floor(p + (p.x + p.y) * K1);
        vec2 a = p - i + (i.x + i.y) * K2;
        vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec2 b = a - o + K2;
        vec2 c = a - 1.0 + 2.0 * K2;
        
        vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
        vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
        
        return dot(n, vec3(70.0));
    }

    vec3 sRGBToLinear(vec3 color) {
        return pow(color, vec3(2.2));
    }

    vec3 linearTosRGB(vec3 color) {
        return pow(color, vec3(1.0 / 2.2));
    }

    // 色散效果函数
    vec3 getDispersedColor(sampler2D tex, vec2 uv, vec2 direction, float strength) {
        // 更简单的RGB色散，避免偏色
        float dispersionR = strength * 0.5;   // 红色偏移
        float dispersionG = strength * 0.0;   // 绿色中心（无偏移）
        float dispersionB = strength * -0.5;  // 蓝色负偏移
        
        // 采样RGB三个通道的不同偏移位置
        float r = texture2D(tex, uv + direction * dispersionR).r;
        float g = texture2D(tex, uv + direction * dispersionG).g;
        float b = texture2D(tex, uv + direction * dispersionB).b;
        
        return vec3(r, g, b);
    }

    void main() {
        // 获取前一个后处理步骤的渲染结果
        vec4 originalColor = texture2D(tScene, vUv);
        
        vec4 texColor = uMaskColor;
        texColor.rgb = sRGBToLinear(texColor.rgb);
        
        vec2 center = vec2(0.5, 0.5);
        float dist = distance(vUv, center);
        
        float noiseFactor = noise(vUv * 10.0 * uDensity) * 0.2;
        // 简化燃烧阈值计算，只使用 uBurn
        float burnThreshold = max(0.0, min(1.0, uBurn + uBurn * 0.1 + noiseFactor));
        
        // 使用 uSoftness 控制边缘硬度
        float edgeWidth = max(0.0, uSoftness * 0.2);  // 根据 uSoftness 调整边缘宽度
        float innerEdge = burnThreshold;
        float outerEdge = burnThreshold + edgeWidth;
        float burnEdge = smoothstep(innerEdge, outerEdge, 1.0 - dist);
        
        // 根据 uInvertMask 反转 burnEdge
        burnEdge = uInvertMask ? burnEdge : 1.0 - burnEdge;

        // 计算色散效果
        vec3 dispersedColor = originalColor.rgb;
        if (uDispersion > 0.0) {
            // 计算从中心向外的方向向量
            vec2 center = vec2(0.5, 0.5);
            vec2 direction = normalize(vUv - center);
            
            // 使用 burnEdge 直接作为色散遮罩（不反转），并使用 uSoftness 控制边缘
            float dispersionEdgeWidth = max(0.01, uSoftness * 0.3);
            float edgeMask = smoothstep(0.0, dispersionEdgeWidth, burnEdge);
            float dispersionStrength = uDispersion * 0.01 * edgeMask;
            
            if (dispersionStrength > 0.0) {
                dispersedColor = getDispersedColor(tScene, vUv, direction, dispersionStrength);
            }
        }

        // 使用 vec4 的 uEdgeColor，支持透明度
        vec4 edgeColorWithAlpha = uEdgeColor;
        edgeColorWithAlpha.rgb = sRGBToLinear(edgeColorWithAlpha.rgb);
        
        // 确保边缘完全不透明
        vec3 finalColor = mix(edgeColorWithAlpha.rgb, texColor.rgb, burnEdge);
        float maskAlpha = mix(0.0, texColor.a, burnEdge);
        
        // 应用边缘颜色的透明度
        maskAlpha *= edgeColorWithAlpha.a;
        
        // 在边缘处让alpha值直接为0，避免半透明过渡
        if (burnEdge < 0.01) {
            maskAlpha = 0.0;
        }
        
        // 应用全局alpha过渡
        maskAlpha *= smoothstep(0.0, 0.1, 1.1);
        
        finalColor = linearTosRGB(finalColor);
        
        if (uTransparent) {
            // 透明模式：遮罩部分完全透明，显示背后的内容
            vec3 blendedColor = dispersedColor; // 只使用原始场景颜色（包含色散效果）
            float finalAlpha = originalColor.a * (1.0 - maskAlpha); // 遮罩区域完全透明
            gl_FragColor = vec4(blendedColor, finalAlpha);
        } else {
            // 原始模式：正常混合燃烧效果和原始场景
            vec3 blendedColor = mix(dispersedColor, finalColor, maskAlpha);
            gl_FragColor = vec4(blendedColor, originalColor.a);
        }
    }
`;
export const __FramerMetadata__ = {"exports":{"vertexShader":{"type":"variable","annotations":{"framerContractVersion":"1"}},"passVertexShader":{"type":"variable","annotations":{"framerContractVersion":"1"}},"passFragmentShader":{"type":"variable","annotations":{"framerContractVersion":"1"}},"fragmentShader":{"type":"variable","annotations":{"framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./Shader.map