import { useState, useEffect } from 'react';
import Table from '../../components/Table';
import get from '../../api/apiService';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import FamilleCard from './FamilleCard';

function FamillesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredFamilles, setFilteredFamilles] = useState([]);
  const [displayedId, setDisplayedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState('');
  const [familles, setFamilles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilteredFamilles(familles);
  }, [familles]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await get('familles');
      setFamilles(data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error geting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const displayFamilleDetails = (id) => {
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
    {
      label: 'Code Famille',
      render: (familles) => familles.codeFamille,
    },
    {
      label: 'Nom famille',
      render: (familles) => familles.nomFamille,
    },
    {
      label: 'Nom de mere',
      render: (familles) => familles.nomMere,
    },
    {
      label: 'Date inscrip.',
      render: (familles) =>
        familles.dateInscription ? new Date(familles.dateInscription).toISOString().split('T')[0] : '',
    },
    {
      label: 'Debut Kafala',
      render: (familles) =>
        familles.dateDebutKafala ? new Date(familles.dateDebutKafala).toISOString().split('T')[0] : '',
    },
    {
      label: 'Details',
      render: (familles) => (
        <button className="text-line text-blue-700 hover:underline" onClick={() => displayFamilleDetails(familles.id)}>
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
      setFilteredFamilles(familles);
    } else {
      setFilteredFamilles(familles.filter((f) => f.codeFamille.startsWith(e.target.value)));
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      {isModalOpen && (
        <Modal onClose={closeModal} size="inset-y-10 inset-x-80">
          <FamilleCard famille={familles.filter((e) => e.id === displayedId)} getData={getData} />
        </Modal>
      )}
      <div className="font-bold text-blue-800 text-xl mb-4 text-center">Liste des familles</div>
      <Input label="Rechercher par code famille" onChange={handleChange} value={value} register={null} />
      <Table
        data={filteredFamilles}
        config={config}
        keyFn={keyFn}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={8}
      />
    </div>
  );
}

export default FamillesList;
