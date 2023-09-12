import AsyncStorage from '@react-native-async-storage/async-storage';

export const readAllFromAsyncStorage = async (): Promise<{ [key: string]: any }> => {
  let allKeys: readonly string[] = [];
  let allData: { [key: string]: any } = {};

  try {
    allKeys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.error('Failed to fetch all keys from AsyncStorage:', e);
    return {};
  }

  try {
    const resultArray = await AsyncStorage.multiGet(allKeys);
    allData = resultArray.reduce<{ [key: string]: any }>((acc, [key, value]) => {
      if (key !== null && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});
  } catch (e) {
    console.error('Failed to fetch values for all keys:', e);
  }

  return allData;
};
