export interface Guide {
  id: number;
  titre: string;
  contenu: string;
  etape: number;
  domaine_id: number;
  created_by: number;
  modified_by?: number;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
}
