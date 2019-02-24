$(document ).ready(function() {
    //get all the data on app startup\



    $('#createEmployee').click(function(){
        $('.employeeForm').css("display", "block");
        $('#dynamicBtn').text('Save Changes')
    });

    $('#dynamicBtn').click(function(){
        //employee form values
        var fName = $("#fname").val();
        var lName = $("#lname").val();
        var email = $("#email").val();
        var age = $("#age").val();
        var gender = $("#gender").val();
        var yearsOfExperience = $("#yearsOfExperience").val();
        var isFullTime = $('#isFullTime').is(":checked")

        //check if you need to create or update an employee
        if($(this).text() == "Save Changes"){
            var docuName = `${fName.charAt(0)}.${lName}`;
            console.log(docuName);
            db.collection("employees").doc(docuName).set({
                fName,
                lName,
                email,
                age,
                gender,
                yearsOfExperience,
                isFullTime,
            }).then( docRef => {
                $('#operationStatus')
                    .html('<div class="alert alert-success"><strong>Success!</strong>Employee was created!</div>')
                    .delay(2500)
                    .fadeOut('slow');
                $('.employeeForm').css("display","none");
                // LoadData();
            }).catch(err => {
                $('#operationStatus')
                    .html('<div class="alert alert-danger"><strong>Error!</strong>Employee was not created!</div>')
            })
        }
        else{
            var docuName = `${fName.charAt(0)}.${lName}`;
            var sfDocRef = db.collection("employees").doc(docuName);
            sfDocRef.set({
                fName,
                lName,
                email,
                age,
                gender,
                yearsOfExperience,
                isFullTime,
            },
            {
                merge: true,
            }).then( docRef => {
                $('#operationStatus')
                    .html('<div class="alert alert-success"><strong>Success!</strong>Employee was updated!</div>')
                    .delay(2500)
                    .fadeOut('slow');
                $('.employeeForm').css("display","none");
                // LoadData();
            }).catch(err => {
                $('#operationStatus')
                    .html('<div class="alert alert-danger"><strong>Error!</strong>Employee was not updated!</div>')
            })
        }
    });

    // Cancel the Employee form
    $('#cancel').click(function(){
        $('.employeeForm').css("display", "none");
    });

    // Get the data of the employee you want to edit
    $("tbody.tbodyData").on("click","td.editEmployee", function(){
        $('.employeeForm').css("display", "block");
        $('#dynamicBtn').text('Update Employee');

        $("#fname").val($(this).closest('tr').find('.fname').text());
        $("#lname").val($(this).closest('tr').find('.lname').text());
        $("#email").val($(this).closest('tr').find('.email').text());
        $("#age").val($(this).closest('tr').find('.age').text());
        $("#gender").val($(this).closest('tr').find('.gender').text());
        $("#yearsOfExperience").val($(this).closest('tr').find('.yearsofexperience').text());
        $("#isFullTime").prop('checked', $(this).closest('tr').find('.isfulltime').text() === 'true');
    });

    // Delete employee
    $("tbody.tbodyData").on("click","td.deleteEmployee", function(){
        //Get the Employee Data
        var fName = $(this).closest('tr').find('.fname').text(); //First Name
        var lName = $(this).closest('tr').find('.lname').text(); //Last Name

        var docuName = `${fName.charAt(0)}.${lName}`;
        db.collection("employees").doc(docuName).delete().then( docRef => {
            $('#operationStatus')
                .html('<div class="alert alert-success"><strong>Success!</strong>Employee was deleted!</div>')
                .delay(2500)
                .fadeOut('slow');
            $('.employeeForm').css("display","none");
            // LoadData();
        }).catch(err => {
            $('#operationStatus')
                .html('<div class="alert alert-danger"><strong>Error!</strong>Employee was not deleted!</div>')
        })
    });

    $("#searchEmployee" ).change(function() {
        console.log('You entered: ', $(this).val());
      });
});
