import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/Slices/dataSlice";

const Alldata = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Admin Panel - Page Data</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li> // Data structure-ஐப் பார்த்து மாற்றவும்
        ))}
      </ul>
    </div>
  );
};

export default Alldata;



