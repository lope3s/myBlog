import {IUserModel, IUser, IMainModel} from '../Types';
import {action} from 'easy-peasy';

const userModel: IUserModel = {
  user: {} as IUser,
  updateUser: action((state, payload) => {
    state.user = payload;
  }),
};

const mainModel: IMainModel = {
  userModel,
};

export default mainModel;
