import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UnitPage = () => {
  const navigate = useNavigate();
  const unit = useLoaderData();
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);

  // Used for the loader below
  const { id } = useParams();

  return (
    <>
      <h1>I DO NOT KNOW PEPELAUGH</h1>
    </>
  );
};

const BASE_URL = 'http://localhost:8080';

const unitLoader = async ({ params }) => {
  const response = await fetch(`${BASE_URL}/units/${params.id}`);
  const data = await response.json();
  return data;
};

export { UnitPage as default, unitLoader };
