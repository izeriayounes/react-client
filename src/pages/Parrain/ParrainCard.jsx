import get from '../../api/apiService';
import { useState, useEffect } from 'react';

const ParrainCard = ({
  parrain: [
    { id, nom, prenom, cin, fonction, adresse, email, gsm, debutKafala, datePremiereCotisation, cotisationMensuelle },
  ],
}) => {
  const debutKafala1 = debutKafala ? new Date(debutKafala).toISOString().split('T')[0] : '';
  const datePremiereCotisation1 = datePremiereCotisation
    ? new Date(datePremiereCotisation).toISOString().split('T')[0]
    : '';

  const [enfants, setEnfants] = useState([]);

  useEffect(() => {
    const getEnfants = async () => {
      const data = await get(`parrains/${id}/enfants`);
      setEnfants(data);
    };

    getEnfants();
  }, [id]);

  return (
    <div className="leading-8 p-10">
      <p>
        <span className="font-bold text-gray-700">Nom:</span> {nom} {prenom}
      </p>
      <p>
        <span className="font-bold text-gray-700">CIN:</span> {cin}
      </p>
      <p>
        <span className="font-bold text-gray-700">Fonction:</span> {fonction}
      </p>
      <p>
        <span className="font-bold text-gray-700">Adress:</span> {adresse}
      </p>
      <p>
        <span className="font-bold text-gray-700">Email:</span> {email}
      </p>
      <p>
        <span className="font-bold text-gray-700">GSM:</span> {gsm}
      </p>
      <p>
        <span className="font-bold text-gray-700">Début de Kafala:</span> {debutKafala1}
      </p>
      <p>
        <span className="font-bold text-gray-700">Premier contisation:</span> {datePremiereCotisation1}
      </p>
      <p>
        <span className="font-bold text-gray-700">Contisation mensuelle:</span> {cotisationMensuelle}
      </p>
      <span className="font-bold text-gray-700">Enfants:</span>
      {enfants.length > 0 ? (
        enfants.map((e) => {
          return (
            <div>
              <span className="font-semibold text-purple-600" key={e.id}>
                {e.nom} {e.prenom}
              </span>{' '}
            </div>
          );
        })
      ) : (
        <span className="text-red-500"> Pas de enfants </span>
      )}
    </div>
  );
};

export default ParrainCard;
