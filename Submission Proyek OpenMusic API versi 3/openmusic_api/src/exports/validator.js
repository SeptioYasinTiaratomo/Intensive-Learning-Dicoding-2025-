const InvariantError = require('../exceptions/InvariantError');
const { ExportPlaylistsPayloadSchema } = require('../validators/exports/schema');

const ExportsValidator = {
  validateExportPlaylistPayload: (payload) => {
    const { error } = ExportPlaylistsPayloadSchema.validate(payload, { abortEarly: false });

    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = ExportsValidator;
