import createPosts from "../../controllers/startups/createPosts";

const startupsRoutes = [
  {
    method:"post",
    path:"/api/startups/create-posts",
    controller: createPosts
  },
];

export default startupsRoutes;