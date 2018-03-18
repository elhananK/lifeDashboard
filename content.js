var $side;
var subject;
var sender;
var tmp_sender;
var status;
var flag = 0;
var split_targets;
var ld_target_counter = 0;
var hover_count = 1000;
var user_email;
var f = 0;
var gmail;
var main_user_email;
var sender_thread_id;
var json;
var shut_green_box_counter = 0;
var unique_exits_box_id = '';
var clone_subject = '';
var clone_sender = '';
var clone_email = '';
var clone_subject_for_execute = '';
var clone_sender_for_execute = '';
var clone_email_for_execute = '';
var clone_counter = '';
var hour1 = 0;
var hour2 = 0;
var mins1 = 0;
var mins2 = 0;
var seconds_time = 0;
var select_day = '';
var user_token;
var Choose_Options_clone = '';
var target_color_clone = '';
var thread_ids = [];
var status_ids = [];
var in_out_counter = 0;
var check_id = '';
var gmail_user_name = '';
var radar_open_close_count = 0;
var bar_open_close_count = 1;
var target_list_count = 0;
var target_shut_count = '';
var json_length = 0;
var switch_flag = 0;
var pop_under_count = 0;
var target_name = '';
var user_email_id = '';
var stop_engaged = 0;
var stop_priority_count = 0;
var svg_counter_id = 0;
var stop_target_type_counter = "";
var set_target_type_at_start="Target";
var set_priority_at_start=1;
var popup_subject='';
var enter_count=0;
var chrome_tab_count=0;
InboxSDK.load('1', 'sdk_LDPOC_c13127edc8').then(function(sdk) {

    user_email = document.getElementsByTagName("head")[0].getAttribute("data-inboxsdk-user-email-address");
   
    var _log = function(msg) {
        console.log(msg);
    };

    var routeID = 'foobarroute/:jdReq';
    var routeIDs = 'fobarroute/:jdRe';
    var routeIDss = 'fobarroute/:jdReee';
    var dashboardButton = sdk.NavMenu.addNavItem({
        name: "Life Dashboard",
        routeID: routeID,
        iconUrl: "http://lifedashboard.github.io/lifedashboard.com/target.png",
        routeParams: {
            jdReq: "bar"
        }
    });


    /*    dashboardButton.addNavItem({
            name: "LD Target",
            routeID: routeIDs,
            iconClass: "Drop_menu_icon",
            iconUrl: "chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/1.jpg",
            routeParams: {
                jdRe: "ba"
            }
        });

        dashboardButton.addNavItem({
            name: "Hot items",
            routeID: routeIDss,
            iconClass: "Drop_menu_icon",
            iconUrl: "chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/2.jpg",
            routeParams: {
                jdReee: "barr"
            }
        });

        dashboardButton.addNavItem({
            name: "Executed",
            routeID: routeIDss,
            iconClass: "Drop_menu_icon",
            iconUrl: "chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/3.jpg",
            routeParams: {
                jdReee: "barr"
            }
        });


        dashboardButton.addNavItem({
            name: "Engaged",
            routeID: routeIDss,
            iconClass: "Drop_menu_icon",
            iconUrl: "chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/4.jpg",
            routeParams: {
                jdReee: "barr"
            }
        });

    */

    sdk.Router.handleCustomRoute(routeID, function(routeView) {
        _log(routeView.getParams().jdReq);
        _log(routeView.getParams());
    });


    fetchThreadIdsDetails(user_email);

    setTimeout(
        function() {
            var cancel_repeat_flag = 1;

            var my_label = sdk.Lists.registerThreadRowViewHandler(function(threadView) {

                var current_thread = threadView.getThreadID();

                var backgroud_color = "";
                for (var j = 0; j < thread_ids.length; j++) {
                    if (thread_ids[j] == current_thread) {

                        if (status_ids[j] == "executed") {
                            backgroud_color = "#FFD1DC";
                        } else {
                            backgroud_color = "#BCED91";

                        }

                        threadView.addLabel({
                            title: "Ld Target",
                            foregroundColor: '#ffffff',
                            backgroundColor: backgroud_color,

                        });

                    }

                }

            });

        }, 3000);




    sdk.Toolbars.registerToolbarButtonForThreadView({
        title: 'LD Target',
        iconUrl: 'http://lifedashboard.github.io/lifedashboard.com/target.png',
        iconClass: "target_icon",
        section: 'INBOX_STATE',
        onClick: function(event) {
            enter_count=1; 
            subject = event.threadView.getSubject();
            sender_thread_id = event.threadView.getThreadID();
            sender = event.threadView.getMessageViews()[0].getSender();
               if(chrome_tab_count==1)
               {
               var pop_count_type=0;
               ld_target_counter = ld_target_counter + 1;
               hover_count = hover_count + 1;
               addDetails(pop_count_type,subject, sender.name,sender.emailAddress, sender_thread_id, ld_target_counter, hover_count);
               chrome_tab_count=0;
               }
             else{
               document.getElementById("target_pop_up").style.display = 'block';
               document.getElementById("popup_subject").value = subject;

             }  
            
         

        }

    });


    sdk.Toolbars.registerToolbarButtonForThreadView({
        title: 'Add Text',
        iconClass: "target_icon_2",
        iconUrl: 'http://lifedashboard.github.io/lifedashboard.com/target.png',
        section: 'INBOX_STATE',
        onClick: function(event) {

            var selection;
            if (window.getSelection) {
                selection = window.getSelection();
            } else if (document.selection) {
                selection = document.selection.createRange();
            }

            var final_selection = selection.toString();
            var div = document.getElementById("message_target_blurb");
            var y = document.getElementById("add_text_blurb");
            y.innerHTML = "Text Added Successfully";
            div.style.display = "block";

            setTimeout(function() {
                $('#message_target_blurb').fadeOut('fast');
            }, 3000);
            addTextBlurbToTarget(sender_thread_id, final_selection);

        }

    });


    sdk.Toolbars.registerToolbarButtonForThreadView({
        title: 'on',
        iconClass: "target_icon_1",
        iconUrl: 'http://lifedashboard.github.io/lifedashboard.com/target.png',
        section: 'INBOX_STATE',
        onClick: function(event) {

            if (switch_flag == 0) {

                var y = document.getElementsByClassName("inboxsdk__button_icon target_icon_1");
                y[0].innerHTML = '<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked><label class="onoffswitch-label" for="myonoffswitch"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div>';
                switch_flag = 1;

            } else {

                var y = document.getElementsByClassName("inboxsdk__button_icon target_icon_1");
                y[0].innerHTML = '<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" ><label class="onoffswitch-label" for="myonoffswitch"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div>';
                switch_flag = 0;

            }

        }


    });



    sdk.Conversations.registerThreadViewHandler(function(threadView) {
        if (!$side) {

        
            var x = document.getElementsByClassName("inboxsdk__button_icon target_icon");
            var y = document.getElementsByClassName("inboxsdk__button_icon target_icon_1");
            var z = document.getElementsByClassName("inboxsdk__button_icon target_icon_2");

            x[0].innerHTML = '<p><img class="inboxsdk__button_iconImg" src="http://lifedashboard.github.io/lifedashboard.com/target.png">&nbsp;LD Target</p>';

            z[0].innerHTML = '<p><img class="inboxsdk__button_iconImga" src="http://lifedashboard.github.io/lifedashboard.com/target.png">&nbsp;Add Text</p>';

            y[0].innerHTML = '<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" ><label class="onoffswitch-label" for="myonoffswitch"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div>';


            var main_target_designn = '';


            $side = $('<div class="extension_container_main"><div id="myModals" class="modals"><div class="modals-content"><div class="modal-headers"><span class="closes">&times;</span><h2>Modal Header</h2></div><div class="modal-bodys"><p>Some text in the Modal Body</p><p>Some other text...</p></div><div class="modal-footers"><h3>Modal Footer</h3></div></div></div><div class="text_wrapper"><div class="logout_wrapper"><div id="text_wrapper"></div></div></div><div class="message" id="classify"><p>Class Applied</p></div><div class="message" id="priority_message_id"><p>Priority Added</p></div><div class="message" id="target_name_create"><p>Target Name Update</p></div><div class="message" id="note_name_create"><p>Note Created</p></div><div class="message" id="message_target_create"><p>Target Created</p></div><div id="dummy" class="message"><p>Target already exits</p></div><div class="message" id="message_target_execute"><p>Target Executed</p></div><div class="messageone" id="target_pop_up"><p class="mgb10"><label class="label_name">Subject:</label> <input type="text" name="tr_name" id="popup_subject" class="border_color"/></p><div class="dimension"><div class="column_left"><div class="emailclass"><button id="set_target_type_at_start" value="Target" class="rounded" style="">Target</button></div></div><div class="column_right left_extra"><button id="set_priority_at_start" class="emailPriority" value="1" style="background:#ff7f7f">1</button></div></div><div style="clear:both;"></div><p><a href="javascript:void(0);" id="button_skip" class="button_skip" style="display:none">Skip</a><a href="javascript:void(0);"  id="button_sub" class="button_sub" >Done</a></p></div><div class="message" id="message_target_blurb"><p id="add_text_blurb"></p></div><div id="extn_intro"></div><div class="extension_container"> <div class="app-header"><a href="javascript:void(0)" id="close-icon-btn" class="close-icon-btn"><i class="fa fa-angle-right" aria-hidden="true"></i></a><a href="" target="_blank" class="settings-icon-btn"><i class="fa fa-cog" aria-hidden="true"></i></a><a href="" target="_blank" class=""><span class="profile-icon"><i class="fa fa-user" aria-hidden="true"></i></span></a><a href="javascript:void(0)"  class="pull-left" id="imglogo"><span class="logotype"><div class="logoimage"><img src="http://lifedashboard.github.io/lifedashboard.com/target.png" ></div><div class="logoname"> Life Dashboard</div></span></a></div><div class="custom_side_bar" id="custom_side_bar"><div id="user_Wrap"><p class="user_togle_btn"><span class="user_Title" id="user_names"></span><button></button></p><div class="user_details" id="user_detailsss"><div class="user-left"> <div class="user_img"><img id="user_rank_image"></div><div class="user-label" id="user_score"></div></div><div class="user-right"> <div class="user_name" > <b id="user_name"></b><p class="User_Email" id="User_Email"></p><p class="rank_detail"><span class="Rank_value" id="Rank_value"></span></p></div></div><div style="clear:both;"></div></div> </div><div id="Radar_Wrap"><p class="radar_togle_btn"><span class="Radar_Title">Radar</span><button></button></p><img src="http://lifedashboard.github.io/lifedashboard.com/radar_empty.svg" id="radar_Img" > </div><div class="Completed_Targets"><ul><li><span >Open Targets</span><span id="open_target">--</span></li><li><span>Targets Closed Today</span> <span id="closed_target">--</span></li><li><span>Closed this week</span><span id="closed_this_week">--</span></li><li><span>7 Day AVG</span><span id="avg_target">--</span> </li><li><span>Relative Productivity Score</span><span id="relative_score">--</span></li></ul></div>');
            subject = threadView.getSubject();
            sender_thread_id = threadView.getThreadID();
            sender = threadView.getMessageViews()[0].getSender();
            tmp_sender = sender.name;

            setTimeout(
                function() {



                    var cancel_repeat_flag = 1;

                    fetchRankDetails(user_email);
                    document.getElementById('radar_Img').style.display = 'none';
                    // document.getElementById('widget').style.display = 'block';
                }, 1000);

            setTimeout(
                function() {

                    // var cancel_repeat_flag = 1;
                    // addBarChart(subject, tmp_sender, sender.emailAddress, cancel_repeat_flag, user_email);
                    searchRequestOnServer(subject, tmp_sender, sender.emailAddress);

                    document.getElementById("close-icon-btn").onclick = function(e)

                    {
                        $(".extension_container_main").addClass("intro_hide");
                    }

                    document.getElementById("extn_intro").onclick = function(e)

                    {
                        $(".extension_container_main").removeClass("intro_hide");
                    }



                    $(document).ready(function() {
                        $(".radar_togle_btn ").click(function() {

                            $(".radar_togle_btn > button").toggleClass("togle_btn_bg");
                            $("#radar_Img").slideToggle("slow");
                            if (radar_open_close_count == 0) {
                                document.getElementById('radar_Img').style.display = 'block';
                                radar_open_close_count = 1;

                            } else {
                                document.getElementById('radar_Img').style.display = 'none';
                                radar_open_close_count = 0;


                            }

                        });




                        $(".GraphWidget_togle_btn ").click(function() {
                            $(".GraphWidget_togle_btn > button").toggleClass("togle_btn_bg");
                            $(".widget").slideToggle("slow");
                            if (bar_open_close_count == 0) {
                                document.getElementById('widget').style.display = 'block';
                                bar_open_close_count = 1;

                            } else {
                                document.getElementById('widget').style.display = 'none';
                                bar_open_close_count = 0;


                            }

                        });




                        $(".radar_togle_btnms > button").click(function() {

                            $(".radar_togle_btnms > button").toggleClass("togle_btn_bg");
                            $("#jsGrid").slideToggle("slow");
                            if (radar_open_close_count == 0) {
                                document.getElementById('jsGrid').style.display = 'block';
                                radar_open_close_count = 1;

                            } else {
                                document.getElementById('jsGrid').style.display = 'none';
                                radar_open_close_count = 0;


                            }

                        });

                        document.getElementById("imglogo").onclick = function(e) {
                            window.open("https://dashboard-dot-curious-athlete-131013.appspot.com/");


                        }

                         document.getElementById("button_skip").onclick = function(e) {
                            
                                  var pop_count_type=0;
                                  ld_target_counter = ld_target_counter + 1;
                                  hover_count = hover_count + 1;
                                  addDetails(pop_count_type,subject, sender.name,sender.emailAddress, sender_thread_id, ld_target_counter, hover_count);
                                  thread_ids.push(sender_thread_id);
                                  status_ids.push("active");
                                  document.getElementById("target_pop_up").style.display = 'none'; 
                                   


                        }

                        document.getElementById("button_sub").onclick = function(e) {

                            
                                 
                                  var pop_count_type=1;
                                  popup_subject=document.getElementById("popup_subject").value;
                                  ld_target_counter = ld_target_counter + 1;
                                  hover_count = hover_count + 1;
                                  addDetails(pop_count_type,subject, sender.name, sender.emailAddress, sender_thread_id, ld_target_counter, hover_count);
                                  thread_ids.push(sender_thread_id);
                                  status_ids.push("active");
                                  document.getElementById("popup_subject").value="";
                                  document.getElementById("target_pop_up").style.display = 'none';



                        }






              


                        $(document).on("keyup", function (event) {
                              if (event.which == 13) {
                                  //alert(enter_count);
                                  if(enter_count==1)
                                   {
                                    enter_count=0;
                                  // $("#button_sub").trigger('click');
                                   document.getElementById("button_sub").click();
                                    
                                   }
                                }
                                //alert(enter_count+"  fhdgfsdfyuyu")
                          });



                        document.getElementById("set_priority_at_start").onclick = function(e) {
                           
                            stop_engaged = 1;
                            var value = document.getElementById("set_priority_at_start").value;
                            if (value > 1) {

                                value = parseInt(value) - 1;

                                document.getElementById("set_priority_at_start").innerHTML = value;
                                document.getElementById("set_priority_at_start").value = value;
                            } else {
                                value = 4;
                                value = parseInt(value) + 1;

                                document.getElementById("set_priority_at_start").innerHTML = value;
                                document.getElementById("set_priority_at_start").value = value;
                            }
                            set_priority_at_start = value;


                           

                            e.preventDefault();


                        }


                        document.getElementById("set_target_type_at_start").onclick = function(e)

                        {
                            e.preventDefault();
                            e.stopPropagation();
                            var value = document.getElementById("set_target_type_at_start").value;

                            if (value == "Target") {

                                document.getElementById("set_target_type_at_start").innerHTML = "Threats";
                                document.getElementById("set_target_type_at_start").value = "Threats";
                                document.getElementById("set_target_type_at_start").style.backgroundColor = "maroon";
                              
                                set_target_type_at_start = "Threats";
                              

                            }

                            if (value == "Threats") {

                                document.getElementById("set_target_type_at_start").innerHTML = "Opportunity";
                                document.getElementById("set_target_type_at_start").value = "Opportunity";
                                document.getElementById("set_target_type_at_start").style.backgroundColor = "blue";
                              
                                set_target_type_at_start = "Opportunity";
                               
                            }

                            if (value == "Opportunity") {

                                document.getElementById("set_target_type_at_start").innerHTML = "Knowledge";
                                document.getElementById("set_target_type_at_start").value = "Knowledge";
                                document.getElementById("set_target_type_at_start").style.backgroundColor = "purple";
                                set_target_type_at_start = "Knowledge";
                                

                               
                            }

                            if (value == "Knowledge") {

                                document.getElementById("set_target_type_at_start").innerHTML = "Target";
                                document.getElementById("set_target_type_at_start").value = "Target";
                                document.getElementById("set_target_type_at_start").style.backgroundColor = "green";
                                set_target_type_at_start = "Target";
                                

                            }




                        }




                    });

                }, 3000);



        } else {

            var x = document.getElementsByClassName("inboxsdk__button_icon target_icon");
            x[0].innerHTML = '<p><img class="inboxsdk__button_iconImg" src="http://lifedashboard.github.io/lifedashboard.com/target.png">&nbsp;LD Target</p>';

            if (switch_flag == 1) {

                var y = document.getElementsByClassName("inboxsdk__button_icon target_icon_1");
                y[0].innerHTML = '<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked><label class="onoffswitch-label" for="myonoffswitch"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div>';


            } else {

                var y = document.getElementsByClassName("inboxsdk__button_icon target_icon_1");
                y[0].innerHTML = '<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" ><label class="onoffswitch-label" for="myonoffswitch"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div>';


            }

        }



        threadView.addSidebarContentPanel({
            el: $side.get(0),
            title: '',
            iconUrl: ''
        });

    });


});


