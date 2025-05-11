'use client';
import React, { useEffect, useState } from 'react';
import {Box, Typography, Button, IconButton} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import styles from './UsersPage.module.scss';
import {getAllUsers} from "@/api/AdminServices/userAdminService.js";
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await getAllUsers();
                setUsers(allUsers)
                } catch (error) {
                    console.error('Error Getting users:', error);
                } finally {
                    setLoading(false);
                }
        };

        fetchUsers();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 300, flex: 1},
        { field: 'Username', headerName: 'Нікнейм', minWidth: 200, flex: 1},
        { field: 'Firstname', headerName: 'Ім\'я', minWidth: 200, flex: 1 },
        { field: 'Lastname', headerName: 'Прізвище', minWidth: 200, flex: 1 },
        { field: 'Email', headerName: 'Email', minWidth: 280, flex: 1},
        // { field: 'PhoneNumber', headerName: 'Телефон', flex: 1 },
        // { field: 'AvatarUrl', headerName: 'URL автарки', flex: 1 },
        // { field: 'BirthDate', headerName: 'Дата народження', flex: 1 },
        // { field: 'Gender', headerName: 'Стать', flex: 1 },
        // { field: 'Country', headerName: 'Країна', flex: 1 },
        // { field: 'City', headerName: 'Місто', flex: 1 },
        // { field: 'SelfDescription', headerName: 'Опис', flex: 1 },
        // { field: 'ShowPersonalInfo', headerName: 'SPI', flex: 1 },
        // { field: 'CreatedAt', headerName: 'Створено', flex: 1 },
        // { field: 'CustomUrl', headerName: 'Власний URL', flex: 1 },
        // { field: 'ProfileHatVariant', headerName: 'Варіант фонового зображення', flex: 1 },
        // { field: 'IsEmailConfirmed', headerName: 'Email ✔', width: 120 },
        // { field: 'IsEmailSent', headerName: 'Email ➤', width: 160 },
        {
            field: 'actions',
            headerName: 'Дії',
            flex: 1,
            renderCell: (params) => (
                // <CustomButtonOther width="auto" link={`/uk/admin/users/${params.row.id}`} key={params.row.id}>Переглянути</CustomButtonOther>
                <IconButton
                    aria-label="view"
                    size="medium"
                    sx={{ color: '#8D59F6' }}
                    component={Link}
                    href={`/uk/admin/users/${params.row.id}`}
                >
                    <EditIcon sx={{ fill: '#86A3A4', fontSize: 24 }}/>
                </IconButton>



            ),
        },
    ];

//     public class UserProfileDto
//     {
//     public Guid Id { get; set; }
//     public string Username { get; set; } = string.Empty;
//     public string? Firstname { get; set; }
//     public string? Lastname { get; set; }
//     public string Email { get; set; } = string.Empty;
//     public string? PhoneNumber { get; set; }
//     public string? AvatarUrl { get; set; }
//     public DateTime? BirthDate { get; set; }
//     public string? Gender { get; set; }
//     public string? Country { get; set; }
//     public string? City { get; set; }
//     public string? SelfDescription { get; set; }
//     public bool ShowPersonalInfo { get; set; }
//     public DateTime CreatedAt { get; set; }
//     public string? CustomUrl { get; set; }
//     public short ProfileHatVariant { get; set; }
//     public bool IsEmailConfirmed { get; set; }
//     public bool IsEmailSent { get; set; }
// }

    const rows = users.map((user) => ({
        id: user.id,
        Username: user.username,
        Firstname: user.firstname,
        Lastname: user.lastname,
        Email: user.email,
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
            <h1>Користувачі</h1>
            <Box sx={{ height: 500 }}>
                <DataGrid
                    // className={styles.customDataGrid}
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
