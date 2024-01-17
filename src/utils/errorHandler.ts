import Toast from 'react-native-toast-message';

export const errorHandler = (error: Error): void => {
  // Log the error to the console
  // eslint-disable-next-line no-console
  console.error(error.message);

  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: error.message,
    position: 'top',
    visibilityTime: 5000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });

  return;
};
