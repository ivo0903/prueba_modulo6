
import {Anime} from '../models/Anime.model.js'
import { NotFoundError } from "../error/typesError.js";

export const createNewAnime = async(req, res,next) => {
    try {
        console.log('datos recibidos',req.body)
        const data = req.body
        const anime = await Anime.createData(data);
        
        res.status(200).json({
            message: 'Anime creado con éxito',
            status: 200,
            data: anime
        })
    } catch (error) {
        next(error)
        }
    }


export const getAllAnime = async(req, res) => {
    try {
        const data = await Anime.findAll();

        if(!data) throw new NotFoundError('No existen los datos', `No se encontraron los datos solictadoes en la ruta correspondiente`)

        res.status(200).json({
            message: 'Animes Encontrados!',
            status: 200,
            data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los Animes',
            status: 500,
            error,
        });
    }
}

export const updateAnimeAddById = async(req, res) => {
    try {
        const {id}  = req.params
        const dataAnime = req.body


        const actualizarAnime = await Anime.updateAnime(id, dataAnime)

        res.status(201).json({
            message: 'Anime Actualizado',
            status: 201,
            oldData: actualizarAnime,
            newData: dataAnime
        })
    } catch (error) {
            res.status(500).json({
            message: 'Error al actualizar el Anime',
            status: 500,
            error,
        });
    }
}

export const deleteAnimeAddById = async(req, res) => {
    try {
        const { id } = req.params

        const deleteAnime = await Anime.deleteAnime(id)

        res.status(200).json({
            message: `Anime con id ${id} Borrado con éxito`,
            status: 200,
            dataDeleted: deleteAnime
        })
    } catch (error) {
            res.status(500).json({
            message: 'Error al eliminar el anime',
            status: 500,
            error,
        });
    }
}


export const findAnimeById = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await Anime.findByName(id);

        if (!data) throw new NotFoundError('La data se encuentra vacía', `No encontramos el id: ${id}`);

        res.status(200).json({
            messsage: 'Anime Encontrado',
            status: 200,
            data
        })
    } catch (error) {
            res.status(500).json({
            message: 'Error al obtener el anime,buscado por id',
            status: 500,
            error,
        });
    }
}

export const findAnimeByName = async(req, res) => {
    try {
        const { nombre } = req.params;
        const data = await Anime.findByName(nombre);

        if (!data) throw new NotFoundError('La data se encuentra vacía', `No encontramos el nombre: ${nombre}`);

        res.status(200).json({
            messsage: 'Anime Encontrado',
            status: 200,
            data
        })
    } catch (error) {
            res.status(500).json({
            message: 'Error al obtener el anime,buscado por nombre',
            status: 500,
            error,
        });
    }
}

export const deleteAnime = async(req, res) => {
    try {
        const { id } = req.params
        await Anime.delete(id);

            res.status(200).json({
            message: `Anime con id ${id} Borrado con éxito`,
            status: 200,
        })

    }catch (error) {
            res.status(500).json({
            message: 'Error al eliminar el anime',
            status: 500,
            error,
        });
    }
}

export const getAllActiveAnimes = async(req, res) => {
    try {
        const animes = await Anime.getAllActiveAnime();

            res.status(200).json({
            message: 'Animes obtenidos con éxito',
            status: 200,
            data: animes
        })
    } catch(error){
            res.status(500).json({
            message: 'Error al obtener los animes',
            status: 500,
            error,
        });
    }
}

export const getActiveAnimeById = async(req, res) => {
    try {
        const { id } = req.params;
        const anime = await Anime.getActiveById(id)

            res.status(200).json({
            message: 'Anime obtenido con éxito',
            status: 200,
            data: anime,
        });
    } catch (error) {
            res.status(500).json({
            message: ' No tienes  permiso para acceder a esta información',
            status: 500,
            error,
        });
    }
}