import React, {useEffect, useState} from 'react';
import './App.css';
import Box from '@mui/material/Box';
import {DataGrid, GridRenderCellParams} from '@mui/x-data-grid';
import {ImageStyled} from './AppStyled';
import {filmsApi} from './api/filmsApi';

type TableType = {
    openModal: (id: string) => void,
}

export type MyFilmType = {
    id: string,
    name: string,
    poster: string,
    duration: number,
    premiere: string,
}

export const Table = ({openModal}: TableType) => {
    const [films, setFilms] = useState<Array<MyFilmType>>([]);

    const renderImage = (params: GridRenderCellParams<any, number>) => {
        return <ImageStyled src={params.row.poster} alt={params.row.cinema} onClick={() => openModal(params.row.id)}/>;
    }

    const columns = [
        {
            field: 'poster',
            headerName: 'Poster',
            renderCell: renderImage,
            width: 300,
            type: 'Image',
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
        },
        {
            field: 'movieLength',
            headerName: 'Duration',
            type: 'number | string',
            width: 110,
        },
        {
            field: 'premiere',
            headerName: 'Premiere',
            width: 250,
            type: 'string',
        },
    ];

    useEffect(() => {
        filmsApi.getFilms()
            .then(res => {
                // const emptyFilms: Array<MyFilmType> = [
                //     {
                //         id: '',
                //         name: '',
                //         poster: '',
                //         duration: 0,
                //         premiere: '',
                //     },
                //     {
                //         id: '',
                //         name: '',
                //         poster: '',
                //         duration: 0,
                //         premiere: '',
                //     },
                //     {
                //         id: '',
                //         name: '',
                //         poster: '',
                //         duration: 0,
                //         premiere: '',
                //     },
                //     {
                //         id: '',
                //         name: '',
                //         poster: '',
                //         duration: 0,
                //         premiere: '',
                //     },
                //     {
                //         id: '',
                //         name: '',
                //         poster: '',
                //         duration: 0,
                //         premiere: '',
                //     },
                //     {
                //         id: '',
                //         name: '',
                //         poster: '',
                //         duration: 0,
                //         premiere: '',
                //     },
                //     {
                //         id: '',
                //         name: '',
                //         poster: '',
                //         duration: 0,
                //         premiere: '',
                //     },
                //     {
                //         id: '',
                //         name: '',
                //         poster: '',
                //         duration: 0,
                //         premiere: '',
                //     },
                //     {
                //         id: '',
                //         name: '',
                //         poster: '',
                //         duration: 0,
                //         premiere: '',
                //     },
                //     {
                //         id: '',
                //         name: '',
                //         poster: '',
                //         duration: 0,
                //         premiere: '',
                //     },
                // ]
                if (res.data.docs) {
                    const films: Array<MyFilmType> = res.data.docs.map(film => {
                        const date = new Date(film.premiere.world);

                        return {
                            ...film,
                            poster: film.poster.previewUrl,
                            premiere: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
                        }
                    });
                    setFilms(films);
                    //setFilms([...films, ...emptyFilms]);
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <Box sx={{height: 'auto', width: '100%'}}>
            <DataGrid
                rows={films}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                getRowHeight={() => 'auto'}
            />
        </Box>
    );
}


