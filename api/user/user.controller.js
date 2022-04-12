const crypto = require('crypto');

const {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
  getUserByEmail,
} = require('./user.service');

const { sendMail } = require('../../utils/emails');

async function handlerGetAllUsers(request, response) {
  const users = await getAllUsers();
  response.status(200).json(users);
}

async function handlerGetUserById(request, response) {
  const { id } = request.params;
  try {
    const user = await getUserById(id);
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: 'error' });
  }
}

async function handlerCreateUser(request, response) {
  const newUser = request.body;
  try {
    const hash = crypto.createHash('sha256')
      .update(newUser.email)
      .digest('hex');
    newUser.passwordResetToken = hash;
    newUser.passwordResetExpires = Date.now() + 3600000 * 24;
    const user = await createUser(newUser);
    const email = {
      from: '"Equipo Mental Health" <ingdiegocubidestrane@gmail.com>',
      to: user.email,
      subject: 'Activa tu cuenta en Mental Health',
      template_id: 'd-97faeebd7a954eb8a5b64db3f3d1decd',
      dynamic_template_data: {
        firstName: user.firstName,
        lastName: user.lastName,
        url: `https://mental--health--back.com/auth/local/verify/${hash}`,
      },
    };
    //await sendMail(email);
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json({ message: JSON.stringify(error)  });
  }
}

async function handlerUpdateUser(request, response) {
  const { id } = request.params;
  const { body } = request;
  try {
    const updatedUser = await updateUser(id, body);
    response.status(201).json(updatedUser);
  } catch (error) {
    response.status(500).json({ message: 'error' });
  }
}

async function handlerDeleteUser(request, response) {
  const { id } = request.params;
  const { email } = request.body;

  if (!id) {
    try {
      const { _id } = await getUserByEmail(email);
      const deletedUser = await deleteUser(_id);
      response.status(200).json(deletedUser);
    } catch (error) {
      response.status(400).json({ message: 'error' });
    }
  } else {
    try {
      const deletedUser = await deleteUser(id);
      response.status(200).json(deletedUser);
    } catch (error) {
      response.status(408).json({ message: 'error' });
    }
  }
}

module.exports = {
  handlerGetAllUsers,
  handlerGetUserById,
  handlerCreateUser,
  handlerUpdateUser,
  handlerDeleteUser,
};
