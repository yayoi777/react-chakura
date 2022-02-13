import { useState, useCallback } from 'react';
import axios from 'axios';

import { User } from '../types/api/user';
import { useMessage } from './useMessage';

export const useAllUsers = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState<boolean>(false); //型推論できるので<boolean>はつけなくてもOK
  const [users, setUsers] = useState<Array<User>>([]); //初期値→空配列入れる

  const getUsers = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<User>>('https://jsonplaceholder.typicode.com/users')
      .then((res) => setUsers(res.data))
      .catch(() =>
        showMessage({ title: 'ユーザー取得に失敗しました', status: 'error' })
      )
      .finally(() => setLoading(false));
  }, []);
  return { getUsers, loading, users };
};
