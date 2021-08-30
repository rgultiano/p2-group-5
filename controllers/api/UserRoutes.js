const router = require('express').Router();
const { User, UserAuth } = require('../../models');

router.post('/auth', async (req, res) => {

    // Find the user who matches the posted e-mail address
    console.log(User);
    const userData = await User.findOne({
        include: [{ 
            model: UserAuth,
            where: {auth_type: 'email'}
        }],
        where: { email: req.body.email } 
    });

    if (!userData || !userData.user_auths || userData.user_auths.length < 1) {
      res
        .status(401)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.user_auths[0].checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(401)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

});

module.exports = router;
