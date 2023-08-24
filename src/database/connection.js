import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@clusterauthenticacion.lobajpy.mongodb.net/`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export async function connect () {
  try {
    await client.connect()
    const database = client.db('db_incidencias_campus')
    return database
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error.message)
    throw error
  }
}

export async function closeConnection () {
  try {
    await client.close()
    console.log('Database connection closed')
  } catch (error) {
    console.error('Error closing the database connection')
    throw error
  }
}
