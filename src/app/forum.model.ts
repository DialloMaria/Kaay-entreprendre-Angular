export interface Forum {
    id: number;
    titre: string;
    description: string;
    nombre_de_message: number;
    nombre_de_vue: number;
    dateCreation: string; 
    domaine_id: number;
    created_by?: number | null;
     modified_by?: number | null;
     created_at?: string; 
     updated_at?: string; 
     domaine?: {
     id: number;
     nom: string;
      created_by?: number;
       modified_by?: number;
       categorie_id?: number;
       deleted_at?: string;
       created_at?: string;
      updated_at?: string; 
    };
  }
  