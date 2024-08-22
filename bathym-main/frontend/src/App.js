import React from 'react';
import MapComponent from './MapComponent';
import './App.css';
import InfoPanel from './InfoPanel';

function App() {
  return (
    <div className="App">
      {/* <h1>Bathymetric Map Viewer</h1> */}
      <InfoPanel/>
      <MapComponent />
    </div>
  );
}

export default App;
