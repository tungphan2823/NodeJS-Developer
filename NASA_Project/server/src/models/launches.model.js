const launchesDatabase = require("./launches.mongo");
const axios = require("axios");
const planets = require("./planets.mongo");
const launches = new Map();
const DEFAULT_FLIGHT_NUMBER = 100;
let latestFlightNumber = 100;

// const launch = {
//   flightNumber: 100,
//   mission: "Kepler Exploration X",
//   rocket: "Explorer IS1",
//   launchDate: new Date("December 27, 2030"),
//   target: "Kepler-442 b",
//   customer: ["Tung", "NASA"],
//   upcoming: true,
//   success: true,
// };
// saveLaunch(launch);
// launches.set(launch.flightNumber, launch);
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log("problem downloading launch");
    throw new Error("error downloading launch");
  }
  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],

      customer: customers,
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
    };
    console.log(launch);

    await saveLaunch(launch);
  }
}
async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("Launch Data already loaded");
  } else {
    populateLaunches();
  }
}

async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter);
}
async function existsLaunchWidthId(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  });
}

async function getAllLaunches(skip, limit) {
  return await launchesDatabase
    .find(
      {},
      {
        _id: 0,
        __v: 0,
      }
    )
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function saveLaunch(launch) {
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}
async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}
// function addNewLaunch(launch) {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       flightNumber: latestFlightNumber,
//       upcoming: true,
//       success: true,
//       customer: ["Tung", "NASA"],
//     })
//   );
// }

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("Target planet not found");
  }
  const latestFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    flightNumber: latestFlightNumber,
    customers: ["Tung", "NASA"],
  });
  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  return aborted.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  existsLaunchWidthId,
  abortLaunchById,
  scheduleNewLaunch,
  loadLaunchData,
};
