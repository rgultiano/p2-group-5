const router = require('express').Router();
const { User, UserAuth, Trip } = require('../../models');

router.post('/auth', async (req, res) => {
    try{
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
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json({ status: 'success', message: 'You are now logged in!' });
          });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/signup", async (req, res) => {
  try {
    //validate for the unique e-mail address
    console.log(User);
    const dbUserData = await User.findOne({
      where: { email: req.body.email },
    });

    if (dbUserData) {
      res
        .status(409)
        .json({ message: "Email already exists. Please try again" });
      return;
    }

    const newUser = await User.create({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
    });

    const newUserAuth = await UserAuth.create({
      password: req.body.password,
      user_id: newUser.id,
      auth_type: "email",
    });
    res.status(200).json({ id: newUser.id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});  

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// add a user trip
router.post('/:id/trips', apiUserAPIAuth, (req, res) =>{
  const {name, origin, departure_date, return_date, destinations} = req.body;
  const newTrip = await Trip.create({
    name,
    origin,
    departure_date,
    return_date
  });
  if(destinations){
    destinations.forEach((id, location_name, notes, order) => {
      if(id){
        //then it's an update
      } else {
        //create a new destination
        const newDestination = await Destination.create({
          id,
          location_name,
          notes,
          order
        });
      }
    });
  }
});

module.exports = router;
