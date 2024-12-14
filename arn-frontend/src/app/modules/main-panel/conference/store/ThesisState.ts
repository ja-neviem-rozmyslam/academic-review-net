import {ConferenceDetail} from '../entities/ConferenceDetail';
import {SelectOption} from '../../../components/arn-select/entities/SelectOption';

export interface ThesisState {
  conferenceDetail: ConferenceDetail;
  thesisCategories: SelectOption[];
}
