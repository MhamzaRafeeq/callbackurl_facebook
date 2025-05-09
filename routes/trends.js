const express = require("express")
const { Canvas } = require('skia-canvas');
const {
  Chart,
  CategoryScale,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title
} = require('chart.js');

const router = express.Router();


Chart.register([
    CategoryScale,
    LineController,
    LineElement,
    LinearScale,
    PointElement,
    Title
  ]);





// Add this to your Express app
router.get('/trend.png', async (req, res) => {
    // Example time-series data
    const rawData = [100, 120, 130, 125, 140, 160, 180, 170];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  
    // Moving average function
    function movingAverage(data, windowSize) {
      return data.map((_, i) => {
        const start = Math.max(0, i - windowSize + 1);
        const slice = data.slice(start, i + 1);
        return slice.reduce((a, b) => a + b, 0) / slice.length;
      });
    }
  
    const canvas = new Canvas(500, 300);
  
    new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Engagement',
            data: rawData,
            borderColor: 'blue',
            fill: false,
            tension: 0.4
          },
          {
            label: 'Moving Average',
            data: movingAverage(rawData, 3),
            borderColor: 'orange',
            borderDash: [5, 5],
            fill: false,
            tension: 0.4
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Engagement Trend with Moving Average'
          }
        }
      }
    });
  
    const pngBuffer = await canvas.toBuffer('png', { matte: 'white' });
    res.set('Content-Type', 'image/png');
    res.send(pngBuffer);
  });

  module.exports = router;