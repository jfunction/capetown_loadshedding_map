Cape Town Loadshedding Map
==========================

Interactive loadshedding map for Cape Town.

Not really sure where I'm going with this for now... let's see what we can do :)

Step 1 - Head over to https://magic.import.io/?site=http://www.capetown.gov.za/en/electricity/Pages/LoadShedding.aspx to get tables
Throw these into Excel.
This is not the most ideal for the web, so jsonify each stage info by going to http://shancarter.github.io/mr-data-converter/
Results still not great, so throw it in python to clean that up. The script we create in this step will allow us to fine grain how the data are organized later.

Step 2 - Get a calendar up in the browser, ready to accept data. Use calendar lib from http://fullcalendar.io

Step 3 - Pull the json data into the browser. use python tool to get it into nice looking json.

Step 4 - Included map using openlayers. Idea came from dropping the kml file into http://openlayers.org/en/v3.0.0/examples/drag-and-drop.html

Step 5 - Data binding using javascript.

Step 6 - Todo... Ideas?