function addDetails(pop_count_type,subject, tmp_sender, emailAddress, ld_target_counter, hover_count) {
    saveRequestOnServer(subject, tmp_sender, emailAddress, sender_thread_id, ld_target_counter, hover_count,pop_count_type);
}

function createRequest() {
    try {
        request = new XMLHttpRequest();
    } catch (tryMS) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (otherMS) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                request = null;
            }
        }
    }

    return request;
}



function fetchThreadIdsDetails(user_email) {

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {


        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?user_email=" + user_email + "&query_status=9";


        request.onreadystatechange = function() {

            if (request.readyState == 4) {

                if (request.status == 200) {

                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "No Score") {


                    } else {

                        var json = JSON.parse(request.responseText);

                        for (var j = 0; j < json.length; j++) {
                            thread_ids.push(json[j].thread_id);
                            status_ids.push(json[j].status_name);

                        }


                    }

                }
            }
        };

        request.open("GET", url, true);
        request.send(null);
    }
}

function fetchTargetStats(user_email) {
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {


        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?user_email=" + user_email + "&query_status=01";

        request.onreadystatechange = function() {

            if (request.readyState == 4) {

                if (request.status == 200) {

                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "No Score") {


                    } else {

                        var json = JSON.parse(request.responseText);
                        var open_target = '';
                        var closed_target = '';
                        var closed_this_week = '';
                        var avg_target = '';
                        var relative_score = '';
                        for (var j = 0; j < json.length; j++) {

                            //alert(json);

                            document.getElementById("open_target").innerHTML = json[j].active_count;
                            document.getElementById("closed_target").innerHTML = json[j].closed_count;
                            document.getElementById("closed_this_week").innerHTML = json[j].closed_week_count;
                            document.getElementById("avg_target").innerHTML = Math.round(json[j].average_closed_count);
                            
                           document.getElementById("relative_score").innerHTML = json[j].score;

                            //document.getElementById("relative_score").innerHTML = json[j].score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");



                        }


                    }

                }
            }
        };

        request.open("GET", url, true);
        request.send(null);
    }
}


function fetchRankDetails(user_email) {

  
  var rank_user_name ="";
  var a = document.getElementsByTagName('a');

  for (var idx= 0; idx < a.length; ++idx){
    var final_user_name=a[idx].title;
    if(final_user_name.indexOf(user_email) !== -1)
      {

          
           var break_username=final_user_name.split("(");
           //rank_user_name=break_username[0].trim();
           break_username=break_username[0].split(" ");

           for (var i= 0; i< break_username.length; ++i){
              if(i==0 || i==1)
              {


              }
              else
              {
                    rank_user_name+=break_username[i].trim()+" ";

              }
       
           }
           rank_user_name=rank_user_name.trim();
         
      }


  }


 // var user_name_string_array=document.querySelectorAll("[email=" + CSS.escape(user_email) + "]");
  /*var user_name_string_array=document.querySelectorAll('[role="button"]');
  alert(user_name_string_array.textContent);
  var user_name_i=0;
  for (user_name_i = 0; user_name_i < user_name_string_array.length; user_name_i++) {
      var final_user_name=user_name_string_array[user_name_i].textContent;
      if(final_user_name.indexOf(user_email) !== -1)
      {

           
           var break_username=final_user_name.split("<");
           rank_user_name=break_username[0].trim();

      }
  }*/

    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {


        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?user_email=" + user_email + "&user_name=" + rank_user_name + "&create_date=" + datetime + "&query_status=8";

        request.onreadystatechange = function() {

            if (request.readyState == 4) {

                if (request.status == 200) {

                    var responsedata = request.responseText;
                    //console.log(responsedata);
                    responsedata = responsedata.trim();
                    if (responsedata == "No Score") {


                    } else {

                        var json = JSON.parse(request.responseText);

                        for (var j = 0; j < json.length; j++) {
                            //alert(json[j].rank_image);
                            gmail_user_name = json[j].user_name;
                            document.getElementById("User_Email").innerHTML = json[j].user_email;
                            user_email_id = json[j].user_email;
                            document.getElementById("user_name").innerHTML = json[j].user_name;
                            document.getElementById("user_names").innerHTML = json[j].user_name;
                            document.getElementById("Rank_value").innerHTML = json[j].rank_name;
                            document.getElementById("user_rank_image").src = "chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/" + json[j].rank_image;

                        }

                        fetchTargetStats(user_email);

                    }

                }
            }
        };

        request.open("GET", url, true);
        request.send(null);
    }
}


function searchRequestOnServer(subject, sender, emailAddress) {

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        flag = 0;
        var user_subject = escape(subject);

        var user_sender = escape(sender);
        var user_emailAddress = escape(emailAddress);



        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?sender=" + user_sender + "&subject=" + user_subject + "&email=" + user_emailAddress + "&user_email=" + user_email + "&query_status=2";
        


        request.onreadystatechange = loadTargetsFromServer;

        request.open("GET", url, true);
        request.send(null);
    }


}


function getpriority_id(priority_id, status, selectedPriority, subject, sender, emailAddress) {

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var selectedpriority = selectedPriority;
        var status = status;

        setTimeout(function() {

            if (selectedPriority == stop_priority_count) {

                var url = "https://production-dot-curious-athlete-131013.appspot.com/add?priority_id=" + selectedpriority + "&status=" + status + "&query_status=002&create_date=" + datetime;

                request.onreadystatechange = function() {
                    if (request.readyState == 4) {
                        if (request.status == 200) {
                            var responsedata = request.responseText;
                            responsedata = responsedata.trim();
                            if (responsedata == "Okay") {
                                alert("Some error occur");

                            } else {


                                var div = document.getElementById("priority_message_id");
                                div.style.display = "block";
                                setTimeout(function() {
                                    $('#priority_message_id').fadeOut('fast');
                                }, 3000);
                                document.getElementById(target_shut_count).innerHTML = '';
                                searchRequestOnServer(subject, sender, emailAddress);




                            }

                        }
                    }
                };


                request.open("GET", url, true);
                request.send(null);


            }

        }, 3000);
    }

}




String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
}


