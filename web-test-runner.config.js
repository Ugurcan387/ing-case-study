export default {
    files: 'test/**/*.test.ts',
    nodeResolve: true,
    browsers: ['chrome'],
    testFramework: {
      config: {
        timeout: '6000'
      }
    },
    plugins: [require('@web/dev-server-esbuild')()],
};