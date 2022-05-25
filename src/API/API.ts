import axios from 'axios';
import i18next from 'i18next';
import jwt_encode from 'jwt-encode';
import {Platform} from 'react-native';

const SECRETKEY = 'AAAAUV9vLXY:APA91bHklBUTeYmzfdYLVhpYEa8irZKGWSq8PXQkD6nMXSkreECmUr_-iFhy7ZJauagMU7w8GgkdjbF5i2IPrEx-W6JGeHYBBp1NNvd73H34IqUBUNvCdS0wj1ZXs__CRjh_j1NikOPP';

const JWT_TOKEN = 'L0FONYcvjajULdjnaKpBP';

const baseURL = 'https://dmonster1786.cafe24.com/api/';

const LOGON = true;

const formFormatter = (data: any, isIndex = false) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((v, i) => {
                formData.append(`${key}[${isIndex ? i : ''}]`, v);
            });
        } else {
            formData.append(key, value);
        }
    });
    return formData;
};

export const API = axios.create({
    baseURL: baseURL,
    timeout: 3000,
    timeoutErrorMessage: '시간초과',
    headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
        'Cache-Control': 'no-cache',
        'Accept-Encoding': 'gzip, deflate',
        'cache-control': 'no-cache',
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
    },

    transformRequest: (data?: any | {imageField?: string}) => {
        // 보내기전 데이터 가공
        let cloneData = data; // 데이터 복사
        let imageData; // 이미지 데이터 넣을 변수
        if (!cloneData?.lang?.length) {
            cloneData = {
                ...cloneData,
                lang: i18next.language,
            };
        }
        console.log('formData :::', cloneData);
        if (typeof data?.imageField === 'string') {
            // 이미지 필드에 문자열 하나만 있는 경우
            const field = data.imageField; // 해당 필드명
            console.log('field:::', field);

            let cloneData = Object.assign({}, data);
            //  객체복사
            delete cloneData[field];
            //  이미지 제외

            if (Array.isArray(data[field])) {
                // 배열인 경우
                imageData = [];
                for (const item of data[field]) {
                    if (!item?.mime) {
                        continue;
                    }
                    imageData.push({
                        //  하나의 배열에 푸쉬
                        key: 'image' + new Date().getTime(),
                        uri: Platform.OS === 'android' ? item.path : item.path.replace('file://', ''),
                        type: item?.mime,
                        name: 'auto.jpg',
                    });
                }
            } else {
                const item = data[field];
                if (item?.mime) {
                    imageData = {
                        key: 'image' + new Date().getTime(),
                        uri: Platform.OS === 'android' ? item.path : item.path.replace('file://', ''),
                        type: item?.mime,
                        name: 'auto.jpg',
                    };
                }
            }
        }
        const jwt_data = jwt_encode(cloneData, SECRETKEY);
        const result = formFormatter(
            data
                ? imageData
                    ? Object.assign(
                          // 이미지 데이터+ 데이터가 있는경우
                          {
                              jwt_data,
                              [data.imageField]: imageData, // 기본
                          },
                          {
                              debug_jwt: JWT_TOKEN,
                          },
                      )
                    : Object.assign(
                          // 데이터가 있는경우
                          {
                              jwt_data,
                          },
                          {
                              debug_jwt: JWT_TOKEN,
                          },
                      )
                : {
                      // 데이터가 없는경우
                      debug_jwt: JWT_TOKEN,
                  },
        );
        if (LOGON) console.log('formData result :::\n', result);
        return result;
    },
    transformResponse: (data?: string) => {
        // 받을때 데이터 가공
        if (!data) {
            return null;
        }
        try {
            const jsonParseData = JSON.parse(data);

            if (jsonParseData.result === 'true') {
                // const jwtDecodeData: any = jwtDecode(jsonParseData?.data);

                if (LOGON) console.log('API Result Success :::\n', jsonParseData);
                return jsonParseData;
            } else {
                if (LOGON) console.log('API Result Failed :::', jsonParseData);
                return jsonParseData;
            }
        } catch (error) {
            if (LOGON) {
                console.log('API Error :::', error);
                console.log('API ErrorData :::', data);
            }

            return error;
        }
    },
});

// export const ImageAPI = async (
//   data: Object,
//   field: string,
//   url: string,
//   isIndex = false,
//   isArray = true,
// ) => {
//   // 이미지 API 2022-01-05 16:40:31 Junhan
//   //  data = args , field 이미지가 들어갈 이름

//   try {
//     if (LOGON) console.log('data :::', data);

//     let cloneData = Object.assign({}, data);
//     //  객체복사
//     delete cloneData[field];
//     //  이미지 부분제거

//     const jwt_data = jwt_encode(cloneData, SECRETKEY);
//     //  이미지 제외 데이터 JWTEncode

//     let imageResultObject = {};
//     let imageResult = [];
//     let index = 1;

//     if (data[field]) {
//       //  데이터 필드에 값이있다면
//       if (Array.isArray(data[field])) {
//         //   배열이라면
//         for (const imageItem of data[field]) {
//           // for문
//           !isIndex
//             ? imageResult.push({
//                 //  아닌경우 하나의 배열에 푸쉬
//                 key: 'poto' + new Date().getTime(),
//                 uri:
//                   Platform.OS === 'android'
//                     ? imageItem.path
//                     : imageItem.path.replace('file://', ''),
//                 type: imageItem.mime,
//                 name: 'auto.jpg',
//               })
//             : Object.assign(imageResultObject, {
//                 [`${field}${index}`]: {
//                   //  isIndex 값이 있을경우 mt_img1,mt_img2,mt_img3으로 들어감

//                   key: 'poto' + new Date().getTime(),
//                   uri:
//                     Platform.OS === 'android'
//                       ? imageItem.path
//                       : imageItem.path.replace('file://', ''),
//                   type: imageItem.mime,
//                   name: 'auto.jpg',
//                 },
//               });

//           index++;
//         }
//       } else {
//         //  배열이 아니라 하나의 객체에 들어있다면
//         const imageItem = data[field];
//         imageResult = {
//           key: 'poto' + new Date().getTime(),
//           uri:
//             Platform.OS === 'android'
//               ? imageItem?.path
//               : imageItem?.path.replace('file://', ''),
//           type: imageItem.mime,
//           name: 'auto.jpg',
//         };
//       }
//     }
//     const formData = !isIndex
//       ? formFormatter(
//           {
//             jwt_data,
//             secretKey: SECRETKEY,
//             [`${field}`]: imageResult,
//           },
//           isArray,
//         )
//       : formFormatter({
//           jwt_data,
//           secretKey: SECRETKEY,
//           ...imageResultObject,
//         });
//     if (LOGON) console.log('formData:::', formData);
//     const response = await axios.post(`${baseURL}${url}`, formData, {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     });
//     if (LOGON) console.log('response:::', response);

//     return response;
//   } catch (error) {
//     if (LOGON) console.log('API Error :::', error);
//   }
// };
