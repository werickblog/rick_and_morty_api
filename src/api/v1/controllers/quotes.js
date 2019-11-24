import Quotes from "../../../model/quote";

export const fetchQuotesController = async (req, res) => {
  const quotes = await Quotes.find();

  res.status(200).json({
    status: "success",
    quotes
  });
};

export const fetchSingleQuoteController = async (req, res) => {
  const quote = await Quotes.findOne({ quote_id: req.params.quote_id });

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
