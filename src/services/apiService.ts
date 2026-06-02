import { PokemonApiResponse } from '../models/Pokemon.js';

export class ApiService {
  private static readonly BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

  //Busca os detalhes de um Pokémon na PokeAPI utilizando o nome ou ID.
  
  public static async buscarPokemon(nomeOuId: string | number): Promise<PokemonApiResponse | null> {
    try {
      const parametroBusca = typeof nomeOuId === 'string' ? nomeOuId.toLowerCase().trim() : nomeOuId;
      const resposta = await fetch(`${this.BASE_URL}/${parametroBusca}`);

      // Se a resposta for bem-sucedida, processa e retorna os dados imediatamente
      if (resposta.ok) {
        const dados = (await resposta.json()) as PokemonApiResponse;
        return dados;
      }

      if (resposta.status === 404) {
        console.log(`\n Pokémon "${nomeOuId}" não foi encontrado na PokeAPI.`);
        return null;
      }

      console.log(`\n Erro ao conectar com a PokeAPI: Status ${resposta.status}`);
      return null;

    } catch (erro) {
      console.error('\n Erro inesperado na requisição:', erro);
      return null;
    }
  }
}