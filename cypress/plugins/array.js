let userArray = [];

const setUserArray = (array) => {
  userArray = array;
};

const getUserArray = () => userArray;

module.exports = { setUserArray, getUserArray };
