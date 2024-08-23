export interface sousdomaine{
    id?: bigint; // ou number si vous préférez utiliser des nombres plus petits
    nom?: string;
    description?: string;
    image?: string; // Le point d'interrogation indique que ce champ est optionnel
    domaine_id: bigint; // ou number si vous préférez utiliser des nombres plus petits
    created_by?: bigint; // ou number si vous préférez utiliser des nombres plus petits
    modified_by?: bigint;
}