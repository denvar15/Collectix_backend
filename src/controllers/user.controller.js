const httpStatus = require('http-status');
const formidable = require('formidable');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    // res.writeHead(200, { 'content-type': 'application/json' });
    const user = userService
      .createUser({
        name: fields.name,
        email: `${fields.email}@mail.ru`,
        address: fields.address,
        message: fields.message,
        user_avatar: fields.user_avatar,
      })
      .then((user) => {
        // res.end(JSON.stringify({ fields, files }, null, 2));
        res.status(httpStatus.CREATED).send(user);
      });
    // res.status(httpStatus.CREATED).send(user);
  });
});

const addNFT = catchAsync(async (req, res) => {
  console.log(req)
  const result = await userService.getUserByAddress(req.body.creators[0].account);
  result.NFT.push(req.body);
  const user = await userService.updateUserById(result.id, { NFT: result.NFT });
  res.send(user);
});

const getAllUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['address']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUsers = catchAsync(async (req, res) => {
  // eslint-disable-next-line no-console
  console.log('AAAAAAAA', req.params.userId);
  const filter = pick(req.query, ['address']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.getUserByAddress(req.params.userId);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addNFT,
  getAllUsers
};
