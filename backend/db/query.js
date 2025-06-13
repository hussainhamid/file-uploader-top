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

async function checksUserByUsername(username) {
  const rows = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  return rows;
}

async function addFolder(username, foldername, files) {
  await prisma.folder.create({
    data: {
      username: username,
      foldername: foldername,
      files: files,
    },
  });
}

async function getFolder() {
  const rows = await prisma.folder.findMany({
    orderBy: {
      serialId: "desc",
    },
    select: {
      foldername: true,
    },
  });

  return rows;
}

async function getLessFolder() {
  const rows = await prisma.folder.findMany({
    take: 5,

    orderBy: {
      serialId: "desc",
    },

    select: {
      foldername: true,
    },
  });

  return rows;
}

async function getFolderByusername(name) {
  const rows = await prisma.folder.findMany({
    where: {
      username: name,
    },
  });

  return rows;
}

module.exports = {
  getEverything,
  createUser,
  checksUser,
  checksUserByUsername,
  addFolder,
  getFolder,
  getLessFolder,
  getFolderByusername,
};
