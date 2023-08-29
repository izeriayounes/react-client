import { useState, useEffect } from 'react';
import Table from '../../components/Table';
import get from '../../api/apiService';
import Loading from '../../components/Loading';
import EnfantDetailsCard from './EnfantCard';
import Modal from '../../components/Modal';
import Input from '../../components/Input';

function EnfantsList({ listInModal, listInModalForFamille, onSelect, enfantsToFilterOut }) {
  const [isLoading, setIsLoading] = useState(true);
  const [enfants, setEnfants] = useState([]);
  const [filteredEnfants, setFilteredEnfants] = useState([]);
  const [displayedId, setDisplayedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilteredEnfants(enfants);
  }, [enfants]);

  const getData = async () => {
    try {
      setIsLoading(true);
      let data = await get('enfants');
      if (enfantsToFilterOut) {
        const filteredIds = enfantsToFilterOut.map((ef) => ef.id);
        data = data.filter((ef) => !filteredIds.includes(ef.id));
      }
      setEnfants(data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error getting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [enfantsToFilterOut]);

  const displayEnfantDetails = (id) => {
    openModal();
    setDisplayedId(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const config = [
    listInModal && {
      label: 'Choisir',
      render: (enfant) => (
        <input type="radio" name="selectedEnfant" value={enfant.id} onChange={() => onSelect(enfant)} />
      ),
    },
    listInModalForFamille && {
      label: 'Choisir',
      render: (enfant) => (
        <input type="checkbox" name="selectedEnfant" value={enfant.id} onChange={() => onSelect(enfant)} />
      ),
    },
    {
      label: 'Nom',
      render: (enfants) => enfants.nom,
    },
    {
      label: 'Prenom',
      render: (enfants) => enfants.prenom,
    },
    !listInModal && {
      label: 'Date naissance',
      render: (enfants) => (enfants.dateNaissance ? new Date(enfants.dateNaissance).toISOString().split('T')[0] : ''),
    },
    !listInModal &&
      !listInModalForFamille && {
        label: 'Lieu naissance',
        render: (enfants) =>
          enfants.lieuNaissance.length < 15 ? enfants.lieuNaissance : `${enfants.lieuNaissance.slice(0, 15)}...`,
      },
    {
      label: 'Date Inscrip',
      render: (enfants) =>
        enfants.dateInscription ? new Date(enfants.dateInscription).toISOString().split('T')[0] : '',
    },
    {
      label: 'Debut kafala',
      render: (enfants) =>
        enfants.dateDebutKafala ? new Date(enfants.dateDebutKafala).toISOString().split('T')[0] : '',
    },
    !listInModal &&
      !listInModalForFamille && {
        label: 'Details',
        render: (enfants) => (
          <button className="text-line text-blue-700 hover:underline" onClick={() => displayEnfantDetails(enfants.id)}>
            details
          </button>
        ),
      },
  ];

  const keyFn = (data) => {
    return data.id;
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === '') {
      setFilteredEnfants(enfants);
    } else {
      setFilteredEnfants(enfants.filter((ef) => ef.nom.startsWith(e.target.value)));
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      {isModalOpen && (
        <Modal onClose={closeModal} size="inset-y-10 inset-x-60">
          <EnfantDetailsCard enfant={enfants.filter((e) => e.id === displayedId)} getData={getData} />
        </Modal>
      )}
      <div className="font-bold text-blue-800 text-xl mb-4 text-center">Liste des enfants</div>
      <Input label="Rechercher par nom" onChange={handleChange} value={value} register={null} />
      <Table
        data={filteredEnfants}
        config={config.filter(Boolean)}
        keyFn={keyFn}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={8}
      />
    </div>
  );
}

export default EnfantsList;
