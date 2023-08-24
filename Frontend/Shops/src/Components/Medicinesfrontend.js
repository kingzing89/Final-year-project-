import { useContext, useEffect, useState } from 'react';
import "../Styles/crud.css"
import { Alert } from 'react-bootstrap';
import Medcontext from '../context/meds/Medcontext';
import MedState from '../context/meds/Medstate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBInput } from 'mdb-react-ui-kit';

function Medicinesfrontend() {
  const context = useContext(Medcontext);
  const { meds, getMeds, setMeds, addMeds, deleteMeds, editMeds } = context;
  let history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getMeds();

    }
    else {
      history("/");

    }


  }, [])
  const [price, setPrice] = useState("");
  const [medicinename, setMed] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [drugname, setDrugName] = useState("");
  const [size, setSize] = useState("");
  const [manufacture, setManufacture] = useState("");
  const [expirydate, setexpiryDate] = useState("");
  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(null);
  const [updateid, setUpdateid] = useState(null);
  const [fileState, setfilestate] = useState(" ");

  let handlefilestate = (e) => {

    if (e.target.files[0]) {
      setfilestate(e.target.files[0]);
      console.log(e.target.files[0]);


    }
    else {
      alert("No Image uploaded");
    }

  }

  //const [users,setUsers] = useState([]);
  const addUser = (e) => {
    e.preventDefault();
    const user = {

      medicinename,
      price,
      category,
      quantity,
      drugname,
      size,
      manufacture,
      expirydate,

    };
    if (edit) {
      //update user
      if (user.category == "" || user.medicinename == "" || user.price == "" || user.quantity == "" || user.manufacture == "" || user.size == "" || user.drugname == "" || user.expirydate == "") {
        alert("Empty fields entered");
      }
      else {
        let formData = new FormData();
        formData.append('Image', fileState);
        console.log(formData);

        axios.post("http://localhost:5000/upload", formData, {





        })
          .then((response) => {
            editMeds(updateid, user.medicinename, user.drugname, user.size, user.manufacture, user.category, user.price, user.quantity, user.expirydate, response.data.Image[0].filename);
            setEdit(false);





          }).catch((error) => {
            console.log(error);

          });




      }

    } else {
      //add user
      if (user.category == "" || user.medicinename == "" || user.price == "" || user.quantity == "" || user.manufacture == "" || user.size == "" || user.drugname == "" || user.expirydate == "") {
        alert("Empty fields entered");
      }
      else {
        let formData = new FormData();
        formData.append('Image', fileState);
        console.log(formData);

        axios.post("http://localhost:5000/upload", formData, {





        })
          .then((response) => {
            console.log(response.data.Image[0].filename);
            addMeds(user.medicinename, user.drugname, user.size, user.manufacture, user.category, user.price, user.quantity, user.expirydate, response.data.Image[0].filename);





          }).catch((error) => {
            console.log(error);

          });













        //setUsers([...users,user]);
      }
    }
    setMed("");
    setPrice("");
    setCategory("");
    setQuantity("");
    setDrugName("");
    setManufacture("");
    setSize("");
    setexpiryDate("");

  };

  const onEditClick = (index) => {
    const user = meds[index];
    setMed(user.medicinename);
    setPrice(user.price);
    setCategory(user.categoryy);
    setQuantity(user.quantity);
    setDrugName(user.drugname)
    setSize(user.size)
    setManufacture(user.manufacture)
    setexpiryDate(user.expirydate)
    setActive(index);
    setEdit(true);
    setUpdateid(user._id);

  };

  const deleteUser = (user) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      setEdit(false);

      deleteMeds(user._id);
      //let copy =meds.filter((item) =>item !==user);

      /// setUsers([...copy]);
    }
  };

  const updateUser = () => {

  }

  return (




    <div className="gradient-custom">
      <h1 ><center>Add Medicines</center></h1>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xs-12 col-sm-10 col-md-8 col-lg-5'>
            <form onSubmit={addUser}>
              <div className='form-group'>
                <label htmlFor=''><b>Medicine Name</b></label>
                <input type='text' className='form-control' value={medicinename} onChange={(e) => setMed(e.target.value)} placeholder='Enter Medicine Name' />
              </div>
              <div className='form-group'>
                <label htmlFor=''><b>Drug Name</b></label>
                <input type='text' className='form-control' value={drugname} onChange={(e) => setDrugName(e.target.value)} placeholder='Enter Drug Name' />
              </div>
              <div className='form-group'>
                <label htmlFor=''><b>Size</b></label>
                <input type='text' className='form-control' value={size} onChange={(e) => setSize(e.target.value)} placeholder='Enter Size' />
              </div>
              <div className='form-group'>
                <label htmlFor=''><b>Manufacture Name</b></label>
                <input type='text' className='form-control' value={manufacture} onChange={(e) => setManufacture(e.target.value)} placeholder='Enter Manufacture Name ' />
              </div>


              <div className='form-group '>
                <label htmlFor=''><b>Price</b></label>
                <span className="currencyinput"><input type="text" className='form-control value' name="currency" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price' /></span>

              </div>
              <div className='form-group'>

                <label htmlFor=''><b>Category</b></label>
                <select class="form-select" aria-label="Default select example" value={category} onChange={(e)=>setCategory(e.target.value)}>
                  <option selected>Select Category</option>
                  <option value='fever'>Fever</option>
                  <option value="cold">Cold</option>
                  <option value="cough">Cough</option>
                  <option value="AntiBiotic">Antibiotic</option>
                  <option value="Allergy">Allergy</option>
                  <option value="BP">BP</option>
                  <option value="Acidity">Acidity</option>
                  <option value="Hypertension">Hypertension</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='' className="form-label"><b>Quantity</b></label>

                <input type="number" min="0.00" max="10" step="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className='mb-3  ml-3 mr-3 form-control' placeholder='Enter Quantity' />
              </div>

              <div className='form-group'>
                <label htmlFor='Expiry'><b> Expiry Date</b></label>
                <input type='Date' className='form-control' value={expirydate} onChange={(e) => setexpiryDate(e.target.value)} placeholder='Enter Expiry Date' />
              </div>

              <div className='form-group'>
                <label className='mt-2'>Add Medicine Image*</label>
                <input type="file" name="Image" className="form-control form-control-sm w-50 p-3 mb-4" id="customFile" onChange={handlefilestate} />
              </div>
              <button className='btn btn-success form-control mb-2'>
                {edit ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>


      </div>
      <table className='table table-bordered table-color '>
        <thead>
          <tr>
            <th><b>Medicine Name</b></th>
            <th><b>Category</b></th>
            <th><b>Price</b></th>
            <th><b>Quantity</b></th>
            <th><b>Drugname</b></th>
            <th><b>Size</b></th>
            <th><b>Manufacture</b></th>
            <th><b>ExpiryDate</b></th>
            <th><b>Edit</b></th>
            <th><b>Delete</b></th>
          </tr>
        </thead>

        <tbody>
          {
            meds.map((user, index) => {
              return (

                <tr>
                  <td>{user.medicinename}</td>
                  <td>{user.category}</td>
                  <td>{user.price}</td>
                  <td>{user.quantity}</td>
                  <td>{user.drugname}</td>
                  <td>{user.size}</td>
                  <td>{user.manufacture}</td>
                  <td>{user.expirydate}</td>
                  <td>
                    <button
                      className='btn btn-info'
                      onClick={() => onEditClick(index)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className='btn btn-danger' onClick={() => deleteUser(user)}>Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>

      </table>
    </div>
  );
}

export default Medicinesfrontend;
