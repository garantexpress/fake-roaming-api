const { extend, format, generate, random } = require("json-schema-faker");
extend("faker", () => require("faker"));
format("guid", () => random.randexp("2[A-Z]{2}[0-9]{1,43}"));

const schema = {
  type: "array",
  minItems: 50,
  items: {
    type: "object",
    required: ["id", "createdAt", "members"],
    description: "Маршрут",
    properties: {
      id: {
        $ref: "#/definitions/positiveInt",
        description: "Идентификатор маршрута",
      },
      createdAt: {
        type: "date",
        description: "Дата создания",
        faker: "date.past",
      },
      status: {
        enum: ["active", "blocked"],
        description: "Состояние маршрута",
      },
      members: {
        type: "array",
        description: "Пара участников маршрута",
        minItems: 2,
        maxItems: 2,
        uniqueItems: true,
        items: {
          type: "object",
          required: ["guid", "endpointId"],
          description: "Участник маршрута",
          properties: {
            guid: {
              type: "string",
              description: "GUID участника маршрута",
              format: "guid",
            },
            depId: {
              type: "string",
              description: "Идентификатор подразделения",
              faker: {
                "random.number": {
                  min: 1,
                  max: 1000000,
                },
              },
            },
            endpointId: {
              type: "string",
              description: "Идентификатор конечной точки",
              faker: "random.uuid",
            },
          },
        },
      },
    },
  },
  definitions: {
    positiveInt: {
      type: "integer",
      minimum: 0,
      exclusiveMinimum: true,
    },
  },
};

console.log("Generate fake routes");
module.exports = generate(schema);
