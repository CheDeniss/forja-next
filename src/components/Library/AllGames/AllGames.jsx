'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from "@/context/AuthContext.js";
import ProfileUserGameItem
    from "@/components/Profile/MyProfile/GameLibrary/ProfileUserGameItem/ProfileUserGameItem.jsx";
import {Skeleton} from "@mui/material";
import {getUserGameLibrary} from "@/api/ClientServices/libraryService.js";

const AllGames = ({ filters }) => {
    const [allGames, setAllGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(true); // Стан фільтрації
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const fetchGames = async () => {
            try {
                setLoading(true);
                const games = await getUserGameLibrary(user.id);
                setAllGames(games);
            } catch (err) {
                console.error('Помилка при завантаженні ігор:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [user]);

    useEffect(() => {
        if (loading) return;

        setIsFiltering(true);

        let filtered = [...allGames];

        if (filters.genres.length) {
            filtered = filtered.filter(item =>
                Array.isArray(item.game?.genres) &&
                item.game.genres.some(genre =>
                    filters.genres.includes(
                        typeof genre === 'string' ? genre : genre.name || genre.title || ''
                    )
                )
            );
        }

        if (filters.mechanics.length) {
            filtered = filtered.filter(item =>
                Array.isArray(item.game?.mechanics) &&
                item.game.mechanics.some(mechanic =>
                    filters.mechanics.includes(
                        typeof mechanic === 'string' ? mechanic : mechanic.name || mechanic.title || ''
                    )
                )
            );
        }

        if (filters.tags.length) {
            filtered = filtered.filter(item =>
                Array.isArray(item.game?.tags) &&
                item.game.tags.some(tag =>
                    filters.tags.includes(
                        typeof tag === 'string' ? tag : tag.name || tag.title || ''
                    )
                )
            );
        }

        if (filters.matureContents.length) {
            filtered = filtered.filter(item =>
                Array.isArray(item.game?.matureContent) &&
                item.game.matureContent.some(content =>
                    filters.matureContents.includes(
                        typeof content === 'string' ? content : content.name || content.title || ''
                    )
                )
            );
        }

        if (filters.search.trim()) {
            filtered = filtered.filter(item =>
                (item.game?.title || '').toLowerCase().includes(filters.search.trim().toLowerCase())
            );
        }

        setFilteredGames(filtered);
        setIsFiltering(false);
    }, [filters, allGames, loading]);


    const renderSkeletons = (count = 2) =>
        Array.from({ length: count }, (_, index) => (
            <div key={index} style={{ marginBottom: '0.5rem' }}>
                <Skeleton variant="rectangular" sx={{ height: '244px', width: '100%' }} />
            </div>
        ));


    if (loading) {
        return (
            renderSkeletons()
            // <span className="no_Items_Found">
            //     Loading games...
            // </span>
        );
    }

    if (isFiltering) {
        return null;
    }

    if (!filteredGames.length) {
        return (
            <span className="no_Items_Found">
                No games found for the selected filters.
            </span>
        );
    }

    return (
        loading ? (
            renderSkeletons()
        ) : (
            <div>
                {filteredGames.map((game) => (
                    <ProfileUserGameItem key={game.id} game={game} />
                ))}
            </div>
        )
    );

};

export default AllGames;
