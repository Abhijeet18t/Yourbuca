module.exports = (req, res, next) => {
  if (req.session.loggedIn && req.session.cookie) {
    next();
  } else {
    return res.status(403).json("User not logged in");
  }
};
