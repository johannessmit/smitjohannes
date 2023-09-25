import path from 'path';

export default {
    "graphql": {
        enabled: true,
        config: {
            playgroundAlways: false,
            generateArtifacts: true,
            artifacts: {
                schema: path.join(__dirname, "..", "..", "graphql/schema.graphql"),
                typegen: path.join(__dirname, "..", "..", "graphql/types.d.ts")
            }
        }
    },
    "apollo-sandbox": {
        enabled: process.env.NODE_ENV === "production" ? false : true
    }
}