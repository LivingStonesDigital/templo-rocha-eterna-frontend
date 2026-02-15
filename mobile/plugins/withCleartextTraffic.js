const { withInfoPlist, withAndroidManifest } = require("expo/config-plugins");

const withCleartextTraffic = (config) => {
  // iOS - Allow arbitrary loads (HTTP)
  config = withInfoPlist(config, (config) => {
    config.modResults.NSAppTransportSecurity = {
      NSAllowsArbitraryLoads: true,
    };
    return config;
  });

  // Android - Ensure cleartext traffic is allowed
  config = withAndroidManifest(config, (config) => {
    const mainApplication = config.modResults.manifest.application[0];
    mainApplication.$["android:usesCleartextTraffic"] = "true";
    return config;
  });

  return config;
};

module.exports = withCleartextTraffic;
