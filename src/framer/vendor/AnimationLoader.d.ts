declare module '@/framer/vendor/AnimationLoader.js' {
  import type { CSSProperties, ComponentType } from 'react';

  export type AnimationLoaderProps = {
    brandName?: string;
    counterDuration?: number;
    background?: string;
    textColor?: string;
    transition?: {
      delay?: number;
      duration?: number;
      ease?: number[];
      type?: string;
    };
    style?: CSSProperties;
    width?: number | string;
    height?: number | string;
  };

  const AnimationLoader: ComponentType<AnimationLoaderProps>;
  export default AnimationLoader;
}
