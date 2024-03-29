import {categoryMenu, tierReverseList} from '@/assets/global/dummy';
import {categoryMenuTypes, tierTypes} from '@/Types/Components/global';
import i18next, {t} from 'i18next';
import {Alert, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import Toast from 'react-native-toast-message';
import {getPixel} from './pixelChange';

export const getHitSlop = (number: number) => {
    return {
        top: number,
        left: number,
        right: number,
        bottom: number,
    };
};

export const onScrollSlide = (e: NativeSyntheticEvent<NativeScrollEvent>, setState: React.Dispatch<React.SetStateAction<number>>, width?: number) => {
    if (typeof width === 'number') {
        setState(Math.round(e.nativeEvent.contentOffset.x / width));
    } else {
        setState(Math.round(e.nativeEvent.contentOffset.x / getPixel(328)));
    }
};

export const timer = (number: number) => {
    return `${Math.floor(number / 60)}:${number % 60 < 10 ? '0' + (number % 60) : number % 60}`;
};

export const checkEmpty = (_item: any) => {
    if (_item) {
        return _item;
    }
};

export const strEmptyCheck = (_item: string | undefined | null) => {
    if (typeof _item === 'string' && _item.length > 0) {
        return true;
    } else {
        return false;
    }
};

export const AlertButton = (alertContent: string, leftButtonText: string = '확인', leftButtonPress: () => void = () => {}) => {
    Alert.alert('', alertContent, [
        {
            text: leftButtonText,
            onPress: () => leftButtonPress(),
        },
    ]);
};

export const AlertButtons = (
    alertContent: string,
    leftButtonText: string | undefined = t('confirm'),
    RightButtonText: string | undefined = t('cancle'),
    leftButtonPress: () => void,
    RightButtonPress: () => void | undefined = () => {},
) => {
    if (leftButtonText && RightButtonText)
        Alert.alert('', alertContent, [
            {
                text: leftButtonText,
                onPress: () => leftButtonPress(),
            },
            {
                text: RightButtonText,
                onPress: () => RightButtonPress(),
            },
        ]);
};

export const birthDate = (str: string) => {
    if (str.length === 2 || str.length === 5) {
        return str + '/';
    } else {
        return str;
    }
};

export const geoLanguage = (str: string) => {
    // geocoding 언어 설정
    return str === 'br' ? 'pt-BR' : str;
};

export const viewCountCheck = (count?: number | string | null) => {
    // view count 999+표시
    if (count && count > 999) {
        return '999+';
    } else if (count && count > 0) {
        return count.toString();
    } else {
        return '0';
    }
};

export const brPrice = (
    price: string,
    option?: {
        isMoney?: boolean;
        isPadding?: boolean;
    },
) => {
    option = {
        isMoney: true,
        isPadding: false,
    };

    // 가격 3자리 . 표시
    if (price.includes('R$')) {
        return price.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } else {
        return option.isMoney
            ? option.isPadding
                ? 'R$ ' + price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                : 'R$' + price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            : price.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
};

export const productTimeSetting = (time: number | string | null, timeType: 'now' | 'minute' | 'hour' | 'day' | 'month' | 'year' | null) => {
    if (!time || !timeType) {
        return '';
    }
    if (timeType === 'now') {
        return i18next.t('nowTime');
    } else if (timeType === 'minute') {
        return time + i18next.t('minuteTime');
    } else if (timeType === 'hour') {
        return time + i18next.t('hourTime');
    } else if (timeType === 'day') {
        return time + i18next.t('dayTime');
    } else if (timeType === 'year') {
        return time + '';
    } else {
        return '';
    }
};

export const dateFormat = (date: string) => {
    if (date) {
        const [year, month, day] = date.split('-');
        return `${year}. ${month}. ${day}.`;
    } else {
        return '';
    }
};

export const findCategory = (str?: categoryMenuTypes['menu'] | null) => {
    if (str) {
        const result = categoryMenu.findIndex(v => v.name === str);
        return result !== -1 ? result + 1 : undefined;
    }
};
export const reverseFindCategory = (str: string) => {
    return categoryMenu[+str - 1].name;
};

export const findTier = (str?: tierTypes['name'] | null) => {
    if (str) {
        const result = tierReverseList.findIndex(v => v.name === str);
        return result !== -1 ? `${result}` : undefined;
    }
};
export const reverseFindTier = (str: string) => {
    if (str) {
        return tierReverseList[+str].name;
    }
};

export const getOpeningTime = (arr?: {
    busi_mon_check: 'N' | 'Y';
    busi_mon_end: string;
    busi_mon_start: string;
    busi_pri_check: 'N' | 'Y';
    busi_pri_end: string;
    busi_pri_start: string;
    busi_sat_check: 'N' | 'Y';
    busi_sat_end: string;
    busi_sat_start: string;
    busi_sun_check: 'N' | 'Y';
    busi_sun_end: string;
    busi_sun_start: string;
    busi_thur_check: 'N' | 'Y';
    busi_thur_end: string;
    busi_thur_start: string;
    busi_tue_check: 'N' | 'Y';
    busi_tue_end: string;
    busi_tue_start: string;
    busi_wed_check: 'N' | 'Y';
    busi_wed_end: string;
    busi_wed_start: string;
}) => {
    const dayList: any[] = ['mon', 'tue', 'wed', 'thur', 'pri', 'sat', 'sun'];
    if (arr) {
        return dayList.map((v: 'mon' | 'tue' | 'wed' | 'thur' | 'pri' | 'sat' | 'sun') => {
            return arr[`busi_${v}_check`] === 'Y' ? `${arr[`busi_${v}_start`]}~${arr[`busi_${v}_end`]}` : '';
        });
    } else {
        return ['', '', '', '', '', '', ''];
    }
};

export const changeBirthDate = (str?: string | undefined, isBack?: boolean | undefined) => {
    if (str) {
        if (isBack) {
            const [year, month, day] = str.split('.');
            if (typeof year === 'string' && typeof month === 'string' && typeof day === 'string') {
                return `${year.replace(' ', '')}-${month.replace(' ', '')}-${day.replace(' ', '')}`;
            } else {
                return '';
            }
        } else {
            const [year, month, day] = str.split('-');
            return `${year}. ${month}. ${day}`;
        }
    } else {
        return '';
    }
};

export const apiResult = <T extends any>(res: {result: 'true' | 'false' | null; data: T; msg: string | null}) => {
    if (res?.result === 'false' && res?.msg) {
        AlertButton(res.msg);
        throw res.msg;
    } else {
        return res;
    }
};

export const refDebounce = (ref: React.MutableRefObject<null | NodeJS.Timer>, count: number, func: Function) => {
    if (ref.current) {
        clearTimeout(ref.current);
        ref.current = null;
        ref.current = setTimeout(() => {
            try {
                func();
            } catch (error) {}
        }, count);
    } else {
        ref.current = setTimeout(() => {
            try {
                func();
            } catch (error) {}
        }, count);
    }
};

export const showToastMessage = (text: string, time = 3000) => {
    Toast.show({
        type: 'customToast',
        position: 'bottom',
        text1: text,
        visibilityTime: time,
        onPress: () => {
            Toast.hide();
        },
        autoHide: true,
    });
};

export const getProductDetailNumber = (stack: {
    routes: {
        name: string;
    }[];
}): 'ProductDetail' | 'ProductDetail1' | 'ProductDetail2' | 'ProductDetail3' | 'ProductDetail4' | 'ProductDetail5' => {
    const set = new Set();
    stack.routes.forEach(v => {
        if (v.name.includes('ProductDetail')) {
            const result = v.name.split('ProductDetail')[0] === '' ? '0' : v.name.split('ProductDetail')[0];
            set.add(result);

            return;
        }
    });

    const fixArr = ['0', '1', '2', '3', '4', '5'];
    let result: any = 'ProductDetail';
    fixArr.find(v => {
        if (!set.has(v)) {
            result = v !== '0' ? 'ProductDetail' + v : 'ProductDetail';
            return result;
        }
    });
    console.log(result);
    return result;
};
