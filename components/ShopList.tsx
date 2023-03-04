import React, { useState, useEffect } from 'react';
import { Shop } from '@/models/shops';
import ShopListItem from './ShopListItem';
import Filters from './Filters';
import styles from '@/styles/Home.module.css'


type State = {
  shops: Shop[]
}

type Filters = {
  lat: number
  lng: number
  radius: number
  limit: number
}


const ShopList = () => {
  const [data, setData] = useState<State>({ 
    shops: [],
  });

  const [filters, setFilters] = useState<Filters>({
    lat: 47.607210466707414,
    lng: -122.32634875892973,
    radius: 1000,
    limit: 20,
  })

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const {lat, lng, radius, limit } = filters;
      const response = await fetch(`http://localhost:3000/api/shops?lat=${lat}&lng=${lng}&radius=${radius}&limit=${limit}`);
      // convert the data to json
      const json = await response.json();
      const { shops } = json;
      // set state with the result
      setData({ ...data, shops });
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [filters])

  return (
    <div className={styles.shopList}>
      <Filters {...filters} setFilters={setFilters} />
      <ul>
        {data.shops.map(shop => (
          <ShopListItem key={shop.id} shop={shop}/>
        ))}
      </ul>
    </div>

  );
}

export default ShopList;