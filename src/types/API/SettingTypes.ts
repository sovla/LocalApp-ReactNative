export interface getAuthNumApi {
    jct_country: string;
    jct_hp: string;
    mt_idx: string;
}

export interface sendAuthNumApi {
    jct_country: string;
    jct_hp: string;
    mt_idx: string;
    passcode: string;
}

export interface FAQApi {
    T:
        | {
              [key: string]: {
                  title: string;
                  content: string;
              };
          }[]
        | null;
    D: {
        search_txt: string;
    };
}
