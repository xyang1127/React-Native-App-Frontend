import { url } from "./constant";

export const fetch_all = async () => {
  try {
    let response = await fetch(url + "/activity");
    let json = await response.json();
    let ans = [];
    for (i = 0; i < json.length; i++) {
      let tmp = await transform(json[i]);
      ans.push(tmp);
    }
    return ans;
  } catch (error) {
    console.log(error.name + ":" + error.message);
    return [];
  }
};

export const search = async (type, time, location) => {
  try {
    let response = await fetch(
      `${url}/activity/search?type=${type}&time=${time}&location=${location}`
    );
    let json = await response.json();
    let ans = [];
    for (i = 0; i < json.length; i++) {
      let tmp = await transform(json[i]);
      ans.push(tmp);
    }
    return ans;
  } catch (error) {
    console.log(error.name + ":" + error.message);
    return [];
  }
};

const transform = async (activity) => {
  try {
    let response = await fetch(`${url}/user/${activity.user_id}`);
    let json = await response.json();
    let organizer = json.name;
    let ans = {
      ...activity,
      activityName: activity.name,
      organizer: organizer,
    };
    return ans;
  } catch (error) {
    console.log(error.name + ":" + error.message);
    return {};
  }
};
