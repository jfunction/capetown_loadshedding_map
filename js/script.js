$(document).ready(function() {
  console.log("OK");
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
  //CALENDAR
  var calendar = $('#calendar').fullCalendar({
    columnFormat: { week: 'dddd' },
    defaultView: 'basicWeek',
    editable: true,
    firstDay: 1,
    header: false
  });
  console.log(calendar);
  //LOADSHEDDING JSON DATA
  $.getJSON("capetown_tables_json_2.json", function(json) {
    console.log(json);
  });
});


