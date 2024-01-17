import {BASE_URL} from '@/services/config';
import {ICategory, IColor, IIcon} from '@/types';
import {errorHandler} from '@/utils/errorHandler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {useSWRConfig} from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  CreateCategoryRouteTypes,
  createCategoryRequest,
  deleteCategoryRequest,
  updateCategoryRequest,
} from '@/services/category';
import {getColors, getIcons} from '@/utils/helpers';

const useCreateCategory = () => {
  const navigation = useNavigation();

  const route = useRoute<CreateCategoryRouteTypes>();

  const isEditing = route.params.category ? true : false;

  const {trigger, isMutating} = useSWRMutation(
    'categories/create',
    createCategoryRequest,
  );

  const {trigger: updateTrigger} = useSWRMutation(
    'categories/update',
    updateCategoryRequest,
  );

  const {trigger: deleteTrigger} = useSWRMutation(
    'categories/',
    deleteCategoryRequest,
  );

  const {mutate} = useSWRConfig();

  const COLORS = getColors();
  const ICONS = getIcons();
  const [newCategory, setNewCategory] = useState<
    Omit<ICategory, '_id' | 'user' | 'isEditable'>
  >({
    name: route.params.category?.name ?? '',
    color: route.params.category?.color ?? COLORS[0],
    icon: route.params.category?.icon ?? ICONS[0],
  });

  const createNewCategory = async () => {
    try {
      if (isEditing) {
        const updatedCategoryItem = {
          ...route.params.category,
          ...newCategory,
        };

        await updateTrigger({
          ...updatedCategoryItem,
        });
      } else {
        await trigger({
          ...newCategory,
        });
      }
      await mutate(`${BASE_URL}categories`);
      navigation.goBack();
    } catch (error) {
      errorHandler(error);
    }
  };

  const updateColor = (color: IColor) => {
    setNewCategory(prev => {
      return {
        ...prev,
        color,
      };
    });
  };
  const updateIcon = (icon: IIcon) => {
    setNewCategory(prev => {
      return {
        ...prev,
        icon,
      };
    });
  };

  const deleteCategory = async () => {
    try {
      if (isEditing && route.params.category?._id)
        await deleteTrigger({
          id: route.params.category?._id,
        });
      await mutate(`${BASE_URL}categories`);
      navigation.goBack();
    } catch (error) {
      errorHandler(error);
    }
  };

  return {
    deleteCategory,
    isEditing,
    updateColor,
    updateIcon,
    createNewCategory,
    isMutating,
    newCategory,
    setNewCategory,
  };
};

export default useCreateCategory;
