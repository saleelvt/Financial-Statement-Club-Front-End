import React, { useState } from "react";

interface Property {
  name: string;
  values: number[];
}

interface Section {
  title: string;
  properties: Property[];
  subTotals: number[];
}

const BalanceSheetForm: React.FC = () => {
  const [dates] = useState(["Date 1", "Date 2"]);

  const [sections, setSections] = useState<Section[]>([
    {
      title: "Non-current Assets",
      properties: [],
      subTotals: [0, 0],
    },
    {
      title: "Current Assets",
      properties: [],
      subTotals: [0, 0],
    },
    {
      title: "Shareholder's Equity",
      properties: [],
      subTotals: [0, 0],
    },
    {
      title: "Non-current Liabilities",
      properties: [],
      subTotals: [0, 0],
    },
    {
      title: "Current Liabilities",
      properties: [],
      subTotals: [0, 0],
    },
  ]);

  const handleValueChange = (
    sectionIdx: number,
    propIdx: number,
    dateIdx: number,
    value: string
  ) => {
    const newSections = [...sections];
    const numValue = parseFloat(value) || 0;
    newSections[sectionIdx].properties[propIdx].values[dateIdx] = numValue;
    newSections[sectionIdx].subTotals[dateIdx] = newSections[sectionIdx].properties.reduce(
      (acc, prop) => acc + (prop.values[dateIdx] || 0),
      0
    );
    setSections(newSections);
  };

  const addProperty = (sectionIdx: number) => {
    const newSections = [...sections];
    newSections[sectionIdx].properties.push({ name: "", values: [0, 0] });
    setSections(newSections);
  };

  const removeProperty = (sectionIdx: number, propIdx: number) => {
    const newSections = [...sections];
    newSections[sectionIdx].properties.splice(propIdx, 1);
    newSections[sectionIdx].subTotals = [
      newSections[sectionIdx].properties.reduce((acc, p) => acc + p.values[0], 0),
      newSections[sectionIdx].properties.reduce((acc, p) => acc + p.values[1], 0),
    ];
    setSections(newSections);
  };

  const getTotalAssets = (dateIdx: number) => {
    return sections[0].subTotals[dateIdx] + sections[1].subTotals[dateIdx];
  };

  const getTotalLiabilitiesEquity = (dateIdx: number) => {
    return (
      sections[2].subTotals[dateIdx] +
      sections[3].subTotals[dateIdx] +
      sections[4].subTotals[dateIdx]
    );
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-2">Main Name</th>
            {dates.map((date, idx) => (
              <th key={idx} className="text-center p-2">
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sections.map((section, sectionIdx) => (
            <React.Fragment key={sectionIdx}>
              <tr>
                <td colSpan={3} className="font-bold p-2 text-gray-700">
                  {section.title}
                </td>
              </tr>
              {section.properties.map((prop, propIdx) => (
                <tr key={propIdx}>
                  <td className="p-2">
                    <input
                      type="text"
                      className="border rounded p-1 w-full"
                      value={prop.name}
                      onChange={(e) => {
                        const newSections = [...sections];
                        newSections[sectionIdx].properties[propIdx].name =
                          e.target.value;
                        setSections(newSections);
                      }}
                    />
                  </td>
                  {dates.map((_, dateIdx) => (
                    <td key={dateIdx} className="p-2">
                      <input
                        type="number"
                        className="border rounded p-1 w-full"
                        value={prop.values[dateIdx] || 0}
                        onChange={(e) =>
                          handleValueChange(
                            sectionIdx,
                            propIdx,
                            dateIdx,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))}
                  <td>
                    <button
                      className="ml-2 text-red-600"
                      onClick={() => removeProperty(sectionIdx, propIdx)}
                    >
                      –
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100">
                <td className="p-2 font-semibold">Subtotal</td>
                {section.subTotals.map((total, idx) => (
                  <td key={idx} className="text-center font-semibold">
                    {total}
                  </td>
                ))}
                <td>
                  <button
                    className="ml-2 text-green-600"
                    onClick={() => addProperty(sectionIdx)}
                  >
                    + Add
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
          <tr className="bg-gray-300 font-bold">
            <td className="p-2">Total Assets</td>
            {dates.map((_, idx) => (
              <td key={idx} className="text-center">
                {getTotalAssets(idx)}
              </td>
            ))}
          </tr>
          <tr className="bg-gray-300 font-bold">
            <td className="p-2">Total Equity & Liabilities</td>
            {dates.map((_, idx) => (
              <td key={idx} className="text-center">
                {getTotalLiabilitiesEquity(idx)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="text-right mt-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Capture & Upload
        </button>
      </div>
    </div>
  );
};

export default BalanceSheetForm;
