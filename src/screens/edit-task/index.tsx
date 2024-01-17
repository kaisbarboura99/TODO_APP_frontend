import NavigateBack from '@/components/shared/navigate-back';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import {Box, Text, Theme} from '@/utils/theme';
import React, {useState} from 'react';
import {FlatList, Pressable, TextInput} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useTheme} from '@shopify/restyle';
import {isToday, format} from 'date-fns';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {HomeStackParamList} from '@/navigation/types';
import Loader from '@/components/shared/loader';
import axiosInstance, {fetcher} from '@/services/config';
import {ICategory, ITask} from '@/types';
import useSWR, {useSWRConfig} from 'swr';
import useSWRMutation from 'swr/mutation';
import {Calendar} from 'react-native-calendars';
import {today} from '@/components/tasks/task-actions';
import {errorHandler} from '@/utils/errorHandler';
import {styles} from './editTaskScreen.styles';

type EditTaskRouteType = RouteProp<HomeStackParamList, 'EditTask'>;

const updateTaskRequest = async (url: string, {arg}: {arg: ITask}) => {
  try {
    return await axiosInstance.put(`${url}/${arg._id}`, {
      ...arg,
    });
  } catch (error) {
    errorHandler(error);
  }
};

const deleteTaskRequest = async (url: string, {arg}: {arg: {id: string}}) => {
  try {
    return await axiosInstance.delete(`${url}/${arg.id}`);
  } catch (error) {
    errorHandler(error);
  }
};

const EditTaskScreen = () => {
  const theme = useTheme<Theme>();

  const route = useRoute<EditTaskRouteType>();

  const navigation = useNavigation();

  const {trigger} = useSWRMutation('tasks/edit', updateTaskRequest);
  const {trigger: triggerDelete} = useSWRMutation('tasks/', deleteTaskRequest);

  const {task} = route.params;

  const [updatedTask, setUpdatedTask] = useState(task);

  const {mutate} = useSWRConfig();

  const [isSelectingCategory, setIsSelectingCategory] =
    useState<boolean>(false);
  const [isSelectingDate, setIsSelectingDate] = useState<boolean>(false);

  const {data: categories, isLoading} = useSWR<ICategory[]>(
    'categories',
    fetcher,
  );

  const deleteTask = async () => {
    try {
      await triggerDelete({
        id: task._id,
      });
      await mutate('tasks/');
      navigation.goBack();
    } catch (error) {
      errorHandler(error);
    }
  };

  const updateTask = async () => {
    try {
      if (updateTask.name.length.toString().trim().length > 0) {
        await trigger({...updatedTask});
        await mutate('tasks/');
        navigation.goBack();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  if (isLoading || !categories) {
    return <Loader />;
  }

  const selectedCategory = categories?.find(
    _category => _category._id === updatedTask.categoryId,
  );

  return (
    <SafeAreaWrapper>
      <Box style={styles.container}>
        <Box style={styles.header}>
          <NavigateBack />
          <Pressable onPress={deleteTask}>
            <MaterialCommunityIcons
              name="delete"
              size={24}
              color={theme.colors.rose500}
            />
          </Pressable>
        </Box>

        <Box height={20} />

        <Box style={styles.taskInputContainer}>
          <TextInput
            placeholder="Create a new task"
            style={styles.taskInput}
            maxLength={36}
            textAlignVertical="center"
            value={updatedTask.name}
            onChangeText={text => {
              setUpdatedTask(prev => {
                return {
                  ...prev,
                  name: text,
                };
              });
            }}
            onSubmitEditing={updateTask}
          />
          <Box style={styles.dateCategoryContainer}>
            <Pressable
              onPress={() => {
                setIsSelectingDate(prev => !prev);
              }}>
              <Box
                flexDirection="row"
                alignContent="center"
                bg="white"
                p="2"
                borderRadius="rounded-xl">
                <Text>
                  {isToday(new Date(updatedTask.date))
                    ? 'Today'
                    : format(new Date(updatedTask.date), 'MMM dd')}
                </Text>
              </Box>
            </Pressable>
            <Box width={12} />
            <Pressable
              onPress={() => {
                setIsSelectingCategory(prev => !prev);
              }}>
              <Box
                bg="white"
                flexDirection="row"
                alignItems="center"
                p="2"
                borderRadius="rounded-xl">
                <Box
                  width={12}
                  height={12}
                  borderRadius="rounded"
                  borderWidth={2}
                  mr="1"
                  style={{
                    borderColor: selectedCategory?.color.code,
                  }}
                />
                <Text
                  style={{
                    color: selectedCategory?.color.code,
                  }}>
                  {selectedCategory?.name}
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>

        {isSelectingCategory && (
          <Box style={styles.categoryListContainer}>
            <FlatList
              data={categories}
              renderItem={({item}) => {
                return (
                  <Pressable
                    onPress={() => {
                      setUpdatedTask(prev => {
                        return {
                          ...prev,
                          categoryId: item._id,
                        };
                      });
                      setIsSelectingCategory(false);
                    }}>
                    <Box style={styles.categoryItemContainer}>
                      <Box flexDirection="row">
                        <Text>{item.icon.symbol}</Text>
                        <Text
                          ml="2"
                          fontWeight={
                            updatedTask.categoryId === item._id ? '700' : '400'
                          }>
                          {item.name}
                        </Text>
                      </Box>
                    </Box>
                  </Pressable>
                );
              }}
            />
          </Box>
        )}
        {isSelectingDate && (
          <Box style={styles.calendarContainer}>
            <Calendar
              minDate={format(today, 'Y-MM-dd')}
              onDayPress={day => {
                setIsSelectingDate(false);
                const selectedDate = new Date(day.dateString).toISOString();

                setUpdatedTask(prev => {
                  return {
                    ...prev,
                    date: selectedDate,
                  };
                });
              }}
            />
          </Box>
        )}
      </Box>
    </SafeAreaWrapper>
  );
};

export default EditTaskScreen;
