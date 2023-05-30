import axios from 'axios';

type PosterType = {
    url: string,
    previewUrl: string,
}

type PremiereType = {
    world: Date,
    russia: Date,
}

type FilmResponseType = {
    id: string,
    name: string,
    poster: PosterType,
    duration: number,
    premiere: PremiereType,
}

type ResponseType = {
    docs: Array<FilmResponseType>,
    total: number,
    limit: number,
    page: number,
    pages: number,
}

const instance = axios.create({
    baseURL: 'https://api.kinopoisk.dev/v1.3/movie',
    headers: {
        'accept': 'application/json',
        'X-API-KEY': 'X8HSTQW-W00MSG4-PTSM0P3-FR1XNSP'
    }
})

export const filmsApi = {
    getFilms() {
        return instance.get<ResponseType>('', {
            params: {
                selectFields: 'id name poster movieLength premiere',
                page: 1,
                limit: 20,
            }
        })
    },
    getFilm(id: string) {
        return instance.get<FilmResponseType>(`/${id}`)
    }
}