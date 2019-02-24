$(document).ready(function () {
    $('#onlyMalesFilter').click(function () {
        // console.log('onlyMalesFilter Filter executed');
        employeesRef
            .where("gender", "==", "Male")
            .onSnapshot(querySnapshot => LoadTableData(querySnapshot));
    });

    $('#fullTimeFilter').click(function () {
        employeesRef
            .where("isFullTime", "==", true)
            .onSnapshot(querySnapshot => LoadTableData(querySnapshot));
    });

    $('#olderThenFilter').click(function () {
        employeesRef
            .where("age", ">=", 30)
            .onSnapshot(querySnapshot => LoadTableData(querySnapshot));
    });

    $('#ageBetweenFilter').click(function () {
        employeesRef
            .where("age", ">=", 35)
            .where("age", "<=", 50)
            .onSnapshot(querySnapshot => LoadTableData(querySnapshot));
    });

    $('#yearsOfExperienceFilter').click(function () {
        employeesRef
            .where("gender", "==", "Female");
        employeesRef
            .where("yearsOfExperience", ">=", 5)
            .where("yearsOfExperience", "<=", 10)
            .onSnapshot(querySnapshot => LoadTableData(querySnapshot));
    });

    $('#clearFilter').click(function () {
        employeesRef
            .orderBy("fName", "desc")
            .limit(5)
            .get()
            .then(querySnapshot => LoadTableData(querySnapshot));
    });
    $("#searchEmployee").change(function () {
        console.log('searching', $(this).val());
        var searchVal = $(this).val();
        employeesRef
            .where("fName", "==", searchVal)
            .onSnapshot(querySnapshot => LoadTableData(querySnapshot));

    });
});


db.collection("employees").onSnapshot(snapShot => {
    snapShot.docChanges.forEach(change => {
        if (change.type === "added") {
            console.log("Employee Added");
        }
        if (change.type === "modified") {
            console.log("Employee Modified");
        }
        if (change.type === "deleted") {
            console.log("Employee Deleted");
        }
    })
    LoadTableData(snapShot);
});

function LoadTableData(querySnapshot) {
    var tableRow = '';
    querySnapshot.forEach(doc => {
        var document = doc.data();
        tableRow += `<tr><td class="fname">${document.fName}</td>
                            <td class="lname">${document.lName}</td>
                            <td class="email">${document.email}</td>
                            <td class="age">${document.age}</td>
                            <td class="gender">${document.gender}</td>
                            <td class="yearsofexperience">${document.yearsOfExperience}</td>
                            <td class="isFullTime">${document.isFullTime}</td>
                            <td class="editEmployee">${document.isFullTime}</td>
                            <td class="editEmployee"><i class="fa fa-pencil" aria-hidden="true" style="color:green"></i></td>
                            <td class="deleteEmployee"><i class="fa fa-trash" aria-hidden="true" style="color:red"></i></td>
                        </tr>`
    });
    $('tbody.tbodyData').html(tableRow);
}
