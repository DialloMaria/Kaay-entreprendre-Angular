export interface EvenementModel {
  id: number ;
  titre?: string;
  description?: string;
  online?: boolean;
  lieu?: string;
  image?: string;
  domaine_id?: number;
  created_by?: number;
  modified_by?: number;
  created_at?: number;
  modified_at?: number;

}
