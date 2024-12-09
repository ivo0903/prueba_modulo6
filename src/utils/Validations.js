import {ValidationError} from '../error/typesError.js'

export class Validate{

    static name(name, fieldName) {
        const nameRegex = /^[a-zA-ZáéíóúÁÉÓÍÚñÑüÜ0-9\s]{2,30}$/;
        if (!nameRegex.test(name)) {
            throw new ValidationError(`${fieldName} debe contener  entre 2 y 60 caracteres`,`Error al validar el regex ${nameRegex}`);
        }
        return name;
    }

    static gender(gender, fieldName) {
        const genderRegex = /^[a-zA-ZáéíóúÁÉÓÍÚñÑüÜ0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{2,60}$/;
        if (!genderRegex.test(gender)) {
            throw new ValidationError(`${fieldName} debe contener solo letras y tener entre 2 y 60 caracteres`);
        }
        return gender;
    }

    static year(year) {
        const currentYear = new Date().getFullYear(); 
        if (!/^\d{4}$/.test(year) || year < 1917 || year > currentYear) {
            throw new ValidationError(`El año debe ser un número de 4 dígitos entre 1917 y ${currentYear}`);
        }
        return year;
    }
    
    static author(author, fieldName) {
        const authorRegex = /^[a-zA-ZáéíóúÁÉÓÍÚñÑüÜ\s]{2,60}$/;
        if (!authorRegex.test(author)) {
            throw new ValidationError(`${fieldName} debe contener solo letras y tener entre 2 y 60 caracteres`);
        }
        return author;
    }
}