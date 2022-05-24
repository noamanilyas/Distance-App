import React, { useState } from 'react';
import PartnerItem from './components/PartnerItem';
import { getPartners } from './API';
import DistanceInput from './components/DistanceInput';
import { IPartner } from './types/IPartner.type';

const App: React.FC = () => {
  const [partners, setPartners] = useState<IPartner[]>([]);
  /**
   * Will we coming from a select or radio or backend.
   * Supposed these as defaults
   */
  const [lat, setLat] = useState<number>(32.985364);
  const [lng, setLng] = useState<number>(70.58413);

  const handleGetPartners = (distance: number): void => {
    console.log('distance');
    getPartners(distance, lat, lng)
      .then(({ data: { result } }) => {
        setPartners(result);
      })
      .catch((err: Error) => console.log(err));
  };

  return (
    <main className="app">
      <h1>Distance App</h1>
      <DistanceInput getPartners={handleGetPartners} />
      {partners.map((item: IPartner) => (
        <PartnerItem key={item.id} partner={item} />
      ))}

      {partners.length === 0 && (
        <h2 className="no-items">No Partners Available</h2>
      )}
    </main>
  );
};

export default App;
