module.exports = (req, res) => {
  req.session.destroy(function (error) {
    if (error) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json("user logged out");
    }
  });
};
