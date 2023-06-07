<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<div id="footer">
    <nav class="navbar navbar-expand-sm fixed-bottom navbar-light bg-light" data-toggle="affix">
        <div class="mx-auto d-sm-flex d-block flex-sm-nowrap">
            <div class="text-center">
                <div class="footer-list">
                    <ul class="footer-icon ">
                        <li>
                            <div class="btn-group"><a href="#" data-toggle="tooltip" data-placement="top"
                                                      title="Team"><i class="fa fa-user text-dark" aria-hidden="true"></i></a>
                            </div>
                        </li>
                        <li>
                            <div class="btn-group"><a href="#" data-toggle="tooltip" data-placement="top"
                                                      title="Risk"><i class="fa fa-exclamation-triangle text-dark"
                                                                      aria-hidden="true"></i></a></div>
                        </li>
                        <li>
                            <div class="btn-group"><a href="${contextPath}/decision-log" data-toggle="tooltip" data-placement="top"
                                                      title="Decission"><i class="fa fa-check-circle-o text-dark"
                                                                           aria-hidden="true"></i></a></div>
                        </li>
                        <li>
                            <div class="btn-group"><a href="#" data-toggle="tooltip" data-placement="top"
                                                      title="Note"><i class="fa fa-fax text-dark" aria-hidden="true"></i></a>
                            </div>
                        </li>

                        <li>
                            <div class="btn-group">
                                <a class="dropdown-toggle" href="#" id="dropdown10" data-toggle="dropdown"
                                   aria-haspopup="true" aria-expanded="false"><i
                                        class="fa fa-plus-circle text-dark" aria-hidden="true"></i></a>
                                <div class="dropdown-menu custom-dropdown drop-up" aria-labelledby="dropdown10">
                                    <a class="dropdown-item" href="${contextPath}/dashboard">Dashboard</a>
                                    <a class="dropdown-item" href="${contextPath}/projects/create">Create Project</a>
                                    <a class="dropdown-item" href="${contextPath}/milestone/view">Dates And Milestons</a>
                                    <a class="dropdown-item" href="#">Add Category</a>
                                    <a class="dropdown-item" href="#">Export to excel</a>
                                    <a class="dropdown-item" href="#">Modify tags</a>
                                    <a class="dropdown-item" href="#">Modify Project Header</a>

                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</div>