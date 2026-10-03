export function calcularReputacionBayesiana(
  promedioJugador: number,
  totalEvaluaciones: number,
  promedioGlobal: number = 4.0,
  m: number = 5
): number {
  if (totalEvaluaciones === 0) {
    return promedioGlobal;
  }

  const pesoJugador = totalEvaluaciones / (totalEvaluaciones + m);
  const pesoGlobal = m / (totalEvaluaciones + m);

  const reputacionBayesiana = (pesoJugador * promedioJugador) + (pesoGlobal * promedioGlobal);

  return Math.round(reputacionBayesiana * 100) / 100;
}