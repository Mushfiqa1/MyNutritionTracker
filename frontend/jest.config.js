module.exports = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  // 👉 Ensure Jest uses mocks for axios
  transformIgnorePatterns: [
    "node_modules/(?!axios)"  
  ],
};
