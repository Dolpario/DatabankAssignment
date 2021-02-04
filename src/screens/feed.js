import React, { useCallback } from 'react';
import { useObserver } from 'mobx-react';
import styled from 'styled-components/native';
import Feed from '../components/feed'
import useStore from '../hooks/useStore';

const Container = styled.View`
  width: 100%;
  height: 100%;
`;

const Content = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  width: 50px;
  height: 50px;
  bottom: 25px;
  right: 25px;
  border-radius: 50px;
  background-color: #bdc3c7;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 30px;
  color: white;
`;

const FeedScreen = ({ navigation }) => {
  const { feed } = useStore();

  const onPressFloating = useCallback(() => {
    navigation.navigate('WriteFeed', {});
  }, []);

  return useObserver(() => (
    <Container>
      <Content>
        {feed.list.map((item, index) => <Feed
          key={index}
          item={item}
          index={index}
          navigation={navigation}
        />)}
      </Content>
      <FloatingButton onPress={onPressFloating}>
        <ButtonText>+</ButtonText>
      </FloatingButton>
    </Container>
  ));
};

export default FeedScreen;