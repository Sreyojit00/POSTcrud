const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "defh24lrz", // Replace with your Cloudinary cloud name
  api_key: "626314538953873",      // Replace with your Cloudinary API key
  api_secret: "kEojCMm45tbmGKwds9auYr9kvJM" , // Replace with your Cloudinary API secret
});

module.exports = cloudinary;
