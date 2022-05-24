import React from 'react';
import { IPartner } from '../types/IPartner.type';

type Props = {
  partner: IPartner;
};

const Partner: React.FC<Props> = ({ partner }) => {
  return (
    <div className="card">
      <div className="card-text-div">
        <h1>{partner.organization}</h1>

        {partner.offices.map((item: string) => (
          <h4 key={item}>{item}</h4>
        ))}
      </div>
    </div>
  );
};

export default Partner;
