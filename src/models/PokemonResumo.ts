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
    stats: {
        base_stat: number;
        stat: {
            name: string;
            url: string;
        }
    }[];
}

export interface PokemonResumo {
    id: number;
    name: string;
    types: {
        type: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    height: number; 
    weight: number;
}

export interface PokemonBoxLocal {
    id: number;
    nome: string;
    tipoPrincipal: string;
    altura: number;
    peso: number;
    dataCaptura: string;
}