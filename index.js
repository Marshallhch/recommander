const express = require('express');
const cors = require('cors');
const path = require('path');
const spawn = require('child_process').spawn;
const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Node server!');
});

app.get('/random/:count', (req, res) => {
  try {
    const scriptPath = path.join(__dirname, 'resolver.py');
    const pythonPath = path.join(
      'C:',
      'conda',
      'envs',
      'recon_env',
      'python.exe'
    );

    // test 1

    // const pythonPath = path.join('/home/ubuntu/miniconda', 'envs', 'myenv', 'bin', 'python3');

    const count = req.params.count;
    const result = spawn(pythonPath, [scriptPath, 'random', count]);

    let responseData = '';

    result.stdout.on('data', function (data) {
      responseData += data.toString();
    });

    result.on('close', (code) => {
      if (code === 0) {
        const jsonResponse = JSON.parse(responseData);
        res.status(200).json(jsonResponse);
      } else {
        res
          .status(500)
          .json({ error: `Child process exited with code ${code}` });
      }
    });

    result.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/latest/:count', (req, res) => {
  try {
    const scriptPath = path.join(__dirname, 'resolver.py');
    const pythonPath = path.join(
      'C:',
      'conda',
      'envs',
      'recon_env',
      'python.exe'
    );

    // const pythonPath = path.join('/home/ubuntu/miniconda', 'envs', 'myenv', 'bin', 'python3');

    const count = req.params.count;
    const result = spawn(pythonPath, [scriptPath, 'latest', count]);

    let responseData = '';

    result.stdout.on('data', function (data) {
      responseData += data.toString();
    });

    result.on('close', (code) => {
      if (code === 0) {
        const jsonResponse = JSON.parse(responseData);
        res.status(200).json(jsonResponse);
      } else {
        res
          .status(500)
          .json({ error: `Child process exited with code ${code}` });
      }
    });

    result.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/genres/:genre/:count', (req, res) => {
  try {
    const scriptPath = path.join(__dirname, 'resolver.py');
    const pythonPath = path.join(
      'C:',
      'conda',
      'envs',
      'recon_env',
      'python.exe'
    );

    // const pythonPath = path.join('/home/ubuntu/miniconda', 'envs', 'myenv', 'bin', 'python3');

    const genre = req.params.genre;
    const count = req.params.count;
    const result = spawn(pythonPath, [scriptPath, 'genres', genre, count]);

    let responseData = '';

    result.stdout.on('data', function (data) {
      responseData += data.toString();
    });

    result.on('close', (code) => {
      if (code === 0) {
        const jsonResponse = JSON.parse(responseData);
        res.status(200).json(jsonResponse);
      } else {
        res
          .status(500)
          .json({ error: `Child process exited with code ${code}` });
      }
    });

    result.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/item-based/:item', (req, res) => {
  try {
    const scriptPath = path.join(__dirname, 'recommender.py');
    const pythonPath = path.join(
      'C:',
      'conda',
      'envs',
      'recon_env',
      'python.exe'
    );

    // const pythonPath = path.join('/home/ubuntu/miniconda', 'envs', 'myenv', 'bin', 'python3');

    const item = req.params.item;
    const result = spawn(pythonPath, [scriptPath, 'item-based', item]);

    let responseData = '';

    result.stdout.on('data', function (data) {
      responseData += data.toString();
    });

    result.on('close', (code) => {
      if (code === 0) {
        const jsonResponse = JSON.parse(responseData);
        res.status(200).json(jsonResponse);
      } else {
        res
          .status(500)
          .json({ error: `Child process exited with code ${code}` });
      }
    });

    result.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/user-based', (req, res) => {
  try {
    const scriptPath = path.join(__dirname, 'recommender.py');
    const pythonPath = path.join(
      'C:',
      'conda',
      'envs',
      'recon_env',
      'python.exe'
    );

    // const pythonPath = path.join('/home/ubuntu/miniconda', 'envs', 'myenv', 'bin', 'python3');

    const inputRatingDict = req.body; // JSON 데이터를 받아옴

    const result = spawn(pythonPath, [scriptPath, 'user-based']);

    let responseData = '';

    // 파이썬 스크립트로 JSON 데이터를 전달
    result.stdin.write(JSON.stringify(inputRatingDict));
    result.stdin.end();

    result.stdout.on('data', function (data) {
      responseData += data.toString();
    });

    result.on('close', (code) => {
      if (code === 0) {
        const jsonResponse = JSON.parse(responseData);
        res.status(200).json(jsonResponse);
      } else {
        res
          .status(500)
          .json({ error: `Child process exited with code ${code}` });
      }
    });

    result.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
