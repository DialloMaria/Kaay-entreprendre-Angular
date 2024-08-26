// src/app/models/guide.model.ts
import { Ressource } from './ressource.model';

export interface Guide {
  id: number;
  titre: string;
  contenu: string;
  datepublication: string;
  etape: number;
  domaine_id: number;
  ressources?: Ressource[];
}
