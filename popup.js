 var value;

function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    var tab_url_final=tabs[0].url;

    chrome.tabs.sendMessage(activeTab.id, {"message": "fgfdgfdgdf"+tab_url_final});
     chrome.tabs.query({
      active: true,              
      lastFocusedWindow: true     
      }, function(array_of_Tabs) {
      var tab = array_of_Tabs[0];
      var url = tab.url;
     

     var splitUrl = url.split('inbox/');
     if(!splitUrl[1]){
     
  //chrome.tabs.sendMessage(activeTab.id, {"message": tab_url_final});
    }
    else{

      value =splitUrl[1];

        
//chrome.tabs.sendMessage(activeTab.id, {"message": tab_url_final});


    }
    
});


    
   });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("button1").addEventListener("click", popup);


});