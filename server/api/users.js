const router = require("express").Router();
const { User } = require("../db/models");
const { requireLoggedIn, requireValidUser } = require("./middleware.js");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const whereClause = {};
    if (req.query) {
      if (req.query.type) {
        whereClause.userType = parseInt(req.query.type);
      }
      const instructors = await User.findAll({
        where: whereClause,
        attributes: ["id", "displayName"],
      });
      res.json(instructors);
    } else {
      const users = await User.findAll({
        attributes: ["id", "email", "displayName", "userType", "bio"],
      });
      res.json(users);
    }
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:id",
  requireLoggedIn,
  requireValidUser,
  async (req, res, next) => {
    try {
      /* if (req.user.id !== parseInt(req.params.id)) res.sendStatus(401);
       * else { */
      const user = await User.findByPk(req.params.id);
      res.json(user);
      //      }
    } catch (err) {
      next(err);
    }
  }
);
