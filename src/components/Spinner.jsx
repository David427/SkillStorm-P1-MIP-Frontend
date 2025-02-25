import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = ({ loading }) => {
  const override = {
    display: 'block',
    margin: '100px auto'
  };

  return (
    <div>
      <ClipLoader color="#4338ca" loading={loading} cssOverride={override} size={150} />
    </div>
  );
};

export default Spinner;
