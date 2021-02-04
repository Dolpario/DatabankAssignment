import React,{ useState, useMemo, useCallback } from 'react';
import { Alert } from "react-native";
import { useObserver } from 'mobx-react';
import styled from 'styled-components/native';
import useStore from '../hooks/useStore';

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 20px;
`;

const TitleInputWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 20px;
`;

const TitleInput = styled.TextInput`
  border-bottom-width: 1px;
  flex: 1;
  font-size: 24px;
  font-weight: bold;
`;

const EnrollmentButton = styled.TouchableOpacity`
  width: 70px;
  background-color: #f44336;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

const EnrollmentText = styled.Text`
  font-size: 14px;
  color: white;
`;

const ContentsInput = styled.TextInput`
  width: 100%;
  text-align-vertical: top;
  flex: 1;
  font-size: 15px;
  line-height: 30px;
`;

const WriteFeedScreen = ({navigation, route}) => {
  const {feed, auth} = useStore();
  const [title, setTitle] = useState(route.params.feed ? route.params.feed.title : '')
  const [description, setDescription] = useState(route.params.feed ? route.params.feed.description : '')

  const params = useMemo(() => {
    return route.params;
  }, [route]);

  const onPressWrite = useCallback(() => {
    Alert.alert(
      'feed를 등록하시겠습니까?',
      '',
      [
        {
          text: 'OK',
          onPress: () => {
            if (title && description) {
              const _feed = feed.write({
                title: title,
                description: description,
                user: auth.user
              });
              navigation.replace('FeedDetail', { feed: _feed })
            }
            else {
              Alert.alert('제목과 내용을 입력하세요.')
            }
          },
          style: 'ok'
        },
        {
          text: 'Cancel',
          onPress: '',
          style: 'cancel'
        },
      ],
      { cancelable: false }
    );
  }, [title, description]);

  const onPressUpdate = useCallback(() => {
    Alert.alert(
      'feed를 수정하시겠습니까?',
      '',
      [
        {
          text: 'OK',
          onPress: () => {
            const _feed = {
              ...params.feed,
              title,
              description,
            };
            feed.update(params.index, _feed)
            navigation.replace('FeedDetail', { feed: _feed })
          },
          style: 'ok'
        },
        {
          text: 'Cancel',
          onPress: '',
          style: 'cancel'
        },
      ],
      { cancelable: false }
    );
  }, [title, description, params.feed, params.index]);

  const onChangeTitle = useCallback((text) => {
    setTitle(text);
  });

  const onChangeDescription = useCallback((text) => {
    setDescription(text);
  });

  return useObserver(() => (
    <>
      <Container>
        <TitleInputWrapper>
          <TitleInput placeholder={`제목을 입력해주세요`} onChangeText={onChangeTitle} value={title} />
          <EnrollmentButton onPress={params.feed && params.feed.title != null ? onPressUpdate : onPressWrite}>
            <EnrollmentText>{params.feed && params.feed.title != null ? '수정' : '등록'}</EnrollmentText>
          </EnrollmentButton>
        </TitleInputWrapper>
        <ContentsInput
            multiline
            placeholder={`내용을 입력해주세요`}
            onChangeText={onChangeDescription}
            value={description}
          />
      </Container>
    </>
  ));
};

export default WriteFeedScreen;