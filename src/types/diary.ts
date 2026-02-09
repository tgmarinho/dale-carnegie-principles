export interface DiaryEntry {
  id: string;
  createdAt: string;
  date: string;
  principleIds: number[];
  situation: string;
  result: string;
  reflection: string;
}
