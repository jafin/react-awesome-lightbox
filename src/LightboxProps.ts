import { ReactNode } from "react";

export interface LightboxProps {
  startIndex?: number;
  images?: any;
  image: any;
  keyboardInteraction?: boolean;
  zoomStep?: number;
  allowZoom?: boolean;
  doubleClickZoom?: number;
  allowRotate?: boolean;
  buttonAlign?: string;
  showTitle?: boolean;
  allowReset?: boolean;
  clickOutsideToExit?: boolean;
  title?: string;
  onClose?(e: any): void;
  children?: ReactNode;
}
