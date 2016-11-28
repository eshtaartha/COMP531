import resource from "../../webComm"

var toggle = false; 

const url = "http://studybuddy7.herokuapp.com"



const articles = () =>
{
  return resource('GET','articles')
}

export const updateStatus=function() //function to update status
{
    var newStatus=document.getElementById("status_update_input").value;
    
    


    return (dispatch) =>
     			{

                 resource('PUT', 'headline', {headline:newStatus})   
		 		 
		 		 .then(r =>	
		 		 	{
		 		 		console.log(r);
		 		 		dispatch({ type:"STATUS_UPDATED", payload : r.headline})
		 		 	})
		 		}

   
};

export const postArticle = (image) => 	
			{
				//const url = 'https://webdev-dummy.herokuapp.com'

				var newText = document.getElementById('txtArea').value;
				document.getElementById('txtArea').value = ""; 

				console.log(image);
				console.log(newText);

				const fd = new FormData()
   				fd.append('text', newText)
     			fd.append('image', image)

     			return (dispatch) =>
     			{

                 fetch(url+'/article', {credentials: 'include', method : "POST", body: fd})    
		 		 .then(r => r.json())
		 		 .then(r =>	
		 		 	{
		 		 		console.log(r);
		 		 		dispatch({ type:"ARTICLE_POSTED", payload : r.articles})
		 		 	})
		 		}
			}

export const uploadUserAvatar = (e) => 	
			{
				//const url = 'https://webdev-dummy.herokuapp.com'
				
				console.log(e.target.files[0]);
				alert("Handle image change triggered")
				var articleImage = e.target.files[0];

				const fd = new FormData()
   				//fd.append('text', newText)
     			fd.append('image', articleImage)

     			return (dispatch) =>
     			{

                 fetch(url+'/avatar', {credentials: 'include', method : "PUT", body: fd})    
		 		 .then(r => r.json())
		 		 .then(r =>	
		 		 	{
		 		 		console.log(r.avatar);
		 		 		dispatch({ type:"MAIN_AVATAR_UPDATED", payload : r.avatar})
		 		 	})
				}
				
			}

export const uploadUserAvatarProfile = (e) => 	
			{
				//const url = 'https://webdev-dummy.herokuapp.com'
				
				console.log(e.target.files[0]);
				alert("Handle image change triggered")
				var articleImage = e.target.files[0];

				const fd = new FormData()
   				//fd.append('text', newText)
     			fd.append('image', articleImage)

     			return (dispatch) =>
     			{

                 fetch(url+'/avatar', {credentials: 'include', method : "PUT", body: fd})    
		 		 .then(r => r.json())
		 		 .then(r =>	
		 		 	{
		 		 		console.log(r.avatar);
		 		 		dispatch({ type:"PROFILE_AVATAR_UPDATED", payload : r.avatar})
		 		 	})
				}
				
			}

export const showComment = function(id) //function to update status
{
    

    toggle = !(toggle)

    if(toggle == true)
    {
    	return{
			    type: "TOGGLE_COMMENT_ON",
			    payload:id
   			  }
    }
    else
    {
    	return{
			    type: "TOGGLE_COMMENT_OFF",
			    payload:id
   			  }
    }

    

   
};

