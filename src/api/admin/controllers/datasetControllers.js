import Character from "../../../model/character";
import Location from "../../../model/location";
import Obj from "../../../model/object";
import Quote from "../../../model/quote";
import config from "../../../config";

class Datasets {
  async generateId() {
    return Math.floor(Math.random() * 10000 + 1);
  }

  async addCharacter(data) {
    data.character_id = await this.generateId();
    const character = new Character(data);

    await character.save();

    return {
      message: "Character added successfully",
      character
    };
  }

  async addLocation(data) {
    data.location_id = await this.generateId();
    const location = new Location(data);

    await location.save();

    return {
      message: "Location added successfully",
      location
    };
  }

  async addObject(data) {
    data.object_id = await this.generateId();
    const object = new Obj(data);

    await object.save();

    return {
      message: "Object added successfully",
      object
    };
  }

  async addQuote(data) {
    data.quote_id = await this.generateId();
    const quote = new Quote(data);

    await quote.save();

    return {
      message: "Quote added successfully",
      quote
    };
  }
}

export default Datasets;
