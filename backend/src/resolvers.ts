import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    todo: () => {
      return prisma.todo.findOne({ where: { id: "1" } });
    }
  },
  Mutation: {
    todo: (_: any, { input: { content } }: any) => {
      console.log("im here");
      return prisma.todo.create({ data: { content, id: "1", done: false } });
    }
  }
};

export { resolvers };
