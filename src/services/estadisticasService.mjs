import { EstadisticasRepository } from '../repositories/estadisticasRepository.mjs';

export class EstadisticasService{
    constructor(){
        this.repository = new EstadisticasRepository()
    }

    async obtenerPrestamosActivos(){
        return await this.repository.obtenerPrestamosActivos()
    }

    async obtenerLibrosConGeneros(){
        return await this.repository.obtenerLibrosConGeneros()
    }
}