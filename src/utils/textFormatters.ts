export function capitalizarTexto(texto: string): string {
  if (!texto) {
    return '';
  }

  const textoLimpo = texto.trim();
  return textoLimpo.charAt(0).toUpperCase() + textoLimpo.slice(1).toLowerCase();
}

export function formatarTipos(tipos: { type: { name: string } }[]): string {
  if (!tipos || tipos.length === 0) {
    return "Nenhum";
  }

  return tipos.map((slot) => capitalizarTexto(slot.type.name)).join(', ');
}

export function formatarAltura(alturaDecimetros: number): string {
  const metros = alturaDecimetros / 10;
  return `${metros.toFixed(1)} m`;
}

export function formatarPeso(pesoHectogramas: number): string {
  const quilos = pesoHectogramas / 10;
  return `${quilos.toFixed(1)} kg`;
}