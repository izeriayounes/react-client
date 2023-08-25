import Input from '../../components/Input';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Select from '../../components/Select';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import get, { post } from '../../api/apiService';
import EnfantsList from '../Enfant/EnfantsList';

function FamilleCreate() {
  const typesHabitat = ['locataire', 'propriétaire'];
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnfants, setSelectedEnfants] = useState([]);
  const [resolvedEnfants, setResolvedEnfants] = useState([]);

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

  const transferSelectedEnfant = (enfants) => {
    setSelectedEnfants(enfants);
  };

  const handleCrossClick = (id) => {
    setResolvedEnfants(resolvedEnfants.filter((e) => e.id !== id));
  };

  const onSubmit = async (data) => {
    console.log(data);
    await post('familles  ', data, selectedEnfants);
  };

  return (
    <div className="px-3 md:mb-0">
      <h1 className="mb-4">Veuillez remplir les informations de la famille:</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex md:space-x-6 mb-4">
          <Input className="flex-grow md:mb-0" label="Code Famille" id="codeFamille" type="text" register={register} />
          <Input className="flex-grow md:mb-0" label="Nom Famille" id="nomFamille" type="text" register={register} />
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
          <Modal onClose={closeModal} size="inset-x-60 inset-y-40">
            <EnfantsList listInModal onClose={closeModal} transferSelectedEnfant={transferSelectedEnfant} />
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

export default FamilleCreate;
