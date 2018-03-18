var user_email;
var user_id;
var user_token;
var pop_under_count=0;
/*$(function () {
      $(document).on('click.once', function () {
         // alert("Alerted once");
        //  $(document).off('click.once');
        pop_under_count=pop_under_count+1;
        if(pop_under_count==10)
        {
        //  alert("test");
        var url = "https://www.donationhub.net/";
        window.open(url, "s", "width= 540, height= 380, left=300, top=100, resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no").blur();
        window.focus();
        pop_under_count=0;
        }
      })            
 });
*/

chrome.identity.getProfileUserInfo(function(userInfo) {
    user_email=userInfo.email;
    user_id=userInfo.id;
});

chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
  if(message.text == "getStuff")
    sendResponse({user_email:user_email,user_id:user_id}); //This would be where you send your stuff
});

chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "https://chromeauth-dot-curious-athlete-131013.appspot.com/";

  chrome.tabs.create({ url: newURL });

  
});
/*chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  // Use the token. 
console.log('Error connecting to Db',token);

    if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
    }
  

});
*/