function loadTargetsFromServer() {

    target_shut_count = target_list_count + "target_list";

    var main_target_design = '<div id="' + target_shut_count + '" class="ext_he">';
    target_list_count = target_list_count + 1;
    var flag_length = 0;
    var ld_target_counter;

    if (request.readyState == 4) {
        if (request.status == 200) {
            var responsedata = request.responseText;
            responsedata = responsedata.trim();
            if (responsedata == "No Target") {

                json_length = 1;

            } else {

                json = JSON.parse(request.responseText);


                flag_length = json.length;
                var execute_dyanamic_id = "z";
                var target_div_ids = "b";
                var target_div_chlid= target_div_ids + "chlid";
                var classification_id = "c";
                var threats_btn = "e";
                var oppurtunity_btn = "f";
                var noise_btn = "g";
                var actionable_btn = "h";
                var Choose_Options = "i";
                var target_color = "q";
                var journal_1 = "Journal";
                var engact = "engact";
                var Journal_1_data = "Journal-1-data";
                var Journal_1_close = "Journal-1-close";
                var emailPriority = "emailPriority";
                var rounded = "rounded";

                var text_1 = "text_1";
                var table_id = "table_id";

                for (var i = 0, k = 0, j = json.length; i < j; i++, k++) {
      
                    classification_id = "c";
                    threats_btn = "e";
                    oppurtunity_btn = "f";
                    noise_btn = "g";
                    actionable_btn = "h";
                    execute_dyanamic_id = "z";
                    target_div_ids = "b";
                    target_div_chlid= target_div_ids + "chlid";
                    Choose_Options = "i";
                    target_color = "q";
                    journal_1 = "Journal";
                    Journal_1_data = "Journal-1-data";
                    Journal_1_close = "Journal-1-close";
                    emailPriority = "emailPriority";
                    rounded = "rounded";
                    table_id = "table_id";
                    text_1 = "text_1";
                    engact = "engact";
                    flag = flag + 1;
                    var target_name = json[i].target_name;
                    var emailsender = json[i].EmailSender;
                    var create_date = json[i].create_date + "";

                    var date = create_date.toString("yyyyMMddHHmmss").replace(/T/, ' ').replace(/\..+/, '');

                    var auxCopia = date.split(" ");
                    var date1 = auxCopia[0];
                    var array = new Array();
                    array = date1.split('-');
                    var newDateone = (array[1] + "/" + array[2]);
                    var hourone = auxCopia[1];

                    var arrayone = new Array();
                    arrayone = hourone.split(':');
                    var newhourone = (arrayone[0] + ":" + arrayone[1]);

                    var d = new Date();

                    function getFormattedString(d) {
                        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ' ' + d.toString().split(' ')[4];


                    }
                    var dateone = (getFormattedString(d));




                    var timeStart = new Date(date).getTime();

                    var timeEnd = new Date(dateone).getTime();
                    var hourDiff = timeEnd - timeStart; //in ms
                    var secDiff = hourDiff / 1000; //in s
                    var minDiff = hourDiff / 60 / 1000; //in minutes
                    var hDiff = hourDiff / 3600 / 1000; //in hours
                    var humanReadable = {};
                    humanReadable.hours = Math.floor(hDiff);
                    humanReadable.minutes = minDiff - 60 * humanReadable.hours;




                    var priority_id = json[i].priority_id;
                    var status_name = json[i].status_name;

                    if (status_name == "engaged") {
                        var color_codes = "background:Green";
                    }


                    var final_subject = json[i].EmailSubject;

                    var category_name = json[i].classification_name;
                    

                    if (category_name == "default") {
                        var target = "Target";
                    }
                    if (category_name == "Threats") {
                        var target = "Threats";
                    }
                    if (category_name == "Opportunity") {
                        var target = "Opportunity";
                    }

                    if (category_name == "Knowledge") {
                        var target = "Knowledge";
                    }
                    if (category_name == "Target") {
                        var target = "Target";
                    }


                    var color_code = "";
                    var category_counter = 0;
                    if (category_name == "default") {

                    } else {

                        color_code = json[i].color_code;

                        if (color_code == "default") {

                            color_code = "background:Green";
                        }

                        if (color_code == "#b71c1c") {

                            color_code = "background:maroon";
                        }
                        if (color_code == "#2196F3") {

                            color_code = "background:#0000FF";
                        }

                        if (color_code == "#828282") {

                            color_code = "background:#800080";
                        }




                        category_counter = 1;
                    }


                    var emailPrioritycode = "";
                    if (priority_id == "1") {
                        emailPrioritycode = "background:#ff7f7f";
                    }
                    if (priority_id == "2") {
                        emailPrioritycode = "background:#F0E68C";
                    }
                    if (priority_id == "3") {
                        emailPrioritycode = "background:#50D050";
                    }
                    if (priority_id == "4") {
                        emailPrioritycode = "background:#90EE90";
                    }
                    if (priority_id == "5") {
                        emailPrioritycode = "background:#90EE90";
                    }
                    
    


                    var str = final_subject;
  
                    if (str.length > 31) {
                        str = str.substring(0, 31);
                        str = str + "...";
                    }
                    var strone = emailsender;
                    if (strone.length > 15) {
                        strone = strone.substring(0, 15);
                        strone = strone + "....";
                    }

                    var category_nameone = category_name;
                    if (category_nameone.length > 4) {
                        category_nameone = category_nameone.substring(0, 4) + "..";

                    }




                    execute_dyanamic_id = execute_dyanamic_id + k;
                    target_div_ids = target_div_ids + k;
                    target_color = target_color + k;
                    classification_id = classification_id + k;
                    threats_btn = threats_btn + classification_id;
                    oppurtunity_btn = oppurtunity_btn + classification_id;
                    noise_btn = noise_btn + classification_id;
                    actionable_btn = actionable_btn + classification_id;
                    Choose_Options = Choose_Options + classification_id;
                    journal_1 = journal_1 + "-" + k;
                    Journal_1_data = Journal_1_data + k;
                    Journal_1_close = Journal_1_close + k;
                    emailPriority = emailPriority + k;
                    rounded = rounded + k;
                    text_1 = text_1 + k;
                    table_id = table_id + k;
                    engact = engact + k;
                    target_div_chlid=target_div_chlid + k;



                    if (category_counter == 0) {

                        if (target_name == "default") {



                            main_target_design += '<div id="' + target_div_ids + '" class="Button_Wrapper"><div class="burning-btn" ><div id="' + classification_id + '" class="Material_Btn" href="">+</div><div class="Choose_Options" id="' + Choose_Options + '"><div class="Option_Wrap"><ul><li class="Threats_btn" id="' + threats_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Threats.png">Threats</li><li class="oppurtunity_btn" id="' + oppurtunity_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Opportunity.png">Opportunity</li><li class="noise_btn" id="' + noise_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Noise.png">Noise</li><li class="actionable_btn" id="' + actionable_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Actionable.png">Actionable</li></ul></div></div></div><a  id="' + i + '" href="#inbox/' + json[i].target_thread_id + '"  class="button"  ><div class="container"><div class="row"><div class="column-left"><button id="' + emailPriority + '" class="emailPriority" value="' + priority_id + '" style="' + emailPrioritycode + '" >' + priority_id + '</button></div><div class="column-rightone"><div class="emailclass"><button id="' + rounded + '" value="' + target + '" class="rounded" style="' + color_code + '"  >' + target + '</button></div></div><div class="column-center"><div class="engact" id="' + engact + '">' + status_name + '</div></div><div class="column-right"><div class="time">' + humanReadable.hours + 'h</div></div></div><div class="emailtargetmain">' + str + '</div></div></a><div class="button_Groups"><div class="btn_main"><p class="btn_contain"><a href="javascript:void(0);" id="' + execute_dyanamic_id + '">Executed</a><a href="javascript:void(0);"  id="' + text_1 + '" class="hovertext">Text</a><a href="javascript:void(0);" id="' + journal_1 + '">Journal</a></p></div></div><div id="' + Journal_1_data + '" class="Journal-data target_arrow"><div class="action_table_wrapper"><button class="Journal_close" id="' + Journal_1_close + '">x</button><div id="journal_detailss" class="Action_Title">Journal Details</div><div class="table_contain"><table width="100%" border="0" cellspacing="0" cellpadding="0" id="' + table_id + '"></table></div></div></div><div class="text_wrapper" id="'+ target_div_chlid +'" ><div class="logout_wrapper"><div id="text_wrapper"></div></div></div></div>';
                        } else {

                            main_target_design += '<div id="' + target_div_ids + '" class="Button_Wrapper"><div class="burning-btn" ><div id="' + classification_id + '" class="Material_Btn" href="">+</div><div class="Choose_Options" id="' + Choose_Options + '"><div class="Option_Wrap"><ul><li class="Threats_btn" id="' + threats_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Threats.png">Threats</li><li class="oppurtunity_btn" id="' + oppurtunity_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Opportunity.png">Opportunity</li><li class="noise_btn" id="' + noise_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Noise.png">Noise</li><li class="actionable_btn" id="' + actionable_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Actionable.png">Actionable</li></ul></div></div></div><a  id="' + i + '" href="#inbox/' + json[i].target_thread_id + '"  class="button"  ><div class="container"><div class="row"><div class="column-left"><button id="' + emailPriority + '" class="emailPriority" value="' + priority_id + '" style="' + emailPrioritycode + '">' + priority_id + '</button></div><div class="column-rightone"><div class="emailclass"><button id="' + rounded + '" value="' + target + '" class="rounded" style="' + color_code + '"  >' + target + '</button></div></div><div class="column-center"><div class="engact" id="' + engact + '">' + status_name + '</div></div><div class="column-right"><div class="time">' + humanReadable.hours + 'h</div></div></div><div class="emailtargetmain">' + target_name + '</div></div></a><div class="button_Groups"><div class="btn_main"><p class="btn_contain"><a href="javascript:void(0);" id="' + execute_dyanamic_id + '">Executed</a><a href="javascript:void(0);"  id="' + text_1 + '" class="hovertext">Text</a><a href="javascript:void(0);" id="' + journal_1 + '">Journal</a></p></div></div><div id="' + Journal_1_data + '" class="Journal-data target_arrow"><div class="action_table_wrapper"><button class="Journal_close" id="' + Journal_1_close + '">x</button><div id="journal_detailss" class="Action_Title">Journal Details</div><div class="table_contain"><table width="100%" border="0" cellspacing="0" cellpadding="0" id="' + table_id + '"></table></div></div></div><div class="text_wrapper" id="'+ target_div_chlid +'"><div class="logout_wrapper"><div id="text_wrapper"></div></div></div></div>';


                        }
                    } else {
                        if (target_name == "default") {

                            main_target_design += '<div id="' + target_div_ids + '" class="Button_Wrapper"><div class="burning-btn" ><div id="' + classification_id + '" class="Material_Btn" href="">+</div><div class="Choose_Options" id="' + Choose_Options + '"><div class="Option_Wrap"><ul><li class="Threats_btn" id="' + threats_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Threats.png">Threats</li><li class="oppurtunity_btn" id="' + oppurtunity_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Opportunity.png">Opportunity</li><li class="noise_btn" id="' + noise_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Noise.png">Noise</li><li class="actionable_btn" id="' + actionable_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Actionable.png">Actionable</li></ul></div></div></div><a  id="' + i + '" href="#inbox/' + json[i].target_thread_id + '"  class="button" ><div class="container"><div class="row"><div class="column-left"><button id="' + emailPriority + '" class="emailPriority" value="' + priority_id + '" style="' + emailPrioritycode + '">' + priority_id + '</button></div><div class="column-rightone"><div class="emailclass"><button id="' + rounded + '" value="' + target + '" class="rounded" style="' + color_code + '"  >' + target + '</button></div></div><div class="column-center"><div class="engact" id="' + engact + '">' + status_name + '</div></div><div class="column-right"><div class="time">' + humanReadable.hours + 'h</div></div></div><div class="emailtargetmain">' + str + '</div></div></a><div class="button_Groups"><div class="btn_main"><p class="btn_contain"><a href="javascript:void(0);" id="' + execute_dyanamic_id + '">Executed</a><a href="javascript:void(0);"  id="' + text_1 + '" class="hovertext">Text</a><a href="javascript:void(0);" id="' + journal_1 + '">Journal</a></p></div></div><div id="' + Journal_1_data + '" class="Journal-data target_arrow"><div class="action_table_wrapper"><button class="Journal_close" id="' + Journal_1_close + '">x</button><div id="journal_detailss"  class="Action_Title">Journal Details</div><div class="table_contain"><table width="100%" border="0" cellspacing="0" cellpadding="0" id="' + table_id + '"></table></div></div></div><div class="text_wrapper" id="'+ target_div_chlid +'"><div class="logout_wrapper"><div id="text_wrapper"></div></div></div></div>';
                        } else {

                            main_target_design += '<div id="' + target_div_ids + '" class="Button_Wrapper"><div class="burning-btn" ><div id="' + classification_id + '" class="Material_Btn" href="">+</div><div class="Choose_Options" id="' + Choose_Options + '"><div class="Option_Wrap"><ul><li class="Threats_btn" id="' + threats_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Threats.png">Threats</li><li class="oppurtunity_btn" id="' + oppurtunity_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Opportunity.png">Opportunity</li><li class="noise_btn" id="' + noise_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Noise.png">Noise</li><li class="actionable_btn" id="' + actionable_btn + '"><img src="chrome-extension://ognjdemdajaiiolncaganlbcifbacpab/images/Actionable.png">Actionable</li></ul></div></div></div><a  id="' + i + '" href="#inbox/' + json[i].target_thread_id + '"  class="button" ><div class="container"><div class="row"><div class="column-left"><button id="' + emailPriority + '" class="emailPriority" value="' + priority_id + '" style="' + emailPrioritycode + '">' + priority_id + '</button></div><div class="column-rightone"><div class="emailclass"><button id="' + rounded + '" value="' + target + '" class="rounded" style="' + color_code + '"  >' + target + '</button></div></div><div class="column-center"><div class="engact" id="' + engact + '">' + status_name + '</div></div><div class="column-right"><div class="time">' + humanReadable.hours + 'h</div></div></div><div class="emailtargetmain">' + target_name + '</div></div></a><div class="button_Groups"><div class="btn_main"><p class="btn_contain"><a href="javascript:void(0);" id="' + execute_dyanamic_id + '">Executed</a><a href="javascript:void(0);"  id="' + text_1 + '" class="hovertext">Text</a><a href="javascript:void(0);" id="' + journal_1 + '">Journal</a></p></div></div><div id="' + Journal_1_data + '" class="Journal-data target_arrow"><div class="action_table_wrapper"><button class="Journal_close" id="' + Journal_1_close + '">x</button><div id="journal_detailss"  class="Action_Title">Journal Details</div><div class="table_contain"><table width="100%" border="0" cellspacing="0" cellpadding="0" id="' + table_id + '"></table></div></div></div><div class="text_wrapper"  id="'+ target_div_chlid +'"><div class="logout_wrapper"><div id="text_wrapper"></div></div></div></div>';



                        }

                    }




                }
                if (flag == flag_length) {
                    main_target_design += '<div id="Graph_Widget"><p class="GraphWidget_togle_btn"> <span class="Radar_Title">Bar Chart</span> <button></button> </p><div class="widget" id="widget"> <div class="chart_shadow"> <div id="chart" class="chart-container"> <p class="Svg_target"><b>Target</b></p></div><div class="butns_wrapper"><a href="" class="butns_left"><span class="active_btn color_btn"></span>active</a><a href="" class="butns_left"><span class="engaged_btn color_btn"></span>inactive</a><a href="" class="butns_left"><span class="executed_btn color_btn"></span>engaged</a><a href="" class="butns_left"><span class="inactive_btn color_btn"></span>executed</a></div></div></div></div></div><div id="Radar_Wrapererd"><p class="radar_togle_btnms"><span class="Radar_Titler">Target List</span><button></button></p><div id="jsGrid"></div></div><div class="form-wrapper cf"><input type="text" placeholder="Target name..." required><button type="submit">Search</button></div></div>';

                    $side.append(main_target_design);


                    setTimeout(
                        function() {



                            var cancel_repeat_flag = 1;
                            addBarChart(subject, tmp_sender, sender.emailAddress, cancel_repeat_flag, user_email);


                        }, 1000);


                    for (var i = 0, k = 0, j = json.length; i < j; i++, k++) {
                        execute_dyanamic_id = "z";
                        target_div_ids = "b";
                        classification_id = "c";
                        threats_btn = "e";
                        oppurtunity_btn = "f";
                        noise_btn = "g";
                        actionable_btn = "h";
                        Choose_Options = "i";
                        target_color = "q";
                        journal_1 = "Journal";
                        Journal_1_data = "Journal-1-data";
                        Journal_1_close = "Journal-1-close";
                        emailPriority = "emailPriority";
                        rounded = "rounded";
                        table_id = "table_id";
                        text_1 = "text_1";
                        engact = "engact";
                        execute_dyanamic_id = execute_dyanamic_id + k;
                        target_div_ids = target_div_ids + k;
                        target_color = target_color + k;
                        classification_id = classification_id + k;
                        threats_btn = threats_btn + classification_id;
                        oppurtunity_btn = oppurtunity_btn + classification_id;
                        noise_btn = noise_btn + classification_id;
                        actionable_btn = actionable_btn + classification_id;
                        Choose_Options = Choose_Options + classification_id;
                        journal_1 = journal_1 + "-" + k;
                        Journal_1_data = Journal_1_data + k;
                        Journal_1_close = Journal_1_close + k;
                        emailPriority = emailPriority + k;
                        rounded = rounded + k;
                        table_id = table_id + k;
                        text_1 = text_1 + k;
                        engact = engact + k;


                        if (clone_sender == json[i].sender_name && clone_subject == json[i].EmailSubject && clone_email == json[i].EmailSender) {
                            unique_exits_box_id = i;

                        }

                        createDynamicEvent(json[i].target_id, json[i].EmailSubject, json[i].sender_name, json[i].EmailSender, i, execute_dyanamic_id, target_div_ids, threats_btn, oppurtunity_btn, noise_btn, actionable_btn, classification_id, Choose_Options, target_color, journal_1, Journal_1_data, Journal_1_close, table_id, text_1, json[i].target_thread_id, json[i].status, json[i].priority_id, emailPriority, rounded, engact);

                    }
                    $(".GraphWidget_togle_btn ").click(function() {
                        $(".GraphWidget_togle_btn > button").toggleClass("togle_btn_bg");
                        $(".widget").slideToggle("slow");
                        if (bar_open_close_count == 0) {
                            document.getElementById('widget').style.display = 'block';
                            bar_open_close_count = 1;

                        } else {
                            document.getElementById('widget').style.display = 'none';
                            bar_open_close_count = 0;


                        }

                    });



                }

            }


        }
    }

}


