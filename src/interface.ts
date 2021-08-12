export type OrderBy = 'popular' | 'latest'; // todo

interface ColorSchema {
  k: number; // key
  v: string; // color value
  s: number; // like num
  l?: boolean; // is saved
}

export interface AjaxConfigSchema {
  method: string;
  url: string;
  data?: string;
  success(data: any): void;
  fail(): void;
}

export interface BoxType {
  id: number;
  color: string;
  like: number;
  isLiked: boolean;
  animDelay?: string;
  onLike: (id: number) => void;
  onUnlike: (id: number) => void;
  onRedir?: (id: number) => void;
}

interface globalAppBase {
  auth: boolean;
  load0: Date;
}
export interface ColorBrowseRoute extends globalAppBase {
  likes: number[];
  initData: ColorSchema[];
  removeWelcome: () => void;
}
export interface OneColorRoute extends globalAppBase {
  likes: number[];
  selected: ColorSchema;
}
export interface CreateColorRoute extends globalAppBase {
  defaultColors?: string;
}
export interface ProfileRoute extends globalAppBase {
  list0?: ColorSchema[];
  list1?: ColorSchema[];
}

declare global {
  interface Window {
    _colorpk:
      | ColorBrowseRoute
      | OneColorRoute
      | CreateColorRoute
      | ProfileRoute;
    CustomEvent: any;
  }
}
