//Interface que mapeia exatamente a resposta detalhada que vem da POkeAPI externa
export interface PokemonApiResponse {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        }
    }[];
}

//Interface simplificada que define a estrutura do Pokémon que será salva no pc_box.json
export interface PokemonResumo {
    id: number;
    nome: string;
    tipoPrincipal: string;
    altura: number;
    peso: number;
    dataCaptura: string;
}