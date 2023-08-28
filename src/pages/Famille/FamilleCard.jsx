import get from '../../api/apiService';
import { useState, useEffect } from 'react';
import { BiSolidEdit, BiArrowBack } from 'react-icons/bi';
import { FamilleEdit } from './FamilleForm';

const FamilleCard = ({ famille }) => {
  const {
    id,
    codeFamille,
    nomFamille,
    nomPere,
    nomMere,
    travailMere,
    telMere,
    lieuResidence,
    nombreGarcons,
    nombreFilles,
    dateInscription,
    dateDebutKafala,
    typeHabitat,
  } = famille[0];

  const dateInscription1 = dateInscription ? new Date(dateInscription).toISOString().split('T')[0] : '';
  const dateDebutKafala1 = dateDebutKafala ? new Date(dateDebutKafala).toISOString().split('T')[0] : '';

  const fields = {
    'Code Famille': codeFamille,
    'Nom de famille': nomFamille,
    'Nom de pere': nomPere || '---',
    'Nom de mere': nomMere || '---',
    'Travail de mere': travailMere || '---',
    'GSM de mere': telMere || '---',
    'Lieu de residence': lieuResidence || '---',
    'Nombre de garcons': nombreGarcons || '---',
    'Nombre de filles': nombreFilles || '---',
    "Date d'inscription": dateInscription1 || '---',
    'Debut Kafala': dateDebutKafala1 || '---',
    "Type d'habitat": typeHabitat || '---',
  };

  const editIcon = (
    <span className="absolute top-0 right-0 text-3xl mr-4 mt-4 cursor-pointer" onClick={() => setIsEditMode(true)}>
      {<BiSolidEdit />}
    </span>
  );
  const backIcon = (
    <span className="absolute top-0 right-0 text-3xl mr-4 mt-4 cursor-pointer" onClick={() => setIsEditMode(false)}>
      {<BiArrowBack />}
    </span>
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [enfants, setEnfants] = useState([]);

  useEffect(() => {
    const getEnfants = async () => {
      const enfantsData = await get(`familles/${id}/enfants`);
      setEnfants(enfantsData);
    };
    getEnfants();
  }, [id]);

  return isEditMode ? (
    <div className="p-10">
      {backIcon}
      <FamilleEdit initialData={famille[0]} />
    </div>
  ) : (
    <div className="leading-8 md:flex scrollbar px-10 py-1">
      {editIcon}
      <div className="text-center md:text-left py-4 ">
        {Object.entries(fields).map(([label, value]) => (
          <p key={label}>
            <span className="font-bold text-gray-700">{label}: </span>
            {value}
          </p>
        ))}{' '}
        <span className="font-bold text-gray-700">Enfants:</span>
        {enfants.length > 0 ? (
          enfants.map((p) => {
            return (
              <div key={p.id} className="indent-2">
                <span className="font-semibold text-purple-600">
                  {p.nom} {p.prenom}
                </span>
              </div>
            );
          })
        ) : (
          <span className="text-red-500"> Pas d'enfants </span>
        )}
      </div>
    </div>
  );
};

export default FamilleCard;
