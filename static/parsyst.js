App = {}
App.socket = io.connect()

$(function(){
  $("#spinner").spinner().spinner("value", 120);
  $("#spinner").spinner({min: 40, max: 200});
  $("#SpinneR").spinner().spinner("value", 64);
  $("#SpinneR").spinner({
    min: 0, max: 127,
    spin: function(event, ui){App.socket.emit('pitch', ui.value);},
    change: function(event, ui){App.socket.emit('pitch', this.value);}
  });
  $("#random").button({label:"Randomize"}); $("#tact").hide(); 
  if (window.localStorage.length == 1) $("#tacts-head").hide();
  changetempo();
  help = -1; $("#Tact").val(-1);
  start();
  function start(){
    if (help ++ < 33){
      RP.val(help); LP.val(help); pray(); PRAY();
      $('#header').css({'background-image': 'url(L/' + images[LP.val()] + ')'});
      $('#Header').css({'background-image': 'url(R/' + Images[RP.val()] + ')'});
      setTimeout(start, 30);
    }
    else{
    	RP.val(9); LP.val(9); pray(); PRAY();
      $('#Header').css({'background-image': 'url(R/' + Images[9] + ')'});
      $('#header').css({'background-image': 'url(L/' + images[9] + ')'});
    };
  }; 
  $("#radio").buttonset(); $("#radio2").button("disable");   
  $("#random").button("disable");
  if (window.localStorage.length == 1){
  	 $("#tacts-head").hide();
    $("#sequence").button("disable"); $("#radio1").button("disable");
  };
  
  LS = $("#slider-range");
  RS = $("#Slider-range");
  LS.slider({
	 range: true, min: 26, max: 87, values: [46, 87],
	 slide: function( event, ui ){
		$("#amount").val(ui.values[0] + " - " + ui.values[1]);
		$("#tabl").val(mas[ui.values[0]])
	 }
  }).width(450);
  $("#amount").val(LS.slider("values", 0) + " - " + LS.slider("values", 1));
  RS.slider({
    range: true, min: 26, max: 87, values: [42, 87],
	 slide: function( event, ui ){
      $("#Amount").val(ui.values[0] + " - " + ui.values[1]);
		$("#Tabl").val(mas[ui.values[0]])
	 }
  }).width(450);
  $("#Amount").val(RS.slider("values", 0) + " - " + RS.slider("values", 1));
  $("#selectable").selectable({
    stop: function(event, ui){
      $(".ui-selected", this).each(function(){
        index = $("#selectable li").index(this);
        L[34][index] = 1; LP.val(34);
      });
    }
  });
  $("#selectable").selectable({
    start: function(event, ui){
      $(".ui-selected", this).each(function(){
        index = $("#selectable li").index(this);
        L[34][index] = 0;
      });
    }
  });	
  $("#Selectable").selectable({
    stop: function(event, ui){
      $(".ui-selected", this).each(function(){
        index = $("#Selectable li").index(this);
        R[34][index] = 1; RP.val(34);
      });
    }
  });
  $("#Selectable").selectable({
    start: function(event, ui){
      $(".ui-selected", this).each(function(){
        index = $("#Selectable li").index(this);
        R[34][index] = 0;
      });
    }
  });
  $("#accordion").accordion({
	  heightStyle: "fill" //,collapsible: true
  });
  
  App.socket.emit('ready', navigator.platform);
});
			
mas = {
26 : "Silence",	27 : "High-Q", 28 : "Slap", 29 : "Scratch Push", 30 : "Scratch Pull", 31 : "Sticks", 32 : "Square Click", 33 : "Metronome Click",
34 : "Metronome Bell", 35 : "Acoustic Bass Drum", 36 : "Bass Drum", 37 : "Side Stick", 38 : "Acoustic Snare", 39 : "Hand Clap", 40 : "Electric Snare",
41 : "Low Floor Tom", 42 : "Closed Hi Hat", 43 : "High Floor Tom", 44 : "Pedal Hi-Hat", 45 : "Low Tom", 46 : "Open Hi-Hat", 47 : "Low-Mid Tom",
48 : "Hi-Mid Tom", 49 : "Crash Cymbal 1", 50 : "High Tom", 51 : "Ride Cymbal 1", 52 : "Chinese Cymbal", 53 : "Ride Bell", 54 : "Tambourine", 55 : "Splash Cymbal",
56 : "Cowbell", 57 : "Crash Cymbal 2", 58 : "Vibraslap", 59 : "Ride Cymbal 2", 60 : "Hi Bongo", 61 : "Low Bongo", 62 : "Mute Hi Conga", 63 : "Open Hi Conga",
64 : "Low Conga", 65 : "High Timbale", 66 : "Low Timbale", 67 : "High Agogo", 68 : "Low Agogo", 69 : "Cabasa", 70 : "Maracas", 71 : "Short Whistle",
72 : "Long Whistle", 73 : "Short Guiro", 74 : "Long Guiro", 75 : "Claves", 76 : "Hi Wood Block", 77 : "Low Wood Block", 78 : "Mute Cuica", 79 : "Open Cuica",
80 : "Mute Triangle", 81 : "Open Triangle", 82 : "Shaker", 83 : "Jingle Bell", 84 : "Bell Tree", 85 : "Castanets", 86 : "Mute Surdo", 87 : "Open Surdo"
}

