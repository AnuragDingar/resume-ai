const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: { type: String, required: [true, 'Token is required to be provided to be blacklisted'] },
    // Set the token to expire after 24 hours (86400 seconds)
    createdAt: { type: Date, default: Date.now, expires: 86400 }
},
    { timestamps: true }
);

const blacklistTokenModel = mongoose.model('BlacklistToken', blacklistTokenSchema);

module.exports = blacklistTokenModel;

/*

  Every logout adds a document. Nothing ever removes them. After months of use, the collection has millions of stale tokens for JWTs that
  expired long ago — wasting storage and slowing down the findOne({ token }) lookup on every protected request.

   createdAt: { type: Date, default: Date.now, expires: 86400 }

  expires: 86400 tells MongoDB to create a TTL (Time To Live) index on createdAt. MongoDB runs a background job that automatically deletes
  any document where createdAt is older than 86400 seconds (24 hours).

  This matches the JWT expiresIn: '1d' exactly — once the token itself is expired, the JWT is already invalid on its own, so there's no
  reason to keep the blacklist entry anymore. MongoDB auto-cleans it for you.

*/