const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEverything(username) {
  const all = await prisma.User.findFirst({
    where: {
      username: username,
    },
  });
  console.log(all);
  return all;
}

async function createUser(username, email, password) {
  const user = await prisma.User.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });

  return user;
}

async function checksUser(id) {
  const rows = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  return rows;
}

module.exports = {
  getEverything,
  createUser,
  checksUser,
};