function show(){
  $("#amount").val(LS.slider("values", 0) + " - " + LS.slider("values", 1));
  $("#tabl").val(mas[LS.slider("values", 0)])	
}
function Show(){
  $("#Amount").val(RS.slider("values", 0) + " - " + RS.slider("values", 1));
  $("#Tabl").val(mas[RS.slider("values", 0)])
}
 
Images = [
  '0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', 
  '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg', '33.jpg'
];
images = [
  '0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg',
  '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg', '33.jpg'
];
    
$('#f0 select').change(function(){
  if(typeof($("#f0 :selected").val()) !== "undefined"){
    LP.val($("#f0 :selected").val());
  }
  $("#invert").is(":checked") ? 
    $('#header').css({'background-image': 'url(R/' + Images[LP.val()] + ')'}) :
    $('#header').css({'background-image': 'url(L/' + images[LP.val()] + ')'});
  if($("#Linear").is(":checked")){
	 RP.val($("#f0 :selected").val()); pray(); PRAY();
    $('#Header').css({'background-image': 'url(R/' + Images[RP.val()] + ')'}) 
    if($("#Invert").is(":checked")){
  	   $('#Header').css({'background-image': 'url(L/' + images[RP.val()] + ')'});
  	 }
  }
});
$('#f1 select').change(function(){
  if(typeof($("#f1 :selected").val()) !== "undefined"){	
    RP.val($("#f1 :selected").val());
  }
  $("#Invert").is(":checked") ? 
    $('#Header').css({'background-image': 'url(L/' + images[RP.val()] + ')'}) :
    $('#Header').css({'background-image': 'url(R/' + Images[RP.val()] + ')'});
  if($("#Linear").is(":checked")){
  	 LP.val($("#f1 :selected").val()); PRAY(); pray();
    $('#header').css({'background-image': 'url(L/' + images[LP.val()] + ')'})
    if($("#invert").is(":checked")){
    	$('#header').css({'background-image': 'url(R/' + Images[LP.val()] + ')'});
    }
  }
});  	
  
Count = 1; playing = 0; Playing = 0; PLAYING = 0; interval = 500; var Timeout, TIMEOUT;

L = [
  [0,1,0,1,0,1,0,1], [0,1,0,1,1,0,0,1], [0,1,1,0,0,1,0,1], [0,1,0,0,1,0,0,1], [0,1,1,0,1,1,0,1], [0,1,1,0,1,0,0,1], [0,1,0,0,1,1,0,1], [0,1,0,1,0,0,1,1], [0,1,0,1,1,0,1,1], 
  [0,1,0,0,1,0,1,1], [0,1,1,0,1,0,1,1], [0,1,0,1,1,0,1,0], [0,1,0,1,0,0,1,0], [0,1,0,0,1,0,1,0], [0,1,1,0,1,0,1,0], [0,1,0,1,0,1,1,0], [0,1,1,0,0,1,1,0], [0,1,1,0,0,1,0,0], 
  [0,1,1,0,1,1,0,0], [0,1,0,1,0,1,0,0], [0,1,0,0,1,1,0,0], [0,0,1,1,0,0,1,1], [0,0,1,0,1,0,1,1], [0,0,1,1,0,1,0,1], [0,0,1,0,0,1,0,1], [0,0,1,0,1,1,0,1], [0,0,1,0,1,0,0,1], 
  [0,0,1,0,0,1,0,0], [0,0,1,0,1,1,0,0], [0,0,1,1,0,1,0,0], [0,0,1,0,0,1,1,0], [0,0,1,1,0,1,1,0], [0,0,1,0,1,0,1,0], [0,0,1,1,0,0,1,0], [0,0,0,0,0,0,0,0]
] 
R = [
  [1,0,1,0,1,0,1,0], [1,0,1,0,0,1,1,0], [1,0,0,1,1,0,1,0], [1,0,1,1,0,1,1,0], [1,0,0,1,0,0,1,0], [1,0,0,1,0,1,1,0], [1,0,1,1,0,0,1,0], [1,0,1,0,1,1,0,0], [1,0,1,0,0,1,0,0],
  [1,0,1,1,0,1,0,0], [1,0,0,1,0,1,0,0], [1,0,1,0,0,1,0,1], [1,0,1,0,1,1,0,1], [1,0,1,1,0,1,0,1], [1,0,0,1,0,1,0,1], [1,0,1,0,1,0,0,1], [1,0,0,1,1,0,0,1], [1,0,0,1,1,0,1,1],
  [1,0,0,1,0,0,1,1], [1,0,1,0,1,0,1,1], [1,0,1,1,0,0,1,1], [1,1,0,0,1,1,0,0], [1,1,0,1,0,1,0,0], [1,1,0,0,1,0,1,0], [1,1,0,1,1,0,1,0], [1,1,0,1,0,0,1,0], [1,1,0,1,0,1,1,0],
  [1,1,0,1,1,0,1,1], [1,1,0,1,0,0,1,1], [1,1,0,0,1,0,1,1], [1,1,0,1,1,0,0,1], [1,1,0,0,1,0,0,1], [1,1,0,1,0,1,0,1], [1,1,0,0,1,1,0,1], [0,0,0,0,0,0,0,0]
]

