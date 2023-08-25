import profilePic from '../../assets/profile.webp';
import get from '../../api/apiService';
import { useState, useEffect } from 'react';

const EnfantDetailsCard = ({ enfant }) => {
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

  const [parrains, setParrains] = useState([]);
  const [parrainages, setParrainages] = useState({});

  const fields = {
    Nom: nom,
    Prenom: prenom,
    Sexe: sexe,
    'Date de naissance': dateNaissance1,
    'Lieu de naissance': lieuNaissance,
    'Niveau scolaire': niveauScolaire,
    "Date d'inscription": dateInscription1,
    'Debut Kafala': dateDebutKafala1,
    remarque: remarque,
  };

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

  return (
    <div className="leading-8 md:flex scrollbar">
      <img src={src} alt="Profile pic" className="md:h-auto md:rounded-md rounded-full mx-auto mr-6" />
      <div className="text-center md:text-left py-2">
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
              <div key={p.id}>
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
