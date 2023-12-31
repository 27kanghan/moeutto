import React from 'react';

const SeasonLabel = ({ imagePath, label }) => (
  <div className="flex items-center">
    <img src={imagePath} alt="" className="w-[40px] h-[40px] m-3" />
    {/* <div className="text-WebBody2 p-2">{label}</div> */}
  </div>
);

const SeasonDot = ({ position }) => (
  <div
    className="absolute rounded-full w-5 h-5 bg-pink border-2 border-pink z-99 flex"
    style={{
      top: position.top,
      left: position.left,
    }}
  />
);

const Coordinate = ({ seasonX, seasonY }) => {
  const position = { top: seasonX*1.8, left: seasonY*1.8 };

  return (
    <div className="flex items-center justify-center w-[90%] mb-10">
      <div className="bg-gray-button h-[384px] w-full flex justify-center items-center rounded-[30px] shadow-md">
        <div className='me-2'>
          <SeasonLabel imagePath="/images/summar.png" label="여름" />
        </div>
        <div className="flex flex-col items-center">
          <SeasonLabel imagePath="/images/spring.png" label="봄" />
          <div className="bg-white h-[200px] w-[250px] relative rounded-2xl">
            <div className="absolute top-1/2 left-0 border border-black w-full z-1" />
            <SeasonDot position={position} />
            <div className="absolute top-0 left-1/2 border border-black h-full z-1" />
          </div>
          <SeasonLabel imagePath="/images/fall.png" label="가을" />
        </div>
        <SeasonLabel imagePath="/images/winter.png" label="겨울" />
      </div>
    </div>
  );
};

export default Coordinate;
