import { GeneroService } from "../services/generoService.mjs"

export class GeneroController {
    constructor(){
        this.service = new GeneroService()
    }

    crear = async (req, res) => {
        try{
            const nombre = req.body
            const genero = this.service.crear(nombre)

            res.status(201).json({
                message: 'Genero creado exitosamente',
                id : genero.id,
                nombre : genero.nombre
            })

        }catch(error){
            console.error("Error al crear un genero: ", error)
            res.status(400).json({error : 'Error al crear un genero'})
        }
    }

    listar = async (req, res) => {
        try{
            const generos = await this.service.listar()

            res.json({
                total : generos.length,
                generos : generos.map(g => g.toJSON()) 
            })
        }catch(error){
            console.error("Error al listar los generos: ", error)
            res.status(500).json({error : 'Error al obtener los generos'})
        }
    }

    obtener = async (req, res) => {
        try{
            const id = req.body
            const genero = await this.service.obtener(id)

            res.json({
                genero : genero 
            })
        }catch(error){
            console.error("Error al obtener el genero por id: ", error)
            res.status(500).json({error : 'Error al obtener el genero por id'})
        }
    }

    eliminar = async (req, res) => {
        try{

        }catch(error){

        }
    }
}