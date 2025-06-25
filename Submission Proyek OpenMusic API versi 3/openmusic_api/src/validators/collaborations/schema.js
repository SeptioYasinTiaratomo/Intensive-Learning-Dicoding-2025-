const Joi = require('joi');

const CollaborationPayloadSchema = Joi.object({
  playlistId: Joi.string().required().messages({
    'any.required': 'playlistId harus diisi',
    'string.base': 'playlistId harus berupa string',
  }),
  userId: Joi.string().required().messages({
    'any.required': 'userId harus diisi',
    'string.base': 'userId harus berupa string',
  }),
});

module.exports = { CollaborationPayloadSchema };
