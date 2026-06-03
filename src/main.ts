import { MenuView } from './views/MenuView.js';

console.log('🚀 Inicializando Pokédex CLI...');

const menu = new MenuView();
menu.iniciar().catch((error) => {
    console.error("💥 Erro fatal ao rodar a Pokédex: ", error);
});