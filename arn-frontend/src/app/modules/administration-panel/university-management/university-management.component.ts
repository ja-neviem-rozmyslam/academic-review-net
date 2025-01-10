import { Component, OnInit } from '@angular/core';
import { UniversityManagementService } from './services/university-management.service';
import {FormValidationErrors} from '../../objects/FormValidationErrors';

interface Domain {
  id: number;
  domain: string;
}

interface University {
  id: number;
  name: string;
  domain: Domain[];
}

@Component({
  selector: 'app-university-management',
  templateUrl: './university-management.component.html',
  styleUrls: ['./university-management.component.less']
})
export class UniversityManagementComponent implements OnInit {
  universitySearch = '';
  universities: University[] = [];
  filteredUniversities: University[] = [];
  removedDomains: number[] = [];

  formValidationErrors: FormValidationErrors;

  alertMessage = '';
  alertVisible = false;
  alertType = 'SUCCESS';

  tempIdCounter = -1;

  constructor(private universityService: UniversityManagementService) {}

  ngOnInit() {
    this.loadAllUniversities();
  }

  getUniversityById(id: number): University {
    return this.universities.find((uni) => uni.id === id);
  }

  loadAllUniversities() {
    this.universityService.getAllUniversities().subscribe({
      next: (data) => {
        this.universities = data;
        this.sortUniversities();
        this.filteredUniversities = [...this.universities];
      },
      error: (err) => {
        console.error('Error fetching universities:', err);
      }
    });
  }

  searchUniversities() {
    const searchTerm = this.universitySearch.toLowerCase();
    this.filteredUniversities = this.universities.filter(university => {
      const nameMatches = university.name.toLowerCase().includes(searchTerm);
      const domainMatches = university.domain.some(dom => dom.domain.toLowerCase().includes(searchTerm));
      return nameMatches || domainMatches;
    });
  }

  addUniversity(): void {
    const newUniversity: University = {
      id: this.tempIdCounter--,
      name: '',
      domain: []
    };

    this.universities.push(newUniversity);

    this.sortUniversities();
    this.searchUniversities();

    this.showAlert("Nová univerzita bola pridaná. Nezabudnite uložiť zmeny.");
  }

  removeUniversity(univId: number): void {
    const university = this.getUniversityById(univId);
    if (univId < 0) {
      const universityIndex = this.universities.findIndex((uni) => uni.id === univId);
      this.universities.splice(universityIndex, 1);
      this.sortUniversities();
      this.searchUniversities();
      this.showAlert("Univerzita bola odstránená");
      return;
    }
    this.universityService.removeUniversity(univId, university).subscribe({
      next: () => {
        const universityIndex = this.universities.findIndex((uni) => uni.id === univId);
        this.universities.splice(universityIndex, 1);
        this.sortUniversities();
        this.searchUniversities();
        this.showAlert("Univerzita úspešne odstránená");
      },
      error: (err) => {
        console.error('Error removing university:', err);
      }
    });
  }

  addDomainToUniversity(univId: number): void {
    const university = this.getUniversityById(univId);
    const newDomain: Domain = { id: this.tempIdCounter--, domain: '' };
    university.domain.push(newDomain);
    this.showAlert("Doména bola pridaná. Nezabudnite uložiť zmeny.");
  }

  removeDomainFromUniversity(univId: number, domainId: number): void {
    const university = this.getUniversityById(univId);
    const domainIndex = university.domain.findIndex(dom => dom.id === domainId);

    if (domainIndex > -1) {
      if (domainId >= 0) {
        this.removedDomains.push(domainId);
      }

      university.domain.splice(domainIndex, 1);

      this.showAlert("Doména bola odstránená. Nezabudnite uložiť zmeny.");
    }
  }

  saveUniversity(univId: number): void {
    if (this.formValidationErrors) {
      this.showAlert("Všetky polia musia byť vyplnené.", 'ERROR');
      return;
    }

    const university = this.getUniversityById(univId);

    const payload = {
      university,
      removedDomains: this.removedDomains
    };

    this.universityService.saveUniversity(payload).subscribe({
      next: () => {
        this.showAlert("Údaje o univerzite a jej doménach boli úspešne uložené");
        this.loadAllUniversities();
        this.removedDomains = [];
      },
      error: (err) => {
        console.error('Error saving university:', err);
      }
    });
  }

  showAlert(message: string, alertType = 'SUCCESS') {
    this.alertMessage = message;
    this.alertType = alertType;
    this.alertVisible = true;
    setTimeout(() => this.alertVisible = false, 5000);
  }

  private sortUniversities() {
    this.universities.sort((a, b) => {
      if (a.id < 0 && b.id >= 0) return -1;
      if (a.id >= 0 && b.id < 0) return 1;
      return b.id - a.id;
    });
  }
}
