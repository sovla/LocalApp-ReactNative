import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loading: React.FC<{
    isAbsolute?: boolean;
    backgroundColor?: string;
}> = ({isAbsolute, backgroundColor = '#0000'}) => {
    return (
        <>
            {isAbsolute ? (
                <View
                    style={{
                        width: getPixel(360),
                        height: getHeightPixel(740),
                        position: 'absolute',
                        backgroundColor: backgroundColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 100,
                    }}>
                    <ActivityIndicator size={getPixel(30)} />
                </View>
            ) : (
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ActivityIndicator size={getPixel(30)} />
                </View>
            )}
        </>
    );
};

export default Loading;

const styles = StyleSheet.create({});
