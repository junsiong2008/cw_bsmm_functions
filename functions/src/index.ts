import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const onParticipantUpdate = functions
    .region("asia-southeast2")
    .runWith({
      memory: "128MB",
      maxInstances: 2,
    })
    .firestore
    .document("/participants/{docId}")
    .onUpdate((change, context) => {
      const before = change.before.data();
      const after = change.after.data();
      if (before.isPaid == false && after.isPaid == true) {
        const emailAddress = after.emailAddress;
        const name = `${after.englishName} ${after.chineseName}`;
        const ticketNumber = context.params.docId;
        const icNumber = after.icNumber;
        const phoneNumber = after.phoneNumber;
        const studentStatus = after.studentStatus;
        const secondarySchool = after.secondarySchool ?
        after.secondarySchool :
        "Not Applicable";
        const unit = after.unit ?
        after.unit :
        "Not Applicable";
        const halal = after.isHalal ? "Halal" : "Non-Halal";
        const vegetarian = after.isVegetarian ? "Vegetarian" : "Non-Vegetarian";
        const foodOption = `${halal}, ${vegetarian}`;
        const allergic = after.allergic;
        const registrationDate = after.datetimeCreated.toDate().toDateString();
        const registrationTime = after.datetimeCreated.toDate()
            .toLocaleTimeString();
        const registrationDatetime = `${registrationDate} ${registrationTime}`;
        return admin
            .firestore()
            .collection("emails")
            .add({
              to: emailAddress,
              template: {
                name: "payment_confirmed",
                data: {
                  name: name,
                  ticketNumber: ticketNumber,
                  icNumber: icNumber,
                  emailAddress: emailAddress,
                  phoneNumber: phoneNumber,
                  studentStatus: studentStatus,
                  secondarySchool: secondarySchool,
                  unit: unit,
                  foodOption: foodOption,
                  allergic: allergic,
                  registrationDatetime: registrationDatetime,
                },
              },
            });
      }
      return null;
    });
