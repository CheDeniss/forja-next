import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteFAQ } from '@/api/AdminServices/faqService';

export default function FAQList({ faqs, onEdit, onRefresh }) {

    const handleDelete = async (id) => {
        if (confirm('Ви впевнені, що хочете видалити це запитання?')) {
            await deleteFAQ(id);
            onRefresh();
        }
    };

    const columns = [
        { field: 'order', headerName: '№', width: 70 },
        { field: 'question', headerName: 'Питання', flex: 1 },
        {
            field: 'answer',
            headerName: 'Відповідь',
            flex: 3,
            renderCell: (params) => (
                <div style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                }}>
                    {params.value}
                </div>
            )
        },
        {
            field: 'actions',
            headerName: 'Дії',
            width: 100,
            fixed: true,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => onEdit(params.row)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}><DeleteIcon color="error" /></IconButton>
                </>
            ),
        },
    ];

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={faqs}
                columns={columns}
                getRowId={(row) => row.id}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 20]}
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
