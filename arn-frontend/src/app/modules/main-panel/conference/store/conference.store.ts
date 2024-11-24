import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {ConferenceState} from './ConferenceState';

@Injectable()
export class ConferenceStore extends ComponentStore<ConferenceState> {

}
