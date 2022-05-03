export interface CarLocationAPi {
  // 자동차 원동기 지역 선택 API
  T: {
    cnt: number;
    list:
      | {
          lc_idx: string;
          lc_lat: string;
          lc_lng: string;
          lc_title: string;
        }[]
      | [];
  };
  D: {
    search_txt: string;
  };
}

export interface CarGearApi {
  // 자동차 기어 선택 API
  // 자동차 연식 선태 API
  T: {
    cnt: number;
    list:
      | {
          cc_idx: string;
          cc_title: string;
        }[]
      | [];
  };
  D: undefined | null;
}

export interface CarYearApi {
  // 자동차 기어 선택 API
  // 자동차 연식 선태 API
  T: {
    cnt: number;
    list:
      | {
          cc_idx: string;
          cc_title: string;
        }[]
      | [];
  };
  D: {
    search_txt: string;
  };
}
