const { extend, format, generate, random } = require("json-schema-faker");
extend("faker", () => require("faker"));
format("guid", () => random.randexp("2[A-Z]{2}[0-9]{1,43}"));
format("inn", () => random.randexp("77[0-9]{8}"));
format("kpp", () => random.randexp("77[0-9]{7}"));

const schema = {
  type: "array",
  minItems: 50,
  items: {
    type: "object",
    description: "Организация",
    required: [
      "id",
      "createdAt",
      "name",
      "inn",
      "kpp",
      "guid",
      "url",
      "owner",
      "registerDate",
    ],
    properties: {
      id: {
        $ref: "#/definitions/positiveInt",
        description: "Идентификатор",
      },
      createdAt: {
        type: "date",
        description: "Дата создания записи",
        faker: "date.past",
      },
      name: {
        type: "string",
        description: "Наименование организации",
        faker: "company.companyName",
      },
      inn: {
        type: "string",
        description: "ИНН организации",
        format: "inn",
      },
      kpp: {
        type: "string",
        description: "КПП организации",
        format: "kpp",
      },
      guid: {
        type: "string",
        description: "GUID организации",
        format: "guid",
      },
      url: {
        type: "string",
        description: "URL сайта организации",
        faker: "internet.url",
      },
      owner: {
        type: "string",
        description: "Руководитель",
        faker: "name.findName",
      },
      registerDate: {
        type: "date",
        description: "Дата регистрации",
        faker: "date.past",
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

console.log("Generate fake organizations");
module.exports = generate(schema);
