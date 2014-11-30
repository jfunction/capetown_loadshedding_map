var calendarEvents = [];
moment.locale('en', {week : { dow : 1 }}) // Monday is the 1st, not Sunday
var select;
$(document).ready(function() {
  //MAP
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      new ol.layer.Vector({
        source: new ol.source.KML(({
          extractStyles: true,
          url: 'data/doc.kml',
          projection: 'EPSG:900913'
        }))
      })
    ],
    view: new ol.View({
      center: ol.proj.transform([18.5,-34], 'EPSG:4326', 'EPSG:3857'),
      zoom: 10
    })
  });
  
  var update = function(zone, calendarEvents){
    stages = ['Stage 1', 'Stage 2', 'Stage 3A', 'Stage 3B'];
    $.each(jsonData, function(stage, timeIntervalDict){
      $.each(timeIntervalDict, function(timeInterval, dayDict){
        $.each(dayDict, function(day, zoneList){
          
          var dow = ((day == 'Sunday') ? 7 : moment().day(day).weekday());
          var thisHour = timeInterval.split(' to ')[0].split(':')[0];
          timeStart = moment('2014-12-0'+dow+'T'+thisHour+':00:00.000Z');
          timeEnd = timeStart.clone().add({hours:2,minutes:30});
          if (zoneList.indexOf(zone)>-1){
            var stageIndex = stages.indexOf(stage);
            if (stageIndex>0){ //TODO: perhaps we should find a better way to handle the data here.
              var prevStageZoneList = jsonData[stages[stageIndex-1]][timeInterval][day];
              var alreadyLoadShedding = prevStageZoneList.indexOf(zone)>-1;
              if(!alreadyLoadShedding){
                calendarEvents.push({
                                      title  : stage,
                                      start  : timeStart,
                                      end  : timeEnd,
                                      allDay : false,
                                      editable: false
                                    });
              }
            }else{
              calendarEvents.push({
                                      title  : stage,
                                      start  : timeStart,
                                      end  : timeEnd,
                                      allDay : false,
                                      editable: false
                                    });
            }
          }
        });
      });
    });
  }
  
  select = new ol.interaction.Select({ condition: ol.events.condition.click });
  select.getFeatures().on('add', function(e, a, b) { 
    zoneArray = e.target.a; 
    $(zoneArray).each(function(i, item){
    
      calendar.fullCalendar( 'removeEvents' );
      newCalendarEvents=[]
      update(item.p.name, newCalendarEvents)});
      calendar.fullCalendar('addEventSource', newCalendarEvents);
    
  });
  map.addInteraction(select);
  //CALENDAR
  var calendar = $('#calendar').fullCalendar({
    columnFormat: { week: 'dddd' },
    defaultView: 'agendaWeek',
    editable: true,
    events: calendarEvents,
    firstDay: 1,
    header: false
  });
  
  var dow = moment().zone('+0200').weekday();
  if (dow==0) dow=7;
  var today = moment('2014-12-0'+dow).day(dow);//strange hack.
  console.log(today)
  calendar.fullCalendar( 'gotoDate', today );
  //LOADSHEDDING JSON DATA
  var jsonData;
  jsonTable = $.getJSON("capetown_tables_json_2.json", function(json) {
    jsonData = json;
  });
});


