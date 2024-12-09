
import AppError from './AppError.js';

export class ValidationError extends AppError {
    constructor(message, details){
        super(message || 'Error de validacion', 400, details)
    }
}

export class NotFoundError extends AppError {
    constructor(message, details, entity) {
        super(message || `${entity} No encontrado`, 404, details)
    }
}

export class JsonError extends AppError {
    constructor(message, details) {
        super(message || 'Error en el JSON de datos', 500, details)
    }
}

export class InternalServerError extends AppError {
    constructor(message, details) {
        super(message || 'Error interno del Servidor', 500, details)
    }
}













