import React, { useEffect } from "react";
import { calculerBesoinHoraireParSpecialite, sommeColonne, moyenneColonne } from "../utils/calculs";

export default function TableauRepartition({ effectifData, specialties, onDataChange, titre }) {
  const findSpecialtyData = (specialite) => {
    return specialties.find(s => s["Spécialité"] === specialite) || {};
  };

  const rows = effectifData.length > 0
    ? effectifData.map(row => ({
        ...row,
        groupes: Number(row.groupes) || 0,
        apprenants: Number(row.apprenants) || 0
      }))
    : [{ specialite: "", groupes: 0, apprenants: 0 }];

  // ترتيب الأعمدة حسب الطلب: Théorie, Info, TP1, TP2, TP3
  const besoinTheorieArr = rows.map(row => {
    const spec = findSpecialtyData(row.specialite);
    return calculerBesoinHoraireParSpecialite(row.groupes || 0, spec["Besoin Théorique par Groupe"] || 0);
  });
  const besoinInfoArr = rows.map(row => {
    const spec = findSpecialtyData(row.specialite);
    return calculerBesoinHoraireParSpecialite(row.groupes || 0, spec["Besoin Pratique par Groupe"] || 0);
  });
  const besoinTP1Arr = rows.map(row => {
    const spec = findSpecialtyData(row.specialite);
    return calculerBesoinHoraireParSpecialite(row.groupes || 0, spec["Besoin TP Spécifique par Groupe"] || 0);
  });
  const besoinTP2Arr = rows.map(row => {
    const spec = findSpecialtyData(row.specialite);
    return calculerBesoinHoraireParSpecialite(row.groupes || 0, spec["Besoin TP2 par Groupe"] || 0);
  });
  const besoinTP3Arr = rows.map(row => {
    const spec = findSpecialtyData(row.specialite);
    return calculerBesoinHoraireParSpecialite(row.groupes || 0, spec["Besoin TP3 par Groupe"] || 0);
  });

  const sumBesoinTheorie = besoinTheorieArr.reduce((a, b) => a + b, 0);
  const sumBesoinInfo = besoinInfoArr.reduce((a, b) => a + b, 0);
  const sumBesoinTP1 = besoinTP1Arr.reduce((a, b) => a + b, 0);
  const sumBesoinTP2 = besoinTP2Arr.reduce((a, b) => a + b, 0);
  const sumBesoinTP3 = besoinTP3Arr.reduce((a, b) => a + b, 0);

  const besoinTheoriqueParGroupeArr = rows.map(row => {
    const spec = findSpecialtyData(row.specialite);
    return Number(spec["Besoin Théorique par Groupe"]) || 0;
  });
  const besoinPratiqueParGroupeArr = rows.map(row => {
    const spec = findSpecialtyData(row.specialite);
    return Number(spec["Besoin Pratique par Groupe"]) || 0;
  });
  const besoinTP1ParGroupeArr = rows.map(row => {
    const spec = findSpecialtyData(row.specialite);
    return Number(spec["Besoin TP Spécifique par Groupe"]) || 0;
  });
  const besoinTP2ParGroupeArr = rows.map(row => {
    const spec = findSpecialtyData(row.specialite);
    return Number(spec["Besoin TP2 par Groupe"]) || 0;
  });
  const besoinTP3ParGroupeArr = rows.map(row => {
    const spec = findSpecialtyData(row.specialite);
    return Number(spec["Besoin TP3 par Groupe"]) || 0;
  });

  const moyenneBesoinTheoriqueParGroupe = moyenneColonne(besoinTheoriqueParGroupeArr);
  const moyenneBesoinPratiqueParGroupe = moyenneColonne(besoinPratiqueParGroupeArr);
  const moyenneBesoinTpSpecParGroupe = moyenneColonne(besoinTP1ParGroupeArr);
  const moyenneBesoinTp2ParGroupe = moyenneColonne(besoinTP2ParGroupeArr);
  const moyenneBesoinTp3ParGroupe = moyenneColonne(besoinTP3ParGroupeArr);

  useEffect(() => {
    if (onDataChange) {
      onDataChange([
        {
          besoinTheorieTotal: sumBesoinTheorie,
          besoinInfoTotal: sumBesoinInfo,
          besoinTP1Total: sumBesoinTP1,
          besoinTP2Total: sumBesoinTP2,
          besoinTP3Total: sumBesoinTP3,
          moyenneBesoinTheoriqueParGroupe,
          moyenneBesoinPratiqueParGroupe,
          moyenneBesoinTpSpecParGroupe,
          moyenneBesoinTp2ParGroupe,
          moyenneBesoinTp3ParGroupe,
        }
      ]);
    }
  }, [
    sumBesoinTheorie, sumBesoinInfo, sumBesoinTP1, sumBesoinTP2, sumBesoinTP3,
    moyenneBesoinTheoriqueParGroupe, moyenneBesoinPratiqueParGroupe,
    moyenneBesoinTpSpecParGroupe, moyenneBesoinTp2ParGroupe, moyenneBesoinTp3ParGroupe,
    onDataChange
  ]);

  return (
    <div
      className="bg-white shadow rounded-2xl mb-8"
      style={{
        width: "fit-content",
        margin: "auto",
        padding: "1rem 2rem" // هامش داخلي من كل الجهات حول الجدول
      }}
    >
      <h2 className="text-xl font-bold text-gray-700 mb-2 text-center">{titre || "Répartition"}</h2>
      <div className="table-responsive" style={{ width: "auto", overflowX: "auto", margin: "auto" }}>
        <table className="table-compact" style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>Spécialité</th>
              <th>Besoin<br />Théorie</th>
              <th>Besoin<br />Info</th>
              <th>Besoin<br />TP1</th>
              <th>Besoin<br />TP2</th>
              <th>Besoin<br />TP3</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const spec = findSpecialtyData(row.specialite);
              const besoinTheorie = calculerBesoinHoraireParSpecialite(row.groupes || 0, spec["Besoin Théorique par Groupe"] || 0);
              const besoinInfo = calculerBesoinHoraireParSpecialite(row.groupes || 0, spec["Besoin Pratique par Groupe"] || 0);
              const besoinTP1 = calculerBesoinHoraireParSpecialite(row.groupes || 0, spec["Besoin TP Spécifique par Groupe"] || 0);
              const besoinTP2 = calculerBesoinHoraireParSpecialite(row.groupes || 0, spec["Besoin TP2 par Groupe"] || 0);
              const besoinTP3 = calculerBesoinHoraireParSpecialite(row.groupes || 0, spec["Besoin TP3 par Groupe"] || 0);

              return (
                <tr key={idx}>
                  <td>{row.specialite || ""}</td>
                  <td className="text-center">{besoinTheorie}</td>
                  <td className="text-center">{besoinInfo}</td>
                  <td className="text-center">{besoinTP1}</td>
                  <td className="text-center">{besoinTP2}</td>
                  <td className="text-center">{besoinTP3}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="font-bold text-right">Somme</td>
              <td className="text-center font-bold">{sumBesoinTheorie}</td>
              <td className="text-center font-bold">{sumBesoinInfo}</td>
              <td className="text-center font-bold">{sumBesoinTP1}</td>
              <td className="text-center font-bold">{sumBesoinTP2}</td>
              <td className="text-center font-bold">{sumBesoinTP3}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}