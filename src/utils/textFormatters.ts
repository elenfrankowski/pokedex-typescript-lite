//Transforma a primeira letra de um texto em maiúscula
export function capitalizarTexto(texto: string): string {
  if (!texto) {
    return '';
  }

  const textoLimpo = texto.trim();
  return textoLimpo.charAt(0).toUpperCase() + textoLimpo.slice(1).toLowerCase();
}

//Formata um array de tipos de Pokémon em uma única string separada por vírgula e capitalizada
export function formatarTipos(tipos: { type: { name: string } }[]): string {
    if (!tipos || tipos.length === 0) {
        return "Nenhum";
    }

    // Mapeia usando o 'type.name' de dentro de cada objeto do array
    return tipos.map((slot) => capitalizarTexto(slot.type.name)).join(', ');
}

//Converte a altura da PokeAPI (decímetros) para metros formatados
export function formatarAltura(alturaDecimetros: number): string {
    const metros = alturaDecimetros / 10;
    return `${metros.toFixed(1)} m`;
}

//Converte o peso da PokeAPI (hectogramas) para quilos formatados
export function formatarPeso(pesoHectogramas: number): string {
    const quilos = pesoHectogramas / 10;
    return `${quilos.toFixed(1)} kg`;
}