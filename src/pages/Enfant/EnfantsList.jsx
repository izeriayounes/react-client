import { useState, useEffect } from 'react';
import Table from '../../components/Table';
import get from '../../api/apiService';
import Loading from '../../components/Loading';
import EnfantDetailsCard from './EnfantCard';
import Modal from '../../components/Modal';
import Input from '../../components/Input';

function EnfantsList({ listInModal, onSelect }) {
  const [isLoading, setIsLoading] = useState(true);
  const [enfants, setEnfants] = useState([]);
  const [filteredEnfants, setFilteredEnfants] = useState([]);
  const [displayedId, setDisplayedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setFilteredEnfants(enfants);
  }, [enfants]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await get('enfants');
      setEnfants(data);
    } catch (error) {
      console.error('Error geting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
    !listInModal && {
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
    !listInModal && {
      label: 'Details',
      render: (enfants) => (
        <button className="text-line text-blue-700 hover:underline" onClick={() => displayEnfantDetails(enfants.id)}>
          details
        </button>
      ),
    },
    // {
    //   label: 'Remarque',
    //   render: (enfants) => enfants.remarque,
    // },
  ];

  const keyFn = (data) => {
    return data.id;
  };

  const handleChange = (e) => {
    console.log(e.target.value);
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
        <Modal onClose={closeModal} size="inset-y-20 inset-x-60">
          <EnfantDetailsCard enfant={enfants.filter((e) => e.id === displayedId)} />
        </Modal>
      )}
      <div className="font-bold text-blue-800 text-xl mb-4 text-center">Liste des enfants</div>
      <Input label="Rechercher par nom" onChange={handleChange} value={value} register={null} />
      <Table data={filteredEnfants} config={config.filter(Boolean)} keyFn={keyFn} />
    </div>
  );
}

export default EnfantsList;
