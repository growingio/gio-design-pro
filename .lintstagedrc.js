module.exports = {
  "**/*": "prettier --write --ignore-unknown",
  "*.less": "stylelint --syntax less --fix",
  "*.(j|t)s?(x)": "eslint --cache --fix",
};
