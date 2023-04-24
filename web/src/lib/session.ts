import { IronSessionOptions } from 'iron-session';

export type User = {
  isLoggedIn: boolean;
  username: string;
};

export const sessionOptions: IronSessionOptions = {
  cookieName: 'pavestones.olacathedral.org',
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
  password: process.env.SECRET as string,
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
  }
}
