import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getAuditLogs } from '@/api/ClientServices/analyticsService.js';
import AuditLogFilters from './AuditLogFilters.jsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AuditLogTab() {
    const [logs, setLogs] = useState([]);
    const [filters, setFilters] = useState({
        userId: '',
        entityType: '',
        actionType: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const result = await getAuditLogs(filters);
                setLogs(result || []);
            } catch (error) {
                console.error('Помилка при завантаженні логів:', error);
            }
        };

        fetchLogs();
    }, [filters]);

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 250 },
        { field: 'entityType', headerName: 'Entity', width: 120 },
        { field: 'actionType', headerName: 'Action', width: 140 },
        { field: 'userId', headerName: 'User ID', width: 250 },
        { field: 'actionDate', headerName: 'Date', width: 180 },
        {
            field: 'message',
            headerName: 'Message',
            flex: 1,
            renderCell: (params) => (
                <span title={params.row.details?.Message}>{params.row.details?.Message?.slice(0, 80) || ''}</span>
            )
        },
        {
            field: 'logLevel',
            headerName: 'Level',
            width: 130,

            renderCell: (params) => (
                <span title={params.row.details?.LogLevel}>{params.row.details?.LogLevel?.slice(0, 80) || ''}</span>
            )
        }
    ];

    const chartData = logs.reduce((acc, log) => {
        const key = log.actionType;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const formattedChart = Object.entries(chartData).map(([key, value]) => ({
        action: key,
        count: value
    }));

    return (
        <Box>
            {/*<Typography variant="h5" gutterBottom>Audit Log</Typography>*/}
            <AuditLogFilters filters={filters} setFilters={setFilters} />
            <Box height={400} mb={4}>
                <DataGrid
                    rows={logs}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    disableRowSelectionOnClick
                />
            </Box>
            <Typography variant="h6">Події за типами</Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={formattedChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="action" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}
