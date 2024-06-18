const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWidthId,
  abortLaunchById,
} = require("../../models/launches.model");
async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
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
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const existsLaunch = await existsLaunchWidthId(launchId);
  if (!existsLaunch) {
    return res.status(404).json({
      error: "launch not found zz",
    });
  }
  
  const aborted = await abortLaunchById(launchId);
  console.log(aborted);
  if (!aborted) {
    return res.status(400).json({
      error: "launch not found",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}
module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
