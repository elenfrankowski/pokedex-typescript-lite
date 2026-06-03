import { PokemonResumo } from './Pokemon.js';

export class CatalogoPokemon {
    private pokemons: PokemonResumo[] = [];

    constructor(pokemonIniciais: PokemonResumo[] = []) {
        this.pokemons = pokemonIniciais;
    }

    //Retorna a lista completa de pokémons do catálogo
    public obterTodos(): PokemonResumo[] {
        return this.pokemons;
    }

    //Filtra os pokémons do catálogo por um tipo específico utilizando o método funcional .filter()
    public filtrarPorTipo(tipo: string): PokemonResumo[] {
        const tipoFormatado = tipo.toLowerCase().trim();

        return this.pokemons.filter(
            (pokemon) => pokemon.tipoPrincipal.toLowerCase() === tipoFormatado
        );
    }

    //Verifica se um determinado Pokémon já existe no catálogo pelo ID utilizando .some()
    public verificarExiste(id: number): boolean {
        return this.pokemons.some((pokemon) => pokemon.id === id);
    }

    //Exibe no terminal os Pokémons formatados utilizando o método funcional .forEach()
    public listarNoTerminal(): void {
    if (this.pokemons.length === 0) {
      console.log('\n Sua Box está vazia! Capture alguns Pokémons primeiro.');
      return;
    }

    console.log(`\n================ POKÉMONS NA BOX (${this.pokemons.length}) ================`);
    
    this.pokemons.forEach((pokemon) => {
      console.log(` ID: ${pokemon.id} | Nome: ${pokemon.nome.toUpperCase()} | Tipo: ${pokemon.tipoPrincipal} | Captura: ${pokemon.dataCaptura}`);
    });

    console.log('===========================================================');
  }
}