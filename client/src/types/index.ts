export interface User {
  id?: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface State {
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  password_confirm: string;
}
