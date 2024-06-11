const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWidthId,
  abortLaunchById
} = require("../../models/launches.model");
function httpGetAllLaunches(req, res) {
  return res.status(200).json(Array.from(getAllLaunches()));
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
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

function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;
  if (!existsLaunchWidthId(launchId)) {
    return res.status(404).json({
      error: "launch not found",
    });
  }
  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}
module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