$("select").focus(function(){
  if(this.id.indexOf('R') == 0){
  	 $('#f1 option').attr('selected',false);
  }
  else{
  	 $('#f0 option').attr('selected',false);
  } 
});

RP = $("#Pattern"); 
RP.click(function(){this.select()}); 
RP.change(function(){PRAY()});
  
function PRAY(){
  Value = RP.val(); 
  if(Value =="21"){$("#R5").focus(); $("#R5").val('21')}
  if(Value =="22"){$("#R5").focus(); $("#R5").val('22')}
  if(Value =="23"){$("#R6").focus(); $("#R6").val('23')}
  if(Value =="24"){$("#R6").focus(); $("#R6").val('24')}    
  if(Value =="25"){$("#R6").focus(); $("#R6").val('25')}
  if(Value =="26"){$("#R6").focus(); $("#R6").val('26')} 
  if(Value =="27"){$("#R7").focus(); $("#R7").val('27')}
  if(Value =="28"){$("#R7").focus(); $("#R7").val('28')}    
  if(Value =="29"){$("#R7").focus(); $("#R7").val('29')} 
  if(Value =="30"){$("#R8").focus(); $("#R8").val('30')}
  if(Value =="31"){$("#R8").focus(); $("#R8").val('31')}    
  if(Value =="32"){$("#R8").focus(); $("#R8").val('32')}
  if(Value =="33"){$("#R8").focus(); $("#R8").val('33')}
  if(Value =="0"){$("#R1").focus(); $("#R1").val('0')}
  if(Value =="1"){$("#R1").focus(); $("#R1").val('1')}    
  if(Value =="2"){$("#R1").focus(); $("#R1").val('2')}
  if(Value =="3"){$("#R1").focus(); $("#R1").val('3')}    
  if(Value =="4"){$("#R1").focus(); $("#R1").val('4')}    
  if(Value =="5"){$("#R1").focus(); $("#R1").val('5')}
  if(Value =="6"){$("#R1").focus(); $("#R1").val('6')}    
  if(Value =="7"){$("#R2").focus(); $("#R2").val('7')}    
  if(Value =="8"){$("#R2").focus(); $("#R2").val('8')}    
  if(Value =="9"){$("#R2").focus(); $("#R2").val('9')}
  if(Value =="10"){$("#R2").focus(); $("#R2").val('10')}
  if(Value =="11"){$("#R3").focus(); $("#R3").val('11')}
  if(Value =="12"){$("#R3").focus(); $("#R3").val('12')}    
  if(Value =="13"){$("#R3").focus(); $("#R3").val('13')}
  if(Value =="14"){$("#R3").focus(); $("#R3").val('14')}    
  if(Value =="15"){$("#R3").focus(); $("#R3").val('15')}    
  if(Value =="16"){$("#R3").focus(); $("#R3").val('16')}
  if(Value =="17"){$("#R4").focus(); $("#R4").val('17')}
  if(Value =="18"){$("#R4").focus(); $("#R4").val('18')}    
  if(Value =="19"){$("#R4").focus(); $("#R4").val('19')}
  if(Value =="20"){$("#R4").focus(); $("#R4").val('20')}             
}

LP = $("#pattern"); 
LP.click(function(){this.select()});
LP.change(function(){pray()});
 
