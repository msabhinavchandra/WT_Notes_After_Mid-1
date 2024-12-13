import React from 'react';

function Card({ car }) {
  const { cID, cName, desc, image, price } = car;

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={image} alt={cName} />
      <div className="card-body">
        <h5 className="card-title">{cName}</h5>
        <p className="card-text">{desc}</p>
        <h3>INR {price}</h3>
      </div>
    </div>
  );
}

export default Card;
