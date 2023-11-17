// collegeController.js
import College from './schema.js';

//make filter condition dynamic using url

async function getFilterColleges(req, res) {
  try {
    let colleges = await College.find(req.query);
    console.log(req.query)
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve colleges' });
  }
}



export { getFilterColleges };
