import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(
    //Api key do noy touch! Only change if trasfering hygraph model
    "https://eu-west-2.cdn.hygraph.com/content/clalhyk7r20kx01tc9qipb81z/master"
);

const POSTS = gql`
   query getPosts {
        posts (sort: "createdAt:desc", pagination: { limit: 100 }) {
            id
            title
            datePublished
            category
            slug
            content {
            html
            }
            author {
            name
            avatar {
                url
            }
            }
            coverPhoto {
            publishedAt
            createdBy {
                id
            }
            url
            }
        }
    }
`;
const CATEGORIES = gql`
    {
        layoutCategories {
            title
            posts {
                id
            }
        }
    }`;

let posts;
let layoutCategories;

let fetchData = async ()=>{
    console.log("Fetching")
    posts = (await graphcms.request(POSTS))["posts"];
    layoutCategories = (await graphcms.request(CATEGORIES))["layoutCategories"];
};

module.exports = {
    getPosts: async ()=>{
        if (posts == undefined) await fetchData()
        return posts;
    },
    getLayoutCategories: async ()=>{
        if (posts == undefined) await fetchData()
        return layoutCategories
    },

    getStaticProps: async ()=>{
        if (posts == undefined) await fetchData()

        return {
          props: {
            posts,
            layoutCategories,
          },
          revalidate: 60,
        };
    },
    fetchData: fetchData,
};
