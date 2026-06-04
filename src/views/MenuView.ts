import readlineSync from 'readline-sync';
import { ApiService } from '../services/apiService.js';
import {
  capitalizarTexto,
  formatarTipos,
  formatarAltura,
  formatarPeso
} from '../utils/textFormatters.js';
import { BoxRepository } from '../repository/BoxRepository.js';
import { read } from 'fs';

export class MenuView {
    //Propriedade para lembrar do último Pokémon pesquisado com sucesso
    private pokemonUltimaBusca: any = null;

    //Renderiza as opções visuais do menu no terminal
    private exibirOpcoes(): void {
        console.log('\n=================== POKÉDEX CLI ===================');
        console.log('1. 🔍 Buscar Pokémon na API (Por Nome ou ID)');
        console.log('2. 📸 Capturar Pokémon atual para a Box');
        console.log('3. 📦 Listar todos os Pokémons da Box');
        console.log('4. 🗑️  Remover Pokémon da Box por ID');
        console.log('5. 🌾 Filtrar Pokémons da Box por Tipo');
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
                console.log("\n❌ Pokemon não encontrado. Verifique o nome ou ID e tente novamente.");
                return;
            }

            // Guardar o Pokémon encontrado para caso o usuário queira capturar na Opção 2
            this.pokemonUltimaBusca = pokemon;

            //Exibe os dados formatados
            console.log('\n---------------------------------------------------');
            console.log(`📊 RESULTADO DA BUSCA:`);
            console.log(`🆔 ID: ${pokemon.id}`);
            console.log(`📛 Nome: ${capitalizarTexto(pokemon.name)}`);
            console.log(`🌾 Tipos: ${formatarTipos(pokemon.types)}`);
            console.log(`📏 Altura: ${formatarAltura(pokemon.height)}`);
            console.log(`⚖️  Peso: ${formatarPeso(pokemon.weight)}`);
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
            const opcao = readlineSync.question("Escolha uma opção: ").trim();

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
                this.executarCaptura();
                continue;
            }

            if (opcao === '3') {
                this.executarListagem();
                continue;
            }

            if (opcao === '4') {
                this.executarRemocao();
                continue;
            }

            if (opcao === '5') {
                this.executarFiltragem();
                continue;
            }

            console.log("\n⚠️  Opção inválida! Digite um número de 0 a 5");
        }
    }

    //Pega o Pokémon da última busca realizada e salva na Box
    private executarCaptura(): void {
        if (!this.pokemonUltimaBusca) {
            console.log('\n⚠️  Nenhum Pokémon foi buscado recentemente! Busque um Pokémon na opção 1 antes de capturar.');
            return;
        }

        const salvoComSucesso = BoxRepository.salvar(this.pokemonUltimaBusca);

        if (!salvoComSucesso) {
            console.log(`\n❌ O Pokémon ${this.pokemonUltimaBusca.name.toUpperCase()} já está na sua Box!`);
            return;
        }

        console.log(`\n🎉 Sucesso! ${this.pokemonUltimaBusca.name.toUpperCase()} foi capturado e salvo na sua Box! 📸 📦`);
        
        // Limpa para exigir uma nova busca antes do próximo comando de captura
        this.pokemonUltimaBusca = null; 
    }

    //Obtém todos os Pokémons salvos no repositório e exibe na tela
    private executarListagem(): void {
        const listaPokemons = BoxRepository.listarTodos();

        if (listaPokemons.length === 0) {
            console.log("\n Sua Box está vazia! Capture algum Pokémon na opção 2 primeiro.");
            return;
        }

        console.log('\n=================== 📦 SUA BOX DE POKÉMONS ===================');
    
        // Percorre a lista exibindo as informações básicas de cada um de forma simplificada
        listaPokemons.forEach((pokemon, index) => {
            console.log(`🆔 ID: #${pokemon.id} | 📛 Nome: ${capitalizarTexto(pokemon.name)} | 🌾 Tipos: ${formatarTipos(pokemon.types)}`);

            // Se não for o último Pokémon da lista, adiciona a linha separadora
            if (index < listaPokemons.length - 1) {
                console.log('--------------------------------------------------------------');
            }
        });

        console.log('==============================================================');
  }

  //Pede um tipo ao usuário e exibe apenas os Pokémons da Box que possuem esse tipo
  private executarFiltragem(): void {
    const listaPokemons = BoxRepository.listarTodos();

    if (listaPokemons.length === 0) {
        console.log("\n Sua Box está vazia! Não há Pokémons para filtar.")
        return;
    }

    const tipoAlvo = readlineSync.question ("\n🌾 Digite o tipo de Pokémon para filtrar (ex: fire, water, grass): ").toLowerCase().trim();

    if (!tipoAlvo) {
        console.log("\n⚠️ O tipo não pode ser vazio!");
        return;
    }

    //Filtra os Pokémons onde pelo menos um dos tipos da API seja igual ao digitado
    const pokemonsFiltrados = listaPokemons.filter((pokemon) => 
        pokemon.types.some((t) => t.type.name.toLowerCase() === tipoAlvo)
    );

    if (pokemonsFiltrados.length === 0) {
        console.log(`\n🔍 Nenhum Pokémon do tipo "${tipoAlvo.toUpperCase()}" foi encontrado na sua Box.`);
        return;
    }

    console.log(`\n=================== 🌾 POKÉMONS DO TIPO: ${tipoAlvo.toUpperCase()} ===================`);

    pokemonsFiltrados.forEach((pokemon, index) => {
        console.log(`🆔 ID: #${pokemon.id} | 📛 Nome: ${capitalizarTexto(pokemon.name)} | 🌾 Tipos: ${formatarTipos(pokemon.types)}`);

        if (index < pokemonsFiltrados.length - 1) {
            console.log('--------------------------------------------------------------');
        }
    });

    console.log('====================================================================');
  }


  private executarRemocao(): void {
    const listaPokemons = BoxRepository.listarTodos();

    if (listaPokemons.length === 0) {
        console.log("\n Sua Box está vazia! Não há Pokémons para remover.");
        return;
    }

    const idInput = readlineSync.question("\n🗑️  Digite o ID do Pokémon que deseja remover: ").trim();
    const idNum = Number(idInput);

    if (isNaN(idNum) || !idInput) {
        console.log("\n⚠️ Por favor, digite um ID numérico válido!");
        return;
    }

    const removido = BoxRepository.remover(idNum);

    if (!removido) {
        console.log(`\n⚠️  Nenhum Pokémon encontrado com o ID #${idNum}.`);
        return;
    }

    console.log(`\n✅ Pokémon com ID #${idNum} foi removido com sucesso da sua Box!`);
  }
    
}