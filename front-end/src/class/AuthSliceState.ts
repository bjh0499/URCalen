import type User from "./User";

type AuthSliceState = {
  token: string | null;
  isLoggedIn: boolean;
  user: User;
};

export default AuthSliceState;
