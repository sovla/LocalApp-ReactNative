import React from 'react';
import {ProductDetailProps} from '@/Types/Screen/Screen';
import ProductDetail from './ProductDetail';

const ProductDetailSearch = (props: ProductDetailProps) => {
    const Product = 'Search';
    return <ProductDetail {...props} />;
};

export default ProductDetailSearch;
