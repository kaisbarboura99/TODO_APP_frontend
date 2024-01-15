import theme, {Box, Text} from '@/utils/theme';
import {FieldError} from 'react-hook-form';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

type InputProps = {
  label: string;
  error?: FieldError | undefined;
} & TextInputProps;

const Input = ({label, error, ...props}: InputProps) => {
  return (
    <Box flexDirection="column">
      <Text variant="textXs" textTransform="uppercase" mb="3.5">
        {label}
      </Text>
      <TextInput
        style={[
          styles.textInput,
          {
            borderColor: error ? theme.colors.rose500 : theme.colors.grey,
          },
        ]}
        {...props}
      />
      {error && (
        <Text mt="3.5" color="rose500">
          {label} is required
        </Text>
      )}
    </Box>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    padding: 16,
    borderWidth: 1,
    borderRadius: theme.borderRadii['rounded-7xl'],
  },
});
