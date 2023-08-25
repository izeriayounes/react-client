import { useState, useEffect } from 'react';
import Table from '../../components/Table';
import get from '../../api/apiService';
import Loading from '../../components/Loading';
import Input from '../../components/Input';

function FamillesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredFamilles, setFilteredFamilles] = useState([]);

  const [value, setValue] = useState('');

  const [familles, setFamilles] = useState([]);

  useEffect(() => {
    setFilteredFamilles(familles);
  }, [familles]);

  const getData = async () => {
    try {
      const data = await get('familles');
      setFamilles(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error geting data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      label: 'Lieu residence',
      render: (familles) => familles.lieuResidence,
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
      <div className="font-bold text-blue-800 text-xl mb-4 text-center">Liste des familles</div>
      <Input label="Rechercher par code famille" onChange={handleChange} value={value} register={null} />
      <Table data={filteredFamilles} config={config} keyFn={keyFn} />
    </div>
  );
}

export default FamillesList;
