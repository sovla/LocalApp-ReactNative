import Theme from '@/assets/global/Theme';
import {Button, CheckBoxImage} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {useAppSelector} from '@/Hooks/CustomHook';
import {ModalReviewRequestProps} from '@/Types/Components/ProductTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import CheckEmptyIcon from '@assets/image/check_empty.png';
import {DarkBlueText, Text} from '@Components/Global/text';
import React, {Fragment, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';

const ModalReviewRequest: React.FC<ModalReviewRequestProps> = ({onClose}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const [reviewList, setReviewList] = useState<Array<any>>([1, 2, 3, 5, 1, 2, 3, 4]);
    const [selectNumber, setSelectNumber] = useState<number>(0);
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const name = 'Natalia Barulich';
    const onPressRegister = () => {
        //    수정필요 등록하기 API 추가

        setIsAlert(true);
    };
    return (
        <Modal transparent animationType="fade">
            <View style={styles.dim}>
                {isAlert ? (
                    <View style={styles.checkView}>
                        <Image source={CheckEmptyIcon} style={styles.checkImage} />
                        <Text fontSize={`${18 * fontSize}`} style={styles.textAlign}>
                            {`'${name}'` + t('ModalReviewRequestGuide1')}
                        </Text>
                        <Button content={t('confirm')} width="240px" style={{marginTop: getHeightPixel(40)}} onPress={onClose} />
                    </View>
                ) : (
                    <View style={styles.absoluteView}>
                        <View style={styles.container}>
                            <ScrollView style={styles.scrollView}>
                                <View style={styles.marginVerticalView}>
                                    <Text fontSize={`${16 * fontSize}`} medium>
                                        {t('ModalReviewRequestGuide')}
                                    </Text>
                                    <Line isGray style={{marginTop: getHeightPixel(20)}} />
                                    <TouchableOpacity style={styles.boxTouch}>
                                        <CheckBoxImage isOn={selectNumber === 0} />
                                        <View style={styles.marginLeftView}>
                                            <Text fontSize={`${14 * fontSize}`} medium>
                                                {t('ModalReviewRequestMenu')}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <Line isGray />
                                    {reviewList.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <TouchableOpacity onPress={() => setSelectNumber(index + 1)} style={styles.boxTouch}>
                                                    <CheckBoxImage isOn={selectNumber === index + 1} />
                                                    <View style={styles.marginLeftView}>
                                                        <View style={styles.imageBorderView}>
                                                            <Image source={require('@assets/image/dummy_profile.png')} style={styles.image} />
                                                        </View>
                                                        <View>
                                                            <Text fontSize={`${14 * fontSize}`}>{name}</Text>
                                                            <DarkBlueText fontSize={`${14 * fontSize}`}>마지막 대화 1분전</DarkBlueText>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                <Line isGray />
                                            </Fragment>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                            <Button
                                width="328px"
                                onPress={onPressRegister}
                                style={{
                                    marginHorizontal: getPixel(16),
                                    marginBottom: getHeightPixel(30),
                                }}
                            />
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    );
};

export default ModalReviewRequest;

const styles = StyleSheet.create({
    textAlign: {
        textAlign: 'center',
    },
    checkView: {
        width: getPixel(280),
        height: getHeightPixel(295),
        backgroundColor: Theme.color.white,
        borderRadius: getPixel(16),
        alignItems: 'center',
    },
    checkImage: {
        width: getHeightPixel(50),
        height: getHeightPixel(50),
        marginTop: getHeightPixel(40),
        marginBottom: getHeightPixel(20),
    },
    scrollView: {
        maxHeight: getHeightPixel(540),
    },
    marginVerticalView: {
        marginTop: getHeightPixel(33),
        marginHorizontal: getPixel(16),
    },
    image: {
        width: getPixel(40),
        height: getPixel(40),
    },
    imageBorderView: {
        width: getPixel(40),
        height: getPixel(40),
        borderRadius: getPixel(15),
        overflow: 'hidden',
        marginRight: getPixel(10),
    },
    marginLeftView: {
        marginLeft: getPixel(30),
        flexDirection: 'row',
        alignItems: 'center',
    },
    boxTouch: {
        height: getHeightPixel(70),
        width: getPixel(328),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: getPixel(10),
    },
    dim: {
        flex: 1,
        backgroundColor: '#0007',
        justifyContent: 'center',
        alignItems: 'center',
    },
    absoluteView: {position: 'absolute', bottom: 0, left: 0},
    container: {
        width: getPixel(360),
        backgroundColor: Theme.color.white,
        borderTopRightRadius: getPixel(20),
        borderTopLeftRadius: getPixel(20),
        overflow: 'hidden',
        minHeight: getHeightPixel(540),
    },
});
