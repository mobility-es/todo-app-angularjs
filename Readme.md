AIQ & AngularJS TODO Application
--------------------------------
> Simple HTML5 mobile TODO Application to showcase AngularJS to the AIQ platform integration

## Dependencies
* [AppearIQ Mobile HTML5 SDK](https://www.npmjs.org/package/aiq)

## Included libraries
* aiq-api.js **v1.2.0**
* AngularJS **v1.2.23**
* ngTouch **v1.2.23**
* ngAnimate **v1.2.23**
* Angular.uuid
* localStorageService

## Getting started
In order to be able to use [AIQ Dev Cloud](https://www.appeariq.com/content/welcome-appear-iq) you need to [Sing Up](https://www.appeariq.com/sign-up) then deploy [Generic JAVA IA](https://github.com/appear/generic-integration-adapter) following instructions from the [README.md](https://github.com/appear/generic-integration-adapter/blob/master/README.md) file.

### To run in a browser
* Clone the repo
* Run `aiq run` within the cloned repo and follow its instructions

### To run on a device
* Clone the repo
* Connect to the AIQ Dev Cloud

        aiq login --orgName <YourOrganizaion> --username <YourUsername> --password <YourPassword>

* Deploy HTML5 App to the device by running `aiq publish` within the cloned repo
* Depending on your device OS, you should get AppearIQ client from [Google Play](https://play.google.com/store/apps/details?id=com.appearnetworks.appeardev) or [App Store](https://itunes.apple.com/us/app/appear-for-developers/id627420742?mt=8)
* Run the client and log in using your credentials

## Useful resources
* [Getting Started with AIQ Cloud](https://www.appeariq.com/content/getting-started)
* [Javascript API](https://www.appeariq.com/content/aiq-javascript-api)
* [Integration Java SDK](https://www.appeariq.com/content/integration-java-sdk)
