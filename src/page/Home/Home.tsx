import {View, ScrollView, Modal} from 'react-native';
import React, {useState} from 'react';
import Header from '@/Components/Home/Header';
import CategoryScroll from '@/Components/Home/CategoryScroll';
import HomeList from '@/Components/Home/HomeList';
import Theme from '@/assets/global/Theme';
import Footer from '@/Components/Home/Footer';
import Location from '@/Components/Modal/Location';
import ProductList from '@/Components/Home/ProductList';

export default function Home(): JSX.Element {
  const [isList, setIsList] = useState(false);
  const [isModal, setIsModal] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: Theme.color.whiteGray}}>
      <Header isModal={isModal} setIsModal={setIsModal} />
      <ScrollView>
        <CategoryScroll key="CategoryScroll" />
        <HomeList
          key="HomeList"
          location="Bom Retiro"
          isList={isList}
          setIsList={setIsList}
        />

        <ProductList isList={isList} list={[1, 2, 3, 4, 5]} />
      </ScrollView>
      <Footer />
      {isModal && (
        <Modal
          animationType="slide"
          transparent
          style={{flex: 1, backgroundColor: '#0006'}}
          onRequestClose={() => setIsModal(false)}>
          <Location setIsModal={setIsModal} />
        </Modal>
      )}
    </View>
  );
}
