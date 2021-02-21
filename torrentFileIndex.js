const WebTorrent = require("webtorrent-hybrid");

const torrentFileIndex = (magnetURI, expressResponse) => {
  const client = new WebTorrent({
    maxConns: 100,
    tracker: true,
  });
  try {
    const tortimeout = setTimeout(() => {
      console.log("Taking too long");
      expressResponse.status(404).send("Taking too long");
    }, 10000);

    const torrent = client.add(magnetURI);

    torrent.on("error", (err) => {
      console.log("Some Error " + err);
      expressResponse.status(404).send("Some brokey error");
      // client.destroy(() => console.log("Destroying client"));
    });

    torrent.on("ready", () => {
      clearTimeout(tortimeout);
      // Torrents can contain many files. Let's use the .mp4 file
      const fileIndex = torrent.files.map((file, index) => {
        return file.name;
      });
      console.log({ ...fileIndex });
      expressResponse.send({ ...fileIndex });
    });

    // Cleanup
    expressResponse.on("close", () => {
      client.destroy(() => console.log("Destroyed client"));
      clearTimeout(tortimeout);
    });
  } catch (err) {
    console.log("Some code messed up " + err);
    expressResponse.status(404).send("Some code messed up");
  }
  // finally {
  //   client.destroy(() => console.log("Destroyed client"));
  // }
};

module.exports = torrentFileIndex;
