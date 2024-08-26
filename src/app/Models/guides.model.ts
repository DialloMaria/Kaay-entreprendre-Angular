export interface GuideModel {
  id?: number;
  titre?: string;
  contenu?: string;
  etape?: string;
  datePublication?: string;
  media?: string; // Note that this should be File type if you are handling file uploads
  domaine_id?: number;
  sous_domaine_id?: number; // Ajoutez cette ligne si nécessaire
  created_by?: number;
  modified_by?: number;
}
