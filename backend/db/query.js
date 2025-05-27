const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEverything(username) {
  const all = await prisma.User.findMany({
    where: {
      username: username,
    },
  });
  console.log(all);
  return all;
}

async function createUser(username, email, password) {
  await prisma.User.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
}

module.exports = {
  getEverything,
  createUser,
};
