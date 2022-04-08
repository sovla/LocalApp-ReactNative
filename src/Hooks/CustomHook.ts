import {AppDispatch, RootState} from '@/Store/store';
import {ProfileScreenNavigationProp} from '@/Types/Screen/Screen';
import {useNavigation} from '@react-navigation/native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppNavigation = () =>
  useNavigation<ProfileScreenNavigationProp>();