function createDynamicEvent(target_id, subject, tempe_sender, tempe_sender_email, count, execute_dyanamic_id, target_div_ids, threats_btn, oppurtunity_btn, noise_btn, actionable_btn, classification_id, Choose_Options, target_color, journal_1, Journal_1_data, Journal_1_close, table_id, text_1, target_thread_id, status, priority_id, emailPriority, rounded, engact) {

    var temp_subject = subject;
    var ld_target_counter;
    var selected;
    var threats_btn = threats_btn;
    var oppurtunity_btn = oppurtunity_btn;
    var noise_btn = noise_btn;
    var actionable_btn = actionable_btn;
    var classification_id = classification_id;
    var journal_1 = journal_1;
    var Journal_1_data = Journal_1_data;
    var Journal_1_close = Journal_1_close;
    var emailPriority = emailPriority;
    var rounded = rounded;
    var table_id = table_id;
    var target_id = target_id;
    var text_1 = text_1;
    var target_thread_id = target_thread_id;
    var status = status;
    var priority_id = priority_id;
    var engact = engact;




    document.getElementById(text_1).onclick = function() {

        var jour_id = "#" + Journal_1_data;
        $(jour_id).addClass("Data-Show");
        getText(target_thread_id, table_id);



    }



    document.getElementById(journal_1).onclick = function() {

        var jour_id = "#" + Journal_1_data;

        $(jour_id).addClass("Data-Show");
        getJournal(table_id, target_id);

    }



    document.getElementById(emailPriority).onclick = function(e) {

        stop_engaged = 1;
        var value = document.getElementById(emailPriority).value;
        if (value > 1) {

            value = parseInt(value) - 1;

            document.getElementById(emailPriority).innerHTML = value;
            document.getElementById(emailPriority).value = value;
        } else {
            value = 4;
            value = parseInt(value) + 1;

            document.getElementById(emailPriority).innerHTML = value;
            document.getElementById(emailPriority).value = value;
        }
        var selectedPriorityone = value;

        getpriority_id(priority_id, status, selectedPriorityone, clone_subject, clone_sender, clone_email);

        stop_priority_count = selectedPriorityone;




        e.preventDefault();


    }


    document.getElementById(rounded).onclick = function(e)

    {
        e.preventDefault();
        e.stopPropagation();
        var value = document.getElementById(rounded).value;

        if (value == "Target") {

            document.getElementById(rounded).innerHTML = "Threats";
            document.getElementById(rounded).value = "Threats";
            document.getElementById(rounded).style.backgroundColor = "maroon";
            var classify_name = "Threats";
            stop_target_type_counter = "Threats";
            applyClassification(subject, tempe_sender, tempe_sender_email, user_email, classify_name);

        }

        if (value == "Threats") {

            document.getElementById(rounded).innerHTML = "Opportunity";
            document.getElementById(rounded).value = "Opportunity";
            document.getElementById(rounded).style.backgroundColor = "blue";
            var classify_name = "Opportunity";
            stop_target_type_counter = "Opportunity";
            applyClassification(subject, tempe_sender, tempe_sender_email, user_email, classify_name);
        }

        if (value == "Opportunity") {

            document.getElementById(rounded).innerHTML = "Knowledge";
            document.getElementById(rounded).value = "Knowledge";
            document.getElementById(rounded).style.backgroundColor = "purple";
            stop_target_type_counter = "Knowledge";
            var classify_name = "Knowledge";

            applyClassification(subject, tempe_sender, tempe_sender_email, user_email, classify_name);
        }

        if (value == "Knowledge") {

            document.getElementById(rounded).innerHTML = "Target";
            document.getElementById(rounded).value = "Target";
            document.getElementById(rounded).style.backgroundColor = "green";
            var classify_name = "Target";
            stop_target_type_counter = "Target";
            applyClassification(subject, tempe_sender, tempe_sender_email, user_email, classify_name);

        }




    }

    document.getElementById(Journal_1_close).onclick = function() {
        var jour_id = "#" + Journal_1_data;

        $(jour_id).removeClass("Data-Show");


    }


    document.getElementById(threats_btn).onclick = function() {

        Choose_Options_clone = "#" + Choose_Options;
        //$(Choose_Options_clone).hide();
        target_color_clone = count;
        document.getElementById(target_color_clone).style.background = "#b71c1c";
        var classify_name = "Threats";
        applyClassification(subject, tempe_sender, tempe_sender_email, user_email, classify_name);


    }


    document.getElementById(oppurtunity_btn).onclick = function() {

        Choose_Options_clone = "#" + Choose_Options;
        //$(Choose_Options_clone).hide();
        target_color_clone = count;
        document.getElementById(target_color_clone).style.background = "#2196F3";
        var classify_name = "Opportunity";
        applyClassification(subject, tempe_sender, tempe_sender_email, user_email, classify_name);

    }


    document.getElementById(noise_btn).onclick = function() {

        Choose_Options_clone = "#" + Choose_Options;
        target_color_clone = count;
        document.getElementById(target_color_clone).style.background = "#828282";
        var classify_name = "Noise";
        applyClassification(subject, tempe_sender, tempe_sender_email, user_email, classify_name);

    }


    document.getElementById(actionable_btn).onclick = function() {

        Choose_Options_clone = "#" + Choose_Options;
        // $(Choose_Options_clone).hide();
        target_color_clone = count;
        document.getElementById(target_color_clone).style.background = "#4CAF50";
        var classify_name = "Actionable";
        applyClassification(subject, tempe_sender, tempe_sender_email, user_email, classify_name);

    }

    document.getElementById(execute_dyanamic_id).onclick = function() {

        var duration_score = '00:00';
        clone_sender = tempe_sender;
        clone_subject = subject;
        clone_email = tempe_sender_email;
        markItExecuted(subject, tempe_sender, tempe_sender_email, duration_score);
        var div = document.getElementById("message_target_execute");
        div.style.display = "block";
        setTimeout(function() {
            $('#message_target_execute').fadeOut('fast');
        }, 3000);


    }

    var er = engact;
    var main_var = "bchlid" + count;
   

    document.getElementById(count).onclick = function(e)


    {


        if (stop_engaged == 0) {

            var buttonone = "#" + count;

            $(buttonone).toggleClass("greenbutton", "no_highlight");

            $(function() {


                if ($(buttonone).hasClass("greenbutton")) {

                    markItEngaged(subject, tempe_sender, tempe_sender_email);
                    document.getElementById(main_var).style.display="block";

                    var element = document.getElementById(er);
                    element.innerHTML = 'engaged';



                } 


                else {




                    var final_seconds = seconds_time.toString();
                    duration_score = final_seconds.toHHMMSS();
                    document.getElementById("text_wrapper").innerHTML = '';
                    markItActive(subject, tempe_sender, tempe_sender_email, duration_score);
                   document.getElementById(main_var).style.display="none";



                    
                    var element = document.getElementById(er);
                    element.innerHTML = 'active';


                }
            });




            unique_exits_box_id = count;
            clone_sender = tempe_sender;
            clone_subject = subject;
            clone_email = tempe_sender_email;

            if (priority_id == 1) {
                var selectedone = '';
            } else {
                var selectedone = '<option value="1" >1</option>';
            }

            if (priority_id == 2) {
                var selectedtwo = '';
            } else {
                var selectedtwo = '<option value="2">2</option>';
            }
            if (priority_id == 3) {
                var selectedthree = '';
            } else {
                var selectedthree = '<option value="3">3</option>';
            }
            if (priority_id == 4) {
                var selectedfour = '';
            } else {
                var selectedfour = '<option value="4">4</option>';
            }
            if (priority_id == 5) {
                var selectedfive = '';
            } else {
                var selectedfive = '<option value="5">5</option>';
            }
 var accordionone="accordion" +count;
 var accordiononenote ="accordionnote" +count;
 var target_note = "target_note" +count;
 var labelone="label" +count;
 var styleone="style-3" +count;
            document.getElementById(main_var).innerHTML = '<div class="border"><button class="accordion '+accordionone+'"><img class="inboxsdk__button_iconImg" src="http://lifedashboard.github.io/lifedashboard.com/target.png" ><span class="targetdetail">Target Details</span></button><div class="panel"><div class="subject_panel" id="subject_panel">' + subject + '</div><input type="text" name="name" id="target_names" value="" tabindex="1" placeholder="Enter note..." class="lineinpu" /><div class="dyamnicbt"> <a href="javascript:void(0);" class="radar_meter_share" >Share</a><div id="share_data" class="share-data target_arrows "><div class="action_table_wrappersc"><button class="share_close" id="share-close">x</button><div id="share_detailss" class="Action_Title">Resource List<button class="share_open" id="share-open">+</button><div id="share_data_open" class="share-data-open target_arrow"><div class="action_table_wrappershare_open"><button class="share_open_close" id="share-open-close">x</button><div id="share_detailss" class="Action_Title_share">Contact Detail</div><div class="table_contain_share_open"> <form ><label for="Cname">Contact Name</label><input type="text" name="Contact_Name" placeholder="Contact Name...." id="RCname" ><label for="Cemail">Contact Email</label><input type="email" name="Cemail" placeholder="Contact Email...." id="RCemail"><label for="Contact_Type">Contact Type</label><select name="Contact_Type" id="RContact_Type"><option value="resources">Resource</option>p</select><input type="button" value="Create Contact" class="contactbutton" id="create_contact_resource"></form></div></div></div></div><div class="table_contain"><table width="100%" border="0" cellspacing="0" cellpadding="0" id="share-ids"></table></div></div></div><a href="javascript:void(0);" class="radar_meter_client" >Client</a><div id="client_data" class="client-data target_arrows "><div class="action_table_wrappersc"><button class="client_close" id="client-close">x</button><div id="client_detailss" class="Action_Title">Client List<button class="client_open" id="client-open">+</button><div id="client_data_open" class="client-data-open target_arrow"><div class="action_table_wrapperclient_open"><button class="client_open_close" id="client-open-close">x</button><div id="client_detailss" class="Action_Title_client">Client Detail</div><div class="table_contain_client_open"> <form><label for="Cname">Contact Name</label><input type="text" id="Cname" name="Contact_Name" placeholder="Contact Name...."><label for="Cemail">Contact Email</label><input type="email" id="Cemail" name="Contact_Email" placeholder="Contact Email...."><label for="Contact_Type">Contact Type</label><select id="Contact_Type" name="Contact_Type"><option value="client">Client</option></select><input type="button" id="contact_button" value="Create Contact" class="contactbutton" ></form></div></div></div></div><div class="table_contain"><table width="100%" border="0" cellspacing="0" cellpadding="0" id="client_ids"></table></div></div></div><a href="javascript:void(0);" class="radar_meter_logout" >Logout</a><a href="javascript:void(0);" class="radar_meter_execute" >Executed</a></div><div class="wrapper-demo"><div id="dd" class="wrapper-dropdown-3 active" tabindex="1"><span class="trainglemainclass">Class</span><span class="traingle">&#9660</span></div><div class="wrapper-dropdown-2"><div class="Priority">Priority</div><select id="year" class="country"><option value="" id="one"> ' + priority_id + ' </option>' + selectedone + '' + selectedtwo + '' + selectedthree + '' + selectedfour + '' + selectedfive + ' </select></div></div><div id="menu_data_open" class="menu-data-open  "><div class="action_table_wrappermenu_open"><button class="menu_open_close" id="menu-open-close">x</button><div id="menu_detailss" class="Action_Title_menu"></div><div class="mainpoint"><ul><li class="Threats_btn" id="threat"><div class="colorbutton" style="background-color: rgb(157, 19, 0);"></div>Threats</li><li class="oppurtunity_btn" id="oppurtunity" ><div class="colorbutton" style="background-color:#2196F3;"></div>Opportunity</li><li class="noise_btn" id="noise"><div class="colorbutton" style="background-color: #ccc;"></div>Noise</li><li class="actionable_btn" id="actionable"><div class="colorbutton" style="background-color: green;"></div>Actionable</li></ul></div></div></div><input type="text" id="example_emailSUI" name="example_emailSUI" class="form-control" value="" placeholder="Input email addresses"></div></div><div class="border"><button class="accordionnote '+accordiononenote+'"><img class="inboxsdk__button_iconImg" src="http://lifedashboard.github.io/lifedashboard.com/target.png" ><span class="targetdetail">Notes</span></button><div class="panel"><div  class="notedeatil notedeatil_notes_section"><div><div class="note__box_notes note-textfield note-textfield--plaintextOnly note-textfield--multiline note-textfield--fullWidth note-textfield--noBottomPadding note-textfield--noTopPadding"><div class="note-textfield__input" id="'+target_note+'" contenteditable="true" spellcheck="true" style="max-height: 250px;"></div><label class="note-textfield--label note-textfield--label-placeholder" id="'+labelone+'">Enter notes...</label></div></div></div><div class="scrollbar style-3" id="'+styleone+'"></div></div></div></div></div></div></div></div></div></div></div></div><div class="border"><button class="contatctab"><img class="inboxsdk__button_iconImg" src="http://lifedashboard.github.io/lifedashboard.com/target.png" ><span class="targetdetailone">Contact</span></button><div class="panels"><div class="maincontctalist" id="contact_list"></div></div>';

            setTimeout(
                function() {

                    fetchRankDetails(user_email);


                }, 1000);

            setTimeout(
                function() {
                    var cancel_repeat_flag = 1;

                    document.getElementById("contact_button").onclick = function(e)

                    {
                        var contact_name = document.getElementById("Cname").value;
                        var contact_email = document.getElementById("Cemail").value;
                        var contact_type = document.getElementById("Contact_Type").value;
                        var clone_sender = tempe_sender;
                        var clone_subject = subject;
                        var clone_email = tempe_sender_email;
                        var user_id = user_email_id;
                        createContact(contact_name, contact_email, contact_type, clone_email, clone_subject, clone_sender, user_id);
                    }

                    document.getElementById("target_names").onchange = function(e)

                    {
                        var target_value = document.getElementById("target_names").value;
                        createTargetName(target_value, clone_email, clone_subject, clone_sender, user_email, count);
                    }




                    document.getElementById(target_note)

                        .addEventListener("keyup", function(event) {
                            event.preventDefault();
                            var label = "";
                            label = document.getElementById(target_note).innerHTML;
                            label = label.toString();
                           
                            if (label == "") {

                                document.getElementById(labelone).style.display = "block";
                            } else {
                                document.getElementById(labelone).style.display = "none";
                            }

                            if (event.keyCode == 13) {
                                var target_value = ""
                                target_value = document.getElementById(target_note).innerHTML;
                                target_value = target_value.toString();


                                addTextBlurbToTargetone(target_thread_id, target_value,target_note,labelone,styleone);
                            }

                        });




                    document.getElementById("oppurtunity").onclick = function() {


                        document.getElementById(count).style.background = "#2196F3";
                        var classify_name = "Opportunity";
                        var div = document.getElementById("classify");
                        div.style.display = "block";
                        setTimeout(function() {
                            $('#classify').fadeOut('fast');
                        }, 3000);
                        applyClassification(clone_subject, clone_sender, clone_email, user_email, classify_name);
                        var menu_open_id = "#menu_data_open";
                        $(menu_open_id).removeClass("menu-Show-open");
                    }


                    document.getElementById("noise").onclick = function() {

                        document.getElementById(count).style.background = "#828282";
                        var classify_name = "Noise";
                        var div = document.getElementById("classify");
                        div.style.display = "block";
                        setTimeout(function() {
                            $('#classify').fadeOut('fast');
                        }, 3000);
                        applyClassification(clone_subject, clone_sender, clone_email, user_email, classify_name);
                        var menu_open_id = "#menu_data_open";
                        $(menu_open_id).removeClass("menu-Show-open");
                    }


                    document.getElementById("actionable").onclick = function() {

                        document.getElementById(count).style.background = "#4CAF50";
                        var classify_name = "Actionable";
                        var div = document.getElementById("classify");
                        div.style.display = "block";
                        setTimeout(function() {
                            $('#classify').fadeOut('fast');
                        }, 3000);
                        applyClassification(clone_subject, clone_sender, clone_email, user_email, classify_name);
                        var menu_open_id = "#menu_data_open";
                        $(menu_open_id).removeClass("menu-Show-open");
                    }
                    var accs = document.getElementsByClassName("contatctab");
                    accs[0].onclick = function() {
                        getContactList(clone_subject, clone_sender, clone_email, user_email);
                        this.classList.toggle("actives");
                        var panel = this.nextElementSibling;

                        if (panel.style.maxHeight) {

                            panel.style.maxHeight = null;
                        } else {
                            panel.style.maxHeight = panel.scrollHeight + "100%";
                        }
                    }

                    var acc = document.getElementsByClassName(accordionone);
                    acc[0].onclick = function() {

                        this.classList.toggle("active");
                        var panel = this.nextElementSibling;

                        if (panel.style.maxHeight) {

                            panel.style.maxHeight = null;
                        } else {
                            panel.style.maxHeight = panel.scrollHeight + "px";

                        }
                    }
                    var m = document.getElementsByClassName(accordiononenote);
                    m[0].onclick = function() {

                        this.classList.toggle("active");
                        var a = this.nextElementSibling;
                        if (a.style.maxHeight) a.style.maxHeight = null;
                        else {
                            a.style.maxHeight = a.scrollHeight + 400 + "px";

                            getText(target_thread_id, styleone);
                        }
                    };



                    document.getElementById("dd").onclick = function() {

                        var menu_open_id = "#menu_data_open";


                        $(menu_open_id).addClass("menu-Show-open");

                    }




                    document.getElementById("menu-open-close").onclick = function() {

                        var menu_open_id = "#menu_data_open";


                        $(menu_open_id).removeClass("menu-Show-open");


                    }


                    $(document).ready(function() {
                        $("select.country").change(function() {
                            var selectedPriority = $(".country option:selected").val();
                            getpriority_id(priority_id, status, selectedPriority, clone_subject, clone_sender, clone_email);
                        });
                    });

                    document.getElementById('one').style.display = "none";




                    $(function() {

                        $('#example_emailBS').multiple_emails({
                            position: "bottom"
                        });


                        $('#example_emailBS').change(function() {

                        });
                    });


                    $(function() {

                        $('#example_emailSUI').multiple_emails({
                            theme: "SemanticUI"
                        });



                        $('#example_emailSUI').change(function() {

                        });
                    });


                    $(function() {

                        $('#example_emailB').multiple_emails({
                            theme: "Basic"
                        });



                        $('#example_emailB').change(function() {

                        });
                    });


                    document.getElementById("create_contact_resource").onclick = function(e)

                    {
                        var contact_name = document.getElementById("RCname").value;
                        var contact_email = document.getElementById("RCemail").value;
                        var contact_type = document.getElementById("RContact_Type").value;
                        var clone_sender = tempe_sender;
                        var clone_subject = subject;
                        var clone_email = tempe_sender_email;
                        var user_id = user_email_id;
                        createContactResources(contact_name, contact_email, contact_type, clone_email, clone_subject, clone_sender, user_id);
                    }

                    document.getElementById("close-icon-btn").onclick = function(e)

                    {
                        $(".extension_container_main").addClass("intro_hide");
                    }

                    document.getElementById("extn_intro").onclick = function(e)

                    {
                        $(".extension_container_main").removeClass("intro_hide");
                    }




                }, 3000);


            shut_green_box_counter == 1;
            $side.on('click', 'a.radar_meter_execute', function() {
                clone_subject_for_execute = subject;
                clone_sender_for_execute = tempe_sender;
                clone_email_for_execute = tempe_sender_email;
                shut_green_box_counter = 0;

                var final_seconds = seconds_time.toString();
                duration_score = final_seconds.toHHMMSS();
                document.getElementById("text_wrapper").innerHTML = '';

                markItExecuted(subject, tempe_sender, tempe_sender_email, duration_score);
                var div = document.getElementById("message_target_execute");
                div.style.display = "block";
                setTimeout(function() {
                    $('#message_target_execute').fadeOut('fast');
                }, 3000);
            });

            $side.on('click', 'a.radar_meter_logout', function() {

                var final_seconds = seconds_time.toString();
                duration_score = final_seconds.toHHMMSS();
                document.getElementById("text_wrapper").innerHTML = '';
                markItActive(subject, tempe_sender, tempe_sender_email, duration_score);
            });

            $side.on('click', 'a.radar_meter_share', function() {

                var share_id = "#share_data";
                $(share_id).addClass("share-Show");
                var table_id = "share-ids";
                getResources(table_id, subject, tempe_sender, tempe_sender_email);

            });



            $side.on('click', 'a.radar_meter_client', function() {
                var client_id = "#client_data";
                $(client_id).addClass("client-Show");
                var table_id = "client_ids";
                getClients(table_id, subject, tempe_sender, tempe_sender_email);
            });

            document.getElementById("client-close").onclick = function() {
                var client_id = "#client_data";
                $(client_id).removeClass("client-Show");



            }

            document.getElementById("share-open").onclick = function()

            {

                var share_open_id = "#share_data_open";

                $(share_open_id).addClass("share-Show-open");




            }


            document.getElementById("share-close").onclick = function() {
                var share_id = "#share_data";
                $(share_id).removeClass("share-Show");



            }

            document.getElementById("share-open-close").onclick = function() {
                var share_open_id = "#share_data_open";

                $(share_open_id).removeClass("share-Show-open");



            }

            document.getElementById("client-open").onclick = function() {
                var client_open_id = "#client_data_open";

                $(client_open_id).addClass("client-Show-open");




            }
            document.getElementById("client-open-close").onclick = function() {
                var share_open_id = "#client_data_open";

                $(share_open_id).removeClass("client-Show-open");



            }




        }

        stop_engaged = 0;

    }
}


