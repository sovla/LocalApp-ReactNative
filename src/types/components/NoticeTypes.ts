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
