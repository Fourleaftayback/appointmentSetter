const crypto = require("crypto");
const algorithm = process.env.algoType;
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

module.exports = function encrpyt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};
