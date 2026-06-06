import readlineSync from 'readline-sync';
import { ApiService } from '../services/apiService.js';
import {
  capitalizarTexto,
  formatarTipos,
  formatarAltura,
  formatarPeso
} from '../utils/textFormatters.js';
import { BoxRepository } from '../repository/BoxRepository.js';
import { PokemonResumo } from '../models/PokemonResumo.js';

export class TerminalController {
  private pokemonUltimaBusca: PokemonResumo | null = null;

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

  private async executarBusca(): Promise<void> { 
    const termo = readlineSync.question("\n Digite o nome ou ID do Pokemon: ").toLowerCase().trim();

    if (!termo) {
      console.log("\n[AVISO] ⚠️ O nome ou ID não pode ser vazio!");
      return;
    }

    console.log(`\n🔍 A buscar o "${termo}" na PokeAPI...`);

    try {
      const pokemon = await ApiService.buscarPokemon(termo);

      if (!pokemon) {
        console.log("\n[ERRO] ❌ Pokémon não encontrado.");
        return;
      }

      this.pokemonUltimaBusca = pokemon;

      console.log('\n--------------------------------------------------');
      console.log(`📊  RESULTADO DA BUSCA:`);
      console.log(`🆔  ID: ${pokemon.id}`);
      console.log(`📛  Nome: ${pokemon.name.toUpperCase()}`);

      const tiposFormatados = formatarTipos(pokemon.types);
      console.log(`🌿  Tipos: ${tiposFormatados}`);
      console.log(`📏  Altura: ${formatarAltura(pokemon.height)}`);
      console.log(`⚖️   Peso: ${formatarPeso(pokemon.weight)}`);

      const hp = pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 0;
      const attack = pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 0;
      const defense = pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 0;

      console.log(`❤️   HP: ${hp}`);
      console.log(`⚔️   Ataque: ${attack}`);
      console.log(`🛡️   Defesa: ${defense}`);
      console.log('--------------------------------------------------');
    } catch (error) {
      console.log("\n[ERRO] ❌ Não foi possível ligar à API.");
    }
  }

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
        await this.executarCaptura();
        continue;
      }

      if (opcao === '3') {
        await this.executarListagem();
        continue;
      }

      if (opcao === '4') {
        await this.executarRemocao(); 
        continue; 
      }

      if (opcao === '5') {
        await this.executarFiltragem();
        continue;
      }

      console.log("\n[AVISO] ⚠️  Opção inválida! Digite um número de 0 a 5");
    }
  }

  private async executarCaptura(): Promise<void> {
    if (!this.pokemonUltimaBusca) {
      console.log('\n[AVISO] ⚠️  Nenhum Pokémon foi buscado recentemente! Busque um Pokémon na opção 1 antes de capturar.');
      return;
    }

    const salvoComSucesso = await BoxRepository.salvar(this.pokemonUltimaBusca);

    if (!salvoComSucesso) {
      console.log(`\n[AVISO] ⚠️  O Pokémon ${this.pokemonUltimaBusca.name.toUpperCase()} já está na sua Box!`);
      return;
    }

    console.log(`\n[OK] ✅ 🎉 Sucesso! ${this.pokemonUltimaBusca.name.toUpperCase()} foi capturado e salvo na sua Box! 📸 📦`);
    this.pokemonUltimaBusca = null; 
  }

  private async executarListagem(): Promise<void> {
    const listaPokemons = await BoxRepository.listarTodos();

    if (listaPokemons.length === 0) {
      console.log("\n[AVISO] ⚠️  Sua Box está vazia! Capture algum Pokémon na opção 2 primeiro.");
      return;
    }

    console.log('\n=================== 📦 SUA BOX DE POKÉMONS ===================');
    listaPokemons.forEach((pokemon, index) => {
      const tiposFormatados = formatarTipos(pokemon.types);
      
      const hp = pokemon.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0;
      const attack = pokemon.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0;
      const defense = pokemon.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0;

      console.log(`🆔 #${pokemon.id} - 📛 ${capitalizarTexto(pokemon.name)} | 🌿 Tipos: ${tiposFormatados} | 📏 Altura: ${formatarAltura(pokemon.height)} | ⚖️  Peso: ${formatarPeso(pokemon.weight)}`);
      console.log(`📊 Stats -> ❤️  HP: ${hp} | ⚔️  ATK: ${attack} | 🛡️  DEF: ${defense}`);

      if (index < listaPokemons.length - 1) {
        console.log('--------------------------------------------------------------');
      }
    });
    console.log('==============================================================');

    const pesoMedio = await BoxRepository.calcularPesoMedio();
    console.log(`⚖️   Peso Médio dos Pokémons na Box: ${formatarPeso(pesoMedio)}`);
    console.log('==============================================================');
  }

  private async executarFiltragem(): Promise<void> {
    const listaPokemons = await BoxRepository.listarTodos();

    if (listaPokemons.length === 0) {
      console.log("\n[AVISO] ⚠️  Sua Box está vazia! Não há Pokémons para filtrar.");
      return;
    }

    // Exibe a box completa e estilizada antes da pergunta
    console.log('\n=================== 📦 SUA BOX DE POKÉMONS ===================');
    listaPokemons.forEach((pokemon, index) => {
      const tiposFormatados = formatarTipos(pokemon.types);
      const hp = pokemon.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0;
      const attack = pokemon.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0;
      const defense = pokemon.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0;

      console.log(`🆔 #${pokemon.id} - 📛 ${capitalizarTexto(pokemon.name)} | 🌿 Tipos: ${tiposFormatados} | 📏 Altura: ${formatarAltura(pokemon.height)} | ⚖️  Peso: ${formatarPeso(pokemon.weight)}`);
      console.log(`📊 Stats -> ❤️  HP: ${hp} | ⚔️  ATK: ${attack} | 🛡️  DEF: ${defense}`);

      if (index < listaPokemons.length - 1) {
        console.log('--------------------------------------------------------------');
      }
    });
    console.log('==============================================================');

    const tipoAlvo = readlineSync.question("\n🌾 Digite o tipo de Pokémon para filtrar (ex: fire, water, grass): ").toLowerCase().trim();

    if (!tipoAlvo) {
      console.log("\n[AVISO] ⚠️  O tipo não pode ser vazio!");
      return;
    }

    const pokemonsFiltrados = listaPokemons.filter((pokemon) => 
      pokemon.types.some((t) => t.type.name.toLowerCase() === tipoAlvo)
    );

    if (pokemonsFiltrados.length === 0) {
      console.log(`\n[AVISO] ⚠️  Nenhum Pokémon do tipo "${tipoAlvo.toUpperCase()}" foi encontrado na sua Box.`);
      return;
    }

    console.log(`\n=================== 🌾 POKÉMONS DO TIPO: ${tipoAlvo.toUpperCase()} ===================`);
    pokemonsFiltrados.forEach((pokemon, index) => {
      const tiposFormatados = formatarTipos(pokemon.types);
      
      const hp = pokemon.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0;
      const attack = pokemon.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0;
      const defense = pokemon.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0;

      console.log(`🆔 #${pokemon.id} - 📛 ${capitalizarTexto(pokemon.name)} | 🌿  Tipos: ${tiposFormatados} | 📏  Altura: ${formatarAltura(pokemon.height)} | ⚖️  Peso: ${formatarPeso(pokemon.weight)}`);
      console.log(`📊 Stats -> ❤️  HP: ${hp} | ⚔️  ATK: ${attack} | 🛡️  DEF: ${defense}`);

      if (index < pokemonsFiltrados.length - 1) {
        console.log('--------------------------------------------------------------');
      }
    });
    console.log('====================================================================');
  }

  private async executarRemocao(): Promise<void> {
    const listaPokemons = await BoxRepository.listarTodos();

    if (listaPokemons.length === 0) {
      console.log("\n[AVISO] ⚠️  Sua Box está vazia! Não há Pokémons para remover.");
      return;
    }

    // Exibe a box completa e estilizada antes da pergunta
    console.log('\n=================== 📦 SUA BOX DE POKÉMONS ===================');
    listaPokemons.forEach((pokemon, index) => {
      const tiposFormatados = formatarTipos(pokemon.types);
      const hp = pokemon.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0;
      const attack = pokemon.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0;
      const defense = pokemon.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0;

      console.log(`🆔 #${pokemon.id} - 📛 ${capitalizarTexto(pokemon.name)} | 🌿 Tipos: ${tiposFormatados} | 📏 Altura: ${formatarAltura(pokemon.height)} | ⚖️  Peso: ${formatarPeso(pokemon.weight)}`);
      console.log(`📊 Stats -> ❤️  HP: ${hp} | ⚔️  ATK: ${attack} | 🛡️  DEF: ${defense}`);

      if (index < listaPokemons.length - 1) {
        console.log('--------------------------------------------------------------');
      }
    });
    console.log('==============================================================');
    
    const idInput = readlineSync.question("\n🗑️  Digite o ID do Pokémon que deseja remover: ").trim();
    const idNum = Number(idInput);

    if (isNaN(idNum) || !idInput) {
      console.log("\n[AVISO] ⚠️  Por favor, digite um ID numérico válido!");
      return;
    }

    const removido = await BoxRepository.remover(idNum);

    if (!removido) {
      console.log(`\n[AVISO] ⚠️  Nenhum Pokémon encontrado com o ID #${idNum}.`);
      return;
    }

    console.log(`\n[OK] ✅ 🎉 Pokémon com ID #${idNum} foi removido com sucesso da sua Box!`);
  }
}