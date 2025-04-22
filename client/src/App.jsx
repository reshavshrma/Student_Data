import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";

const App = () => {
  const [formdata, Setdata] = useState({ name: "", email: "", phone: "", address: "", age: "" });
  const [Editform, SetEditform] = useState({ name: "", email: "", phone: 0, address: "", age: "" });
  const [people, Setpeople] = useState([]);
  const [Add, Setadd] = useState(false);
  const [Available, Setavai] = useState(true);
  const [Edit, SetEdit] = useState(false);
  const [id, Setid] = useState(null);
  
  axios.defaults.baseURL = "http://localhost:5000/";

  const Fetchpeople = async () => {
    const avai = await axios.get("/");
    Setpeople(avai.data.people);
  };

  const Handle = (e) => {
    const { name, value } = e.target;
    Setdata((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    Fetchpeople();
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/create", formdata);
    Fetchpeople();
    Setadd(false);
  };

  const HandleUpdate = async (e) => {
    e.preventDefault();
    SetEdit(false);
    Setadd(false);
    Setavai(true);
    await axios.put("/update/" + id, Editform);
    Fetchpeople();
  };

  const Updateform = (name, email, phone, address, age) => {
    SetEditform({ name, email, phone: Number(phone), address, age });
  };

  const Handlechange = (e) => {
    const { name, value } = e.target;
    SetEditform((prev) => ({ ...prev, [name]: value }));
  };

  const Del = async (_id) => {
    await axios.delete("/delete/" + _id);
    Fetchpeople();
  };

  return (
    <article className="card">
      {Available ? (
        <button className="Add" type="button" onClick={() => { 
          Setadd(true); 
          Setavai(false); 
          Setdata({ name: "", email: "", phone: "", address: "", age: "" }); // Reset the form data when adding
        }}>
          Add
        </button>
      ) : (
        <button className="Close" type="button" onClick={() => { 
          Setadd(false); 
          SetEdit(false); 
          Setavai(true); 
        }}>
          Close
        </button>
      )}

      {Add ? (
        <Form HandleSubmit={HandleSubmit} Handle={Handle} form={formdata} />
      ) : (
        <table className="table">
          <tbody className="tbody">
            <tr>
              <th className="field_data">Name</th>
              <th className="field_data">Email</th>
              <th className="field_data">Phone</th>
              <th className="field_data">Address</th>
              <th className="field_data">Age</th>
              <th className="field_data">Update</th>
              <th className="field_data">Delete</th>
            </tr>
            {people.map((data) => {
              const { _id, name, email, phone, address, age } = data;
              return (
                <tr className="row" key={_id}>
                  <td className="field_data">{name}</td>
                  <td className="field_data">{email}</td>
                  <td className="field_data">{phone}</td>
                  <td className="field_data">{address}</td>
                  <td className="field_data">{age}</td>
                  <td className="field_data">
                    <button className="update" onClick={() => {
                      SetEdit(true);
                      Setavai(false);
                      Setid(_id);
                      Updateform(name, email, phone, address, age);
                    }}>
                      Update
                    </button>
                  </td>
                  <td className="field_data">
                    <button className="delete" onClick={() => Del(_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {Edit ? (
        <Form HandleSubmit={HandleUpdate} Handle={Handlechange} form={Editform} />
      ) : (
        <article></article>
      )}
    </article>
  );
};

export default App;
