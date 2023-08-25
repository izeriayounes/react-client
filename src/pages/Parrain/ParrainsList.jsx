import { useState, useEffect } from 'react';
import Table from '../../components/Table';
import get from '../../api/apiService';
import Loading from '../../components/Loading';
import ParrainCard from './ParrainCard';
import Modal from '../../components/Modal';
import Input from '../../components/Input';

function ParrainsList({ listInModal, onClose, onSelect }) {
  const [isLoading, setIsLoading] = useState(true);
  const [parrains, setParrains] = useState([]);
  const [filteredParrains, setFilteredParrains] = useState([]);
  const [displayedId, setDisplayedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setFilteredParrains(parrains);
  }, [parrains]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await get('parrains');
      setParrains(data);
    } catch (error) {
      console.error('Error geting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const displayParrainDetails = (id) => {
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
      render: (parrain) => (
        <input type="radio" name="selectedParrain" value={parrain.id} onChange={() => onSelect(parrain)} />
      ),
    },
    {
      label: 'Nom',
      render: (parrains) => parrains.nom,
    },
    {
      label: 'Prenom',
      render: (parrains) => parrains.prenom,
      sortValue: (parrains) => parrains.prenom,
    },
    {
      label: 'CIN',
      render: (parrains) => parrains.cin,
    },
    {
      label: 'GSM',
      render: (parrains) => parrains.gsm,
    },

    !listInModal && {
      label: 'Email',
      render: (parrains) => parrains.email,
    },
    !listInModal && {
      label: 'D. kafala',
      render: (parrains) => {
        if (parrains.debutKafala) {
          const dateObject = new Date(parrains.debutKafala);
          return dateObject.toISOString().split('T')[0];
        } else {
          return '';
        }
      },
    },

    !listInModal && {
      label: 'Details',
      render: (parrains) => (
        <button className="text-line text-blue-700 hover:underline" onClick={() => displayParrainDetails(parrains.id)}>
          details
        </button>
      ),
    },
  ];

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === '') {
      setFilteredParrains(parrains);
    } else {
      setFilteredParrains(parrains.filter((p) => p.cin.startsWith(e.target.value)));
    }
  };

  const keyFn = (data) => {
    return data.id;
  };

  return (
    <div>
      {isLoading && <Loading />}
      {isModalOpen && (
        <Modal onClose={closeModal} size="inset-y-10 inset-x-96">
          <ParrainCard parrain={parrains.filter((e) => e.id === displayedId)} />
        </Modal>
      )}
      <div className="font-bold text-blue-800 text-xl mb-4 text-center">Liste des parrains</div>
      <Input label="Rechercher par le CIN" onChange={handleChange} value={value} register={null} />
      <Table data={filteredParrains} config={config.filter(Boolean)} keyFn={keyFn} />
    </div>
  );
}

export default ParrainsList;