function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDown.prototype = {
    initEvents: function() {
        var obj = this;

        obj.dd.on('click', function(event) {
            $(this).toggleClass('active');
            return false;
        });

        obj.opts.on('click', function() {
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
        });
    },
    getValue: function() {
        return this.val;
    },
    getIndex: function() {
        return this.index;
    }
}



function markItActive(subject, sender, emailAddress, duration_score) {

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var user_subject = escape(subject);
        var user_sender = escape(sender);
        var user_emailAddress = escape(emailAddress);
        var duration_score = escape(duration_score);

        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?sender=" + user_sender + "&subject=" + user_subject + "&email=" + user_emailAddress + "&user_email=" + user_email + "&query_status=5&create_date=" + datetime + "&duration_score=" + duration_score;

        request.onreadystatechange = function() {

            if (request.readyState == 4)
                if (request.status == 200) {

                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "Status Changed") {

                        setTimeout(
                            function() {
                                var cancel_repeat_flag = 1;

                                fetchRankDetails(user_email);


                            }, 1000);



                        setTimeout(
                            function() {
                                var cancel_repeat_flag = 1;

                                document.getElementById("close-icon-btn").onclick = function(e)

                                {
                                    $(".extension_container_main").addClass("intro_hide");
                                }

                                document.getElementById("extn_intro").onclick = function(e)

                                {
                                    $(".extension_container_main").removeClass("intro_hide");
                                }


                                addBarChart_1(subject, sender, emailAddress, user_email);

                            }, 3000);



                    } else {

                    }

                }

        };

        request.open("GET", url, true);
        request.send(null);
    }
}



function markItExecuted(subject, sender, emailAddress, duration_score) {
    if (clone_subject == subject && clone_sender == sender && clone_email == emailAddress) {
        request = createRequest();
        if (request == null)
            alert("Unable to create request");
        else {

            var user_subject = escape(subject);
            var user_sender = escape(sender);
            var user_emailAddress = escape(emailAddress);
            var duration_score = escape(duration_score);
            var currentdate = new Date();
            var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            var url = "https://production-dot-curious-athlete-131013.appspot.com/add?sender=" + user_sender + "&subject=" + user_subject + "&email=" + user_emailAddress + "&user_email=" + user_email + "&query_status=3&create_date=" + datetime + "&duration_score=" + duration_score;
            request.onreadystatechange = function() {
                if (request.readyState == 4) {

                    if (request.status == 200) {
                        var responsedata = request.responseText;
                        responsedata = responsedata.trim();
                        if (responsedata == "Target executed") {
  
                            document.getElementById(target_shut_count).innerHTML = '';
                            searchRequestOnServer(subject, sender, emailAddress);
                            setTimeout(
                                function() {
                                    var cancel_repeat_flag = 1;

                                    fetchRankDetails(user_email);
                                    //alert("done");

                                }, 1000);


                            setTimeout(
                                function() {
                                    var cancel_repeat_flag = 1;
                                    document.getElementById("close-icon-btn").onclick = function(e)

                                    {
                                        $(".extension_container_main").addClass("intro_hide");
                                    }

                                    document.getElementById("extn_intro").onclick = function(e)

                                    {
                                        $(".extension_container_main").removeClass("intro_hide");
                                    }

                                    addBarChart_1(subject, sender, emailAddress, user_email);

                                }, 3000);


                        } else {

                        }

                    }
                }
            };

            request.open("GET", url, true);
            request.send(null);
        }

    }
}

function addTextBlurbToTarget(sender_thread_id, selection,) {


    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var sender_thread_id = escape(sender_thread_id);
        var selection = selection;

        var url = "https://datastore-dot-curious-athlete-131013.appspot.com/add?target_text_blurb=" + selection + "&target_thread_id=" + sender_thread_id + "&query_status=1";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {

                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "Successfully Saved") {
                        var b = document.getElementById("note_name_create");
                        b.style.display = "block";
                        setTimeout(function() {
                            $("#note_name_create").fadeOut("fast");

                        }, 3000);
                        document.getElementById(target_note).innerHTML = "";
                        document.getElementById("label0").style.display = "block";
                        document.getElementById("style-30").innerHTML = "";
                        getText(sender_thread_id, "style-30");

                    } else {

                    }

                }
            }
        };

        request.open("GET", url, true);
        request.send(null);
    }

}

