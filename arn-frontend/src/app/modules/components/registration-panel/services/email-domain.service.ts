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
      map(response => {
        const universityMap = response.reduce((acc, domain) => {
          if (!acc[domain.universityId]) {
            acc[domain.universityId] = {
              universityId: domain.universityId,
              universityName: domain.universityName,
              domains: []
            };
          }
          acc[domain.universityId].domains.push(domain.domain);
          return acc;
        }, {});

        return Object.values(universityMap) as EmailDomain[];
      })
    );
  }
}
