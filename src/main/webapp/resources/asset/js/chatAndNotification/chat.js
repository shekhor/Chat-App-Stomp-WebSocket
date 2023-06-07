'use strict';
if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
const url = window.location.origin+contextPath;
//const url = 'wss://tracker.onudaan.com/action-tracker';
let stompClient;
let selectedUser;
let newMessages = new Map();


function connectToChat(userName, topicName) {
    console.log("connecting to chat...")
    let socket = new SockJS(url + '/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log("connected to: " + frame);
        var auth = '${auth.username}';
        //stompClient.subscribe("/topic/" + topicName + "/" + userName, function (response)
        // stompClient.subscribe("/topic/" + topicName + "/" + userName, function (response) {
        //     console.log(response.body)
        //     let data = JSON.parse(response.body);
        //     console.log("username and logged user", data.username, " ", loggedUser);
        //     if(data.username!=loggedUser){
        //         console.log("before render ", data.checkUser," ",data.username , " ",data.loggedUser);
        //         console.log("message and fromlogin", data.message, " ", data.fromLogin)
        //         var msg = data.message;
        //         var fromlogin = data.message;
        //         render(data.username, msg, fromlogin);
        //         console.log("before shownotify ", data.checkUser);
        //         showNotification('Action Tracker',data.message,url)
        //     } else {
        //
        //         // console.log("before render to myself", data.checkUser," ",data.username , " ",data.loggedUser);
        //         // console.log("message and fromlogin", data.message, " ", data.fromLogin)
        //         // var msg = data.message;
        //         // var fromlogin = data.message;
        //         // render(msg, fromlogin);
        //         // console.log("before shownotify ", data.checkUser);
        //         // // showNotification('Action Tracker',data.message,url)
        //     }
        stompClient.subscribe("/topic/decision-log", function (response) {

            console.log("subscribed successfully");
            console.log(response.body);
            let data = JSON.parse(response.body);
            console.log("username and logged user", data.username, " ", loggedUser);
            if(data.username!=loggedUser){
                console.log("before render ", data.checkUser," ",data.username , " ",data.loggedUser);
                console.log("message and fromlogin", data.message, " ", data.fromLogin)
                var msg = data.message;
                var fromlogin = data.message;
                render(data.username, msg, fromlogin);
                console.log("before shownotify ", data.checkUser);
                showNotification('Action Tracker',data.message,url)
            } else {

                // console.log("before render to myself", data.checkUser," ",data.username , " ",data.loggedUser);
                // console.log("message and fromlogin", data.message, " ", data.fromLogin)
                // var msg = data.message;
                // var fromlogin = data.message;
                // render(msg, fromlogin);
                // console.log("before shownotify ", data.checkUser);
                // // showNotification('Action Tracker',data.message,url)
            }
        });
    });
}
connectToChat("1", "decision-log");
function sendMsg(from, text, username) {

    selectUser(from);

    stompClient.send("/app/chat/" + selectedUser, {}, JSON.stringify({
        fromLogin: from,
        message: text,
        topicName: topicName,
        username: username
    }));
}



function registration() {
    let userName = document.getElementById("userName").value;
    $.get(url + "/registration/" + userName, function (response) {
        connectToChat(userName);
    }).fail(function (error) {
        if (error.status === 400) {
            alert("Login is already busy!")
        }
    })
}

function selectUser(userName) {
    console.log("selecting users: " + userName);
    //render(newMessages.get(userName), userName);//ataur
    selectedUser = userName;
    let isNew = document.getElementById("newMessage_" + userName) !== null;
    if (isNew) {
        let element = document.getElementById("newMessage_" + userName);
        element.parentNode.removeChild(element);
        render(newMessages.get(userName), userName);
    }
    $('#selectedUserId').html('');
    $('#selectedUserId').append('Chat with ' + userName);
}

function fetchAll() {
    $.get(url + "/fetchAllUsers", function (response) {
        let users = response;
        let usersTemplateHTML = "";
        for (let i = 0; i < users.length; i++) {
            usersTemplateHTML = usersTemplateHTML + '<a href="#" onclick="selectUser(\'' + users[i] + '\')"><li class="clearfix">\n' +
                '                <img src="https://rtfm.co.ua/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" width="55px" height="55px" alt="avatar" />\n' +
                '                <div class="about">\n' +
                '                    <div id="userNameAppender_' + users[i] + '" class="name">' + users[i] + '</div>\n' +
                '                    <div class="status">\n' +
                '                        <i class="fa fa-circle offline"></i>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </li></a>';
        }
        $('#usersList').html(usersTemplateHTML);
    });
}