function pray(){
  value = LP.val();
  if(value =="0"){$("#L1").focus(); $("#L1").val('0')}
  if(value =="1"){$("#L1").focus(); $("#L1").val('1')}    
  if(value =="2"){$("#L1").focus(); $("#L1").val('2')}
  if(value =="3"){$("#L1").focus(); $("#L1").val('3')}    
  if(value =="4"){$("#L1").focus(); $("#L1").val('4')}    
  if(value =="5"){$("#L1").focus(); $("#L1").val('5')}
  if(value =="6"){$("#L1").focus(); $("#L1").val('6')}    
  if(value =="7"){$("#L2").focus(); $("#L2").val('7')}    
  if(value =="8"){$("#L2").focus(); $("#L2").val('8')}    
  if(value =="9"){$("#L2").focus(); $("#L2").val('9')}
  if(value =="10"){$("#L2").focus(); $("#L2").val('10')}
  if(value =="11"){$("#L3").focus(); $("#L3").val('11')}
  if(value =="12"){$("#L3").focus(); $("#L3").val('12')}    
  if(value =="13"){$("#L3").focus(); $("#L3").val('13')}
  if(value =="14"){$("#L3").focus(); $("#L3").val('14')}    
  if(value =="15"){$("#L3").focus(); $("#L3").val('15')}    
  if(value =="16"){$("#L3").focus(); $("#L3").val('16')}
  if(value =="17"){$("#L4").focus(); $("#L4").val('17')}
  if(value =="18"){$("#L4").focus(); $("#L4").val('18')}    
  if(value =="19"){$("#L4").focus(); $("#L4").val('19')}
  if(value =="20"){$("#L4").focus(); $("#L4").val('20')} 
  if(value =="21"){$("#L5").focus(); $("#L5").val('21')}
  if(value =="22"){$("#L5").focus(); $("#L5").val('22')}
  if(value =="23"){$("#L6").focus(); $("#L6").val('23')}
  if(value =="24"){$("#L6").focus(); $("#L6").val('24')}    
  if(value =="25"){$("#L6").focus(); $("#L6").val('25')}
  if(value =="26"){$("#L6").focus(); $("#L6").val('26')} 
  if(value =="27"){$("#L7").focus(); $("#L7").val('27')}
  if(value =="28"){$("#L7").focus(); $("#L7").val('28')}    
  if(value =="29"){$("#L7").focus(); $("#L7").val('29')} 
  if(value =="30"){$("#L8").focus(); $("#L8").val('30')}
  if(value =="31"){$("#L8").focus(); $("#L8").val('31')}    
  if(value =="32"){$("#L8").focus(); $("#L8").val('32')}
  if(value =="33"){$("#L8").focus(); $("#L8").val('33')}          
}
  
$("#RAND").button({label:"R.P."});
$("#RAND").mousedown(function(){ 
  var Img = Math.floor(Math.random() * Images.length);
  var img = Math.floor(Math.random() * images.length);
  LP.val(img); pray(); RP.val(Img); PRAY();
  if($("#Invert").is(":checked")){
 	 $('#Header').css({'background-image': 'url(L/' + images[Img] + ')'});
    $('#header').css({'background-image': 'url(L/' + images[img] + ')'});
  }
  else{
 	 $('#Header').css({'background-image': 'url(R/' + Images[Img] + ')'});
  }
  if($("#invert").is(":checked")){
 	 $('#header').css({'background-image': 'url(R/' + Images[img] + ')'});
    $('#Header').css({'background-image': 'url(R/' + Images[Img] + ')'});
  }
  else{
 	 $('#header').css({'background-image': 'url(L/' + images[img] + ')'});
  }
  if($("#Linear").is(":checked")){
 	 LP.val(img); pray(); RP.val(img); PRAY();
    $('#Header').css({'background-image': 'url(R/' + Images[img] + ')'});
    if($("#Invert").is(":checked")){
 	   $('#Header').css({'background-image': 'url(L/' + images[img] + ')'});
    }
  };
  if($("#Invert").is(":checked") && $("#invert").is(":checked")){
    $('#Header').css({'background-image': 'url(L/' + images[Img] + ')'});
  }
});
  
$("#rand").button({ label:"R.N."});
$("#rand").mousedown(function(){
  LS.slider("option", "values", [(Math.floor(Math.random() * (LS.slider("values", 1) -27 + 1) + 27)), LS.slider("values", 1)]);
  show();
  RS.slider("option", "values", [(Math.floor(Math.random() * (RS.slider("values", 1) -27 + 1) + 27)), RS.slider("values", 1)]);
  Show();
}); 

