export enum USER_TYPE {
  NULL,
  SUPERUSER,
  ADMIN,
  REGULAR,
}

export interface CurrentUser {
  id: number, name: string, email: string, usertype: number, dinas: { id: number, name: string }
}

export interface Admin {
  email: string,
  dinasId: number,
  dinas: string,
}

export interface User {
  id: number, name: string, email: string, nik: string
}