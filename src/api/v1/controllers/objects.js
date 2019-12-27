import Tool from "../../../model/object";

export const fetchObjectsController = async (req, res) => {
  let pageNo = parseFloat(req.query.pageNo);
  let size = parseInt(req.query.size);
  let query = {};
  if (pageNo < 0 || pageNo === 0 || !pageNo) {
    pageNo = 1;
  }
  query.skip = size * (pageNo - 1);
  if (size > 20) {
    size = 20
  }
  const tools = await Tool.find(null, null, {
    skip: query.skip,
    limit: size
  })
    .populate("origin", ["name", "type", "dimension", "location_id", "image"])
    .populate("relationship", ["name", "aka", "character_id", "image"]);

  res.status(200).json({
    status: "success",
    objects: tools,
    per_page: size,
    page: pageNo
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
