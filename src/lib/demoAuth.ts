export const DEMO_USER_KEY = "talentNationDemoUser";
export const DEMO_AUTH_KEY = "talentNationDemoAuth";

export type DemoUser = {
  fullName: string;
  email: string;
};

export const getDemoUser = (): DemoUser | null => {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(DEMO_USER_KEY);
    return stored ? JSON.parse(stored) as DemoUser : null;
  } catch {
    return null;
  }
};

export const isDemoSignedUp = () => !!getDemoUser();

export const isDemoLoggedIn = () => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(DEMO_AUTH_KEY) === "true" && isDemoSignedUp();
};

export const signUpDemoUser = (user: DemoUser) => {
  window.localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
};

export const logInDemoUser = () => {
  window.localStorage.setItem(DEMO_AUTH_KEY, "true");
};

export const logOutDemoUser = () => {
  window.localStorage.removeItem(DEMO_AUTH_KEY);
};
