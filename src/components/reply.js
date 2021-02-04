import React, { useState, useCallback } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import useStore from "../hooks/useStore";
import {parseDate} from "../util/date";

const Container = styled.View`
  width: 100%;
  padding: 20px 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LeftWrapper = styled.View`
  flex-direction: row;
  flex: 1;
`;

const RightWrapper = styled.View`
  justify-content: flex-end;
  flex-direction: row;
`;

const InformationText = styled.Text`
  font-size: 14px;
  color: #94969b;
  padding-right: 10px;
`;

const Button = styled.TouchableOpacity`
  height: 20px;
  padding-left: 9px;
  padding-right: 9px;
  background-color: #f5f5f5;
  justify-content: center;
  margin-left: 10px;
`;

const ButtonText = styled.Text`
  font-size: 10px;
`;

const ContentsText = styled.Text`
  margin-top: 5px;
  font-size: 16px;
`;

const ContentInput = styled.TextInput`
  margin-top: 5px;
  width: 100%;
  height: 60px;
  border-color: gray;
  border-width: 1px;
`;

export default function Reply({ item, index }) {
  const { auth, reply } = useStore();
  const [contents, setContents] = useState(item.contents);
  const [editing, setEditing] = useState(false);

  const onPressCancel = useCallback(() => {
    setContents(item.contents);
    setEditing(false);
  }, []);

  const onPressEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const onPressUpdate = useCallback(() => {
    reply.update(index, { ...item, contents });
    setEditing(false);
  }, [contents]);

  const onPressRemove = useCallback(() => {
    Alert.alert(
      "댓글을 삭제하시겠습니까?",
      "",
      [
        {
          text: "OK",
          onPress: () => {
            reply.remove(index);
          },
          style: "ok",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }, []);

  return (
    <Container>
      <RowWrapper>
        <LeftWrapper>
          <InformationText>{item.user.nickname}</InformationText>
          <InformationText>{parseDate(item.date)}</InformationText>
        </LeftWrapper>
        {item.user.id == auth.user.id ? (
          <RightWrapper>
            {editing ? (
              <>
                <Button onPress={onPressUpdate}>
                  <ButtonText>완료</ButtonText>
                </Button>
                <Button onPress={onPressCancel}>
                  <ButtonText>취소</ButtonText>
                </Button>
              </>
            ) : (
              <>
                <Button onPress={onPressEdit}>
                  <ButtonText>수정</ButtonText>
                </Button>
                <Button>
                  <ButtonText onPress={onPressRemove}>삭제</ButtonText>
                </Button>
              </>
            )}
          </RightWrapper>
        ) : null}
      </RowWrapper>
      <RowWrapper>
        {editing ? (
          <ContentInput
            value={contents}
            onChangeText={setContents}
            multiline
            numberOfLines={4}
          />
        ) : (
          <ContentsText>{item.contents}</ContentsText>
        )}
      </RowWrapper>
    </Container>
  );
}
