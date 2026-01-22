import { GeneroService } from "../services/generoService.mjs"

export class GeneroController {
    constructor(){
        this.service = new GeneroService()
    }

    crear = async (req, res) => {
        try{
            const { nombre } = req.body
            const genero = await this.service.crearGenero(nombre)

            res.status(201).json({
                message: 'Genero creado exitosamente',
                data: genero.toJSON()
            })

        }catch(error){
            console.error("Error al crear un genero: ", error)
            res.status(400).json({error: 'Error al crear un genero'})
        }
    }

    listar = async (req, res) => {
        try{
            const generos = await this.service.mostrarGeneros()

            res.json({
                total: generos.length,
                generos: generos.map(g => g.toJSON()) 
            })
        }catch(error){
            console.error("Error al listar los generos: ", error)
            res.status(500).json({error: 'Error al obtener los generos'})
        }
    }

    obtener = async (req, res) => {
        try{
            const { id } = req.params
            const genero = await this.service.buscarGenero(id)

            res.json({
                genero: genero
            })
        }catch(error){
            console.error("Error al obtener el genero por id: ", error)
            res.status(500).json({error: 'Error al obtener el genero por id'})
        }
    }

    eliminar = async (req, res) => {
        try{
            const { id } = req.params
            const genero = await this.service.eliminarGenero(id)

            res.json({
                message: 'Genero eliminado exitosamente',
                data: genero.toJSON()
            })

        }catch(error){
            console.error("Error al eliminar un genero: ", error)
            res.status(400).json({error: 'Error al eliminar un genero'})
        }
    }
}