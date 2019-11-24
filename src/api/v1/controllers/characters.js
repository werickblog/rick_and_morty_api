import Character from "../../../model/character";

export const fetchCharacters = async (req, res) => {
  const characters = await Character.find();

  res.status(200).json({
    status: "success",
    characters
  });
};

export const fetchSingleCharacterController = async (req, res) => {
  const character = await Character.findOne({ id: req.params.character_id });

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
