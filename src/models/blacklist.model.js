const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: { type: String, required: [true, 'Token is required to be provided to be blacklisted'] }
},
    { timestamps: true }

);

const blacklistTokenModel = mongoose.model('BlacklistToken', blacklistTokenSchema);

module.exports = blacklistTokenModel;