export const updateProfile = function(prev_email, prev_zip) // function to input, store, update and display profile details of user 
{
	

	var profileData = {};

	profileData.zip = prev_zip; 
	profileData.email = prev_email;
	
	var emailYes=0;
	var zipYes=0;
	var pwdYes=0;

	return (dispatch)=>
	{

			
		    //var name_inp=document.getElementById("name_input").value;
		    var email_inp=document.getElementById("email_input").value;
		    //var tel_inp=document.getElementById("tel_input").value;
		    var zip_inp=document.getElementById("zip_input").value;
		    var pwd_inp=document.getElementById("pwd_input").value;
		    var pwd_confirm_inp=document.getElementById("pwd_confirm_input").value;

		    profileData.email = email_inp;
		    profileData.zip = zip_inp;
		    profileData.pwd = pwd_inp;
		    
		    
		    if (!(email_inp==null||email_inp=="")) // to check if input field is null
		    {
		        var emailFormat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  // expected format of input
		        
		        
		        if(email_inp!=prev_email) 
		        {
		            if(email_inp.match(emailFormat)) // to find if input matches the required format
		            {
		             emailYes=1;
		             
		            }
		            else
		            {
		             alert("Please enter a valid email id") 
		             return false;
		            }       
		            
		        }
		      document.getElementById("email_input").value="";
		    }
		    
		    
		    if (!(zip_inp==null||zip_inp==""))
		    {
		        var zipFormat=/(^\d{5}$)|(^\d{5}-\d{4}$)/;
		        
		        if(zip_inp!=prev_zip)
		        {
		            if(zip_inp.match(zipFormat))
		            {
		            
		             zipYes=1;
		            
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
		        
		            
		            if (pwd_inp != pwd_confirm_inp) 
		            {
		             alert("Passwords must match !!")
		             return false;
		            } 
		            else 
		            {
		             pwdYes=1;
		            
		            
		             
		            }
		            
		            
		        
		        
		        document.getElementById("pwd_input").value="";
		        document.getElementById("pwd_confirm_input").value="";
		    }

		    if(emailYes==1)
		    {
			 	resource('PUT', 'email', {email:email_inp}) 
			 	.then(r=>profileData.email=email_inp)
			    .then(r=>console.log("Email ID has been updated")) 
			    
		    }

		    if(zipYes==1)
		    {
			    resource('PUT', 'zipcode', {zipcode:zip_inp}) 
			    .then(r=>profileData.zip=zip_inp)
			    .then(r=>console.log("Zipcode has been updated"))	
			}

			if(pwdYes==1)
			{
			    resource('PUT', 'password', {password:pwd_inp})
			    .then(r=>profileData.pwd=pwd_inp) 
			    .then(r=>console.log("Password has been updated"))	
			}

		 	dispatch({ type:"PROFILE_UPDATED", payload : profileData})
		 		 	
    }
}


export const registerUser = function() //function to update status
{
    		var name_inp=document.getElementById("account_name").value;
		    var email_inp=document.getElementById("email_address").value;
		    var dob_inp=document.getElementById("dob").value;
		    var zip_inp=document.getElementById("zip").value;
		    var pwd_inp=document.getElementById("password").value;

		    console.log("New user registration is not supported by server");

		    return (dispatch) =>
     			{

                 resource('POST', 'register', {name_inp, email_inp, dob_inp, zip_inp, pwd_inp})
		 		 .then(r=>console.log(r.username +" " + "registration" + " " + r.result))
		 		 .then(r =>	
		 		 	{
		 		 		
		 		 		dispatch({ type:"NEW_USER_REGISTERED", payload : ""})
		 		 	})
				}

   
}

export const sortArticles = function() //function to update status
{
    		var sort_inp=document.getElementById("searchBox").value;
    		document.getElementById("searchBox").value = "";
		    
		    

		    return {type:"ARTICLES_SORTED",payload:sort_inp}

   
}


export const addComment = function(articleId) //function to update status
{
    		var comment_inp=document.getElementById(articleId).value;
    		document.getElementById(articleId).value = "";
		    
		    
		    console.log(comment_inp);

		    

    		return (dispatch) =>
     			{

                 resource('PUT', `articles/${articleId}`, {text:comment_inp, commentId:-1})   
		 		 
		 		 .then(r =>	
		 		 	{
		 		 		console.log(r);
		 		 		dispatch({ type:"COMMENT_ADDED", payload : r})
		 		 	})
		 		}

   
}


export const divClicked = function(id, author, username, type) 
{

	//const url = 'https://webdev-dummy.herokuapp.com'

	if(type==1)
	{
		if(author==username)
		{
			document.getElementsByName(id)[0].contentEditable = true;
		}
		else
		{
			document.getElementsByName(id)[1].style.display = 'inline';
		}

		return {type:"ARTICLE_AUTH_CHECK", payload: ""}


	}
	else if(type==2)
	{
    	var textInput = document.getElementsByName(id)[0].textContent;

    	return (dispatch) =>
     			{

                 resource('PUT', `articles/${id}`, {text:textInput})   
		 		 
		 		 .then(r =>	
		 		 	{
		 		 		console.log(r);
		 		 		dispatch({ type:"ARTICLE_MODIFIED", payload : r})
		 		 	})
		 		}


    	

    }



    
}

export const divClickedComment = function(id, commentId, author, username, type) 
{

	//const url = 'https://webdev-dummy.herokuapp.com'

	if(type==1)
	{
		if(author==username)
		{
			document.getElementsByName(commentId)[0].contentEditable = true;
		}
		else
		{
			document.getElementsByName(id)[1].style.display = 'inline';
		}

		return {type:"COMMENT_AUTH_CHECK", payload: ""}


	}
	else if(type==2)
	{
    	var textInput = document.getElementsByName(commentId)[0].textContent;

    	return (dispatch) =>
     			{

                 resource('PUT', `articles/${id}`, {text:textInput, commentId: commentId })   
		 		 
		 		 .then(r =>	
		 		 	{
		 		 		console.log(r);
		 		 		dispatch({ type:"COMMENT_MODIFIED", payload : r})
		 		 	})
		 		}


    	

    }



    
}