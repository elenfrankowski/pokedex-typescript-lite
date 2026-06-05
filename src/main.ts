import { ApiService } from './services/apiService.js';
import { CatalogoPokemon } from './repository/catalogoPokemon.js';
import { MenuView } from './views/MenuView.js';

async function iniciarAplicacao() {
  console.log('================================');
  console.log('🔄 INICIANDO FLUXO DE TESTE ');
  console.log('================================');

  // 1. Instancia o catálogo exigido pelo edital
  const catalogo = new CatalogoPokemon();

  // 2. Busca e adiciona o Pikachu
  const pikachu = await ApiService.buscarPokemon('pikachu');
  if (pikachu !== null) {
    catalogo.adicionar(pikachu);
  }

  // 3. Busca e adiciona o Charmander
  const charmander = await ApiService.buscarPokemon('charmander');
  if (charmander !== null) {
    catalogo.adicionar(charmander);
  }

  // 4. Tenta adicionar o Pikachu duplicado (Validação de duplicidade)
  const pikachuDuplicado = await ApiService.buscarPokemon('pikachu');
  if (pikachuDuplicado !== null) {
    catalogo.adicionar(pikachuDuplicado);
  }

  // 5. Testa busca por um Pokémon inexistente
  await ApiService.buscarPokemon('pokemon-inexistente');

  // 6. Lista o catálogo atual
  catalogo.listar();

  // 7. Remove o Pokémon de ID 25 (Pikachu)
  catalogo.remover(25);

  // 8. Lista novamente para comprovar a remoção
  catalogo.listar();

  console.log('\n==========================');
  console.log('🔄 FIM DO FLUXO DE TESTE.');
  console.log('============================\n');
  console.log('\n====================================');
  console.log('🚀 INICIANDO MENU INTERATIVO CLI...');
  console.log('======================================\n');

  // 9. Executa o seu loop de menu original após os testes automáticos
  const menu = new MenuView();
  await menu.iniciar();
}

// Executa a aplicação tratando erros fatais, mantendo sua lógica original
iniciarAplicacao().catch((error) => {
  console.error('💥 Erro fatal ao rodar a Pokémon CLI:', error);
});