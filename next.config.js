/** @type {import('next').NextConfig} */
const webpack = require('webpack')
const { parsed: myEnv } = require('dotenv').config();
module.exports = {
  reactStrictMode: true,
  webpack:(config, {isServer})=> {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config
  }
}