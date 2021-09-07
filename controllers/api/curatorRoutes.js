const router = require('express').Router();
const { Quote, User, UserAuth, Trip, Destination} = require('../../models');
const { userAPIAuth, curatorAPIAuth } = require('../../utils/auth');
const { ddmmyyyyToDate } = require('../../utils/helpers');
const sequelize = require('../../config/connection');

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
            
            if(userData.role == 'C001'){
              req.session.curator_user_id = userData.id;
              req.session.curator_logged_in = true;
              res.json({ status: 'success', message: 'You are now logged in!' })
            } else {    
              res.status(403).json({message: 'User login successful, but not signed up as a Curator.'})
            };
          });
    } catch (err) {
        res.status(400).json(err);
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

router.get('/trips/:trip_id', curatorAPIAuth, async (req, res) =>{
  try{
    // find a single trip by its `id` and user
    // be sure to include its associated Category and Tag data
    const trip_id = req.params.trip_id;
    const user_id = req.params.id;

    const tripData = await Trip.findByPk(trip_id, {
      include: [{ model: Destination}],
      where: {
        status: 'awaiting_curation',
        deleted_dt: null,
      },
      order:[['destinations', 'order', 'ASC']],
    });

    if(!tripData){
      res.status(404).json({message: `No Trip found with an id of '${req.params.trip_id}'.`});
    } else {
      res.status(200).json(tripData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/trips/:trip_id/quote', curatorAPIAuth, async (req, res) =>{
  try{
    const {amount, valid_until, booking_details} = req.body;

    const newQuote = await Quote.create({
      amount,
      valid_until: ddmmyyyyToDate(valid_until),
      booking_details,
      trip_id: req.params.trip_id,
      curator_id: req.session.user_id
    });

    res.status(200).json({ id: newQuote.id });

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
