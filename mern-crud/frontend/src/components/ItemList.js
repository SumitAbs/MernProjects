// frontend/src/components/ItemList.js

import React from 'react';

const ItemList = ({ items, onEdit, onDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          <strong>{item.name}</strong>: {item.description}
          <button onClick={() => onEdit(item)}>Edit</button>
          <button onClick={() => onDelete(item._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
