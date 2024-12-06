export interface Submission {
  id: number;
  title: string;
  category: number;
  abstractEn: string;
  abstractSk: string;
  coauthors?: number[];
  uploadedFiles?: string[];
}
