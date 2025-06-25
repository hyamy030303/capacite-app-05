export function calculerSurfacePedagogique(surface, cno, maxApprenants) {
  const s = Number(surface) || 0;
  const c = Number(cno) || 1;
  const m = Number(maxApprenants) || 1;
  const result = s / c;
  if (isNaN(result) || !isFinite(result)) return 0;
  return result <= m ? parseFloat(result.toFixed(2)) : m;
}

export function calculerHeuresMax(semaines, heuresParSemaine = 56, diviseur = 1) {
  const s = Number(semaines) || 1;
  const h = Number(heuresParSemaine) || 1;
  const d = Number(diviseur) || 1;
  if (isNaN(s) || isNaN(h) || isNaN(d)) return 0;
  return h * s / d;
}

export function moyenneColonne(colonne) {
  const valides = colonne
    .map(val => Number(val))
    .filter(val => typeof val === 'number' && !isNaN(val));
  if (valides.length === 0) return 0;
  const total = valides.reduce((acc, curr) => acc + curr, 0);
  return parseFloat((total / valides.length).toFixed(2));
}

export function sommeColonne(colonne) {
  return colonne
    .map(val => Number(val))
    .filter(val => typeof val === 'number' && !isNaN(val))
    .reduce((acc, curr) => acc + curr, 0);
}

export function calculerBesoinHoraireParSpecialiteAjout(nbGroupes, nbGroupesAjout, besoinParGroupe) {
  const n = Number(nbGroupes) || 0;
  const nAjout = Number(nbGroupesAjout) || 0;
  const b = Number(besoinParGroupe) || 0;
  if (isNaN(n) || isNaN(nAjout) || isNaN(b)) return 0;
  return (n + nAjout) * b;
}

export function calculerHeuresRestantes(sommeHeuresMax, sommeBesoinParSpecialite) {
  const a = Number(sommeHeuresMax) || 0;
  const b = Number(sommeBesoinParSpecialite) || 0;
  if (isNaN(a) || isNaN(b)) return 0;
  return parseFloat((a - b).toFixed(2));
}

export function calculerApprenantsPossibles(heuresRestantes, moyenneBesoinParGroupe, moyenneSurfacePedagogique) {
  const h = Number(heuresRestantes) || 0;
  const m = Number(moyenneBesoinParGroupe) || 1;
  const s = Number(moyenneSurfacePedagogique) || 1;
  if (isNaN(h) || isNaN(m) || isNaN(s) || m === 0 || s === 0) {
    console.warn("Invalid input detected. Returning 0.");
    return 0;
  }
  return Math.round((h / m) * s);
}

export function determinerEtat(heuresRestantes) {
  const h = Number(heuresRestantes);
  if (isNaN(h)) return '-';
  return h >= 0 ? 'Excédent' : 'Dépassement';
}