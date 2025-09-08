import { ErrorMessage } from "formik";

function TeachingMediumData({ setFieldValue, values }) {
  const handleMultiAdd = (field, value) => {
    if (value && !values[field].includes(value)) {
      setFieldValue(field, [...values[field], value]);
    }
  };

  const handleMultiRemove = (field, value) => {
    setFieldValue(field, values[field].filter((v) => v !== value));
  };

  return (
    <>
      <label>Teaching Medium</label>
      <select
        onChange={(e) => {
          handleMultiAdd("teachingMedium", e.target.value);
          e.target.value = "";
        }}
      >
        <option value="">Select a medium</option>
        {["English", "Hindi", "Other"]
          .filter((m) => !values.teachingMedium.includes(m))
          .map((medium) => (
            <option key={medium} value={medium}>
              {medium}
            </option>
          ))}
      </select>

      <div className="tag-box">
        {values.teachingMedium.map((medium) => (
          <span key={medium} className="tag">
            {medium}
            <button
              type="button"
              onClick={() => handleMultiRemove("teachingMedium", medium)}
            >
              ❌
            </button>
          </span>
        ))}
      </div>
      <ErrorMessage name="teachingMedium" component="div" className="error" />
    </>
  );
}

export default TeachingMediumData;
