const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEverything(username) {
  const all = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  return all;
}

async function createUser(username, email, password) {
  const user = await prisma.user.create({
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

async function getFolder(name) {
  const rows = await prisma.folder.findMany({
    where: {
      username: name,
    },

    orderBy: {
      serialId: "desc",
    },
    select: {
      foldername: true,
    },
  });

  if (rows.length === 0) {
    return null;
  }

  return rows;
}

async function getLessFolder(name) {
  const rows = await prisma.folder.findMany({
    where: {
      username: name,
    },

    take: 5,

    orderBy: {
      serialId: "desc",
    },

    select: {
      foldername: true,
    },
  });

  if (rows === 0) {
    return null;
  }

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

async function getFolderByName(name) {
  const rows = await prisma.folder.findFirst({
    where: { foldername: name },
    include: { File: true },
  });

  return rows;
}

async function addFileByFolderName(folderName, userName, file) {
  await prisma.folder.update({
    where: {
      foldername_username: {
        username: userName,
        foldername: folderName,
      },
    },
    data: {
      files: {
        push: [file],
      },
    },
  });
}

async function deleteAFolder(username, foldernames) {
  await prisma.folder.deleteMany({
    where: {
      username: username,
      foldername: { in: foldernames },
    },
  });
}

async function deleteAFile(username, foldername, checkedFiles) {
  const folder = await prisma.folder.findFirst({
    where: {
      username: username,
      foldername: foldername,
    },
  });

  const updatedFiles = folder.files.filter(
    (file) => !checkedFiles.includes(file)
  );

  await prisma.folder.update({
    where: {
      foldername_username: {
        foldername: foldername,
        username: username,
      },
    },

    data: {
      files: updatedFiles,
    },
  });
}

async function addFiles(username, foldername, file) {
  const folder = await prisma.folder.findFirst({
    where: {
      username: username,
      foldername: foldername,
    },

    include: {
      File: true,
    },
  });

  if (!folder) throw new Error("folder not found");

  await prisma.file.create({
    data: {
      ...file,
      folderId: folder.id,
    },
  });
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
  getFolderByName,
  addFileByFolderName,
  deleteAFolder,
  deleteAFile,
  addFiles,
};
