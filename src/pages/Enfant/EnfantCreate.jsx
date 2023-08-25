import Input from '../../components/Input';
import AreaText from '../../components/AreaText';
import Radio from '../../components/Radio';
import ImgUpload from '../../components/imgUpload';
import Button from '../../components/Button';
import Select from '../../components/Select';
import { useForm } from 'react-hook-form';
import { post } from '../../api/apiService';
import { useState } from 'react';
import Loading from '../../components/Loading';

function EnfantCreate() {
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
  const { register, handleSubmit, setValue } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await post('enfants', data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="px-3 md:mb-0">
      {isLoading && <Loading />}
      <h1 className="mb-4">Veuillez remplir les informations d'enfant:</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex md:space-x-6 mb-4">
          <Input className="flex-grow md:mb-0" label="Nom" id="nom" type="text" register={register} />
          <Input className="flex-grow md:mb-0" label="Prenom" id="prenom" type="text" register={register} />
        </div>

        <Radio register={register} />

        <Input label="Date de naissance" id="dateNaissance" type="date" register={register} />
        <Input label="Lieu de naissance" id="lieuNaissance" type="text" register={register} />
        <Select label="Niveau scolaire" id="niveauScolaire" register={register} list={schoolLevels} />
        <Input label="Date d'inscription" id="dateInscription" type="date" register={register} />
        <Input label="Date debut parrainage" id="dateDebutKafala" type="date" register={register} />

        <AreaText label="Remarques" id="remarque" register={register} />
        <ImgUpload onChange={(encodedData) => setValue('profilePicture', encodedData)} />
        <div className="flex justify-end my-5">
          <Button primary>Enregistrer</Button>
        </div>
      </form>
    </div>
  );
}

export default EnfantCreate;
