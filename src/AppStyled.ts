import {Dialog, styled} from '@mui/material';

export const ContainerStyled = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const ImageStyled = styled('img')({
    width: 'auto',
    height: '100%',
    minHeight: '100px',
    maxHeight: '300px',
});

export const DialogStyled = styled(Dialog)({});

export const FullImageStyled = styled('img')({
    width: 'auto',
    height: '100%',
});
