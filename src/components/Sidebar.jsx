import classNames from 'classnames';
import Link from './Link';
import Accordion from './Accordion';
import { TbMoodKid, TbCirclesRelation } from 'react-icons/tb';
import { MdFamilyRestroom } from 'react-icons/md';
import { GoSponsorTiers } from 'react-icons/go';

function Sidebar() {
  const classes = classNames(
    'block px-4 py-2 text-xs text-gray-300 hover:border-l-2 hover:border-l-teal-600 hover:bg-gray-800'
  );

  const items = [
    {
      id: 'l2kj5',
      label: 'ENFANTS',
      content: (
        <div>
          <Link to={'/enfants'} className={classes}>
            TOUS LES ENFANTS
          </Link>
          <Link to={'/enfants/ajouter'} className={classes}>
            AJOUTER UN ENFANT
          </Link>
        </div>
      ),
      icon: <span className="text-2xl mr-4">{<TbMoodKid />}</span>,
    },
    {
      id: 'lk2j35lkj',
      label: 'FAMILLES',
      content: (
        <div>
          <Link to={'/familles'} className={classes}>
            TOUS LES FAMILLES
          </Link>
          <Link to={'/familles/ajouter'} className={classes}>
            AJOUTER UNE FAMILLE
          </Link>
        </div>
      ),
      icon: <span className="text-2xl mr-4">{<MdFamilyRestroom />}</span>,
    },
    {
      id: 'l1kj2i0g',
      label: 'PARRAINS',
      content: (
        <div>
          <Link to={'/parrains'} className={classes}>
            TOUS LES PARRAIN
          </Link>
          <Link to={'/parrains/ajouter'} className={classes}>
            AJOUTER UN PARRAIN
          </Link>
        </div>
      ),
      icon: <span className="text-2xl mr-4">{<GoSponsorTiers />}</span>,
    },
    {
      id: 'l2ekekkj5',
      label: 'PARRAINAGES',
      content: (
        <div>
          <Link to={'/parrainages'} className={classes}>
            TOUS LES PARRAINAGES
          </Link>
          <Link to={'/parrainages/ajouter'} className={classes}>
            CREER UNE PARRAINAGE
          </Link>
        </div>
      ),
      icon: <span className="text-2xl mr-4">{<TbCirclesRelation />}</span>,
    },
  ];

  return (
    <div className="bg-slate-rgba text-slate-300 h-full w-64 fixed left-0 top-0 bottom-0 z-10 ">
      <div className="flex items-center justify-center h-16 bg-[#9972b5] text-xl font-bold uppercase mb-5">
        admin As. assalam
      </div>
      <Accordion items={items} />
    </div>
  );
}

export default Sidebar;
