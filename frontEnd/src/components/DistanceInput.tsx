import React, { useState } from 'react';

type Props = {
  getPartners: (distance: number) => void;
};

const DistanceInput: React.FC<Props> = ({ getPartners }) => {
  const [inputVal, setInputVal] = useState<number>(0);

  const handleChange = (event: { target: HTMLInputElement }) => {
    setInputVal(Number(event.target.value));
  };

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    getPartners(inputVal);
  };

  return (
    <div className="top-section">
      <div>
        <input
          aria-label="distanceInput"
          onChange={handleChange}
          type="number"
          id="name"
          placeholder="Distance in KM"
        />
        <button aria-label="distanceInputBtn" onClick={handleClick}>
          Get Partners
        </button>
      </div>
    </div>
  );
};

export default DistanceInput;
