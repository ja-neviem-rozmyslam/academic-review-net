import {ConferenceDto} from '../entities/ConferenceDto';
import {MyThesis} from '../../my-theses/entities/MyThesis';
import {SelectOption} from '../../../components/arn-select/entities/SelectOption';

export interface ConferenceState {
  conferences: ConferenceDto[];
  thesisCategories: SelectOption[];
  myConferences: {
    myTheses: MyThesis[];
    myThesesForReview: MyThesis[];
  }
}
