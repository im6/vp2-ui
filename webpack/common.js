module.exports = {
  entry: {
    bundle0: './src/colors/index',
    bundle1: './src/signin/index',
    bundle2: './src/newcolor/index',
    bundle3: './src/onecolor/index',
    bundle4: './src/profile/index',
    bundle5: './src/admin/index',
  },
  tsLoader: {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  },
  babelLoader: {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  cssLoader: {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
};
