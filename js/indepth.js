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

    var current = null;
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

    return maxNum;

}

$("#indepth_contador_circle input").css("margin-top",0);

$("#indepth_boton_empezar").on("click",function(){
	$("#indepth_boton_empezar").click(false);
	 ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
	 
	 var data = {
				  "preguntas": [
				    {
				      "pregunta": '<img src="images/preguntas/p1.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "THIERRY HENRY"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/p2.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "ZLATAN IBRAHIMOVIC"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/p3.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "ANGEL DI MARIA"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/p4.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "CRISTIAN TELLO"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/p5.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "VICTOR VALDES"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/p6.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "ANDRES GUARDADO"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/p7.png">',
				      "respuestas": [
				        {
				          "respuesta": "Sí",
				          "tipo": "CRISTIANO RONALDO"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/p8.png">',
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
				div_items+='<div class="indepth_respuesta_item active" num="'+items.tipo+'"><div class="output_respuesta"><div class="input_respuesta"><input type="text"></div><img class="respuesta" src="images/respuestas/'+ (i+1) +'.png"><div class="responder">R</div></div></div>';
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
			var txtResp = inputElement.val();
			var respuesta_cont = $(this).parent().parent();
			var pregunta_num = respuesta_cont.attr("num");
			//var respuesta_num = $(this).attr("num");
			//var pregunta_obj = preguntas[pregunta_num];
			//var respuesta_obj = pregunta_obj.respuestas[respuesta_num];

			if (txtResp == "") {
				return;
			}
			
			if(txtResp == pregunta_num){
				console.log("bien");
				respuesta.push(1);
			}else{
				console.log("mal");
				respuesta.push(0);
			}

			$(inputElement).prop('disabled', true);
			
			$(this).addClass("select");
			//respuesta.push(respuesta_num);
			console.log(respuesta);
			
			$(this).removeClass("active").addClass("disable");
			$(this).click(false);
			$(this).prev().show();
			$(this).hide();
				
				if(respuesta.length == preguntas.length){
					var total = countMaxValue(respuesta);
					window.setTimeout(function(){
						finish_test(total);
					});
				}
			return respuesta;
		});
		
		
		
});

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
		"background-image": "url("+urlIndepth+"images/respuestas/" + img + ".jpg)"
	});

  	var msg="";

  	if (total == "fiel"){
	  	msg="¡Todos quieren a alguien como tú! Tu fidelidad no se cuestiona. Es más, ni los del Atlas esperando 100 años por un título te superan";
  	} else if (total == "infiel"){
	  	msg="Te conocen como el Zlatan de tu colonia y no precisamente por jugar como él. Sólo sabes estar de equipo en equipo y así como hoy puede estar ganando “tu” equipo, mañana ya los cambiaste";
  	}
  	
  	$(".indepth_result_container").html(msg);

	$("#indepth_resultados").animate({
	  	"left": 0
  	},2000, function(){
	  	$("html, body, #indepth_page1").css("overflow","hidden");
  	});

  	$("#indepth_twittear").click(function(){
  		var text = "";
		if (total == "fiel") {
			text = encodeURIComponent("¡Todos quieren a alguien como tú! Tu fidelidad no se cuestiona. Es más, ni los del Atlas esperando 100 años por un título te superan");
		} else if (total == "infiel") {
			text = encodeURIComponent("Te conocen como el Zlatan de tu colonia y no precisamente por jugar como él. Sólo sabes estar de equipo en equipo y así como hoy puede estar ganando “tu” equipo, mañana ya los cambiaste");
		}
		
		var url = encodeURIComponent("http://juanfutbol.com/indepth/que-tan-fiel-le-eres-a-tu-equipo");
		window.open("https://twitter.com/share?text="+text+"&hashtags=JFQuiz&url="+url,"","width=500, height=300");
	});

	$("#indepth_facebook").click(function(){
		var url = encodeURIComponent("http://juanfutbol.com/indepth/que-tan-fiel-le-eres-a-tu-equipo?m="+total);
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


