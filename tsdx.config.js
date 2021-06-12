const replace = require("@rollup/plugin-replace");

//refer to https://github.com/formium/tsdx/issues/981 for code
module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, opts) {
    config.plugins = config.plugins.map((p) =>
      p.name === "replace"
        ? replace({
            "process.env.NODE_ENV": JSON.stringify(opts.env),
            preventAssignment: true,
          })
        : p,
    );
    return config; // always return a config.
  },
};
