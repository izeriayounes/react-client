import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

function Accordion({ items }) {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (nextIndex) => {
    if (expandedIndex === nextIndex) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(nextIndex);
    }
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex;

    const arrowUpDown = <span className="text-2xl">{isExpanded ? <GoChevronDown /> : <GoChevronLeft />}</span>;

    return (
      <div key={item.id}>
        <div
          className={
            'flex items-center p-3 justify-between cursor-pointer pl-10 hover:bg-teal-600 ' +
            (isExpanded && 'bg-teal-600')
          }
          onClick={() => handleClick(index)}
        >
          <div className="flex items-center">
            {item.icon}
            <p className="font-bold">{item.label}</p>
          </div>

          {arrowUpDown}
        </div>
        {isExpanded && <div className="ml-12 ">{item.content}</div>}
      </div>
    );
  });

  return <div>{renderedItems}</div>;
}

export default Accordion;
