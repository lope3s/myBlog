import {Action} from 'easy-peasy';
import {IUser} from '../genericTypes';

export interface IKeyboardModel {
  status: boolean;
  updateStatus: Action<IKeyboardModel, boolean>;
}

export interface IUserModel {
  user: IUser;
  updateUser: Action<IUserModel, IUser>;
}

export interface IMainModel {
  userModel: IUserModel;
  keyboardModel: IKeyboardModel;
}
