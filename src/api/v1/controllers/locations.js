import Location from "../../../model/location";

export const fetchLocationsController = async (req, res) => {
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
  const locations = await Location.find(null, null, {
    skip: query.skip,
    limit: size
  });

  res.status(200).json({
    status: "success",
    locations,
    per_page: size,
    page: pageNo
  });
};

export const fetchSingleLocationController = async (req, res) => {
  const location = await Location.findOne({
    location_id: req.params.location_id
  });

  if (location) {
    res.status(200).json({
      status: "success",
      location
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Location was not found please, suggest to erick@werick.codes"
    });
  }
};
