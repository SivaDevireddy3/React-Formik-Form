import "./App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "./components/ValidationSchema";
import BranchCourseData from "./components/BranchCoursesData";
import TeachingMediumData from "./components/TeachingMediumData";
import DistrictMandalData from "./components/DistrictMandalData";

// ✅ Initial values
const initialValues = {
  name: "",
  description: "",
  branches: [],
  instituteType: "",
  endSemDate: "",
  email: "",
  phoneNumber: "",
  licenceStartDate: "",
  licenceEndDate: "",
  highestQualification: "",
  teachingMedium: [],
  courseFee: "",
  courses: [],
  district: "",
  mandal: "",
};

function App() {
  const handleSubmit = async (values, { resetForm }) => {
    console.log("📋 Preview Form Data:", values);

    try {
      const response = await fetch("http://localhost:8080/api/institutes/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.text();
      alert(result); // ✅ Show backend response
    } catch (error) {
      console.error("❌ Error submitting:", error);
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
        {({ setFieldValue, values }) => (
          <Form className="form-container">
            {/* ✅ Name */}
            <label>Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" className="error" />

            {/* ✅ Description */}
            <label>Description</label>
            <Field name="description" as="textarea" />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />

            {/* ✅ Branch & Courses */}
            <BranchCourseData setFieldValue={setFieldValue} values={values} />

            {/* ✅ Institute Type */}
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

            {/* ✅ End Semester Date */}
            <label>End Semester Date</label>
            <Field name="endSemDate" type="date" />
            <ErrorMessage name="endSemDate" component="div" className="error" />

            {/* ✅ Email */}
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />

            {/* ✅ Phone Number */}
            <label>Phone Number</label>
            <Field name="phoneNumber" type="text" />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="error"
            />

            {/* ✅ Licence Dates */}
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

            {/* ✅ Highest Qualification */}
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

            {/* ✅ Teaching Medium */}
            <TeachingMediumData setFieldValue={setFieldValue} values={values} />

            {/* ✅ Course Fee */}
            <label>Course Fee</label>
            <Field name="courseFee" type="number" />
            <ErrorMessage name="courseFee" component="div" className="error" />

            {/* ✅ District & Mandal */}
            <DistrictMandalData setFieldValue={setFieldValue} values={values} />

            {/* ✅ Submit */}
            <button type="submit" className="submit-btn">
              Preview Form Data
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
