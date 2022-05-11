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
