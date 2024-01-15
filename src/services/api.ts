import {IUser} from '@/types';
import axiosInstance, {BLOSSOM_TOKEN_NAME, saveToken} from './config';
import {erroHandler} from '@/utils/errorHandler';

type RegisterUserTypes = IUser;

export const registerUser = async ({
  email,
  name,
  password,
}: RegisterUserTypes) => {
  try {
    const response = await axiosInstance.post('/users/create', {
      email,
      password,
      name,
    });

    return response.data.user;
  } catch (error) {
    erroHandler(error);
  }
};

type LoginUserTypes = Omit<IUser, 'name'>;

export const loginUser = async ({email, password}: LoginUserTypes) => {
  try {
    const response = await axiosInstance.post('/users/login', {
      email,
      password,
    });
    const _token = response.data.token;

    axiosInstance.defaults.headers.common.Authorization = _token;
    saveToken(BLOSSOM_TOKEN_NAME, _token);

    return response.data.user;
  } catch (error) {
    erroHandler(error);
  }
};
