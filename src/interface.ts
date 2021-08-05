export interface AjaxConfigSchema {
  method: string;
  url: string;
  data?: string;
  success(data: any): void;
  fail(): void;
}
