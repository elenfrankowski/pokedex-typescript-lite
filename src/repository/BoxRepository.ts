import { PokemonResumo } from '../models/PokemonResumo.js';
import { BoxService } from '../services/boxService.js';

export class BoxRepository {
  private static box: PokemonResumo[] = [];

  public static async salvar(pokemon: PokemonResumo): Promise<boolean> {
    BoxRepository.box = await BoxService.listarPokemons();

    const jaExiste = BoxRepository.box.some((p) => p.id === pokemon.id);
    if (jaExiste) {
      return false;
    }

    const gravouNoArquivo = await BoxService.salvarPokemon(pokemon);
    
    if (gravouNoArquivo) {
      BoxRepository.box.push(pokemon);
      return true;
    }

    return false;
  }

  public static async listarTodos(): Promise<PokemonResumo[]> {
    BoxRepository.box = await BoxService.listarPokemons();
    return BoxRepository.box;
  }

  public static async remover(id: number): Promise<boolean> {
    BoxRepository.box = await BoxService.listarPokemons();
    
    const existe = this.box.some((pokemon) => pokemon.id === id);
    if (!existe) {
      return false;
    }

    this.box = this.box.filter((pokemon) => pokemon.id !== id);
    
    const fs = await import('fs/promises');
    const path = await import('path');
    const caminho = path.resolve(process.cwd(), 'pc_box.json');
    await fs.writeFile(caminho, JSON.stringify(this.box, null, 2), 'utf-8');

    return true;
  }

  public static async calcularPesoMedio(): Promise<number> {
    BoxRepository.box = await BoxService.listarPokemons();
    
    if (BoxRepository.box.length === 0) {
      return 0;
    }

    const pesoTotal = BoxRepository.box.reduce((acumulador, pokemon) => {
      return acumulador + pokemon.weight;
    }, 0);

    return pesoTotal / BoxRepository.box.length;
  }
}