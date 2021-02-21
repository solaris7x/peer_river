const express = require("express");
const torrentFileIndex = require("./torrentFIleIndex");
const torrentStream = require("./torrentStream");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Peer River 🌊");
});

app.get("/getfile", (req, res) => {
  console.log(req.query);
  if (req.query.magnetURI === undefined) {
    res.status(404).send("Pls provide magnet link");
    return;
  }
  const magnetURI = req.query.magnetURI;
  // ||
  // "magnet:?xt=urn:btih:26F8282669FCDFF6C0B6A58D836BDE3225DF0809&dn=The+Unfinished+Land+by+Greg+Bear+EPUB&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.uw0.xyz%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Finferno.demonoid.is%3A3391%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.kamigami.org%3A2710%2Fannounce&tr=udp%3A%2F%2Fxxxtor.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zerobytes.xyz%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce";
  // "magnet:?xt=urn:btih:3010B35somebleh1821E155473153433413FFBA6&dn=Dua+Lipa-We%26%23039%3Bre+Good.mp3&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce";
  //   res.send("Hello World!");

  const fileIndex = req.query.fileIndex || 1;
  torrentStream(magnetURI, fileIndex, res);
});

app.get("/listfiles", (req, res) => {
  console.log(req.query);
  if (req.query.magnetURI === undefined) {
    res.status(404).send("Pls provide magnet link");
    return;
  }
  const magnetURI = req.query.magnetURI;
  // ||
  // "magnet:?xt=urn:btih:26F8282669FCDFF6C0B6A58D836BDE3225DF0809&dn=The+Unfinished+Land+by+Greg+Bear+EPUB&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.uw0.xyz%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Finferno.demonoid.is%3A3391%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.kamigami.org%3A2710%2Fannounce&tr=udp%3A%2F%2Fxxxtor.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zerobytes.xyz%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce";
  // "magnet:?xt=urn:btih:3010B35somebleh1821E155473153433413FFBA6&dn=Dua+Lipa-We%26%23039%3Bre+Good.mp3&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce";
  //   res.send("Hello World!");
  torrentFileIndex(magnetURI, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Listening on ${PORT}`);
});
