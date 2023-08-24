import { connect, closeConnection } from '../database/connection.js'

export class Incidencias {
  // consulta de incidencias
  static async getIncidencias () {
    try {
      const db = await connect()
      const incidencias = db.collection('incidencias')
      const result = incidencias.aggregate([
        {
          $lookup: {
            from: 'incidencia_categoria',
            localField: 'categoria_id',
            foreignField: 'id',
            as: 'categoria'
          }
        },
        {
          $lookup: {
            from: 'incidencia_nivel',
            localField: 'nivel_id',
            foreignField: 'id',
            as: 'nivel'
          }
        },
        {
          $lookup: {
            from: 'lugares',
            localField: 'lugar_id',
            foreignField: 'id',
            as: 'lugar'
          }
        },
        {
          $lookup: {
            from: 'equipos',
            localField: 'equipo_id',
            foreignField: 'id',
            as: 'equipo'
          }
        },
        {
          $unwind: '$categoria'
        },
        {
          $unwind: '$nivel'
        },
        {
          $unwind: '$lugar'
        },
        {
          $unwind: '$equipo'
        },
        {
          $project: {
            nombre: 1,
            descripcion: 1,
            equipo: '$equipo.nombre',
            categoria: '$categoria.nombre',
            nivel: '$nivel.nombre',
            lugar: '$lugar.nombre'
          }
        }
      ]).toArray()
      return result
    } catch (error) {
      console.log('error en el modelo' + error.message)
      throw error
    }
  }

  // Consulta de insidencias por nivel (por ejemplo, 'critica'):
  static async getIncidenciasByNivel ({ nivel }) {
    try {
      const db = await connect()
      const incidencias = db.collection('incidencias')
      const result = incidencias.aggregate([
        {
          $lookup: {
            from: 'incidencia_categoria',
            localField: 'categoria_id',
            foreignField: 'id',
            as: 'categoria'
          }
        },
        {
          $lookup: {
            from: 'incidencia_nivel',
            localField: 'nivel_id',
            foreignField: 'id',
            as: 'nivel'
          }
        },
        {
          $lookup: {
            from: 'lugares',
            localField: 'lugar_id',
            foreignField: 'id',
            as: 'lugar'
          }
        },
        {
          $lookup: {
            from: 'equipos',
            localField: 'equipo_id',
            foreignField: 'id',
            as: 'equipo'
          }
        },
        {
          $unwind: '$categoria'
        },
        {
          $unwind: '$nivel'
        },
        {
          $unwind: '$lugar'
        },
        {
          $unwind: '$equipo'
        },
        {
          $match: { 'nivel.nombre': nivel }
        },
        {
          $project: {
            nombre: 1,
            descripcion: 1,
            equipo: '$equipo.nombre',
            categoria: '$categoria.nombre',
            nivel: '$nivel.nombre',
            lugar: '$lugar.nombre'
          }
        }
      ]).toArray()
      return result
    } catch (error) {
      console.log('error en el modelo' + error.message)
      throw error
    }
  }

  // Consulta de insidencias por lugar (por ejemplo, 'apolo'):
  static async getIncidenciasByLugar ({ lugar }) {
    try {
      const db = await connect()
      const incidencias = db.collection('incidencias')
      const result = incidencias.aggregate([
        {
          $lookup: {
            from: 'incidencia_categoria',
            localField: 'categoria_id',
            foreignField: 'id',
            as: 'categoria'
          }
        },
        {
          $lookup: {
            from: 'incidencia_nivel',
            localField: 'nivel_id',
            foreignField: 'id',
            as: 'nivel'
          }
        },
        {
          $lookup: {
            from: 'lugares',
            localField: 'lugar_id',
            foreignField: 'id',
            as: 'lugar'
          }
        },
        {
          $lookup: {
            from: 'equipos',
            localField: 'equipo_id',
            foreignField: 'id',
            as: 'equipo'
          }
        },
        {
          $unwind: '$categoria'
        },
        {
          $unwind: '$nivel'
        },
        {
          $unwind: '$lugar'
        },
        {
          $unwind: '$equipo'
        },
        {
          $match: { 'lugar.nombre': lugar }
        },
        {
          $project: {
            nombre: 1,
            descripcion: 1,
            equipo: '$equipo.nombre',
            categoria: '$categoria.nombre',
            nivel: '$nivel.nombre',
            lugar: '$lugar.nombre'
          }
        }
      ]).toArray()
      return result
    } catch (error) {
      console.log('error en el modelo' + error.message)
      throw error
    }
  }

