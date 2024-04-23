import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateBeneficiary = () => {
  const initialFormData = { id: null, name: '', company: '', bank_country: '', account_number: '' };
  const [formData, setFormData] = useState(initialFormData);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchBeneficiaries();
  }, []); 

  const fetchBeneficiaries = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/beneficiaries/');
      setBeneficiaries(response.data); 
    } catch (error) {
      console.error('Error fetching beneficiaries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // If formData has an id, it means we are editing an existing beneficiary
        await axios.put(`http://127.0.0.1:8000/api/beneficiaries/${formData.id}/`, formData);
        setSuccessMessage('Beneficiary updated successfully!');
      } else {
        // If formData does not have an id, it means we are creating a new beneficiary
        const response = await axios.post('http://127.0.0.1:8000/api/beneficiaries/', formData);
        setSuccessMessage('Beneficiary created successfully!');
        // Update formData with the new beneficiary's id
        setFormData({ ...formData, id: response.data.id });
      }
      // Reset form fields to initial empty values after submission
      setFormData(initialFormData);
      fetchBeneficiaries(); // Refresh the list of beneficiaries
    } catch (error) {
      console.error('Error submitting beneficiary:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/beneficiaries/${id}/`);
      fetchBeneficiaries();
    } catch (error) {
      console.error('Error deleting beneficiary:', error);
    }
  };

  const handleEdit = (beneficiary) => {
    // Set formData with the details of the beneficiary to be edited
    setFormData({
      id: beneficiary.id,
      name: beneficiary.name,
      company: beneficiary.company,
      bank_country: beneficiary.bank_country,
      account_number: beneficiary.account_number
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Create New Beneficiary</h2>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Company:
          <input type="text" name="company" value={formData.company} onChange={handleChange} />
        </label>
        <br />
        <label>
          Bank Country:
          <input type="text" name="bank_country" value={formData.bank_country} onChange={handleChange} />
        </label>
        <br />
        <label>
          Account Number:
          <input type="text" name="account_number" value={formData.account_number} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">{formData.id ? 'Update Beneficiary' : 'Create Beneficiary'}</button>
      </form>

      <h2>List of Beneficiaries</h2>
      <ul>
        {beneficiaries.map((beneficiary) => (
          <li key={beneficiary.id}>
            {beneficiary.name} - {beneficiary.company} - {beneficiary.bank_country} - {beneficiary.account_number}
            <button onClick={() => handleEdit(beneficiary)}>Edit</button>
            <button onClick={() => handleDelete(beneficiary.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateBeneficiary;
