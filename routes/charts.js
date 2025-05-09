
const express = require("express")
const {CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement} = require('chart.js') ;
const {Canvas} = require('skia-canvas');
const router = express.Router();


Chart.register([
    CategoryScale,
    LineController,
    LineElement,
    LinearScale,
    PointElement
  ]);
router.get('/chart.png', async (req, res) => {
    const canvas = new Canvas(400, 300);
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'red'
        }]
      }
    });
  
    const pngBuffer = await canvas.toBuffer('png', { matte: 'white' });
    res.set('Content-Type', 'image/png');
    res.send(pngBuffer);
  });

  module.exports = router;