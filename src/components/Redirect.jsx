import { useEffect } from 'react';
const Redirect = ({ to }) => {
  useEffect(() => {
    console.log('inside redirect yooooy');
    window.history.pushState({}, '', to);
  }, [to]);

  return null;
};

export default Redirect;
