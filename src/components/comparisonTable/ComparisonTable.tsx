import React from 'react';
import './ComparisonTable.scss';

/**
 * Компонент "Таблица сравнения"
 * @returns {React.ReactElement} - react-элемент
 */

export const ComparisonTable: React.FC = ({ children }) => (
  <table className="pokemon-table">
    <colgroup>
      <col style={{ width: '100px' }} />
      <col style={{ width: '100px' }} />
      <col style={{ width: '50px' }} />
      <col style={{ width: '70px' }} />
      <col style={{ width: '70px' }} />
      <col style={{ width: '70px' }} />
      <col style={{ width: '70px' }} />
      <col style={{ width: '70px' }} />
      <col style={{ width: '70px' }} />
      <col style={{ width: '70px' }} />
      <col />
      <col style={{ width: '70px' }} />
    </colgroup>
    <thead>
      <tr>
        <td>name</td>
        <td>image</td>
        <td>hp</td>
        <td>attack</td>
        <td>defence</td>
        <td>Special Attack</td>
        <td>Special Defence</td>
        <td>speed</td>
        <td>height</td>
        <td>weight</td>
        <td>abilities</td>
        <td />
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);
