import React from 'react'


const containerStyle = {
    display: 'flex',
    backgroundColor: '#50B8E2',
    color: 'white',
  };

  const columnStyle = {
    flex: 1,
    padding: '12px',
    overflowY: 'hidden', // Apply vertical scrolling - then auto
    height: '25px',  // Then set a height to enable scrolling
  };

  
const InfoPanel = () => {
  return (
    <div>
    
    <div style={containerStyle}>
    
      <div style={columnStyle}>
        <p>Click on the map to set a position.</p>
      </div>
      <h2>Bathym</h2>
      <div style={columnStyle}>
        <p>Double click on the map to get Bathy-Info.</p>
      </div>
    </div>
    </div>
  )
}

export default InfoPanel;