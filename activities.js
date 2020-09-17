const activities = [];

activities.push({
  activityName: "FootBall",
  type: "type1",
  time: "time1",
  location: "location1",
  organizer: "David",
  participantsNumber: "27",
  description:
    "The idea is based on empowering react-hook-form with a smart form component that can compose any Input child, collect data and handle errors automatically. Also, we are going to provide an automatic way to autofocus the next input after pressing the next keyboard button and adding a keyboard aware capability for our inputs.",
});

activities.push({
  activityName: "BasketBall",
  type: "type2",
  time: "time2",
  location: "location2",
  organizer: "John",
  participantsNumber: "199",
  description:
    "To make it clear we need first to create a custom Input component with error handling. then create a smart Form Component that injects all react-hook-form properties correctly for each component, and finally implement the autofocus and keyboard aware features.",
});
activities.push({
  activityName: "BasketBall",
  type: "type2",
  time: "time2",
  location: "location2",
  organizer: "John",
  participantsNumber: "199",
  description:
    "To make it clear we need first to create a custom Input component with error handling. then create a smart Form Component that injects all react-hook-form properties correctly for each component, and finally implement the autofocus and keyboard aware features.",
});
activities.push({
  activityName: "BasketBall",
  type: "type2",
  time: "time2",
  location: "location2",
  organizer: "John",
  participantsNumber: "199",
  description:
    "To make it clear we need first to create a custom Input component with error handling. then create a smart Form Component that injects all react-hook-form properties correctly for each component, and finally implement the autofocus and keyboard aware features.",
});
activities.push({
  activityName: "BasketBall",
  type: "type2",
  time: "time2",
  location: "location2",
  organizer: "John",
  participantsNumber: "199",
  description:
    "To make it clear we need first to create a custom Input component with error handling. then create a smart Form Component that injects all react-hook-form properties correctly for each component, and finally implement the autofocus and keyboard aware features.",
});
activities.push({
  activityName: "BasketBall",
  type: "type2",
  time: "time2",
  location: "location2",
  organizer: "John",
  participantsNumber: "199",
  description:
    "To make it clear we need first to create a custom Input component with error handling. then create a smart Form Component that injects all react-hook-form properties correctly for each component, and finally implement the autofocus and keyboard aware features.",
});
activities.push({
  activityName: "BasketBall",
  type: "type2",
  time: "time2",
  location: "location2",
  organizer: "John",
  participantsNumber: "199",
  description:
    "To make it clear we need first to create a custom Input component with error handling. then create a smart Form Component that injects all react-hook-form properties correctly for each component, and finally implement the autofocus and keyboard aware features.",
});
activities.push({
  activityName: "BasketBall",
  type: "type2",
  time: "time2",
  location: "location2",
  organizer: "John",
  participantsNumber: "199",
  description:
    "To make it clear we need first to create a custom Input component with error handling. then create a smart Form Component that injects all react-hook-form properties correctly for each component, and finally implement the autofocus and keyboard aware features.",
});
let key = 0;
const addKeyToActivities = (activity) => ({ key: key++, ...activity });

//export default activities;
export default activities.map(addKeyToActivities);
