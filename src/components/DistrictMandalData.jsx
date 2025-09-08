import { useState, useEffect } from "react";
import { Field, ErrorMessage } from "formik";

export default function DistrictMandalData({ setFieldValue, values }) {
  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals] = useState([]);

  // ✅ Fetch districts on load
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = [
          { id: "anantapur", name: "Anantapur" },
          { id: "chittoor", name: "Chittoor" },
          { id: "east-godavari", name: "East Godavari" },
          { id: "guntur", name: "Guntur" },
          { id: "kadapa", name: "Kadapa" },
          { id: "krishna", name: "Krishna" },
          { id: "kurnool", name: "Kurnool" },
          { id: "nellore", name: "SPS Nellore" },
          { id: "prakasam", name: "Prakasam" },
          { id: "sri-kakulam", name: "Srikakulam" },
          { id: "visakhapatnam", name: "Visakhapatnam" },
          { id: "vizianagaram", name: "Vizianagaram" },
          { id: "west-godavari", name: "West Godavari" },
        ];
        setDistricts(response);
      } catch (err) {
        console.error("❌ Error fetching districts:", err);
      }
    };
    fetchDistricts();
  }, []);

  // ✅ Fetch mandals when district changes
  const fetchMandals = (districtId) => {
    const mandalsData = {
      anantapur: [
        { id: "atp1", name: "Anantapur Urban" },
        { id: "atp2", name: "Dharmavaram" },
        { id: "atp3", name: "Hindupur" },
      ],
      chittoor: [
        { id: "ctr1", name: "Chittoor Urban" },
        { id: "ctr2", name: "Tirupati Rural" },
        { id: "ctr3", name: "Madanapalle" },
      ],
    };

    setMandals(mandalsData[districtId] || []);
  };

  return (
    <>
      {/* ✅ District Dropdown */}
      <label>District</label>
      <Field
        as="select"
        name="district"
        onChange={(e) => {
          const selectedDistrict = e.target.value;
          setFieldValue("district", selectedDistrict);
          setFieldValue("mandal", ""); // reset mandal
          if (selectedDistrict) {
            fetchMandals(selectedDistrict);
          } else {
            setMandals([]);
          }
        }}
      >
        <option value="">Select District</option>
        {districts.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </Field>
      <ErrorMessage name="district" component="div" className="error" />

      {/* ✅ Mandal Dropdown */}
      {values.district && (
        <>
          <label>Mandal</label>
          <Field as="select" name="mandal">
            <option value="">Select Mandal</option>
            {mandals.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </Field>
          <ErrorMessage name="mandal" component="div" className="error" />
        </>
      )}
    </>
  );
}
