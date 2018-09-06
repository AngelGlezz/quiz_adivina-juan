var ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
var ventana_ancho = $(window).width();
var disable=true;
var active_ace=false;
var input_text=false;
var input_text2=false;
var input_goles=false;
var input_radio=false;
var tenis_name="";
var respuestas_array = new Array();
var final_time = 0;
var aciertos = 0;

function countMaxValue(array_elements) {

	var maxValue = 0;
	var maxNum = -1;

    array_elements.sort();

    /*var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
                
                if(cnt > maxValue ){
                	maxValue = cnt;
                	maxNum = current;
                }
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        if(cnt > maxValue ){
           maxNum = current;
        }
    }

    return array(maxNum,cnt);*/

	var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
    	if (array_elements[i] == 1) {
    		cnt++;
    	}
    }

    return cnt;

}

$("#indepth_contador_circle input").css("margin-top",0);

$("#indepth_boton_empezar").on("click",function(){
	$("#indepth_boton_empezar").click(false);
	 ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
	 
	 var data = {
				  "preguntas": [
				    {
				      "pregunta": '<img src="'+urlIndepth+'images/preguntas/p1.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "THIERRY HENRY"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="'+urlIndepth+'images/preguntas/p2.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "ZLATAN IBRAHIMOVIC"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="'+urlIndepth+'images/preguntas/p3.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "ANGEL DI MARIA"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="'+urlIndepth+'images/preguntas/p4.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "CRISTIAN TELLO"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="'+urlIndepth+'images/preguntas/p5.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "VICTOR VALDES"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="'+urlIndepth+'images/preguntas/p6.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "ANDRES GUARDADO"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="'+urlIndepth+'images/preguntas/p7.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "CRISTIANO RONALDO"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="'+urlIndepth+'images/preguntas/p8.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "SAMI KHEDIRA"
				        }
				      ]
				    }
				  ]
				};
		  preguntas=data.preguntas;
		 
		 $("#indepth_pregunta_cont").html("");
		 
		 $.each(preguntas, function( i, item ) {
			 
			var div=' <div class="indepth_pregunta_item"><div class="indepth_pregunta">'+item.pregunta+'</div><div class="indepth_pregunta_main"><div class="indepth_pregunta_img"><img src="'+urlIndepth+'images/preguntas/'+(i+1)+'.jpg" /></div><div class="indepth_respuestas_cont" num="'+i+'">';
				
			var div_items="";
			$.each(item.respuestas, function( j, items ) {
				div_items+='<div class="indepth_respuesta_item active" num="'+items.tipo+'"><div class="output_respuesta"><div class="input_respuesta"><input type="text"></div><img class="respuesta" src="'+urlIndepth+'images/respuestas/'+ (i+1) +'.png"><div class="responder"></div><div class="rendir"></div></div></div>';
			});						
										
			var div_fin='</div></div></div>';
			 
			 $("#indepth_pregunta_cont").append(div+div_items+div_fin);			 
		 });
		 
		 $("#indepth_page1").css({
			"top":ventana_alto-100,
			"visibility":"visible",
			"height": "auto"
		});
		
		$("#nav-bar-stats,#top-bar-wrapper,#body-wrapper").hide();
		
		$("#indepth_page1").show();
		
		$("#indepth_page1").animate({
			top: 0
		},2000); 
		var respuesta = new Array();
		
		$(document).on("click",".responder",function(){
			
			var inputElement = $(this).prev().prev().children();
			var txtResp = inputElement.val().toUpperCase();
			var respuesta_cont = $(this).parent().parent();
			var pregunta_num = respuesta_cont.attr("num");

			if (txtResp == "") {
				return;
			}

			if(txtResp == pregunta_num){
				console.log("bien");
				respuesta.push(1);
				$(this).removeClass("active").addClass("disable");
				$(this).click(false);
				$(this).prev().show();
				$(this).hide();
				$(this).next().hide();
				$(inputElement).prop('disabled', true);
			} else {
				$(this).next().show();
			}
			
			$(this).addClass("select");
			//respuesta.push(respuesta_num);
			console.log(respuesta);
			console.log(txtResp);

			console.log(countMaxValue(respuesta));
			
			if(respuesta.length == preguntas.length){
				var total = countMaxValue(respuesta);
				window.setTimeout(function(){
					finish_test(total);
				});
			}
			return respuesta;
		});

		$(document).on("click",".rendir",function(){
			var inputElement = $(this).prev().prev().prev().children();
			console.log("mal");
			respuesta.push(0);
			$(inputElement).prop('disabled', true);
			$(this).prev().removeClass("active").addClass("disable");
			$(this).prev().click(false);
			$(this).prev().prev().show();
			$(this).hide();
			$(this).prev().hide();
			console.log(respuesta);
			if(respuesta.length == preguntas.length){
				var total = countMaxValue(respuesta);
				window.setTimeout(function(){
					finish_test(total);
				});
			}
			return respuesta;
		});
});

