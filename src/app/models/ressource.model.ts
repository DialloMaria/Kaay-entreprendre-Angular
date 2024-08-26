// src/app/models/ressource.model.ts
export interface Ressource {
  id: number;
  titre: string;
  description: string;
  lien: string;
  type: string;
  guideId: number;
  createdBy: number;
  guide?: Guide;
}

export interface Guide {
  id: number;
  titre: string;
  contenu: string;
  datepublication: string;
  etape: number;
  domaine_id: number;
  ressources?: Ressource[];
}
