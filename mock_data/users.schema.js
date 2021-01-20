const { generate, extend } = require("json-schema-faker");
extend("faker", () => require("faker"));

const schema = {
  type: "array",
  minItems: 100,
  items: {
    type: "object",
    description: "Пользователь",
    required: [
      "id",
      "createdAt",
      "firstName",
      "lastName",
      "email",
      "username",
      "avatar",
    ],
    properties: {
      id: {
        $ref: "#/definitions/positiveInt",
        description: "Идентификатор",
      },
      createdAt: {
        type: "date",
        description: "Дата создания",
        faker: "date.past",
      },
      firstName: {
        type: "string",
        description: "Имя",
        faker: "name.firstName",
      },
      lastName: {
        type: "string",
        description: "Фамилия",
        faker: "name.lastName",
      },
      age: {
        type: "integer",
        description: "Возраст",
        maximum: 70,
        minimum: 18,
      },
      email: {
        type: "string",
        description: "Адрес эл. почты",
        faker: "internet.email",
      },
      username: {
        type: "string",
        description: "Логин",
        faker: "internet.userName",
      },
      avatar: {
        type: "string",
        description: "Ссылка на аватар",
        faker: "internet.avatar",
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

console.log("Generate fake users");
module.exports = generate(schema);
