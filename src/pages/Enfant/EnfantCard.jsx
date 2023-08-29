import profilePic from '../../assets/profile.jpeg';
import get from '../../api/apiService';
import { useState, useEffect } from 'react';
import { BiSolidEdit, BiArrowBack } from 'react-icons/bi';
import { EnfantEdit } from './EnfantForm';

const EnfantDetailsCard = ({ enfant, getData }) => {
  const {
    id,
    nom,
    prenom,
    sexe,
    dateNaissance,
    lieuNaissance,
    niveauScolaire,
    dateInscription,
    dateDebutKafala,
    remarque,
    profilePicture,
  } = enfant[0];

  const dateNaissance1 = dateNaissance ? new Date(dateNaissance).toISOString().split('T')[0] : '';
  const dateInscription1 = dateInscription ? new Date(dateInscription).toISOString().split('T')[0] : '';
  const dateDebutKafala1 = dateDebutKafala ? new Date(dateDebutKafala).toISOString().split('T')[0] : '';
  const src = profilePicture ? `data:image/*;base64,${profilePicture}` : profilePic;

  const fields = {
    Nom: nom,
    Prenom: prenom,
    Sexe: sexe,
    'Date de naissance': dateNaissance1 || '---',
    'Lieu de naissance': lieuNaissance || '---',
    'Niveau scolaire': niveauScolaire === 'Selectionner...' ? '---' : niveauScolaire,
    "Date d'inscription": dateInscription1 || '---',
    'Debut Kafala': dateDebutKafala1 || '---',
    Remarque: remarque || '---',
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
  const [parrains, setParrains] = useState([]);
  const [parrainages, setParrainages] = useState({});

  useEffect(() => {
    const getParrains = async () => {
      const parrainsData = await get(`enfants/${id}/parrains`);
      setParrains(parrainsData);
    };

    getParrains();
  }, [id]);

  useEffect(() => {
    const getParrainage = async (enfantId, parrainId) => {
      const parrainage = await get(`parrainages/${enfantId}/${parrainId}`);
      setParrainages((prevParrainages) => ({
        ...prevParrainages,
        [parrainId]: parrainage,
      }));
    };

    if (parrains.length > 0) {
      parrains.forEach((p) => {
        getParrainage(id, p.id);
      });
    }
  }, [id, parrains]);

  return isEditMode ? (
    <div>
      {backIcon}
      <EnfantEdit
        initialData={enfant[0]}
        getData={() => {
          getData();
          setIsEditMode(false);
        }}
      />
    </div>
  ) : (
    <div className="leading-8 md:flex scrollbar">
      {editIcon}
      <img src={src} alt="Profile pic" className="rounded-l-md mx-auto mr-6" />
      <div className="text-center md:text-left py-4 ">
        {Object.entries(fields).map(([label, value]) => (
          <p key={label}>
            <span className="font-bold text-gray-700">{label}: </span>
            {value}
          </p>
        ))}{' '}
        <span className="font-bold text-gray-700">Parrains:</span>
        {parrains.length > 0 ? (
          parrains.map((p) => {
            return (
              <div key={p.id} className="indent-2">
                <span className="font-semibold text-purple-600">
                  {p.nom} {p.prenom}
                </span>{' '}
                avec une cotisation de{' '}
                <span className="font-semibold text-purple-600">
                  {parrainages[p.id] && parrainages[p.id].montantKafala ? parrainages[p.id].montantKafala : '0'} dhs
                </span>
              </div>
            );
          })
        ) : (
          <span className="text-red-500"> Pas de parrains </span>
        )}
      </div>
    </div>
  );
};

export default EnfantDetailsCard;