$("#play").button({label:"Play"});
$("#play").click(function(){
  if(set.length !==0 && Set.length !==0 ){
  	 $("#random").button("enable");
  }	  
  if($("#Invert").is(":checked") || $("#invert").is(":checked")){count = -1}
  else{count = -2};
  if(playing == 0){
  	 playing=1; $("#play").button("option", "label", "Stop"); func();
  }
  else{
  	 playing=0; $("#play").button("option", "label", "Play");
    clearTimeout(timeout); Playing = 0; clearTimeout(Timeout); clearTimeout(TIMEOUT);
    if(window.localStorage.length !== 1 && $("#sequence").button("option", "disabled")){
    	$("#tact").hide(); PLAYING = 0; $("#sequence").button("enable");
    };
  };
  function func(){
  	 changetempo(); $("#sequence").button("disable");  
    if((count += 1) == 8) count=0; $("#tap").val(count + 1);
    
    count == 0 ? $("#tap").css("background", "#f35555") : $("#tap").css("background", "#caeef0");
    if($("#Solo").is(":checked")){
	   var z = Math.floor(Math.random() * (RS.slider("values", 1) - RS.slider("values", 0) + 1) + RS.slider("values", 0));  
      if($("#Invert").is(":checked")){
	     ri = !R[RP.val()][count] ? z : 0;
	   }
      else{
    	  ri = R[RP.val()][count] ? z : 0;
    	};
    }
    else{
    	if($("#Invert").is(":checked")){
    	  ri = !R[RP.val()][count] ? RS.slider("values", 0) : 0;
      }
      else{
        ri = R[RP.val()][count] ? RS.slider("values", 0): 0;
      };
    };
   
    if($("#solo").is(":checked")){
	   var y = Math.floor(Math.random() * (LS.slider("values", 1) - LS.slider("values", 0) + 1) + LS.slider("values", 0));  
      if($("#invert").is(":checked")){
	     le = !L[LP.val()][count] ? y : 0;
	   }
      else{
     	  le = L[LP.val()][count] ? y : 0;
      };
    }
    else{
      if($("#invert").is(":checked")){
   	  le = !L[LP.val()][count] ? LS.slider("values", 0) : 0;
      }
      else{
	     le = L[LP.val()][count] ? LS.slider("values", 0) : 0;
      };
    };
    data = {l: le, r: ri};
    App.socket.emit('mididata', data);

    metronome();
    if($("#swing").is(":checked") && count % 2 == 0){
      interval *= 1.5;
    };
    timeout = setTimeout(func, interval);
  };
  $("#random").mousedown(function(){
  	 if(Playing == 0){
  	   Playing = 1; randomize();
    }

    function randomize(){
    	var minus = [7,0,1,2,3,4,5,6]; var last = minus[count]; var blast = minus[last];
 	   if(Set.length == 1){
        if($("#Invert").is(":checked")){
   		 !R[RP.val()][count] == 1 ? $("div div.seta").eq(0).css("background", "#fff") : $("div div.seta").eq(0).css("background", "#fee");
   	  } 
   	  else{		
      	 R[RP.val()][count] == 1 ? $("div div.seta").eq(0).css("background", "#fff") : $("div div.seta").eq(0).css("background", "#fee");
    	  };
      }
      else{
        if($("#Invert").is(":checked")){
          if(!R[RP.val()][blast] == 0 && !R[RP.val()][last] == 1){Visual();}
        } 
        else{
          if(R[RP.val()][blast] == 0 && R[RP.val()][last] == 1){Visual();}
        };
      };
      if(set.length == 1){
	     if($("#invert").is(":checked")){
   		 !L[LP.val()][count] == 1 ? 
    	    $("div div.seti").eq(0).css("background", "#fff") : $("div div.seti").eq(0).css("background", "#fee");
   	  }
   	  else{		
    	    L[LP.val()][count] == 1 ? $("div div.seti").eq(0).css("background", "#fff") : $("div div.seti").eq(0).css("background", "#fee");
   	  };
      }
      else{
        if($("#invert").is(":checked")){
          if(!L[LP.val()][blast] == 0 && !L[LP.val()][last] == 1){visual();}
        } 
        else{
     	    if(L[LP.val()][blast] == 0 && L[LP.val()][last] == 1){visual();}
     	  };  
      };
      Timeout = setTimeout(randomize, interval) 
    }; 
  });                      
});

function visual(){
  var sound = Math.floor(Math.random() * set.length);
  LS.slider("option", "values", [(set[sound]), LS.slider("values", 1)]); show();
  $("div div.seti").each(function(i){
    sound == i ? $("div div.seti").eq(i).css("background", "#fff") : $("div div.seti").eq(i).css("background", "#fee");
  });
};
        
