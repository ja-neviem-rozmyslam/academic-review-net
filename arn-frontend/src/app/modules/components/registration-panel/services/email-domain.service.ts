import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmailDomain} from '../entities/EmailDomain';
import {map} from 'rxjs/operators';

@Injectable()
export class EmailDomainService {

  private PASSWORD_API_ENDPOINT = '/api/email-domains';

  constructor(private http: HttpClient) {
  }

  getAllDomains(): Observable<EmailDomain[]> {
    return this.http.get<any[]>(`${this.PASSWORD_API_ENDPOINT}`).pipe(
      map(response => response.map(domain => ({
        universityId: domain.universityId,
        universityName: domain.universityName,
        domain: domain.domain
      } as EmailDomain)))
    );
  }
}
