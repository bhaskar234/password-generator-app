(function() {
  var genpwdapp;

  genpwdapp = {};

  $(document).ready(function() {
    var master_pwd;
    master_pwd = $("#master_pwd");
    if ("genpwdapp_master_pwd" in localStorage) {
      master_pwd.val(localStorage.genpwdapp_master_pwd);
      master_pwd.attr("readonly", "readonly");
    }
    chrome.tabs.query({
      'active': true
    }, function(tab) {
      var a;
      a = document.createElement('a');
      a.href = tab[0].url;
      genpwdapp.domain = a.host.replace("www.", "");
      return $("#domain").val(genpwdapp.domain);
    });
    $("#btn_gen").bind('click', function() {
      var hash;
      if (master_pwd.val().length > 0) {
        localStorage.genpwdapp_master_pwd = master_pwd.val();
        hash = String(CryptoJS.MD5($("#master_pwd").val() + genpwdapp.domain));
        return $("#gen_pwd").val(hash.substr(0, 8));
      } else {
        $("#btn_gen").attr("disabled", "disabled");
        $(".error").html("Please enter master password ! <br>");
        return $(".error").show();
      }
    });
    $("#master_pwd").bind('keyup', function() {
      $("#btn_gen").removeAttr("disabled");
      return $(".error").hide();
    });
    return $("#btn_newmaster").bind('click', function() {
      var r;
      r = confirm("Do you really want to set a new master password ? It will delete the old master password !");
      if (r === true) {
        localStorage.removeItem("genpwdapp_master_pwd");
        return $("#master_pwd").val("");
      }
    });
  });

}).call(this);
