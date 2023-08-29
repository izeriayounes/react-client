import { useState, useEffect } from 'react';
import Table from '../../components/Table';
import get, { put } from '../../api/apiService';
import Loading from '../../components/Loading';
import { Tooltip } from 'react-tooltip';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Select from '../../components/Select';
import AreaText from '../../components/AreaText';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import { TbCirclesRelation } from 'react-icons/tb';

function ParrainagesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [parrainages, setParrainages] = useState([]);
  const [parrainData, setParrainData] = useState({});
  const [enfantData, setEnfantData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const [selectedParrainage, setSelectedParrainage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const icon = <span className="text-2xl mx-4">{<TbCirclesRelation />}</span>;

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

  const displayParrainageEdit = async (enfantID, parrainId) => {
    const parrainage = await get(`parrainages/${enfantID}/${parrainId}`);
    Object.entries(parrainage).forEach(([field, value]) => {
      if ('dateDebutKafala' === field) {
        setValue(field, value?.split('T')[0]);
        return;
      }
      if (field === 'isActive') {
        setValue(field, value ? 'Oui' : 'Non');
        return;
      }
      setValue(field, value);
    });
    setSelectedParrainage({ enfantId: enfantID, parrainId: parrainId });
    setIsModalOpen(true);
  };

  useEffect(() => {
    getParrainages();
  }, []);

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

  useEffect(() => {
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
        enfants.dateDebutKafala ? new Date(enfants.dateDebutKafala).toISOString().split('T')[0] : null,
    },
    {
      label: 'M. Kafala',
      render: (parrainages) => parrainages.montantKafala,
    },
    {
      label: 'Active',
      render: (parrainages) => (parrainages.isActive ? 'oui' : 'non'),
    },
    {
      label: 'Commentaire',
      render: (parrainages) => (
        <>
          {!parrainages.commentaire || parrainages.commentaire.length <= 10 ? (
            parrainages.commentaire || '-'
          ) : (
            <>
              <div data-tooltip-id={`${parrainages.enfantId}${parrainages.parrainId}`}>
                {parrainages.commentaire.substring(0, 10) + '...'}
              </div>
              <Tooltip
                id={`${parrainages.enfantId}${parrainages.parrainId}`}
                place=" "
                content={parrainages.commentaire}
              />
            </>
          )}
        </>
      ),
    },
    {
      label: 'Modifier',
      render: (parrainages) => (
        <button
          className="text-line text-blue-700 hover:underline"
          onClick={() => displayParrainageEdit(parrainages.enfantId, parrainages.parrainId)}
        >
          modifier
        </button>
      ),
    },
  ];

  const keyFn = (data) => {
    return `${data.enfantId}${data.parrainId}`;
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const data1 = {
        ...data,
        isActive: data.isActive === 'Oui',
      };
      await put(`parrainages?enfantid=${selectedParrainage.enfantId}&parrainid=${selectedParrainage.parrainId}`, data1);
      getParrainages();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      {isModalOpen && (
        <Modal size="inset-x-80 inset-y-10 p-10" onClose={() => setIsModalOpen(false)}>
          <div className="flex-1">
            <h1 class="mb-4 font-medium text-blue-800">Modification de parrainage:</h1>{' '}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-center font-semibold mb-4 text-purple-500">
                {parrainData[selectedParrainage.parrainId]} {icon} {enfantData[selectedParrainage.enfantId]}
              </div>
              <Input label="Debut parrainage" id="dateDebutKafala" type="date" register={register} />
              <Input label="montant Kafala" id="montantKafala" type="number" register={register} />
              <Select id="isActive" label="Active" list={['Oui', 'Non']} register={register} />
              <AreaText label="Commentaire" id="commentaire" register={register} />

              <Button primary>Enregistrer les modifications</Button>
            </form>
          </div>
        </Modal>
      )}
      <div className="font-bold text-blue-800 text-xl mb-4 text-center">Liste des parrainages</div>
      <Table
        data={parrainages}
        config={config}
        keyFn={keyFn}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={10}
      />
    </div>
  );
}

export default ParrainagesList;
