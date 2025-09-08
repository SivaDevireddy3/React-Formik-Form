export const InstituteType = () => {
  return (
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
  );
}