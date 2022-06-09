export type locationListItem = {
    his_idx: string;
    his_lat: string;
    his_limit: string;
    his_lng: string;
    his_location: string;
};

export type LocationListApi = {
    T: locationListItem[] | null;
    D: {
        mt_idx: string;
    };
};

export type LocationChangeApi = {
    mt_idx: string;
    mt_location?: string;
    mt_lat?: string | number;
    mt_lng?: string | number;
    mt_limit?: string | number;
};

export type LogoutAPi = {
    mt_idx: string;
};

export type KeywordListAddApi = {
    mt_idx: string;
    keyword: string;
};
