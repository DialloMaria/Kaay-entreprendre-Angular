export interface Commentaire {
    id?: number;
    contenu: string;
    guide_id: number | null; // Allow null values
    created_by: number;
    created_at?: string;
    updated_at?: string;
  }
  