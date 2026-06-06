import { execSync } from 'child_process';
import { ApiService } from './services/apiService.js';
import { CatalogoPokemon } from './repository/catalogoPokemon.js';
import { TerminalController } from './controllers/TerminalController.js';

if (process.platform === 'win32') {
  try {
    execSync('chcp 65001', { stdio: 'ignore' });
  } catch {}
}

async function iniciarAplicacao() {
  console.log('=========================================');
  console.log('🔄 INICIANDO FLUXO DE TESTE AUTOMÁTICO');
  console.log('=========================================');

  const catalogo = new CatalogoPokemon();

  const pikachu = await ApiService.buscarPokemon('pikachu');
  if (pikachu !== null) {
    catalogo.adicionar(pikachu);
  }

  const charmander = await ApiService.buscarPokemon('charmander');
  if (charmander !== null) {
    catalogo.adicionar(charmander);
  }

  const pikachuDuplicado = await ApiService.buscarPokemon('pikachu');
  if (pikachuDuplicado !== null) {
    catalogo.adicionar(pikachuDuplicado);
  }

  await ApiService.buscarPokemon('pokemon-inexistente');

  catalogo.listar();

  catalogo.remover(25);

  catalogo.listar();

  console.log('\n===================================');
  console.log('🔄 FIM DO FLUXO DE TESTE AUTOMÁTICO.');
  console.log('=====================================\n');
  console.log('\n====================================');
  console.log('🚀 INICIANDO MENU INTERATIVO CLI...');
  console.log('======================================\n');

  const menu = new TerminalController();
  await menu.iniciar();
}

iniciarAplicacao().catch((error) => {
  console.error('[ERRO] 💥 Erro fatal ao rodar a Pokémon CLI:', error);
});