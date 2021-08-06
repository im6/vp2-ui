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

interface globalAppSchema {
  auth: boolean;
  load0: Date;
  likes: number[];
  initData?: ColorSchema[];
  selected?: ColorSchema;
  defaultColors?: string;
  list0?: ColorSchema[];
  list1?: ColorSchema[];
}

declare global {
  interface Window {
    _colorpk: globalAppSchema;
    CustomEvent: any;
  }
}
