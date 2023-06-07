(function ($) {
    "use strict";
    $(document).ready(function () {
        //group add limit
        var maxGroup = 10;
        let teamMemberCount = parseInt($('#teamMemberListMaxId').val())+1;
        //add more fields group
        $(".addMore").click(function () {
            if ($('body').find('.fieldGroup').length < maxGroup) {
                let prefixHtml = '<div class="form-group fieldGroup"><div class="input-group">';
                let variableHtml = '<input type="text" name="teamMember['+teamMemberCount+'].userRoleInProject" class="form-control custom-form-control" placeholder="Role"/>'
                    +'<input type="text" name="teamMember['+teamMemberCount+'].userName" class="form-control custom-form-control" placeholder="User Name"/>';
                let suffixHtml = '<div class="input-group-addon custom-input-group-remove-addon"><a href="javascript:void(0)" class="btn custom-remove-icon remove"><span><i class="fa fa-minus" aria-hidden="true"></i></span></a></div>'
                    +'</div></div></div>';
                let finalHtml = prefixHtml+variableHtml+suffixHtml;
                $('body').find('.fieldGroup:last').after(finalHtml);
                teamMemberCount++;
            } else {
                alert('Maximum ' + maxGroup + ' groups are allowed.');
            }
        });


        //remove fields group
        $("body").on("click", ".remove", function () {
            $(this).parents(".fieldGroup").remove();
        });

        //add more action fields group
        $(".addMoreAction").click(function () {
            if ($('body').find('.ActionfieldGroup').length < maxGroup) {
                var fieldHTML = '<div class="form-group ActionfieldGroup">' + $(".ActionfieldGroupCopy").html() + '</div>';
                $('body').find('.ActionfieldGroup:last').before(fieldHTML);
            } else {
                alert('Maximum ' + maxGroup + ' groups are allowed.');
            }
        });

        //remove fields group
        $("body").on("click", ".removeAction", function () {
            $(this).parents(".ActionfieldGroup").remove();
        });

        //chat
        $(document).ready(function () {
            $('#action_menu_btn').click(function () {
                $('.action_menu').toggle();
            });
        });



        //add more action fields group
        $(".addMore_new_project_department").click(function () {
            if ($('body').find('.new_project_fieldGroup').length < maxGroup) {
                var fieldHTML = '<div class="form-group new_project_fieldGroup">' + $(".new_project_field_group_copy").html() + '</div>';
                $('body').find('.new_project_fieldGroup:last').before(fieldHTML);
            } else {
                alert('Maximum ' + maxGroup + ' groups are allowed.');
            }
        });

        //remove fields group
        $("body").on("click", ".remove-new-deparment", function () {
            $(this).parents(".new_project_fieldGroup").remove();
        });
        var projectCategoryCount = parseInt($('#categoryListMaxId').val())+1;
        //add more category-tag fields group
        $(".addMore_new_tag_category").click(function () {
            if ($('body').find('.new_category_fieldGroup').length < maxGroup) {
                let originalHtmlPrefix = '<div id="div'+projectCategoryCount+'">' +
                    '<label for="tagCategoryInput">Category:</label>' +
                    '<div class="input-group">';
                let variableHtml = '<input type="text" name="projectCategoryList['+projectCategoryCount+'].categoryName" id="tagCategoryInput'+projectCategoryCount+'" class="form-control" placeholder="Category"/>';
                let htmlSuffix = '<div class="input-group-addon custom-remove-addon">' +
                    '<a href="javascript:removeCategory(\'div'+projectCategoryCount+'\')"'+' class="btn custom-remove-icon remove-new-tagCategoryInput"><span><i class="fa fa-minus" aria-hidden="true"></i></span></a></div></div></div></div>';
                const fullHtml = originalHtmlPrefix+variableHtml+htmlSuffix;
                var fieldHTML = '<div class="form-group new_category_fieldGroup">' + fullHtml + '</div>';
                $('body').find('.new_category_fieldGroup:last').after(fieldHTML);
                projectCategoryCount++;
            } else {
                alert('Maximum ' + maxGroup + ' groups are allowed.');
            }
        });

        //remove fields group
        // $("body").on("click", ".remove-new-tagCategoryInput", function () {
        //     $(this).parents(".new_category_fieldGroup").remove();
        // });





        //add owner fields group
        $(".add_more_owner").click(function () {
            if ($('body').find('.owner_field_group').length < maxGroup) {
                var fieldHTML = '<div class="form-group owner_field_group">' + $(".owner_field_group_copy").html() + '</div>';
                $('body').find('.owner_field_group:last').before(fieldHTML);
            } else {
                alert('Maximum ' + maxGroup + ' groups are allowed.');
            }
        });

        //remove fields group
        $("body").on("click", ".remove-owner", function () {
            $(this).parents(".owner_field_group").remove();
        });

        //add owner fields group
        $(".add_more_manager").click(function () {
            if ($('body').find('.manager_field_group').length < maxGroup) {
                var fieldHTML = '<div class="form-group manager_field_group">' + $(".manager_field_group_copy").html() + '</div>';
                $('body').find('.manager_field_group:last').before(fieldHTML);
            } else {
                alert('Maximum ' + maxGroup + ' groups are allowed.');
            }
        });

        //remove fields group
        $("body").on("click", ".remove-manager", function () {
            $(this).parents(".manager_field_group").remove();
        });


        //image upload
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                    $('#imagePreview').hide();
                    $('#imagePreview').fadeIn(650);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#imageUpload").change(function () {
            readURL(this);
        });


        //div show checkbox switch 
        $(document).ready(function () {
            var userDefinedCategoryListSize = $('#userDefinedActionStatusListMaxId').val();
            if(userDefinedCategoryListSize == 0){
                $('.show-content').hide();
            }else if(userDefinedCategoryListSize > 0){
                $('.show-content').show();
            }

            $('.user-defined-check').click(function (e) {
                $('.show-content').toggle(1000);
            })
        });

        //div show checkbox switch 
        $(document).ready(function () {
            $('.show-risk-content').hide();
            $('.user-defined-risk-check').click(function (e) {
                $('.show-risk-content').toggle(1000);
            })
        });

        //tooltip
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })

        //open close risk action
        $(".open").on("click", function () {
            $(".popup-overlay, .popup-content").addClass("active");
        });

        //removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
        $(".close-popup, .popup-overlay").on("click", function () {
            $(".popup-overlay, .popup-content").removeClass("active");
        });


        $('.datepicker').datepicker({
            format: 'MM dd ,yyyy',

        });

        $(document).ready(function () {
            $('select').niceSelect();
        });


        $(".open-chat-menu").on("click", function () {
            $(".chat-popup-menu, .chat-popup-content").addClass("active");
        });

        //removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
        $(".close-chat-menu, .popup-overlay").on("click", function () {
            $(".chat-popup-menu, .chat-popup-content").removeClass("active");
        });
        $('.count').each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 4000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });

        //Stop carousel
        /*
        $('.carousel').carousel({
            interval: false,
            wrap: false

        });*/


    });
})
(jQuery);