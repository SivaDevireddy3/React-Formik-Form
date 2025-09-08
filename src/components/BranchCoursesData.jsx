import { Field, ErrorMessage } from "formik";
import { useState } from "react";

// ✅ Branches & Courses data
const courseOptions = {
  CSE: ["DSA", "Operating Systems", "Web Development"],
  ECE: ["Digital Electronics", "VLSI", "Communication Systems"],
  MECH: ["Thermodynamics", "Machine Design", "Fluid Mechanics"],
  CIVIL: ["Structural Analysis", "Surveying", "Construction Management"],
};

function BranchCourseData({ setFieldValue, values }) {
  const [availableCourses, setAvailableCourses] = useState([]);

  // ✅ Branch update
  const updateCourses = (branch, checked) => {
    let newBranches = [...values.branches];
    if (checked) newBranches.push(branch);
    else newBranches = newBranches.filter((b) => b !== branch);
    setFieldValue("branches", newBranches);

    const allCourses = newBranches.flatMap((b) => courseOptions[b] || []);
    setAvailableCourses(allCourses);
    setFieldValue("courses", []);
  };

  // ✅ Multi select add/remove
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
      {/* ✅ Branches */}
      <label>Branches</label>
      <div className="checkbox-group">
        {Object.keys(courseOptions).map((branch) => (
          <label key={branch}>
            <input
              type="checkbox"
              checked={values.branches.includes(branch)}
              onChange={(e) => updateCourses(branch, e.target.checked)}
            />
            {branch}
          </label>
        ))}
      </div>
      <ErrorMessage name="branches" component="div" className="error" />

      {/* ✅ Courses (multi select) */}
      {availableCourses.length > 0 && (
        <>
          <label>Courses</label>
          <select
            onChange={(e) => {
              handleMultiAdd("courses", e.target.value);
              e.target.value = "";
            }}
          >
            <option value="">Select a course</option>
            {availableCourses
              .filter((c) => !values.courses.includes(c))
              .map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
          </select>
          <div className="tag-box">
            {values.courses.map((course) => (
              <span key={course} className="tag">
                {course}
                <button
                  type="button"
                  onClick={() => handleMultiRemove("courses", course)}
                >
                  ❌
                </button>
              </span>
            ))}
          </div>
          <ErrorMessage name="courses" component="div" className="error" />
        </>
      )}
    </>
  );
}

export default BranchCourseData;
