import {useAppSelector} from '@/Hooks/CustomHook';
import {SexPickerProps} from '@/Types/Components/ProfileTypes';
import {Picker} from '@react-native-picker/picker';
import React, {forwardRef} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

const SexPicker = forwardRef<any, SexPickerProps>((props, ref) => {
    const {select, setSelect} = props;
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View
            style={{
                display: 'none',
            }}>
            <Picker ref={ref} enabled focusable selectedValue={select} onValueChange={(itemValue, itemIndex) => setSelect(itemValue as 'M' | 'W')}>
                {list.map(v => (
                    <Picker.Item key={v.label} label={t(v.label)} value={v.value} />
                ))}
            </Picker>
        </View>
    );
});

const list = [
    {label: 'man', value: 'M'},
    {label: 'woman', value: 'W'},
];

export default SexPicker;
