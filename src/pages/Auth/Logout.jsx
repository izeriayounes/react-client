import Button from '../../components/Button';
import { logout } from '../../api/apiService';
import Loading from '../../components/Loading';
import { useState } from 'react';
import { useNavigationContext } from '../../context/NavigationContext';

function Logout() {
  const { navigate } = useNavigationContext();
  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    navigate('/login');
    setIsLoading(false);
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
