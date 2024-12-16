import { Submission } from "../../conference/entities/Submission";

export interface MyThesis extends Submission {
  isClosed: boolean;
}
