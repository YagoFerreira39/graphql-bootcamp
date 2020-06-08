import getUserId from "../utils/getUserId";

const User = {
  email: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false);
      let email;

      userId && userId === parent.id ? (email = parent.email) : (email = null);

      return email;
    },
  },
  posts: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { prisma }, info) {
      return prisma.query.posts({
        where: {
          author: {
            id: parent.id,
          },
          published: true,
        },
      });
    },
  },
};
export { User as default };
