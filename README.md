# React-Native-App-Frontend
This is the frontend part of a simple React Native application supporting people to meet and do activities together.
The frontend is built upon React Native framework.

## To run the code:
- set up the server first. To do that, please refer to the [backend repository][1]
- modify the `url` variable at line 1 in the "/constant.js" file. Set it to the url given by the server
- cd into the root folder of this repository: `cd path_to_the_folder`
- run `expo start`
- running the app on your phone by scanning the QR code or starting a simulator or emulator

## Design and Functionality
- React Navigation is used to navigate through pages
- User needs to sign up and log in to perform actions. You can log in directly by using username: `admin` and password: `admin` as a user named `xy`.
- User can look through all the activities created by themselves and by others on the main page. To view the detail of an activity, the user can click the corresponding activiy
- User can initiate activities by clicking the add button on the main page
- User can search activities according to time, location and type by clicking the search button on the main page
- User can register and unregister an activity by click the Register/Unregister button on the detail page

[1]:https://github.com/xyang1127/React-Native-App-Backend
