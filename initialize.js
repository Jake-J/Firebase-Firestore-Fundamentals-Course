var db = firebase.firestore();
var employeesRef = db.collection("employees");

employeesRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id);
    })
})

// employeesRef.doc("R.Dickles").set({
//     fName: "Ranice",
//     lName: "Dickles",
//     email: "rdicks@hatena.ne.jp",
//     age: 39,
//     gender: "Female",
//     yearsOfExperience: 9,
//     isFullTime: true,
// });
//
// employeesRef.doc("A.Lamberton").set({
//     fName: "Adler",
//     lName: "Lamberton",
//     email: "alamberton1@ft.com",
//     age: 50,
//     gender: "Male",
//     yearsOfExperience: 7,
//     isFullTime: true,
// });
