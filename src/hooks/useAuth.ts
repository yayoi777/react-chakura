import { useMessage } from './useMessage';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { User } from '../types/api/user';
import { useLoginUser } from '../hooks/useLoginUser';

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  const { setLoginUser } = useLoginUser();

  const login = useCallback((id: string) => {
    setLoading(true);
    axios
      .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (res.data) {
          const isAdmin = res.data.id === 10 ? true : false;
          /**
           * isAdminフラグをレスポンスデータに追加したような形でsetLoginUserを更新する
           * 新しくobjectを定義するような形でisAdiminを追加で渡す
           *  スプレット構文でobjectの中身を再度設定して、そこにisAdminというプロパティにisAdminの変数を設定
           *  */
          setLoginUser({ ...res.data, isAdmin });
          showMessage({ title: 'ログインしました', status: 'success' });
          history.push('/home');
        } else {
          showMessage({ title: 'ユーザーが見つかりません', status: 'error' });
          setLoading(false);
        }
      })
      .catch(() => {
        showMessage({ title: 'ログインできません', status: 'error' });
        setLoading(false);
      });
  }, []);

  return { login, loading };
};
