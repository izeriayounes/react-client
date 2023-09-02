import { useState, useEffect } from 'react';
import Input from '../../components/Input';
import AreaText from '../../components/AreaText';
import Radio from '../../components/Radio';
import ImgUpload from '../../components/imgUpload';
import Button from '../../components/Button';
import Select from '../../components/Select';
import { useForm } from 'react-hook-form';
import { post, put } from '../../api/apiService';
import Loading from '../../components/Loading';
import 'react-toastify/dist/ReactToastify.css';

function EnfantForm({ initialData, getData }) {
  const schoolLevels = [
    'Primaire - 1ere',
    'Primaire - 2eme',
    'Primaire - 3eme',
    'Primaire - 4eme',
    'Primaire - 5eme',
    'Primaire - 6eme',
    'Collège - 1ere',
    'Collège - 2eme',
    'Collège - 3eme',
    'Lycée - 5eme',
    'Lycée - 1ere Bac',
    'Lycée - 2eme Bac',
  ];
  const { register, handleSubmit, setValue, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([field, value]) => {
        if (['dateDebutKafala', 'dateInscription', 'dateNaissance'].includes(field)) {
          setValue(field, value?.split('T')[0]);
          return;
        }
        setValue(field, value);
      });
    }
  }, [initialData, setValue]);

  const handleFormSubmit = async (data) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await put(`enfants/${initialData.id}`, data);
        getData();
      } else {
        await post('enfants', data);
        reset();
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 justify-center">
      {isLoading && <Loading />}
      <h1 className="mb-4">Veuillez remplir les informations d'enfant:</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="md:flex md:space-x-6 mb-4">
          <Input className="flex-grow md:mb-0" label="Nom" id="nom" type="text" register={register} required />
          <Input className="flex-grow md:mb-0" label="Prenom" id="prenom" type="text" register={register} required />
        </div>

        <Radio register={register} required />

        <Input label="Date de naissance" id="dateNaissance" type="date" register={register} />
        <Input label="Lieu de naissance" id="lieuNaissance" type="text" register={register} />
        <Select label="Niveau scolaire" id="niveauScolaire" register={register} list={schoolLevels} />
        <Input label="Date d'inscription" id="dateInscription" type="date" register={register} />
        <Input label="Date debut parrainage" id="dateDebutKafala" type="date" register={register} />

        <AreaText label="Remarques" id="remarque" register={register} />
        <ImgUpload onChange={(encodedData) => setValue('profilePicture', encodedData)} />
        <div className="flex justify-end">
          <Button primary>{!initialData ? 'Enregistrer' : 'Enregister les modifications'}</Button>
        </div>
      </form>
    </div>
  );
}

function EnfantCreate() {
  return (
    <div className="pt-4">
      <EnfantForm />
    </div>
  );
}
function EnfantEdit({ initialData, getData }) {
  return (
    <div className="pt-6 pl-12">
      <EnfantForm initialData={initialData} getData={getData} />;
    </div>
  );
}

export { EnfantCreate, EnfantEdit };

export default EnfantForm;