  // Consulta de insidencias y usuarios
  static async getIncidenciasByUsuario () {
    try {
      const db = await connect()
      const incidenciasUsuarios = db.collection('historial_incidencias_usuarios')
      const result = incidenciasUsuarios.aggregate([
        {
          $lookup: {
            from: 'incidencias',
            localField: 'insidencia_id',
            foreignField: 'id',
            as: 'insidencia'
          }
        },
        {
          $lookup: {
            from: 'usuarios',
            localField: 'usuario_id',
            foreignField: 'id',
            as: 'usuario'
          }
        },
        {
          $unwind: '$insidencia'
        },
        {
          $unwind: '$usuario'
        },
        {
          $lookup: {
            from: 'incidencia_categoria',
            localField: 'insidencia.categoria_id',
            foreignField: 'id',
            as: 'categoria'
          }
        },
        {
          $lookup: {
            from: 'incidencia_nivel',
            localField: 'insidencia.nivel_id',
            foreignField: 'id',
            as: 'nivel'
          }
        },
        {
          $lookup: {
            from: 'lugares',
            localField: 'insidencia.lugar_id',
            foreignField: 'id',
            as: 'lugar'
          }
        },
        {
          $lookup: {
            from: 'equipos',
            localField: 'insidencia.equipo_id',
            foreignField: 'id',
            as: 'equipo'
          }
        },
        {
          $unwind: '$categoria'
        },
        {
          $unwind: '$nivel'
        },
        {
          $unwind: '$lugar'
        },
        {
          $unwind: '$equipo'
        },
        {
          $project: {
            usuario: '$usuario.nombre',
            incidencia: '$insidencia.nombre',
            descripcion: '$insidencia.descripcion',
            equipo: '$equipo.nombre',
            categoria: '$categoria.nombre',
            nivel: '$nivel.nombre',
            lugar: '$lugar.nombre'
          }
        }
      ]).toArray()
      return result
    } catch (error) {
      console.log('error en el modelo' + error.message)
      throw error
    }
  }

  // Consulta de insidencias y usuarios por nivel (por ejemplo, 'critica'):
  static async getIncidenciasByUsuarioAndNivel ({ nivel }) {
    try {
      const db = await connect()
      const incidenciasUsuarios = db.collection('historial_incidencias_usuarios')
      const result = incidenciasUsuarios.aggregate([
        {
          $lookup: {
            from: 'incidencias',
            localField: 'insidencia_id',
            foreignField: 'id',
            as: 'insidencia'
          }
        },
        {
          $lookup: {
            from: 'usuarios',
            localField: 'usuario_id',
            foreignField: 'id',
            as: 'usuario'
          }
        },
        {
          $unwind: '$insidencia'
        },
        {
          $unwind: '$usuario'
        },
        {
          $lookup: {
            from: 'incidencia_categoria',
            localField: 'insidencia.categoria_id',
            foreignField: 'id',
            as: 'categoria'
          }
        },
        {
          $lookup: {
            from: 'incidencia_nivel',
            localField: 'insidencia.nivel_id',
            foreignField: 'id',
            as: 'nivel'
          }
        },
        {
          $lookup: {
            from: 'lugares',
            localField: 'insidencia.lugar_id',
            foreignField: 'id',
            as: 'lugar'
          }
        },
        {
          $lookup: {
            from: 'equipos',
            localField: 'insidencia.equipo_id',
            foreignField: 'id',
            as: 'equipo'
          }
        },
        {
          $unwind: '$categoria'
        },
        {
          $unwind: '$nivel'
        },
        {
          $unwind: '$lugar'
        },
        {
          $unwind: '$equipo'
        },
        {
          $match: { 'nivel.nombre': nivel }
        },
        {
          $project: {
            trainer: '$usuario.nombre',
            nombre: '$insidencia.nombre',
            descripcion: '$insidencia.descripcion',
            equipo: '$equipo.nombre',
            categoria: '$categoria.nombre',
            nivel: '$nivel.nombre',
            lugar: '$lugar.nombre'
          }
        }
      ]).toArray()
      return result
    } catch (error) {
      console.log('error en el modelo' + error.message)
      throw error
    }
  }
}
