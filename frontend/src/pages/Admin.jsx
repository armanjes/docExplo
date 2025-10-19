import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { URL } from "../config";

const Admin = () => {
  const { doctors, setDoctors } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [addDoctor, setAddDoctor] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    specialization: "",
    consultationFee: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `${URL}doctors/${editingId}`
      : `${URL}doctors/`;

    const method = editingId ? "patch" : "post";

    try {
      const { data } = await axios({
        method,
        url,
        data: {
          name: addDoctor.name,
          email: addDoctor.email,
          password: addDoctor.password,
          role: addDoctor.role,
          specialization: addDoctor.specialization,
          consultationFee: addDoctor.consultationFee,
        },
        withCredentials: true,
      });
      
      if (data.ok) {
        if (editingId) {
          setDoctors((prev) => {
            return prev.map((doc) =>
              doc._id === editingId ? data.doctor : doc
            );
          });
          setEditingId(null);
        } else {
          setDoctors((prev) => [...prev, data.account]);
        }

        setAddDoctor({
          name: "",
          email: "",
          password: "",
          role: "",
          specialization: "",
          consultationFee: 0,
        });
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const { data } = await axios.delete(
        `${URL}doctors/${_id}`,
        { withCredentials: true }
      );
      if (data.ok) {
        setDoctors((prev) => prev.filter((doc) => doc._id !== _id));
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleUpdate = (doc) => {
    setAddDoctor({
      name: doc.name,
      email: doc.email,
      password: "",
      role: doc.role,
      specialization: doc.specialization,
      consultationFee: doc.consultationFee,
    });
    setEditingId(doc._id);
  };

  return (
    <div>
      <h1>This is admin page</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={addDoctor.name}
          onChange={(e) => setAddDoctor({ ...addDoctor, name: e.target.value })}
          type="text"
          placeholder="Enter name"
        />
        <input
          value={addDoctor.email}
          onChange={(e) =>
            setAddDoctor({ ...addDoctor, email: e.target.value })
          }
          type="email"
          placeholder="Enter email"
        />
        {!editingId && (
          <input
            value={addDoctor.password}
            onChange={(e) =>
              setAddDoctor({ ...addDoctor, password: e.target.value })
            }
            type="password"
            placeholder="Enter password"
          />
        )}

        <input
          value={addDoctor.specialization}
          onChange={(e) =>
            setAddDoctor({ ...addDoctor, specialization: e.target.value })
          }
          type="text"
          placeholder="Enter specialization"
        />
        <input
          value={addDoctor.role}
          onChange={(e) => setAddDoctor({ ...addDoctor, role: e.target.value })}
          type="text"
          placeholder="Enter Role"
        />
        <input
          value={addDoctor.consultationFee}
          onChange={(e) =>
            setAddDoctor({ ...addDoctor, consultationFee: e.target.value })
          }
          type="text"
          placeholder="Enter fee"
        />
        <button type="submit">{editingId ? "Save changes" : "Add"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setAddDoctor({
                name: "",
                email: "",
                password: "",
                role: "",
                specialization: "",
                consultationFee: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <hr />

      {!doctors.length ? (
        <p>No doctor found</p>
      ) : (
        doctors.map((doc, idx) => {
          return (
            <div key={idx}>
              <p>Dr. {doc.name}</p>
              <small>{doc.specialization}</small>
              <p>{doc.email}</p>
              <p>{doc.consultationFee}</p>
              <button onClick={() => handleUpdate(doc)}>Edit</button>
              <button onClick={() => handleDelete(doc._id)}>Delete</button>
            </div>
          );
        })
      )}
    </div>
  );
};
export default Admin;
