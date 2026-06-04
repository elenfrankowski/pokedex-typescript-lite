import { PokemonApiResponse } from '../models/Pokemon.js';

export class BoxRepository {
  // Array privado que funciona como "banco de dados" na memória
  private static box: PokemonApiResponse[] = [];

  // Salva um Pokémon na Box.
  // Retorna true se salvou ou false se o Pokémon já tinha sido capturado.
  public static salvar(pokemon: PokemonApiResponse): boolean {
    const jaExiste = BoxRepository.box.some((p) => p.id === pokemon.id);
    
    if (jaExiste) {
      return false;
    }

    BoxRepository.box.push(pokemon);
    return true;
  }

  // Retorna a lista de todos os Pokémons salvos.
  public static listarTodos(): PokemonApiResponse[] {
    return BoxRepository.box;
  }

  //Remove um Pokémon da Box através do seu ID
  public static remover(id: number): boolean {
    const existe = this.box.some((pokemon) => pokemon.id === id);

    if (!existe) {
      return false;
    }

    this.box = this.box.filter((pokemon) => pokemon.id !== id);
    return true;
  }
}