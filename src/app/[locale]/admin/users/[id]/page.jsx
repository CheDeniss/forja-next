'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Box, Typography, Grid, TextField, Button, Divider, Tabs, Tab
} from '@mui/material';
import Link from 'next/link';
import { getFullUserById } from '../../../../../api/Admin_Services/UserAdminService.js';
import upStyles from './UserProfile.module.scss';

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getFullUserById(id);
        setUser(fetchedUser);
        setFormData(fetchedUser);
      } catch (error) {
        console.error('Error getting user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch(`/api/user-profiles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => {
      setEditMode(false);
      setUser(formData);
    });
  };

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
  };

  if (!user) return <Typography>Завантаження...</Typography>;

  return (
      <Box className={upStyles.profileWrapper}>

        <Box className={upStyles.titleContainer}>
          <Typography
              variant={"h3"}
              sx={{ fontWeight: 500,
              }}
          >
            Профіль користувача: {user.username}
          </Typography>

          {!editMode ? (
              <Button variant="outlined" onClick={() => setEditMode(true)}>Редагувати</Button>
          ) : (
              <Button variant="outlined" color="success" onClick={handleSave}>Зберегти</Button>
          )}

            <Button variant="outlined" color="error" >Видалити</Button>
        </Box>

        <Tabs value={tab}
              onChange={handleTabChange}
              className={upStyles.profileTabs}
              sx={{
                borderBottom: '1px solid #333',
                '.MuiTab-root': {
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  minWidth: 'auto',
                  padding: '8px 16px',
                  '&:hover': {
                    color: 'var(--hover-color)',
                  },
                  '&.Mui-selected': {
                    fontWeight: 500,
                    color: 'var(--active-element)',
                  },
                },
                '.MuiTabs-indicator': {
                  backgroundColor: 'var(--active-element)',
                  height: '1px',
                },
              }}
        >
          <Tab label="Інфо"/>
          <Tab label="Бібліотека" component={Link} href={`/uk/admin/users/${id}/library`}/>
          <Tab label="Побажання" component={Link} href={`/uk/admin/users/${id}/wishlist`}/>
          <Tab label="Огляди" component={Link} href={`/uk/admin/users/${id}/reviews`}/>
          <Tab label="Досягнення" component={Link} href={`/uk/admin/users/${id}/achievements`}/>
          <Tab label="Сейви" component={Link} href={`/uk/admin/users/${id}/saves`}/>
          <Tab label="Підписки" component={Link} href={`/uk/admin/users/${id}/followers`}/>
        </Tabs>

        {/*<Divider sx={{mb: 2}}/>*/}

        <table className={upStyles.profileTable}>
          <tbody>
          {[
            ['ID', 'id', 'div'],
            ['Username', 'username'],
            ['Ім’я', 'firstname'],
            ['Прізвище', 'lastname'],
            ['Email', 'email'],
            ['Телефон', 'phoneNumber'],
            ['Avatar URL', 'avatarUrl'],
            ['Дата народження', 'birthDate', 'date'],
            ['Стать', 'gender', 'select'],
            ['Країна', 'country'],
            ['Місто', 'city'],
            ['Опис', 'selfDescription', 'textarea'],
            ['Custom URL', 'customUrl'],
            ['Profile Hat Variant', 'profileHatVariant', 'number'],
            ['Створено', 'createdAt'],
            ['Email підтверджено', 'isEmailConfirmed', 'bool'],
            ['Email відправлено', 'isEmailSent', 'bool'],
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
                          disabled={!editMode && field !== 'id' && field !== 'username'}
                      />
                  ) : type === 'select' ? (
                      <select
                          id={field}
                          name={field}
                          value={formData[field] || ''}
                          onChange={handleChange}
                          disabled={!editMode}
                      >
                        <option value="">Оберіть стать</option>
                        <option value="male">Чоловіча</option>
                        <option value="female">Жіноча</option>
                        <option value="other">Інша</option>
                      </select>
                  ) : type === 'bool' ? (
                      <input
                          type="text"
                          value={formData[field] ? 'Так' : 'Ні'}
                          disabled
                      />
                  ) : type === 'div' ? (
                      <div className={upStyles.readonlyField}>
                        {formData[field]}
                      </div>
                  ) : (
                      <input
                          type={type}
                          id={field}
                          name={field}
                          value={formData[field]?.slice ? formData[field].slice(0, 10) : formData[field] || ''}
                          onChange={handleChange}
                          disabled={!editMode && field !== 'id' && field !== 'username'}
                      />
                  )}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </Box>
  );
}