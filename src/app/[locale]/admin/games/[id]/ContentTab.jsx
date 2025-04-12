'use client';
import React from 'react';
import styles from './ContentTab.module.scss';

const ContentTab = ({ editMode, formData, allGenres, allMechanics, allTags, allMature, handleCheckboxChange }) => {
  const sections = [
    { title: 'Жанри', key: 'genres', options: allGenres },
    { title: 'Механіки', key: 'mechanics', options: allMechanics },
    { title: 'Теги', key: 'tags', options: allTags },
    { title: 'Контент 18+', key: 'matureContent', options: allMature },
  ];

  return (
    <div className={styles.contentTab}>
      {sections.map(({ title, key, options }) => (
        <div key={key} className={styles.contentBlock}>
          <h3>{title}</h3>
          <div className={styles.checkboxGrid}>
            {options.map((option) => {
              const value = option.key || option;
              const label = option.label || option;
              return (
                <label key={value} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    disabled={!editMode}
                    checked={formData[key]?.includes(value)}
                    onChange={() => handleCheckboxChange(key, value)}
                  />
                  {label}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentTab;
