import React from 'react';
import { DerivedPharmacyItem } from '../../types/hospital';

interface MedicineListProps {
  items: DerivedPharmacyItem[];
}

export const MedicineList: React.FC<MedicineListProps> = ({ items }) => {
  return (
    <div>
      <div className="section-title">Inventory</div>
      <div className="med-list">
        <div className="med-row head">
          <span>Medicine</span>
          <span>Stock</span>
          <span>Days left</span>
          <span>Status</span>
        </div>
        {items.map((p) => (
          <div key={p.name} className="med-row">
            <div>
              <div className="med-name">{p.name}</div>
              <div className="med-cat">{p.category}</div>
            </div>
            <div className="num">
              {p.stock} {p.unit}
            </div>
            <div className="num">{p.daysRemaining.toFixed(1)}d</div>
            <div className="mr-reorder">
              <span className={`status-pill ${p.status}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
