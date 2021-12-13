import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log({e});
    return;
  }
};

export const getItem = async (key: string) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    const parsedData = storedData ? JSON.parse(storedData) : null;
    return parsedData;
  } catch (e) {
    console.log({e});
    return;
  }
};
