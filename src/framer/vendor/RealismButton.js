import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';

/** Framer RealismButton — https://framer.com/m/RealismButton-w6I6iS.js */
export default function RealismButton(props) {
  const {
    text,
    buttonWidth,
    buttonHeight,
    radius,
    borderSize,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    textColor,
    hoverTextColor,
    normalColor1,
    normalColor2,
    hoverColor1,
    hoverColor2,
    blueColor,
    lightColor,
    hoverLightColor,
    glowSize,
    glowOpacity,
    speed,
    alignX,
    alignY,
    hoverScale,
    fullWidth = false,
    disabled = false,
    onClick,
  } = props;

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const innerRadius = Math.max(radius - borderSize, 0);
  const resolvedWidth = fullWidth ? '100%' : buttonWidth;
  const ringSize = Math.max(fullWidth ? 320 : buttonWidth, buttonHeight) * 2.4;
  const activeLight = hover ? hoverLightColor : lightColor;
  const isInteractive = !disabled;

  return /*#__PURE__*/ _jsxs('div', {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: alignY,
      justifyContent: alignX,
      overflow: 'visible',
    },
    children: [
      /*#__PURE__*/ _jsx('style', {
        children: `
                    @keyframes realismButtonLight {
                        from { transform: translate(-50%, -50%) rotate(0deg); }
                        to { transform: translate(-50%, -50%) rotate(360deg); }
                    }
                `,
      }),
      /*#__PURE__*/ _jsxs('button', {
        type: 'button',
        disabled,
        onClick: isInteractive ? onClick : undefined,
        onMouseEnter: isInteractive ? () => setHover(true) : undefined,
        onMouseLeave: isInteractive
          ? () => {
              setHover(false);
              setActive(false);
            }
          : undefined,
        onMouseDown: isInteractive ? () => setActive(true) : undefined,
        onMouseUp: isInteractive ? () => setActive(false) : undefined,
        style: {
          position: 'relative',
          width: resolvedWidth,
          height: buttonHeight,
          flexShrink: 0,
          padding: borderSize,
          border: 'none',
          borderRadius: radius,
          cursor: disabled ? 'not-allowed' : 'pointer',
          overflow: 'hidden',
          isolation: 'isolate',
          boxSizing: 'border-box',
          opacity: disabled ? 0.92 : 1,
          background: hover
            ? `radial-gradient(circle 90px at 80% -20%, ${hoverLightColor}, ${hoverColor2} 64%)`
            : `radial-gradient(circle 90px at 80% -20%, #ffffff, ${normalColor2} 64%)`,
          transform: active ? 'scale(0.97)' : hover ? `scale(${hoverScale})` : 'scale(1)',
          transition:
            'transform 0.25s cubic-bezier(.2,.8,.2,1), background 0.3s ease, opacity 0.3s ease',
        },
        children: [
          /*#__PURE__*/ _jsx('div', {
            style: {
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: ringSize,
              height: ringSize,
              borderRadius: '50%',
              background: `conic-gradient(
                            transparent 0deg,
                            transparent 58deg,
                            ${activeLight} 96deg,
                            #ffffff 114deg,
                            ${activeLight} 132deg,
                            transparent 170deg,
                            transparent 360deg
                        )`,
              opacity: hover && isInteractive ? 1 : 0,
              animation: isInteractive
                ? `realismButtonLight ${speed}s linear infinite`
                : 'none',
              transition: 'opacity 0.25s ease',
              zIndex: 0,
              pointerEvents: 'none',
            },
          }),
          /*#__PURE__*/ _jsx('div', {
            style: {
              position: 'absolute',
              left: -38,
              bottom: -44,
              width: 110,
              height: 110,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${activeLight}, ${blueColor}, transparent 70%)`,
              filter: `blur(${glowSize}px)`,
              opacity: hover && isInteractive ? glowOpacity + 0.16 : glowOpacity,
              transition: 'opacity 0.25s ease',
              zIndex: 1,
              pointerEvents: 'none',
            },
          }),
          /*#__PURE__*/ _jsxs('div', {
            style: {
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '100%',
              borderRadius: innerRadius,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxSizing: 'border-box',
              fontFamily,
              fontSize,
              fontWeight,
              letterSpacing,
              color: hover && isInteractive ? hoverTextColor : textColor,
              lineHeight: 1,
              whiteSpace: 'nowrap',
              background: hover
                ? `
                                radial-gradient(circle 90px at 0% 100%, ${hoverLightColor}, transparent 58%),
                                radial-gradient(circle 140px at 50% 50%, ${hoverColor1}, ${hoverColor2} 72%)
                              `
                : `
                                radial-gradient(circle 90px at 0% 100%, ${lightColor}, transparent 58%),
                                radial-gradient(circle 90px at 80% -45%, ${normalColor1}, ${normalColor2} 68%)
                              `,
              boxShadow: hover
                ? `
                                inset 0 1px 0 rgba(255,255,255,0.28),
                                inset 0 -1px 0 rgba(0,0,0,0.55),
                                inset 0 0 22px ${hoverLightColor}
                            `
                : `
                                inset 0 1px 0 rgba(255,255,255,0.22),
                                inset 0 -1px 0 rgba(0,0,0,0.55)
                            `,
              transition: 'background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
            },
            children: [
              /*#__PURE__*/ _jsx('div', {
                style: {
                  position: 'absolute',
                  left: -32,
                  bottom: -38,
                  width: 95,
                  height: 95,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${activeLight}, ${blueColor}, transparent 72%)`,
                  filter: `blur(${glowSize * 0.45}px)`,
                  opacity: hover && isInteractive ? 0.38 : 0.14,
                  transition: 'opacity 0.25s ease',
                  pointerEvents: 'none',
                },
              }),
              /*#__PURE__*/ _jsx('div', {
                style: {
                  position: 'absolute',
                  top: 0,
                  right: 12,
                  width: '54%',
                  height: 1,
                  borderRadius: 999,
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.75), rgba(255,255,255,0.95))',
                  opacity: hover && isInteractive ? 1 : 0.7,
                  pointerEvents: 'none',
                },
              }),
              /*#__PURE__*/ _jsx('span', {
                style: {
                  position: 'relative',
                  zIndex: 2,
                  textShadow:
                    hover && isInteractive
                      ? `0 0 ${Math.max(glowSize * 0.6, 6)}px ${hoverLightColor}`
                      : 'none',
                  transition: 'text-shadow 0.25s ease',
                },
                children: text,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

RealismButton.defaultProps = {
  text: 'Button',
  buttonWidth: 156,
  buttonHeight: 58,
  radius: 18,
  borderSize: 2,
  fontFamily: 'Inter, sans-serif',
  fontSize: 22,
  fontWeight: 700,
  letterSpacing: -0.4,
  textColor: '#FFFFFF',
  hoverTextColor: '#FFFFFF',
  normalColor1: '#777777',
  normalColor2: '#0F1111',
  hoverColor1: '#006BFF',
  hoverColor2: '#06152E',
  blueColor: '#005BFF',
  lightColor: 'rgba(0,225,255,0.35)',
  hoverLightColor: '#00E5FF',
  glowSize: 18,
  glowOpacity: 0.28,
  speed: 1.8,
  alignX: 'center',
  alignY: 'center',
  hoverScale: 1.03,
  fullWidth: false,
  disabled: false,
};

addPropertyControls(RealismButton, {
  text: { type: ControlType.String, title: 'Text' },
  buttonWidth: {
    type: ControlType.Number,
    title: 'Width',
    min: 80,
    max: 600,
    step: 1,
    unit: 'px',
  },
  buttonHeight: {
    type: ControlType.Number,
    title: 'Height',
    min: 32,
    max: 240,
    step: 1,
    unit: 'px',
  },
  radius: { type: ControlType.Number, title: 'Radius', min: 0, max: 120, step: 1, unit: 'px' },
  borderSize: { type: ControlType.Number, title: 'Border', min: 1, max: 10, step: 1, unit: 'px' },
  fontFamily: {
    type: ControlType.Enum,
    title: 'Font',
    options: [
      'Inter, sans-serif',
      'Arial, sans-serif',
      'Helvetica, sans-serif',
      'Manrope, sans-serif',
      'Poppins, sans-serif',
      'Montserrat, sans-serif',
      'Plus Jakarta Sans, sans-serif',
      'Space Grotesk, sans-serif',
      'Georgia, serif',
    ],
    optionTitles: [
      'Inter',
      'Arial',
      'Helvetica',
      'Manrope',
      'Poppins',
      'Montserrat',
      'Plus Jakarta',
      'Space Grotesk',
      'Georgia',
    ],
  },
  fontSize: { type: ControlType.Number, title: 'Font Size', min: 8, max: 80, step: 1, unit: 'px' },
  fontWeight: {
    type: ControlType.Enum,
    title: 'Weight',
    options: [300, 400, 500, 600, 700, 800, 900],
    optionTitles: ['Light', 'Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold', 'Black'],
  },
  letterSpacing: {
    type: ControlType.Number,
    title: 'Letter',
    min: -5,
    max: 10,
    step: 0.1,
    unit: 'px',
  },
  textColor: { type: ControlType.Color, title: 'Text' },
  hoverTextColor: { type: ControlType.Color, title: 'Hover Text' },
  normalColor1: { type: ControlType.Color, title: 'Normal 1' },
  normalColor2: { type: ControlType.Color, title: 'Normal 2' },
  hoverColor1: { type: ControlType.Color, title: 'Hover 1' },
  hoverColor2: { type: ControlType.Color, title: 'Hover 2' },
  blueColor: { type: ControlType.Color, title: 'Blue Glow' },
  lightColor: { type: ControlType.Color, title: 'Normal Light' },
  hoverLightColor: { type: ControlType.Color, title: 'Hover Light' },
  glowSize: { type: ControlType.Number, title: 'Glow', min: 0, max: 100, step: 1, unit: 'px' },
  glowOpacity: {
    type: ControlType.Number,
    title: 'Glow Opacity',
    min: 0,
    max: 1,
    step: 0.01,
  },
  speed: { type: ControlType.Number, title: 'Speed', min: 0.4, max: 8, step: 0.1 },
  alignX: {
    type: ControlType.Enum,
    title: 'Align X',
    options: ['flex-start', 'center', 'flex-end'],
    optionTitles: ['Left', 'Center', 'Right'],
  },
  alignY: {
    type: ControlType.Enum,
    title: 'Align Y',
    options: ['flex-start', 'center', 'flex-end'],
    optionTitles: ['Top', 'Center', 'Bottom'],
  },
  hoverScale: {
    type: ControlType.Number,
    title: 'Hover Scale',
    min: 1,
    max: 1.2,
    step: 0.01,
  },
});
