import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BeneficiaryList = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);

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

  /* return (
    <div>
      <h1>List of Beneficiaries</h1>
      <ul>
        {beneficiaries.map(beneficiary => (
          <li key={beneficiary.id}>
            {beneficiary.name} - {beneficiary.company} - {beneficiary.bank_country} - {beneficiary.account_number}
          </li>
        ))}
      </ul>
    </div> 
  );*/
};

export default BeneficiaryList;
