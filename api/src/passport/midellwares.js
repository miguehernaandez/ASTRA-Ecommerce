function isAuthenticated(req, res, next) {
    if(req.isAuthenticated())
      return next();
    else
      return res.status(401).send();
  }

  function isAdmin(req, res, next) {
    if(req.user && req.user.rol === "admin") {
      return next();
    } else {
      return res.status(401).send();
    }
  }

  module.exports = {
    isAuthenticated,
    isAdmin,
}