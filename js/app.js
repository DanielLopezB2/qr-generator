$(document).ready(function(){

    $("#qr-section").hide();

    $("#submit").click(function(){
        $("#qr-section").show();
        $("#input-section").hide();
    });

    $('#url').on('change', function() {
        var url = $(this).val();
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?'+ // port
            '(\\/[-a-z\\d%_.~+]*)*'+ // path
            '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        if(!pattern.test(url)) {
            alert('Por favor ingresa una URL válida');
            $(this).focus();
        }
    });

    $("#submit").on("click", function() {
        if($("#url").val() !== "") {
            generarQR($("#url").val());
        }
    });

    $("#download").on("click", function() {
        html2canvas(document.querySelector("#qr-container")).then(canvas => {
            var imgData = canvas.toDataURL("image/png");
            var link = document.createElement('a');
            link.href = imgData;
            link.download = 'qrcode.png';
            link.click();
        });
    });  
    
    $("#share").on("click", function() {
        html2canvas(document.querySelector("#qr-container")).then(canvas => {
            var imgData = canvas.toDataURL("image/png");
            var shareUrl = encodeURIComponent(location.href);
            var shareTitle = encodeURIComponent("Mira mi código QR generado en");
            var shareDesc = encodeURIComponent("He generado un código QR con esta herramienta y me gustaría compartirlo contigo.");
            var shareImg = encodeURIComponent(imgData);
        
            var whatsappShareUrl = "https://wa.me/?text=" + shareTitle + "%20" + shareUrl;
        
            window.open(whatsappShareUrl, "_blank");
        });
    });
     

    function generarQR(url){

        var qrFinal = $("#qrcode");
        var qrcode = new QRCode(qrFinal[0], {
            text: url,
            width: 200,
            height: 200,
            colorDark: "#000",
            colorLight: "#FFF",
            correctLevel: QRCode.CorrectLevel.H
        });

    };

    $("#new-code").click(function(){
        $("#input-section").show();
        $("#qr-section").hide();
        $('#url').val("");
    });

    

});