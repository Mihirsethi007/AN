$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
      $('#mainNav').addClass('shrink');
    } else {
      $('#mainNav').removeClass('shrink');
    }
  });

$('.owl-carousel').owlCarousel({
    dots: true,
    loop:true,
    stagePadding: 25,
    margin:30,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
});


$(document).ready(function(){


  var val = $('#myForm').validate({
    rules: {
      fullname: {
        required: true,
      },
      personaladdress: {
        required: true,
      },
      youremail: {
        required: true,
        email: true
      },
      phoneno: {
        required: true,
      },
      dob: {
        required: true,
      },
      phoneno: {
        required: true,
      },
      pemployer: {
        required: true,
      },
      workaddress: {
        required: true,
      },
      yow: {
        required: true,
      },
      tow: {
        required: true,
      },

            


      
    },
    /*messages: {
      yourrequirement: {
        required: "Please select an option.",
       },  
       yourwebsite: {
        required: "Please select an option.",
       },  
       yourplatform: {
        required: "Please select an option.",
       },  
       typeofbusiness: {
        required: "Please select an option.",
       },  
       yourprojecttimescale: {
        required: "Please select an option.",
       },  
       projectbudget: {
        required: "Please select an option.",
       },  
    },
    errorElement : 'div',
    errorLabelContainer: '.site_required_alert'*/
  });

  $("#myForm").multiStepForm(
  {
    // defaultStep:0,
    beforeSubmit : function(form, submit){
      console.log("called before submiting the form");
      console.log(form);
      console.log(submit);
    },
    validations:val,
  }
  ).navigateTo(0);
});



(function ( $ ) {
  $.fn.multiStepForm = function(args) {
      if(args === null || typeof args !== 'object' || $.isArray(args))
        throw  " : Called with Invalid argument";
      var form = this;
      var tabs = form.find('.tab');
      var steps = form.find('.step');
      steps.each(function(i, e){
        $(e).on('click', function(ev){
        });
      });
      form.navigateTo = function (i) {/*index*/
        /*Mark the current section with the class 'current'*/
        tabs.removeClass('current').eq(i).addClass('current');
        // Show only the navigation buttons that make sense for the current section:
        form.find('.previous').toggle(i > 0);
        atTheEnd = i >= tabs.length - 1;
        form.find('.next').toggle(!atTheEnd);
        // console.log('atTheEnd='+atTheEnd);
        form.find('.submit').toggle(atTheEnd);
        fixStepIndicator(curIndex());
        return form;
      }
      function curIndex() {
        /*Return the current index by looking at which section has the class 'current'*/
        return tabs.index(tabs.filter('.current'));
      }
      function fixStepIndicator(n) {
        steps.each(function(i, e){
          i == n ? $(e).addClass('active') : $(e).removeClass('active');
        });
      }
      /* Previous button is easy, just go back */
      form.find('.previous').click(function() {
        form.navigateTo(curIndex() - 1);
      });

      /* Next button goes forward iff current block validates */
      form.find('.next').click(function() {
        if('validations' in args && typeof args.validations === 'object' && !$.isArray(args.validations)){
          if(!('noValidate' in args) || (typeof args.noValidate === 'boolean' && !args.noValidate)){
            form.validate(args.validations);
            if(form.valid() == true){
              form.navigateTo(curIndex() + 1);
              return true;
            }
            return false;
          }
        }
        form.navigateTo(curIndex() + 1);
      });
      form.find('.submit').on('click', function(e){
        if(typeof args.beforeSubmit !== 'undefined' && typeof args.beforeSubmit !== 'function')
          args.beforeSubmit(form, this);
        /*check if args.submit is set false if not then form.submit is not gonna run, if not set then will run by default*/        
        if(typeof args.submit === 'undefined' || (typeof args.submit === 'boolean' && args.submit)){
          form.submit();
        }
        return form;
      });
      /*By default navigate to the tab 0, if it is being set using defaultStep property*/
      typeof args.defaultStep === 'number' ? form.navigateTo(args.defaultStep) : null;

      form.noValidate = function() {
        
      }
      return form;
  };
}( jQuery ));