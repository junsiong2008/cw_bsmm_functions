# cw_bsmm_functions

![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

This repository stores the source code for a simple Firebase function used for Ticketz Event Registration App. The core feature of the function is to send a payment confirmation email to the participant when the payment info is verified by the event committee.

<br/>

## Pre-requisites
This project uses the following SDKs:
```
"firebase-admin": "^10.0.2",
"firebase-functions": "^3.18.0"
```

<br/>

## Getting Started
Follow the steps below to run the project in the local Firebase emulator:

1. To use Firebase emulator, install the Firebase CLI:
```
npm install -g firebase-tools
```

2. Clone the project in a local directory:
```
git clone https://github.com/junsiong2008/cw_bsmm_functions.git
```

2. Open a terminal / command prompt and change directory to the `functions` directory:
```
cd cw_bsmm_functions/functions
```

3. Run `npm install`.

4. Run `npm run build`.

5. Run `firebase emulators:start`.

The Firebase function will start running on a local emulator.


<br/>

## Function
The only function in `index.ts` file is `onParticipantUpdate`. This function is triggered whenever a document in the `participants` collection is updated in Firebase Firestore. 

If the value of the `isPaid` field is updated from `false` to `true`, the function will contruct an email and create a new document in the `emails` collection. Then, the Firebase Trigger Email extension will be triggered to send the email to the user.

<br/>

## Triggering the function in Firebase Emulator
To trigger the function in Firebase Emulator for testing:

1. Configure your SMTP service settings in the `extensions/firestore-send-email.env` file.

2.  In the `functions` directory, run `firebase init emulators`.

3. Ensure that the following emulators are selected:

    Emulator | Description | 
    ---------| -----------| 
    Firestore Emulator| To create and update test documents into the `participants` and `templates` collection.
    Function Emulator | To test and trigger the Firebase function.

4. Start the emulators in the local machine:
   ```
   firebase emulators:start
   ````

5. Open the Firebase Emulator Hub by opening the link shown in the terminal.

6. In the Firestore emulator, create the `participants` and `templates` collections.

7. Create a new document in the `participants` collection with the following test data. (_Note that the `isPaid` field set to `false`_) :

    Field Name | Data Type | Value
    ---|---|---|
    allergic | string | no
    chineseName | string | 试试
    datetimeCreated | timestamp | 28/11/2022 11:48:46 GMT+08
    emailAddress | string | test@test.com
    englishName | string | Jason
    icNumber | string | 000000-00-0000
    isAttended | boolean | false
    isHalal | boolean | false
    isPaid | boolean | false
    isVegetarian | boolean | false
    phoneNumber | string | 0123456789
    secondarySchool | string | Test School
    studentStatus | string | Student
    unit | string | Test Unit

8. Create a new document in the `templates` collection with the document ID of `payment_confirmed`:
    Field Name | Data Type | Value
    ---|---|---|
    attachments | array of map |  [0]: filename: qr_{{ticketNumber}}.png, path: https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl={{ticketNumber}}&choe=UTF-8z
    html | string | <copy-the-content-of-`email.html`-here>
    
9. In the Firestore emulator, change the value of `isPaid` to `true`.

10. Check the logs of the Function emulator to see that the function has been triggered.

11. Verify that the `emails` collection has also been created with a new document that contains the email content and the email delivery status.

<br/>

## Helpful links
Visit the following sites to learn more:
* [Cloud Functions for Firebase](https://firebase.google.com/docs/functions)
* [Cloud Firestore Triggers](https://firebase.google.com/docs/functions/firestore-events)
* [Install, configure and integrate Local Emulator Suite](https://firebase.google.com/docs/emulator-suite/install_and_configure)
* [Firebase Trigger Email](https://firebase.google.com/docs/extensions/official/firestore-send-email)
* [How to send email from Firebase with the Trigger Email extension](https://betterprogramming.pub/how-to-send-emails-from-firebase-with-the-trigger-email-extension-27c593ca1157)
