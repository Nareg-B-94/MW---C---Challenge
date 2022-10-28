import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Styling.css';

const ListView = () => {
  const url = 'https://testapi.mehrwerk.de/v3/cashback/shops';
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE2NjcwMjExMjksImlkIjoiU0EtYmV3ZXJiZXIiLCJuYW1lIjpudWxsLCJzY29wZSI6W10sInR5cGUiOiJzZXJ2aWNlQWNjb3VudCIsImNvbnRyYWN0cyI6bnVsbCwicm9sZXMiOlsiaWFtOm1hbmFnZVVzZXJzIiwicGFwOnVzZSIsImNhc2hiYWNrOnVzZSJdLCJ0ZW5hbnQiOiJCRVdFUkJFUiJ9.IPLiuTN5j43spREmJ_7qrsUuBZjRfW84XLYoVyhEid3fsELPi-u9K2-KUmOTY8aa6j822uBOdG6KN0_Mbb16vs1hMtPP-SsDKaAptwR8TaBxr6qmUzOrXUXNjV9ngqoYvFikAgdL3Vkx2eDjY8ZtCHqgkWuX4YTgSl54-n5XFXXfjX2GrTIGJe5eeDEac7poEOniOBsBYyPkEyh_BqcmMfoUtmwInQ90wVbbg-TM5LHHJmUbkJ--FyMH1AV9iT_sTNuxl87xS2erVHGBqhHXwcAPrxlPSyyLWPC6-2SSCVWLUtbHmHmrl1Cr1WaCP9ISFTwbRJRCLxzgFx4xFavCOuPKejDp7rgxiTCnrAKFKVGOO-t4qOIhdxnl4d1Hqe0uZvSeglMgv12942igPfEqOHYWORKwWu3hz6GFDKMikcrcYw5O5389-zJn1Y6t0pDkNIZAt9m6szqyvYPSQRz9I-auPPBxvvgVTGuQegE-s_mrTTeyutqxemS4GShhWonhKK6Yr_dvEfEn_pMlMShpm2W01Y0CJXXr9FSr7a5u6SaVunT2orb8L4JrqV6N80QwQ4tDupJGHb3VWt87cyDxq-ytu7MLMTSpbproDE51BphnLDJQzdE9nqB6nxQfypgs-2PFBu7DlIBSsUwHoNxEzyzydmPhjEzPap2CFSy3b9Y';

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-API-KEY': 'lQeUjTylHDCxqfISyZ05C7m1rov3hEZLYAqO42zs7h1fPBL2RF',
    },
  };

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [goTo, setGoTo] = useState(false);

  const [shops, setShops] = useState([]);

  const [clickedShop, setClickedShop] = useState();

  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.items.map((shopsData) => {
          return {
            name: shopsData.name,
            id: shopsData.id,
            logo: shopsData.logo,
            description: shopsData.description,
            isFavorite: `${shopsData.isFavorite}`,
            cashbackRates: [shopsData.cashbackRates],
            categories: shopsData.categories,
            link: shopsData.link,
          };
        });

        setShops(transformedData);
      });
  }, []);

  function showDetailHandler(prop) {
    setClickedShop(prop);
    setGoTo(true);
  }

  if (goTo) {
    return <Navigate state={clickedShop} to='/detail' />;
  }
  return (
    <div>
      <h2>List View</h2>
      {shops.map((shop, index) => (
        <div className='content' key={index}>
          <ul>Name : {shop.name}</ul>
          <ul>
            Logo :<br />
            <img alt='' src={shop.logo}></img>
          </ul>
          <ul>Favourite : {shop.isFavorite}</ul>
          <ul>
            <a href={shop.link}>
              {shop.link}/{shop.id}
            </a>
          </ul>

          <button
            className='buttonDesign'
            onClick={() => showDetailHandler(shop)}
          >
            Show Details!
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListView;

//-------------------------------------------
//---- generating token

// const url1 = 'https://testapi.mehrwerk.de/v2/iam/oauth/token';

// const requestOptions = {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     Origin: '',
//     Host: '',
//     'X-API-KEY': 'lQeUjTylHDCxqfISyZ05C7m1rov3hEZLYAqO42zs7h1fPBL2RF',
//   },
//   body: JSON.stringify({
//     client_id: 'bewerber',
//     client_secret: 'hj52Ws4kF',
//     grant_type: 'client_credentials',
//   }),
// };

// function getToken() {
//   fetch(url1, requestOptions)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
{
  /* <button onClick={getToken}>get Token first!</button>; */
}
