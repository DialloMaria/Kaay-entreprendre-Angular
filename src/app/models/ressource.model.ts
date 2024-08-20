// src/app/models/ressource.model.ts
export interface Ressource {
  id: number;
  titre: string;
  description: string;
  lien: string;
  type: string;
  guideId: number;
  createdBy: number;
}
