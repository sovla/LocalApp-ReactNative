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
      | {
          ac_idx: string;
          ac_title: string;
        }[]
      | [];
  };
  D: undefined | null;
}

export interface CarYearApi {
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

export interface CarModelAPi {
  T: {
    cnt: number;
    list:
      | {
          cc_idx: string;
          cc_title: string;
        }[]
      | {
          ac_idx: string;
          ac_title: string;
        }[]
      | [];
  };
  D: {
    search_txt: string;
  };
}

export interface CarBrandAPi {
  T: {
    cnt: number;
    list:
      | {
          cc_idx: string;
          cc_title: string;
        }[]
      | {
          ac_idx: string;
          ac_title: string;
        }[]
      | [];
  } | null;
  D: {
    search_txt: string;
  };
}

export interface CarFuelApi {
  T: {
    cnt: number;
    list:
      | {
          cc_idx: string;
          cc_title: string;
        }[]
      | {
          ac_idx: string;
          ac_title: string;
        }[]
      | [];
  };
  D?: null;
}

export interface CarNumberApi {
  T: {
    cnt: number;
    list:
      | {
          cc_idx: string;
          cc_title: string;
        }[]
      | {
          ac_idx: string;
          ac_title: string;
        }[]
      | [];
  };
  D?: null;
}