function Visual(){ 
  var Sound = Math.floor(Math.random() * Set.length);
  RS.slider("option", "values", [(Set[Sound]), RS.slider("values", 1)]); Show();
  Sound == 0 ? $("div div.seta").eq(0).css("background", "#fff") : $("div div.seta").eq(0).css("background", "#fee");
  Sound == 1 ? $("div div.seta").eq(1).css("background", "#fff") : $("div div.seta").eq(1).css("background", "#fee");	
}; 
                               
$("#Invert").change(function(){
  (this.checked) ? $('#Header').css({'background-image': 'url(L/' + images[RP.val()] + ')'}) : $('#Header').css({'background-image': 'url(R/' + Images[RP.val()] + ')'});
});
$("#invert").change(function(){
  (this.checked) ? $('#header').css({'background-image': 'url(R/' + Images[LP.val()] + ')'}) : $('#header').css({'background-image': 'url(L/' + images[LP.val()] + ')'});
});
function metronome(){
  if($("#Metronome").is(":checked")) App.socket.emit('time', count ? 0 : 34);
};
   
$(function(){
  $("#amount").focus(function(){this.blur();}); $("#Amount").focus(function(){this.blur();});  
  $("#tabl").focus(function(){this.blur();}); $("#Tabl").focus(function(){this.blur();}); 
  $("th[title*='left']").mouseover(function(){ 
    $(this).css("background","#FEE994"); $("#amount").css("background","#FEE994");
  })
  .mouseout(function (){ 
    $(this).css("background","#FFFCEA"); $("#amount").css("background","#FFFCEA");
  });
  $("th[title*='range']").mouseover(function(){
    $(this).css("background","#FEE994"); $( "#amount" ).css("background","#FEE994");
  })
  .mouseout(function(){
    $(this).css("background","#FFFCEA"); $( "#amount" ).css("background","#FFFCEA");
  });
  $("th[title*='right']").mouseover(function(){ 
    $(this).css("background","#FEE994"); $("#Amount").css("background","#FEE994");
  })
  .mouseout(function(){ 
    $(this).css("background","#FFFCEA"); $("#Amount").css("background","#FFFCEA");
  });
  $("th[title*='Range']").mouseover(function(){ 
    $(this).css("background","#FEE994"); $("#Amount").css("background","#FEE994");
  })
  .mouseout(function(){ 
    $(this).css("background","#FFFCEA"); $("#Amount").css("background","#FFFCEA");
  });
  $("th[title*='index']").mouseover(function(){ 
    $(this).css("background","#E3C7F0"); LP.css("background","#E3C7F0");
  })
  .mouseout(function(){ 
    $(this).css("background","#FFFCEA"); LP.css("background","#FFFCEA");
  });
  $("th[title*='Index']").mouseover(function(){ 
    $(this).css("background","#E3C7F0"); RP.css("background","#E3C7F0");
  })
  .mouseout(function(){ 
    $(this).css("background","#FFFCEA"); RP.css("background","#FFFCEA");
  });
  $("th[title='Measures']").mouseover(function(){
    $(this).css("background","#FDBEAF"); $("#Tact").css("background","#FDBEAF");
  })
  .mouseout(function(){ 
    $(this).css("background","#FFFCEA"); $("#Tact").css("background","#FFFCEA");
  }); 	
  $("#tap").focus(function(){this.blur();});	
  $("#tap").mouseover(function(){this.value=0; $("#tap").css("background","#caeef0")});
  $("#tap").mousedown(function(){this.value ++; tap();}); 
  function tap(){
    if($("#tap").val() == 9)$("#tap").val(1);
    var lt = L[LP.val()][$("#tap").val() - 1] ? LS.slider("values", 0) : 0;
    var rt = R[RP.val()][$("#tap").val() - 1] ? RS.slider("values", 0) : 0;
    data = {l: lt, r: rt};
    App.socket.emit('tap', data);
    
    $("#tap").val() == 1 ? $("#tap").css("background","#f35555") : $("#tap").css("background","#ceefe3");
  };     
});
    
$("#Tact").click(function(){this.select()});
$("#rec").click(function(){window.open("Record_MIDI.html", "_blank", "width=360, height=276");});    
$("#ps").click(function(){window.open("http://paradiddles-system3.appspot.com/", "_blank");});      
     
