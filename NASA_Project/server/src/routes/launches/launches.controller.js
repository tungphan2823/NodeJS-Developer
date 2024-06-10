const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");
function httpGetAllLaunches(req, res) {
  return res.status(200).json(Array.from(getAllLaunches()));
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({
      error: "mission, rocket, launchDate and destination are required",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "launchDate must be a valid date",
    });
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}
module.exports = { httpGetAllLaunches, httpAddNewLaunch };
