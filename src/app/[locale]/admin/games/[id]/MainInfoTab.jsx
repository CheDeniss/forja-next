'use client';
import React from 'react';
import styles from './MainInfoTab.module.scss';

const MainInfoTab = ({ editMode, formData, handleChange }) => {
  return (
    <table className={styles.profileTable}>
      <tbody>
        {[
          ['ID', 'id', 'div'],
          ['Назва', 'title'],
          ['Короткий опис', 'shortDescription'],
          ['Опис', 'description', 'textarea'],
          ['Розробник', 'developer'],
          ['Мінімальний вік', 'minimalAge', 'number'],
          ['Платформи', 'platforms'],
          ['Ціна', 'price', 'number'],
          ['Release Date', 'releaseDate', 'date'],
          ['Logo URL', 'logoUrl'],
          ['Інтерфейсні мови', 'interfaceLanguages'],
          ['Аудіо мови', 'audioLanguages'],
          ['Субтитри', 'subtitlesLanguages'],
          ['Вимоги до системи', 'systemRequirements', 'textarea'],
        ].map(([label, field, type = 'text']) => (
          <tr key={field}>
            <td><label htmlFor={field}>{label}</label></td>
            <td>
              {type === 'textarea' ? (
                <textarea
                  id={field}
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              ) : type === 'div' ? (
                <div className={styles.readonlyField}>
                  {formData[field]}
                </div>
              ) : (
                <input
                  type={type}
                  id={field}
                  name={field}
                  value={formData[field]?.slice ? formData[field].slice(0, 10) : formData[field] || ''}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MainInfoTab;
