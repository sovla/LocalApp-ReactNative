import {AppDispatch, RootState} from '@/Store/store';
import Screen, {ProfileScreenNavigationProp} from '@/Types/Screen/Screen';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppNavigation = () =>
  useNavigation<ProfileScreenNavigationProp>();

export const useCallbackNavigation = <T extends keyof Screen>(
  path: T,
  data?: Screen[T],
) => {
  const navigation = useAppNavigation();
  const realData = {
    ...data,
  } as Screen[T];
  return useCallback(() => {
    navigation.navigate(path, realData);
  }, []);
};