var totalfb = "";
function finish_test(total){	
	ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();;
	var ventana_ancho = $(window).width();
	var img = total;

	$(".inner").show();
	
	$("#indepth_resultados").css({
		"visibility": "visible",
		"position":"fixed",
		"top": 0,
		"left": -ventana_ancho,
	});

  	var msg="";
  	var resulta = "";

  	if (total <= 3){
	  	msg="Estás tan lamentable que ni Osorio te quiere en la Selección. Mejor pide disculpas y retírate…";
	  	$("#indepth_resultados").css({"background-image": "url("+urlIndepth+"images/resultado/1.jpg)"});
	  	totalfb = "mal";
  	} else if (total >= 4 && total <= 6){
	  	msg="Pues ahí se va… no sacaste un resultado así que tú digas \"uy qué bruto, cuánto sabe\", pero peor es nada";
	  	$("#indepth_resultados").css({"background-image": "url("+urlIndepth+"images/resultado/2.jpg)"});
	  	totalfb = "maso";
  	} else if (total >= 7){
	  	msg="¡Eres como el Superman que todos esperábamos! Si puedes pásame tus datos, te necesito (junto con tus conocimientos) para ganarme una lana";
	  	$("#indepth_resultados").css({"background-image": "url("+urlIndepth+"images/resultado/3.jpg)"});
	  	totalfb = "bien";
  	}
  	
  	$(".indepth_result_container").html(msg);
  	console.log(totalfb);

	$("#indepth_resultados").animate({
	  	"left": 0
  	},2000, function(){
	  	$("html, body, #indepth_page1").css("overflow","hidden");
  	});

  	$("#indepth_twittear").click(function(){
  		var text = "";
		if (total <= 3) {
			text = encodeURIComponent("Estás tan lamentable que ni Osorio te quiere en la Selección. Mejor pide disculpas y retírate…");
		} else if (total >= 4 && total <= 6) {
			text = encodeURIComponent("Pues ahí se va… no sacaste un resultado así que tú digas \"uy qué bruto, cuánto sabe\", pero peor es nada");
		} else if (total >= 7) {
			text = encodeURIComponent("¡Eres como el Superman que todos esperábamos! Si puedes pásame tus datos, te necesito (junto con tus conocimientos) para ganarme una lana");
		}
		
		var url = encodeURIComponent("http://juanfutbol.com/indepth/adivina-juan");
		window.open("https://twitter.com/share?text="+text+"&hashtags=JFQuiz&url="+url,"","width=500, height=300");
	});

	$("#indepth_facebook").click(function(){
		var url = encodeURIComponent("http://juanfutbol.com/indepth/adivina-juan?m="+totalfb);
		console.log(url);
		window.open("https://www.facebook.com/sharer/sharer.php?u="+url,"","width=500, height=300");
	});
}

var indepth_sizeAdjust = function(firstTime){
	$(".indepth_page").each(function(){
		if($(this).attr("resize") == "true"){
			var h = parseInt($(this).width(),10) / $(this).attr("width") * $(this).attr("height");
			$(this).css("height", h + "px");
		}else if(firstTime && $(this).attr("resize") == "false"){
			$(".indepth_background", $(this)).css("min-width", $(this).attr("width") + "px");
			$(this).css("height", $(this).attr("height") + "px");
		}
	})
}

var indepth_preloadImgs = function(){
	$("img[over]").each(function(){
		$(this).attr("out", $(this).attr("src"));
		$(this).on("mouseenter", function(){
			$(this).attr("src", $(this).attr("over"));
		}).on("mouseleave", function(){
			$(this).attr("src", $(this).attr("out"));
		}).css("cursor", "pointer");

		var tmp = $("<img/>");
		tmp.attr("src", $(this).attr("over"));
		tmp.css({"position":"absolute", "top":"-9999px", "left":"-9999px"})
		tmp.appendTo("body");
	});
}

$(document).ready(function(){
	indepth_sizeAdjust(true);
	indepth_preloadImgs();
	ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
	ventana_ancho = $(window).width();
	
	$("#indepth_cover").css({
		"width": (ventana_ancho)+"px",
		"height": (ventana_alto-100)+"px"	
	})
		
	/*$("#indepth_resultados").css({
		"width":ventana_ancho+"px",
		"height":ventana_alto+"px"
	});*/
});
	
	$(document).on("click", "#indepth_button_ver" ,function(){
		$.fn.fullpage.moveSectionDown();
	});

$(window).on("resize", function(){

	ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
	ventana_ancho = $(window).width();

	$("#indepth_cover").css({
		"width": (ventana_ancho)+"px",
		"height": (ventana_alto-100)+"px"	
	})
		
	    /*$("#indepth_resultados").css({
			"width":ventana_ancho+"px",
			"height":ventana_alto+"px"
		});*/
});


