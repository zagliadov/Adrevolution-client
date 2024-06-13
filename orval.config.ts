module.exports = {
  main: {
    input: "./app/lib/api/schema.yaml",
    output: {
      target: "./app/lib/api/generated.ts",
      prettier: true,
      override: {
        mutator: {
          path: "./app/lib/api/api-instance.ts",
          name: "createInstance",
        },
      },
    },
  },
};
