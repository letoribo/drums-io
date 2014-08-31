express = require('./')
app = express().http().io()
var teoria = require('teoria');
var Express = require('express');
var ap = Express();
ap.set('title', 'Paradiddles-System');
console.log(ap.get('title'))

if(process.platform=="win32") var jazz = require('jazz-midi/bin/win32/jazz');
else if(process.platform=="darwin"&&process.arch=="x64") var jazz = require('jazz-midi/bin/macos64/jazz');
else if(process.platform=="darwin"&&process.arch=="ia32") var jazz = require('jazz-midi/bin/macos32/jazz');
else if(process.platform=="linux"&&process.arch=="x64") var jazz = require('jazz-midi/bin/linux64/jazz');
else if(process.platform=="linux"&&process.arch=="ia32") var jazz = require('jazz-midi/bin/linux32/jazz');

console.log("isJazz:", jazz.isJazz);
console.log(jazz.Time());

Jazz = new jazz.MIDI();
app.io.route('ready', function(req){
  app.io.broadcast('list', jazz.MidiOutList());
})

app.io.route('time', function(req){
  count = req.data;
  Jazz.MidiOut(0x99,count,119);
});

app.io.route('tap', function(req){
  var lt = req.data.l; var rt = req.data.r;
  Jazz.MidiOut(0x99, lt, 127);
  Jazz.MidiOut(0x99, rt, 127);
})

app.io.route('selectmidi', function(req) {console.log(req.data);
  Jazz.MidiOutOpen(req.data);
})

app.io.route('pitch', function(req) {//console.log(req.data);
  Jazz.MidiOut(0xe9, 0, req.data); 
})

app.io.route('mididata', function(req){
  /*var notes = req.data;
  for(i in notes){
	 console.log(notes[i]);
  }*/
  var scientific = function(n){return teoria.note.fromMIDI(n).scientific();}
  var l = req.data.l; if(l !== 0) console.log(scientific(l));
  var r = req.data.r; if(r !== 0) console.log(scientific(r));
  Jazz.MidiOut(0x99, l, 111);
  Jazz.MidiOut(0x99, r, 111);
})

app.use(express.static(__dirname + '/static'));
var port = Number(process.env.PORT || 7077);
app.listen(port)