import {v4 as uuidv4} from 'uuid'
import{Validate} from '../utils/Validations.js'
import { InternalServerError, ValidationError } from "../error/typesError.js";
import{createDataFile,
    getAllData,
    updateData,
    deleteData,
    getDataById,
    getDataByName,
    softDeleteData,
    getAllActiveData,
    getActiveDatabyId} from '../utils/fileUtils.js';




export class Anime{
    #id 
    #nombre
    #genero
    #anio
    #autor
    #active

    constructor (nombre,genero,anio, autor){
        this.#id = uuidv4().slice(0,7);
        this.#nombre = Validate.name (nombre, 'nombre')
        this.#genero = Validate.gender(genero, 'genero');
        this.#anio = Validate.year(anio);
        this.#autor = Validate.author(autor);
        this.#active=true;
    }

    get id(){
        return this.#id
    }
    
    get nombre(){
        return this.#nombre
    }

    get genero(){
        return this.#genero
    }
    
    get anio(){
        return this.#anio
    }
    
    get autor(){
        return this.#autor
    }

    get active(){
        return this.#active
    }

    setId(newId){
        this.#id = newId
    }
    
    setNombre(newNombre){
        try{
            Validate.name(newNombre,'nombre')
            return this.#nombre=newNombre
        }catch (error) {
            throw new ValidationError('Error al modificar el campo nombre',error)
        }        
    }

    setNewGenero(newGenero){
        try {
            Validate.gender(newGenero,'genero')
            return this.#genero=newGenero
        } catch (error) {
            throw new ValidationError('Error al modificar el campo genero',error)
        }
    }

    setAño(newAnio){
        try {
            Validate.year(newAnio)
            return this.#anio= newAnio
        } catch (error) {
            throw new ValidationError('Error al modificar el campo año',error)
        }
    }

    setAutor(newAutor){
        try {
            Validate.author(newAutor)
            return this.#autor =newAutor
        } catch (error) {
            throw new ValidationError('Error al modificar el campo autor',error)
        }
    }

    desactive() {
        console.log(this.#active)
        this.#active = false
    }

    active() {
            this.#active = true   
        }
    

    getAllProperties(){
        return {
            id: this.#id,
            nombre: this.#nombre,
            genero: this.#genero,
            anio: this.#anio,
            autor: this.#autor,
            active:this.#active
        }
    }

static async createData(data) {
        try {
            const { nombre, genero,anio, autor } = data
            const anime = new Anime(nombre, genero,anio, autor)
            const animeObject = anime.getAllProperties()
            await createDataFile(animeObject, 'anime.json')
            return animeObject
        } catch (error) {
            throw new InternalServerError(`Fallo al crear un nuevo Anime`, error)
        }
    }

    static async findAll() {
        try {
            const animes = await getAllData('anime.json')
            return animes
        } catch (error) {
            throw new InternalServerError('Error al obtener los datos de los animes', error)
        }
    }
    
    static async updateAnime(id, data) {
        try {
            const currentAnime = await Anime.findById(id);
            if (!currentAnime) throw new Error('Anime no encontrado'); 
            const updatedAnime = new Anime(
                data.nombre || updatedAnime.nombre,
                data.genero || updatedAnime.genero,
                data.anio || updatedAnime.anio,
                data.autor || updatedAnime.autor
            );
            updatedAnime.setId(id);
    
            await updateData(id, updatedAnime.getAllProperties(), 'anime.json');
            return updatedAnime;
        } catch (error) {
            throw new InternalServerError(`Fallo al actualizar el anime`, error);
        }
    }

    static async deleteAnime(id) {
        try {
            const deleteAnime = await deleteData(id, 'anime.json');
            return deleteAnime
        } catch (error) {
            throw new InternalServerError(`Fallo al eliminar permanente el anime`, error);
        }
    }

    static async findById(id) {
        try {
            const anime = await getDataById(id, 'anime.json')
            return anime
        } catch (error) {
            throw new InternalServerError('Error al obtener los datos del anime', error);
        }
    }

    static async findByName(nombre) {
        try {
            const anime = await getDataByName(nombre, 'anime.json')
            return anime
        } catch (error) {
            throw new InternalServerError('Error al obtener los datos del anime', error);
        }
    }

    static formatInstance(objeto) {
        try {
            const { id, nombre, genero,anio, autor } = objeto;
            const newInstance = new Anime(nombre, genero,anio, autor);
            newInstance.setId(id)
    
            return newInstance
        } catch (error) {
            throw new InternalServerError('Problemas al formatear la instancia de Anime', error)
        }
    }

    static async delete(id) {
        try {
            await softDeleteData(id, 'anime.json', Anime)
        } catch (error) {
            throw new InternalServerError(`Fallo al eliminar el anime`, error);
        }
    }

    static async getAllActiveAnime() {
        try {
            const animes = await getAllActiveData('anime.json');
            return animes
        } catch (error) {
            throw new InternalServerError('Error al obtener los datos del anime', error);
        }
    }

    static async getActiveById(id) {
        try {
            const anime = await getActiveDatabyId(id, 'anime.json');
            return anime
        } catch (error) {
            throw new InternalServerError('Error al obtener los datos del anime', error);
        }
    }    
}