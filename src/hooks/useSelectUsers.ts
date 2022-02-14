import { useCallback, useState } from 'react';
import { User } from './../types/api/user';

type Props = {
  id: number;
  users: Array<User>;
  onOpen: () => void;
};

// 選択したユーザー情報を特定しモーダルを表示するカスタムフック
export const useSelectUsers = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onSelectUser = useCallback((props: Props) => {
    const { id, users, onOpen } = props;
    const targetUser = users.find((user) => user.id === id);
    /*＊
      findで見つからない場合はundefinedが返る→型が一致しない。<User | null>
      回避方法は3つ。
        ① setSelectedUser(targetUser ?? null) → targetUserが見つからない場合はnullを返す
        ② setSelectedUser(targetUser)の前(この部分で)targetUserが見つからない場合はアラートを出す処理を実施
        ③ この例のようにudndefinedの可能性がない場合→setSelectedUser(targetUser!) 「!」でundefinedの可能性が無いことをコンパイラに伝える。
          (typescriptの書き方。こっちから明示的に絶対あると伝える方法)
          これは慎重に使う必要あり。→自分の判断でtypescriptを無視していく感じになるので絶対にある時のみ使う。
    **/
    setSelectedUser(targetUser!);
    onOpen();
  }, []);
  return { onSelectUser, selectedUser };
};
