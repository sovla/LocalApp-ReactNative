import axios from 'axios';
import jwt_encode from 'jwt-encode';
import jwtDecode from 'jwt-decode';
import {Platform} from 'react-native';

const SECRETKEY = 'L0FONYcvjajULdjnaKpBP';

const baseURL = 'https://dmonster1786.cafe24.com/api/';

const LOGON = true;

const formFormatter = (data: any, isIndex = true) => {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    if (Array.isArray(data[key])) {
      let index = 0;
      for (const item of data[key]) {
        if (isIndex) {
          formData.append(`${key}[${index}]`, item);
        } else {
          formData.append(`${key}[]`, item);
        }

        index++;
      }
    } else {
      formData.append(key, data[key]);
    }
  }
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

  transformRequest: (data?: object) => {
    // 보내기전 데이터 가공
    if (LOGON) console.log('formData :::', data);
    const jwt_data = jwt_encode(data, SECRETKEY);
    const result = formFormatter(
      data
        ? Object.assign(
            // 데이터가 있는경우
            {
              jwt_data,
            },
            {
              secretKey: SECRETKEY,
            },
          )
        : {
            // 데이터가 없는경우
            secretKey: SECRETKEY,
          },
    );
    console.log('formData result :::\n', result);
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
        const jwtDecodeData: any = jwtDecode(jsonParseData?.data);

        if (LOGON) console.log('API Result Success :::\n', jwtDecodeData);
        return {
          ...jsonParseData,
          data: jwtDecodeData?.data,
        };
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
