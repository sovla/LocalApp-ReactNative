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
