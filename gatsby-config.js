module.exports = {
  siteMetadata: {
    title: "HCI",
  },
  plugins: [
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Human Computer Interaction`,
    //     short_name: `HCI`,
    //     start_url: `/`,
    //     background_color: `#f7f0eb`,
    //     theme_color: `#a2466c`,
    //     display: `standalone`,
    //   },
    // },
    // "gatsby-plugin-offline",
    // "gatsby-plugin-emotion",
    "gatsby-plugin-typescript",
    "gatsby-plugin-typescript-checker",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/style/typography",
      },
    },
  ],
}
