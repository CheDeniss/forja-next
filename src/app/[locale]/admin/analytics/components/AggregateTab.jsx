'use client';

import React, { useEffect, useState } from 'react';
import {
    Box, Typography, MenuItem, Select, FormControl,
    InputLabel, CircularProgress, TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
    LineChart, Line, CartesianGrid, XAxis, YAxis,
    Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { getAnalyticsAggregate } from '@/api/ClientServices/analyticsService.js';

export default function AggregateTab() {
    const [eventType, setEventType] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('2025-05-10');
    const [endDate, setEndDate] = useState('2025-05-15');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getAnalyticsAggregate({
                    eventType,
                    startDate: startDate + 'T00:00:00Z',
                    endDate: endDate + 'T00:00:00Z'
                });

                setChartData(response);
                setTableData(response.map(item => ({
                    id: item.id,
                    date: item.date,
                    metricName: item.metricName,
                    value: item.value
                })));
            } catch (e) {
                console.error('Error fetching analytics aggregate', e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventType, startDate, endDate]);

    const columns = [
        { field: 'date', headerName: 'Дата', width: 180 },
        { field: 'metricName', headerName: 'Метрика', width: 200 },
        { field: 'value', headerName: 'Значення', width: 150 }
    ];

    const metricLabel = chartData[0]?.metricName || 'Значення';

    return (
        <Box>
            <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="event-type-label">Тип події</InputLabel>
                    <Select
                        labelId="event-type-label"
                        value={eventType}
                        label="Тип події"
                        onChange={(e) => setEventType(e.target.value)}
                    >
                        <MenuItem value={0}>Переглядів сторінок</MenuItem>
                        <MenuItem value={1}>Покупки</MenuItem>
                        <MenuItem value={2}>Додано оглядів</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Початкова дата"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Кінцева дата"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </Box>

            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <Typography variant="h6" gutterBottom>Графік подій</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" name={metricLabel} stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>

                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>Таблиця подій</Typography>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={tableData}
                                columns={columns}
                                pageSize={6}
                                rowsPerPageOptions={[6, 12, 24]}
                            />
                        </div>
                    </Box>
                </>
            )}
        </Box>
    );
}