function addTextBlurbToTargetone(sender_thread_id, selection,target_note,labelone,styleone) {



    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var sender_thread_id = escape(sender_thread_id);
        var selection = selection;

        var url = "https://datastore-dot-curious-athlete-131013.appspot.com/add?target_text_blurb=" + selection + "&target_thread_id=" + sender_thread_id + "&query_status=1";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {

                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "Successfully Saved") {
                        var b = document.getElementById("note_name_create");
                        b.style.display = "block";
                        setTimeout(function() {
                            $("#note_name_create").fadeOut("fast");

                        }, 3000);
                        document.getElementById(target_note).innerHTML = "";
                        document.getElementById(labelone).style.display = "block";
                        document.getElementById(styleone).innerHTML = "";
                        getText(sender_thread_id, styleone);

                    } else {

                    }

                }
            }
        };

        request.open("GET", url, true);
        request.send(null);
    }

}
function saveRequestOnServer(subject, sender, emailAddress, sender_thread_id, ld_target_counter, hover_count,pop_count_type) {
    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
    
        var user_subject = escape(subject);
        var user_sender = escape(sender);
        var user_emailAddress = escape(emailAddress);
        var sender_thread_id = escape(sender_thread_id);
        var tempe_sender = sender;
        var tempe_sender_email = emailAddress;
        var target_name = target_name;
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var pop_count_type=pop_count_type;
        if(pop_count_type==0)
        {

         var url = "https://production-dot-curious-athlete-131013.appspot.com/add?sender=" + user_sender + "&subject=" + user_subject + "&email=" + user_emailAddress + "&user_email=" + user_email + "&sender_thread_id=" + sender_thread_id + "&create_date=" + datetime + "&query_status=1&request_type="+pop_count_type;

        }
        else
        {
           
        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?sender=" + user_sender + "&subject=" + user_subject + "&email=" + user_emailAddress + "&user_email=" + user_email + "&sender_thread_id=" + sender_thread_id + "&create_date=" + datetime + "&query_status=1&popup_target_name="+popup_subject+"&popup_priority="+set_priority_at_start+"&popup_target_type="+set_target_type_at_start+"&request_type="+pop_count_type;

        }

  
        request.onreadystatechange = function() {
            if (request.readyState == 4) {

                if (request.status == 200) {
                    var responsedata = request.responseText;
                    if (responsedata == "Success") {
                        if (shut_green_box_counter == 1) {


                            $side.empty();
                            $side.prepend('<div><img src="http://lifedashboard.github.io/lifedashboard.com/radar_empty.svg"></div>');
                            searchRequestOnServer(subject, tempe_sender, tempe_sender_email);
                            setTimeout(function() {

                                document.getElementById(unique_exits_box_id).click();
                            }, 1000);

                        } else {



                            if (json_length == 1) {
                                json_length = 0;
                                
                            } else {
                                document.getElementById(target_shut_count).innerHTML = '';

                            }

                            searchRequestOnServer(subject, tempe_sender, tempe_sender_email);
                            setTimeout(
                                function() {

                                    fetchRankDetails(user_email);


                                }, 1000);


                            setTimeout(
                                function() {
                                    var cancel_repeat_flag = 1;

                                    document.getElementById("close-icon-btn").onclick = function(e)

                                    {
                                        $(".extension_container_main").addClass("intro_hide");
                                    }

                                    document.getElementById("extn_intro").onclick = function(e)

                                    {
                                        $(".extension_container_main").removeClass("intro_hide");
                                    }
                                
                                    addBarChart_1(subject, sender, emailAddress, user_email);

                                }, 3000);

                        }


                        var div = document.getElementById("message_target_create");
                        div.style.display = "block";
                        setTimeout(function() {
                            $('#message_target_create').fadeOut('fast');
                        }, 3000);


                    } else if (responsedata == "Target already exits") {
                        var div = document.getElementById("dummy");
                        div.style.display = "block";
                        setTimeout(function() {
                            $('#dummy').fadeOut('fast');
                        }, 3000);

                    } else {



                    }
                }
            }
        };

        request.open("GET", url, true);
        request.send(null);
    }
}

function getContactList(subject, tempe_sender, tempe_sender_email, user_email) {
    main_header_html = '';
    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var user_subject = escape(subject);
        var user_sender = escape(tempe_sender);
        var user_emailAddress = escape(tempe_sender_email);
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?sender=" + user_sender + "&subject=" + user_subject + "&email=" + user_emailAddress + "&user_email=" + user_email + "&query_status=001&create_date=" + datetime;
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "No Contact") {



                    } else {

                        json = JSON.parse(request.responseText);

                        for (var i = 0, j = json.length; i < j; i++) {

                            var x = json[i].fullname;
                            var first_char = x.charAt(0);

                            main_header_html += '<div class="treak__teamContact treak__conservativeHorizontalFlex"><div class="treak__imageInfoCard treak__conservativeHorizontalFlex"><span class="mdl-color--teals mdl-color-text--white mdl-avatar mdl-avatar--medium">' + first_char + '</span><div class="treak__imageInfoCard_textWrapper"><div class="streak__imageInfoCard_text">' + json[i].fullname + '</div><div class="treak__imageInfoCard_secondaryText">' + json[i].gmail_address + '</div></div></div></div>';


                        }

                        document.getElementById("contact_list").innerHTML = main_header_html;




                    }

                }
            }
        };


        request.open("GET", url, true);
        request.send(null);
    }
}



function applyClassification(subject, tempe_sender, tempe_sender_email, user_email, classify_name) {

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var user_subject = escape(subject);
        var user_sender = escape(tempe_sender);
        var user_emailAddress = escape(tempe_sender_email);
        var classification_name = escape(classify_name);
        var selectedTargetType = classify_name;
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

        setTimeout(function() {

            if (selectedTargetType == stop_target_type_counter) {

                var url = "https://production-dot-curious-athlete-131013.appspot.com/add?sender=" + user_sender + "&subject=" + user_subject + "&email=" + user_emailAddress + "&user_email=" + user_email + "&classification_name=" + classification_name + "&query_status=10&create_date=" + datetime;
                request.onreadystatechange = function() {
                    if (request.readyState == 4) {
                        if (request.status == 200) {
                            var responsedata = request.responseText;
                            responsedata = responsedata.trim();
                            setTimeout(
                                function() {
                                    var cancel_repeat_flag = 1;

                                    fetchTargetStats(user_email);
                                  
                                }, 1000);
                            if (responsedata == "Saved") {

                            } else {




                            }

                        }
                    }
                };


                request.open("GET", url, true);
                request.send(null);

            }

        }, 3000);
    }
}

function createTargetName(target_value, clone_email, clone_subject, clone_sender,
    user_id, count) {

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var target_without_space = target_value;
        var target_value = escape(target_value);
        var clone_email = escape(clone_email);
        var clone_subject = escape(clone_subject);
        var clone_sender = escape(clone_sender);
        var user_id = escape(user_id);
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?sender=" + clone_sender + "&subject=" + clone_subject + "&email=" + clone_email + "&user_email=" + user_id + "&target_value=" + target_value + "&query_status=08&create_date=" + datetime;
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "Target updated") {
                        var div = document.getElementById("target_name_create");
                        div.style.display = "block";
                        setTimeout(function() {
                            $('#target_name_create').fadeOut('fast');
                        }, 3000);

                        //  document.getElementById("subject_pane").innerHTML=target_without_space;
                        document.getElementById(count).innerHTML = target_without_space;
                        document.getElementById("target_names").value = "Enter the Target Name";
                    } else {

                        alert("Some Error occur. Please try again");

                    }

                }
            }
        };


        request.open("GET", url, true);
        request.send(null);
    }

}


function createContact(contact_name, contact_email, contact_type, clone_email, clone_subject, clone_sender,
    user_id) {

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var contact_name = escape(contact_name);
        var contact_email = escape(contact_email);
        var contact_type = escape(contact_type);
        var clone_email = escape(clone_email);
        var clone_subject = escape(clone_subject);
        var clone_sender = escape(clone_sender);
        var user_id = escape(user_id);
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?sender=" + clone_sender + "&subject=" + clone_subject + "&email=" + clone_email + "&user_email=" + user_id + "&contact_name=" + contact_name + "&contact_email=" + contact_email + "&contact_type=" + contact_type + "&query_status=04&create_date=" + datetime;
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "Contact Created") {
                        alert("Contact Created");
                        document.getElementById("Cname").value = '';
                        document.getElementById("Cemail").value = '';
                        document.getElementById("client-close").click();
                        document.getElementById("client-open-close").click();
                    } else {

                        alert("Some Error occur. Please try again");

                    }

                }
            }
        };


        request.open("GET", url, true);
        request.send(null);
    }

}



function createContactResources(contact_name, contact_email, contact_type, clone_email, clone_subject, clone_sender, user_id) {

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var contact_name = escape(contact_name);
        var contact_email = escape(contact_email);
        var contact_type = escape(contact_type);
        var clone_email = escape(clone_email);
        var clone_subject = escape(clone_subject);
        var clone_sender = escape(clone_sender);
        var user_id = escape(user_id);
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?sender=" + clone_sender + "&subject=" + clone_subject + "&email=" + clone_email + "&user_email=" + user_id + "&contact_name=" + contact_name + "&contact_email=" + contact_email + "&contact_type=" + contact_type + "&query_status=06&create_date=" + datetime;
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "Contact Created") {
                        alert("Contact Created");
                        document.getElementById("RCname").value = '';
                        document.getElementById("RCemail").value = '';
                        document.getElementById("share-close").click();
                        document.getElementById("share-open-close").click();
                    } else {

                        alert("Some Error occur. Please try again");

                    }

                }
            }
        };


        request.open("GET", url, true);
        request.send(null);
    }

}




function getClients(table_id, subject, tempe_sender, tempe_sender_email) {
    var main_header_html = '<tbody>';

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var subject = escape(subject);
        var tempe_sender = escape(tempe_sender);
        var tempe_sender_email = escape(tempe_sender_email);

        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?sender=" + tempe_sender + "&subject=" + subject + "&email=" + tempe_sender_email + "&user_email=" + user_email + "&query_status=05";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "No Contacts") {


                    } else {


                        var targetcenter = "targetcenter";
                        json = JSON.parse(request.responseText);

                        for (var i = 0, j = json.length; i < j; i++) {
                            if (json[i].contct_type == "client" && json[i].visibility == "inactive") {
                                targetcenter = targetcenter + i;
                                main_header_html += '<tr class="clientmaincontact"><td  class="contcat"><button class="centerdata" id="' + targetcenter + '">+</button></td><td align="left" valign="middle" class="center">' + json[i].fullname + '</td></tr>';
                            }

                        }
                        main_header_html += '</tbody>';


                        document.getElementById(table_id).innerHTML = main_header_html;

                        var targetcenter = "targetcenter";
                        for (var i = 0, j = json.length; i < j; i++) {


                            if (json[i].contct_type == "client") {
                                targetcenter = targetcenter + i;
                                subjectcenter = json[i].fullname;

                                gettarget(targetcenter, json[i].target_id, json[i].contact_id);

                            }

                        }


                    }

                }
            }



        };


        request.open("GET", url, true);
        request.send(null);
    }


}



function gettarget(i, target_id, contact_id) {

    document.getElementById(i).onclick = function(e) {

        updateContact(target_id, contact_id);

    }

}


function updateContact(target_id, contact_id) {

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var target_id = escape(target_id);
        var contact_id = escape(contact_id);
        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?target_id=" + target_id + "&contact_id=" + contact_id + "&query_status=09";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "contact update") {
                        alert("Contact Added");
                    } else {

                        alert("Some Error occur. Please try again");

                    }

                }
            }
        };


        request.open("GET", url, true);
        request.send(null);
    }

}



function getResources(table_id, subject, tempe_sender, tempe_sender_email) {
    var main_header_html = '<tbody>';

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var subject = escape(subject);
        var tempe_sender = escape(tempe_sender);
        var tempe_sender_email = escape(tempe_sender_email);

        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?sender=" + tempe_sender + "&subject=" + subject + "&email=" + tempe_sender_email + "&user_email=" + user_email + "&query_status=07";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "No Contacts") {



                    } else {



                        json = JSON.parse(request.responseText);

                        for (var i = 0, j = json.length; i < j; i++) {
                            if (json[i].contct_type == "resources") {


                                main_header_html += '<tr><td align="left" valign="middle" class="center ">' + json[i].fullname + '</td></tr>';

                            }
                        }
                        main_header_html += '</tbody>';
                        document.getElementById(table_id).innerHTML = main_header_html;

                    }

                }
            }



        };


        request.open("GET", url, true);
        request.send(null);
    }




}


function getJournal(table_id, target_id) {
    document.getElementById("journal_detailss").innerHTML = "Journal Details";
    var main_header_html = '<tr><th align="left" valign="middle">User</th><th align="left" valign="middle">Action</th><th align="left" valign="middle">Date and Time</th></tr>';

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var target_id = escape(target_id);
        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?target_id=" + target_id + "&query_status=0";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "Not Journal") {



                    } else {



                        json = JSON.parse(request.responseText);

                        for (var i = 0, j = json.length; i < j; i++) {

                            var date_first = json[i].create_date;
                            date_first = date_first.split("T");
                            var date_second = date_first[1].split(".");

                            main_header_html += '<tr><td align="left" valign="middle">' + gmail_user_name + '</td><td align="left" valign="middle">' + json[i].action + '</td><td align="left" valign="middle">' + date_first[0] + " " + date_second[0] + '</td></tr>';


                        }

                        document.getElementById(table_id).innerHTML = main_header_html;

                    }

                }
            }



        };


        request.open("GET", url, true);
        request.send(null);
    }


}



