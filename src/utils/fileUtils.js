
import{createFile, readFile} from '../services/fileService.js';
import { NotFoundError, JsonError } from "../error/typesError.js";


export const createDataFile = async (data, dataPath) => {
    try {
        const datafile = await readFile(dataPath);
        let dataJson = null
    
        !datafile || datafile.length === 0 ? (dataJson = [data]) : dataJson = [ ...datafile, data ]
    
        await createFile(dataJson, dataPath)
        
    } catch (error) {
        throw new JsonError(`Error al gestionar la creación del archivo con la data`, error)
    }
}

export const getAllData = async(pathData) => {
    try {
        const data = await readFile(pathData)
        return data
    } catch (error) {
        throw new NotFoundError('No pudimos acceder a los datos', error)
    }
}

export const updateData = async (id, newData, pathData) => {
    try {
        const data = await readFile(pathData)
        const indexData = data.findIndex(dataFound => dataFound.id === id);

        if (indexData === -1) console.error('No pudimos encontrar el dato que buscas')

        const oldData = { ...data[indexData] }
        data[indexData] = { ...data[indexData], ...newData }

        data[indexData] = { id, ...newData }; 
        await createFile(data, pathData)

        return oldData
    } catch (error) {
        throw new JsonError('No pudimos actualizar el anime', error)
    }
}

export const deleteData = async(id, pathData) => {
    try {
        const data = await readFile(pathData);

        const indexData = data.findIndex( dataFound => dataFound.id === id );

        if(indexData === -1) throw new Error(`No pudimos encontrar la data`);

        const dataDelete = data[indexData]
        data.splice(indexData, 1)

        await createFile(data, pathData )

        return dataDelete
    } catch (error) {
        throw new JsonError("No pudimos actualizar la data", error);
    }
}

export const getDataById = async(id, pathData) => {
    try {
        const data = await readFile(pathData)
        const dataFound = data.find(dataFound => dataFound.id === id)

        return dataFound
    } catch (error) {
        throw new NotFoundError('No pudimos encontrar el dato por el id', error)
    }
}

export const getDataByName = async (nombre, pathData) => {
    try {
        const data = await readFile(pathData);

        const nombreNormalized = nombre.toLocaleLowerCase().replace(/\s+/g, '')

        const anime = data.filter(
            (anime) =>
                anime.nombre.toLocaleLowerCase().replace(/\s+/g, '') === nombreNormalized
        );
        return anime
    } catch (error) {
        throw new NotFoundError('No pudimos encontrar el dato por el nombre del anime', error)
    }
}

export const softDeleteData = async(id, pathData, Model) => {
    try {
        const data = await readFile(pathData);

        const indexData = data.findIndex(dataFound => dataFound.id === id)
        if (indexData === -1) throw new Error(`No pudimos encontrar la data`);

        const newInstance = Model.formatInstance(data[indexData]);
        
        newInstance.desactive();
        
        data[indexData] = newInstance.getAllProperties()

        await createFile(data, pathData)        
    } catch (error) {
        throw new JsonError('No pudimos actualizar la data', error);
    }
}

export const getAllActiveData = async(pathData) => {
    try {
        const data = await readFile(pathData);

        const activeData = data.filter(dataFound => dataFound.active);

        const dataToRender = activeData.map(({active, ...resto}) => resto)

        return dataToRender

    } catch (error) {
        throw new NotFoundError('No pudimos Encontrar la data', error);
    }
}

export const getActiveDatabyId = async(idSearch, pathData) => {
    try {
        const data = await readFile(pathData);
        const dataFound = data.find(
            (dataFound) => idSearch === dataFound.id && dataFound.active
        );

        if(!dataFound) throw new Error('No pudimos encontrar el dato');

        const { active, id, ...resto } = dataFound

        return resto
    } catch (error) {
        throw new NotFoundError('No pudimos Encontrar la data', error);
    }
}

