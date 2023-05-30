import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import {DataGrid,  GridRenderCellParams} from '@mui/x-data-grid';
import gotg from './assets/images/gotg.webp';
import meg from './assets/images/meg.webp';
import mi from './assets/images/mi.webp';
import bt from './assets/images/bt.webp';
import eeaao from './assets/images/eeaao.webp';
import tg from './assets/images/tg.webp';
import mf from './assets/images/mf.webp';
import bp from './assets/images/bp.webp';
import blonde from './assets/images/blonde.webp';
import {ImageStyled} from './AppStyled';

type TableType = {
  openModal: (src: string, alt: string) => void,
}

export const Table = ({openModal}: TableType) => {

  const renderImage = (params: GridRenderCellParams<any, number>) => {
    return <ImageStyled src={params.row.poster} alt={params.row.cinema} onClick={() => openModal(params.row.poster, params.row.cinema)}/>;
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'cinema',
      headerName: 'Cinema',
      width: 250,
      editable: true,
    },
    {
      field: 'poster',
      headerName: 'Poster',
      renderCell: renderImage,
      width: 300,
      type: 'Image',
    },
    {
      field: 'duration',
      headerName: 'Duration',
      type: 'number | string',
      width: 110,
    },
    {
      field: 'showDate',
      headerName: 'Premier',
      width: 250,
      type: 'date',
    },
  ];

  const rows = [
    { id: 1, poster: gotg, cinema: 'Guardians of the Galaxy Vol. 3', duration: 150, showDate: new Date("2023-08-21") },
    { id: 2, poster: meg, cinema: 'Meg 2: The Trench ', duration: 'coming soon', showDate: new Date("2024-03-14") },
    { id: 3, poster: mi, cinema: 'Mission: Impossible - Dead Reckoning Part One', duration: 156, showDate: new Date("2023-09-01") },
    { id: 4, poster: bt, cinema: 'Bullet Train', duration: 126, showDate: new Date("2023-12-12") },
    { id: 5, poster: eeaao, cinema: 'Everything Everywhere All at Once', duration: 139, showDate: new Date("2023-06-08") },
    { id: 6, poster: tg, cinema: 'Top Gun: Maverick', duration: 130, showDate: new Date("2023-07-14") },
    { id: 7, poster: mf, cinema: 'Moonfall', duration: 130, showDate: new Date("2023-10-28") },
    { id: 8, poster: bp, cinema: 'Black Panther: Wakanda Forever', duration: 161, showDate: new Date("2023-11-11") },
    { id: 9, poster: blonde, cinema: 'Blonde', duration: 167, showDate: new Date("2023-12-13") },
  ];

  return (
      <Box sx={{ height: 'auto', width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            getRowHeight={() => 'auto'}
        />
      </Box>
  );
}


