import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper className='mt-10 ml-10 hidden sm:block'>
      <div className="card  mx-auto ">
        <svg fill="none" viewBox="0 0 342 175" height={180} width={342} xmlns="http://www.w3.org/2000/svg" className="background">
          <path fill="#517EF2" d="M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2={128} x2="354.142" y1={128} x1={0} id="paint0_linear_103_640">
              <stop stopColor="#5936B4" />
              <stop stopColor="#362A84" offset={1} />
            </linearGradient>
          </defs>
        </svg>
        <div className="cloud flex">
        <img src="https://cdn-icons-png.flaticon.com/512/2100/2100130.png" className="w-12" />
        <img src="https://cdn-icons-png.flaticon.com/512/12564/12564499.png" alt="" className="w-12" />


        </div>
        <p className="main-text font-mono  text-[39px] text-white">24°</p>
        <div className="info">
          <div className="info-left">
            <p className="text-gray mb-14">Home Temp</p>
            <p className='text-white -mt-8 opacity-75 text-[15px]'>Last Updated</p>
          </div>
          <p className="hum  -mr-1 font-mono text-white text-[39px] opacity-92 font-normal -mt-5">96% <br /> <p className="text-gray-300 font-sans text-[15px] opacity-75">Home Humidity</p>
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    background:transparent;
    border:none;
    width: 342px;
    height: 184px;
    position: relative;
    padding: 20px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .background {
    fill: linear-gradient(90deg, #5936B4 0%, #362A84 100%);
    position: absolute;
    inset: 0;
    z-index: -1;
  }

  .cloud {
    position: absolute;
    right: 0;
    top: -12px;
  }

  .cloud svg {
    height: 120px;
  }

  .card .main-text {
    font-size: 48px;
    z-index: 2;
  }

  .card .info {
    display: flex;
    justify-content: space-between;
  }

  .card .info .text-gray {
    color: rgba(235, 235, 245, 0.60);
  }

  .card .info .info-right {
    align-self: flex-end;
  }`;

export default Card;
