import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    mx: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    // Add styles for delete icon
  },
  taskInputContainer: {
    bg: 'lightGray',
    px: 4,
    py: 3.5,
    borderRadius: 'rounded-5xl',
    flexDirection: 'row',
    position: 'relative',
  },
  taskInput: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    width: '50%',
  },
  dateCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    // Add styles for date container
  },
  categoryContainer: {
    // Add styles for category container
  },
  categoryItemContainer: {
    bg: 'gray250',
    p: 2,
    // Add styles for each category item
  },
  calendarContainer: {
    // Add styles for the calendar container
  },
});

// You can continue adding more styles as needed
