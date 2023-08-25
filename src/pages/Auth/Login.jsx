import Input from '../../components/Input';
import Button from '../../components/Button';
import { login } from '../../api/apiService';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Loading from '../../components/Loading';

function Login({ redirect }) {
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
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center text-xl font-medium mb-6">Bonjour Admin, veuiller s'authetifier.</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Nom d'utilisateur" id="userName" type="text" register={register} required />
          <Input label="Mot de passe" id="password" type="password" register={register} required />
          {showErrorMessage && (
            <div className="text-red-500 text-sm mb-4">Les informations sont incorrectes. Veuillez réessayer.</div>
          )}
          <Button primary>Se connecter</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
