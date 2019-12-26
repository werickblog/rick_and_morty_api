import Tool from "../../../model/object";

export const fetchObjectsController = async (req, res) => {
  const tools = await Tool.find()
    .populate("origin", ["name", "type", "dimension", "location_id", "image"])
    .populate("relationship", ["name", "aka", "character_id", "image"]);

  res.status(200).json({
    status: "success",
    objects: tools
  });
};

export const fetchSingleObjectController = async (req, res) => {
  const tool = await Tool.findOne({ object_id: req.params.object_id })
    .populate("origin", ["name", "type", "dimension", "location_id", "image"])
    .populate("relationship", ["name", "aka", "character_id", "image"]);

  if (tool) {
    res.status(200).json({
      status: "success",
      object: tool
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Object was not found, suggest to erick@werick.codes"
    });
  }
};
