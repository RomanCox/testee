import React, {useState} from 'react';
import './App.css';
import {ContainerStyled, DialogStyled, FullImageStyled} from './AppStyled';
import {Table} from './Table';
import {filmsApi} from './api/filmsApi';
import Skeleton from '@mui/material/Skeleton';

type ImageType = {
    src: string,
    alt: string,
}

export const App = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [image, setImage] = useState<ImageType>({src: '', alt: ''});

    const openModal = (id: string) => {
        filmsApi.getFilm(id)
            .then(res => {
                setIsLoading(false);
                setImage({src: res.data.poster.url, alt: res.data.name})
            })

        setIsActive(true);
    }

    const closeModal = () => {
        setImage({src: '', alt: ''});
        setIsActive(false);
        setIsLoading(true);
    }

    return (
        <ContainerStyled>
            <Table openModal={openModal}/>
            <DialogStyled onClose={closeModal} open={isActive}>
                {isLoading
                    ? <Skeleton animation='wave' variant='rounded' sx={{ bgcolor: 'grey.600' }}>
                        <FullImageStyled/>
                    </Skeleton>
                    : <FullImageStyled src={image.src} alt={image.alt}/>}
            </DialogStyled>
        </ContainerStyled>
    );
}


