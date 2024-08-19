export interface GuideModel {
  sous_domaine_nom?: any;


  id?: number | undefined;
  titre?: string;
  contenu?: string;
  etape?: string;
  datePublication?: string;
  media?: string; // Note that this should be File type if you are handling file uploads
  domaine_id?: number;
  created_by?: number;
  modified_by?: number;


}
