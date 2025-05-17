import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {IconButton, Avatar, Chip, Box} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteNewsArticle} from "@/api/AdminServices/newsAdminService.js";

export default function NewsList({ news, onEdit, onRefresh }) {

    const handleDelete = async (id) => {
        if (confirm('Ви впевнені, що хочете видалити цю новину?')) {
            await deleteNewsArticle(id);
            onRefresh();
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 300, flex: 1 },
        { field: 'title', headerName: 'Заголовок', minWidth: 200, flex: 1 },
        {
            field: 'content',
            headerName: 'Контент',
            minWidth: 300,
            flex: 2,
            renderCell: (params) => (
                <span>
                {params.value?.length > 150
                    ? params.value.slice(0, 150) + '...'
                    : params.value || '—'}
            </span>
            ),
        },
        {
            field: 'publicationDate',
            headerName: 'Дата',
            width: 120,
            valueFormatter: (params) => {return new Date(params).toLocaleDateString()},

        },
        {
            field: 'isActive',
            headerName: 'Активна',
            width: 100,
            valueFormatter: (params) => {return params ? '✔️' : '❌'} ,
        },
        {
            field: 'isPrioritized',
            headerName: 'Пріоритетна',
            width: 100,
            valueFormatter: (params) => {return params ? '✔️' : '❌'} ,
        },
        {
            field: 'imageUrl',
            headerName: 'Зображення',
            width: 60,
            renderCell: (params) => (
                <Avatar
                    src={params.value}
                    variant='square'
                    sx={{ width: 48, height: 48 }}
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Дії',
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            width: 100,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => onEdit(params.row)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}><DeleteIcon color="error" /></IconButton>
                </>
            ),
        },
    ];


    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={news}
                columns={columns}
                getRowId={(row) => row.id}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10]}
                autosizeOptions={{
                    includeHeaders: true,
                    includeOutliers: true,
                    outliersFactor: 2,
                    expand: true
                }}
                sx={{
                    // Загальний фон таблиці
                    backgroundColor: '#1a1a1a',
                    fontFamily: 'Fixel, sans-serif',
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
        </div>
    );
}
