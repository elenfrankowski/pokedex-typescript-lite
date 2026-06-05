import { PokemonResumo } from '../models/PokemonResumo.js';
import { BoxRepository } from './BoxRepository.js'; 
export class CatalogoPokemon {
    private pokemons: PokemonResumo[] = [];

    constructor(pokemonIniciais: PokemonResumo[] = []) {
        this.pokemons = pokemonIniciais;
    }

    /**
     * RF09 - Método obrigatório: ADICIONAR
     * Adiciona um Pokémon ao catálogo impedindo duplicidades pelo ID (.some)
     */
    public adicionar(pokemon: PokemonResumo): void {
        const jaExiste = this.pokemons.some((p) => p.id === pokemon.id);

        if (jaExiste) {
            console.log(`\n⚠️  ${pokemon.name} já está no catálogo.`);
            return;
        }

        this.pokemons.push(pokemon);
        console.log(`\n✅  Pokémon encontrado: ${pokemon.name}`);
    }

    public listar(): void {
        if (this.pokemons.length === 0) {
            console.log('\n🫙 O catálogo está vazio!');
            return;
        }

        console.log('\n--- 📦 CATÁLOGO ATUAL ---');
        this.pokemons.forEach((pokemon) => {
        // Usa .map() para extrair os nomes dos tipos
        const tipos = pokemon.types.map((t) => t.type.name).join(', ');
        
        // Usa .find() para extrair os atributos de status requeridos
        const hp = pokemon.stats.find((s) => s.stat.name === 'hp')?.base_stat || 0;
        const attack = pokemon.stats.find((s) => s.stat.name === 'attack')?.base_stat || 0;
        const defense = pokemon.stats.find((s) => s.stat.name === 'defense')?.base_stat || 0;

        console.log(`🆔 #${pokemon.id} - 📛 ${pokemon.name} | 🌿 Tipos: ${tipos} | ❤️  HP: ${hp} | ⚔️  ATK: ${attack} | 🛡️  DEF: ${defense}`);
        });
        console.log('-------------------------');
    }

    public remover(id: number): void {
        const existe = this.pokemons.some((p) => p.id === id);

        if (!existe) {
            console.log(`\n⚠️  Nenhum Pokémon encontrado com o ID #${id}.`);
            return;
        }

        this.pokemons = this.pokemons.filter((p) => p.id !== id);
        console.log(`\n✅  Pokémon removido do catálogo.`);
    }

    // --- Mantendo seus métodos adicionais caso alguma outra parte do código dependa deles ---
    public obterTodos(): PokemonResumo[] {
        return this.pokemons;
    }

    public verificarExiste(id: number): boolean {
        return this.pokemons.some((pokemon) => pokemon.id === id);
    }
}