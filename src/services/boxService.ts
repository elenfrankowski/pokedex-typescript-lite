import * as fs from 'fs/promises';
import * as path from 'path';
import { PokemonResumo } from '../models/Pokemon.js';

export class BoxService {
    //Caminho absoluto para o arquivo pc_box.json na raiz do projeto
    private static readonly ARQUIVO_CAMINHO = path.resolve(process.cwd(), 'pc_box.json');

    //Lê o arquivo JSON e retorna a lista de Pokémons capturados
    public static async listarPokemons(): Promise<PokemonResumo[]> {
        try {
            const dados = await fs.readFile(this.ARQUIVO_CAMINHO, 'utf-8');

            //Se o arquivo estiver vazio, retorna um array vazio imediatamente
            if (!dados.trim()) {
                return [];
            }

            return JSON.parse(dados) as PokemonResumo[];
        } catch (erro) {
            //Se o erro não existir, retorna um array de segurança 
            console.log("Banco de dados local não encontrado. Inicializando uma nova Box...");
            return [];
        }
    }

    //Guarda um novo Pokémon no arquivo pc_box.json (Capturar)
    public static async salvarPokemon(pokemon: PokemonResumo): Promise<boolean> {
        try {
            const listaAtual = await this.listarPokemons();

            //Verifica se o Pokémon á foi capturado antes para não duplicar
            const jaExiste = listaAtual.some((p) => p.id === pokemon.id);
            if (jaExiste) {
                console.log(`\n O Pokémon ${pokemon.nome} já está na sua Box!`);
                return false;
            }

            listaAtual.push(pokemon);

            //Salva a lista atualizada formatando o JSON de forma legível (2 espaços)
            await fs.writeFile(this.ARQUIVO_CAMINHO, JSON.stringify(listaAtual, null, 2), 'utf-8');
            return true;
        } catch (erro) {
            console.error("Erro ao salvar o Pokémon na Box:", erro);
            return false;
        }
    }
}