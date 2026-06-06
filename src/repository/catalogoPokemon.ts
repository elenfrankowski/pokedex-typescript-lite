import { PokemonResumo } from '../models/PokemonResumo.js';

export class CatalogoPokemon {
    private pokemons: PokemonResumo[] = [];

    constructor(pokemonIniciais: PokemonResumo[] = []) {
        this.pokemons = pokemonIniciais;
    }

    public adicionar(pokemon: PokemonResumo): void {
        const jaExiste = this.pokemons.some((p) => p.id === pokemon.id);

        if (jaExiste) {
            console.log(`\n[AVISO] ⚠️  ${pokemon.name} já está no catálogo.`);
            return;
        }

        this.pokemons.push(pokemon);
        console.log(`\n[OK] ✅ ${pokemon.name} adicionado ao catálogo.`);
    }

    public listar(): void {
        if (this.pokemons.length === 0) {
            console.log('\n[AVISO] ⚠️ Catálogo vazio.');
            return;
        }

        console.log('\n--- 📦 CATÁLOGO ATUAL ---');
        this.pokemons.forEach((pokemon) => {
            const tipos = pokemon.types.map((t) => t.type.name).join(', ');
            
            const hp = pokemon.stats.find((s) => s.stat.name === 'hp')?.base_stat || 0;
            const attack = pokemon.stats.find((s) => s.stat.name === 'attack')?.base_stat || 0;
            const defense = pokemon.stats.find((s) => s.stat.name === 'defense')?.base_stat || 0;

            console.log(`🆔 #${pokemon.id} - 📛 ${pokemon.name} | 🌿 Tipos: ${tipos} | 📏 Altura: ${pokemon.height} | ⚖️ Peso: ${pokemon.weight}`);
            console.log(`📊 Stats -> ❤️  HP: ${hp} | ⚔️  ATK: ${attack} | 🛡️  DEF: ${defense}`);
        });
    }

    public remover(id: number): void {
        const existe = this.pokemons.some((p) => p.id === id);

        if (!existe) {
            console.log(`\n[AVISO] ⚠️ Nenhum Pokémon encontrado com esse ID.`);
            return;
        }

        this.pokemons = this.pokemons.filter((p) => p.id !== id);
        console.log(`\n[OK] ✅ Pokémon removido do catálogo.`);
    }

    public obterTodos(): PokemonResumo[] {
        return this.pokemons;
    }

    public verificarExiste(id: number): boolean {
        return this.pokemons.some((pokemon) => pokemon.id === id);
    }
}