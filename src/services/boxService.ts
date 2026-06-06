import * as fs from 'fs/promises';
import * as path from 'path';
import { PokemonResumo } from '../models/PokemonResumo.js';

export class BoxService {
    private static readonly ARQUIVO_CAMINHO = path.resolve(process.cwd(), 'pc_box.json');

    public static async listarPokemons(): Promise<PokemonResumo[]> {
        try {
            const dados = await fs.readFile(this.ARQUIVO_CAMINHO, 'utf-8');

            if (!dados.trim()) {
                return [];
            }

            return JSON.parse(dados) as PokemonResumo[];
        } catch (erro) {
            console.log("[AVISO] ⚠️ Banco de dados local não encontrado. Inicializando uma nova Box...");
            return [];
        }
    }

    public static async salvarPokemon(pokemon: PokemonResumo): Promise<boolean> {
        try {
            const listaAtual = await this.listarPokemons();

            const jaExiste = listaAtual.some((p) => p.id === pokemon.id);
            if (jaExiste) {
                console.log(`\n[AVISO] ⚠️ ${pokemon.name} já está na sua Box!`);
                return false;
            }

            listaAtual.push(pokemon);

            await fs.writeFile(this.ARQUIVO_CAMINHO, JSON.stringify(listaAtual, null, 2), 'utf-8');
            return true;
        } catch (erro) {
            console.error("[ERRO] ❌ Erro ao salvar o Pokémon na Box:", erro);
            return false;
        }
    }
}