function getText(target_thread_id, table_id) {

    var main_header_html = "";

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var target_id = escape(target_id);
        var url = "https://datastore-dot-curious-athlete-131013.appspot.com/add?query_status=2";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "Not Journal") {



                    } else {
                        var togglein = "togglein";
                        var myModal = "myModal";
                        var close = "close";
                        var hovernote = "hovernote";
                        var save = "save";
                        var deletes = "delete";
                        json = JSON.parse(request.responseText);


                        for (var i = 0, j = json.length; i < j; i++) {

                            if (json[i].thread_id == target_thread_id) {

                                togglein = togglein + i;
                                myModal = myModal + i;
                                close = close + i;
                                hovernote = hovernote + i;
                                save = save + i;
                                deletes = deletes + i;
                                var ye = json[i].Text_selected;
                                var str = ye.replace(/\s[[&\/\\#,+()$~%'":*?<>{}|]/g, "").replace(/  +/g, ' ').replace(/\%2C/g, ',').replace(/\%0A/g, '<br />').replace(/\%20/g, ' ').replace('%A0', '').replace('%3A', ':');
                                var h = str.replace(/<br\s*[\/]?>/gi, " ");
                                var noterlistdata = h;
                                if (noterlistdata.length > 25) {
                                    noterlistdata = noterlistdata.substring(0, 25);
                                    noterlistdata += "....";
                                }
                                 var notetargetone = "notetarget" +i;
                          
                                main_header_html += '<div class="notetarget '+notetargetone+' "><div class="mtnote" id="' + hovernote + '"><div class="notein" id="' + togglein + '">' + noterlistdata + '</div><div id="' + myModal + '" class="modal"><div class="modal-content"><div class="modal-header"><span class="' + close + '" id="close">&times;</span><h2 class="notetext">' + noterlistdata + '</h2></div><div class="modal-body"><div class="modaltextarea"><textarea name="styled-textarea" id="styled">' + ye + '</textarea></div><div class="modaltime">13 minutes ago -<a href="javascript:void(0);" id="' + save + '" class="save">Save</a>-<a href="javascript:void(0);" class="delete" id="' + deletes + '">Delete</a></div></div><div class="modal-footer"><h2></h2></div></div></div></div></div>';
                            }

                        } 

                        

                  document.getElementById(table_id).innerHTML = main_header_html;

                        setTimeout(
                            function() {
                                togglein = "togglein";
                                myModal = "myModal";
                                close = "close";
                                hovernote = "hovernote";
                                save = "save";
                                deletes = "delete";
                                for (var i = 0, j = json.length; i < j; i++) {
                                    if (json[i].thread_id == target_thread_id) {
                                        togglein = togglein + i;
                                        myModal = myModal + i;
                                        close = close + i;
                                        hovernote = hovernote + i;
                                        save = save + i;
                                        deletes = deletes + i;


                                        settextblurbmodal(myModal, togglein, close, hovernote, save, deletes);



                                    }



                                }

                            }, 1000);



                    }

                }
            }



        };


        request.open("GET", url, true);
        request.send(null);
    }


}

function settextblurbmodal(myModal, togglein, close, hovernote, save, deletes) {

    var myModal = document.getElementById(myModal);

    var togglein = document.getElementById(togglein);


    var close = document.getElementsByClassName(close)[0];
    var hovernote = document.getElementById(hovernote);
    var aap = document.getElementsByClassName("aap")[0];
    var aaq = document.getElementsByClassName("aaq")[0];
    var save = save;
    document.getElementById(save).onclick = function() {

    }

    togglein.onclick = function() {
        myModal.style.display = "block";
        hovernote.style.background = "#DCDCDC";
        aap.style.display = "none";
        aaq.style.display = "none";
    }

    // When the user clicks on <span> (x), close the modal
    close.onclick = function() {
        myModal.style.display = "none";
        hovernote.style.background = "none";
        aap.style.display = "inline-block";
        aaq.style.display = "inline-block";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == myModal) {
            myModal.style.display = "none";
        }
    }

}


function markItEngaged(subject, sender, emailAddress) {
    var y = document.getElementsByClassName("inboxsdk__button_icon target_icon_1");
    y[0].innerHTML = '<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked><label class="onoffswitch-label" for="myonoffswitch"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div>';
    switch_flag = 1;

    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var user_subject = escape(subject);
        var user_sender = escape(sender);
        var user_emailAddress = escape(emailAddress);
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?sender=" + user_sender + "&subject=" + user_subject + "&email=" + user_emailAddress + "&user_email=" + user_email + "&query_status=4&create_date=" + datetime;
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var x = document.getElementsByClassName("inboxsdk__button_icon target_icon");
                    x[0].innerHTML = '<p><img class="inboxsdk__button_iconImg" src="http://lifedashboard.github.io/lifedashboard.com/target.png">&nbsp;LD Target</p>';
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    addBarChart_1(subject, sender, emailAddress, user_email);
                    if (responsedata == "Target Engaged") {

                    } else {



                    }

                }
            }
        };


        request.open("GET", url, true);
        request.send(null);
    }
}

function addBarChart(subject, sender, emailAddress, cancel_repeat_flag, user_email) {
    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?user_email=" + user_email + "&query_status=6";

        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "Okay") {


                    } else {

                        var json = JSON.parse(request.responseText);
                        drawBarChart(json, subject, tmp_sender, sender.emailAddress, cancel_repeat_flag, user_email);
                    }

                }
            }
        };


        request.open("GET", url, true);
        request.send(null);
    }
}





function addBarChart_1(subject, sender, emailAddress, user_email) {
    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {
        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?user_email=" + user_email + "&query_status=6";

        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "Okay") {


                    } else {
                        
                        var bar_svd_id = svg_counter_id + "svg_id";

                      
                       
                        //b.style.display = "none";
                        svg_counter_id = svg_counter_id + 1;
                        var json = JSON.parse(request.responseText);

                        drawBarChart_1(json, subject, tmp_sender, sender.emailAddress, user_email);
                        
document.getElementById(bar_svd_id).style.visibility = "hidden";
                    }

                }
            }
        };


        request.open("GET", url, true);
        request.send(null);
    }
}






function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

function createTargetFilterGrid(select_day) {
    request = createRequest();
    if (request == null)
        alert("Unable to create request");
    else {

        var url = "https://production-dot-curious-athlete-131013.appspot.com/add?bar_chart_day=" + select_day + "&user_email=" + user_email + "&query_status=7";

        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var responsedata = request.responseText;
                    responsedata = responsedata.trim();
                    if (responsedata == "Okay") {


                    } else {

                        var json = JSON.parse(request.responseText);
                        drawTargetTableGrid(json);
                    }

                }
            }
        };


        request.open("GET", url, true);
        request.send(null);
    }

}

function drawTargetTableGrid(json) {




    $(function() {

        $("#jsGrid").jsGrid({
            height: "2%",
            width: "100%",
            autoload: true,
            pageSize: 7,
            pageButtonCount: 3,
            data: json,
            fields: [{
                    name: "Target",
                    type: "text",
                    width: 70
                },
                {
                    name: "Sender",
                    type: "text",
                    width: 30
                }
            ]
        });

    });


    var k = 0;
    var accor = document.getElementsByClassName("jsgrid-row");

    for (var i = 0; i < accor.length; i++)

    {

        setClickOnEvenTarget(accor[i], json[k]);
        k = k + 2;

    }

    var k = 1;
    var accors = document.getElementsByClassName("jsgrid-alt-row");

    for (var i = 0; i < accors.length; i++) {

        setClickOnOddTarget(accors[i], json[k]);
        k = k + 2;

    }


}

function setClickOnEvenTarget(accor, i) {

    accor.onclick = function() {


        openTargetDetailByTarget(i.Target, i.Sender);

    }

}


function setClickOnOddTarget(accor, i) {

    accor.onclick = function() {

        openTargetDetailByTarget(i.Target, i.Sender)

    }

}


function openTargetDetailByTarget(subject, sender) {


    clone_sender = sender;
    clone_subject = subject;

    document.getElementById("text_wrapper").innerHTML = '<div class="border"><button class="accordion"><img class="inboxsdk__button_iconImg" src="http://lifedashboard.github.io/lifedashboard.com/target.png" ><span class="targetdetail">Target Detail</span></button><div class="panel"><div class="subject_panel" id="subject_panel">' + subject + '</div><input type="text" name="name" id="target_names" value="" tabindex="1" placeholder="Enter the Target Name" class="lineinpu" /><div class="dyamnicbt"> <a href="javascript:void(0);" class="radar_meter_share" >Share</a><div id="share_data" class="share-data target_arrow "><div class="action_table_wrappersc"><button class="share_close" id="share-close">x</button><div id="share_detailss" class="Action_Title">Resource List<button class="share_open" id="share-open">+</button><div id="share_data_open" class="share-data-open target_arrows"><div class="action_table_wrappershare_open"><button class="share_open_close" id="share-open-close">x</button><div id="share_detailss" class="Action_Title_share">Contact Detail</div><div class="table_contain_share_open"> <form ><label for="Cname">Contact Name</label><input type="text" name="Contact_Name" placeholder="Contact Name...." id="RCname" ><label for="Cemail">Contact Email</label><input type="email" name="Cemail" placeholder="Contact Email...." id="RCemail"><label for="Contact_Type">Contact Type</label><select name="Contact_Type" id="RContact_Type"><option value="resources">Resource</option>p</select><input type="button" value="Create Contact" class="contactbutton" id="create_contact_resource"></form></div></div></div></div><div class="table_contain"><table width="100%" border="0" cellspacing="0" cellpadding="0" id="share-ids"></table></div></div></div><a href="javascript:void(0);" class="radar_meter_client" >Client</a><div id="client_data" class="client-data target_arrows "><div class="action_table_wrappersc"><button class="client_close" id="client-close">x</button><div id="client_detailss" class="Action_Title">Client List<button class="client_open" id="client-open">+</button><div id="client_data_open" class="client-data-open target_arrow"><div class="action_table_wrapperclient_open"><button class="client_open_close" id="client-open-close">x</button><div id="client_detailss" class="Action_Title_client">Client Detail</div><div class="table_contain_client_open"> <form><label for="Cname">Contact Name</label><input type="text" id="Cname" name="Contact_Name" placeholder="Contact Name...."><label for="Cemail">Contact Email</label><input type="email" id="Cemail" name="Contact_Email" placeholder="Contact Email...."><label for="Contact_Type">Contact Type</label><select id="Contact_Type" name="Contact_Type"><option value="client">Client</option></select><input type="button" id="contact_button" value="Create Contact" class="contactbutton" ></form></div></div></div></div><div class="table_contain"><table width="100%" border="0" cellspacing="0" cellpadding="0" id="client_ids"></table></div></div></div><a href="javascript:void(0);" class="radar_meter_logout" >Logout</a><a href="javascript:void(0);" class="radar_meter_execute" >Executed</a></div><div class="wrapper-demo"><div id="dd" class="wrapper-dropdown-3 active" tabindex="1"><span class="traingle">&#9660</span><span>Class</span><div class="colorbutton" style="background-color: rgb(250, 87, 60);"></div></div></div><div id="menu_data_open" class="menu-data-open  "><div class="action_table_wrappermenu_open"><button class="menu_open_close" id="menu-open-close">x</button><div id="menu_detailss" class="Action_Title_menu"></div><div class="mainpoint"><ul><li class="Threats_btn" id="threat"><div class="colorbutton" style="background-color: rgb(157, 19, 0);"></div>Threats</li><li class="oppurtunity_btn" id="oppurtunity" ><div class="colorbutton" style="background-color:#2196F3;"></div>Opportunity</li><li class="noise_btn" id="noise"><div class="colorbutton" style="background-color: #ccc;"></div>Noise</li><li class="actionable_btn" id="actionable"><div class="colorbutton" style="background-color: green;"></div>Actionable</li></ul></div></div></div><input type="text" id="example_emailSUI" name="example_emailSUI" class="form-control" value="" placeholder="Input email addresses"></div><div class="border"><button class="contatctab"><img class="inboxsdk__button_iconImg" src="http://lifedashboard.github.io/lifedashboard.com/target.png" ><span class="targetdetailone">Contact</span></button><div class="panels"></div>';

    setTimeout(
        function() {

            fetchRankDetails(user_email);


        }, 1000);

    setTimeout(
        function() {
            var cancel_repeat_flag = 1;

            document.getElementById("contact_button").onclick = function(e)

            {
                var contact_name = document.getElementById("Cname").value;
                var contact_email = document.getElementById("Cemail").value;
                var contact_type = document.getElementById("Contact_Type").value;
                var clone_sender = sender;
                var clone_subject = subject;
                var user_id = user_email_id;
            }

            document.getElementById("target_names").onchange = function(e)

            {
                var target_value = document.getElementById("target_names").value;
            }

            document.getElementById("threat").onclick = function() {

                document.getElementById(count).style.background = "#b71c1c";
                var classify_name = "Threats";
                var div = document.getElementById("classify");
                div.style.display = "block";
                setTimeout(function() {
                    $('#classify').fadeOut('fast');
                }, 3000);
                var menu_open_id = "#menu_data_open";
                $(menu_open_id).removeClass("menu-Show-open");

            }


            document.getElementById("oppurtunity").onclick = function() {


                document.getElementById(count).style.background = "#2196F3";
                var classify_name = "Opportunity";
                var div = document.getElementById("classify");
                div.style.display = "block";
                setTimeout(function() {
                    $('#classify').fadeOut('fast');
                }, 3000);
                var menu_open_id = "#menu_data_open";
                $(menu_open_id).removeClass("menu-Show-open");
            }


            document.getElementById("noise").onclick = function() {

                document.getElementById(count).style.background = "#828282";
                var classify_name = "Noise";
                var div = document.getElementById("classify");
                div.style.display = "block";
                setTimeout(function() {
                    $('#classify').fadeOut('fast');
                }, 3000);
                var menu_open_id = "#menu_data_open";
                $(menu_open_id).removeClass("menu-Show-open");
            }


            document.getElementById("actionable").onclick = function() {

                document.getElementById(count).style.background = "#4CAF50";
                var classify_name = "Actionable";
                var div = document.getElementById("classify");
                div.style.display = "block";
                setTimeout(function() {
                    $('#classify').fadeOut('fast');
                }, 3000);
                var menu_open_id = "#menu_data_open";
                $(menu_open_id).removeClass("menu-Show-open");
            }


            var acc = document.getElementsByClassName("accordion");
            acc[0].onclick = function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }

            var acc = document.getElementsByClassName("accordiong");
            acc[0].onclick = function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }



            document.getElementById("dd").onclick = function() {

                var menu_open_id = "#menu_data_open";


                $(menu_open_id).addClass("menu-Show-open");

            }

            document.getElementById("menu-open-close").onclick = function() {

                var menu_open_id = "#menu_data_open";


                $(menu_open_id).removeClass("menu-Show-open");


            }




            $(function() {

                $('#example_emailBS').multiple_emails({
                    position: "bottom"
                });

                $('#example_emailBS').change(function() {

                });
            });


            $(function() {

                $('#example_emailSUI').multiple_emails({
                    theme: "SemanticUI"
                });


                $('#example_emailSUI').change(function() {

                });
            });


            $(function() {

                $('#example_emailB').multiple_emails({
                    theme: "Basic"
                });


                $('#example_emailB').change(function() {

                });
            });


            document.getElementById("create_contact_resource").onclick = function(e)

            {
                var contact_name = document.getElementById("RCname").value;
                var contact_email = document.getElementById("RCemail").value;
                var contact_type = document.getElementById("RContact_Type").value;
                var clone_sender = sender;
                var clone_subject = subject;
                var user_id = user_email_id;
            }

            document.getElementById("close-icon-btn").onclick = function(e)

            {
                $(".extension_container_main").addClass("intro_hide");
            }

            document.getElementById("extn_intro").onclick = function(e)

            {
                $(".extension_container_main").removeClass("intro_hide");
            }

        }, 3000);


    shut_green_box_counter == 1;
    $side.on('click', 'a.radar_meter_execute', function() {

        clone_subject_for_execute = subject;
        clone_sender_for_execute = sender;
        shut_green_box_counter = 0;

        var final_seconds = seconds_time.toString();
        duration_score = final_seconds.toHHMMSS();
        document.getElementById("text_wrapper").innerHTML = '';
        var div = document.getElementById("message_target_execute");
        div.style.display = "block";
        setTimeout(function() {
            $('#message_target_execute').fadeOut('fast');
        }, 3000);
    });

    $side.on('click', 'a.radar_meter_logout', function() {

        var final_seconds = seconds_time.toString();
        duration_score = final_seconds.toHHMMSS();
        document.getElementById("text_wrapper").innerHTML = '';
    });

    $side.on('click', 'a.radar_meter_share', function() {

        var share_id = "#share_data";
        $(share_id).addClass("share-Show");
        var table_id = "share-ids";
        getResources(table_id, subject, tempe_sender, tempe_sender_email);

    });
    $side.on('click', 'a.radar_meter_client', function() {
        var client_id = "#client_data";
        $(client_id).addClass("client-Show");
        var table_id = "client_ids";
    });

    document.getElementById("client-close").onclick = function() {
        var client_id = "#client_data";
        $(client_id).removeClass("client-Show");

    }

    document.getElementById("share-open").onclick = function()

    {
        var share_open_id = "#share_data_open";
        $(share_open_id).addClass("share-Show-open");

    }


    document.getElementById("share-close").onclick = function() {
        var share_id = "#share_data";
        $(share_id).removeClass("share-Show");

    }

    document.getElementById("share-open-close").onclick = function() {
        var share_open_id = "#share_data_open";

        $(share_open_id).removeClass("share-Show-open");

    }

    document.getElementById("client-open").onclick = function() {
        var client_open_id = "#client_data_open";

        $(client_open_id).addClass("client-Show-open");

    }
    document.getElementById("client-open-close").onclick = function() {
        var share_open_id = "#client_data_open";

        $(share_open_id).removeClass("client-Show-open");
    }
}

