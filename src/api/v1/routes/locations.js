import express from 'express'
import { 
    fetchLocationsController,
    fetchSingleLocationController
} from '../controllers/locations'

const api = express.Router()

api.get('/locations', fetchLocationsController)

api.get('/locations/:location_id', fetchSingleLocationController)

export default api;