<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>


<!--    libs for stomp and sockjs-->
<script src="${contextPath}/resources/asset/js/chatAndNotification/sockjs.js" type="text/javascript"></script>
<script src="${contextPath}/resources/asset/js/chatAndNotification/stomp.min.js" type="text/javascript"></script>
<!--    end libs for stomp and sockjs-->
<script src="${contextPath}/resources/asset/js/chatAndNotification/chat.js?v=${applicationVersion}" type="text/javascript"></script>
<script src="${contextPath}/resources/asset/js/chatAndNotification/custom.js?v=${applicationVersion}" type="text/javascript"></script>
<script src="${contextPath}/resources/asset/js/chatAndNotification/push.min.js" type="text/javascript"></script>
<script src="${contextPath}/resources/asset/js/chatAndNotification/handlebars.min.js" type="text/javascript"></script>

<script type="text/javascript">
    function showNotification(title,msgBody,url){
        Push.create(title, {
            body : msgBody,
            icon : 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/62.2.25/chromium/chromium_48x48.png',
            timeout : 19000,
            link : url,
            vibrate : [200,200],
            onClick: function () {
                window.focus();
                this.close();
            }
        });
    }
    
    function requestNotification() {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }

        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification

        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== "denied" || Notification.permission !== "default") {
            try{
                Notification.requestPermission().then(function (permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted") {

                    }
                });
            }catch (error) {
                if (error instanceof TypeError) {
                    Notification.requestPermission(() => {

                    });
                } else {
                    throw error;
                }
            }

        }

    }


</script>
