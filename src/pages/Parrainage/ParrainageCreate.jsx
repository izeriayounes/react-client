import Button from '../../components/Button';
import Input from '../../components/Input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import get, { post } from '../../api/apiService';
import Select from '../../components/Select';
import AreaText from '../../components/AreaText';
import Modal from '../../components/Modal';
import EnfantsList from '../Enfant/EnfantsList';
import ParrainsList from '../Parrain/ParrainsList';
import Loading from '../../components/Loading';

function ParrainageCreate() {
  const [isEnfantModalOpen, setIsEnfantModalOpen] = useState(false);
  const [isParrainModalOpen, setIsParrainModalOpen] = useState(false);
  const [selectedEnfant, setSelectedEnfant] = useState(null);
  const [selectedParrain, setSelectedParrain] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [duplicateError, setDuplicateError] = useState('');

  const openEnfantModal = () => {
    setIsEnfantModalOpen(true);
  };
  const closeEnfantModal = () => {
    setIsEnfantModalOpen(false);
  };
  const openParrainModal = () => {
    setIsParrainModalOpen(true);
  };
  const closeParrainModal = () => {
    setIsParrainModalOpen(false);
  };
  const handleEnfantSelection = (enfant) => {
    setSelectedEnfant(enfant);
    closeEnfantModal();
  };

  const handleParrainSelection = (parrain) => {
    setSelectedParrain(parrain);
    closeParrainModal();
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const existingParrainages = await get('parrainages');

      const isDuplicate = existingParrainages.some(
        (parrainage) => parrainage.enfantId === selectedEnfant.id && parrainage.parrainId === selectedParrain.id
      );

      if (isDuplicate) {
        setDuplicateError('Cette parrainage deja existe!');
        setIsLoading(false);
        return;
      }
      const parrainageData = {
        ...data,
        enfantId: selectedEnfant.id,
        parrainId: selectedParrain.id,
        isActive: data.isActive === 'Oui',
      };
      post('parrainages', parrainageData);
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-4">
      <div className="mb-4">Veuiller remplir les informations du parrainage:</div>
      {isLoading && <Loading />}
      {isEnfantModalOpen && (
        <Modal size="inset-x-80 inset-y-10 p-6" onClose={closeEnfantModal}>
          <EnfantsList listInModal onSelect={handleEnfantSelection}></EnfantsList>
        </Modal>
      )}
      {isParrainModalOpen && (
        <Modal size="inset-x-80 inset-y-10 p-6" onClose={closeParrainModal}>
          <ParrainsList listInModal onSelect={handleParrainSelection}></ParrainsList>
        </Modal>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Button onClick={openEnfantModal} type="button" outline>
            Choisir un enfant
          </Button>

          {selectedEnfant && (
            <div className="inline-block ml-4">
              L'enfant selectionné:{' '}
              <p className="font-bold inline-block">
                {selectedEnfant.nom} {selectedEnfant.prenom}
              </p>
            </div>
          )}
        </div>

        <div>
          <Button onClick={openParrainModal} type="button" outline>
            Choisir un parrain
          </Button>

          {selectedParrain && (
            <div className="inline-block ml-4">
              Le parrain selectionné:{' '}
              <p className="font-bold inline-block">
                {' '}
                {selectedParrain.nom} {selectedParrain.prenom}
              </p>
            </div>
          )}
        </div>
        {duplicateError && <div className="text-red-500 text-xm pb-2 -mt-2">Cette parrainage deja existe!</div>}

        <Input label="Debut parrainage" id="dateDebutKafala" type="date" register={register} />
        <Input label="montant Kafala" id="montantKafala" type="number" register={register} min={0} />
        <Select id="isActive" label="Active" list={['Oui', 'Non']} register={register}></Select>
        <AreaText label="Commentaire" id="commentaire" register={register} />

        <div className="flex justify-end">
          <Button primary>Enregistrer</Button>
        </div>
      </form>
    </div>
  );
}

export default ParrainageCreate;
