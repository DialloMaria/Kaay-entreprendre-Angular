export interface Ressource {
  id: number;
  titre: string;
  description: string;
  lien: string;
  type: string;
  guide_id: number;
  created_by: number;
  modified_by?: number;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
}
