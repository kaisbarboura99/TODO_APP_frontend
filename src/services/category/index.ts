import {ICategoryRequest} from '@/types';
import axiosInstance from '../config';
import {errorHandler} from '@/utils/errorHandler';
import {RouteProp} from '@react-navigation/native';
import {CategoriesStackParamList} from '@/navigation/types';

const createCategoryRequest = async (
  url: string,
  {arg}: {arg: ICategoryRequest},
) => {
  try {
    await axiosInstance.post(url, {
      ...arg,
    });
  } catch (error) {
    errorHandler(error);
  }
};
const updateCategoryRequest = async (
  url: string,
  {arg}: {arg: ICategoryRequest},
) => {
  try {
    await axiosInstance.put(url, {
      ...arg,
    });
  } catch (error) {
    errorHandler(error);
  }
};

const deleteCategoryRequest = async (
  url: string,
  {arg}: {arg: {id: string}},
) => {
  try {
    await axiosInstance.delete(`${url}/${arg.id}`);
  } catch (error) {
    errorHandler(error);
  }
};

type CreateCategoryRouteTypes = RouteProp<
  CategoriesStackParamList,
  'CreateCategory'
>;

export {
  createCategoryRequest,
  deleteCategoryRequest,
  updateCategoryRequest,
  CreateCategoryRouteTypes,
};
