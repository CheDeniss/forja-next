import React from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';

const entityTypes = [
    { label: 'Користувач', value: 0 },
    { label: 'Продукт', value: 1 },
    { label: 'Замовлення', value: 2 },
    { label: 'Платіж', value: 3 },
    { label: 'Інше', value: 4 },
];

const actionTypes = [
    { label: 'Створення', value: 0 },
    { label: 'Оновлення', value: 1 },
    { label: 'Видалення', value: 2 },
    { label: 'Перегляд', value: 3 },
    { label: 'Вхід', value: 4 },
    { label: 'Вихід', value: 5 },
    { label: 'Несанкціонований доступ', value: 6 },
    { label: 'Подія системи', value: 7 },
    { label: 'Помилка валідації', value: 8 },
    { label: 'Системна помилка', value: 9 },
    { label: 'Помилка бази даних', value: 10 },
    { label: 'Помилка API', value: 11 },
    { label: 'Помилка автентифікації', value: 12 },
    { label: 'Помилка бізнес-логіки', value: 13 },
    { label: 'Інше', value: 14 },
];


export default function AuditLogFilters({ filters, setFilters }) {
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const resetFilters = () => {
        setFilters({
            userId: '',
            entityType: '',
            actionType: '',
            startDate: '',
            endDate: ''
        });
    };

    return (
        <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
            <TextField
                label="User ID"
                name="userId"
                value={filters.userId}
                onChange={handleChange}
                sx={{ minWidth: 300 }}
            />
            <TextField
                select
                label="Сутність"
                name="entityType"
                value={filters.entityType}
                onChange={handleChange}
                sx={{ minWidth: 200 }}
            >
                {entityTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                ))}
            </TextField>
            <TextField
                select
                label="Подія"
                name="actionType"
                value={filters.actionType}
                onChange={handleChange}
                sx={{ minWidth: 200 }}
            >
                {actionTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                ))}
            </TextField>
            <TextField
                type="date"
                label="Початок"
                name="startDate"
                InputLabelProps={{ shrink: true }}
                value={filters.startDate}
                onChange={handleChange}
            />
            <TextField
                type="date"
                label="Кінець"
                name="endDate"
                InputLabelProps={{ shrink: true }}
                value={filters.endDate}
                onChange={handleChange}
            />
            <Button onClick={resetFilters} variant="outlined">Скинути</Button>
        </Box>
    );
}
