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

  async updateCharacter(character_id, data) {
    const character = await Character.findOne({ character_id });

    if (character) {
      Object.assign(character, {
        ...data
      });

      await character.save();

      return {
        message: "Character updated successfully",
        character
      };
    } else {
      throw {
        status: 404,
        message: "Character does not exist"
      };
    }
  }

  async deleteCharacter(character_id) {
    const character = await Character.findOne({ character_id });

    if (character) {
      character.remove();

      return {
        message: "Character deleted",
        character
      };
    } else {
      throw {
        status: 404,
        message: "Character was not found"
      };
    }
  }

  async fetchCharacters(_query) {
    let pageNo = parseFloat(_query.pageNo);
    let size = parseInt(_query.size);
    let query = {};
    if (pageNo < 0 || pageNo === 0 || !pageNo) {
      pageNo = 1;
    }
    query.skip = size * (pageNo - 1);
    if (size > 20) {
      size = 20
    }
    const characters = await Character.find(null, null, {
      skip: query.skip,
      limit: size
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

    return {
      characters,
      per_page: size,
      page: pageNo
    };
  }

  async fetchSingleCharacter(character_id) {
    const character = await Character.findOne({ character_id });

    if (character) {
      return {
        character
      };
    } else {
      throw {
        status: 404,
        message: "Character not found"
      };
    }
  }

  async fetchLocations(_query) {
    let pageNo = parseFloat(_query.pageNo);
    let size = parseInt(_query.size);
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

    return {
      locations,
      per_page: size,
      page: pageNo
    };
  }

  async fetchSingleLocation(location_id) {
    const location = await Location.findOne({ location_id });

    if (location) {
      return {
        location
      };
    } else {
      throw {
        status: 404,
        message: "Location was not found"
      };
    }
  }

  async fetchObjects(_query) {
    let pageNo = parseFloat(_query.pageNo);
    let size = parseInt(_query.size);
    let query = {};
    if (pageNo < 0 || pageNo === 0 || !pageNo) {
      pageNo = 1;
    }
    query.skip = size * (pageNo - 1);
    if (size > 20) {
      size = 20
    }
    const objects = await Obj.find(null, null, {
      skip: query.skip,
      limit: size
    })
      .populate("origin", ["name", "type", "dimension", "location_id", "image"])
      .populate("relationship", ["name", "aka", "character_id", "image"]);

    return {
      objects,
      per_page: size,
      page: pageNo
    };
  }

  async fetchSingleObject(object_id) {
    const object = await Obj.findOne({ object_id })
      .populate("origin", ["name", "type", "dimension", "location_id", "image"])
      .populate("relationship", ["name", "aka", "character_id", "image"]);

    if (object) {
      return {
        object
      };
    } else {
      throw {
        status: 404,
        message: "Object not found"
      };
    }
  }

  async fetchQuotes(_query) {
    let pageNo = parseFloat(_query.pageNo);
    let size = parseInt(_query.size);
    let query = {};
    if (pageNo < 0 || pageNo === 0 || !pageNo) {
      pageNo = 1;
    }
    query.skip = size * (pageNo - 1);
    if (size > 20) {
      size = 20
    }
    const quotes = await Quote.find(null, null, {
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

    return {
      quotes,
      per_page: size,
      page: pageNo
    };
  }

  async fetchSingleQuote(quote_id) {
    const quote = await Quote.findOne({ quote_id }).populate("by", [
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
      return {
        quote
      };
    } else {
      throw {
        status: 404,
        message: "Quote was not found"
      };
    }
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

  async updateLocation(location_id, data) {
    const location = await Location.findOne({ location_id });

    if (location) {
      Object.assign(location, {
        ...data
      });

      await location.save();

      return {
        message: "Location has been updated",
        location
      };
    } else {
      throw {
        status: 404,
        message: "Location was not found"
      };
    }
  }

  async deleteLocation(location_id) {
    const location = await Location.findOne({ location_id });

    if (location) {
      location.remove();

      return {
        message: "Location has been removed",
        location
      };
    } else {
      throw {
        status: 404,
        message: "Location was not found"
      };
    }
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

  async updateObject(object_id, data) {
    const object = await Object.findOne({ object_id });

    if (object) {
      Object.assign(object, {
        ...data
      });

      await object.save();

      return {
        message: "Object has been updated",
        object
      };
    } else {
      throw {
        status: 404,
        message: "Object was not found"
      };
    }
  }

  async deleteObject(object_id) {
    const object = await Object.findOne({ object_id });

    if (object) {
      object.remove();

      return {
        message: "Object has been removed",
        object
      };
    } else {
      throw {
        status: 404,
        message: "Object was not found"
      };
    }
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

  async updateQuote(quote_id, data) {
    const quote = await Quote.findOne({ quote_id });

    if (quote) {
      Object.assign(quote, {
        ...data
      });

      await quote.save();

      return {
        message: "Quote update successfully",
        quote
      };
    } else {
      throw {
        status: 404,
        message: "Quote was not found"
      };
    }
  }

  async deleteQuote(quote_id) {
    const quote = await Quote.findOne({ quote_id });

    if (quote) {
      quote.remove();

      return {
        message: "Quote has been removed",
        quote
      };
    } else {
      throw {
        status: 404,
        message: "Quote was not found"
      };
    }
  }
}

export default Datasets;
