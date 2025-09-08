import * as yup from "yup";

const allowedEmailDomains = ["ac.in", "edu.in", "institute.com"];
const allowedPhonePrefixes = ["080", "044", "022", "011"];

export const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters long")
    .required("Institute name is required"),

  description: yup
    .string()
    .min(10, "Description should have at least 10 characters")
    .required("Description is required"),

  branches: yup
    .array()
    .min(1, "Select at least one branch")
    .required("Branches are required"),

  courses: yup
    .array()
    .min(1, "Select at least one course")
    .required("Courses are required"),

  instituteType: yup.string().required("Please select an institute type"),

  endSemDate: yup
    .date()
    .required("End Semester Date is required")
    .typeError("Please enter a valid date"),

  email: yup
    .string()
    .email("Please enter a valid email address")
    .test(
      "is-institute-email",
      `Email must belong to institute domain (${allowedEmailDomains.join(", ")})`,
      (value) => {
        if (!value) return false;
        return allowedEmailDomains.some((domain) => value.endsWith(domain));
      }
    )
    .required("Institute email is required"),

  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .length(10, "Phone number must be exactly 10 digits")
    .test(
      "is-institute-number",
      `Phone number must start with one of: ${allowedPhonePrefixes.join(", ")}`,
      (value) => {
        if (!value) return false;
        return allowedPhonePrefixes.some((prefix) => value.startsWith(prefix));
      }
    )
    .required("Institute phone number is required"),

  // logo: yup.mixed().required("Institute logo is required"),
  // instLicence: yup.mixed().required("Institute Licence file is required"),

  licenceStartDate: yup
    .date()
    .required("Licence Start Date is required")
    .typeError("Invalid start date"),

  licenceEndDate: yup
    .date()
    .min(yup.ref("licenceStartDate"), "End Date cannot be before Start Date")
    .required("Licence End Date is required")
    .typeError("Invalid end date"),

  highestQualification: yup
    .string()
    .required("Please select the highest qualification"),

  teachingMedium: yup
    .array()
    .min(1, "Select at least one teaching medium")
    .required("Teaching medium is required"),

  courseFee: yup
    .number()
    .typeError("Course fee must be a number")
    .positive("Course fee must be greater than 0")
    .required("Course fee is required"),

  // ✅ Newly added fields
  district: yup.string().required("Please select a district"),
  mandal: yup.string().required("Please select a mandal"),
});
