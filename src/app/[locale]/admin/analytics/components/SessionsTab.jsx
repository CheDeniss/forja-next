'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import {getSessionByUserId, getSessions} from '@/api/ClientServices/analyticsService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function SessionAnalyticsTab() {
    const [sessions, setSessions] = useState([]);
    const [userId, setUserId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = [];
                if (userId) {
                    result = await getSessionByUserId(userId);
                } else {
                    result = await getSessions();
                }
                setSessions(result || []);
            } catch (error) {
                console.error('Помилка при завантаженні сесій:', error);
            }
        };
        fetchData();
    }, [userId]);

    const filtered = sessions.filter(session => {
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        const sessionStart = new Date(session.startTime);
        return (!start || sessionStart >= start) && (!end || sessionStart <= end);
    });

    const columns = [
        { field: 'sessionId', headerName: 'ID сесії', minWidth: 250 },
        { field: 'userId', headerName: 'ID користувача', minWidth: 250 },
        {
            field: 'startTime',
            headerName: 'Початок',
            width: 180,
            valueFormatter: (params) => dayjs(params?.value).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            field: 'endTime',
            headerName: 'Кінець',
            width: 180,
            valueFormatter: (params) => params?.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm:ss') : 'Активна'
        },
        {
            field: 'ip',
            headerName: 'IP-адреса',
            width: 150,
            // valueGetter: (params) => params?.row?.metadata?.IpAddress
            renderCell: (params) => (
                <span>{params?.row?.metadata?.IpAddress || ''}</span>
            )
        },
        {
            field: 'userAgent',
            headerName: 'Браузер',
            flex: 1,
            // valueGetter: (params) => params?.row?.metadata?.['User-Agent']
            renderCell: (params) => (
                <span>{params?.row?.metadata?.['User-Agent'] || ''}</span>
            )
        },
    ];

    const stats = {
        total: filtered.length,
        finished: filtered.filter(s => s.endTime).length,
        active: filtered.filter(s => !s.endTime).length,
        avgDuration: null,
        maxDuration: null,
        uniqueUsers: new Set(filtered.map(s => s.userId)).size,
    };

    const durations = filtered.filter(s => s.endTime).map(s => {
        const durationMs = new Date(s.endTime) - new Date(s.startTime);
        return durationMs / 60000;
    });

    if (durations.length) {
        const total = durations.reduce((a, b) => a + b, 0);
        stats.avgDuration = (total / durations.length).toFixed(1);
        stats.maxDuration = Math.max(...durations).toFixed(1);
    }

    const chartData = {};
    filtered.forEach(s => {
        const date = dayjs(s.startTime).format('YYYY-MM-DD');
        chartData[date] = (chartData[date] || 0) + 1;
    });

    const chartArray = Object.entries(chartData).map(([date, count]) => ({ date, count }));

    const histogramBuckets = Array(12).fill(0);
    durations.forEach(mins => {
        const idx = Math.min(Math.floor(mins / 10), 11);
        histogramBuckets[idx]++;
    });

    const histogramData = histogramBuckets.map((count, i) => ({
        range: i < 11 ? `${i * 10}-${(i + 1) * 10}` : '110+',
        count,
    }));

    return (
        <Box>
            <Typography variant='h6' gutterBottom>Фільтрація</Typography>
            <Box display='flex' gap={2} mb={2}>
                <TextField label='ID користувача' value={userId} onChange={e => setUserId(e.target.value)} size='small' sx={{width: '300px'}} />
                <TextField label='Початкова дата' type='date' value={startDate} onChange={e => setStartDate(e.target.value)} size='small' InputLabelProps={{ shrink: true }} />
                <TextField label='Кінцева дата' type='date' value={endDate} onChange={e => setEndDate(e.target.value)} size='small' InputLabelProps={{ shrink: true }} />
            </Box>

            <Typography variant='h6' gutterBottom>Сесії</Typography>
            <Box height={400} mb={4}>
                <DataGrid
                    rows={filtered}
                    columns={columns}
                    getRowId={(r) => r.sessionId}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    disableRowSelectionOnClick
                />
            </Box>

            <Typography variant='h6'>Кількість сесій за днями</Typography>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={chartArray}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey='count' fill='#8884d8' />
                </BarChart>
            </ResponsiveContainer>

            <Typography variant='h6' mt={4}>Гістограма тривалості сесій (хвилини)</Typography>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={histogramData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='range' />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey='count' fill='#82ca9d' />
                </BarChart>
            </ResponsiveContainer>

            <Typography variant='h6' mt={4}>Зведені дані</Typography>
            <ul>
                <li>Загальна кількість сесій: {stats.total}</li>
                <li>Завершені сесії: {stats.finished}</li>
                <li>Активні сесії: {stats.active}</li>
                <li>Середня тривалість: {stats.avgDuration ?? '—'} хв</li>
                <li>Максимальна тривалість: {stats.maxDuration ?? '—'} хв</li>
                <li>Кількість користувачів: {stats.uniqueUsers}</li>
            </ul>
        </Box>
    );
}
