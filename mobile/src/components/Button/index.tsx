import React from 'react';
import {Pressable} from './style';
import {Text} from 'react-native';

interface IButton {
  text: string;
  onPress?: (data: any) => void;
}

export const Button: React.FC<IButton> = ({text, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={{color: '#fff', fontSize: 18}}> {text} </Text>
    </Pressable>
  );
};
