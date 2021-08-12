export type OrderBy = 'popular' | 'latest'; // todo

interface ColorSchema {
  k: number; // key
  v: string; // color value
  s: number; // save num
  l: boolean; // is saved
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
  animDelay?: number;
  htmlElem: HTMLElement;
  onLike: (id: number) => void;
  onUnlike: (id: number) => void;
  onRedir?: (id: number) => void;
}

interface globalAppSchema {
  auth: boolean;
  load0: Date;
  likes: number[];
  initData?: ColorSchema[];
  selected?: ColorSchema;
  defaultColors?: string;
  list0?: ColorSchema[];
  list1?: ColorSchema[];
  removeWelcome?: () => void;
}

declare global {
  interface Window {
    _colorpk: globalAppSchema;
    CustomEvent: any;
  }
}
