import Cookies from "js-cookie";

export const cookieStorage = {
  getItem: (name: string) => {
    return Cookies.get(name) || null;
  },
  setItem: (name: string, value: string) => {
    Cookies.set(name, value, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
  },
  removeItem: (name: string) => {
    Cookies.remove(name);
  },
};
