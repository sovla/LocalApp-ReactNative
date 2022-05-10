export interface NoticeProps {
  title: string;
  isNew?: boolean;
  date: string;
}

export interface AlarmContentProps {
  title: string;
  date: string;
  isDelete?: boolean;
  onPress: () => void;
}

export interface NoticeApi {
  // 공지사항 API
  T:
    | {
        new_check: 'Y' | 'N';
        nt_idx: string;
        nt_title: string;
        nt_wdate: string;
      }[]
    | null;
  D: {
    mt_idx: string;
  };
}

export interface NoticeDetailApi {
  // 공지사항 상세보기 API
  T: {
    nt_content: string;
    nt_title: string;
    nt_wdate: string;
  } | null;
  D: {
    mt_idx: string;
    nt_idx: string;
  };
}
