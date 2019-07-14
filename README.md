# appointmentSetter

A Scheduler app that can be used in buinesses like: Salons, Barbers, etc... There is a page for both user and the Employee side. You can request and delete appointment from the user side. From the Employee side, you can manage the appointments by adding, deleting, and confirming the appointments. You are able to set days offs to block days that are not available.

### Getting Started

`npm install`

Run client and server at the same time

`npm run dev`

#### Installing

Install dependencies in both [server](https://github.com/Fourleaftayback/appointmentSetter/blob/master/package.json) and [client](https://github.com/Fourleaftayback/appointmentSetter/blob/master/client/package.json) package.json files.

Modify the script in server package.json to run client and server concurrently.

`"scripts": { "dev": "concurrently \"npm run server\" \"npm run client\"", }`

Add a proxy in the client package.json file.

`"proxy": "http://localhost:5000"`

Set up your .env file and include database url (mongoose), secret, and emailerAPI key for sendGrid.

Run client and server at the same time

`npm run dev`

To have the ability to upload images to AWS. You will need to configure a [AWS](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) account. Here is a [Youtube Tutorial](https://www.youtube.com/watch?v=Oc69SEtbM_U) to configure your account and set up your S3 bucket to save images.

### Deployment

The react app can be built in herokus server.
Add this in your server package.json file to run the build when uploading the build.

`"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"`

Here is a working [live app](https://book-appointments.herokuapp.com/).

### Built With

- [Mongoose.js](https://mongoosejs.com/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Redux](https://redux.js.org/)

### Authors

- Jay Shong [Portfolio](https://www.jayshong.com/)
