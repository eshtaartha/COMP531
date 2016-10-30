

function updateProfile() // function to input, store, update and display profile details of user 
{
    var name_inp=document.getElementById("name_input").value;
    var email_inp=document.getElementById("email_input").value;
    var tel_inp=document.getElementById("tel_input").value;
    var zip_inp=document.getElementById("zip_input").value;
    var pwd_inp=document.getElementById("pwd_input").value;
    var pwd_confirm_inp=document.getElementById("pwd_confirm_input").value;
    
    if (!(name_inp==null||name_inp=="")) // to check if input field is null
    {
        if(name_inp!=prev_name) //to check if new input is same as previous input
        {
            
            if(!isNaN(name_inp[0])) //to check if first character is number
            {
             alert("The display name should not start with a number");
             return false;
            }
            
            alert("Display Name has been updated")
            document.getElementById("name").innerHTML = name_inp;
            prev_name=name_inp;
        }
      document.getElementById("name_input").value="";   
    }
    
    if (!(email_inp==null||email_inp=="")) // to check if input field is null
    {
        var emailFormat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  // expected format of input
        
        
        if(email_inp!=prev_email) 
        {
            if(email_inp.match(emailFormat)) // to find if input matches the required format
            {
             alert("Email ID has been updated")
             document.getElementById("email").innerHTML = email_inp;
             prev_email=email_inp;
            }
            else
            {
             alert("Please enter a valid email id") 
             return false;
            }       
            
        }
      document.getElementById("email_input").value="";
    }
    
    if (!(tel_inp==null||tel_inp==""))
    {
        var telFormat=/^[1-9]\d{2}[1-9]\d{2}\d{4}$/; //expected input format
        var tel_inp = tel_inp.replace(/\D/g, "");
        
        if(tel_inp!=prev_tel)
        {
            if(tel_inp.match(telFormat))
            {
            alert("Telephone number has been updated")
            document.getElementById("tele").innerHTML = tel_inp;
            prev_tel=tel_inp;
            }
            else
            {
             alert("Please enter a valid 10 digit telephone number")    
             return false;
            }
        }
      document.getElementById("tel_input").value="";
    }
    
    if (!(zip_inp==null||zip_inp==""))
    {
        var zipFormat=/(^\d{5}$)|(^\d{5}-\d{4}$)/;
        
        if(zip_inp!=prev_zip)
        {
            if(zip_inp.match(zipFormat))
            {
            alert("Zip Code has been updated")
            document.getElementById("zip").innerHTML = zip_inp;
            prev_zip=zip_inp;
            }
            else
            {
             alert("Please enter a valid 5 digit zip code") 
             return false;
            }
        }
      document.getElementById("zip_input").value="";
    }
    
    if (!(pwd_inp==null||pwd_inp==""))
    {
        if(pwd_inp!=prev_pwd)
        {
            
            if (pwd_inp != pwd_confirm_inp) 
            {
             alert("Passwords must match !!")
             return false;
            } 
            else 
            {
             alert("Password has been updated")
             //document.getElementById("pwd").innerHTML = pwd_inp;
             //document.getElementById("pwd_cnfrm").innerHTML = pwd_confirm_inp;
             
             prev_pwd=pwd_inp;
             prev_cnfrm=pwd_confirm_inp;
            }
            
            
        }
        
        document.getElementById("pwd_input").value="";
        document.getElementById("pwd_confirm_input").value="";
    }
    
}

function goHome()
{
    window.location.href='main.html'; // redirect to main page
}


window.onload=function() // Function to load hardcoded initial values
{
prev_name=document.getElementById("name").innerHTML = "Tony Stark";
prev_email=document.getElementById("email").innerHTML = "stark@starkTech.com";
prev_tel=document.getElementById("tele").innerHTML = "100-200-3000";
prev_dob=document.getElementById("dob").innerHTML = "10/25/1992";
prev_zip=document.getElementById("zip").innerHTML = "12345";
prev_pwd="11111";
//prev_cnfrm=document.getElementById("pwd_cnfrm").innerHTML = "11111";
}

document.getElementById("uploadBtn").onchange = function () 
{
    document.getElementById("uploadFile").value = this.value;
};
