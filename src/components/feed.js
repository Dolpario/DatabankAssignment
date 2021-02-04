import React, { useCallback } from "react";
import styled from "styled-components/native";
import {parseDate} from "../util/date";

const ContentWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 140px;
  padding: 10px 20px;
  background-color: white;
  border-radius: 5px;
  margin: 5px 0;
`;

const RowWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const TitleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  flex: 1;
`;

const DateText = styled.Text`
  font-size: 10px;
`;

const DescriptionText = styled.Text`
  font-size 15px;
  flex: 1;
`;

const NickNameText = styled.Text`
  font-size: 16px;
  color: gray;
  text-align: right;
  flex: 1;
`;

export default function Feed({ item, index, navigation }) {
  const onPress = useCallback(() => {
    navigation.navigate("FeedDetail", { feed: item, index: index });
  }, [item, index]);

  return (
    <ContentWrapper onPress={onPress}>
      <RowWrapper>
        <TitleText>{item.title}</TitleText>
        <DateText>{parseDate(item.date)}</DateText>
      </RowWrapper>
      <DescriptionText numberOfLines={1} ellipsizeMode="tail">
        {item.description}
      </DescriptionText>
      <RowWrapper>
        <NickNameText>{item.user.nickname}</NickNameText>
      </RowWrapper>
    </ContentWrapper>
  );
}
