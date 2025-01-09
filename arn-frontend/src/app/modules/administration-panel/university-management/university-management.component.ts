import { Component, OnInit } from '@angular/core';
import { UniversityManagementService } from './services/university-management.service';

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

  alertMessage = '';
  alertVisible = false;

  constructor(private universityService: UniversityManagementService) {}

  ngOnInit() {
    this.loadAllUniversities();
  }

  getUniversityById(id: number): University {
    return this.universities.find((uni) => uni.id === id);
  }

  getDomainById(univId: number, domainId: number): Domain {
    const university = this.getUniversityById(univId);
    return university.domain.find((dom) => dom.id === domainId);
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
    this.universityService.addUniversity().subscribe({
      next: (data) => {
        this.universities.push(data);
        this.sortUniversities();
        this.searchUniversities();
        this.showAlert("Univerzita úspešne vytvorená");
      },
      error: (err) => {
        console.error('Error adding university:', err);
      }
    });
  }

  removeUniversity(univId: number): void {
    const university = this.getUniversityById(univId);
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
    this.universityService.addDomainToUniversity(univId).subscribe({
      next: (data) => {
        const university = this.getUniversityById(univId);
        university.domain.push(data);
        this.showAlert("Doména úspešne pridaná");
      },
      error: (err) => {
        console.error('Error adding domain to university:', err);
      }
    });
  }

  removeDomainFromUniversity(univId: number, domainId: number): void {
    const university = this.getUniversityById(univId);
    const domain = this.getDomainById(univId, domainId);
    this.universityService.removeDomainFromUniversity(domain.id).subscribe({
      next: () => {
        const domainIndex = university.domain.indexOf(domain);
        university.domain.splice(domainIndex, 1);
        this.showAlert("Doména úspešne odstránená");
      },
      error: (err) => {
        console.error('Error removing domain from university:', err);
      }
    });
  }

  saveUniversity(univId: number): void {
    const university = this.getUniversityById(univId);
    this.universityService.saveUniversity(university).subscribe({
      next: () => {
        this.showAlert("Údaje o univerzite úspešne uložené");
      },
      error: (err) => {
        console.error('Error saving university:', err);
      }
    });
  }

  showAlert(message: string) {
    this.alertMessage = message;
    this.alertVisible = true;
    setTimeout(() => this.alertVisible = false, 5000);
  }

  private sortUniversities() {
    this.universities.sort((a, b) => b.id - a.id);
  }
}