function drawBarChart(json, subject, sender, emailAddress, cancel_repeat_flag, user_email) {

    dataset = [];
    // alert(json);
    var targetexecutedArray = [];
    var curr = new Date;
    var last = curr.getDate();
    var first = last - 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    var start = firstday.getDay();
    var end = lastday.getDay();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";


    var target_active = 0;
    var target_executed = 0;
    var target_engaged = 0;
    var target_inactive = 0;
    var target_created = 0;
    for (var i = 0, k = start; i < weekday.length; i++) {
        target_created = 0;
        target_executed = 0;
        target_engaged = 0;
        target_inactive = 0;
        target_active = 0;

        for (var j = 0; j < json.length; j++) {

            if (json[j].day == k) {

                target_created = target_created + 1;
                if (json[j].executed == "executed") {

                    target_executed = target_executed + 1;


                } else if (json[j].executed == "engaged") {

                    target_engaged = target_engaged + 1;
                } else if (json[j].executed == "active") {
                    target_active = target_active + 1;

                } else if (json[j].executed == "inactive") {
                    target_inactive = target_inactive + 1;

                }


            }

        }

        dataset.push({
            label: weekday[k],
            "Active": target_active,
            "Inactive": target_inactive,
            "Engaged": target_engaged,
            "Executed": target_executed
        });


        targetexecutedArray.push(target_created);
        if (k > 5) {
            k = 0

        } else {
            k++;
        }

    }


    var margin = {
            top: (parseInt(d3.select('#widget').style('height'), 10) / 20),
            right: (parseInt(d3.select('#widget').style('width'), 10) / 20),
            bottom: (parseInt(d3.select('#widget').style('height'), 10) / 6),
            left: (parseInt(d3.select('#widget').style('width'), 10) / 20)
        },
        width = parseInt(d3.select('#widget').style('width'), 10) - margin.left - margin.right,
        height = parseInt(d3.select('#widget').style('height'), 10) - margin.top - margin.bottom;
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1, .3);
    var y = d3.scale.linear()
        .rangeRound([height, 0]);
    var svg_id = svg_counter_id + "svg_id";
    var colorRange = d3.scale.category20();
    var color = d3.scale.ordinal()
        .range(colorRange.range());
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));
    var svg = d3.select("#chart").append("svg")
        .attr("id", svg_id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var divTooltip = d3.select("#widget").append("div").attr("class", "toolTip");
    color.domain(d3.keys(dataset[0]).filter(function(key) {
        return key !== "label";
    }));
    dataset.forEach(function(d) {
        var y0 = 0;
        d.values = color.domain().map(function(name) {
            return {
                name: name,
                y0: y0,
                y1: y0 += +d[name]
            };
        });
        d.total = d.values[d.values.length - 1].y1;
    });
    x.domain(dataset.map(function(d) {
        return d.label;
    }));
    y.domain([0, d3.max(dataset, function(d) {
        return d.total;
    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 9)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Total Targets %");
    var bar = svg.selectAll(".label")
        .data(dataset)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) {
            return "translate(" + x(d.label) + ",0)";
        })
        .on("click", function(d, i) {

            createTargetFilterGrid(select_day);

            document.getElementById('Radar_Wrapererd').style.display = 'block';
        });
    svg.selectAll(".x.axis .tick text")
        .call(wrap, x.rangeBand());

    var bar_enter = bar.selectAll("rect")
        .data(function(d) {
            return d.values;
        })
        .enter();

    bar_enter.append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) {
            return y(d.y1);
        })
        .attr("height", function(d) {
            return y(d.y0) - y(d.y1);
        })
        .style("fill", function(d) {
            return color(d.name);
        });

    bar_enter.append("text")
        .text(function(d) {
            return d3.format(".2s")(d.y1 - d.y0) + "%";
        })
        .attr("y", function(d) {
            return y(d.y1) + (y(d.y0) - y(d.y1)) / 2;
        })
        .attr("x", x.rangeBand() / 3)
        .style("fill", '#ffffff');

    bar.on("mousemove", function(d) {
        select_day = d.label;
        divTooltip.style("left", +100 + "px");
        divTooltip.style("top", +20 + "px");
        divTooltip.style("display", "inline-block");
        var elements = document.querySelectorAll(':hover');
        l = elements.length
        l = l - 1
        element = elements[l].__data__
        value = element.y1 - element.y0
        divTooltip.html((d.label) + "<br>" + element.name + " -: " + value + "");
    });
    bar.on("mouseout", function(d) {
        divTooltip.style("display", "none");
    });
    bar.on("onclick", function(d) {

    });
    svg.append("g")
        .attr("class", "legendLinear")
        .attr("transform", "translate(0," + (height + 30) + ")");
    var legend = d3.legend.color()
        .shapeWidth(height / 4)
        .shapePadding(10)
        .orient('horizontal')
        .scale(color);
    svg.select(".legendLinear")
        .call(legend);
    /* if (cancel_repeat_flag == 0) {

     } else {
         searchRequestOnServer(subject, sender, emailAddress);
     }
    */
    fetchTargetStats(user_email);
}



function drawBarChart_1(json, subject, sender, emailAddress, user_email) {

    dataset = [];

    var targetexecutedArray = [];
    var curr = new Date;
    var last = curr.getDate();
    var first = last - 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    var start = firstday.getDay();
    var end = lastday.getDay();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";


    var target_active = 0;
    var target_executed = 0;
    var target_engaged = 0;
    var target_inactive = 0;
    var target_created = 0;
    for (var i = 0, k = start; i < weekday.length; i++) {
        target_created = 0;
        target_executed = 0;
        target_engaged = 0;
        target_inactive = 0;
        target_active = 0;

        for (var j = 0; j < json.length; j++) {

            if (json[j].day == k) {

                target_created = target_created + 1;
                if (json[j].executed == "executed") {

                    target_executed = target_executed + 1;


                } else if (json[j].executed == "engaged") {

                    target_engaged = target_engaged + 1;
                } else if (json[j].executed == "active") {
                    target_active = target_active + 1;

                } else if (json[j].executed == "inactive") {
                    target_inactive = target_inactive + 1;

                }


            }

        }

        dataset.push({
            label: weekday[k],
            "Active": target_active,
            "Inactive": target_inactive,
            "Engaged": target_engaged,
            "Executed": target_executed
        });


        targetexecutedArray.push(target_created);
        if (k > 5) {
            k = 0

        } else {
            k++;
        }

    }


    var margin = {
            top: (parseInt(d3.select('#widget').style('height'), 10) / 20),
            right: (parseInt(d3.select('#widget').style('width'), 10) / 20),
            bottom: (parseInt(d3.select('#widget').style('height'), 10) / 6),
            left: (parseInt(d3.select('#widget').style('width'), 10) / 20)
        },
        width = parseInt(d3.select('#widget').style('width'), 10) - margin.left - margin.right,
        height = parseInt(d3.select('#widget').style('height'), 10) - margin.top - margin.bottom;
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1, .3);
    var y = d3.scale.linear()
        .rangeRound([height, 0]);
    var svg_id = svg_counter_id + "svg_id";
    var colorRange = d3.scale.category20();
    var color = d3.scale.ordinal()
        .range(colorRange.range());
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));
    var svg = d3.select("#chart").append("svg")
        .attr("id", svg_id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var divTooltip = d3.select("#widget").append("div").attr("class", "toolTip");
    color.domain(d3.keys(dataset[0]).filter(function(key) {
        return key !== "label";
    }));
    dataset.forEach(function(d) {
        var y0 = 0;
        d.values = color.domain().map(function(name) {
            return {
                name: name,
                y0: y0,
                y1: y0 += +d[name]
            };
        });
        d.total = d.values[d.values.length - 1].y1;
    });
    x.domain(dataset.map(function(d) {
        return d.label;
    }));
    y.domain([0, d3.max(dataset, function(d) {
        return d.total;
    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 9)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Total Targets %");
    var bar = svg.selectAll(".label")
        .data(dataset)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) {
            return "translate(" + x(d.label) + ",0)";
        })
        .on("click", function(d, i) {

            createTargetFilterGrid(select_day);

            document.getElementById('Radar_Wrapererd').style.display = 'block';
        });
    svg.selectAll(".x.axis .tick text")
        .call(wrap, x.rangeBand());

    var bar_enter = bar.selectAll("rect")
        .data(function(d) {
            return d.values;
        })
        .enter();

    bar_enter.append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) {
            return y(d.y1);
        })
        .attr("height", function(d) {
            return y(d.y0) - y(d.y1);
        })
        .style("fill", function(d) {
            return color(d.name);
        });

    bar_enter.append("text")
        .text(function(d) {
            return d3.format(".2s")(d.y1 - d.y0) + "%";
        })
        .attr("y", function(d) {
            return y(d.y1) + (y(d.y0) - y(d.y1)) / 2;
        })
        .attr("x", x.rangeBand() / 3)
        .style("fill", '#ffffff');

    bar.on("mousemove", function(d) {
        select_day = d.label;
        divTooltip.style("left", +100 + "px");
        divTooltip.style("top", +20 + "px");
        divTooltip.style("display", "inline-block");
        var elements = document.querySelectorAll(':hover');
        l = elements.length
        l = l - 1
        element = elements[l].__data__
        value = element.y1 - element.y0
        divTooltip.html((d.label) + "<br>" + element.name + " -: " + value + "");
    });
    bar.on("mouseout", function(d) {
        divTooltip.style("display", "none");
    });
    bar.on("onclick", function(d) {

    });
    svg.append("g")
        .attr("class", "legendLinear")
        .attr("transform", "translate(0," + (height + 30) + ")");
    var legend = d3.legend.color()
        .shapeWidth(height / 4)
        .shapePadding(10)
        .orient('horizontal')
        .scale(color);
    svg.select(".legendLinear")
        .call(legend);







}





chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
       
if(request.message==="Please Open a thread gmail"){
    alert("Please open any gmail thread and try again. Thanks");
}
else{

    start(request.message);
}

         
            
      }
    );
/*
    function start(value){
        //alert("content.js");
        alert(value);

       var innerHtml = $('.hP').html(); 
      // alert("done");
  //////////////////////////////////////////////////////////////////////////////////////////////////////



        //addDetails("1","subject", "ravi", "ravi.rathore@rajman.in", value, "2", "2");
  
  var y = document.getElementsByClassName("T-I J-J5-Ji ar7 L3 inboxsdk__button T-I-ax7 T-I-Js-Gs T-I-Js-IF");  
  chrome_tab_count=1;
  


  $("div[data-tooltip='LD Target']").click();
  //y[0].click();

 
  
    }  
 */
