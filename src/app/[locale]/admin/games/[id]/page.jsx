'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    Box, Typography, Button, Tabs, Tab, Divider
} from '@mui/material';
import styles from './GameProfile.module.scss';
import { getAttributes } from '../../../../../api/ClientServices/catalogService.js';

import MainInfoTab from './MainInfoTab';
import ContentTab from './ContentTab';
import AddonsTab from './AddonsTab';
import DiscountsTab from './DiscountsTab';
import ImagesTab from './ImagesTab';
import {getGameById} from "@/api/ClientServices/gameService.js";

export default function GameProfilePage() {
    const { id } = useParams();
    const isNew = !id;

    const [game, setGame] = useState(null);
    const [editMode, setEditMode] = useState(isNew);
    const [formData, setFormData] = useState({
        addons: [],
        genres: [],
        tags: [],
        mechanics: [],
        matureContent: []
    });

    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(true);

    const [allGenres, setAllGenres] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [allMechanics, setAllMechanics] = useState([]);
    const [allMature, setAllMature] = useState([]);

    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const attrs = await getAttributes();
                setAllGenres(attrs.genres || []);
                setAllMechanics(attrs.mechanics || []);
                setAllTags(attrs.tags || []);
                setAllMature(attrs.matureContents || []);
            } catch (error) {
                console.error('Помилка при завантаженні атрибутів:', error);
            }
        };

        fetchAttributes();
    }, []);

    useEffect(() => {
        if (!isNew) {
            const fetchGame = async () => {
                try {
                    const fetched = await getGameById(id);
                    setGame(fetched);
                    setFormData(fetched);
                } catch (error) {
                    console.error('Error getting game data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchGame();
        } else {
            setLoading(false);
        }
    }, [id, isNew]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (field, value) => {
        const current = formData[field] || [];
        const updated = current.includes(value)
            ? current.filter((item) => item !== value)
            : [...current, value];
        setFormData({ ...formData, [field]: updated });
    };

    const handleSave = () => {
        //TODO: Implement save logic

        setEditMode(false);
    };

    const handleDeleteAddon = (addonId) => {
        const updatedAddons = formData.addons?.filter((addon) => addon.id !== addonId);
        setFormData({ ...formData, addons: updatedAddons });
    };

    const handleTabChange = (_, newValue) => {
        setTab(newValue);
    };

    if (loading) return <Typography>Завантаження...</Typography>;

    return (
        <Box className={styles.profileWrapper}>
            <Box className={styles.titleContainer}>
                <Typography variant='h3' sx={{ fontWeight: 500 }}>
                    {isNew ? 'Нова гра' : `Гра: ${game?.title}`}
                </Typography>

                {!editMode ? (
                    <Button variant='outlined' onClick={() => setEditMode(true)}>Редагувати</Button>
                ) : (
                    <Button variant='outlined' color='success' onClick={handleSave}>Зберегти</Button>
                )}

                {!isNew && (
                    <Button variant='outlined' color='error'>Видалити</Button>
                )}
            </Box>

            <Tabs value={tab}
                  onChange={handleTabChange}
                  className={styles.profileTabs}
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
                <Tab label='Основне'/>
                <Tab label='Контент'/>
                <Tab label='Аддони'/>
                <Tab label='Знижки'/>
                <Tab label='Зображення'/>
            </Tabs>

            {tab === 0 && (
                <MainInfoTab
                    editMode={editMode}
                    formData={formData}
                    handleChange={handleChange}
                />
            )}

            {tab === 1 && (
                <ContentTab
                    editMode={editMode}
                    formData={formData}
                    allGenres={allGenres}
                    allMechanics={allMechanics}
                    allTags={allTags}
                    allMature={allMature}
                    handleCheckboxChange={handleCheckboxChange}
                />
            )}

            {tab === 2 && (
                <AddonsTab
                    addons={formData.addons || []}
                    editMode={editMode}
                    onDeleteAddon={handleDeleteAddon}
                />
            )}

            {tab === 3 && (
                <DiscountsTab
                    editMode={editMode}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}

            {tab === 4 && (
                <ImagesTab
                    editMode={editMode}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}


        </Box>
    );
}
