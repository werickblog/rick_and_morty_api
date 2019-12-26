import Quotes from "../../../model/quote";

export const fetchQuotesController = async (req, res) => {
  let pageNo = parseFloat(req.query.pageNo);
  let size = parseInt(req.query.size);
  let query = {};
  if (pageNo < 0 || pageNo === 0 || !pageNo) {
    pageNo = 1;
  }
  query.skip = size * (pageNo - 1);
  const quotes = await Quotes.find(null, null, {
    skip: query.skip,
    limit: size
  }).populate("by", [
    "name",
    "aka",
    "species",
    "age",
    "status",
    "occupation",
    "image",
    "url",
    "dimension",
    "bio",
    "character_id",
    "gender"
  ]);

  res.status(200).json({
    status: "success",
    quotes,
    per_page: size,
    page: pageNo
  });
};

export const fetchSingleQuoteController = async (req, res) => {
  const quote = await Quotes.findOne({
    quote_id: req.params.quote_id
  }).populate("by", [
    "name",
    "aka",
    "species",
    "age",
    "status",
    "occupation",
    "image",
    "url",
    "dimension",
    "bio",
    "character_id",
    "gender"
  ]);

  if (quote) {
    res.status(200).json({
      status: "success",
      quote
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Quote was not found, suggest at erick@werick.codes"
    });
  }
};
