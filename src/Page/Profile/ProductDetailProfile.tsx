import React from 'react';
import {ProductDetailProps} from '@/Types/Screen/Screen';
import ProductDetail from '../Home/ProductDetail';

const ProductDetailProfile = (props: ProductDetailProps) => {
    const Product = 'Profile';
    return <ProductDetail {...props} />;
};

export default ProductDetailProfile;
