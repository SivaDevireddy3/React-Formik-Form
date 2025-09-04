import "./App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "./ValidationSchema";
import { useState } from "react";

const initialValues = {
  name: "",
  description: "",
  branches: [],
  instituteType: "",
  endSemDate: "",
  email: "",
  phoneNumber: "",
  // logo: "",
  // instLicence: "",
  licenceStartDate: "",
  licenceEndDate: "",
  highestQualification: "",
  teachingMedium: [],
  courseFee: "",
  courses: [],
};

const courseOptions = {
  CSE: ["DSA", "Operating Systems", "Web Development"],
  ECE: ["Digital Electronics", "VLSI", "Communication Systems"],
  MECH: ["Thermodynamics", "Machine Design", "Fluid Mechanics"],
  CIVIL: ["Structural Analysis", "Surveying", "Construction Management"],
};

function App() {
  const [availableCourses, setAvailableCourses] = useState([]);

  // ✅ Submit to backend API
  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();

    // Append all fields
    Object.keys(values).forEach((key) => {
      if (Array.isArray(values[key])) {
        formData.append(key, JSON.stringify(values[key])); // stringify arrays
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:8080/api/institutes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to submit");

      const data = await response.json();
      console.log("✅ Submitted:", data);
      alert("Institute registered successfully!");
      resetForm();
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Submission failed!");
    }
  };

  return (
    <div className="App">
      <h2>Institute Registration Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => {
          const updateCourses = (branch, checked) => {
            let newBranches = [...values.branches];
            if (checked) {
              newBranches.push(branch);
            } else {
              newBranches = newBranches.filter((b) => b !== branch);
            }
            setFieldValue("branches", newBranches);

            const allCourses = newBranches.flatMap(
              (b) => courseOptions[b] || []
            );
            setAvailableCourses(allCourses);
            setFieldValue("courses", []);
          };

          const handleMultiAdd = (field, value) => {
            if (value && !values[field].includes(value)) {
              setFieldValue(field, [...values[field], value]);
            }
          };

          const handleMultiRemove = (field, value) => {
            setFieldValue(
              field,
              values[field].filter((v) => v !== value)
            );
          };

          return (
            <Form className="form-container">
              <label>Name</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" component="div" className="error" />

              <label>Description</label>
              <Field name="description" as="textarea" />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />

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
              <ErrorMessage
                name="branches"
                component="div"
                className="error"
              />

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
                  <ErrorMessage
                    name="courses"
                    component="div"
                    className="error"
                  />
                </>
              )}

              <label>Institute Type</label>
              <div className="radio-group">
                {["Private", "Govt", "Other"].map((type) => (
                  <label key={type}>
                    <Field type="radio" name="instituteType" value={type} />
                    {type}
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="instituteType"
                component="div"
                className="error"
              />

              <label>End Semester Date</label>
              <Field name="endSemDate" type="date" />
              <ErrorMessage
                name="endSemDate"
                component="div"
                className="error"
              />

              <label>Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />

              <label>Phone Number</label>
              <Field name="phoneNumber" type="text" />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="error"
              />

              {/* <label>Logo</label>
              <input
                type="file"
                onChange={(event) =>
                  setFieldValue("logo", event.currentTarget.files[0])
                }
              />
              <ErrorMessage name="logo" component="div" className="error" />

              <label>Institute Licence</label>
              <input
                type="file"
                onChange={(event) =>
                  setFieldValue("instLicence", event.currentTarget.files[0])
                }
              />
              <ErrorMessage
                name="instLicence"
                component="div"
                className="error"
              /> */}

              <label>Licence Start Date</label>
              <Field name="licenceStartDate" type="date" />
              <ErrorMessage
                name="licenceStartDate"
                component="div"
                className="error"
              />

              <label>Licence End Date</label>
              <Field name="licenceEndDate" type="date" />
              <ErrorMessage
                name="licenceEndDate"
                component="div"
                className="error"
              />

              <label>Highest Qualification</label>
              <Field as="select" name="highestQualification">
                <option value="">Select qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
              </Field>
              <ErrorMessage
                name="highestQualification"
                component="div"
                className="error"
              />

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
                      onClick={() =>
                        handleMultiRemove("teachingMedium", medium)
                      }
                    >
                      ❌
                    </button>
                  </span>
                ))}
              </div>
              <ErrorMessage
                name="teachingMedium"
                component="div"
                className="error"
              />

              <label>Course Fee</label>
              <Field name="courseFee" type="number" />
              <ErrorMessage
                name="courseFee"
                component="div"
                className="error"
              />

              <button type="submit" className="submit-btn">
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default App;
