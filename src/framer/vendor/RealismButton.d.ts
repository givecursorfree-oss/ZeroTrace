import type { ComponentType, CSSProperties } from 'react';

export type RealismButtonProps = {
  text?: string;
  buttonWidth?: number;
  buttonHeight?: number;
  radius?: number;
  borderSize?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  textColor?: string;
  hoverTextColor?: string;
  normalColor1?: string;
  normalColor2?: string;
  hoverColor1?: string;
  hoverColor2?: string;
  blueColor?: string;
  lightColor?: string;
  hoverLightColor?: string;
  glowSize?: number;
  glowOpacity?: number;
  speed?: number;
  alignX?: 'flex-start' | 'center' | 'flex-end';
  alignY?: 'flex-start' | 'center' | 'flex-end';
  hoverScale?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
};

declare const RealismButton: ComponentType<RealismButtonProps>;
export default RealismButton;
