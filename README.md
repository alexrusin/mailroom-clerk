# Mailroom Clerk
This is a client software for [Mailroom server](https://github.com/alexrusin/mailroom).

Mailrom Tools (Mailroom server and Mailroom Clerk client) help you develop locally against WebHooks, HTTP callbacks from a remote server.

## Usage

### Step 1 (remote server)
Create an account on [Mailroom server](https://mailroom.myapi.website).  After logging in, create a route.  Register "Hook URL" with a remote service that is going to send you WebHooks, or use an app for interacting with HTTP APIs, such as Postman, to send requests to created "Hook URL".

### Step 2 (local machine)
Download an application package for your system from [https://alexrusin.com/mailroom-clerk](https://alexrusin.com/mailroom-clerk/) or install the source code (described below).  Enter your API Key and connect. The key can be found by clicking on "Mailroom" in the header of Mairoom server. 
When you click on "Routes" menu item, you can see all your created Hook URLs.  If you click on one of them, you will see a recorded HTTP request.  In the input field in the card footer you can specify URL you want this request to be sent to, including endpoints on your local machine/network.

## Source Code Installation

Mailroom Clerk is an open source application.

### Prerequisites

* You have to have Node and NPM installed on your computer.

### Step 1

Begin by cloning this repository to your machine, and installing all NPM dependencies.

```bash
git clone https://github.com/alexrusin/mailroom-clerk.git
cd mailroom-clerk npm install
```

### Step 2

Run Electronjs app.

```bash
npm run start
```

## Development/Contributing

### Prerequisites

* The application is written as single page Vuejs application, so you have to [know Vue.js](http://vuecasts.com).

### Step 1

Run the following command in the first terminal window.  This command will watch your changed files and reload the application.
```bash
npm run watch
```

In the second terminal window run the application.
```bash
npm run start
```

### Step 2

Start writing code.  When you save the application will get automatically rebuilt and reloaded.

## Distribution Package Builds

* Mailroom Clerk uses [electron-packager](https://github.com/electron-userland/electron-packager) to bundle the application's source code.

### For Windows:

```bash
npm run package-win
```

### For Mac:

```bash
npm run package-mac
```

