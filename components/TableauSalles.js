import React, { useState } from "react";
import {
  calculerSurfacePedagogique,
  calculerHeuresMax,
  moyenneColonne,
  sommeColonne
} from "../utils/calculs";

// أضف TP2 وTP3
const salleTitles = [
  { key: "theorie", label: "Salles Théorie" },
  { key: "pratique", label: "Salles Info" },
  { key: "tpSpecifiques", label: "Salles TP1" },
  { key: "tp2", label: "Salles TP2" },
  { key: "tp3", label: "Salles TP3" },
];

// diviseur = 1 افتراضي دائمًا
const defaultSalle = (cno, semaines, heures, maxApprenants = 26, diviseur = 1) => ({
  surface: "",
  cno: Number(cno) || 1,
  semaines: Number(semaines) || 1,
  heures: Number(heures) || 1,
  diviseur: Number(diviseur) || 1,
  surfaceP: calculerSurfacePedagogique(0, Number(cno) || 1, Number(maxApprenants) || 1),
  heuresMax: calculerHeuresMax(Number(semaines) || 1, Number(heures) || 1, Number(diviseur) || 1),
});

export default function TableauSalles({
  salles,
  setSalles,
  cnos,
  setCnos,
  semaines,
  setSemaines,
  heures,
  setHeures,
  apprenants,
  setApprenants,
  diviseur,
  setDiviseur
}) {
  // حالة إظهار الجداول
  const [visibleTables, setVisibleTables] = useState({
    theorie: false,
    pratique: false,
    tpSpecifiques: false,
    tp2: false,
    tp3: false,
  });

  React.useEffect(() => {
    let changed = false;
    const newSalles = { ...salles };
    salleTitles.forEach(({ key }) => {
      if (!Array.isArray(newSalles[key]) || newSalles[key].length === 0) {
        newSalles[key] = [defaultSalle(
          cnos[key],
          semaines[key],
          heures[key],
          apprenants[key],
          diviseur[key] || 1 // مرر diviseur دائمًا
        )];
        changed = true;
      }
    });
    if (changed) setSalles(newSalles);
    // eslint-disable-next-line
  }, []);

  const handleChange = (type, index, field, value) => {
    setSalles(prev => {
      const arr = prev[type].slice();
      arr[index] = { ...arr[index], [field]: value };
      arr[index].surfaceP = calculerSurfacePedagogique(
        Number(arr[index].surface) || 0,
        Number(arr[index].cno) || 1,
        Number(apprenants[type]) || 1
      );
      arr[index].heuresMax = calculerHeuresMax(
        Number(arr[index].semaines) || 1,
        Number(arr[index].heures) || 1,
        Number(arr[index].diviseur) || 1
      );
      return { ...prev, [type]: arr };
    });
  };

  const updateCno = (type, value) => {
    setCnos(prev => ({ ...prev, [type]: value }));
    setSalles(prev => {
      const arr = prev[type].map(salle => ({
        ...salle,
        cno: value,
        surfaceP: calculerSurfacePedagogique(
          Number(salle.surface) || 0,
          Number(value) || 1,
          Number(apprenants[type]) || 1
        )
      }));
      return { ...prev, [type]: arr };
    });
  };
  const updateSemaines = (type, value) => {
    setSemaines(prev => ({ ...prev, [type]: value }));
    setSalles(prev => {
      const arr = prev[type].map(salle => ({
        ...salle,
        semaines: value,
        heuresMax: calculerHeuresMax(
          Number(value) || 1,
          Number(salle.heures) || 1,
          Number(salle.diviseur) || 1
        )
      }));
      return { ...prev, [type]: arr };
    });
  };
  const updateHeures = (type, value) => {
    setHeures(prev => ({ ...prev, [type]: value }));
    setSalles(prev => {
      const arr = prev[type].map(salle => ({
        ...salle,
        heures: value,
        heuresMax: calculerHeuresMax(
          Number(salle.semaines) || 1,
          Number(value) || 1,
          Number(salle.diviseur) || 1
        )
      }));
      return { ...prev, [type]: arr };
    });
  };

  const updateApprenants = (type, value) => {
    setApprenants(prev => ({ ...prev, [type]: value }));
    setSalles(prev => {
      const arr = prev[type].map(salle => ({
        ...salle,
        surfaceP: calculerSurfacePedagogique(
          Number(salle.surface) || 0,
          Number(salle.cno) || 1,
          Number(value) || 1
        )
      }));
      return { ...prev, [type]: arr };
    });
  };

  const updateDiviseur = (type, value) => {
    setDiviseur(prev => ({ ...prev, [type]: value }));
    setSalles(prev => {
      const arr = prev[type].map(salle => ({
        ...salle,
        diviseur: value,
        heuresMax: calculerHeuresMax(
          Number(salle.semaines) || 1,
          Number(salle.heures) || 1,
          Number(value) || 1
        )
      }));
      return { ...prev, [type]: arr };
    });
  };

  const ajouterSalle = (type) => {
    setSalles(prev => ({
      ...prev,
      [type]: [
        ...prev[type],
        defaultSalle(
          cnos[type],
          semaines[type],
          heures[type],
          apprenants[type],
          diviseur[type] || 1 // مرر diviseur دائمًا
        )
      ],
    }));
  };

  const annulerModification = (type) => {
    setSalles(prev => {
      const arr = prev[type];
      if (arr.length > 1) {
        return { ...prev, [type]: arr.slice(0, -1) };
      } else {
        return {
          ...prev,
          [type]: [
            {
              ...arr[0],
              surface: "",
              surfaceP: calculerSurfacePedagogique(0, Number(arr[0].cno) || 1, Number(apprenants[type]) || 1),
              heuresMax: calculerHeuresMax(
                Number(arr[0].semaines) || 1,
                Number(arr[0].heures) || 1,
                Number(arr[0].diviseur) || 1
              ),
            }
          ]
        };
      }
    });
  };

  const heuresOptions = Array.from({ length: 60 }, (_, i) => i + 1);
  const cnoOptions = Array.from({ length: 21 }, (_, i) => +(1 + i * 0.1));
  const semainesOptions = Array.from({ length: 100 }, (_, i) => i + 1);
  const apprenantsOptions = Array.from({ length: 21 }, (_, i) => 10 + i);
  const diviseurOptions = Array.from({ length: 6 }, (_, i) => i + 1);

  // قائمة اختيار الجداول
  const handleTableCheck = (key) => {
    setVisibleTables(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* قائمة اختيار الجداول */}
      <div className="flex flex-wrap gap-3 mb-3 items-center justify-center">
        {salleTitles.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-1 text-xs">
            <input
              type="checkbox"
              checked={!!visibleTables[key]}
              onChange={() => handleTableCheck(key)}
              className="accent-blue-500"
            />
            {label}
          </label>
        ))}
      </div>
      {/* عرض الجداول المختارة فقط */}
      <div className="flex flex-wrap justify-center gap-3 w-full">
        {salleTitles.filter(({ key }) => visibleTables[key]).map(({ key, label }) => {
          const sallesType = salles[key] && salles[key].length > 0
            ? salles[key]
            : [defaultSalle(
                cnos[key],
                semaines[key],
                heures[key],
                apprenants[key],
                diviseur[key] || 1 // مرر diviseur دائمًا
              )];
          const totalHeuresMax = sommeColonne(sallesType.map(s => Number(s.heuresMax) || 0));
          const moyenneSurfaceP = moyenneColonne(sallesType.map(s => Number(s.surfaceP) || 0));
          return (
            <div className="bg-white shadow rounded-xl p-2 mb-3 max-w-xs w-full sm:w-[260px] flex-shrink-0" key={key}>
              <h2 className="compact-title table-title text-center mb-2">{label}</h2>
              <div className="mb-1 flex flex-col items-center">
                <div className="flex gap-1 mb-1 justify-center">
                  <span className="text-xs w-12 text-center">CNO</span>
                  <span className="text-xs w-12 text-center">Sem.</span>
                  <span className="text-xs w-12 text-center">Heures</span>
                  <span className="text-xs w-14 text-center">Appr.</span>
                  <span className="text-xs w-14 text-center">Diviseur</span> {/* أضف هذا السطر */}
                </div>
                <div className="flex gap-1 justify-center">
                  <select
                    value={cnos[key]}
                    onChange={e => updateCno(key, Number(e.target.value))}
                    className="text-xs px-1 py-1 h-6 border rounded w-12 text-center"
                  >
                    {cnoOptions.map(opt => (
                      <option key={opt} value={opt}>{opt.toFixed(1)}</option>
                    ))}
                  </select>
                  <select
                    value={semaines[key]}
                    onChange={e => updateSemaines(key, Number(e.target.value))}
                    className="text-xs px-1 py-1 h-6 border rounded w-12 text-center"
                  >
                    {semainesOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <select
                    value={heures[key]}
                    onChange={e => updateHeures(key, Number(e.target.value))}
                    className="text-xs px-1 py-1 h-6 border rounded w-12 text-center"
                  >
                    {heuresOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <select
                    value={apprenants[key]}
                    onChange={e => updateApprenants(key, Number(e.target.value))}
                    className="text-xs px-1 py-1 h-6 border rounded w-14 text-center"
                  >
                    {apprenantsOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <select
                    value={diviseur[key]}
                    onChange={e => updateDiviseur(key, Number(e.target.value))}
                    className="text-xs px-1 py-1 h-6 border rounded w-14 text-center"
                  >
                    {diviseurOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div
                className="table-responsive flex justify-center"
                style={{
                  width: "100%",
                  overflowX: "auto",
                  justifyContent: "center",
                  display: "flex"
                }}
              >
                <table className="compact-table table-compact" style={{ margin: "auto" }}>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Surface<br />(m²)</th>
                      <th>Surface<br />Pédag.</th>
                      <th>Heures<br />Max</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sallesType.map((salle, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <input
                            type="number"
                            value={salle.surface}
                            onChange={e => handleChange(key, index, "surface", e.target.value)}
                            className="w-12 p-1 border rounded"
                            style={{ fontSize: "0.8rem" }}
                          />
                        </td>
                        <td>{salle.surfaceP}</td>
                        <td>{salle.heuresMax}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-bold bg-gray-100">
                      <td colSpan={2}>Moy/Σ</td>
                      <td>{moyenneSurfaceP}</td>
                      <td>{totalHeuresMax}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="flex gap-2 mt-2 justify-center">
                <button
                  className="bg-blue-500 text-white rounded px-2 py-1 text-xs"
                  onClick={() => ajouterSalle(key)}
                  style={{ minWidth: 0 }}
                >
                  Ajouter
                </button>
                <button
                  className="bg-gray-300 text-gray-700 rounded px-2 py-1 text-xs"
                  onClick={() => annulerModification(key)}
                  style={{ minWidth: 0 }}
                >
                  Annuler
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}