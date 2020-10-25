module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    layers: ["components", "utilities"],
    content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
