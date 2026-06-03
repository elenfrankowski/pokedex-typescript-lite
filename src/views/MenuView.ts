import readlineSync from 'readline-sync';

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

    //Inicia o loop principal do menu que mantém o programa rodando
    public iniciar(): void {
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
                console.log("\n🔍 Funcionalidade selecionada: Buscar Pokémon (Em breve)...");
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