import { PokemonResumo } from '../models/PokemonResumo.js'; 

export class ApiService {
  private static readonly BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

  public static async buscarPokemon(nomeOuId: string | number): Promise<PokemonResumo | null> {
    try {
      const parametroBusca = typeof nomeOuId === 'string' ? nomeOuId.toLowerCase().trim() : nomeOuId;
      const resposta = await fetch(`${this.BASE_URL}/${parametroBusca}`);

      if (resposta.ok) {
        const dados = (await resposta.json()) as PokemonResumo;
        return dados;
      }

      if (resposta.status === 404) {
        console.log(`\n[ERRO] ❌ Pokémon não encontrado.`);
        return null;
      }

      console.log(`\n[ERRO] 🔌 Erro ao conectar com a PokeAPI: Status ${resposta.status}`);
      return null;

    } catch (erro) {
      console.log('\n[ERRO] 💥 Erro inesperado na requisição:', erro);
      return null;
    }
  }
}