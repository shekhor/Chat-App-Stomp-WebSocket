let $chatHistory;
let $button;
let $textarea;
let $chatHistoryList;

function init() {
    cacheDOM();
    //bindEvents();
}

function bindEvents() {
    $button.on('click', addMessage.bind(this));
    $textarea.on('keyup', addMessageEnter.bind(this));
}

function cacheDOM() {
    $chatHistory = $('#chat-history');
    $button = $('#sendBtn');
    $textarea = $('#message-to-send');
    $chatHistoryList = $chatHistory.find('div');
}

function render(username, message, projectId) {
    // scrollToBottom();
    // responses
    console.log("render method called");
    console.log("message from username: ", message, " " ,projectId );
    let date =new Date().toString().substring(0, 15);
    var index = checkSpecialChar(username);
    if(index) {
        username = username.toString().substring(0, index);
    }
    var templateResponse = Handlebars.compile($("#message-response-template").html());
    var contextResponse = {
        username: username,
        response: message,
        date: date,
        projectId: projectId
    };

    setTimeout(function () {
        $chatHistoryList.append(templateResponse(contextResponse));
        scrollToBottom();
    }.bind(this), 1500);
}

function sendMessage(projectId, message, username) {
    //let username ="ataur";
    let userId = projectId;
    let date =new Date().toString().substring(0, 15);
    sendMsg(userId, message, username);
    scrollToBottom();
    var index = checkSpecialChar(username);
    if(index) {
        username = username.toString().substring(0, index);
    }
    if (message.trim() !== '') {
        var template = Handlebars.compile($("#message-template").html());
        var context = {
            username: username,
            messageOutput: message,
            date: date
        };

        $chatHistoryList.append(template(context));
        scrollToBottom();
        $textarea.val('');
    }
}

function scrollToBottom() {
    $chatHistory.scrollTop($chatHistory[0].scrollHeight);
}

function getCurrentTime() {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
}

function addMessage() {
    sendMessage($textarea.val());
}

function addMessage(val) {
    sendMessage(val);
}

function addMessage(userId, val, username) {
    sendMessage(userId, val, username);
}

function addMessageEnter(event) {
    // enter was pressed
    if (event.keyCode === 13) {
        addMessage();
    }
}
function checkSpecialChar(name) {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var index = name.match(format).index;
    return index;
}



