import Input from '../../components/Input';
import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import { post, put } from '../../api/apiService';
import Loading from '../../components/Loading';
import { useState, useEffect } from 'react';

function ParrainForm({ initialData, getData }) {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await put(`parrains/${initialData.id}`, data);
        getData();
      } else {
        await post('parrains', data);
        reset();
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([field, value]) => {
        if (['dateDebutKafala', 'datePremiereCotisation'].includes(field)) {
          setValue(field, value?.split('T')[0]);
          return;
        }
        setValue(field, value);
      });
    }
  }, [initialData, setValue]);

  useEffect(() => {
    if (!initialData) {
      setValue('cotisationMensuelle', 0);
    }
  }, []);

  return (
    <div className="px-3">
      <h1 className="mb-4">Veuillez remplir les informations du parrain:</h1>
      {isLoading && <Loading />}

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="md:flex md:space-x-6 mb-4">
          <Input className="flex-grow md:mb-0" label="Nom" id="nom" type="text" register={register} />
          <Input className="flex-grow md:mb-0" label="Prenom" id="prenom" type="text" register={register} />
        </div>

        <Input label="CIN" id="cin" type="text" register={register} required />
        <Input label="Fonction" id="fonction" type="text" register={register} />
        <Input label="Adresse" id="adresse" type="text" register={register} />

        <div className="md:flex md:space-x-6 mb-4">
          <Input className="flex-grow md:mb-0" label="Email" id="email" type="email" register={register} />
          <Input className="flex-grow md:mb-0" label="GSM" id="gsm" type="tel" register={register} />
        </div>

        <div className="md:flex md:space-x-6 mb-4">
          <Input
            className="flex-grow md:mb-0"
            label="Debut parrainage"
            id="dateDebutKafala"
            type="date"
            register={register}
          />
          <Input
            className="flex-grow md:mb-0"
            label="Premiere cotisation"
            id="datePremiereCotisation"
            type="date"
            register={register}
          />
        </div>

        <Input label="Cotisation mensuelle" id="cotisationMensuelle" type="number" register={register} />

        <div className="flex justify-end">
          <Button primary>{initialData ? 'Enregistrer les modifications' : 'Enregistrer'}</Button>
        </div>
      </form>
    </div>
  );
}

export default ParrainForm;

function ParrainCreate() {
  return (
    <div className="pt-4">
      <ParrainForm />
    </div>
  );
}

function ParrainEdit({ initialData, getData }) {
  return <ParrainForm initialData={initialData} getData={getData} />;
}

export { ParrainCreate, ParrainEdit };
