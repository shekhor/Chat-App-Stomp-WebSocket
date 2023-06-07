

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<link rel="stylesheet" type="text/css" href="${contextPath}/resources/asset/css/alertify.min.css">
<link rel="stylesheet" type="text/css" href="${contextPath}/resources/asset/css/alertify.default.theme.min.css">
<link rel="stylesheet" type="text/css" href="${contextPath}/resources/asset/css/HoldOn.min.css">
<script src="${contextPath}/resources/asset/js/alertify.min.js" type="text/javascript"></script>
<script src="${contextPath}/resources/asset/js/HoldOn.min.js" type="text/javascript"></script>
<script type="text/javascript">
    function blockView(message){
        HoldOn.open({
            theme:"sk-cube-grid",
            message:message
        });
    }

    function blockView(){
        HoldOn.open({
            theme:"sk-cube-grid",
            message:'Please hold on tight, fetching your data...'
        });
    }
    function unblockView() {
        HoldOn.close();
    }

    function showSuccessMessage(message){
        var msg = alertify.success(''+message);
        msg.delay(4).setContent(''+message);
    }
    function showErrorMessage(message){
        var msg = alertify.error(''+message);
        msg.delay(4).setContent(''+message);
    }
    function showAlert(message, callback){
        alertify.alert(message,function () {
            if(typeof(callback) == 'undefined' || callback != null){
                callback.call();
            }
        }).setHeader('<em>Message</em>');
    }
</script>
