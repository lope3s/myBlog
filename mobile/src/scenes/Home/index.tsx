import React, {ReactElement, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {IUserModel, IMainModel} from '../../Types';
import {useQuery, useLazyQuery} from '@apollo/client';
import {GET_ALL_POSTS, LIKE_A_POST_QUERY} from '../../GraphQueries/homeQueries';
import {
  Container,
  PostCards,
  ContentBox,
  CardHeader,
  CardFooter,
} from './style';
import PersonIcon from 'react-native-vector-icons/Ionicons';
import CommentIcon from 'react-native-vector-icons/Octicons';
import LikeIcon from 'react-native-vector-icons/AntDesign';

const Home: React.FC = () => {
  const {user} = useStoreState<IMainModel, IUserModel>(
    state => state.userModel,
  );
  const [like, lazyQueryValues] = useLazyQuery(LIKE_A_POST_QUERY);
  const {data, loading, error, refetch} = useQuery(GET_ALL_POSTS);

  useEffect(() => {}, []);

  if (error) {
    console.log({error});
  }

  if (data) {
    console.log(data);
  }

  const renderItem = ({item: {content, user, _id, likes}}: any) => {
    return (
      <PostCards>
        <CardHeader>
          <PersonIcon name="person-circle-outline" size={50} color="#fff" />
          <Text style={{marginLeft: 10}}>{user.userName}</Text>
        </CardHeader>
        <ContentBox>{content}</ContentBox>
        <CardFooter>
          <CommentIcon name="comment-discussion" size={30} color="#fff" />
          <LikeIcon
            name="like2"
            size={30}
            color={likes.includes(user._id) ? '#0f0' : '#fff'}
            style={{marginLeft: 10}}
            onPress={() => {
              like({variables: {postId: _id}});
              refetch();
            }}
          />
        </CardFooter>
      </PostCards>
    );
  };

  return (
    <Container data={data ? data.getAllPosts : []} renderItem={renderItem} />
  );
};

export default Home;
