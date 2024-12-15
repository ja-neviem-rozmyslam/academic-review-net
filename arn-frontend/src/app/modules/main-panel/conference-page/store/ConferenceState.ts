import {Conference} from '../entities/Conference';
import {MyThesis} from '../../my-theses/entities/MyThesis';
import {SelectOption} from '../../../components/arn-select/entities/SelectOption';

export interface ConferenceState {
  conferences: Conference[];
  thesisCategories: SelectOption[];
  myConferences: {
    myTheses: MyThesis[];
    myThesesForReview: MyThesis[];
  }
}
