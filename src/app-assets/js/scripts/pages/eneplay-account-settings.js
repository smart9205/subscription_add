/*=========================================================================================
	File Name: page-account-setting.js
	Description: Account setting.
	----------------------------------------------------------------------------------------
	Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: PIXINVENT
	Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
  'use strict';

  // variables
  var form = $('.validate-form'),
    flat_picker = $('.flatpickr'),
    accountUploadImg = $('#account-upload-img'),
    accountUploadBtn = $('#account-upload');

  // Update user photo on click of button
  if (accountUploadBtn) {
    accountUploadBtn.on('change', function (e) {
      var reader = new FileReader(),
      files = e.target.files;
      reader.onload = function () {
        if (accountUploadImg) {
          accountUploadImg.attr('src', reader.result);
        }
      };
      reader.readAsDataURL(files[0]);
      console.log('in reader : '+token);
      // Upload file
      //var form = $('#account-upload-img')[0];
      //var formData = new FormData(form);
      var file = document.getElementById('account-upload').files[0];

      $.ajax({
        type: "POST",
          url: "http://159.89.165.57:8080/api/user/photo",
          dataType: "json",
          data: accountUploadBtn,
          beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', 'Bearer '+token); 
          },
          success: function(result) {
            console.log('Login successful');
            //var resultdata = JSON.parse(result);
            console.log(result.meta);
            console.log(result.data);

            console.log(result.data.access_token);
            console.log(result.data.user.email);
            var userInfo = getUserData(result.data);
            console.log(userInfo);
            console.log(userInfo[0]);

            //console.log((result.data).get('token'));

            //var token = 
            //window.location.href = './dashboard.php?token='+userInfo[0];
        }
                              
      });

    });
  }

  // flatpickr init
  if (flat_picker.length) {
    flat_picker.flatpickr({
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  // jQuery Validation
  // --------------------------------------------------------------------
  if (form.length) {
    form.each(function () {
      var $this = $(this);

      $this.validate({
        rules: {
          username: {
            required: true
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          },
          password: {
            required: true
          },
          company: {
            required: true
          },
          'new-password': {
            required: true,
            minlength: 6
          },
          'confirm-new-password': {
            required: true,
            minlength: 6,
            equalTo: '#account-new-password'
          },
          dob: {
            required: true
          },
          phone: {
            required: true
          },
          website: {
            required: true
          },
          'select-country': {
            required: true
          }
        }
      });
      $this.on('submit', function (e) {
        e.preventDefault();
        console.log('submitted : '+token);


        
      });
    });
  }
});
