import React from 'react';
import './styles.css';
import PatientForm from './components/PatientForm';
import ProgressChart from './components/ProgressChart';

function App() {
  return (
    <div>
      <h1>Gait Rehabilitation App</h1>
      <PatientForm />
      <ProgressChart />  {/* Displays the chart */}
    </div>
  );
}

export default App;
