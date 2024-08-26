export interface sousdomaine{
    id: number; // ou number si vous préférez utiliser des nombres plus petits
    nom?: string;
    description?: string;
    image?: string; // Le point d'interrogation indique que ce champ est optionnel
    domaine_id: Number; // ou number si vous préférez utiliser des nombres plus petits
    created_by?: bigint; // ou number si vous préférez utiliser des nombres plus petits
    modified_by?: bigint;
}