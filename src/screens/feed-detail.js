import React, { useMemo, useState, useCallback } from "react";
import { Alert } from "react-native";
import { useObserver } from "mobx-react";
import styled from "styled-components/native";
import useStore from "../hooks/useStore";
import {parseDate} from "../util/date";
import Reply from "../components/reply";

const Container = styled.View`
  width: 100%;
  height: 100%;
`;

const Content = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 20px;
`;

const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0;
`;

const InfomationWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const InfomationText = styled.Text`
  font-size: 14px;
  color: #94969b;
  padding-right: 10px;
`;

const DescriptionText = styled.Text`
  font-size: 15px;
  line-height: 30px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  padding: 0 10px 20px;
  margin-bottom: 20px;
`;

const ReplyTitleText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const ReplyRowWrapper = styled.View`
  width; 100%;
  height: 100px;
  flex-direction: row;
  margin-top: 10px; 
  margin-bottom: 70px;
`;

const ReplyInput = styled.TextInput`
  flex: 1;
  border: 1px solid lightgray;
`;

const EnrollmentButton = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: lightgray;
  justify-content: center;
  align-items: center;
`;

const EnrollmentText = styled.Text`
  font-size: 15px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;
`;

const Button = styled.TouchableOpacity`
  height: 20px;
  padding-left: 9px;
  padding-right: 9px;
  background-color: #f5f5f5;
  justify-content: center;
  margin-right: 10px;
`;

const ButtonText = styled.Text`
  font-size: 10px;
`;

const FeedDetailScreen = ({ navigation, route }) => {
  const { reply, auth, feed } = useStore();
  const [replyContents, setReplyContents] = useState("");

  const params = useMemo(() => {
    return route.params;
  }, [route]);

  const parsedDate = useMemo(() => {
    return params.feed && params.feed.date ? parseDate(params.feed.date) : '';
  }, [params.feed]);

  const onPressWrite = useCallback(() => {
    reply.write({
      feedId: params.feed.id,
      user: auth.user,
      contents: replyContents,
    });
    setReplyContents("");
  });

  const onPressUpdate = useCallback(() => {
    navigation.navigate("WriteFeed", { feed: params.feed, index: params.index });
  });

  const onPressRemove = useCallback(() => {
    Alert.alert(
      "feed를 삭제하시겠습니까?",
      "",
      [
        {
          text: "OK",
          onPress: () => {
            feed.remove(params.index);
            navigation.goBack();
          },
          style: "ok",
        },
        {
          text: "Cancel",
          onPress: "",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  });

  return useObserver(() => (
    <>
      <Container>
        <Content>
          <TitleText>{params.feed.title}</TitleText>
          <InfomationWrapper>
            <InfomationText>{params.feed.user.nickname}</InfomationText>
            <InfomationText>
              {parsedDate}
            </InfomationText>
            {auth.user &&
            params.feed.user &&
            auth.user.id == params.feed.user.id ? (
              <ButtonWrapper>
                <Button onPress={onPressUpdate}>
                  <ButtonText>수정</ButtonText>
                </Button>
                <Button onPress={onPressRemove}>
                  <ButtonText>삭제</ButtonText>
                </Button>
              </ButtonWrapper>
            ) : null}
          </InfomationWrapper>
          <DescriptionText>{params.feed.description}</DescriptionText>
          <ReplyTitleText>댓글</ReplyTitleText>
          {reply.list.map((item, index) => {
            if (item.feedId == params.feed.id)
              return <Reply item={item} index={index} key={index} />;
          })}
          <ReplyRowWrapper>
            <ReplyInput
              multiline
              numberOfLines={4}
              onChangeText={setReplyContents}
              value={replyContents}
            />
            <EnrollmentButton onPress={onPressWrite}>
              <EnrollmentText>등록</EnrollmentText>
            </EnrollmentButton>
          </ReplyRowWrapper>
        </Content>
      </Container>
    </>
  ));
};

export default FeedDetailScreen;
