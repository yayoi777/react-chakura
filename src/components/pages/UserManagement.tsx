import { memo, useEffect, VFC, useCallback } from 'react';
import {
  Center,
  Spinner,
  Wrap,
  WrapItem,
  useDisclosure,
} from '@chakra-ui/react';

import { UserCard } from '../organisms/user/UserCard';
import { UserDetailModal } from '../organisms/user/UserDetailModal';
import { useAllUsers } from '../../hooks/useAllUsers';
import { useSelectUsers } from '../../hooks/useSelectUsers';
import { useLoginUser } from '../../hooks/useLoginUser';

export const UserManagemen: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, loading, users } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUsers();

  const { loginUser } = useLoginUser();
  console.log(loginUser);

  //getUserするのは初回の1回のみ
  useEffect(() => getUsers(), []);

  /* propsとして渡す関数は毎回再作成するとレンダリングの効率が悪いのでuseCallbackを使ってmemo化する
   *  今回の場合は、users,onSelectUser,onOpenが更新された時に再レンダリングが走るようにする。
   *  やらないとモーダルクリックした時にユーザー情報が入らない。
   */
  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    [users, onSelectUser, onOpen]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random/"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal
        isOpen={isOpen}
        onClose={onClose}
        isAdmin={loginUser?.isAdmin}
        user={selectedUser}
      />
    </>
  );
});
