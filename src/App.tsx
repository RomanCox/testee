import React, {useState} from 'react';
import './App.css';
import {ContainerStyled, DialogStyled, FullImageStyled} from './AppStyled';
import {Table} from './Table';

type ImageType = {
    src: string,
    alt: string
}

export const App = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [image, setImage] = useState<ImageType>({src: '', alt: ''});

    const openModal = (src: string, alt: string) => {
        setImage({src, alt});
        setIsActive(true);
    }

    const closeModal = () => {
        setIsActive(false);
    }

    return (
        <ContainerStyled>
            <Table openModal={openModal}/>
            <DialogStyled onClose={closeModal} open={isActive}>
                <FullImageStyled src={image.src} alt={image.alt}/>
            </DialogStyled>
        </ContainerStyled>
    );
}


