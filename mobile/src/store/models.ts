import {IUserModel, IUser, IMainModel, IKeyboardModel} from '../Types';
import {action} from 'easy-peasy';

const keyboardModel: IKeyboardModel = {
  status: false,
  updateStatus: action((state, payload) => {
    state.status = payload;
  }),
};

const userModel: IUserModel = {
  user: {} as IUser,
  updateUser: action((state, payload) => {
    state.user = payload;
  }),
};

const mainModel: IMainModel = {
  userModel,
  keyboardModel,
};

export default mainModel;
