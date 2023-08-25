import Input from '../../components/Input';
import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import { post } from '../../api/apiService';
import Loading from '../../components/Loading';
import { useState } from 'react';

function ParrainCreate() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await post('parrains', data);
    } catch (error) {
      console.error('error fetching data', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-3 md:mb-0">
      <h1 className="mb-4">Veuillez remplir les informations du parrain:</h1>
      {isLoading && <Loading />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex md:space-x-6 mb-4">
          <Input className="flex-grow md:mb-0" label="Nom" id="nom" type="text" register={register} />
          <Input className="flex-grow md:mb-0" label="Prenom" id="prenom" type="text" register={register} />
        </div>

        <Input label="CIN" id="cin" type="text" register={register} />
        <Input label="Fonction" id="fonction" type="text" register={register} />
        <Input label="Adresse" id="adresse" type="text" register={register} />

        <div className="md:flex md:space-x-6 mb-4">
          <Input className="flex-grow md:mb-0" label="Email" id="email" type="email" register={register} />
          <Input className="flex-grow md:mb-0" label="GSM" id="gsm" type="number" register={register} />
        </div>

        <div className="md:flex md:space-x-6 mb-4">
          <Input
            className="flex-grow md:mb-0"
            label="Debut parrainage"
            id="debutKafala "
            type="date"
            register={register}
          />
          <Input
            className="flex-grow md:mb-0"
            label="Premiere cotisation"
            id="datePremiereCotisation "
            type="date"
            register={register}
          />
        </div>

        <Input label="Cotisation mensuelle" id="cotisationMensuelle" type="number" register={register} />

        <div className="flex justify-end my-10">
          <Button primary>Enregistrer</Button>
        </div>
      </form>
    </div>
  );
}

export default ParrainCreate;
