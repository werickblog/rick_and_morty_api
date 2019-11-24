import Tool from '../../../model/object'

export const fetchObjectsController = async (req, res) => {
    const tools = await Tool.find()

    res.status(200).json({
        status: 'success',
        objects: tools
    })
}

export const fetchSingleObjectController = async (req, res) => {
    const tool = await Tool.findOne({ object_id: req.params.object_id })

    if (tool) {
        res.status(200).json({
            status: 'success',
            object: tool 
        })
    }
    else {
        res.status(404).json({
            status: 'fail', 
            message: 'Object was not found, suggest to erick@werick.codes'
        })
    }
}