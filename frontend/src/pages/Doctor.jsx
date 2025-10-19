import { useAuth } from "../context/AuthContext";

const Doctor = () => {
  const { doctors, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {doctors.map((doc, idx) => {
        return (
          <div key={idx}>
            <p>Dr. {doc.name}</p>
            <p>{doc.email}</p>
            <p>{doc.specalization}</p>
            <p>{doc.consultationFee}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Doctor;
