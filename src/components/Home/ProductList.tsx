import {StyleSheet, Text, View} from 'react-native';
import React, {Fragment} from 'react';
import Product from './Product';
import {getPixel} from '@/Util/pixelChange';
import {ProductListProps} from '@/Types/Components/HomeTypes';
import {brPrice, productTimeSetting, viewCountCheck} from '@/Util/Util';
import {t} from 'i18next';

const ProductList: React.FC<ProductListProps> = ({
  isList,
  list,
  isBorder,
  onPressItem,
}) => {
  return (
    <View
      style={
        isList
          ? {}
          : {
              flexDirection: 'row',
              flexWrap: 'wrap',
            }
      }>
      {Array.isArray(list) &&
        list.map((item, index) => {
          let status = '';
          let likeCount = undefined;
          let cate = '0';
          if ('fin_status' in item) {
            status = item.fin_status === 'Y' ? '판매완료' : '예약중'; // 수정필요 t("") 로 번역 되게끔
            likeCount = viewCountCheck(item?.like_count);
            cate = item?.pt_cate ?? '0';
          }

          return (
            <Fragment key={index + 'Product'}>
              {!isList && (
                <View
                  style={{
                    marginLeft: index % 2 === 0 ? getPixel(16) : getPixel(10),
                  }}
                />
              )}

              <Product
                isLike={item.my_like === 'Y'}
                image={
                  item?.pt_file
                    ? {
                        uri: item.pt_file,
                      }
                    : require('@assets/image/none_image_m.png')
                }
                status={status}
                viewCount={viewCountCheck(item?.view_count ?? 0)}
                likeCount={isBorder ? undefined : likeCount}
                price={brPrice(item?.pt_price ?? '0')}
                time={` .  ${productTimeSetting(
                  item?.pt_time ?? 0,
                  item?.pt_time_type ?? 'now',
                )}`}
                location={`${item?.pt_location} ${
                  item?.pt_location_detail
                }  .  ${item.dist?.toFixed(0)}${t('withinDistance')}`}
                title={item?.pt_title ?? ''}
                isList={isList}
                isBorder={isBorder}
                onPress={onPressItem}
                idx={item?.pt_idx ?? '0'}
                cate={cate}
              />
            </Fragment>
          );
        })}
    </View>
  );
};

export default ProductList;
