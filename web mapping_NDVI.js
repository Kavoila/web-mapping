var srtm = ee.Image("USGS/SRTMGL1_003"),
forest = ee.Image("UMD/hansen/global_forest_change_2016_v1_4"),
geometry = /* color: #d6561f */ee.Geometry.MultiPoint(),
l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1");
 
// add the map layers to the display
Map.addLayer(srtm, {min: 0, max: 3000}, 'srtm');
Map.addLayer(forest, {bands: 'loss', max: 1}, 'loss');
Map.addLayer(forest,{bands: 'gain', max :1}, 'forest gained' );

// Extract the bands  of the lost  and gained forest covers and display them separately on the map.
 var loss = forest.select('loss');
 var gain = forest.select('gain');
 Map.addLayer(loss.updateMask(loss), {palette:'#f00c0c'}, 'forest loss');
 
 Map.addLayer(gain.updateMask(gain), {palette: '#10f00c'}, 'forest gained');
 // create a composite image of the forest cover

 
var composite = ee.Algorithms.Landsat.simpleComposite({
  collection :l8.filterDate ('2021-01-01', '2022-01-01'),
  asFloat: true
});


var truecolor ={ min: 0.0, max: 0.3, bands: ['B4', 'B3', 'B2']};

Map.addLayer( composite,truecolor, 'composite');

  // compute NDVI
  var ndvi = composite.normalizedDifference(['B5', 'B4']).rename('NDVI');
 // to dispay the NDVI on the map, use the code below.
 Map.addLayer(ndvi,{min:0, max:1, palette:["#f0e10c", "#0cf02e"]}," ndvi");
 

