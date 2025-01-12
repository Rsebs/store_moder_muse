export interface MenuComponentItems {
  label: string;
  icon: string;
  nameRoute: string;
}

// Inputs
export type InputTypes =
  | 'number'
  | 'text'
  | 'textarea'
  | 'time'
  | 'password'
  | 'email'
  | 'search'
  | 'tel'
  | 'file'
  | 'url'
  | 'date'
  | 'datetime-local';

type NameInputComponents = 'InputText';

export interface InputComponent {
  nameComponent: NameInputComponents;
  key: string;
  label?: string;
  type?: InputTypes;
  iconAppend?: string;
  dark?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  color?: string;
  labelColor?: string;
}

// Table
export interface ColumnsTable {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sort?: (a: any, b: any, rowA: any, rowB: any) => number;
  rawSort?: (a: any, b: any, rowA: any, rowB: any) => number;
  sortOrder?: 'ad' | 'da';
  format?: (val: any, row: any) => string;
  style?: string | ((row: any) => string) | undefined;
  classes?: string | ((row: any) => string) | undefined;
  headerStyle?: string;
  headerClasses?: string;
}

export interface ActionButtonTable {
  icon: string;
  color: string;
}
