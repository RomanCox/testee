import React, {useEffect, useState} from 'react';
import './App.css';
import Box from '@mui/material/Box';
import {DataGrid, GridCellParams, GridColDef, GridRenderCellParams, GridSortModel} from '@mui/x-data-grid';
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
    premiere: Date,
}

export const Table = ({openModal}: TableType) => {
    const [films, setFilms] = useState<Array<MyFilmType>>([]);
    const [sortModel, setSortModel] = useState<GridSortModel>(() => {
        const sortModel = localStorage.getItem('sortModel');
        if (sortModel) {
            return JSON.parse(sortModel)
        } else {
            return [
                {
                    field: 'name',
                    sort: 'asc',
                },
                {
                    field: 'premiere',
                    sort: null,
                },
            ]
        }

    });

    const style = {
        height: 'auto',
        width: 'auto',
        '& .header': {
            backgroundColor: '#9DB0DD',
            color: 'black',
            fontSize: '1.2em',
            fontWeight: '600',
        },
        '& .poster': {
            padding: '5px',
            backgroundColor: '#9EC695',
            cursor: 'pointer',
        },
        '& .name': {
            backgroundColor: '#9EC695',
            color: 'black',
            fontSize: '1.5em',
            fontWeight: '600',
            textAlign: 'center',
        },
        '& .movieLength': {
            padding: '5px',
            backgroundColor: '#9EC695',
            color: 'black',
            fontSize: '1.2em',
            fontWeight: '500',
            textAlign: 'center',
        },
        '& .premiere': {
            padding: '5px',
            backgroundColor: '#9EC695',
            color: 'black',
            fontSize: '1.2em',
            fontWeight: '600',
        },
    }

    const renderImage = (params: GridRenderCellParams<any, number>) => {
        return <ImageStyled src={params.row.poster} alt={params.row.cinema} onClick={() => openModal(params.row.id)}/>;
    }

    const columns: GridColDef[] = [
        {
            field: 'poster',
            headerName: 'Poster',
            renderCell: renderImage,
            width: 300,
            type: 'Image',
            headerClassName: 'header',
            sortable: false,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
            headerClassName: 'header',
        },
        {
            field: 'movieLength',
            headerName: 'Duration',
            type: 'number',
            width: 150,
            valueFormatter: ({value}) => `${value} min`,
            headerClassName: 'header',
        },
        {
            field: 'premiere',
            headerName: 'Premiere',
            width: 150,
            type: 'Date',
            valueFormatter: ({value}) => {
                const date = new Date(value);
                return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
            },
            headerClassName: 'header',
        },
    ];

    useEffect(() => {
        filmsApi.getFilms()
            .then(res => {
                if (res.data.docs) {
                    const films: Array<MyFilmType> = res.data.docs.map(film => {
                        return {
                            ...film,
                            poster: film.poster.previewUrl,
                            premiere: film.premiere.world,
                        }
                    });
                    setFilms(films);
                    const newSortModel = localStorage.getItem('sortModel');
                    if (newSortModel) {
                        console.log(newSortModel)
                        setSortModel(JSON.parse(newSortModel));
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <Box sx={style}>
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
                sortModel={sortModel}
                onSortModelChange={(newSortModel) => {
                    localStorage.setItem('sortModel', JSON.stringify(newSortModel));
                    setSortModel(newSortModel);
                }}
                getRowHeight={() => 'auto'}
                getCellClassName={(params: GridCellParams<any, any, number>) => {
                    if (params.field === 'poster') {
                        return 'poster';
                    }
                    if (params.field === 'name') {
                        return 'name';
                    }
                    if (params.field === 'movieLength') {
                        return 'movieLength';
                    }
                    if (params.field === 'premiere') {
                        return 'premiere';
                    }
                    return '';
                }}
            />
        </Box>
    );
}


