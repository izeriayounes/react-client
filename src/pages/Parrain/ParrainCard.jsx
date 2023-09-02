import get from '../../api/apiService';
import { useState, useEffect } from 'react';
import { BiSolidEdit, BiArrowBack } from 'react-icons/bi';
import { ParrainEdit } from './ParrainForm';

const ParrainCard = ({ parrain, getData }) => {
  const {
    id,
    nom,
    prenom,
    cin,
    fonction,
    adresse,
    email,
    gsm,
    dateDebutKafala,
    datePremiereCotisation,
    cotisationMensuelle,
  } = parrain[0];

  const dateDebutKafala1 = dateDebutKafala ? new Date(dateDebutKafala).toISOString().split('T')[0] : '';
  const datePremiereCotisation1 = datePremiereCotisation
    ? new Date(datePremiereCotisation).toISOString().split('T')[0]
    : '';

  const fields = {
    Nom: nom,
    Prenom: prenom,
    CIN: cin,
    Fonction: fonction,
    Adresse: adresse,
    Email: email,
    GSM: gsm,
    'Date debut kafala': dateDebutKafala1,
    'Date premiere cotisation': datePremiereCotisation1,
    'Cotisation mensuelle': cotisationMensuelle,
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

  const [enfants, setEnfants] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const getEnfants = async () => {
      const data = await get(`parrains/${id}/enfants`);
      setEnfants(data);
    };

    getEnfants();
  }, [id]);

  return isEditMode ? (
    <div className="p-10">
      {backIcon}
      <ParrainEdit
        initialData={parrain[0]}
        getData={() => {
          setIsEditMode(false);
          getData();
        }}
      />
    </div>
  ) : (
    <div className="leading-8 p-10">
      {editIcon}
      {Object.entries(fields).map(([label, value]) => (
        <p key={label}>
          <span className="font-bold text-gray-700">{label}: </span>
          {value}
        </p>
      ))}{' '}
      <span className="font-bold text-gray-700">Enfants:</span>
      {enfants.length > 0 ? (
        enfants.map((e) => (
          <div className="font-semibold text-purple-600" key={e.id}>
            {e.nom} {e.prenom}
          </div>
        ))
      ) : (
        <span className="text-red-500"> Pas de enfants </span>
      )}
    </div>
  );
};

export default ParrainCard;
