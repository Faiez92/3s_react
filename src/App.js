import React from 'react';  
import BeneficiaryList from './components/BeneficiaryList';
import CreateBeneficiary from './components/CreateBeneficiary';

function App() {
  return (
    <div className="App">
      <BeneficiaryList />
      <hr />
      <CreateBeneficiary />
    </div>
  );
}

export default App;
