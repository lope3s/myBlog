# MyBlog
This is a work in progress of a "social media" blog app, in this project i'm practing React Native and how to build a bff GraphQL server with Apollo.

## Prerequisites
To run this project, you'll need Android studio, to build and run the app, or you can use an Android smart phone via usb.
> This project is a work in progress and with preference for Android.  
> The app is been created on the Pixel 4. I'm not worring to much with responsive layout, yet.

## Back-End
I have created this back-end with Express.js, mongoDB, and i'm utilizing the jwt lib for route authentication.

### Running
To run this back-end you'll need to paste these lines in your .env:
```plaintext
PORT = 5001
MONGO_URI = mongodb+srv://usopp:oaRrsMdhmXA4Hlrj@myblog.mezip.mongodb.net/myBlog?retryWrites=true&w=majority
```
> Please, DO NOT provide real sensible data for the back-end.  
> You can add your own mongoDB URI as well.

Then run `yarn && yarn dev` to install dependencies and run the back-end.

## BFF (Back-End For Front-End)
In this server i'm working with the Apollo Server, to build a GraphQL server to simplify my requests to the API from the App.

### Running
Just add the port 4000 to the .env then run `yarn && yarn dev` just like in the back-end.

## Mobile App (Android)
The final step, here i'm making my first steps with React Native, and Apollo Client to connect with my Apollo Server.

### Running
To get things done on this side, you'll need to run android studio, and connect to the BFF server port with the adb reverse command:
```Bash
adb reverse tcp:4000 tcp:4000
```
Then you'll need to run metro and then build the app with the following commands:
```Bash
#Start metro
yarn start

#Then on other terminal you need to build the app with
yarn android
```