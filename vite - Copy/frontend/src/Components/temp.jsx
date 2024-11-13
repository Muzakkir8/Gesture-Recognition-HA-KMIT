import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Temp = () => {
  const [temperature, setTemperature] = useState("24");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5001');
    socket.onopen = () => console.log('Connected to WebSocket server');
    socket.onmessage = (event) => {
      const { device, status, room } = JSON.parse(event.data);
      if (device === 'fan' && room === 'bedroom') {
        setTemperature(status);
      }
    };
    socket.onerror = (error) => console.error('WebSocket error:', error);
    socket.onclose = () => console.log('Disconnected from WebSocket server');

    return () => socket.close();
  }, []);

  return (
    <StyledWrapper>
      <div className="card">
        <svg className="background" fill="none" viewBox="0 0 342 175" height={180} width={342} xmlns="http://www.w3.org/2000/svg">
          <path fill="#517EF2" d="M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z" />
        </svg>
        <div className="cloud">
          <img src="https://cdn-icons-png.flaticon.com/512/2100/2100130.png" className="icon" alt="Cloud Icon" />
          <img src="https://cdn-icons-png.flaticon.com/512/12564/12564499.png" className="icon" alt="Humidity Icon" />
        </div>
        <p className="main-text">{`${temperature}°`}</p>
        <div className="info">
          <div className="info-left">
            <p className="label">Home Temp</p>
            <p className='updated'>Last Updated</p>
          </div>
          <div className="humidity">
            <p className="value">96%</p>
            <p className="label">Home Humidity</p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    background: rgba(81, 126, 242, 0.9); /* Slightly darker for contrast */
    // border-radius: 16px; /* Increased border-radius for softer look */
    width: 350px;
    height: 180px;
    position: relative;
    padding: 20px;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Added subtle shadow */
  }

  .background {
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 16px;
  }

  .cloud {
    position: absolute;
    top: 10px; /* Slightly lower for alignment */
    right: 10px;
    display: flex;
    gap: 8px;
  }

  .icon {
    width: 24px;
    height: 24px;
    opacity: 0.9;
  }

  .main-text {
    font-size: 48px;
    font-weight: bold;
    text-align: center;
    margin: 0;
  }

  .info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-top: 8px;
    font-size: 12px;
  }

  .label, .updated {
    opacity: 0.8;
  }

  .humidity .value {
    font-size: 24px;
    font-weight: bold;
  }
`;

export default Temp;
