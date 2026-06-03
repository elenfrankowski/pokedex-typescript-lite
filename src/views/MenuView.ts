import readlineSync from 'readline-sync';
import { ApiService } from '../services/apiService.js';
import {
  capitalizarTexto,
  formatarTipos,
  formatarAltura,
  formatarPeso
} from '../utils/textFormatters.js';

export class MenuView {
    //Renderiza as opções visuais do menu no terminal
    private exibirOpcoes(): void {
        console.log('\n=================== POKÉDEX CLI ===================');
        console.log('1. 🔍 Buscar Pokémon na API (Por Nome ou ID)');
        console.log('2. 📸 Capturar Pokémon atual para a Box');
        console.log('3. 📦 Listar todos os Pokémons da Box');
        console.log('4. 🌾 Filtrar Pokémons da Box por Tipo');
        console.log('0. 🚪 Sair do Programa');
        console.log('===================================================');
    }

    //Orquestra a busca do Pokémon na API e exibe o resultado formatado
    private async executarBusca(): Promise<void> {
        const termo = readlineSync.question("\n Digite o nome ou ID do Pokemon: ").toLowerCase().trim();

        if (!termo) {
            console.log("\n⚠️ O nome ou ID não pode ser vazio!");
            return;
        }

        console.log(`\n🔍 A buscar o "${termo}" na PokeAPI...`);

        try {
            const pokemon = await ApiService.buscarPokemon(termo);

            if (!pokemon) {
                console.log("\n❌ Pokemon não encontrado. Verifique a ortografia.");
                return;
            }

            //Exibe os dados formatados
            console.log('\n---------------------------------------------------');
            console.log(`📊 RESULTADO DA BUSCA:`);
            console.log(`🆔 ID: ${pokemon.id}`);
            console.log(`📛 Nome: ${capitalizarTexto(pokemon.name)}`);
            console.log(`🌾 Tipos: ${formatarTipos(pokemon.types)}`);
            console.log(`📏 Altura: ${formatarAltura(pokemon.height)}`);
            console.log(`⚖️ Peso: ${formatarPeso(pokemon.weight)}`);
            console.log('---------------------------------------------------');
        } catch (error) {
            console.log("\n❌ Erro ao ligar a API. Verifique sua conexão com a internet.");
        }
    }

    //Inicia o loop principal do menu que mantém o programa rodando
    public async iniciar(): Promise<void> {
        let rodando = true;

        while (rodando) {
            this.exibirOpcoes();
            const opcao = readlineSync.question("Escolha uma opcao: ").trim();

            if (opcao === '0') {
                console.log("\n👋 Obrigado por usar a Pokédex CLI! Até a próxima.");
                rodando = false;
                continue;
            }

            if (opcao === '1') {
                await this.executarBusca();
                continue;
            }

            if (opcao === '2') {
                console.log("\n📸 Funcionalidade selecionada: Capturar Pokémon (Em breve)...");
                continue;
            }

            if (opcao === '3') {
                console.log("\n📦 Funcionalidade selecionada: Listar Box (Em breve)...");
                continue;
            }

            if (opcao === '4') {
                console.log("\n🌾 Funcionalidade selecionada: Filtrar por tipo (Em breve)...");
                continue;
            }

            // Se o usuário digitar qualquer outra coisa inválida (letras ou outros números)
            console.log("\n⚠️ Opção inválida! Digite um número de 0 a 4");

        }
    }
}