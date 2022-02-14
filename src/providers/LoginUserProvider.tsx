// ユーザーログイン情報をグローバルに管理する→Contextに保持

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

import { User } from '../types/api/user';

// &で型を繋げることで型を追加したような新しい型を生成することができる
type LoginUser = User & { isAdmin: boolean };

export type LoginUserContextType = {
  // userの型と初期値のnull
  loginUser: LoginUser | null;
  /* useState等の更新関数の型はDispatchとSetStateAction
   * DispatchにSetStateActionを渡して、その中にstateの型を定義する。
   */
  setLoginUser: Dispatch<SetStateAction<User | null>>;
};

// 初期値の型はtypescriptの「as」で強制的に「LoginUserContextType」だと認識させる。
export const LoginUserContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);

export const LoginUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);

  /**
   * 1つのコンテキストの中に入れた値は、どれかが更新されるとそれを使っているコンポーネント全て再レンダリングされる。
   * 例えば、loginUserの情報を参照するためのコンポーネントと設定するためのコンポーネントが別れていて、
   * ログインユーザーの情報が更新された時にsetLoginUserを使っているコンポーネントは再レンダリングしたくないという場合は、
   * それぞれ別のproviderで分けてあげるというのもテクニックとしてある。
   * なるべく更新事の再レンダリングを競合させたくない場合は、contextを分けていくというテクニック。
   * (今回はやってない。一つにまとめている)
   */
  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
