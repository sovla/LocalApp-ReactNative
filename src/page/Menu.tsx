import {ScrollView} from 'react-native';
import React from 'react';
import {RouterSetting} from './Router';
import {Button} from '@/Components/Global/button';
import {API} from '@/API/API';

export default function Menu(props: {navigation: {navigate: (arg0: string) => any}}) {
    const onPressTest = () => {
        API.post('member_join.php', {
            //debug_jwt:{{jwt}}
            mt_country: '55',
            mt_hp: '01088085754',
            mt_app_token: 'azxczxcqwdsad',
            mt_name: 'kyoujin',
            mt_birth: '1993-07-20',
            mt_gender: 'M',
            mt_email: 'test@naver.com',
            mt_memo: '상태메세지입니다',
            mt_marketing: 'Y',
        })
            .catch(err => console.log(err))
            .then(res => {
                console.log(res);
            });
    };
    return (
        <ScrollView style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
            <Button onPress={onPressTest}></Button>
            {RouterSetting.map(v => {
                return <Button key={v.name} width={'150px'} content={v.name} onPress={() => props.navigation.navigate(v.name)} />;
            })}
        </ScrollView>
    );
}