$("#sequence").mousedown(function(){
  $("#play").click(); var N = -1;
  if(PLAYING == 0){
  	 PLAYING = 1; sequencing();
  } 
  else{
  	 PLAYING = 0; clearTimeout(TIMEOUT); $("#tact").hide();
  };
  function sequencing(){ 
    $("#radio2").button("enable"); $("#tact").show();
    var tr = (8 * $("#Tact").val()) -1;
    if(N ++ === tr){
  	   N = 0; Count ++; var w = Math.floor(Math.random() * ($('tr').length - 1) + 1);
    }  
  	  var seq = function(tact){
  	 	 $("#tact").val(tact);
    	 document.getElementsByTagName('tr')[tact].getElementsByTagName('td')[9].getElementsByTagName('a')[0].click();
    	 for(var i = 1; i <= $('tr').length - 1; i++){
        document.getElementsByTagName('tr')[i].getElementsByTagName('td')[9].getElementsByTagName('a')[0].style.color = 'DarkGray';    
        document.getElementsByTagName('tr')[tact].getElementsByTagName('td')[9].getElementsByTagName('a')[0].style.color = 'black';
      };
    };       
    if(Count == $('tr').length) Count = 1;
    if($("#radio1").is(":checked")){ 
      seq(Count);
    };
    if($("#radio2").is(":checked")){ 
      if(typeof w !== "undefined"){ 
        seq(w);
      };
    };
    TIMEOUT = setTimeout(sequencing, interval);   
  };
});
           
set = []; Set = [];
$("a[title='Left']").dblclick(function(){
  if($.inArray(LS.slider("values", 0), set) == -1 && set.length <= 7){
    set.push(LS.slider("values", 0)); var setind = set.indexOf(LS.slider("values", 0));
      for (var r = 1; r <= set.length; r++){
  	     var instr = $('<div>', {
	       id: 'inst'+ r , class: 'seti', title: 'drag it', text: mas[LS.slider("values", 0)],
	       dblclick : function(){
	         if(set.length > 1){
	           var index = $('div div.seti').index(this);
	           set.splice(index, 1); $("div div.seti").eq(index).remove();
	           if(set.length == 1){
	             LS.slider("option", "values", [(set.valueOf()), LS.slider("values", 1)]); show();
	           };
	         };
	       }
        });
      };
    $('#drumset').append(instr);
    $(".seti").draggable({containment: [513, 264, 733, 345]});
  };
});  
$("a[title='Right']").dblclick(function(){ 
  if($.inArray(RS.slider("values", 0), Set) == -1 && Set.length <= 1){ 
    Set.push(RS.slider("values", 0)); var SetInd = Set.indexOf(RS.slider("values", 0));
    for (var R = 1; R <= Set.length; R++){
  	   var Instr = $('<div>',{
	     id: 'Inst'+ R, class: 'seta', title: 'drag it', text: mas[RS.slider("values", 0)],
	     dblclick : function(){
	     	 if (Set.length > 1){
	         var Index = $('div div.seta').index(this);
	         Set.splice(Index, 1); $("div div.seta").eq(Index).remove();
		      if(Set.length == 1){
			     RS.slider("option", "values", [(Set.valueOf()), RS.slider("values", 1)]); Show();
	         };
	       }}
      });
    };
  };
  $('#drumset').append(Instr);
  $(".seta").draggable({containment: [513, 378, 733, 440]});
});
  
$("#selectmidi").change(function(){
  App.socket.emit('selectmidi', select_out.options[select_out.selectedIndex].value);
});
  
$("#spinner").click(function(){this.select()});

function changetempo(){ 
  interval = (60000./$("#spinner").val()) * 0.25;
};

var select_out = document.getElementById('selectmidi');

App.socket.on('list', function(data){
  var list = data;
  try{
    for(var i in list){
    	console.log(list[i]);
      select_out[i]=new Option(list[i],list[i],i==10,i==10);
    };
  document.getElementById('selectmididiv').className='';
  }
  catch(err){}
}) 
      
