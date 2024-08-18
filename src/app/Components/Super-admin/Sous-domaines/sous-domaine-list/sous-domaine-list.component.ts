import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SuperAdminService } from '../../../../Services/super-admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sous-domaine-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sous-domaine-list.component.html',
  styleUrls: ['./sous-domaine-list.component.css']
})
export class SousDomaineListComponent implements OnInit, OnChanges {
  @Input() selectedDomaine: any;
  domaines: any[] = [];
  sousDomaines: any[] = [];
  selectedSousDomaines: any[] = [];
  selectedDomaineName: string = '';

  constructor(private superAdminService: SuperAdminService) {}

  ngOnInit(): void {
    // Optionally, you can load default data here if needed
    // For example, load a default domaine's sous-domaines
    // this.loadSousDomaines(1); // Load sous-domaines for domaine with ID 1
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDomaine'] && this.selectedDomaine) {
      this.getSousDomaines(this.selectedDomaine.id);
    }
  }

  getSousDomaines(domaineId: number): void {
    this.superAdminService.loadSousDomaines(domaineId).subscribe((response: any) => {
      this.sousDomaines = response.sousDomaines;
      console.log('Sous-domaines du domaine:', this.sousDomaines);
      this.selectedDomaineName = this.domaines.find(d => d.id === domaineId)?.nom
      || '';
      this.selectedSousDomaines = this.sousDomaines;
        });



  }




  // Optionally, this method can be removed if not used
  loadSousDomaines(domaineId: number): void {
    this.superAdminService.loadSousDomaines(domaineId).subscribe((response: any) => {
      this.selectedSousDomaines = response.sousDomaines;
      console.log('Sous-domaines du domaine:', this.selectedSousDomaines);
      this.selectedDomaineName = this.domaines.find(d => d.id === domaineId)?.nom || '';
    });
  }
}
