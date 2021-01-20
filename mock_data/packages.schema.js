const { extend, format, generate, random } = require("json-schema-faker");
extend("faker", () => require("faker"));
format("guid", () => random.randexp("2[A-Z]{2}[0-9]{1,43}"));
format("inn", () => random.randexp("77[0-9]{8}"));
format("kpp", () => random.randexp("77[0-9]{7}"));

const schema = {
  type: "array",
  minItems: 100,
  items: {
    type: "object",
    description: "Транспортный пакет",
    required: ["id", "createdAt", "uuid", "endpoints", "receiptTo"],
    oneOf: [
      { required: ["invitations"] },
      { required: ["logicalMessages"] },
      { required: ["receipts"] },
    ],
    properties: {
      id: {
        $ref: "#/definitions/positiveInt",
        description: "Идентификатор пакета",
      },
      createdAt: {
        type: "date",
        description: "Дата создания",
        faker: "date.past",
      },
      uuid: {
        type: "string",
        description: "UUID пакета",
        faker: "random.uuid",
      },
      endpoints: {
        type: "object",
        description: "Пара конечных точек транспортного пакета",
        required: ["senderId"],
        properties: {
          senderId: {
            type: "string",
            description: "Идентификатор конечной точки отправителя",
            faker: "random.uuid",
          },
          recipientId: {
            type: "string",
            description: "Идентификатор конечной точки получателя",
            faker: "random.uuid",
          },
        },
      },
      receiptTo: {
        type: "string",
        description: "Адрес для отправки ответа",
        faker: "internet.url",
      },
      invitations: {
        type: "array",
        description: "Приглашения в роуминг",
        uniqueItems: true,
        minItems: 1,
        items: {
          type: "object",
          description: "Приглашение",
          required: ["sender"],
          properties: {
            responseType: {
              enum: ["accept", "reject"],
              description: "Тип ответа",
            },
            requestId: {
              type: "string",
              description: "Идентификатор приглашения-запроса",
              faker: "random.uuid",
            },
            sender: {
              type: "object",
              description: "Отправитель",
              required: ["guid", "name"],
              properties: {
                guid: {
                  type: "string",
                  description: "GUID участника",
                  format: "guid",
                },
                name: {
                  type: "string",
                  description: "Наименование участника",
                  faker: "company.companyName",
                },
                inn: {
                  type: "string",
                  description: "ИНН участника",
                  format: "inn",
                },
                kpp: {
                  type: "string",
                  description: "КПП участника",
                  format: "kpp",
                },
              },
            },
            recipient: {
              type: "object",
              description: "Получатель",
              required: ["inn", "kpp"],
              properties: {
                guid: {
                  type: "string",
                  description: "GUID участника",
                  format: "guid",
                },
                name: {
                  type: "string",
                  description: "Наименование участника",
                  faker: "company.companyName",
                },
                inn: {
                  type: "string",
                  description: "ИНН участника",
                  format: "inn",
                },
                kpp: {
                  type: "string",
                  description: "КПП участника",
                  format: "kpp",
                },
              },
            },
            message: {
              type: "string",
              description: "Сообщение",
              faker: "lorem.paragraph",
            },
          },
          dependencies: {
            responseType: ["requestId"],
            recipient: ["sender.inn", "sender.kpp"],
          },
        },
      },
      logicalMessages: {
        type: "array",
        description: "Логические сообщения",
        uniqueItems: true,
        minItems: 1,
        items: {
          type: "object",
          description: "Логическое сообщение",
          required: ["uuid", "sentAt"],
          oneOf: [{ required: ["documents"] }, { required: ["signatures"] }],
          properties: {
            uuid: {
              type: "string",
              description: "UUID логического сообщения",
              faker: "random.uuid",
            },
            sentAt: {
              type: "date",
              description: "Дата отправки логического сообщения",
              faker: "date.recent",
            },
            senderGuid: {
              type: "string",
              description: "GUID отправителя",
              format: "guid",
            },
            recipientGuid: {
              type: "string",
              description: "GUID получателя",
              format: "guid",
            },
            signatures: {
              type: "array",
              description: "Подписи к документам",
              uniqueItems: true,
              items: {
                type: "object",
                description: "Подпись",
                required: ["uuid", "signerGuid", "documentUuid"],
                properties: {
                  uuid: {
                    type: "string",
                    description: "UUID подписи",
                    faker: "random.uuid",
                  },
                  signerGuid: {
                    type: "string",
                    description: "GUID подписанта",
                    format: "guid",
                  },
                  documentUuid: {
                    type: "string",
                    description: "UUID документа",
                    faker: "random.uuid",
                  },
                },
              },
            },
            documents: {
              type: "array",
              uniqueItems: true,
              items: {
                type: "object",
                description: "Документы",
                required: ["uuid", "type", "date", "filename", "signatures"],
                properties: {
                  uuid: {
                    type: "string",
                    description: "UUID документа",
                    faker: "random.uuid",
                  },
                  docId: {
                    type: "string",
                    description: "Идентификатор документа в СЭДО",
                    faker: {
                      "random.number": {
                        min: 1,
                        max: 10000000,
                      },
                    },
                  },
                  innerId: {
                    type: "string",
                    description: "Внутренний идентификатор документа",
                    faker: {
                      "random.number": {
                        min: 1,
                        max: 100000,
                      },
                    },
                  },
                  dealId: {
                    type: "string",
                    description: "Идентификатор сделки",
                    faker: {
                      "random.number": {
                        min: 1,
                        max: 1000000,
                      },
                    },
                  },
                  toDocuments: {
                    type: "array",
                    description: "UUID документов для связи",
                    uniqueItems: true,
                    items: {
                      type: "string",
                      description: "UUID документа",
                      faker: "random.uuid",
                    },
                  },
                  type: {
                    type: "string",
                    description: "Тип документа",
                  },
                  needSign: {
                    type: "boolean",
                    description: "Необходимость подписи",
                  },
                  filename: {
                    type: "string",
                    description: "Имя файла документа",
                  },
                  number: {
                    type: "string",
                    description: "Номер документа",
                    faker: {
                      "random.number": {
                        min: 1,
                        max: 10000000,
                      },
                    },
                  },
                  date: {
                    type: "date",
                    description: "Дата документа",
                    faker: "date.recent",
                  },
                  sum: {
                    type: "decimal",
                    description: "Сумма",
                    faker: {
                      "random.float": {
                        min: 1000,
                        max: 9000000,
                      },
                    },
                  },
                  taxSum: {
                    type: "decimal",
                    description: "Сумма НДС",
                    faker: {
                      "random.float": {
                        min: 100,
                        max: 900000,
                      },
                    },
                  },
                  additionalInfo: {
                    type: "array",
                    description: "Дополнительные данные",
                    uniqueItems: true,
                    items: {
                      type: "object",
                      description: "Дополнительный параметр",
                      required: ["key", "value"],
                      properties: {
                        key: {
                          type: "string",
                          description: "Название",
                          faker: "lorem.word",
                        },
                        value: {
                          type: "string",
                          description: "Значение",
                          faker: "lorem.word",
                        },
                      },
                    },
                  },
                  signatures: {
                    type: "array",
                    description: "Подписи к документам",
                    uniqueItems: true,
                    items: {
                      type: "object",
                      description: "Подпись",
                      required: ["uuid", "signerGuid"],
                      properties: {
                        uuid: {
                          type: "string",
                          description: "UUID подписи",
                          faker: "random.uuid",
                        },
                        signerGuid: {
                          type: "string",
                          description: "GUID подписанта",
                          format: "guid",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      receipts: {
        type: "object",
        description: "Квитанции",
        required: ["sentAt"],
        properties: {
          sentAt: {
            type: "date",
            description: "Дата отправки квитанций",
            faker: "date.recent",
          },
          successes: {
            type: "array",
            description: "Список успешно обработанных ЛС",
            uniqueItems: true,
            items: {
              type: "string",
              description: "UUID ЛС",
              faker: "random.uuid",
            },
          },
          errors: {
            type: "array",
            description: "Список ошибок",
            uniqueItems: true,
            items: {
              type: "object",
              description: "Ошибка",
              required: ["lmUuid", "code"],
              properties: {
                type: {
                  type: "string",
                  description: "Тип ошибки",
                  faker: "lorem.word",
                },
                lmUuid: {
                  type: "string",
                  description: "UUID ЛС",
                  faker: "random.uuid",
                },
                message: {
                  type: "string",
                  description: "Описание ошибки",
                  faker: "lorem.sentence",
                },
                documentUuids: {
                  type: "array",
                  description: "Список UUID документов",
                  uniqueItems: true,
                  items: {
                    type: "string",
                    description: "UUID документа",
                    faker: "random.uuid",
                  },
                },
              },
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

console.log("Generate fake packages");
module.exports = generate(schema);