Tacts = {
  index: window.localStorage.getItem("Tacts:index"),
  $table: document.getElementById("tacts-table"),
  $form: document.getElementById("tacts-form"),
  $button_save: document.getElementById("tacts-op-save"),
  init: function(){// initialize storage index
	 if(!Tacts.index){
		window.localStorage.setItem("Tacts:index", Tacts.index = 1);
	 };
    Tacts.$form.addEventListener("submit", function(event){ 
	   $("#tacts-head").show(); $("#sequence").button("enable"); $("#radio1").button("enable");
	   var entry = {
		  id: parseInt(this.id_entry.value),
		  note: LS.slider("values", 0),
		  note_2: LS.slider( "values", 1),
		  Note: RS.slider("values", 0),
		  Note_2: RS.slider("values", 1),
		  pattern: this.pattern.value,
		  Pattern: this.Pattern.value,
		  tacts: $("#Tact").val(),
		  tempo: $("#spinner").val()
	   };
      if (entry.id == 0){// add
	     Tacts.storeAdd(entry);
	     Tacts.tableAdd(entry);//clearTimeout(Timeout);
      }
      else{// edit
	     Tacts.storeEdit(entry);
	     Tacts.tableEdit(entry);
      };
      this.id_entry.value = 0;
      event.preventDefault();
    }, true);
  // initialize table
    if(window.localStorage.length - 1){
	   var tacts_list = [], i, key;
	   for(i = 0; i < window.localStorage.length; i++){
		  key = window.localStorage.key(i);
		  if(/Tacts:\d+/.test(key)){
		    tacts_list.push(JSON.parse(window.localStorage.getItem(key)));
		  };
	   };
      if(tacts_list.length){
	     tacts_list.sort(function(a, b){
		    return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
	     }).forEach(Tacts.tableAdd);
      };
    };  
    Tacts.$table.addEventListener("click", function(event){
	   var op = event.target.getAttribute("data-op");
      if(/edit|remove/.test(op)){
		  var entry = JSON.parse(window.localStorage.getItem("Tacts:"+ event.target.getAttribute("data-id")));
		  if(op == "edit"){
		    LS.slider("option", "values", [(entry.note ),(entry.note_2 )]); show();
		    RS.slider("option", "values", [(entry.Note ),(entry.Note_2 )]); Show();
			 Tacts.$form.pattern.value = entry.pattern; pray();
			 $('#header').css({'background-image': 'url(L/' + Images[LP.val()] + ')'});
			 Tacts.$form.Pattern.value = entry.Pattern; PRAY();
			 $('#Header').css({'background-image': 'url(R/' + Images[RP.val()] + ')'});				
		    Tacts.$form.id_entry.value = entry.id;
			 $("#Tact").val(entry.tacts);
		    $("#spinner").spinner().spinner("value", (entry.tempo));
		  }
		  else if(op == "remove"){
		    //if (confirm('Are you sure you want to remove "'+ entry.note +' '+ entry.Note +'" from your tacts?'))
		    Tacts.storeRemove(entry);
		    Tacts.$form.pattern.value = 0;
		    //$("#patterN").val(L[LP.val()]);
		    pray();
		    $("#header").css({'background-image': 'url(L/' + Images[LP.val()] + ')'});
		    Tacts.$form.Pattern.value = 0;
		    //$("#PatterN").val(R[RP.val()]);
		    PRAY();
		    $("#Header").css({'background-image': 'url(R/' + Images[RP.val()] + ')'});								
		    LS.slider("option", "values", [46,88]); show();
		    RS.slider("option", "values", [42,88]); Show();
		    Tacts.tableRemove(entry);
		    if (window.localStorage.length == 1){
		    	$("#tacts-head").hide();
		      $("#sequence").button("disable"); $("#radio1").button("disable");
		      PLAYING=0; clearTimeout(TIMEOUT); $("#tact").hide();
		      $("#radio2").button("disable");
		    };
	     };
      };
    }, true);
  },
  storeAdd: function(entry){
	 entry.id = Tacts.index;
	 window.localStorage.setItem("Tacts:index", ++Tacts.index);
	 window.localStorage.setItem("Tacts:" + entry.id, JSON.stringify(entry));
  },
  storeEdit: function(entry){
	 window.localStorage.setItem("Tacts:"+ entry.id, JSON.stringify(entry));
  },
  storeRemove: function(entry){
	 window.localStorage.removeItem("Tacts:"+ entry.id);
  },
  tableAdd: function(entry){
	 var $tr = document.createElement("tr"), $td, key;
	 for(key in entry){
		if(entry.hasOwnProperty(key)){
		  $td = document.createElement("td");
			 $td.appendChild(document.createTextNode(entry[key]));
			 $tr.appendChild($td);
		};
	 };
	 $td = document.createElement("td");
	 $td.innerHTML = '<a data-op="edit" data-id="'+ entry.id + '">Edit</a> | <a data-op="remove" data-id="' + entry.id + '">Remove</a>';
	 $tr.appendChild($td);
	 $tr.setAttribute("id", "entry-" + entry.id);
	 Tacts.$table.appendChild($tr);
  },
  tableEdit: function(entry){
	 var $tr = document.getElementById("entry-"+ entry.id), $td, key;
	 $tr.innerHTML = "";
	 for(key in entry){
		if (entry.hasOwnProperty(key)){
		  $td = document.createElement("td");
		  $td.appendChild(document.createTextNode(entry[key]));
		  $tr.appendChild($td);
		};
	 };
	 $td = document.createElement("td");
    $td.innerHTML = '<a data-op="edit" data-id="'+ entry.id +'">Edit</a> | <a data-op="remove" data-id="'+ entry.id +'">Remove</a>';
	 $tr.appendChild($td);
  },
  tableRemove: function(entry){
	 Tacts.$table.removeChild(document.getElementById("entry-"+ entry.id));
  }
};
Tacts.init();
