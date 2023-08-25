import { useState, useEffect } from 'react';
import Table from '../../components/Table';
import get from '../../api/apiService';
import Loading from '../../components/Loading';

function ParrainagesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [parrainages, setParrainages] = useState([]);
  const [parrainData, setParrainData] = useState({});
  const [enfantData, setEnfantData] = useState({});

  const getParrainages = async () => {
    try {
      setIsLoading(true);
      const data = await get('parrainages');
      setParrainages(data);
    } catch (error) {
      console.error('Error geting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getParrain = async (id) => {
    try {
      const data = await get(`parrains/${id}`);
      return `${data.nom} ${data.prenom}`;
    } catch (error) {
      console.error('Error geting data:', error);
    }
  };
  const getEnfant = async (id) => {
    try {
      const data = await get(`enfants/${id}`);
      return `${data.nom} ${data.prenom}`;
    } catch (error) {
      console.error('Error geting data:', error);
    }
  };

  useEffect(() => {
    getParrainages();
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      const uniqueParrainIds = [...new Set(parrainages.map((item) => item.parrainId))];
      const uniqueEnfantIds = [...new Set(parrainages.map((item) => item.enfantId))];

      const parrainDataPromises = uniqueParrainIds.map(async (id) => {
        const parrainInfo = await getParrain(id);
        return { id, parrainInfo };
      });

      const enfantDataPromises = uniqueEnfantIds.map(async (id) => {
        const enfantInfo = await getEnfant(id);
        return { id, enfantInfo };
      });

      const parrainDataMap = {};
      const enfantDataMap = {};

      await Promise.all(parrainDataPromises).then((data) => {
        data.forEach(({ id, parrainInfo }) => {
          parrainDataMap[id] = parrainInfo;
        });
      });

      await Promise.all(enfantDataPromises).then((data) => {
        data.forEach(({ id, enfantInfo }) => {
          enfantDataMap[id] = enfantInfo;
        });
      });

      setParrainData(parrainDataMap);
      setEnfantData(enfantDataMap);
    };

    getAllData();
  }, [parrainages]);

  const config = [
    {
      label: 'Parrain',
      render: (parrainages) => parrainData[parrainages.parrainId] || '',
    },
    {
      label: 'Enfant',
      render: (parrainages) => enfantData[parrainages.enfantId] || '',
    },
    {
      label: 'Debut Kafala',
      render: (enfants) =>
        enfants.dateDebutKafala ? new Date(enfants.dateDebutKafala).toISOString().split('T')[0] : '',
    },
    {
      label: 'Montant Kafala',
      render: (parrainages) => parrainages.montantKafala,
    },
    {
      label: 'Active',
      render: (parrainages) => (parrainages.isActive ? 'oui' : 'non'),
    },
    {
      label: 'Commentaire',
      render: (parrainages) => (parrainages.commentaire ? `${parrainages.commentaire.slice(0, 10)}...` : '-'),
    },
  ];

  const keyFn = (data) => {
    return `${data.enfantId}${data.parrainId}`;
  };

  return (
    <div>
      {isLoading && <Loading />}
      <div className="font-bold text-blue-800 text-xl mb-4 text-center">Liste des parrainages</div>
      <Table data={parrainages} config={config} keyFn={keyFn} />
    </div>
  );
}

export default ParrainagesList;
