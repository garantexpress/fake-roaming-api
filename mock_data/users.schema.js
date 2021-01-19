const { generate, extend } = require("json-schema-faker");
extend("faker", () => require("faker"));

const schema = {
  type: "array",
  minItems: 20,
  items: {
    type: "object",
    required: [
      "id",
      "first_name",
      "last_name",
      "age",
      "email",
      "username",
      "avatar",
    ],
    properties: {
      id: {
        $ref: "#/definitions/positiveInt",
      },
      first_name: {
        type: "string",
        faker: "name.firstName",
      },
      last_name: {
        type: "string",
        faker: "name.lastName",
      },
      age: {
        type: "integer",
        maximum: 70,
        minimum: 18,
      },
      email: {
        type: "string",
        faker: "internet.email",
      },
      username: {
        type: "string",
        faker: "internet.userName",
      },
      avatar: {
        type: "string",
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
const users = generate(schema);
module.exports = users;
