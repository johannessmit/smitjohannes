export default {
    "graphql": {
        enabled: true,
        config: {
            playgroundAlways: false
        }
    },
    "apollo-sandbox": {
        enabled: process.env.NODE_ENV === "production" ? false : true
    }
}