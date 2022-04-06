import {StyleSheet, Text, View} from 'react-native';
import React, {Fragment} from 'react';
import Product from './Product';
import {getPixel} from '@/Util/pixelChange';
import {ProductListProps} from '@/Types/Components/HomeTypes';
import dummy from '@assets/image/dummy.png';

const ProductList: React.FC<ProductListProps> = ({isList, list, isBorder}) => {
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
      {list.map((item, index) => {
        return (
          <Fragment key={index}>
            {!isList && (
              <View
                style={{
                  marginLeft: index % 2 === 0 ? getPixel(16) : getPixel(10),
                }}
              />
            )}

            <Product
              isLike={item > 2}
              image={dummy}
              status={item === 2 ? '예약중' : item === 3 ? '판매완료' : ''}
              viewCount="999+"
              likeCount={isBorder ? undefined : '999+'}
              price="R$ 24.00"
              time=". 50분전 "
              location="Bom Retiro . 1km이내 "
              title="13,000Pa 초강력흡입력 [샤오미] 차량용 무선 핸디 청소기"
              isList={isList}
              isBorder={isBorder}
            />
          </Fragment>
        );
      })}
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({});
