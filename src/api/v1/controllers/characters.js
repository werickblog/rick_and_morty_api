import Character from "../../../model/character";

export const fetchCharacters = async (req, res) => {
  const characters = await Character.find()
    .populate("origin", [
      "name",
      "type",
      "bio",
      "dimension",
      "url",
      "location_id",
      "image"
    ])
    .populate("home_planet", [
      "name",
      "type",
      "bio",
      "dimension",
      "url",
      "location_id",
      "image"
    ]);

  res.status(200).json({
    status: "success",
    characters
  });
};

export const fetchSingleCharacterController = async (req, res) => {
  const character = await Character.findOne({
    character_id: req.params.character_id
  })
    .populate("origin", [
      "name",
      "type",
      "bio",
      "dimension",
      "url",
      "location_id",
      "image"
    ])
    .populate("home_planet", [
      "name",
      "type",
      "bio",
      "dimension",
      "url",
      "location_id",
      "image"
    ]);

  if (character) {
    res.status(200).json({
      status: "success",
      character
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Character was not found please, suggest to erick@werick.codes"
    });
  }
};
