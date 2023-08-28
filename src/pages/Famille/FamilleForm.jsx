import Input from '../../components/Input';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Select from '../../components/Select';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import get, { post, put } from '../../api/apiService';
import EnfantsList from '../Enfant/EnfantsList';
import Loading from '../../components/Loading';
import { BiArrowBack } from 'react-icons/bi';
import classNames from 'classnames';

function FamilleForm({ initialData }) {
  const typesHabitat = ['locataire', 'propriétaire'];
  const { register, handleSubmit, setValue } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnfants, setSelectedEnfants] = useState([]);
  const [resolvedEnfants, setResolvedEnfants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getEnfantsData = async () => {
      const enfantsData = await Promise.all(
        selectedEnfants.map(async (id) => {
          const data = await get(`enfants/${id}`);
          return data;
        })
      );
      setResolvedEnfants(enfantsData);
    };

    getEnfantsData();
  }, [selectedEnfants]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const backIcon = (
    <span className="absolute top-0 right-0 text-3xl mr-4 mt-4 cursor-pointer" onClick={closeModal}>
      {<BiArrowBack />}
    </span>
  );

  const handleCrossClick = (id) => {
    setResolvedEnfants(resolvedEnfants.filter((e) => e.id !== id));
  };

  const handleEnfantSelection = (enfant) => {
    setSelectedEnfants([...selectedEnfants, enfant.id]);
  };

  const [enfantsToFilterOut, setEnfantsToFilterOut] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await get(`familles/${initialData.id}/enfants`);
        setEnfantsToFilterOut(data);
        setValue('nombreGarcons', 0);
        setValue('nombreFilles', 0);
        Object.entries(initialData).forEach(([field, value]) => {
          if (['dateDebutKafala', 'dateInscription'].includes(field)) {
            setValue(field, value?.split('T')[0]);
            return;
          }
          setValue(field, value);
        });
      } catch (error) {
        console.error('Error fetching enfants to filter out:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (initialData) {
      fetchData();
    }
  }, [initialData, setValue]);

  const handleFormSubmit = async (data) => {
    try {
      setIsLoading(true);
      console.log(data);
      if (initialData) {
        await put(`familles/${initialData.id}`, data, selectedEnfants);
      } else {
        await post('familles', data, selectedEnfants);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-3 md:mb-0">
      {isLoading && <Loading />}
      <h1 className="mb-4">Veuillez remplir les informations de la famille:</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="md:flex md:space-x-6 mb-4">
          <Input
            className="flex-grow md:mb-0"
            label="Code Famille"
            id="codeFamille"
            type="text"
            register={register}
            required
          />
          <Input
            className="flex-grow md:mb-0"
            label="Nom Famille"
            id="nomFamille"
            type="text"
            register={register}
            required
          />
        </div>
        <Input label="Nom du pere" id="nomPere" type="text" register={register} />
        <div className="md:flex md:space-x-6 mb-4">
          <Input className="flex-grow md:mb-0" label="Nom de mere" id="nomMere" type="text" register={register} />
          <Input className="flex-grow md:mb-0" label="Sa profession" id="travailMere" type="text" register={register} />
          <Input className="flex-grow md:mb-0" label="Numero " id="telMere" type="text" register={register} />
        </div>
        <Input label="Lieu de residence" id="lieuResidence" type="text" register={register} />
        <Input label="Nombre de garcons" id="nombreGarcons" type="number" register={register} />
        <Input label="Nombre de filles" id="nombreFilles" type="number" register={register} />
        <Input label="Date d'inscription" id="dateInscription" type="date" register={register} />
        <Input label="Date debut kafala" id="dateDebutKafala" type="date" register={register} />
        <Select label="Type d'habitat" id="typeHabitat" register={register} list={typesHabitat} />

        {isModalOpen && (
          <Modal onClose={closeModal} size="inset-y-10 inset-x-80">
            <div className={classNames('p-10 pb-10', { relative: initialData })}>
              {initialData ? backIcon : null}
              <EnfantsList
                enfantsToFilterOut={enfantsToFilterOut}
                listInModalForFamille
                onClose={closeModal}
                onSelect={handleEnfantSelection}
              />
              <Button primary onClick={closeModal}>
                Valider
              </Button>
            </div>
          </Modal>
        )}

        <Button onClick={openModal} type="button" outline>
          Associer un(des) enfant(s)
        </Button>

        {resolvedEnfants.map((e) => (
          <div
            key={e.id}
            className=" border border-black bg-purple-100 rounded px-2 py-1.5 mx-2 box-shadow inline-block"
          >
            {e.nom} {e.prenom}
            <div className="inline-block ml-2 cursor-pointer " onClick={() => handleCrossClick(e.id)}>
              X
            </div>
          </div>
        ))}

        <div className="flex justify-end my-10">
          <Button primary>Enregistrer</Button>
        </div>
      </form>
    </div>
  );
}

export default FamilleForm;

function FamilleEdit({ initialData }) {
  return <FamilleForm initialData={initialData} />;
}

function FamilleCreate() {
  return <FamilleForm />;
}

export { FamilleEdit, FamilleCreate };
