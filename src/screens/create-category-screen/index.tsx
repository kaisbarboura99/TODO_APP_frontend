import Button from '@/components/shared/button';
import NavigateBack from '@/components/shared/navigate-back';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import {getColors, getIcons} from '@/utils/helpers';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Box, Text, Theme} from '@/utils/theme';
import React from 'react';
import {Pressable, StyleSheet, TextInput} from 'react-native';

import {useTheme} from '@shopify/restyle';
import useCreateCategory from '../../hooks/useCreateCategory';

const COLORS = getColors();
const ICONS = getIcons();

const CreateCategoryScreen = () => {
  const {
    deleteCategory,
    isEditing,
    updateColor,
    updateIcon,
    createNewCategory,
    setNewCategory,
    newCategory,
  } = useCreateCategory();
  const theme = useTheme<Theme>();

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <NavigateBack />
          {isEditing && (
            <Pressable onPress={deleteCategory}>
              <MaterialCommunityIcons
                name="delete"
                size={24}
                color={theme.colors.rose500}
              />
            </Pressable>
          )}
        </Box>
        <Box height={16} />
        <Box bg="gray250" borderRadius="rounded-2xl">
          <TextInput
            style={styles.input}
            value={newCategory.name}
            maxLength={36}
            placeholder="Create new list"
            placeholderTextColor={theme.colors.gray5}
            onChangeText={text => {
              setNewCategory(prev => {
                return {
                  ...prev,
                  name: text,
                };
              });
            }}
          />
        </Box>
        <Box height={24} />
        <Box bg="gray250" p="4" borderRadius="rounded-2xl">
          <Box
            bg="white"
            width={80}
            p="2"
            mb="4"
            borderRadius="rounded-2xl"
            alignItems="center">
            <Text
              variant="textBase"
              fontWeight="600"
              //@ts-ignore
              color={String(newCategory.color.name)}>
              Colors
            </Text>
          </Box>

          <Box flexDirection="row" justifyContent="space-evenly">
            {COLORS.map(_color => {
              return (
                <Pressable
                  key={_color.id}
                  onPress={() => {
                    updateColor(_color);
                  }}>
                  <Box
                    style={{
                      backgroundColor: _color.code,
                    }}
                    width={24}
                    height={24}
                    borderRadius="rounded-2xl"
                  />
                </Pressable>
              );
            })}
          </Box>
        </Box>

        <Box height={24} />

        <Box bg="gray250" p="4" borderRadius="rounded-2xl">
          <Box
            bg="white"
            width={60}
            p="2"
            mb="4"
            borderRadius="rounded-2xl"
            alignItems="center">
            <Text
              variant="textBase"
              fontWeight="600"
              // @ts-ignore
              color={newCategory.color.name}>
              {newCategory.icon.symbol}
            </Text>
          </Box>

          <Box flexDirection="row" justifyContent="space-evenly">
            {ICONS.map(icon => {
              return (
                <Pressable
                  key={icon.id}
                  onPress={() => {
                    updateIcon(icon);
                  }}>
                  <Box width={24} height={24} borderRadius="rounded-2xl">
                    <Text>{icon.symbol}</Text>
                  </Box>
                </Pressable>
              );
            })}
          </Box>
        </Box>
        <Box position="absolute" bottom={4} left={0} right={0}>
          <Button
            label={isEditing ? 'Edit category' : 'Create new Category'}
            onPress={createNewCategory}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateCategoryScreen;
const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    lineHeight: 26,
    padding: 16,
  },
});
