'use client';
import React, { useEffect, useState } from 'react';
import {Box, Typography, Button, IconButton, Chip} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import styles from './GamesPage.module.scss';
import {getAllGames} from "@/api/AdminServices/gamesAdminService.js";
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/Delete';

export default function GamesPage() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const allGames = await getAllGames();
                setGames(allGames)
            } catch (error) {
                console.error('Error Getting games:', error);
            } finally {
                setLoading(false);
                console.log("games", games);
            }
        };

        fetchGames();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 300, flex: 1},
        { field: 'Title', headerName: 'Назва гри', minWidth: 200, flex: 1},
        { field: 'ShortDescription', headerName: 'Коротнкий опис', minWidth: 200, flex: 1 },
        { field: 'Developer', headerName: 'Розробник', minWidth: 200, flex: 1 },
        { field: 'Price', headerName: 'Ціна', minWidth: 80, flex: 1},

        // public class GameDto
        // {
        //     public Guid Id { get; set; }
        //     public string Title { get; set; } = string.Empty;
        //     public string ShortDescription { get; set; } = string.Empty;
        //     public string Description { get; set; } = string.Empty;
        //     public string Developer { get; set; } = string.Empty;
        //     public string MinimalAge { get; set; } = string.Empty;
        //     public string Platforms { get; set; } = string.Empty;
        //     public decimal Price { get; set; }
        //     public string LogoUrl { get; set; } = string.Empty;
        //     public DateTime ReleaseDate { get; set; }
        //     public bool IsActive { get; set; }
        //     public string InterfaceLanguages { get; set; } = string.Empty;
        //     public string AudioLanguages { get; set; } = string.Empty;
        //     public string SubtitlesLanguages { get; set; } = string.Empty;
        //     public string? SystemRequirements { get; set; }
        // }
        {
            field: 'actions',
            headerName: 'Дії',
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            width: 300, // ← підлаштуй за потребою, Chip-и займають більше місця
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                        aria-label="edit"
                        component={Link}
                        href={`/uk/admin/games/${params.row.id}`}
                        size="small"
                    >
                        <Chip icon={<EditIcon />} label="Edit" color="primary" size="small" />
                    </IconButton>

                    <IconButton
                        aria-label="add-addon"
                        component={Link}
                        href={`/uk/admin/addons/create?gameId=${params.row.id}`}
                        size="small"
                    >
                        <Chip icon={<ControlPointIcon />} label="Addon" color="success" size="small" />
                    </IconButton>

                    <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => console.log('Delete', params.row.id)}
                    >
                        <Chip icon={<DeleteIcon />} label="Delete" color="error" size="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];


    const rows = games.map((game) => ({
        id: game.id,
        Title: game.title,
        ShortDescription: game.shortDescription,
        Developer: game.developer,
        Price: game.price,
        // PhoneNumber: user.phoneNumber,
        // AvatarUrl: user.avatarUrl,
        // BirthDate: user.birthDate?.slice(0, 10),
        // Gender: user.gender,
        // Country: user.country,
        // City: user.city,
        // SelfDescription: user.selfDescription,
        // ShowPersonalInfo: user.showPersonalInfo ? 'Так' : 'Ні',
        // CreatedAt: user.createdAt?.slice(0, 10),
        // CustomUrl: user.customUrl,
        // ProfileHatVariant: user.profileHatVariant,
        // IsEmailConfirmed: user.isEmailConfirmed ? 'Так' : 'Ні',
        // IsEmailSent: user.isEmailSent ? 'Так' : 'Ні',
    }));


    return (
        <Box className={styles.container}>
            <h1>Ігри</h1>
            <Box sx={{ height: 500 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableRowSelectionOnClick
                    loading={loading}
                    autosizeOptions={{
                        includeHeaders: true,
                        includeOutliers: true,
                        outliersFactor: 2,
                        expand: true
                    }}
                    sx={{
                        // Загальний фон таблиці
                        backgroundColor: '#1a1a1a',

                        // Заголовки колонок (рядок зверху)
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#111',
                        },

                        // Кожна клітинка заголовку
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: '#111',
                        },

                        // Текст заголовків
                        '& .MuiDataGrid-columnHeaderTitle': {
                            color: '#E2E2E2',
                            fontWeight: 'bold',
                            fontSize: '0.95rem',
                        },

                        // Клітинки (звичайний текст у рядках)
                        '& .MuiDataGrid-cell': {
                            color: '#f0f0f0',
                        },

                        // При наведенні на рядок
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: '#2a2a2a',
                        },

                        // Футер (пагінація)
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: '#111',
                            color: '#ccc',
                        },

                        '& .MuiTablePagination-root': {
                            color: '#f0f0f0',           // ⬅️ текст пагінації
                        },

                        '& .MuiTablePagination-toolbar': {
                            color: '#f0f0f0',           // ⬅️ елементи тулбара пагінації
                        },

                        '& .MuiSelect-select': {
                            color: '#f0f0f0',           // ⬅️ select "Rows per page"
                        },

                        '& .MuiSvgIcon-root': {
                            color: '#f0f0f0',           // ⬅️ стрілки пагінації
                        },

                        '& .Mui-disabled': {
                            color: '#888',              // ⬅️ неактивні кнопки
                        },

                        // Роздільники колонок (при бажанні прибрати)
                        '& .MuiDataGrid-columnSeparator': {
                            display: '',
                        },

                        // Смужка прокрутки (необов'язково)
                        '& .MuiDataGrid-virtualScroller': {
                            backgroundColor: '#1a1a1a',
                        }
                    }}

                />

            </Box>
        </Box>
    );
}
