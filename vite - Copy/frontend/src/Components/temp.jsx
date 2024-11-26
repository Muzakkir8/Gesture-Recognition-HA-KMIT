import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import cloud from '../assets/sun.png';

const Temp = () => {
  const [temperature, setTemperature] = useState("24");

  useEffect(() => {
 
  }, []);

  return (
    <StyledWrapper>
      <div className="card rounded-t-[45px] p-3 border-none shadow-sm lg:fixed lg:-bottom-5 relative">
    <div className='relative'>  <img src={cloud} className='opacity-100 w-28  ml-[220px] -mt-[20px] -mb-[100px]' /></div>  

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
    // background: rgba(81, 126, 242, 0.9); /* Slightly darker for contrast */
background: linear-gradient(to right, rgb(154 194 255), #0047ffc9);
    // border-radius: 16px; /* Increased border-radius for softer look */
    width: 350px;

    height: 150px;
    position: relative;
    // padding: 25px;
    
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
