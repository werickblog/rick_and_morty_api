import Location from '../../../model/location'

export const fetchLocationsController = async (req, res) => {
    const locations = await Location.find()

    res.status(200).json({
        status: 'success',
        locations
    })
}

export const fetchSingleLocationController = async (req, res) => {
    const location = await Location.findOne({ location_id: req.params.location_id })

    if (location) {
        res.status(200).json({
            status: 'success',
            location
        })
    }
    else {
        res.status(404).json({
            status: 'fail',
            message: 'Location was not found please, suggest to erick@werick.codes'
        })
    }
}