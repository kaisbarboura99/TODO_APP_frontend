import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {},
  input: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    width: '50%',
  },
  dateCategoryContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  dateContainer: {},
  categoryContainer: {},
  calendarContainer: {},
  categoryListContainer: {
    alignItems: 'flex-end',
    my: 4,
    justifyContent: 'flex-end',
  },
  categoryItemContainer: {
    bg: 'gray250',
    p: 2,
  },
});
