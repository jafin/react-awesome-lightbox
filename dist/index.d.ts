import React from "react";
import { LightboxProps } from "./LightboxProps";
export default class Lightbox extends React.Component<LightboxProps, {}> {
    initX: number;
    initY: number;
    lastX: number;
    lastY: number;
    _cont: React.RefObject<any>;
    state: {
        x: number;
        y: number;
        zoom: number;
        rotate: number;
        loading: boolean;
        moving: boolean;
        current: number;
        multi: boolean;
    };
    createTransform: (x: number, y: number, zoom: number, rotate: number) => string;
    stopSideEffect: (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => void;
    getCurrentImage: (s: {
        x?: number;
        y?: number;
        zoom?: number;
        rotate?: number;
        loading?: boolean;
        moving?: boolean;
        current: any;
        multi: any;
    }, p: Readonly<LightboxProps>) => any;
    getCurrentTitle: (s: {
        x?: number;
        y?: number;
        zoom?: number;
        rotate?: number;
        loading?: boolean;
        moving?: boolean;
        current: any;
        multi: any;
    }, p: Readonly<LightboxProps>) => any;
    resetZoom: () => void;
    shockZoom: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => false | void;
    navigateImage: (direction: string, e: React.MouseEvent<HTMLDivElement, MouseEvent> | KeyboardEvent) => void;
    startMove: (e: React.TouchEvent<HTMLImageElement> | React.MouseEvent<HTMLImageElement, MouseEvent>) => false | undefined;
    duringMove: (e: React.MouseEvent<HTMLImageElement, MouseEvent> | React.TouchEvent<HTMLImageElement>) => false | undefined;
    endMove: (_e: any) => void;
    applyZoom: (type: string) => void;
    applyRotate: (type: string) => void;
    reset: (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => void;
    exit: (e: React.MouseEvent<HTMLDivElement, MouseEvent> | KeyboardEvent) => void;
    shouldShowReset: () => boolean;
    canvasClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    keyboardNavigation: (e: KeyboardEvent) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element | null;
}
