<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Action Tracker: Decision Log</title>

    <script type='text/javascript' >
        let user = "1";
        let topicName = "decision-log";
        let loggedUser = '${username}';
    </script>
    <jsp:include page="header.jsp"/>
    <jsp:include page="blockAndAlert.jsp"/>
    <jsp:include page="msgAndNotif.jsp"/>

    <script type="text/javascript">

        $(function(){
            init();
            requestNotification(); // this is for notification request.

            $('#sendBtn').click(function () {
                var message = $('#message-to-send').val();
                var userId = "1";
                var username = '${username}';

                addMessage(userId, message, username);

            });
            document.getElementById('message-to-send').addEventListener('keyup',function (event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    document.getElementById("sendBtn").click();
                }
            })
        })

        function getDecisionLogHistory() {
            var username = '${username}';
            blockView();
            $.ajax({
                type:'GET',
                url: contextPath + '/decision-log/get-data',
                dataType:'json',
                data: $('#decisionLogForm').serialize(),
                success:function(responseData){
                    $('#pageNo').val(parseInt($('#pageNo').val()) + 1);
                    var templateResponse = Handlebars.compile($("#message-response-template").html());
                    var templateSelfResponse = Handlebars.compile($("#message-template").html());
                    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                    if(responseData.length > 0) {
                        jQuery.each(responseData, function(index, itemData) {
                            var date =new Date(itemData.createTime).toString().substring(0, 15);

                            var name = itemData.createdBy;
                            var index = checkSpecialChar(name);
                            if(index) {
                                name = name.toString().substring(0, index);
                            }
                            if(itemData.createdBy===username) {
                                var contextResponse = {
                                    messageOutput: itemData.decision,
                                    date: date,
                                    username: name
                                };
                                setTimeout(function(){
                                    $('.chat-history-data').prepend(templateSelfResponse(contextResponse))
                                    $('#chat-history').scrollTop(200)
                                    unblockView();
                                },780);
                            } else {
                                var contextResponse = {
                                    response: itemData.decision,
                                    date: date,
                                    username: name
                                };
                                setTimeout(function(){
                                    $('.chat-history-data').prepend(templateResponse(contextResponse))
                                    $('#chat-history').scrollTop(200)
                                    unblockView();
                                },780);
                            }
                        })
                    } else {
                        setTimeout(function(){
                            unblockView();
                        },780);
                    }
                }
            });
        }

        $(document).ready(function () {

            getDecisionLogHistory();
            $("#chat-history").scrollTop($("#chat-history")[0].scrollHeight);
            $('#chat-history').scroll(function(){
                if ($('#chat-history').scrollTop() == 0){
                    getDecisionLogHistory();
                }
            });
        });
    </script>
</head>

<body>
<form:form action="" id="decisionLogForm">
    <input class="form-control" id="pageNo" name="pageNo" value="0" style="display: none">
    <input class="form-control" id="totalItemPerPage" value="20" name="totalItemPerPage" style="display: none">
</form:form>

<section class="notes-section-banner">

</section>
<main class="main-container">
    <section class="chat-section-wrapper mt-negative">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 col-xl-12 chat">
                    <div class="card custom-chat-card">
                        <div class="header">
                            <h3 class="header-title mt-3 mb-2">Decision Log..</h3>
                        </div>
                        <div id="chat-history" class="card-body msg_card_body mb-65" style="height:400px;overflow:scroll">
                            <div class='chat-history-data'>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="custom-card-footer fixed-bottom card-footer">
        <div class="input-group">
            <div class="input-group-append">
                <span class="input-group-text custom-input-group-text attach_btn"><i class="fa fa-lock"
                                                                                     aria-hidden="true"></i></span>
            </div>
            <input name="" class="form-control type_msg" type="text" id="message-to-send" placeholder="Type your message...">

            <div class="input-group-append">
                <input type="button" value="Send" class="button btn-success btn-sm" id="sendBtn"/>
                <span class="input-group-text custom-input-group-text attach_btn open-chat-menu"><i
                        class="fa fa-plus-circle" aria-hidden="true"></i></span>
            </div>
            <div class="chat-popup-menu">
                <!--Creates the popup content-->
                <div class="chat-popup-content">
                    <div class="edit-items-list" id="ViewMeuList">
                        <div class="custom-edit-card card">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><a href="#"><span class="icon-space"><i
                                        class="fa fa-times text-dark"
                                        aria-hidden="true"></i></span>Close</a></li>
                                <li class="list-group-item"><a href="#"><span class="icon-space"><i
                                        class="fa fa-exclamation-triangle text-warning"
                                        aria-hidden="true"></i></span>Delete</a></li>
                                <li class="list-group-item"><a href="#"><span class="icon-space"><i
                                        class="fa fa-exclamation-triangle text-danger"
                                        aria-hidden="true"></i></span>At Risk</a></li>
                                <li class="list-group-item"><a href="#"><span class="icon-space"><i
                                        class="fa fa-folder-open " aria-hidden="true"></i></span>Reopen</a>
                                </li>
                                <li class="list-group-item"><a href="#"><span class="icon-space"><i
                                        class="fa fa-calendar text-info"
                                        aria-hidden="true"></i></span>Schudule Meeting</a></li>
                                <li class="list-group-item"><a href="#"><span class="icon-space"><i
                                        class="fa fa-check text-success"
                                        aria-hidden="true"></i></span>Create New Action</a></li>
                                <li class="list-group-item"><a href="#"><span class="icon-space"><i
                                        class="fa fa-key text-dark" aria-hidden="true"></i></span>Reassign
                                    Action to new owner</a></li>
                            </ul>
                        </div>

                    </div>
                    <button class="close-chat-menu">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</main>

<script id="message-template" type="text/x-handlebars-template">
    <div class="d-flex justify-content-end mb-4">
        <div class="msg_cotainer_send">
            <h6 class="user-name">{{username}}</h6>
            {{messageOutput}}
            <span class="msg_time_send" style="width:80px; right:-15px;color:darkred;">{{date}}</span>
        </div>
        <div class="img_cont_msg">
            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">
        </div>
    </div>
</script>

<script id="message-response-template" type="text/x-handlebars-template">
    <div class="d-flex justify-content-start mb-4">
        <div class="img_cont_msg">
            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">
        </div>
        <div class="msg_cotainer">
            <h6 class="user-name">{{username}}</h6>
            {{response}}
            <span class="msg_time" style="width:80px;">{{date}}</span>

        </div>
    </div>
</script>
</body>

</html>