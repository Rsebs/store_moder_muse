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
