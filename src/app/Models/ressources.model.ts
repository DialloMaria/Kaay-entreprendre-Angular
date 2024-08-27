export class Ressource {
  id!: number;
  titre?: string;
  description?: string;
  lien?: string;
  type?: string;
  guide_id?: number; // Assure-toi que ce champ est bien en correspondance avec le guide
  created_by?: number;
  modified_by?: number | null;

    created_at?: Date;
    updated_at?: Date;
  }
