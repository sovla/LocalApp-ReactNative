import {View, Image, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import Header from '@/Components/LoginSignUp/Header';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@/Components/Global/text';
import StarIcon from '@/Components/Profile/StarIcon';
import Line from '@/Components/Global/Line';
import Review from '@/Components/Profile/Review';
import Theme from '@/assets/global/Theme';
import useApi from '@/Hooks/useApi';
import {ProfileSellerReviewProps} from '@/Types/Screen/Screen';
import {ProfileSellerReviewApi} from '@/Types/API/ProfileTypes';

export default function ProfileSellerReview({
  route: {params},
  navigation,
}: ProfileSellerReviewProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {user} = useAppSelector(state => state);

  const [reviewList, setReviewList] = useState<Array<any>>([1, 2, 3, 4, 5]);

  const {data} = useApi<
    ProfileSellerReviewApi['T'],
    ProfileSellerReviewApi['D']
  >(null, 'sell_profile_review.php', {
    mt_idx: user.mt_idx as string,
    sell_type: params.sell_type,
    sell_idx: params.sell_idx,
  });
  return (
    <View style={{flex: 1}}>
      <Header title={t('profileHomeSellerReviews') + ' 15개'} />

      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.starView}>
              <Text
                fontSize={`${40 * fontSize}`}
                medium
                style={styles.starText}>
                4.6
              </Text>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon isEmpty marginRight={0} />
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Line backgroundColor={Theme.color.gray} />
              <GrayText style={{marginVertical: getHeightPixel(20)}}>
                최근 6개월 기준
              </GrayText>
            </View>
          </>
        }
        data={data?.list}
        contentContainerStyle={{
          marginHorizontal: getPixel(16),
        }}
        renderItem={({item, index}) => {
          return (
            <Review
              image={require('@assets/image/dummy.png')}
              name="done"
              review="Ótimo vendedor, entrega ultra rápida.
          Atendeu as expectativas"
              date="08. 09. 2021"
              star={index * 1.2}
              key={index}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  starText: {
    marginRight: getPixel(16),
  },
  starView: {
    height: getHeightPixel(110),
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
