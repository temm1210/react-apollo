export default `
    type BoardList {
        cursor: Int!
        hasMore: Boolean!
        board: [Board!]!
    }
    type Board {
        id: Int!,
        username: String!,
        title:String!,
        content:String!,
        represent_img: String!,
        likes: Int!,
        views:Int!
        create_date:Date!
        update_date:Date!
    }

    input BoardInput {
        username: String!,
        title:String!,
        content:String!,
        represent_img: String!,
    }
`;
