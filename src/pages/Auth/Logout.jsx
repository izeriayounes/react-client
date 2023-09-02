import Button from '../../components/Button';
import { logout } from '../../api/apiService';
import Loading from '../../components/Loading';
import { useState } from 'react';

function Logout() {
  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
    window.location.pathname = '/login';
  };

  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      {isLoading && <Loading />}
      <Button primary classes="fixed top-0 right-0 z-1 rounded-md" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Logout;
