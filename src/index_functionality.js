
function check_password(input) //fucntion to validate password match
    {
        if (input.value != document.getElementById('password').value) 
        {
            input.setCustomValidity('Password Must be Matching.');
        } 
        else 
        {
            input.setCustomValidity('');
        }
    }

function validateRegistrationForm()
{
    
    var name_check = document.forms["registration_form"]["account_name"].value;
       
    var dob_inp=document.forms["registration_form"]["date_of_birth"].value;

    var d= new Date();
    var timestamp= d.getTime(); 
    document.getElementById("time_stamp").value = timestamp;

    var birthDateString=document.forms["registration_form"]["date_of_birth"].value;


    
    if (name_check == null || name_check == "")  //fucntion to validate name
    {
        alert("Please fill the name");
        return false;
    }

    if(!isNaN(name_check[0]))
    {
        alert("The account name should not start with a number");
        return false;
    }

     
    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    
    
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))  //function to validate age
    {
     age--;
    }

    if(age<18)
    {
     alert("You are less than 18 years old. You are not allowed to register!");
     return false;
         
    }
}

function validateLogin()
{
var login_name = document.getElementById('login_name').value;
var login_password = document.getElementById('login_password').value;

if (!(login_name == null || login_name == "")) //check if username field is not empty
    {
      if(!(login_password == null || login_password == ""))//check if password field is not empty
      {
       window.location.href='main.html'; // redirect to main page
      }
      else 
      {
       alert("Please enter the password");
       return false;
      }
        
    }
    else
    {
     alert("Please enter the Username");
     return false;
    }

}
