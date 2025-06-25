import React from "react";

const dependancesList = [
  "Équipe de formateurs adéquate",
  "Attestation de prévention (Protection Civil)",
  "Voies de circulation adéquates",
  "système de ventilation adéquat",
  "Équipements nécessaires selon les spécialités"
];

export default function TableauDependances({ choices, setChoices }) {
  // لم نعد نستخدم useState هنا، بل نستقبل choices و setChoices من props

  const handleSelect = (idx, value) => {
    setChoices(prev => {
      const arr = [...prev];
      arr[idx] = Number(value);
      return arr;
    });
  };

  return (
    <div
      className="bg-white shadow rounded-2xl p-4 mb-8 table-responsive"
      style={{
        display: "block",
        width: "fit-content",
        minWidth: 0,
        maxWidth: "100%",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center table-title">Dépendances</h2>
      <table
        className="table-compact"
        style={{
          margin: "auto",
          width: "auto",
          tableLayout: "auto"
        }}
      >
        <colgroup>
          <col style={{ width: "auto", whiteSpace: "nowrap" }} />
          <col style={{ width: "90px", whiteSpace: "nowrap" }} /> {/* وسع العمود */}
        </colgroup>
        <tbody>
          {dependancesList.map((dep, idx) => (
            <tr key={idx}>
              <td style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}>{dep}</td>
              <td style={{
                fontSize: "1.1rem",
                textAlign: "center",
                whiteSpace: "nowrap",
                minWidth: 70, // مساحة أوسع
                maxWidth: 120
              }}>
                <select
                  value={choices[idx]}
                  onChange={e => handleSelect(idx, e.target.value)}
                  style={{
                    fontSize: "1.1em",
                    padding: "2px 8px",
                    borderRadius: 5,
                    border: "1px solid #bbb",
                    background: "#f9fafb",
                    color:
                      choices[idx] === 1
                        ? "#16a34a"
                        : choices[idx] === 2
                        ? "#dc2626"
                        : "#444",
                    width: "70px" // مساحة أوسع
                  }}
                >
                  <option value={0}>---</option>
                  <option value={1} style={{ color: "#16a34a" }}>Oui</option>
                  <option value={2} style={{ color: "#dc2626" }}>Non</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}