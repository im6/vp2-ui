interface ColorSchema {
  k: number; // key
  v: string; // color value
  s: number; // like num
  l?: boolean; // is saved
}

export type AjaxMethod = 'GET' | 'POST' | 'DELETE';

export interface AjaxConfigSchema {
  method: AjaxMethod;
  url: string;
  data?: any;
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

interface AppBase {
  auth: boolean;
  load0: Date;
}
export interface ColorBrowseRoute extends AppBase {
  likes: number[];
  initData: ColorSchema[];
  removeWelcome: () => void;
}
export interface OneColorRoute extends AppBase {
  likes: number[];
  selected: ColorSchema;
}
export interface CreateColorRoute extends AppBase {
  defaultColors?: string;
}
export interface ProfileRoute extends AppBase {
  list0: ColorSchema[];
  list1: ColorSchema[];
}
export interface AdminRoute extends AppBase {
  sync: () => void;
  approve: (a: number) => void;
  disapprove: (a: number) => void;
}

declare global {
  interface Window {
    _colorpk:
      | AdminRoute
      | ColorBrowseRoute
      | OneColorRoute
      | CreateColorRoute
      | ProfileRoute;
    CustomEvent: any;
  }
}
