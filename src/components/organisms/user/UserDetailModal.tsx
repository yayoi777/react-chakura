import { memo, VFC, useState, useEffect, ChangeEvent } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Stack,
  Input,
  ModalFooter,
} from '@chakra-ui/react';

import { User } from '../../../types/api/user';
import { PrimaryButton } from '../../atoms/button/PrimaryButton';

type Props = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
};

export const UserDetailModal: VFC<Props> = memo((props) => {
  const { user, isOpen, isAdmin = false, onClose } = props;

  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  /**
   * inputのvalueの値をstate経由で渡す
   * コンポーネントがレンダリングされた時に、渡ってきたuserの値でset関数(setUserName等)をよんであげて、
   * stateを初期値として更新し、そのstateをvalueに設定するとinputとして入力を変更できる値が設定できる。
   *   →初期表示時にset関数を呼ぶ
   */
  useEffect(() => {
    //undefinedの場合もある→undefinedの時はカラ文字をセット
    setUserName(user?.username ?? '');
    setName(user?.name ?? '');
    setEmail(user?.email ?? '');
    setPhone(user?.phone ?? '');
  }, [user]); //←渡されるuser情報が更新される度に実行

  const onChageUserName = (e: ChangeEvent<HTMLInputElement>) =>
    setUserName(e.target.value);
  const onChageName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChageEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChagePhone = (e: ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);

  const onClickUpdate = () => alert();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>ユーザー詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>名前</FormLabel>
              {/**
               * nullの可能性があるので?をつける
               * isAdmin=falseの時だけisReadOnlyになる
               */}
              <Input
                value={userName}
                onChange={onChageUserName}
                isReadOnly={!isAdmin}
              />
            </FormControl>
            <FormControl>
              <FormLabel>フルネーム</FormLabel>
              <Input
                value={name}
                onChange={onChageName}
                isReadOnly={!isAdmin}
              />
            </FormControl>
            <FormControl>
              <FormLabel>MaIL</FormLabel>
              <Input
                value={email}
                onChange={onChageEmail}
                isReadOnly={!isAdmin}
              />
            </FormControl>
            <FormControl>
              <FormLabel>TEL</FormLabel>
              <Input
                value={phone}
                onChange={onChagePhone}
                isReadOnly={!isAdmin}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        {/** isAdminがtrueの時だけModalFooter返す */}
        {isAdmin && (
          <ModalFooter>
            <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
});
