import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Styling.css';

const DetailView = () => {
  const location = useLocation();

  const clickedShopData = location.state;

  const [goTo, setGoTo] = useState(false);

  let shopDescription = '';

  function truncating() {
    let string = clickedShopData.description;
    if (string.length > 140) {
      shopDescription = string.slice(0, 140) + ' ....';
    } else {
      return shopDescription;
    }
  }

  truncating();

  function goBackToList() {
    setGoTo(true);
  }

  if (goTo) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <div className='content2'>
        <ul>
          <h2>Detail View</h2>
        </ul>

        <ul>{<img src={clickedShopData.logo}></img>}</ul>
        <ul>
          <li>
            Shop Description: <br /> {shopDescription}
          </li>
        </ul>

        {clickedShopData.cashbackRates[0].length > 0 ? (
          <ul>
            {clickedShopData.cashbackRates?.map((rate) => (
              <div className='list' key={clickedShopData.id}>
                <span>Cashback Rates</span>
                {rate.map((innerRate) => (
                  <div className='divider' key={clickedShopData.id}>
                    <ul>Amount: {innerRate.amount}</ul>
                    <ul>Type: {innerRate.type}</ul>
                    <ul>Description: {innerRate.description}</ul>
                  </div>
                ))}
              </div>
            ))}
          </ul>
        ) : (
          'No Cashback Found !'
        )}
        <ul>
          <div>
            <ul>
              <span> Categories: </span>
              {clickedShopData.categories.map((category, index) => (
                <li key={index}>{category.name}</li>
              ))}
            </ul>
          </div>
        </ul>

        <button className='buttonDesign2' onClick={() => goBackToList()}>
          Get back to List View
        </button>
      </div>
    </div>
  );
};

export default DetailView;
