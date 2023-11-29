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

async function collgesForAdminPanel(req, res) {
  try {
    let collegesForAdmin = await College.find(req.query,{"_id":1,"college_name":1,"district_name":1});
    console.log(collegesForAdmin)
    res.json(collegesForAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve colleges' });
  }
}

async function deleteCollege(req, res) {
  const id = req.params._id;
  try {
    await College.deleteOne({"_id": id});
    res.status(200).send('College deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting college');
  }
}


export { getFilterColleges, collgesForAdminPanel ,deleteCollege};
