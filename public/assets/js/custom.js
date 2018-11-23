$(document).ready(function(){
	//alert("hhjhj");
	$(document).on('click','.new_approve',function(){
		//alert("kk");
		var id=$(this).attr('id');
		alert(id);
		$(".newloader-"+id).show();
		 $.ajax({
        url: '/useractive',
        // dataType: "jsonp",
        data: {data: id},
        type: 'POST',
        jsonpCallback: 'callback', // this is not relevant to the POST anymore
        success: function (data) {
            if(data.success==1){
            $(".newloader-"+id).hide();
            $(this).removeClass("label-success");
           	//$("")	
            //$("")
            }
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
            $('#lblResponse').html('Error connecting to the server.');
        },
    });
	});

	/*new code for block*/
	$(document).on('click','.new_block',function(){
		var id=$(this).attr('id');
		alert(id);
	});
	/*end*/
})