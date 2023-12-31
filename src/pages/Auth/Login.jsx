import Input from '../../components/Input';
import Button from '../../components/Button';
import { login } from '../../api/apiService';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Loading from '../../components/Loading';

function Login() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await login(data);
      window.location.pathname = '/';
      setShowErrorMessage(false);
    } catch (error) {
      setShowErrorMessage(true);
      console.error('Error logging in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {isLoading && <Loading />}
      <div className="w-full max-w-md bg-white px-16 py-6 rounded-lg shadow-md">
        <div className="text-center text-xl font-medium mb-12">Bonjour Admin, veuiller s'authentifier.</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Nom d'utilisateur" id="userName" type="text" register={register} onKeyDown={null} required />
          <Input label="Mot de passe" id="password" type="password" register={register} onKeyDown={null} required />
          {showErrorMessage && (
            <div className="text-red-500 text-sm">Les informations sont incorrectes. Veuillez réessayer.</div>
          )}
          <Button primary>Se connecter</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
